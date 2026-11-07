import { usePlayerText } from "./i18n.js";
/**
 * 播放进度条：细线，悬停 / 拖动时变粗；点击或拖动跳转，← / → 每次 5 秒，Home / End 跳到首尾。
 * 显示已缓冲的区间；悬停时在指针上方显示该位置的时间。
 */
import React, { useRef, useState } from "react";
import { abActive, type AbRange } from "./abRepeat.js";
import { formatTime, ratioFromPointer } from "./format.js";
import styles from "./styles.module.scss";

export const SEEK_STEP_SECONDS = 5;

interface ProgressBarProps {
  current: number;
  duration: number;
  /** 跳转到指定时间（秒） */
  onSeek: (time: number) => void;
  onDragChange?: (dragging: boolean) => void;
  /** 已缓冲的区间（秒） */
  buffered?: ReadonlyArray<readonly [number, number]>;
  /** A-B 循环区间（高亮显示） */
  ab?: AbRange;
}

/** TimeRanges → [start, end] 数组 */
export function timeRangesToArray(
  ranges: Pick<TimeRanges, "length" | "start" | "end"> | null | undefined,
): Array<[number, number]> {
  const list: Array<[number, number]> = [];
  if (!ranges) return list;
  for (let index = 0; index < ranges.length; index += 1) {
    const start = ranges.start(index);
    const end = ranges.end(index);
    if (Number.isFinite(start) && Number.isFinite(end) && end > start)
      list.push([start, end]);
  }
  return list;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  duration,
  onSeek,
  onDragChange,
  buffered = [],
  ab,
}) => {
  const text = usePlayerText();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const [hover, setHover] = useState<number | null>(null);
  const known = Number.isFinite(duration) && duration > 0;
  const percent = known
    ? Math.min(100, Math.max(0, (current / duration) * 100))
    : 0;
  const toPercent = (time: number) =>
    Math.min(100, Math.max(0, (time / duration) * 100));

  const ratioAt = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    return ratioFromPointer(clientX, rect.left, rect.width);
  };

  const seekToPointer = (clientX: number) => {
    if (!trackRef.current || !known) return;
    onSeek(ratioAt(clientX) * duration);
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    onDragChange?.(false);
  };

  return (
    <div
      ref={trackRef}
      className={styles.progress}
      role="slider"
      tabIndex={0}
      aria-label={text("播放进度")}
      aria-valuemin={0}
      aria-valuemax={known ? Math.round(duration * 10) / 10 : 0}
      aria-valuenow={Math.round(current * 10) / 10}
      aria-valuetext={`${formatTime(current)} / ${formatTime(duration)}`}
      onPointerDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
        draggingRef.current = true;
        onDragChange?.(true);
        event.currentTarget.setPointerCapture?.(event.pointerId);
        seekToPointer(event.clientX);
      }}
      onPointerMove={(event) => {
        if (known) setHover(ratioAt(event.clientX));
        if (draggingRef.current) seekToPointer(event.clientX);
      }}
      onPointerLeave={() => setHover(null)}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => {
        let target: number | null = null;
        if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
          target = current - SEEK_STEP_SECONDS;
        } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
          target = current + SEEK_STEP_SECONDS;
        } else if (event.key === "Home") {
          target = 0;
        } else if (event.key === "End" && known) {
          target = duration;
        }
        if (target === null) return;
        event.preventDefault();
        event.stopPropagation();
        onSeek(target);
      }}
    >
      <div className={styles.progressTrack}>
        {known &&
          buffered.map(([start, end]) => (
            <div
              key={`${start}-${end}`}
              className={styles.progressBuffered}
              data-testid="video-buffered"
              style={{
                left: `${toPercent(start)}%`,
                width: `${toPercent(end) - toPercent(start)}%`,
              }}
            />
          ))}
        {known && ab && abActive(ab) && (
          <div
            className={styles.progressAb}
            data-testid="video-ab-range"
            style={{
              left: `${toPercent(ab.a)}%`,
              width: `${toPercent(ab.b) - toPercent(ab.a)}%`,
            }}
          />
        )}
        <div className={styles.progressFill} style={{ width: `${percent}%` }} />
        <div className={styles.progressThumb} style={{ left: `${percent}%` }} />
      </div>
      {hover !== null && known && (
        <span
          className={styles.progressHover}
          data-testid="video-hover-time"
          aria-hidden="true"
          style={{ left: `${hover * 100}%` }}
        >
          {formatTime(hover * duration)}
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
