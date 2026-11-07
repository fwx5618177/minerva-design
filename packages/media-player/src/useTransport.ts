/**
 * 播放器的「传输」动作（音频、视频共用）：上一首 / 下一首、A-B 循环（带提示），以及系统媒体会话。
 */
import { useCallback } from "react";
import { abActive, type AbCommand, type AbRange } from "./abRepeat.js";
import { formatTime } from "./format.js";
import { useMediaSession, type SessionInfo } from "./mediaSession.js";
import { nextTrackIndex, previousTrackAction } from "./playlist.js";

export interface UseTransportOptions {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  playlist: {
    enabled: boolean;
    index: number;
    length: number;
    go: (index: number, play: boolean) => void;
  };
  ab: { run: (command: AbCommand) => AbRange };
  seek: (time: number) => void;
  seekBy: (delta: number) => void;
  togglePlay: () => void;
  showNotice: (message: string) => void;
  /** 切换曲目并接着播放前（例如恢复声音） */
  beforePlay: () => void;
  session: {
    enabled: boolean;
    playing: boolean;
    info: SessionInfo;
    position: { current: number; duration: number; rate: number };
  };
}

export function useTransport(options: UseTransportOptions) {
  const {
    videoRef,
    playlist,
    ab,
    seek,
    seekBy,
    togglePlay,
    showNotice,
    beforePlay,
    session,
  } = options;
  const { go, index: trackIndex, length: trackCount } = playlist;

  /** 切换曲目；正在播放（或播完自动下一首）时接着播放 */
  const switchTrack = useCallback(
    (index: number, play: boolean) => {
      if (play) beforePlay();
      go(index, play);
    },
    [go, beforePlay],
  );

  const nextTrack = useCallback(() => {
    const target = nextTrackIndex(trackIndex, trackCount);
    const video = videoRef.current;
    if (target !== null) switchTrack(target, !!video && !video.paused);
  }, [videoRef, trackIndex, trackCount, switchTrack]);

  const previousTrack = useCallback(() => {
    const video = videoRef.current;
    const action = previousTrackAction(
      trackIndex,
      video?.currentTime ?? 0,
      trackCount,
    );
    if (!action) return;
    if (action.type === "restart") seek(0);
    else switchTrack(action.index, !!video && !video.paused);
  }, [videoRef, trackIndex, trackCount, seek, switchTrack]);

  /** A-B 循环（按钮 / 快捷键），并提示当前状态 */
  const { run } = ab;
  const runAb = useCallback(
    (command: AbCommand) => {
      const next = run(command);
      if (abActive(next))
        showNotice(`A-B 循环 ${formatTime(next.a)}–${formatTime(next.b)}`);
      else if (next.a !== null)
        showNotice(`A 点 ${formatTime(next.a)}，再设 B 点`);
      else showNotice("已清除 A-B 循环");
    },
    [run, showNotice],
  );

  useMediaSession({
    ...session,
    handlers: {
      play: () => {
        const video = videoRef.current;
        if (video && video.paused) togglePlay();
      },
      pause: () => videoRef.current?.pause(),
      seekTo: seek,
      seekBy,
      previous: previousTrack,
      next: nextTrack,
    },
    hasPrevious: playlist.enabled,
    hasNext: playlist.enabled,
  });

  return {
    switchTrack,
    nextTrack,
    previousTrack,
    runAb,
    trackIndex,
    trackCount,
  };
}
