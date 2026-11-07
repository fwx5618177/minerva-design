/** 播放器根元素的类名 / 尺寸、读到元数据后的起始位置（从 MediaPlayer.tsx 拆出的纯函数，便于单独测试） */
import type React from "react";
import { clampTime, frameWidth } from "./format.js";

/** 不自动播放时停在这里作为封面（0 秒有时不绘制画面） */
export const POSTER_TIME = 0.1;

export interface PlayerRootFlags {
  compact: boolean;
  showControls: boolean;
  audioOnly: boolean;
  /** 还不知道画面比例、也没有封面：先用占位尺寸 */
  pending: boolean;
  className?: string;
}

export function playerRootClass(
  styles: Readonly<Record<string, string>>,
  flags: PlayerRootFlags,
): string {
  return [
    styles.player,
    flags.compact ? styles.compact : "",
    flags.showControls ? styles.controlsVisible : "",
    flags.audioOnly ? styles.audioMode : "",
    flags.pending ? styles.pending : "",
    flags.className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

/** 根元素尺寸：视频按宽高比贴合（无黑边）；音频占满宽度（不超过 maxWidth）；全屏时不限制 */
export function playerRootStyle(options: {
  fullscreen: boolean;
  audioOnly: boolean;
  ratio: number;
  maxWidth?: number;
  maxHeight?: number | string;
}): React.CSSProperties | undefined {
  const { fullscreen, audioOnly, ratio, maxWidth, maxHeight } = options;
  if (fullscreen) return undefined;
  if (audioOnly)
    return { width: maxWidth ? `min(100%, ${maxWidth}px)` : "100%" };
  return {
    aspectRatio: String(ratio),
    width: frameWidth(ratio, maxWidth, maxHeight),
  };
}

/**
 * 读到元数据后跳到哪里（null 表示不动）：
 * 换清晰度 / 重试回到原位置 → 首次加载的 startTime → 有画面且不自动播放时停在第一帧附近当封面
 */
export function metadataSeekTarget(options: {
  resume: { time: number } | null;
  firstLoad: boolean;
  startTime?: number;
  /** 需要用第一帧当封面（有画面、没有 poster、不自动播放） */
  coverFrame: boolean;
  currentTime: number;
  duration: number;
}): number | null {
  const { resume, firstLoad, startTime, coverFrame, currentTime, duration } =
    options;
  if (resume) return clampTime(resume.time, duration);
  if (firstLoad && startTime && startTime > 0)
    return clampTime(startTime, duration);
  if (coverFrame && currentTime === 0 && duration > POSTER_TIME * 2)
    return POSTER_TIME;
  return null;
}
