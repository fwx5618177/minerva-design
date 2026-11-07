import { forwardRef, useImperativeHandle, useRef } from "react";
import {
  MediaPlayer as SharedMediaPlayer,
  type MediaPlayerHandle as SharedHandle,
  type PlayerChromeState,
} from "@minerva/media-player";
import { inferMediaType, mediaKeyAction } from "@minerva/core";
import useI18n from "../../hooks/useI18n";
import { hooks } from "../../internal/stylingHooks";
import { cn } from "../../utils/cn";
import { MinervaChrome } from "./MinervaChrome";
import styles from "./mediaPlayer.module.scss";
import type { MediaPlayerHandle, MediaPlayerProps } from "./types";

/** Minerva's public API and visual contract over the shared media player. */
const MediaPlayer = forwardRef<MediaPlayerHandle, MediaPlayerProps>(
  function MediaPlayer(props, ref) {
    const { t, language } = useI18n();
    const player = useRef<SharedHandle>(null);
    const type = inferMediaType(props.src, props.mimeType, props.type);
    const controls = props.controls !== false;
    useImperativeHandle(
      ref,
      () => ({
        play: () => player.current?.play() ?? Promise.resolve(),
        pause: () => player.current?.pause(),
        seek: (seconds) => player.current?.seek(seconds),
        get element() {
          return player.current?.element ?? null;
        },
      }),
      [],
    );
    const rootProps = (state: PlayerChromeState) => ({
      ...hooks("media-player", "root", {
        variant: type,
        status: state.ended ? "ended" : state.paused ? "paused" : "playing",
        loading: state.loading,
        invalid: !!state.error,
      }),
      className: cn(
        styles.mediaPlayer,
        controls
          ? type === "video"
            ? styles.video
            : styles.audio
          : styles.bare,
        !state.paused && styles.playing,
        props.className,
      ),
      role: controls ? "group" : undefined,
      "aria-label": controls
        ? (props["aria-label"] ?? props.title ?? t("mediaPlayer.label"))
        : undefined,
      tabIndex: controls ? 0 : undefined,
      onKeyDown: controls
        ? (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (
              (event.key === " " || event.key === "Enter") &&
              (event.target as HTMLElement).closest("button")
            )
              return;
            const action = mediaKeyAction(event.key, event);
            const media = state.media;
            if (
              !action ||
              !media ||
              (action.type === "fullscreen" && state.audioOnly)
            )
              return;
            event.preventDefault();
            switch (action.type) {
              case "toggle":
                state.togglePlay();
                break;
              case "seek":
                state.seek(media.currentTime + action.delta);
                break;
              case "volume":
                state.changeVolume(
                  (media.muted ? 0 : media.volume) + action.delta,
                );
                break;
              case "mute":
                state.toggleMute();
                break;
              case "fullscreen":
                state.toggleFullscreen();
                break;
              case "captions":
                state.toggleCaption();
                break;
            }
          }
        : undefined,
    });
    return (
      <SharedMediaPlayer
        {...props}
        ref={player}
        src={
          props.mimeType
            ? { src: props.src ?? "", mimeType: props.mimeType }
            : props.src
        }
        kind={type}
        mediaElement={type}
        locale={language}
        controls={controls}
        className={undefined}
        aspectRatio={props.aspectRatio ?? "16 / 9"}
        captionStorageKey="minerva-media-player-captions"
        rootProps={rootProps}
        mediaProps={{
          ...hooks("media-player", "media"),
          className: styles.media,
        }}
        renderChrome={
          controls
            ? (state) => <MinervaChrome state={state} props={props} />
            : undefined
        }
        onTimeUpdate={(currentTime, duration) =>
          props.onTimeUpdate?.({
            currentTime,
            duration: Number.isFinite(duration) && duration > 0 ? duration : 0,
          })
        }
        onError={() => props.onError?.(player.current?.element?.error ?? null)}
      />
    );
  },
);

export default MediaPlayer;
