/**
 * A-B 循环（反复听一段对白 / 一句台词）：纯函数 + hook。
 * - 设置 A 点、B 点（顺序可颠倒，自动交换）；两点太近（< MIN_AB_SPAN 秒）时不生效
 * - 两点都设好后，播放到 B 点即跳回 A 点；按钮依次：设 A → 设 B → 清除
 * - 播放中用 requestAnimationFrame 检查（timeupdate 每 250ms 一次，会越过 B 点太多）
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { formatTime } from "./format.js";

export interface AbRange {
  a: number | null;
  b: number | null;
}

export const EMPTY_AB: AbRange = { a: null, b: null };
/** A、B 两点的最小间隔（秒） */
export const MIN_AB_SPAN = 0.2;

function clampPoint(time: number, duration: number): number {
  if (!Number.isFinite(time) || time < 0) return 0;
  return Number.isFinite(duration) && duration > 0
    ? Math.min(time, duration)
    : time;
}

/** 两点都已设置且有效 */
export function abActive(range: AbRange): range is { a: number; b: number } {
  return (
    range.a !== null && range.b !== null && range.b - range.a >= MIN_AB_SPAN
  );
}

/** 设置某一点；B 早于 A 时交换；两点太近时忽略（返回原值） */
export function setAbPoint(
  range: AbRange,
  point: "a" | "b",
  time: number,
  duration: number,
): AbRange {
  const value = clampPoint(time, duration);
  const next: AbRange =
    point === "a" ? { a: value, b: range.b } : { a: range.a, b: value };
  if (next.a !== null && next.b !== null) {
    const a = Math.min(next.a, next.b);
    const b = Math.max(next.a, next.b);
    if (b - a < MIN_AB_SPAN) return range;
    return { a, b };
  }
  return next;
}

/** 按钮：没有 → 设 A；只有 A → 设 B；都有 → 清除 */
export function cycleAb(
  range: AbRange,
  time: number,
  duration: number,
): AbRange {
  if (abActive(range)) return EMPTY_AB;
  if (range.a === null) return setAbPoint(range, "a", time, duration);
  return setAbPoint(range, "b", time, duration);
}

/** 当前位置需要跳回 A 点时返回 A 点，否则 null（只在到达 / 越过 B 点时跳） */
export function abLoopTarget(range: AbRange, current: number): number | null {
  if (!abActive(range)) return null;
  return current >= range.b ? range.a : null;
}

/** 按钮的提示与无障碍名称 */
export function abButtonLabel(range: AbRange): string {
  if (abActive(range))
    return `清除 A-B 循环（${formatTime(range.a)}–${formatTime(range.b)}）`;
  if (range.a !== null) return `设置 B 点（A ${formatTime(range.a)}）`;
  return "设置 A 点（A-B 循环）";
}

/** 状态的简写，用于 data-ab 属性：none / a / ab */
export function abState(range: AbRange): "none" | "a" | "ab" {
  if (abActive(range)) return "ab";
  return range.a !== null ? "a" : "none";
}

export type AbCommand = "cycle" | "set-a" | "set-b" | "clear";

export function applyAbCommand(
  range: AbRange,
  command: AbCommand,
  time: number,
  duration: number,
): AbRange {
  switch (command) {
    case "cycle":
      return cycleAb(range, time, duration);
    case "set-a":
      return setAbPoint(range, "a", time, duration);
    case "set-b":
      return setAbPoint(range, "b", time, duration);
    default:
      return EMPTY_AB;
  }
}

/**
 * A-B 循环状态与执行：换片（resetKey 变化）时清除；播放中每帧检查是否越过 B 点
 */
export function useAbRepeat(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  options: {
    resetKey: string;
    paused: boolean;
    onJump?: (time: number) => void;
  },
) {
  const [range, setRange] = useState<AbRange>(EMPTY_AB);
  const rangeRef = useRef(range);
  rangeRef.current = range;
  const jumpRef = useRef(options.onJump);
  jumpRef.current = options.onJump;
  const { resetKey, paused } = options;

  useEffect(() => {
    setRange(EMPTY_AB);
  }, [resetKey]);

  /** 检查一次：越过 B 点就回到 A 点 */
  const check = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const target = abLoopTarget(rangeRef.current, video.currentTime);
    if (target === null) return;
    video.currentTime = target;
    jumpRef.current?.(target);
  }, [videoRef]);

  const active = abActive(range);
  useEffect(() => {
    if (!active || paused || typeof requestAnimationFrame !== "function")
      return;
    let frame = 0;
    const tick = () => {
      check();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, paused, check]);

  const run = useCallback(
    (command: AbCommand): AbRange => {
      const video = videoRef.current;
      const time = video?.currentTime ?? 0;
      const duration = video?.duration ?? Number.NaN;
      const next = applyAbCommand(rangeRef.current, command, time, duration);
      rangeRef.current = next;
      setRange(next);
      return next;
    },
    [videoRef],
  );

  const set = useCallback((next: AbRange) => {
    rangeRef.current = next;
    setRange(next);
  }, []);

  return { range, run, set, check };
}
