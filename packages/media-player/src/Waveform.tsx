import { usePlayerText } from "./i18n.js";
/**
 * 音频界面的波形进度条（role="slider"）：
 * - 真实波形（解码出的峰值，柱子数随宽度变化）或装饰波形（64 根，只表示进度）
 * - 已播放部分高亮、已缓冲区间（底部细线）、A-B 循环区间与 A / B 标记、悬停时间
 * - 点击 / 拖动跳转；键盘 ← / → 5 秒、PageUp / PageDown 15 秒、Home / End 首尾
 */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { abActive, type AbRange } from "./abRepeat.js";
import { formatTime, ratioFromPointer } from "./format.js";
import type { WaveformState } from "./useWaveform.js";
import { resamplePeaks, waveformBars } from "./peaks.js";
import styles from "./audio-visual.module.scss";

const DECORATIVE_BARS = 64;
/** 真实波形：每根柱子（含间隔）约占的宽度（px） */
const BAR_PITCH = 5;
const MIN_BARS = 32;
const MAX_BARS = 240;
export const WAVEFORM_STEP_SECONDS = 5;
export const WAVEFORM_PAGE_SECONDS = 15;

export interface WaveformProps {
  seed: string;
  peaks: readonly number[] | null;
  state: WaveformState;
  current: number;
  duration: number;
  buffered?: ReadonlyArray<readonly [number, number]>;
  ab?: AbRange;
  /** 可以拖动跳转（controls.progress 关闭时只显示） */
  seekable: boolean;
  onSeek: (time: number) => void;
  onDragChange?: (dragging: boolean) => void;
}

/** 按容器宽度决定真实波形的柱子数（没有 ResizeObserver 时用默认值） */
function useBarCount(
  ref: React.RefObject<HTMLDivElement | null>,
  enabled: boolean,
): number {
  const [count, setCount] = useState(DECORATIVE_BARS);
  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node || typeof ResizeObserver !== "function") return;
    const update = (width: number) => {
      if (width > 0) {
        setCount(
          Math.min(MAX_BARS, Math.max(MIN_BARS, Math.round(width / BAR_PITCH))),
        );
      }
    };
    update(node.getBoundingClientRect().width);
    const observer = new ResizeObserver((entries) =>
      update(entries[0]?.contentRect.width ?? 0),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, enabled]);
  return count;
}

const Waveform: React.FC<WaveformProps> = ({
  seed,
  peaks,
  state,
  current,
  duration,
  buffered = [],
  ab,
  seekable,
  onSeek,
  onDragChange,
}) => {
  const text = usePlayerText();
  const ref = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const [hover, setHover] = useState<number | null>(null);
  const real = peaks !== null;
  const barCount = useBarCount(ref, real);
  const bars = useMemo(
    () =>
      real
        ? resamplePeaks(peaks, barCount).map((value) => 0.08 + 0.92 * value)
        : waveformBars(seed, DECORATIVE_BARS),
    [real, peaks, barCount, seed],
  );
  const known = Number.isFinite(duration) && duration > 0;
  const progress = known ? Math.min(1, Math.max(0, current / duration)) : 0;
  const playedBars = Math.round(progress * bars.length);
  const toPercent = (time: number) =>
    known ? Math.min(100, Math.max(0, (time / duration) * 100)) : 0;

  const ratioAt = (clientX: number) => {
    const node = ref.current;
    if (!node) return 0;
    const rect = node.getBoundingClientRect();
    return ratioFromPointer(clientX, rect.left, rect.width);
  };
  const seekToPointer = (clientX: number) => {
    if (seekable && known) onSeek(ratioAt(clientX) * duration);
  };
  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    onDragChange?.(false);
  };

  const range = ab && abActive(ab) ? ab : null;
  const pointA = ab?.a ?? null;

  return (
    <div
      ref={ref}
      className={`${styles.wave} ${seekable ? "" : styles.waveStatic}`}
      data-testid="audio-waveform"
      data-waveform={state}
      role={seekable ? "slider" : undefined}
      aria-hidden={seekable ? undefined : true}
      tabIndex={seekable ? 0 : undefined}
      aria-label={seekable ? text("播放进度") : undefined}
      aria-valuemin={seekable ? 0 : undefined}
      aria-valuemax={
        seekable ? (known ? Math.round(duration * 10) / 10 : 0) : undefined
      }
      aria-valuenow={seekable ? Math.round(current * 10) / 10 : undefined}
      aria-valuetext={
        seekable
          ? `${formatTime(current)} / ${formatTime(duration)}`
          : undefined
      }
      onPointerDown={(event) => {
        event.stopPropagation();
        if (!seekable || !known) return;
        event.preventDefault();
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
      onClick={(event) => {
        event.stopPropagation();
        // 没有指针事件的环境（或辅助技术）只发 click
        seekToPointer(event.clientX);
      }}
      onKeyDown={(event) => {
        let target: number | null = null;
        if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
          target = current - WAVEFORM_STEP_SECONDS;
        } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
          target = current + WAVEFORM_STEP_SECONDS;
        } else if (event.key === "PageDown") {
          target = current - WAVEFORM_PAGE_SECONDS;
        } else if (event.key === "PageUp") {
          target = current + WAVEFORM_PAGE_SECONDS;
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
      <div className={styles.bars}>
        {bars.map((height, index) => (
          <span
            key={index}
            className={
              index < playedBars ? `${styles.bar} ${styles.played}` : styles.bar
            }
            style={{ height: `${Math.round(height * 100)}%` }}
          />
        ))}
      </div>
      {known &&
        buffered.map(([start, end]) => (
          <div
            key={`${start}-${end}`}
            className={styles.buffered}
            data-testid="audio-buffered"
            aria-hidden="true"
            style={{
              left: `${toPercent(start)}%`,
              width: `${toPercent(end) - toPercent(start)}%`,
            }}
          />
        ))}
      {known && range && (
        <div
          className={styles.abRange}
          data-testid="audio-ab-range"
          aria-hidden="true"
          style={{
            left: `${toPercent(range.a)}%`,
            width: `${toPercent(range.b) - toPercent(range.a)}%`,
          }}
        />
      )}
      {known && pointA !== null && (
        <AbMarker label="A" percent={toPercent(pointA)} />
      )}
      {known && range && <AbMarker label="B" percent={toPercent(range.b)} />}
      {hover !== null && known && (
        <HoverTime percent={hover * 100} text={formatTime(hover * duration)} />
      )}
    </div>
  );
};

const AbMarker: React.FC<{ label: string; percent: number }> = ({
  label,
  percent,
}) => (
  <div
    className={styles.abMarker}
    aria-hidden="true"
    style={{ left: `${percent}%` }}
  >
    <b>{label}</b>
  </div>
);

const HoverTime: React.FC<{ percent: number; text: string }> = ({
  percent,
  text,
}) => (
  <div
    className={styles.hoverTime}
    data-testid="audio-hover-time"
    aria-hidden="true"
    style={{ left: `${percent}%` }}
  >
    {text}
  </div>
);

export default Waveform;
