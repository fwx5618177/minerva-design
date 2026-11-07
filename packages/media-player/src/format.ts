/** 播放器用的纯函数（时间格式、尺寸计算），单独导出便于测试 */

/** 秒 → `m:ss`（超过一小时为 `h:mm:ss`）；非法值显示 0:00 */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = String(total % 60).padStart(2, "0");
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${secs}`
    : `${minutes}:${secs}`;
}

/** 把时间限制在 [0, duration] 内（duration 未知时只限制下限） */
export function clampTime(time: number, duration: number): number {
  if (!Number.isFinite(time)) return 0;
  const upper =
    Number.isFinite(duration) && duration > 0
      ? duration
      : Number.POSITIVE_INFINITY;
  return Math.min(upper, Math.max(0, time));
}

/** 指针位置 → 进度比例（0–1） */
export function ratioFromPointer(
  clientX: number,
  left: number,
  width: number,
): number {
  if (!(width > 0)) return 0;
  return Math.min(1, Math.max(0, (clientX - left) / width));
}

/**
 * 容器宽度：按视频宽高比贴合，不出现黑边。
 * 宽度不超过父容器、maxWidth，且高度不超过 maxHeight（数字为 px，字符串为任意 CSS 长度）。
 */
export function frameWidth(
  ratio: number,
  maxWidth?: number,
  maxHeight?: number | string,
): string {
  const limits = ["100%"];
  if (maxWidth) limits.push(`${maxWidth}px`);
  if (maxHeight !== undefined && ratio > 0) {
    const height = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;
    limits.push(`calc(${height} * ${Number(ratio.toFixed(4))})`);
  }
  return limits.length === 1 ? "100%" : `min(${limits.join(", ")})`;
}
