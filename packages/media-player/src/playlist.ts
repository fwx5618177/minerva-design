/**
 * 播放列表（音频、视频通用）：上一首 / 下一首 / 播完自动下一首。纯函数 + hook。
 * - 上一首：当前播放超过 RESTART_THRESHOLD_SECONDS 秒时先回到开头（与常见音乐播放器一致），否则切到上一首
 * - 播完：有下一首就自动播放下一首；最后一首播完停住（单曲循环时 <video loop> 不会触发 ended）
 */
import { useCallback, useEffect, useRef, useState } from "react";
import type { PlayerSource } from "./engines/types.js";

export interface PlaylistItem {
  src: string | PlayerSource;
  /** 显示名；省略时用播放器的 title */
  title?: string;
  /** 媒体会话（系统播放控件）里的艺术家 / 专辑 */
  artist?: string;
  album?: string;
  /** 封面 */
  poster?: string;
}

export const RESTART_THRESHOLD_SECONDS = 3;

export type PreviousAction =
  { type: "restart" } | { type: "go"; index: number } | null;

/** 「上一首」该做什么 */
export function previousTrackAction(
  index: number,
  current: number,
  length: number,
): PreviousAction {
  if (current > RESTART_THRESHOLD_SECONDS) return { type: "restart" };
  if (length > 0 && index > 0) return { type: "go", index: index - 1 };
  return current > 0 ? { type: "restart" } : null;
}

/** 下一首的下标；没有时 null */
export function nextTrackIndex(index: number, length: number): number | null {
  return index + 1 < length ? index + 1 : null;
}

/** 把下标限制在列表范围内 */
export function clampPlaylistIndex(index: number, length: number): number {
  if (length <= 0 || !Number.isFinite(index)) return 0;
  return Math.min(length - 1, Math.max(0, Math.floor(index)));
}

/**
 * 播放列表状态：当前下标、切换（切换后自动播放标记）。列表为空时 item 为 null
 */
export function usePlaylist(
  playlist: readonly PlaylistItem[] | undefined,
  options: { defaultIndex?: number; onIndexChange?: (index: number) => void },
) {
  const length = playlist?.length ?? 0;
  const [index, setIndex] = useState(() =>
    clampPlaylistIndex(options.defaultIndex ?? 0, length),
  );
  const safeIndex = clampPlaylistIndex(index, length);
  // 切换曲目后、读到元数据时自动播放
  const autoPlayNextRef = useRef(false);
  const changeRef = useRef(options.onIndexChange);
  changeRef.current = options.onIndexChange;

  useEffect(() => {
    if (index !== safeIndex) setIndex(safeIndex);
  }, [index, safeIndex]);

  const go = useCallback(
    (next: number, play: boolean) => {
      if (length === 0) return;
      const target = clampPlaylistIndex(next, length);
      autoPlayNextRef.current = play;
      setIndex(target);
      changeRef.current?.(target);
    },
    [length],
  );

  /** 读到元数据时调用：返回是否应自动播放（只取一次） */
  const takeAutoPlay = useCallback(() => {
    const value = autoPlayNextRef.current;
    autoPlayNextRef.current = false;
    return value;
  }, []);

  return {
    enabled: length > 0,
    length,
    index: safeIndex,
    item: length > 0 && playlist ? playlist[safeIndex] : null,
    hasPrevious: safeIndex > 0,
    hasNext: safeIndex + 1 < length,
    go,
    takeAutoPlay,
  };
}
