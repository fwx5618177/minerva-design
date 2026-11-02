import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import {
  DEFAULT_PLAYBACK_RATES,
  DEFAULT_SKIP_SECONDS,
  MEDIA_ICON_PATHS,
  bufferedEnd,
  captionsPreference,
  clampMediaTime,
  clampVolume,
  formatMediaTime,
  formatPlaybackRate,
  inferMediaType,
  mediaKeyAction,
  mediaProgress,
  nextPlaybackRate,
  pickCaptionsTrack,
  readCaptionsPreference,
  toggledCaptionsTrack,
  writeCaptionsPreference,
  type MediaIconName,
} from "@minerva/core";
import { bindMediaCaptions } from "@minerva/dom";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import { useIsClient } from "../../internal/useIsClient";
import { hooks } from "../../internal/stylingHooks";
import styles from "./mediaPlayer.module.scss";
import type { MediaPlayerProps, MediaPlayerTrack } from "./types";

const NO_TRACKS: readonly MediaPlayerTrack[] = [];

const captionsStorage = () => {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
};

/** Follows the remembered captions choice across tabs */
const subscribeCaptionsStorage = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};

const Icon = ({ name }: { name: MediaIconName }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d={MEDIA_ICON_PATHS[name]} />
  </svg>
);

const finiteDuration = (value: number) =>
  Number.isFinite(value) && value > 0 ? value : 0;

/** Fraction (0..1) of a pointer position along a slider */
const pointerFraction = (event: ReactPointerEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  return rect.width > 0
    ? Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    : 0;
};

type FullscreenVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

/**
 * MediaPlayer: an `<audio>` / `<video>` element with themed custom controls.
 * Play / pause, skip back / forward, a seek bar (role=slider, buffered range),
 * the time, mute and volume, the playback speed (cycle button), fullscreen and
 * picture-in-picture (video), and a captions menu when `tracks` are given
 * (cues drawn by the player). Keyboard on the focused player: Space / K
 * play-pause, ← / → seek by 5 s, ↑ / ↓ volume, M mute, F fullscreen,
 * C captions on / off.
 * The ref is an imperative handle: `play()`, `pause()`, `seek(seconds)` and
 * `element`.
 */
const MediaPlayer = ({
  src,
  type: typeProp,
  mimeType,
  poster,
  title,
  autoPlay = false,
  loop = false,
  muted: mutedProp,
  defaultMuted,
  preload = "metadata",
  crossOrigin,
  startTime,
  playbackRates = DEFAULT_PLAYBACK_RATES,
  skipSeconds = DEFAULT_SKIP_SECONDS,
  controls = true,
  height,
  aspectRatio = "16 / 9",
  pictureInPicture = false,
  tracks = NO_TRACKS,
  onTimeUpdate,
  onEnded,
  onPlay,
  onPause,
  onLoadedMetadata,
  onError,
  onRateChange,
  onVolumeChange,
  onTrackChange,
  "aria-label": ariaLabel,
  className,
  style,
  ref,
}: MediaPlayerProps) => {
  const { t } = useI18n();
  const type = inferMediaType(src, mimeType, typeProp);
  const isVideo = type === "video";
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLMediaElement | null>(null);
  // The source startTime was applied for (applied once per source)
  const startAppliedFor = useRef<string | undefined | null>(null);
  const isClient = useIsClient();

  const [paused, setPaused] = useState(true);
  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(mutedProp ?? defaultMuted ?? false);
  const [rate, setRate] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [pip, setPip] = useState(false);
  const pipSupported =
    isClient &&
    (document as Document & { pictureInPictureEnabled?: boolean })
      .pictureInPictureEnabled === true;

  // A new source starts over; a new `muted` prop applies (the element
  // follows the `muted` state). Adjusted while rendering, not in an effect.
  const [shown, setShown] = useState({ src, mutedProp });
  if (shown.src !== src || shown.mutedProp !== mutedProp) {
    setShown({ src, mutedProp });
    if (shown.src !== src) {
      setError(false);
      setEnded(false);
      setCurrentTime(0);
      setDuration(0);
      setBuffered(0);
    }
    if (mutedProp !== undefined && shown.mutedProp !== mutedProp) {
      setMuted(mutedProp);
    }
  }

  useEffect(() => {
    const onFullscreenChange = () =>
      setFullscreen(
        !!rootRef.current && document.fullscreenElement === rootRef.current,
      );
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  // --- captions ----------------------------------------------------------
  // The choice is kept as its remembered form (language / label / "off") so
  // it survives a new `tracks` array; `index` disambiguates equal languages.
  // Until the user chooses, the remembered choice (localStorage, read on the
  // client only) applies.
  const storedPref = useSyncExternalStore(
    subscribeCaptionsStorage,
    () => readCaptionsPreference(captionsStorage()),
    () => null,
  );
  const [captionsChoice, setCaptionsChoice] = useState<{
    pref: string | null;
    index: number;
  } | null>(null);
  const pref = captionsChoice ? captionsChoice.pref : storedPref;
  const chosen = captionsChoice ? tracks[captionsChoice.index] : undefined;
  const trackIndex =
    captionsChoice && chosen && captionsPreference(chosen) === pref
      ? captionsChoice.index
      : pickCaptionsTrack(tracks, pref);
  const [caption, setCaption] = useState("");
  const [captionsMenu, setCaptionsMenu] = useState(false);
  const lastTrack = useRef(-1);
  const captionsButtonRef = useRef<HTMLButtonElement>(null);
  const captionsControlRef = useRef<HTMLSpanElement>(null);
  // Rebinds only when a source changes (not on each new `tracks` array)
  const trackSources = JSON.stringify(tracks.map((track) => track.src));
  const boundTracks = useMemo(
    () =>
      (JSON.parse(trackSources) as string[]).map((src) => ({ src, label: "" })),
    [trackSources],
  );

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || !controls) return;
    return bindMediaCaptions(media, boundTracks, trackIndex, setCaption, {
      crossOrigin,
    });
  }, [boundTracks, trackIndex, crossOrigin, controls, isVideo]);

  useEffect(() => {
    if (!captionsMenu) return;
    const control = captionsControlRef.current;
    control
      ?.querySelector<HTMLElement>('[aria-checked="true"]')
      ?.focus({ preventScroll: true });
    const onPointerDown = (event: PointerEvent) => {
      if (!control?.contains(event.target as Node)) setCaptionsMenu(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [captionsMenu]);

  const chooseTrack = (index: number) => {
    if (index === trackIndex) return;
    const track = tracks[index] ?? null;
    if (trackIndex >= 0) lastTrack.current = trackIndex;
    setCaptionsChoice({ pref: captionsPreference(track), index });
    writeCaptionsPreference(captionsStorage(), track);
    onTrackChange?.({ index: track ? index : -1, track });
  };

  const closeCaptionsMenu = (refocus: boolean) => {
    setCaptionsMenu(false);
    if (refocus) captionsButtonRef.current?.focus();
  };

  const captionsMenuKeys = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        '[role="menuitemradio"]',
      ),
    );
    const at = items.indexOf(document.activeElement as HTMLElement);
    let next = -1;
    if (event.key === "ArrowDown") next = (at + 1) % items.length;
    else if (event.key === "ArrowUp")
      next = (at - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else if (event.key === "Escape") {
      event.preventDefault();
      closeCaptionsMenu(true);
      return;
    } else if (event.key === "Tab") {
      setCaptionsMenu(false);
      return;
    }
    if (next >= 0) {
      event.preventDefault();
      items[next]?.focus();
    }
  };

  useEffect(() => {
    const video = mediaRef.current;
    if (!video || !isVideo) return;
    const enter = () => setPip(true);
    const leave = () => setPip(false);
    video.addEventListener("enterpictureinpicture", enter);
    video.addEventListener("leavepictureinpicture", leave);
    return () => {
      video.removeEventListener("enterpictureinpicture", enter);
      video.removeEventListener("leavepictureinpicture", leave);
    };
  }, [isVideo, controls]);

  const setMediaRef = useCallback((node: HTMLMediaElement | null) => {
    mediaRef.current = node;
  }, []);

  const play = useCallback(() => {
    const media = mediaRef.current;
    if (!media) return Promise.resolve();
    const result = media.play();
    // autoplay policies reject play(): the paused state stays visible
    return Promise.resolve(result).catch(() => undefined);
  }, []);

  const pause = useCallback(() => mediaRef.current?.pause(), []);

  const seek = useCallback((seconds: number) => {
    const media = mediaRef.current;
    if (!media) return;
    const next = clampMediaTime(seconds, finiteDuration(media.duration));
    media.currentTime = next;
    setCurrentTime(next);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      play,
      pause,
      seek,
      get element() {
        return mediaRef.current;
      },
    }),
    [play, pause, seek],
  );

  const toggle = () => {
    const media = mediaRef.current;
    if (!media) return;
    if (media.paused || media.ended) void play();
    else media.pause();
  };

  const toggleMute = () => {
    const media = mediaRef.current;
    if (!media) return;
    media.muted = !media.muted;
    // volumechange is not dispatched by every environment (jsdom)
    setMuted(media.muted);
  };

  const changeVolume = (next: number) => {
    const media = mediaRef.current;
    if (!media) return;
    media.volume = clampVolume(next);
    if (media.volume > 0 && media.muted) media.muted = false;
    setVolume(media.volume);
    setMuted(media.muted);
  };

  const cycleRate = () => {
    const media = mediaRef.current;
    if (!media) return;
    media.playbackRate = nextPlaybackRate(media.playbackRate, playbackRates);
    setRate(media.playbackRate);
  };

  const toggleFullscreen = () => {
    const root = rootRef.current;
    if (!root || !isVideo) return;
    if (document.fullscreenElement === root) {
      void document.exitFullscreen?.().catch(() => undefined);
    } else if (root.requestFullscreen) {
      void root.requestFullscreen().catch(() => undefined);
    } else {
      // iOS Safari: only the video element itself goes fullscreen
      (mediaRef.current as FullscreenVideo | null)?.webkitEnterFullscreen?.();
    }
  };

  const togglePip = () => {
    const video = mediaRef.current as HTMLVideoElement | null;
    if (!video) return;
    const doc = document as Document & {
      pictureInPictureElement?: Element | null;
      exitPictureInPicture?: () => Promise<void>;
    };
    if (doc.pictureInPictureElement === video) {
      void doc.exitPictureInPicture?.().catch(() => undefined);
    } else {
      void video.requestPictureInPicture?.().catch(() => undefined);
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!controls) return;
    const target = event.target as HTMLElement;
    // Space / Enter activate the focused button
    if (
      (event.key === " " || event.key === "Enter") &&
      target.closest("button")
    ) {
      return;
    }
    const action = mediaKeyAction(event.key, event);
    const media = mediaRef.current;
    if (!action || !media) return;
    if (action.type === "fullscreen" && !isVideo) return;
    if (action.type === "captions") {
      const next = toggledCaptionsTrack(tracks, trackIndex, lastTrack.current);
      if (next === null) return;
      event.preventDefault();
      chooseTrack(next);
      return;
    }
    event.preventDefault();
    switch (action.type) {
      case "toggle":
        toggle();
        break;
      case "seek":
        seek(media.currentTime + action.delta);
        break;
      case "volume":
        changeVolume((media.muted ? 0 : media.volume) + action.delta);
        break;
      case "mute":
        toggleMute();
        break;
      case "fullscreen":
        toggleFullscreen();
        break;
    }
  };

  // --- sliders ---------------------------------------------------------
  const dragSeek = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!duration) return;
    if (event.type === "pointerdown") {
      event.currentTarget.setPointerCapture?.(event.pointerId);
    } else if (!event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      return;
    }
    seek(pointerFraction(event) * duration);
  };

  const dragVolume = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.type === "pointerdown") {
      event.currentTarget.setPointerCapture?.(event.pointerId);
    } else if (!event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      return;
    }
    changeVolume(pointerFraction(event));
  };

  const seekKeys = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const media = mediaRef.current;
    if (!media || !duration) return;
    const step: Record<string, number> = {
      ArrowLeft: -5,
      ArrowDown: -5,
      ArrowRight: 5,
      ArrowUp: 5,
      PageDown: -skipSeconds || -10,
      PageUp: skipSeconds || 10,
    };
    let next: number | undefined;
    if (event.key in step) next = media.currentTime + step[event.key]!;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = duration;
    if (next === undefined) return;
    event.preventDefault();
    event.stopPropagation();
    seek(next);
  };

  const volumeKeys = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const media = mediaRef.current;
    if (!media) return;
    const current = media.muted ? 0 : media.volume;
    let next: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowUp")
      next = current + 0.1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown")
      next = current - 0.1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 1;
    if (next === undefined) return;
    event.preventDefault();
    event.stopPropagation();
    changeVolume(next);
  };

  // --- media events ----------------------------------------------------
  const syncTime = (media: HTMLMediaElement) => {
    setCurrentTime(media.currentTime);
    setBuffered(bufferedEnd(media.buffered, media.currentTime));
  };

  const mediaEvents = {
    onPlay: () => {
      setPaused(false);
      setEnded(false);
      onPlay?.();
    },
    onPause: () => {
      setPaused(true);
      setLoading(false);
      onPause?.();
    },
    onPlaying: () => setLoading(false),
    onWaiting: () => setLoading(true),
    onCanPlay: () => setLoading(false),
    onEnded: () => {
      setPaused(true);
      setEnded(true);
      setLoading(false);
      onEnded?.();
    },
    onLoadedMetadata: (event: React.SyntheticEvent<HTMLMediaElement>) => {
      const media = event.currentTarget;
      const total = finiteDuration(media.duration);
      setDuration(total);
      setError(false);
      if (startAppliedFor.current !== src) {
        startAppliedFor.current = src;
        if (startTime && startTime > 0) {
          media.currentTime = clampMediaTime(startTime, total);
        }
      }
      syncTime(media);
      onLoadedMetadata?.({ duration: total });
    },
    onDurationChange: (event: React.SyntheticEvent<HTMLMediaElement>) =>
      setDuration(finiteDuration(event.currentTarget.duration)),
    onTimeUpdate: (event: React.SyntheticEvent<HTMLMediaElement>) => {
      const media = event.currentTarget;
      syncTime(media);
      onTimeUpdate?.({
        currentTime: media.currentTime,
        duration: finiteDuration(media.duration),
      });
    },
    onProgress: (event: React.SyntheticEvent<HTMLMediaElement>) =>
      syncTime(event.currentTarget),
    onVolumeChange: (event: React.SyntheticEvent<HTMLMediaElement>) => {
      const media = event.currentTarget;
      setVolume(media.volume);
      setMuted(media.muted);
      onVolumeChange?.({ volume: media.volume, muted: media.muted });
    },
    onRateChange: (event: React.SyntheticEvent<HTMLMediaElement>) => {
      setRate(event.currentTarget.playbackRate);
      onRateChange?.(event.currentTarget.playbackRate);
    },
    onError: (event: React.SyntheticEvent<HTMLMediaElement>) => {
      setError(true);
      setLoading(false);
      onError?.(event.currentTarget.error);
    },
  };

  const mediaProps = {
    ...mediaEvents,
    ref: setMediaRef,
    className: styles.media,
    src,
    autoPlay,
    loop,
    muted,
    preload,
    crossOrigin,
    ...hooks("media-player", "media"),
  };

  const status = ended ? "ended" : paused ? "paused" : "playing";
  const rootStyle: CSSProperties = { ...style };
  if (isVideo && controls) {
    if (height !== undefined) rootStyle.height = height;
    else rootStyle.aspectRatio = aspectRatio;
  }

  // Captions: <track> children (loaded "hidden", the player draws the active
  // cue); without controls the browser shows the chosen one natively.
  const trackElements = tracks.map((track, index) => (
    <track
      key={`${index}:${track.src}`}
      kind={track.kind ?? "subtitles"}
      src={track.src}
      srcLang={track.srclang}
      label={track.label}
      default={!controls && index === trackIndex ? true : undefined}
    />
  ));
  const media = isVideo ? (
    // Captions come from `tracks`, and media without speech needs none.
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      {...mediaProps}
      poster={poster}
      playsInline
      onClick={controls ? toggle : undefined}
      onDoubleClick={controls ? toggleFullscreen : undefined}
      style={
        !controls && height !== undefined
          ? { height, width: "auto" }
          : undefined
      }
    >
      {trackElements}
    </video>
  ) : (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <audio {...mediaProps}>{trackElements}</audio>
  );

  if (!controls) {
    return (
      <div
        className={cn(styles.mediaPlayer, styles.bare, className)}
        style={style}
        {...hooks("media-player", "root", { variant: type, status })}
      >
        {media}
      </div>
    );
  }

  const label = ariaLabel ?? title ?? t("mediaPlayer.label");
  const progress = mediaProgress(currentTime, duration);
  const bufferedFraction = mediaProgress(buffered, duration);
  const timeText = `${formatMediaTime(currentTime, duration)} / ${formatMediaTime(duration)}`;
  const shownVolume = muted ? 0 : volume;
  const spinner = loading && !error && (
    <span
      className={styles.spinner}
      role="status"
      aria-label={t("mediaPlayer.loading")}
      {...hooks("media-player", "spinner")}
    />
  );

  return (
    // The focused player takes the media shortcuts (Space / K, arrows, M, F),
    // like native media controls: a focusable group with a key handler.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      ref={rootRef}
      role="group"
      aria-label={label}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      className={cn(
        styles.mediaPlayer,
        isVideo ? styles.video : styles.audio,
        status === "playing" && styles.playing,
        className,
      )}
      style={rootStyle}
      onKeyDown={handleKeyDown}
      {...hooks("media-player", "root", {
        variant: type,
        status,
        loading,
        invalid: error,
      })}
    >
      {media}
      {title && (
        <div className={styles.title} {...hooks("media-player", "title")}>
          {title}
        </div>
      )}
      {isVideo && spinner}
      {(isVideo ? caption !== "" : trackIndex >= 0) && (
        <div className={styles.captions} {...hooks("media-player", "captions")}>
          {caption && <span className={styles.cue}>{caption}</span>}
        </div>
      )}
      {error && (
        <div
          className={styles.error}
          role="alert"
          {...hooks("media-player", "error")}
        >
          {t("mediaPlayer.error")}
        </div>
      )}
      <div className={styles.controls} {...hooks("media-player", "controls")}>
        <div
          className={cn(styles.slider, styles.seek)}
          role="slider"
          tabIndex={0}
          aria-label={t("mediaPlayer.seek")}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(currentTime)}
          aria-valuetext={t("mediaPlayer.timeOf", {
            current: formatMediaTime(currentTime, duration),
            duration: formatMediaTime(duration),
          })}
          aria-disabled={duration ? undefined : true}
          style={
            {
              "--_mp-value": `${progress * 100}%`,
              "--_mp-buffered": `${bufferedFraction * 100}%`,
            } as CSSProperties
          }
          onPointerDown={dragSeek}
          onPointerMove={dragSeek}
          onKeyDown={seekKeys}
          {...hooks("media-player", "seek")}
        >
          <span className={styles.track} />
          <span className={styles.buffered} />
          <span className={styles.fill} />
          <span className={styles.thumb} />
        </div>
        <button
          type="button"
          className={styles.button}
          aria-label={paused ? t("mediaPlayer.play") : t("mediaPlayer.pause")}
          disabled={error}
          onClick={toggle}
          {...hooks("media-player", "button")}
        >
          <Icon name={paused ? "play" : "pause"} />
        </button>
        {skipSeconds > 0 && (
          <>
            <button
              type="button"
              className={styles.button}
              aria-label={t("mediaPlayer.skipBack", { count: skipSeconds })}
              disabled={error}
              onClick={() => seek(currentTime - skipSeconds)}
              {...hooks("media-player", "button")}
            >
              <Icon name="skipBack" />
            </button>
            <button
              type="button"
              className={styles.button}
              aria-label={t("mediaPlayer.skipForward", { count: skipSeconds })}
              disabled={error}
              onClick={() => seek(currentTime + skipSeconds)}
              {...hooks("media-player", "button")}
            >
              <Icon name="skipForward" />
            </button>
          </>
        )}
        {!isVideo && spinner}
        <span className={styles.time} {...hooks("media-player", "time")}>
          {timeText}
        </span>
        <span className={styles.spacer} />
        <button
          type="button"
          className={styles.button}
          aria-label={muted ? t("mediaPlayer.unmute") : t("mediaPlayer.mute")}
          aria-pressed={muted}
          onClick={toggleMute}
          {...hooks("media-player", "button")}
        >
          <Icon name={muted || volume === 0 ? "muted" : "volume"} />
        </button>
        <div
          className={cn(styles.slider, styles.volume)}
          role="slider"
          tabIndex={0}
          aria-label={t("mediaPlayer.volume")}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(shownVolume * 100)}
          aria-valuetext={`${Math.round(shownVolume * 100)}%`}
          style={{ "--_mp-value": `${shownVolume * 100}%` } as CSSProperties}
          onPointerDown={dragVolume}
          onPointerMove={dragVolume}
          onKeyDown={volumeKeys}
          {...hooks("media-player", "volume")}
        >
          <span className={styles.track} />
          <span className={styles.fill} />
          <span className={styles.thumb} />
        </div>
        {playbackRates.length > 1 && (
          <button
            type="button"
            className={cn(styles.button, styles.rate)}
            aria-label={t("mediaPlayer.playbackRate", {
              rate: formatPlaybackRate(rate),
            })}
            onClick={cycleRate}
            {...hooks("media-player", "button")}
          >
            {formatPlaybackRate(rate)}
          </button>
        )}
        {tracks.length > 0 && (
          // Focus leaving the menu by keyboard closes it.
          <span
            ref={captionsControlRef}
            className={styles.captionsControl}
            onBlur={(event) => {
              const next = event.relatedTarget as Node | null;
              if (next && !event.currentTarget.contains(next)) {
                setCaptionsMenu(false);
              }
            }}
          >
            <button
              ref={captionsButtonRef}
              type="button"
              className={cn(
                styles.button,
                trackIndex >= 0 && styles.captionsOn,
              )}
              aria-label={t("mediaPlayer.captions")}
              aria-haspopup="menu"
              aria-expanded={captionsMenu}
              onClick={() => setCaptionsMenu((open) => !open)}
              {...hooks("media-player", "button")}
            >
              <Icon name="captions" />
            </button>
            {captionsMenu && (
              <div
                role="menu"
                tabIndex={-1}
                aria-label={t("mediaPlayer.captions")}
                className={styles.captionsMenu}
                onKeyDown={captionsMenuKeys}
                {...hooks("media-player", "captions-menu")}
              >
                {[-1, ...tracks.keys()].map((index) => (
                  <button
                    key={index}
                    type="button"
                    role="menuitemradio"
                    aria-checked={index === trackIndex}
                    tabIndex={index === trackIndex ? 0 : -1}
                    className={styles.captionsOption}
                    onClick={() => {
                      chooseTrack(index);
                      closeCaptionsMenu(true);
                    }}
                  >
                    {index < 0
                      ? t("mediaPlayer.captionsOff")
                      : tracks[index]?.label}
                  </button>
                ))}
              </div>
            )}
          </span>
        )}
        {isVideo && pictureInPicture && pipSupported && (
          <button
            type="button"
            className={styles.button}
            aria-label={
              pip
                ? t("mediaPlayer.exitPictureInPicture")
                : t("mediaPlayer.pictureInPicture")
            }
            aria-pressed={pip}
            onClick={togglePip}
            {...hooks("media-player", "button")}
          >
            <Icon name="pictureInPicture" />
          </button>
        )}
        {isVideo && (
          <button
            type="button"
            className={styles.button}
            aria-label={
              fullscreen
                ? t("mediaPlayer.exitFullscreen")
                : t("mediaPlayer.fullscreen")
            }
            onClick={toggleFullscreen}
            {...hooks("media-player", "button")}
          >
            <Icon name={fullscreen ? "exitFullscreen" : "fullscreen"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;
