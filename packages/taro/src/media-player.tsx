import Taro from "@tarojs/taro";
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  View,
  Text,
  Video,
  type CommonEvent,
  type ITouchEvent,
} from "@tarojs/components";
import {
  DEFAULT_PLAYBACK_RATES,
  DEFAULT_SKIP_SECONDS,
  clampMediaTime,
  clampVolume,
  cn,
  formatMediaTime,
  formatPlaybackRate,
  inferMediaType,
  mediaProgress,
  nextPlaybackRate,
} from "@minerva/core";
import { Part, type NativeProps } from "./shared";
import { useI18n } from "./theme";

/** Kind of media a MediaPlayer renders */
export type MediaPlayerType = "audio" | "video";

/** Detail of MediaPlayer's onTimeUpdate */
export interface MediaPlayerTimeDetail {
  /** Playhead position, in seconds */
  currentTime: number;
  /** Duration in seconds (0 while unknown) */
  duration: number;
}

/** Detail of MediaPlayer's onVolumeChange */
export interface MediaPlayerVolumeDetail {
  /** Volume, 0..1 (1 for video: the host video has no volume API) */
  volume: number;
  /** Whether the media is muted */
  muted: boolean;
}

/** Imperative handle of a MediaPlayer (its `ref`) */
export interface MediaPlayerHandle {
  /** Starts playback */
  play: () => void;
  /** Pauses playback */
  pause: () => void;
  /** Moves the playhead to `seconds` (clamped to the duration) */
  seek: (seconds: number) => void;
  /**
   * The host media context: a `VideoContext` (video) or the
   * `InnerAudioContext` (audio); null when the host has none
   */
  readonly context: Taro.VideoContext | Taro.InnerAudioContext | null;
}

export interface MediaPlayerProps extends Omit<NativeProps, "children"> {
  /** URL of the media */
  src?: string;
  /** Kind of media (default: inferred from mimeType, else the file extension of src, else "video") */
  type?: MediaPlayerType;
  /** MIME type of the media, used to infer type */
  mimeType?: string;
  /** Image shown before a video plays */
  poster?: string;
  /** Title of the media, shown in the audio bar / over the video */
  title?: string;
  /** Starts playing as soon as possible (default false) */
  autoPlay?: boolean;
  /** Restarts at the end (default false) */
  loop?: boolean;
  /** Mutes the media; applied whenever it changes (the mute button still toggles the sound) */
  muted?: boolean;
  /** Initially muted (uncontrolled) */
  defaultMuted?: boolean;
  /** Resume position in seconds, applied once (video `initial-time`, audio `startTime`) */
  startTime?: number;
  /** Speeds the speed button cycles through (default [0.5, 0.75, 1, 1.25, 1.5, 2]) */
  playbackRates?: readonly number[];
  /** Step of the skip back / forward buttons, in seconds (0 hides them; default 10) */
  skipSeconds?: number;
  /** Shows the custom control bar (default true); false shows the host video's own controls (audio: nothing) */
  controls?: boolean;
  /** Height of a video player (number: px); overrides aspectRatio */
  height?: number | string;
  /** Aspect ratio of a video player (CSS aspect-ratio, default "16 / 9") */
  aspectRatio?: string;
  /** Called while playing with the playhead position and the duration */
  onTimeUpdate?: (detail: MediaPlayerTimeDetail) => void;
  /** Called when playback reaches the end */
  onEnded?: () => void;
  /** Called when playback starts */
  onPlay?: () => void;
  /** Called when playback pauses */
  onPause?: () => void;
  /** Called with the duration once it is known */
  onLoadedMetadata?: (detail: { duration: number }) => void;
  /** Called when the media can't be loaded or played (the host error detail) */
  onError?: (error: unknown) => void;
  /** Called with the new playback speed */
  onRateChange?: (rate: number) => void;
  /** Called when the volume or the muted state changes */
  onVolumeChange?: (detail: MediaPlayerVolumeDetail) => void;
}

interface Rect {
  left: number;
  width: number;
}

const touchX = (event: ITouchEvent): number | undefined => {
  const touch = (event.touches?.[0] ?? event.changedTouches?.[0]) as
    { clientX?: number; pageX?: number; x?: number } | undefined;
  return touch?.clientX ?? touch?.pageX ?? touch?.x;
};

/** A touch track (seek / volume): measures itself, reports the touched fraction */
function useTrack(id: string, onFraction: (fraction: number) => void) {
  const rect = useRef<Rect | null>(null);
  const dragging = useRef(false);
  const measure = (done: (rect: Rect) => void) => {
    const query = Taro.createSelectorQuery?.();
    if (query) {
      query
        .select(`#${id}`)
        .boundingClientRect((result) => {
          const r = result as { left?: number; width?: number } | null;
          if (r && typeof r.width === "number" && r.width > 0)
            done({ left: r.left ?? 0, width: r.width });
        })
        .exec();
      return;
    }
    if (typeof document === "undefined") return;
    const box = document.getElementById(id)?.getBoundingClientRect();
    if (box && box.width > 0) done({ left: box.left, width: box.width });
  };
  const apply = (x: number, box: Rect) =>
    onFraction(Math.min(1, Math.max(0, (x - box.left) / box.width)));
  return {
    onTouchStart: (event: CommonEvent) => {
      const x = touchX(event as ITouchEvent);
      if (x === undefined) return;
      dragging.current = true;
      measure((box) => {
        rect.current = box;
        apply(x, box);
      });
    },
    onTouchMove: (event: CommonEvent) => {
      const x = touchX(event as ITouchEvent);
      if (!dragging.current || !rect.current || x === undefined) return;
      apply(x, rect.current);
    },
    onTouchEnd: () => {
      dragging.current = false;
    },
  };
}

const finite = (value: number | undefined) =>
  typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;

const cssSize = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

/**
 * MediaPlayer: video through the host `<video>` component (its own controls
 * off, driven by `createVideoContext`) and audio through
 * `createInnerAudioContext`, under the same themed control bar as the web
 * renderers: play / pause, skip back / forward, a touch seek bar with the
 * buffered range, the time, mute (and a volume bar for audio), the playback
 * speed (cycle button) and fullscreen (video). The ref drives the media:
 * `play()`, `pause()`, `seek(seconds)` and `context`.
 */
export const MediaPlayer = forwardRef<MediaPlayerHandle, MediaPlayerProps>(
  function MediaPlayer(
    {
      src,
      type: typeProp,
      mimeType,
      poster,
      title,
      autoPlay = false,
      loop = false,
      muted: mutedProp,
      defaultMuted,
      startTime,
      playbackRates = DEFAULT_PLAYBACK_RATES,
      skipSeconds = DEFAULT_SKIP_SECONDS,
      controls = true,
      height,
      aspectRatio = "16 / 9",
      onTimeUpdate,
      onEnded,
      onPlay,
      onPause,
      onLoadedMetadata,
      onError,
      onRateChange,
      onVolumeChange,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) {
    const { t } = useI18n();
    const type = inferMediaType(src, mimeType, typeProp);
    const isVideo = type === "video";
    const generated = useId().replace(/[^a-zA-Z0-9_-]/g, "");
    const baseId = props.id ?? `mn-media-${generated}`;
    const videoId = `${baseId}-video`;
    const [paused, setPaused] = useState(true);
    const [ended, setEnded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(mutedProp ?? defaultMuted ?? false);
    const [rate, setRate] = useState(1);
    const [fullscreen, setFullscreen] = useState(false);
    const audio = useRef<Taro.InnerAudioContext | null>(null);
    const video = useRef<Taro.VideoContext | null>(null);
    const metadataSent = useRef(false);
    // Latest callbacks for the audio context listeners (set up once per src)
    const latest = useRef({
      onTimeUpdate,
      onEnded,
      onPlay,
      onPause,
      onLoadedMetadata,
      onError,
    });
    latest.current = {
      onTimeUpdate,
      onEnded,
      onPlay,
      onPause,
      onLoadedMetadata,
      onError,
    };

    const metadata = (total: number) => {
      if (metadataSent.current || total <= 0) return;
      metadataSent.current = true;
      setDuration(total);
      latest.current.onLoadedMetadata?.({ duration: total });
    };

    useEffect(() => {
      metadataSent.current = false;
      setFailed(false);
      setEnded(false);
      setPaused(true);
      setCurrentTime(0);
      setDuration(0);
      setBuffered(0);
    }, [src]);

    useEffect(() => {
      if (mutedProp !== undefined) setMuted(mutedProp);
    }, [mutedProp]);

    // Video: the host component, driven by its context
    useEffect(() => {
      if (!isVideo) return;
      video.current = Taro.createVideoContext?.(videoId) ?? null;
      return () => {
        video.current = null;
      };
    }, [isVideo, videoId]);

    // Audio: an InnerAudioContext per source
    useEffect(() => {
      if (isVideo || !src) return;
      const ctx = Taro.createInnerAudioContext?.();
      if (!ctx) return;
      audio.current = ctx;
      ctx.src = src;
      ctx.autoplay = autoPlay;
      ctx.loop = loop;
      if (startTime && startTime > 0) ctx.startTime = startTime;
      ctx.onPlay(() => {
        setPaused(false);
        setEnded(false);
        latest.current.onPlay?.();
      });
      ctx.onPause(() => {
        setPaused(true);
        setLoading(false);
        latest.current.onPause?.();
      });
      ctx.onStop?.(() => setPaused(true));
      ctx.onEnded(() => {
        setPaused(true);
        setEnded(true);
        setLoading(false);
        latest.current.onEnded?.();
      });
      ctx.onWaiting(() => setLoading(true));
      ctx.onCanplay(() => {
        setLoading(false);
        metadata(finite(ctx.duration));
      });
      ctx.onTimeUpdate(() => {
        const total = finite(ctx.duration);
        metadata(total);
        setCurrentTime(ctx.currentTime);
        setDuration(total);
        setBuffered(finite(ctx.buffered));
        latest.current.onTimeUpdate?.({
          currentTime: ctx.currentTime,
          duration: total,
        });
      });
      ctx.onError((error) => {
        setFailed(true);
        setLoading(false);
        latest.current.onError?.(error);
      });
      return () => {
        ctx.destroy();
        if (audio.current === ctx) audio.current = null;
      };
    }, [isVideo, src]);

    useEffect(() => {
      const ctx = audio.current;
      if (!ctx) return;
      ctx.loop = loop;
      ctx.volume = muted ? 0 : volume;
    }, [loop, muted, volume, src, isVideo]);

    const play = () => {
      if (isVideo) video.current?.play();
      else audio.current?.play();
    };
    const pause = () => {
      if (isVideo) video.current?.pause();
      else audio.current?.pause();
    };
    const seek = (seconds: number) => {
      const next = clampMediaTime(seconds, duration);
      if (isVideo) video.current?.seek(next);
      else audio.current?.seek(next);
      setCurrentTime(next);
    };
    useImperativeHandle(ref, () => ({
      play,
      pause,
      seek,
      get context() {
        return isVideo ? video.current : audio.current;
      },
    }));

    const toggle = () => (paused ? play() : pause());
    const setMute = (next: boolean) => {
      setMuted(next);
      onVolumeChange?.({ volume: isVideo ? 1 : volume, muted: next });
    };
    const changeVolume = (next: number) => {
      const value = clampVolume(next);
      setVolume(value);
      if (value > 0 && muted) setMuted(false);
      onVolumeChange?.({ volume: value, muted: value > 0 ? false : muted });
    };
    const cycleRate = () => {
      const next = nextPlaybackRate(rate, playbackRates);
      setRate(next);
      if (isVideo) video.current?.playbackRate(next);
      else if (audio.current) audio.current.playbackRate = next;
      onRateChange?.(next);
    };
    const toggleFullscreen = () => {
      if (fullscreen) video.current?.exitFullScreen();
      else video.current?.requestFullScreen({ direction: 0 });
    };

    const seekTrack = useTrack(`${baseId}-seek`, (fraction) => {
      if (duration) seek(fraction * duration);
    });
    const volumeTrack = useTrack(`${baseId}-volume`, changeVolume);

    const status = ended ? "ended" : paused ? "paused" : "playing";
    const rootStyle: CSSProperties = { ...props.style };
    if (isVideo) {
      if (height !== undefined) rootStyle.height = cssSize(height);
      else rootStyle.aspectRatio = aspectRatio;
    }
    const progress = mediaProgress(currentTime, duration) * 100;
    const shownVolume = muted ? 0 : volume;
    const button = (
      label: string,
      content: string,
      onClick: () => void,
      extra?: string,
      disabled = false,
    ) => (
      <View
        className={cn("mn-media-player__button", extra)}
        role="button"
        aria-label={label}
        aria-disabled={disabled || undefined}
        data-part="button"
        onClick={disabled ? undefined : onClick}
      >
        <Text aria-hidden>{content}</Text>
      </View>
    );
    const spinner = loading && !failed && (
      <View
        className="mn-media-player__spinner"
        data-part="spinner"
        role="status"
        aria-label={t("mediaPlayer.loading")}
      />
    );

    return (
      <Part
        name="media-player"
        {...props}
        id={baseId}
        role={controls ? "group" : undefined}
        aria-label={
          controls ? (ariaLabel ?? title ?? t("mediaPlayer.label")) : ariaLabel
        }
        className={cn(
          `mn-variant-${type}`,
          status === "playing" && "mn-playing",
          loading && "mn-loading",
          failed && "mn-invalid",
          props.className,
        )}
        style={rootStyle}
        data-variant={type}
        data-status={status}
        data-loading={loading ? "" : undefined}
        data-invalid={failed ? "" : undefined}
      >
        {isVideo && (
          <Video
            id={videoId}
            className="mn-media-player__media"
            data-part="media"
            src={src ?? ""}
            poster={poster}
            controls={!controls}
            autoplay={autoPlay}
            loop={loop}
            muted={muted}
            initialTime={startTime}
            showCenterPlayBtn={!controls}
            showFullscreenBtn={!controls}
            showPlayBtn={!controls}
            enableProgressGesture={!controls}
            objectFit="contain"
            onPlay={() => {
              setPaused(false);
              setEnded(false);
              onPlay?.();
            }}
            onPause={() => {
              setPaused(true);
              setLoading(false);
              onPause?.();
            }}
            onEnded={() => {
              setPaused(true);
              setEnded(true);
              setLoading(false);
              onEnded?.();
            }}
            onWaiting={() => setLoading(true)}
            onLoadedMetaData={(event) =>
              metadata(finite((event.detail as { duration?: number }).duration))
            }
            onTimeUpdate={(event) => {
              const detail = event.detail as {
                currentTime: number;
                duration: number;
              };
              const total = finite(detail.duration);
              metadata(total);
              setLoading(false);
              setCurrentTime(detail.currentTime);
              setDuration(total);
              onTimeUpdate?.({
                currentTime: detail.currentTime,
                duration: total,
              });
            }}
            onProgress={(event) =>
              setBuffered(
                ((event.detail as { buffered?: number }).buffered ?? 0) / 100,
              )
            }
            onFullScreenChange={(event) =>
              setFullscreen(
                !!(event.detail as { fullScreen?: boolean }).fullScreen,
              )
            }
            onError={(event) => {
              setFailed(true);
              setLoading(false);
              onError?.(event.detail);
            }}
          />
        )}
        {controls && title && (
          <Text className="mn-media-player__title" data-part="title">
            {title}
          </Text>
        )}
        {controls && isVideo && spinner}
        {controls && failed && (
          <View
            className="mn-media-player__error"
            data-part="error"
            role="alert"
          >
            {t("mediaPlayer.error")}
          </View>
        )}
        {controls && (
          <View className="mn-media-player__controls" data-part="controls">
            <View
              id={`${baseId}-seek`}
              className="mn-media-player__seek"
              data-part="seek"
              role="slider"
              aria-label={t("mediaPlayer.seek")}
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(currentTime)}
              aria-valuetext={t("mediaPlayer.timeOf", {
                current: formatMediaTime(currentTime, duration),
                duration: formatMediaTime(duration),
              })}
              aria-disabled={duration ? undefined : true}
              {...seekTrack}
            >
              <View className="mn-media-player__track" />
              <View
                className="mn-media-player__buffered"
                style={{ width: `${Math.min(1, buffered) * 100}%` }}
              />
              <View
                className="mn-media-player__fill"
                style={{ width: `${progress}%` }}
              />
              <View
                className="mn-media-player__thumb"
                style={{ left: `${progress}%` }}
              />
            </View>
            {button(
              paused ? t("mediaPlayer.play") : t("mediaPlayer.pause"),
              paused ? "▶" : "❚❚",
              toggle,
              "mn-media-player__play",
              failed,
            )}
            {skipSeconds > 0 &&
              button(
                t("mediaPlayer.skipBack", { count: skipSeconds }),
                `−${skipSeconds}`,
                () => seek(currentTime - skipSeconds),
                undefined,
                failed,
              )}
            {skipSeconds > 0 &&
              button(
                t("mediaPlayer.skipForward", { count: skipSeconds }),
                `+${skipSeconds}`,
                () => seek(currentTime + skipSeconds),
                undefined,
                failed,
              )}
            {!isVideo && spinner}
            <Text className="mn-media-player__time" data-part="time">
              {`${formatMediaTime(currentTime, duration)} / ${formatMediaTime(duration)}`}
            </Text>
            <View className="mn-media-player__spacer" />
            {button(
              muted ? t("mediaPlayer.unmute") : t("mediaPlayer.mute"),
              muted ? "🔇\uFE0E" : "🔊\uFE0E",
              () => setMute(!muted),
            )}
            {!isVideo && (
              <View
                id={`${baseId}-volume`}
                className="mn-media-player__volume"
                data-part="volume"
                role="slider"
                aria-label={t("mediaPlayer.volume")}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(shownVolume * 100)}
                aria-valuetext={`${Math.round(shownVolume * 100)}%`}
                {...volumeTrack}
              >
                <View className="mn-media-player__track" />
                <View
                  className="mn-media-player__fill"
                  style={{ width: `${shownVolume * 100}%` }}
                />
                <View
                  className="mn-media-player__thumb"
                  style={{ left: `${shownVolume * 100}%` }}
                />
              </View>
            )}
            {playbackRates.length > 1 &&
              button(
                t("mediaPlayer.playbackRate", {
                  rate: formatPlaybackRate(rate),
                }),
                formatPlaybackRate(rate),
                cycleRate,
                "mn-media-player__rate",
              )}
            {isVideo &&
              button(
                fullscreen
                  ? t("mediaPlayer.exitFullscreen")
                  : t("mediaPlayer.fullscreen"),
                "⤢",
                toggleFullscreen,
              )}
          </View>
        )}
      </Part>
    );
  },
);
