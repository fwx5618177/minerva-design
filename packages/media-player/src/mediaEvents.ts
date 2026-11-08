/**
 * <video> 元素的事件 → 播放器状态（从 MediaPlayer.tsx 拆出）。音频、视频共用同一个 <video> 元素与这一套处理：
 * 播放 / 暂停、加载中、缓冲、进度、时长、音量、错误、播完（A-B 循环 / 播放列表自动下一首）、读到元数据（有没有画面）。
 */
import type React from "react";
import { clampVolume } from "./audio.js";
import type { AbRange } from "./abRepeat.js";
import { abActive } from "./abRepeat.js";
import { mediaErrorMessage } from "./captions.js";
import { timeRangesToArray } from "./ProgressBar.js";
import { safePlay, type PlayerError } from "./engines/types.js";
import type { VideoMetadata } from "./playerTypes.js";

type Setter<T> = (value: T) => void;
type VideoEvent = React.SyntheticEvent<HTMLVideoElement>;

export interface MediaEventCallbacks {
  onEnded?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onRateChange?: (rate: number) => void;
  onVolumeChange?: (detail: { volume: number; muted: boolean }) => void;
  onLoadedMetadata?: (detail: { duration: number }) => void;
  onTimeUpdate?: (current: number, duration: number) => void;
  onMetadata?: (info: VideoMetadata) => void;
  onLayoutChange?: () => void;
}

export interface MediaEventContext {
  setPaused: Setter<boolean>;
  setEnded?: Setter<boolean>;
  setLoading: Setter<boolean>;
  setBuffered: Setter<Array<[number, number]>>;
  setCurrent: Setter<number>;
  setDuration: Setter<number>;
  setMuted: Setter<boolean>;
  setVolume: Setter<number>;
  setRate?: Setter<number>;
  setError: Setter<PlayerError | null>;
  setHasPicture: Setter<boolean | null>;
  setRatio: Setter<number | null>;
  probeAudio: (video: HTMLVideoElement) => void;
  reportError: (error: PlayerError) => void;
  /** 错误文案用的格式（音频界面为 audio） */
  errorType: string;
  ab: { range: AbRange; check: () => void };
  callbacks: React.RefObject<MediaEventCallbacks>;
  /** 正常播完（没有 A-B 循环）之后：播放列表自动下一首 */
  onTrackEnded: () => void;
  /** 读到元数据、状态更新之后：恢复位置 / 起始时间 / 封面帧 / 自动播放 */
  onMetadataReady: (video: HTMLVideoElement, picture: boolean) => void;
}

export function mediaEventHandlers(ctx: MediaEventContext) {
  const { setPaused, setLoading, probeAudio, ab, callbacks } = ctx;
  const updatePicture = (video: HTMLVideoElement, allowAudio: boolean) => {
    const picture = video.videoWidth > 0 && video.videoHeight > 0;
    if (picture || allowAudio) ctx.setHasPicture(picture);
    if (picture) ctx.setRatio(video.videoWidth / video.videoHeight);
  };
  return {
    onPlay: () => {
      setPaused(false);
      ctx.setEnded?.(false);
      callbacks.current?.onPlay?.();
    },
    onPause: () => {
      setPaused(true);
      setLoading(false);
      callbacks.current?.onPause?.();
    },
    onPlaying: () => setLoading(false),
    onLoadedData: (event: VideoEvent) => {
      updatePicture(event.currentTarget, true);
      callbacks.current?.onLayoutChange?.();
    },
    onResize: (event: VideoEvent) => {
      updatePicture(event.currentTarget, false);
      callbacks.current?.onLayoutChange?.();
    },
    onWaiting: () => setLoading(true),
    onStalled: (event: VideoEvent) => {
      if (!event.currentTarget.paused) setLoading(true);
    },
    onCanPlay: () => setLoading(false),
    onSeeked: () => setLoading(false),
    onProgress: (event: VideoEvent) =>
      ctx.setBuffered(timeRangesToArray(event.currentTarget.buffered)),
    onError: (event: VideoEvent) => {
      const mediaError = event.currentTarget.error;
      if (!mediaError) return;
      ctx.reportError(mediaErrorMessage(mediaError.code, ctx.errorType));
    },
    onEnded: (event: VideoEvent) => {
      const video = event.currentTarget;
      probeAudio(video);
      // A-B 的 B 点在结尾：回到 A 点继续
      if (abActive(ab.range)) {
        ab.check();
        void safePlay(video);
        return;
      }
      setPaused(true);
      ctx.setEnded?.(true);
      callbacks.current?.onEnded?.();
      ctx.onTrackEnded();
    },
    onTimeUpdate: (event: VideoEvent) => {
      const video = event.currentTarget;
      ab.check();
      ctx.setCurrent(video.currentTime);
      probeAudio(video);
      callbacks.current?.onTimeUpdate?.(video.currentTime, video.duration);
    },
    onDurationChange: (event: VideoEvent) =>
      ctx.setDuration(event.currentTarget.duration),
    onRateChange: (event: VideoEvent) => {
      ctx.setRate?.(event.currentTarget.playbackRate);
      callbacks.current?.onRateChange?.(event.currentTarget.playbackRate);
    },
    onVolumeChange: (event: VideoEvent) => {
      ctx.setMuted(event.currentTarget.muted);
      ctx.setVolume(clampVolume(event.currentTarget.volume));
      callbacks.current?.onVolumeChange?.({
        volume: event.currentTarget.volume,
        muted: event.currentTarget.muted,
      });
    },
    onLoadedMetadata: (event: VideoEvent) => {
      const video = event.currentTarget;
      const videoWidth = video.videoWidth ?? 0,
        videoHeight = video.videoHeight ?? 0;
      ctx.setDuration(video.duration);
      ctx.setError(null);
      // MSE streams can announce metadata before the first video dimensions.
      // Keep the element visible until loadeddata/resize can distinguish audio from video.
      updatePicture(
        video,
        !["hls", "dash", "flv", "mpegts"].includes(ctx.errorType),
      );
      probeAudio(video);
      ctx.onMetadataReady(video, videoWidth > 0 && videoHeight > 0);
      callbacks.current?.onLoadedMetadata?.({
        duration:
          Number.isFinite(video.duration) && video.duration > 0
            ? video.duration
            : 0,
      });
      callbacks.current?.onMetadata?.({
        width: videoWidth,
        height: videoHeight,
        duration: video.duration,
      });
      callbacks.current?.onLayoutChange?.();
    },
  };
}
