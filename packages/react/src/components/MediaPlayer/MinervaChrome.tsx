import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { PlayerChromeState } from "@minerva/media-player";
import {
  bufferedEnd,
  DEFAULT_PLAYBACK_RATES,
  DEFAULT_SKIP_SECONDS,
  MEDIA_ICON_PATHS,
  formatMediaTime,
  formatPlaybackRate,
  mediaProgress,
  nextPlaybackRate,
  type MediaIconName,
} from "@minerva/core";
import useI18n from "../../hooks/useI18n";
import { hooks } from "../../internal/stylingHooks";
import { cn } from "../../utils/cn";
import styles from "./mediaPlayer.module.scss";
import type { MediaPlayerProps } from "./types";

const Icon = ({ name }: { name: MediaIconName }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d={MEDIA_ICON_PATHS[name]} />
  </svg>
);
const pointerFraction = (event: ReactPointerEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  return rect.width > 0
    ? Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    : 0;
};

/** Minerva presentation only; playback, state, engines and captions belong to the shared player. */
export function MinervaChrome({
  state,
  props,
}: {
  state: PlayerChromeState;
  props: MediaPlayerProps;
}) {
  const { t } = useI18n();
  const {
    paused,
    current: currentTime,
    duration,
    volume,
    muted,
    rate,
    loading,
    error,
    title,
    captionIndex: trackIndex,
    captionText: caption,
    fullscreen,
    pipActive: pip,
    pipSupported,
    togglePlay: toggle,
    seek,
    changeVolume,
    toggleMute,
    toggleFullscreen,
    togglePip,
  } = state;
  const tracks = props.tracks ?? [];
  const isVideo = !state.audioOnly;
  const skipSeconds = props.skipSeconds ?? DEFAULT_SKIP_SECONDS;
  const playbackRates = props.playbackRates ?? DEFAULT_PLAYBACK_RATES;
  const pictureInPicture = props.pictureInPicture ?? false;
  const mediaRef = { current: state.media };
  const buffered = bufferedEnd(
    {
      length: state.buffered.length,
      start: (index) => state.buffered[index]![0],
      end: (index) => state.buffered[index]![1],
    },
    currentTime,
  );
  const [captionsMenu, setCaptionsMenu] = useState(false);
  const captionsControlRef = useRef<HTMLSpanElement>(null);
  const captionsButtonRef = useRef<HTMLButtonElement>(null);
  const chooseTrack = (index: number) => {
    if (index !== trackIndex) state.selectCaption(index);
  };
  const cycleRate = () => state.setRate(nextPlaybackRate(rate, playbackRates));
  useEffect(() => {
    if (!captionsMenu) return;
    const control = captionsControlRef.current;
    control
      ?.querySelector<HTMLElement>('[aria-checked="true"]')
      ?.focus({ preventScroll: true });
    const closeOutside = (event: PointerEvent) => {
      if (!control?.contains(event.target as Node)) setCaptionsMenu(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [captionsMenu]);
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
    <>
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
          disabled={!!error}
          onClick={toggle}
          {...hooks("media-player", "button")}
        >
          <Icon name={paused ? "play" : "pause"} />
        </button>
        {skipSeconds > 0 && (
          <>
            <button
              type="button"
              className={cn(styles.button, styles.skipButton)}
              aria-label={t("mediaPlayer.skipBack", { count: skipSeconds })}
              disabled={!!error}
              onClick={() => seek(currentTime - skipSeconds)}
              {...hooks("media-player", "button")}
            >
              <Icon name="skipBack" />
            </button>
            <button
              type="button"
              className={cn(styles.button, styles.skipButton)}
              aria-label={t("mediaPlayer.skipForward", { count: skipSeconds })}
              disabled={!!error}
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
                    {index === trackIndex && (
                      <span aria-hidden="true" className={styles.captionsCheck}>
                        ✓
                      </span>
                    )}
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
    </>
  );
}
