import { css, html, nothing, svg, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import styles from "@react-styles/components/MediaPlayer/mediaPlayer.module.scss?inline";
import {
  DEFAULT_PLAYBACK_RATES,
  MEDIA_ICON_PATHS,
  bufferedEnd,
  clampMediaTime,
  clampVolume,
  formatMediaTime,
  formatPlaybackRate,
  inferMediaType,
  mediaKeyAction,
  mediaProgress,
  nextPlaybackRate,
  type MediaIconName,
} from "@minerva/core";
import { AriaController } from "../../internal/aria";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

/** Kind of media the player renders */
export type MediaPlayerType = "audio" | "video";

/** How much of the media the browser loads before playback */
export type MediaPlayerPreload = "none" | "metadata" | "auto";

/** CORS mode of the media request */
export type MediaPlayerCrossOrigin = "anonymous" | "use-credentials";

const icon = (name: MediaIconName) =>
  html`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    ${svg`<path d=${MEDIA_ICON_PATHS[name]}></path>`}
  </svg>`;

const finiteDuration = (value: number) =>
  Number.isFinite(value) && value > 0 ? value : 0;

const pointerFraction = (event: PointerEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  return rect.width > 0
    ? Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    : 0;
};

type PipDocument = Document & {
  pictureInPictureEnabled?: boolean;
  pictureInPictureElement?: Element | null;
  exitPictureInPicture?: () => Promise<void>;
};

/**
 * An `<audio>` / `<video>` element with themed custom controls (`<MediaPlayer>`
 * of React): play / pause, skip back / forward, a seek bar (`role=slider`,
 * buffered range), the time, mute and volume, the playback speed (cycle
 * button), fullscreen and picture-in-picture (video). Keyboard on the
 * focused player: Space / K play-pause, ← / → seek by 5 s, ↑ / ↓ volume,
 * M mute, F fullscreen.
 *
 * The media events don't cross the shadow root: they are re-dispatched as
 * `minerva-*` events. `play()`, `pause()`, `seek(seconds)` and `element`
 * drive the media from script.
 *
 * @summary Audio / video player with themed controls.
 * @tag minerva-media-player
 * @slot heading - Title of the media, shown in the audio bar / over the video
 * @csspart root - The outermost element (the focusable player)
 * @csspart media - The native `<audio>` or `<video>` element
 * @csspart title - The title of the media (audio bar, video overlay)
 * @csspart controls - The control bar
 * @csspart button - A control button (play, skip, mute, speed, fullscreen, picture-in-picture)
 * @csspart seek - The seek bar (`role=slider`) with the buffered range
 * @csspart time - The current time / duration text
 * @csspart volume - The volume bar (`role=slider`)
 * @csspart spinner - The loading indicator (while buffering)
 * @csspart error - The error message (media that can't be played)
 * @fires minerva-play - Playback started
 * @fires minerva-pause - Playback paused
 * @fires minerva-ended - Playback reached the end
 * @fires minerva-time-update - The playhead moved (`detail: { currentTime, duration }`, seconds)
 * @fires minerva-loaded-metadata - The metadata loaded (`detail: { duration }`)
 * @fires minerva-error - The media can't be loaded or played (`detail: { error }`, the `MediaError`)
 * @fires minerva-rate-change - The playback speed changed (`detail: { rate }`)
 * @fires minerva-volume-change - The volume or the muted state changed (`detail: { volume, muted }`)
 */
export class MinervaMediaPlayer extends MinervaElement {
  static override tagName = "minerva-media-player";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        inline-size: 100%;
      }
      :host(:fullscreen) .mediaPlayer {
        block-size: 100%;
        aspect-ratio: auto;
        border-radius: 0;
      }
    `,
    sharedStyles(styles),
  ];

  /** URL of the media */
  @property()
  src?: string;

  /** Kind of media; default: inferred from `mime-type`, else from the file extension of `src`, else "video" */
  @property({ reflect: true })
  type?: MediaPlayerType;

  /** MIME type of the media ("audio/mpeg", "video/mp4"...), used to infer `type` */
  @property({ attribute: "mime-type" })
  mimeType?: string;

  /** Image shown before a video plays */
  @property()
  poster?: string;

  /** Starts playing as soon as possible (browsers only allow muted autoplay without a user gesture) */
  @property({ type: Boolean, attribute: "autoplay" })
  autoPlay = false;

  /** Restarts at the end */
  @property({ type: Boolean })
  loop = false;

  /** Mutes the media; follows the mute button and the M key */
  @property({ type: Boolean })
  muted = false;

  /** How much of the media the browser loads before playback */
  @property()
  preload: MediaPlayerPreload = "metadata";

  /** CORS mode of the media request */
  @property({ attribute: "crossorigin" })
  crossOrigin?: MediaPlayerCrossOrigin;

  /** Resume position in seconds, applied once when the metadata loads (and again when `src` changes) */
  @property({ type: Number, attribute: "start-time" })
  startTime?: number;

  /** Speeds the speed button cycles through (default [0.5, 0.75, 1, 1.25, 1.5, 2]) */
  @property({ attribute: false })
  playbackRates: readonly number[] = DEFAULT_PLAYBACK_RATES;

  /** Step of the skip back / forward buttons, in seconds (0 hides them) */
  @property({ type: Number, attribute: "skip-seconds" })
  skipSeconds = 10;

  /** Hides the custom control bar: renders the bare media element (drive it from script) */
  @property({ type: Boolean, attribute: "no-controls", reflect: true })
  noControls = false;

  /** Height of a video player (CSS length; a bare number is pixels); overrides `aspect-ratio` */
  @property()
  height?: string;

  /** Aspect ratio of a video player (CSS aspect-ratio) */
  @property({ attribute: "aspect-ratio" })
  aspectRatio = "16 / 9";

  /** Shows a picture-in-picture button (video, where the browser supports it) */
  @property({ type: Boolean, attribute: "picture-in-picture" })
  pictureInPicture = false;

  @state() private paused = true;
  @state() private ended = false;
  @state() private loading = false;
  @state() private failed = false;
  @state() private currentTime = 0;
  @state() private duration = 0;
  @state() private buffered = 0;
  @state() private volume = 1;
  @state() private rate = 1;
  @state() private fullscreen = false;
  @state() private pip = false;
  /**
   * Out of the document: the media source is dropped so a removed player
   * stops downloading (a detached `<video>` keeps loading otherwise, and
   * starves the players that replace it, e.g. on an `innerHTML` re-render).
   */
  @state() private detached = false;

  private startApplied = false;
  /** Position to restore once a player moved in the document reloads */
  private resumeAt: number | null = null;
  private readonly i18n = new LocaleController(this);
  private readonly aria = new AriaController(this);
  private readonly slots = new HasSlotController(this);

  /** The rendered `<audio>` / `<video>` element (null before the first render) */
  get element(): HTMLMediaElement | null {
    return this.renderRoot?.querySelector?.("audio, video") ?? null;
  }

  /** Starts playback (autoplay-policy rejections are swallowed: the player stays paused) */
  play(): Promise<void> {
    const media = this.element;
    if (!media) return Promise.resolve();
    return Promise.resolve(media.play()).catch(() => undefined);
  }

  /** Pauses playback */
  pause(): void {
    this.element?.pause();
  }

  /** Moves the playhead to `seconds` (clamped to the duration) */
  seek(seconds: number): void {
    const media = this.element;
    if (!media) return;
    const next = clampMediaTime(seconds, finiteDuration(media.duration));
    media.currentTime = next;
    this.currentTime = next;
  }

  private readonly onFullscreenChange = () => {
    this.fullscreen = document.fullscreenElement === this;
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.detached = false;
    document.addEventListener("fullscreenchange", this.onFullscreenChange);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("fullscreenchange", this.onFullscreenChange);
    const media = this.element;
    if (media && this.startApplied) {
      this.resumeAt = media.currentTime;
      this.startApplied = false;
    }
    this.detached = true;
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    // a new source starts over
    if (changed.has("src") && changed.get("src") !== undefined) {
      this.startApplied = false;
      this.resumeAt = null;
      this.failed = false;
      this.ended = false;
      this.currentTime = 0;
      this.duration = 0;
      this.buffered = 0;
    }
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    // `src` is gone from the media: load() aborts its pending download
    if (changed.has("detached") && this.detached) this.element?.load?.();
  }

  private get mediaType(): MediaPlayerType {
    return inferMediaType(this.src, this.mimeType, this.type);
  }

  protected override hookStates() {
    return {
      variant: this.mediaType,
      status: this.ended ? "ended" : this.paused ? "paused" : "playing",
      loading: this.loading && !this.noControls,
      invalid: this.failed && !this.noControls,
    };
  }

  private toggle() {
    const media = this.element;
    if (!media) return;
    if (media.paused || media.ended) void this.play();
    else media.pause();
  }

  private toggleMute() {
    const media = this.element;
    if (!media) return;
    media.muted = !media.muted;
    this.muted = media.muted;
  }

  private changeVolume(next: number) {
    const media = this.element;
    if (!media) return;
    media.volume = clampVolume(next);
    if (media.volume > 0 && media.muted) media.muted = false;
    this.volume = media.volume;
    this.muted = media.muted;
  }

  private cycleRate() {
    const media = this.element;
    if (!media) return;
    media.playbackRate = nextPlaybackRate(
      media.playbackRate,
      this.playbackRates,
    );
    this.rate = media.playbackRate;
  }

  private toggleFullscreen() {
    if (this.mediaType !== "video") return;
    if (document.fullscreenElement === this) {
      void document.exitFullscreen?.().catch(() => undefined);
    } else if (typeof this.requestFullscreen === "function") {
      void this.requestFullscreen().catch(() => undefined);
    } else {
      // iOS Safari: only the video element itself goes fullscreen
      (
        this.element as
          (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null
      )?.webkitEnterFullscreen?.();
    }
  }

  private togglePip() {
    const video = this.element as HTMLVideoElement | null;
    if (!video) return;
    const doc = document as PipDocument;
    if (doc.pictureInPictureElement === video) {
      void doc.exitPictureInPicture?.().catch(() => undefined);
    } else {
      void video.requestPictureInPicture?.().catch(() => undefined);
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    // Space / Enter activate the focused button
    if (
      (event.key === " " || event.key === "Enter") &&
      target.closest?.("button")
    ) {
      return;
    }
    const action = mediaKeyAction(event.key, event);
    const media = this.element;
    if (!action || !media) return;
    if (action.type === "fullscreen" && this.mediaType !== "video") return;
    event.preventDefault();
    switch (action.type) {
      case "toggle":
        this.toggle();
        break;
      case "seek":
        this.seek(media.currentTime + action.delta);
        break;
      case "volume":
        this.changeVolume((media.muted ? 0 : media.volume) + action.delta);
        break;
      case "mute":
        this.toggleMute();
        break;
      case "fullscreen":
        this.toggleFullscreen();
        break;
    }
  }

  private drag(event: PointerEvent, apply: (fraction: number) => void) {
    const target = event.currentTarget as HTMLElement;
    if (event.type === "pointerdown") {
      target.setPointerCapture?.(event.pointerId);
    } else if (!target.hasPointerCapture?.(event.pointerId)) {
      return;
    }
    apply(pointerFraction(event));
  }

  private readonly dragSeek = (event: PointerEvent) => {
    if (this.duration) {
      this.drag(event, (fraction) => this.seek(fraction * this.duration));
    }
  };

  private readonly dragVolume = (event: PointerEvent) =>
    this.drag(event, (fraction) => this.changeVolume(fraction));

  private seekKeys(event: KeyboardEvent) {
    const media = this.element;
    if (!media || !this.duration) return;
    const skip = this.skipSeconds || 10;
    const steps: Record<string, number> = {
      ArrowLeft: -5,
      ArrowDown: -5,
      ArrowRight: 5,
      ArrowUp: 5,
      PageDown: -skip,
      PageUp: skip,
    };
    let next: number | undefined;
    if (event.key in steps) next = media.currentTime + steps[event.key]!;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = this.duration;
    if (next === undefined) return;
    event.preventDefault();
    event.stopPropagation();
    this.seek(next);
  }

  private volumeKeys(event: KeyboardEvent) {
    const media = this.element;
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
    this.changeVolume(next);
  }

  // --- media events (re-dispatched: they don't cross the shadow root) ----
  private syncTime(media: HTMLMediaElement) {
    this.currentTime = media.currentTime;
    this.buffered = bufferedEnd(media.buffered, media.currentTime);
  }

  private readonly onMediaPlay = () => {
    this.paused = false;
    this.ended = false;
    this.emit("minerva-play");
  };

  private readonly onMediaPause = () => {
    this.paused = true;
    this.loading = false;
    this.emit("minerva-pause");
  };

  private readonly onMediaEnded = () => {
    this.paused = true;
    this.ended = true;
    this.loading = false;
    this.emit("minerva-ended");
  };

  private readonly onWaiting = () => {
    this.loading = true;
  };

  private readonly onReady = () => {
    this.loading = false;
  };

  private readonly onProgress = (event: Event) =>
    this.syncTime(event.currentTarget as HTMLMediaElement);

  private readonly onDurationChange = (event: Event) => {
    this.duration = finiteDuration(
      (event.currentTarget as HTMLMediaElement).duration,
    );
  };

  private readonly onLoadedMetadata = (event: Event) => {
    const media = event.currentTarget as HTMLMediaElement;
    const total = finiteDuration(media.duration);
    this.duration = total;
    this.failed = false;
    if (!this.startApplied) {
      this.startApplied = true;
      const start = this.resumeAt ?? this.startTime;
      this.resumeAt = null;
      if (start && start > 0) {
        media.currentTime = clampMediaTime(start, total);
      }
    }
    this.syncTime(media);
    this.emit("minerva-loaded-metadata", { duration: total });
  };

  private readonly onTimeUpdate = (event: Event) => {
    const media = event.currentTarget as HTMLMediaElement;
    this.syncTime(media);
    this.emit("minerva-time-update", {
      currentTime: media.currentTime,
      duration: finiteDuration(media.duration),
    });
  };

  private readonly onVolumeChange = (event: Event) => {
    const media = event.currentTarget as HTMLMediaElement;
    this.volume = media.volume;
    this.muted = media.muted;
    this.emit("minerva-volume-change", {
      volume: media.volume,
      muted: media.muted,
    });
  };

  private readonly onRateChange = (event: Event) => {
    const media = event.currentTarget as HTMLMediaElement;
    this.rate = media.playbackRate;
    this.emit("minerva-rate-change", { rate: media.playbackRate });
  };

  private readonly onMediaError = (event: Event) => {
    this.failed = true;
    this.loading = false;
    this.emit("minerva-error", {
      error: (event.currentTarget as HTMLMediaElement).error,
    });
  };

  private get cssHeight(): string {
    const height = String(this.height ?? "").trim();
    return /^\d+(\.\d+)?$/.test(height) ? `${height}px` : height;
  }

  private renderMedia(isVideo: boolean) {
    const controls = !this.noControls;
    const src = this.detached ? undefined : this.src;
    if (isVideo) {
      return html`<video
        part="media"
        class="media"
        src=${src ?? nothing}
        poster=${this.poster ?? nothing}
        preload=${this.preload}
        crossorigin=${this.crossOrigin ?? nothing}
        style=${
          !controls && this.height
            ? `height:${this.cssHeight};width:auto`
            : nothing
        }
        ?autoplay=${this.autoPlay}
        ?loop=${this.loop}
        .muted=${this.muted}
        playsinline
        @play=${this.onMediaPlay}
        @pause=${this.onMediaPause}
        @ended=${this.onMediaEnded}
        @playing=${this.onReady}
        @canplay=${this.onReady}
        @waiting=${this.onWaiting}
        @loadedmetadata=${this.onLoadedMetadata}
        @durationchange=${this.onDurationChange}
        @timeupdate=${this.onTimeUpdate}
        @progress=${this.onProgress}
        @volumechange=${this.onVolumeChange}
        @ratechange=${this.onRateChange}
        @error=${this.onMediaError}
        @enterpictureinpicture=${() => (this.pip = true)}
        @leavepictureinpicture=${() => (this.pip = false)}
        @click=${controls ? () => this.toggle() : nothing}
        @dblclick=${controls ? () => this.toggleFullscreen() : nothing}
      ></video>`;
    }
    return html`<audio
      part="media"
      class="media"
      src=${src ?? nothing}
      preload=${this.preload}
      crossorigin=${this.crossOrigin ?? nothing}
      ?autoplay=${this.autoPlay}
      ?loop=${this.loop}
      .muted=${this.muted}
      @play=${this.onMediaPlay}
      @pause=${this.onMediaPause}
      @ended=${this.onMediaEnded}
      @playing=${this.onReady}
      @canplay=${this.onReady}
      @waiting=${this.onWaiting}
      @loadedmetadata=${this.onLoadedMetadata}
      @durationchange=${this.onDurationChange}
      @timeupdate=${this.onTimeUpdate}
      @progress=${this.onProgress}
      @volumechange=${this.onVolumeChange}
      @ratechange=${this.onRateChange}
      @error=${this.onMediaError}
    ></audio>`;
  }

  private button(
    label: string,
    content: unknown,
    onClick: () => void,
    options: { disabled?: boolean; pressed?: boolean; extra?: string } = {},
  ) {
    return html`<button
      type="button"
      part="button"
      class=${options.extra ? `button ${options.extra}` : "button"}
      aria-label=${label}
      aria-pressed=${
        options.pressed === undefined ? nothing : String(options.pressed)
      }
      ?disabled=${options.disabled ?? false}
      @click=${onClick}
    >
      ${content}
    </button>`;
  }

  protected override render() {
    const t = this.i18n.t;
    const isVideo = this.mediaType === "video";
    if (this.noControls) {
      return html`<div part="root" class="mediaPlayer bare">
        ${this.renderMedia(isVideo)}
      </div>`;
    }
    const { currentTime, duration, paused, failed, rate, muted } = this;
    const shownVolume = muted ? 0 : this.volume;
    const skip = this.skipSeconds;
    const playing = !paused && !this.ended;
    const heading = this.slots.test("heading")
      ? this.querySelector('[slot="heading"]')?.textContent?.trim() || ""
      : "";
    const pipSupported =
      typeof document !== "undefined" &&
      (document as PipDocument).pictureInPictureEnabled === true;
    const size = isVideo
      ? this.height
        ? `height:${this.cssHeight}`
        : `aspect-ratio:${this.aspectRatio}`
      : nothing;
    const spinner =
      this.loading && !failed
        ? html`<span
            part="spinner"
            class="spinner"
            role="status"
            aria-label=${t("mediaPlayer.loading")}
          ></span>`
        : nothing;
    const volumePercent = Math.round(shownVolume * 100);

    return html`<div
      part="root"
      class="mediaPlayer ${isVideo ? "video" : "audio"}${
        playing ? " playing" : ""
      }"
      role="group"
      tabindex="0"
      aria-label=${this.aria.label ?? (heading || t("mediaPlayer.label"))}
      style=${size}
      @keydown=${this.handleKeyDown}
    >
      ${this.renderMedia(isVideo)}
      <div part="title" class="title" ?hidden=${!this.slots.test("heading")}>
        <slot name="heading"></slot>
      </div>
      ${isVideo ? spinner : nothing}
      ${
        failed
          ? html`<div part="error" class="error" role="alert">
              ${t("mediaPlayer.error")}
            </div>`
          : nothing
      }
      <div part="controls" class="controls">
        <div
          part="seek"
          class="slider seek"
          role="slider"
          tabindex="0"
          aria-label=${t("mediaPlayer.seek")}
          aria-valuemin="0"
          aria-valuemax=${Math.round(duration)}
          aria-valuenow=${Math.round(currentTime)}
          aria-valuetext=${t("mediaPlayer.timeOf", {
            current: formatMediaTime(currentTime, duration),
            duration: formatMediaTime(duration),
          })}
          aria-disabled=${duration ? nothing : "true"}
          style="--_mp-value:${
            mediaProgress(currentTime, duration) * 100
          }%;--_mp-buffered:${mediaProgress(this.buffered, duration) * 100}%"
          @pointerdown=${this.dragSeek}
          @pointermove=${this.dragSeek}
          @keydown=${this.seekKeys}
        >
          <span class="track"></span><span class="buffered"></span
          ><span class="fill"></span><span class="thumb"></span>
        </div>
        ${this.button(
          paused ? t("mediaPlayer.play") : t("mediaPlayer.pause"),
          icon(paused ? "play" : "pause"),
          () => this.toggle(),
          { disabled: failed },
        )}
        ${
          skip > 0
            ? html`${this.button(
                t("mediaPlayer.skipBack", { count: skip }),
                icon("skipBack"),
                () => this.seek(this.currentTime - skip),
                { disabled: failed },
              )}${this.button(
                t("mediaPlayer.skipForward", { count: skip }),
                icon("skipForward"),
                () => this.seek(this.currentTime + skip),
                { disabled: failed },
              )}`
            : nothing
        }
        ${isVideo ? nothing : spinner}
        <span part="time" class="time"
          >${formatMediaTime(currentTime, duration)} /
          ${formatMediaTime(duration)}</span
        >
        <span class="spacer"></span>
        ${this.button(
          muted ? t("mediaPlayer.unmute") : t("mediaPlayer.mute"),
          icon(muted || this.volume === 0 ? "muted" : "volume"),
          () => this.toggleMute(),
          { pressed: muted },
        )}
        <div
          part="volume"
          class="slider volume"
          role="slider"
          tabindex="0"
          aria-label=${t("mediaPlayer.volume")}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${volumePercent}
          aria-valuetext="${volumePercent}%"
          style="--_mp-value:${shownVolume * 100}%"
          @pointerdown=${this.dragVolume}
          @pointermove=${this.dragVolume}
          @keydown=${this.volumeKeys}
        >
          <span class="track"></span><span class="fill"></span
          ><span class="thumb"></span>
        </div>
        ${
          this.playbackRates.length > 1
            ? this.button(
                t("mediaPlayer.playbackRate", {
                  rate: formatPlaybackRate(rate),
                }),
                formatPlaybackRate(rate),
                () => this.cycleRate(),
                { extra: "rate" },
              )
            : nothing
        }
        ${
          isVideo && this.pictureInPicture && pipSupported
            ? this.button(
                this.pip
                  ? t("mediaPlayer.exitPictureInPicture")
                  : t("mediaPlayer.pictureInPicture"),
                icon("pictureInPicture"),
                () => this.togglePip(),
                { pressed: this.pip },
              )
            : nothing
        }
        ${
          isVideo
            ? this.button(
                this.fullscreen
                  ? t("mediaPlayer.exitFullscreen")
                  : t("mediaPlayer.fullscreen"),
                icon(this.fullscreen ? "exitFullscreen" : "fullscreen"),
                () => this.toggleFullscreen(),
              )
            : nothing
        }
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-media-player": MinervaMediaPlayer;
  }
}
