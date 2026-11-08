import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  output,
  signal,
  untracked,
  viewChild,
} from "@angular/core";
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
} from "@minerva/core";
import { bindMediaCaptions } from "@minerva/dom";
import { injectScope } from "../../config/scope";
import { MnHook } from "../../internal/hooks";
import * as styles from "../../internal/styles";

/** Kind of media a MediaPlayer renders */
export type MediaPlayerType = "audio" | "video";

/** How much of the media the browser loads before playback */
export type MediaPlayerPreload = "none" | "metadata" | "auto";

/** CORS mode of the media request */
export type MediaPlayerCrossOrigin = "anonymous" | "use-credentials";

/** Payload of `(timeUpdate)` */
export interface MediaPlayerTimeDetail {
  /** Playhead position, in seconds */
  currentTime: number;
  /** Duration in seconds (0 while unknown) */
  duration: number;
}

/** Payload of `(volumeChange)` */
export interface MediaPlayerVolumeDetail {
  /** Volume, 0..1 */
  volume: number;
  /** Whether the media is muted */
  muted: boolean;
}

/** A captions / subtitles file of a MediaPlayer */
export interface MediaPlayerTrack {
  /** URL of the WebVTT (.vtt) or SubRip (.srt) file; data: URLs work */
  src: string;
  /** Language of the track (BCP 47: "en", "fr-CA") */
  srclang?: string;
  /** Name shown in the captions menu */
  label: string;
  /** Kind of text track (default "subtitles") */
  kind?: "subtitles" | "captions";
  /** Shown when the user has not chosen captions yet */
  default?: boolean;
}

/** Payload of `(trackChange)` */
export interface MediaPlayerTrackChangeDetail {
  /** Index of the chosen track in `tracks`, -1 for Off */
  index: number;
  /** The chosen track, null for Off */
  track: MediaPlayerTrack | null;
}

const captionsStorage = (doc: Document) => {
  try {
    return doc.defaultView?.localStorage ?? null;
  } catch {
    return null;
  }
};

const finiteDuration = (value: number) =>
  Number.isFinite(value) && value > 0 ? value : 0;

const pointerFraction = (event: PointerEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  return rect.width > 0
    ? Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    : 0;
};

const cssSize = (value: number | string) =>
  typeof value === "number" || /^\d+(\.\d+)?$/.test(value)
    ? `${value}px`
    : value;

/**
 * An `<audio>` / `<video>` element with themed custom controls: play /
 * pause, skip back / forward, a seek bar (role=slider, buffered range), the
 * time, mute and volume, the playback speed (cycle button), fullscreen and
 * picture-in-picture (video), and a captions menu when `tracks` are given
 * (cues drawn by the player). Keyboard on the focused player: Space / K
 * play-pause, ← / → seek by 5 s, ↑ / ↓ volume, M mute, F fullscreen,
 * C captions on / off.
 * Outputs: `(timeUpdate)`, `(ended)`, `(played)`, `(paused)`,
 * `(loadedMetadata)`, `(mediaError)`, `(rateChange)`, `(volumeChange)`,
 * `(trackChange)`.
 * Methods: `play()`, `pause()`, `seek(seconds)`, `element`.
 */
@Component({
  selector: "mn-media-player",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "media-player",
    "data-part": "root",
    "[attr.data-variant]": "type()",
    "[attr.data-status]": "status()",
    "[attr.data-loading]": "controls() && loading() ? '' : null",
    "[attr.data-invalid]": "controls() && failed() ? '' : null",
    "[attr.role]": "controls() ? 'group' : null",
    "[attr.tabindex]": "controls() ? 0 : null",
    "[attr.aria-label]": "controls() ? label() : null",
    "[attr.title]": "null",
    "[class]": "rootClass()",
    "[style.height]": "rootHeight()",
    "[style.aspect-ratio]": "rootAspectRatio()",
    "(keydown)": "onKeydown($event)",
  },
  template: `@if (isVideo()) {
      <video
        #media
        mnHook="media-player"
        mnPart="media"
        [class]="s.media"
        [attr.src]="src() ?? null"
        [attr.poster]="poster() ?? null"
        [attr.preload]="preload()"
        [attr.crossorigin]="crossOrigin() ?? null"
        [autoplay]="autoPlay()"
        [loop]="loop()"
        [muted]="muted()"
        [style.height]="
          !controls() && height() !== undefined ? bareHeight() : null
        "
        [style.width]="!controls() && height() !== undefined ? 'auto' : null"
        playsinline
        (play)="onPlay()"
        (pause)="onPause()"
        (playing)="loading.set(false)"
        (canplay)="loading.set(false)"
        (waiting)="loading.set(true)"
        (ended)="onEnded()"
        (loadedmetadata)="onLoadedMetadata($event)"
        (durationchange)="onDurationChange($event)"
        (timeupdate)="onTimeUpdate($event)"
        (progress)="syncTime($event.currentTarget)"
        (volumechange)="onVolumeChange($event)"
        (ratechange)="onRateChange($event)"
        (error)="onError($event)"
        (enterpictureinpicture)="pip.set(true)"
        (leavepictureinpicture)="pip.set(false)"
        (click)="controls() && toggle()"
        (dblclick)="controls() && toggleFullscreen()"
      >
        @for (item of tracks(); track $index) {
          <track
            [attr.kind]="item.kind ?? 'subtitles'"
            [attr.src]="item.src"
            [attr.srclang]="item.srclang ?? null"
            [attr.label]="item.label"
            [attr.default]="!controls() && $index === trackIndex() ? '' : null"
          />
        }
      </video>
    } @else {
      <audio
        #media
        mnHook="media-player"
        mnPart="media"
        [class]="s.media"
        [attr.src]="src() ?? null"
        [attr.preload]="preload()"
        [attr.crossorigin]="crossOrigin() ?? null"
        [autoplay]="autoPlay()"
        [loop]="loop()"
        [muted]="muted()"
        (play)="onPlay()"
        (pause)="onPause()"
        (playing)="loading.set(false)"
        (canplay)="loading.set(false)"
        (waiting)="loading.set(true)"
        (ended)="onEnded()"
        (loadedmetadata)="onLoadedMetadata($event)"
        (durationchange)="onDurationChange($event)"
        (timeupdate)="onTimeUpdate($event)"
        (progress)="syncTime($event.currentTarget)"
        (volumechange)="onVolumeChange($event)"
        (ratechange)="onRateChange($event)"
        (error)="onError($event)"
      >
        @for (item of tracks(); track $index) {
          <track
            [attr.kind]="item.kind ?? 'subtitles'"
            [attr.src]="item.src"
            [attr.srclang]="item.srclang ?? null"
            [attr.label]="item.label"
            [attr.default]="!controls() && $index === trackIndex() ? '' : null"
          />
        }
      </audio>
    }
    @if (controls()) {
      @if (title()) {
        <div mnHook="media-player" mnPart="title" [class]="s.title">
          {{ title() }}
        </div>
      }
      @if (isVideo() && showSpinner()) {
        <span
          mnHook="media-player"
          mnPart="spinner"
          role="status"
          [class]="s.spinner"
          [attr.aria-label]="scope.t('mediaPlayer.loading')"
        ></span>
      }
      @if (isVideo() ? caption() !== "" : trackIndex() >= 0) {
        <div mnHook="media-player" mnPart="captions" [class]="s.captions">
          @if (caption()) {
            <span [class]="s.cue">{{ caption() }}</span>
          }
        </div>
      }
      @if (failed()) {
        <div
          mnHook="media-player"
          mnPart="error"
          role="alert"
          [class]="s.error"
        >
          {{ scope.t("mediaPlayer.error") }}
        </div>
      }
      <div mnHook="media-player" mnPart="controls" [class]="s.controls">
        <div [class]="isVideo() ? s.timeline : s.audioTimeline">
          @if (isVideo()) {
            <span
              mnHook="media-player"
              mnPart="time"
              [class]="s.time"
              [attr.title]="timeText()"
              >{{ timeText() }}</span
            >
          }
          <div
            mnHook="media-player"
            mnPart="seek"
            role="slider"
            tabindex="0"
            [class]="s.slider + ' ' + s.seek"
            [attr.aria-label]="scope.t('mediaPlayer.seek')"
            aria-valuemin="0"
            [attr.aria-valuemax]="round(duration())"
            [attr.aria-valuenow]="round(currentTime())"
            [attr.aria-valuetext]="seekText()"
            [attr.aria-disabled]="duration() ? null : 'true'"
            [style.--_mp-value]="progress() + '%'"
            [style.--_mp-buffered]="bufferedPercent() + '%'"
            (pointerdown)="dragSeek($event)"
            (pointermove)="dragSeek($event)"
            (keydown)="seekKeys($event)"
          >
            <span [class]="s.track"></span><span [class]="s.buffered"></span
            ><span [class]="s.fill"></span><span [class]="s.thumb"></span>
          </div>
        </div>
        <div [class]="s.actions">
          <button
            type="button"
            mnHook="media-player"
            mnPart="button"
            [class]="s.button"
            [attr.aria-label]="
              isPaused()
                ? scope.t('mediaPlayer.play')
                : scope.t('mediaPlayer.pause')
            "
            [disabled]="failed()"
            (click)="toggle()"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path [attr.d]="isPaused() ? icons.play : icons.pause" />
            </svg>
          </button>
          @if (skipSeconds() > 0) {
            <button
              type="button"
              mnHook="media-player"
              mnPart="button"
              [class]="s.button + ' ' + s.skipButton"
              [attr.aria-label]="
                scope.t('mediaPlayer.skipBack', { count: skipSeconds() })
              "
              [disabled]="failed()"
              (click)="seek(currentTime() - skipSeconds())"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path [attr.d]="icons.skipBack" />
              </svg>
            </button>
            <button
              type="button"
              mnHook="media-player"
              mnPart="button"
              [class]="s.button + ' ' + s.skipButton"
              [attr.aria-label]="
                scope.t('mediaPlayer.skipForward', { count: skipSeconds() })
              "
              [disabled]="failed()"
              (click)="seek(currentTime() + skipSeconds())"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path [attr.d]="icons.skipForward" />
              </svg>
            </button>
          }
          @if (!isVideo() && showSpinner()) {
            <span
              mnHook="media-player"
              mnPart="spinner"
              role="status"
              [class]="s.spinner"
              [attr.aria-label]="scope.t('mediaPlayer.loading')"
            ></span>
          }
          @if (!isVideo()) {
            <span
              mnHook="media-player"
              mnPart="time"
              [class]="s.time"
              [attr.title]="timeText()"
              >{{ timeText() }}</span
            >
          }
          <span [class]="s.spacer"></span>
          <button
            type="button"
            mnHook="media-player"
            mnPart="button"
            [class]="s.button"
            [attr.aria-label]="
              muted()
                ? scope.t('mediaPlayer.unmute')
                : scope.t('mediaPlayer.mute')
            "
            [attr.aria-pressed]="muted()"
            (click)="toggleMute()"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                [attr.d]="
                  muted() || volume() === 0 ? icons.muted : icons.volume
                "
              />
            </svg>
          </button>
          <div
            mnHook="media-player"
            mnPart="volume"
            role="slider"
            tabindex="0"
            [class]="s.slider + ' ' + s.volume"
            [attr.aria-label]="scope.t('mediaPlayer.volume')"
            aria-valuemin="0"
            aria-valuemax="100"
            [attr.aria-valuenow]="volumePercent()"
            [attr.aria-valuetext]="volumePercent() + '%'"
            [style.--_mp-value]="volumePercent() + '%'"
            (pointerdown)="dragVolume($event)"
            (pointermove)="dragVolume($event)"
            (keydown)="volumeKeys($event)"
          >
            <span [class]="s.track"></span><span [class]="s.fill"></span
            ><span [class]="s.thumb"></span>
          </div>
          @if (playbackRates().length > 1) {
            <button
              type="button"
              mnHook="media-player"
              mnPart="button"
              [class]="s.button + ' ' + s.rate"
              [attr.aria-label]="
                scope.t('mediaPlayer.playbackRate', { rate: rateText() })
              "
              (click)="cycleRate()"
            >
              {{ rateText() }}
            </button>
          }
          @if (tracks().length > 0) {
            <span
              #captionsControl
              [class]="s.captionsControl"
              (focusout)="onCaptionsFocusOut($event)"
            >
              <button
                #captionsButton
                type="button"
                mnHook="media-player"
                mnPart="button"
                [class]="
                  trackIndex() >= 0 ? s.button + ' ' + s.captionsOn : s.button
                "
                [attr.aria-label]="scope.t('mediaPlayer.captions')"
                aria-haspopup="menu"
                [attr.aria-expanded]="captionsMenu()"
                (click)="captionsMenu.set(!captionsMenu())"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path [attr.d]="icons.captions" />
                </svg>
              </button>
              @if (captionsMenu()) {
                <div
                  mnHook="media-player"
                  mnPart="captions-menu"
                  role="menu"
                  [class]="s.captionsMenu"
                  [attr.aria-label]="scope.t('mediaPlayer.captions')"
                  (keydown)="captionsMenuKeys($event)"
                >
                  @for (option of captionsOptions(); track option.index) {
                    <button
                      type="button"
                      role="menuitemradio"
                      [class]="s.captionsOption"
                      [attr.aria-checked]="option.index === trackIndex()"
                      [attr.tabindex]="option.index === trackIndex() ? 0 : -1"
                      (click)="
                        chooseTrack(option.index); closeCaptionsMenu(true)
                      "
                    >
                      {{ option.label }}
                    </button>
                  }
                </div>
              }
            </span>
          }
          @if (isVideo() && pictureInPicture() && pipSupported()) {
            <button
              type="button"
              mnHook="media-player"
              mnPart="button"
              [class]="s.button"
              [attr.aria-label]="
                pip()
                  ? scope.t('mediaPlayer.exitPictureInPicture')
                  : scope.t('mediaPlayer.pictureInPicture')
              "
              [attr.aria-pressed]="pip()"
              (click)="togglePip()"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path [attr.d]="icons.pictureInPicture" />
              </svg>
            </button>
          }
          @if (isVideo()) {
            <button
              type="button"
              mnHook="media-player"
              mnPart="button"
              [class]="s.button"
              [attr.aria-label]="
                fullscreen()
                  ? scope.t('mediaPlayer.exitFullscreen')
                  : scope.t('mediaPlayer.fullscreen')
              "
              (click)="toggleFullscreen()"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  [attr.d]="
                    fullscreen() ? icons.exitFullscreen : icons.fullscreen
                  "
                />
              </svg>
            </button>
          }
        </div>
      </div>
    }`,
})
export class MnMediaPlayer {
  /** URL of the media */
  readonly src = input<string | undefined>(undefined);
  /** Kind of media; default: inferred from mimeType, else from the file extension of src, else "video" */
  readonly typeInput = input<MediaPlayerType | undefined>(undefined, {
    alias: "type",
  });
  /** MIME type of the media ("audio/mpeg", "video/mp4"...), used to infer the type */
  readonly mimeType = input<string | undefined>(undefined);
  /** Image shown before a video plays */
  readonly poster = input<string | undefined>(undefined);
  /** Title of the media, shown in the audio bar / over the video */
  readonly title = input<string | undefined>(undefined);
  /** Starts playing as soon as possible (browsers only allow muted autoplay without a user gesture) */
  readonly autoPlay = input(false, { transform: booleanAttribute });
  /** Restarts at the end */
  readonly loop = input(false, { transform: booleanAttribute });
  /** Mutes the media; applied whenever it changes (the mute button still toggles the sound) */
  readonly mutedInput = input<boolean | undefined, unknown>(undefined, {
    alias: "muted",
    transform: (value: unknown) =>
      value === undefined ? undefined : booleanAttribute(value),
  });
  /** Initially muted */
  readonly defaultMuted = input(false, { transform: booleanAttribute });
  /** How much of the media the browser loads before playback */
  readonly preload = input<MediaPlayerPreload>("metadata");
  /** CORS mode of the media request (cross-origin caption files need it too, plus CORS headers on their server) */
  readonly crossOrigin = input<MediaPlayerCrossOrigin | undefined>(undefined);
  /** Resume position in seconds, applied once when the metadata loads (and again when src changes) */
  readonly startTime = input<number | undefined, unknown>(undefined, {
    transform: (value: unknown) =>
      value === undefined || value === null || value === ""
        ? undefined
        : numberAttribute(value, 0),
  });
  /** Speeds the speed button cycles through */
  readonly playbackRates = input<readonly number[]>(DEFAULT_PLAYBACK_RATES);
  /** Step of the skip back / forward buttons, in seconds (0 hides them) */
  readonly skipSeconds = input(DEFAULT_SKIP_SECONDS, {
    transform: (value: unknown) => numberAttribute(value, DEFAULT_SKIP_SECONDS),
  });
  /** Shows the custom control bar; false renders the bare media element */
  readonly controls = input(true, { transform: booleanAttribute });
  /** Height of a video player (number: pixels); overrides aspectRatio */
  readonly height = input<number | string | undefined>(undefined);
  /** Aspect ratio of a video player (CSS aspect-ratio) */
  readonly aspectRatio = input("16 / 9");
  /** Shows a picture-in-picture button (video, where the browser supports it) */
  readonly pictureInPicture = input(false, { transform: booleanAttribute });
  /**
   * Captions / subtitles (WebVTT or SRT files): rendered as <track> children
   * and drawn by the player over the video (below the title for audio), with
   * a captions menu in the control bar. The choice is remembered
   * (localStorage); a `default` track shows until the user chooses
   */
  readonly tracks = input<readonly MediaPlayerTrack[]>([]);
  /** Accessible label of the player (default: title, else translated "Media player") */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });

  /** The playhead moved */
  readonly timeUpdate = output<MediaPlayerTimeDetail>();
  /** Playback reached the end */
  readonly ended = output<void>();
  /** Playback started */
  readonly played = output<void>();
  /** Playback paused */
  readonly paused = output<void>();
  /** The metadata loaded */
  readonly loadedMetadata = output<{ duration: number }>();
  /** The media can't be loaded or played */
  readonly mediaError = output<MediaError | null>();
  /** The playback speed changed */
  readonly rateChange = output<number>();
  /** The volume or the muted state changed */
  readonly volumeChange = output<MediaPlayerVolumeDetail>();
  /** The user chose captions (index -1 and track null: Off) */
  readonly trackChange = output<MediaPlayerTrackChangeDetail>();

  protected readonly s = styles.mediaPlayerStyles;
  protected readonly scope = injectScope();
  protected readonly icons = MEDIA_ICON_PATHS;
  protected readonly round = Math.round;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly mediaRef = viewChild<ElementRef<HTMLMediaElement>>("media");
  private startApplied = false;

  protected readonly isPaused = signal(true);
  private readonly hasEnded = signal(false);
  protected readonly loading = signal(false);
  protected readonly failed = signal(false);
  protected readonly currentTime = signal(0);
  protected readonly duration = signal(0);
  private readonly buffered = signal(0);
  protected readonly volume = signal(1);
  protected readonly muted = signal(false);
  private readonly rate = signal(1);
  protected readonly fullscreen = signal(false);
  protected readonly pip = signal(false);
  protected readonly pipSupported = signal(false);

  // --- captions ------------------------------------------------------------
  // The choice is kept as its remembered form (language / label / "off") so
  // it survives a new `tracks` array; `index` disambiguates equal languages.
  private readonly captionsChoice = signal<{
    pref: string | null;
    index: number;
  }>({ pref: null, index: -1 });
  protected readonly trackIndex = computed(() => {
    const tracks = this.tracks();
    const { pref, index } = this.captionsChoice();
    const chosen = tracks[index];
    return chosen && captionsPreference(chosen) === pref
      ? index
      : pickCaptionsTrack(tracks, pref);
  });
  private readonly tracksKey = computed(() =>
    this.tracks()
      .map((track) => `${track.src}\n${track.srclang}\n${track.label}`)
      .join("\n\n"),
  );
  protected readonly caption = signal("");
  protected readonly captionsMenu = signal(false);
  protected readonly captionsOptions = computed(() => [
    { index: -1, label: this.scope.t("mediaPlayer.captionsOff") },
    ...this.tracks().map((track, index) => ({ index, label: track.label })),
  ]);
  private readonly captionsControl =
    viewChild<ElementRef<HTMLElement>>("captionsControl");
  private readonly captionsButton =
    viewChild<ElementRef<HTMLButtonElement>>("captionsButton");
  private lastTrack = -1;

  constructor() {
    let first = true;
    effect(() => {
      const muted = this.mutedInput();
      untracked(() => {
        if (first) {
          first = false;
          this.muted.set(muted ?? this.defaultMuted());
          return;
        }
        if (muted === undefined) return;
        this.muted.set(muted);
        const media = this.element;
        if (media) media.muted = muted;
      });
    });
    let lastSrc: string | undefined | null = null;
    effect(() => {
      const src = this.src();
      untracked(() => {
        if (lastSrc !== null && src !== lastSrc) {
          this.startApplied = false;
          this.failed.set(false);
          this.hasEnded.set(false);
          this.currentTime.set(0);
          this.duration.set(0);
          this.buffered.set(0);
        }
        lastSrc = src;
      });
    });
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const doc = this.host.nativeElement.ownerDocument;
      this.pipSupported.set(
        (doc as Document & { pictureInPictureEnabled?: boolean })
          .pictureInPictureEnabled === true,
      );
      const onChange = () =>
        this.fullscreen.set(doc.fullscreenElement === this.host.nativeElement);
      doc.addEventListener("fullscreenchange", onChange);
      destroyRef.onDestroy(() =>
        doc.removeEventListener("fullscreenchange", onChange),
      );
      const stored = readCaptionsPreference(captionsStorage(doc));
      if (stored) this.captionsChoice.set({ pref: stored, index: -1 });
    });
    // The selected track is loaded "hidden" and its active cue drawn here
    afterRenderEffect((onCleanup) => {
      const media = this.mediaRef()?.nativeElement;
      this.tracksKey();
      const index = this.trackIndex();
      const crossOrigin = this.crossOrigin();
      if (!media || !this.controls()) return;
      const stop = untracked(() =>
        bindMediaCaptions(
          media,
          this.tracks(),
          index,
          (text) => this.caption.set(text),
          { crossOrigin },
        ),
      );
      onCleanup(stop);
    });
    // The open menu focuses its checked item; a press outside closes it
    afterRenderEffect((onCleanup) => {
      const control = this.captionsControl()?.nativeElement;
      if (!this.captionsMenu() || !control) return;
      untracked(() =>
        control
          .querySelector<HTMLElement>('[aria-checked="true"]')
          ?.focus({ preventScroll: true }),
      );
      const doc = control.ownerDocument;
      const onPointerDown = (event: PointerEvent) => {
        if (!control.contains(event.target as Node)) {
          this.captionsMenu.set(false);
        }
      };
      doc.addEventListener("pointerdown", onPointerDown);
      onCleanup(() => doc.removeEventListener("pointerdown", onPointerDown));
    });
  }

  /** The rendered `<audio>` / `<video>` element (null before render) */
  get element(): HTMLMediaElement | null {
    return this.mediaRef()?.nativeElement ?? null;
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
    this.currentTime.set(next);
  }

  protected readonly type = computed(() =>
    inferMediaType(this.src(), this.mimeType(), this.typeInput()),
  );
  protected readonly isVideo = computed(() => this.type() === "video");
  protected readonly status = computed(() =>
    this.hasEnded() ? "ended" : this.isPaused() ? "paused" : "playing",
  );
  protected readonly label = computed(
    () => this.ariaLabel() ?? this.title() ?? this.scope.t("mediaPlayer.label"),
  );
  protected readonly rootClass = computed(() => {
    const s = this.s;
    if (!this.controls()) return `${s.mediaPlayer} ${s.bare}`;
    return [
      s.mediaPlayer,
      this.isVideo() ? s.video : s.audio,
      this.status() === "playing" ? s.playing : "",
    ]
      .filter(Boolean)
      .join(" ");
  });
  protected readonly bareHeight = computed(() => {
    const height = this.height();
    return height === undefined ? null : cssSize(height);
  });
  protected readonly rootHeight = computed(() =>
    this.isVideo() && this.controls() ? this.bareHeight() : null,
  );
  protected readonly rootAspectRatio = computed(() =>
    this.isVideo() && this.controls() && this.height() === undefined
      ? this.aspectRatio()
      : null,
  );
  protected readonly showSpinner = computed(
    () => this.loading() && !this.failed(),
  );
  protected readonly progress = computed(
    () => mediaProgress(this.currentTime(), this.duration()) * 100,
  );
  protected readonly bufferedPercent = computed(
    () => mediaProgress(this.buffered(), this.duration()) * 100,
  );
  protected readonly seekText = computed(() =>
    this.scope.t("mediaPlayer.timeOf", {
      current: formatMediaTime(this.currentTime(), this.duration()),
      duration: formatMediaTime(this.duration()),
    }),
  );
  protected readonly timeText = computed(
    () =>
      `${formatMediaTime(this.currentTime(), this.duration())} / ${formatMediaTime(this.duration())}`,
  );
  protected readonly volumePercent = computed(() =>
    Math.round((this.muted() ? 0 : this.volume()) * 100),
  );
  protected readonly rateText = computed(() => formatPlaybackRate(this.rate()));

  protected toggle() {
    const media = this.element;
    if (!media) return;
    if (media.paused || media.ended) void this.play();
    else media.pause();
  }

  protected toggleMute() {
    const media = this.element;
    if (!media) return;
    media.muted = !media.muted;
    this.muted.set(media.muted);
  }

  private changeVolume(next: number) {
    const media = this.element;
    if (!media) return;
    media.volume = clampVolume(next);
    if (media.volume > 0 && media.muted) media.muted = false;
    this.volume.set(media.volume);
    this.muted.set(media.muted);
  }

  protected cycleRate() {
    const media = this.element;
    if (!media) return;
    media.playbackRate = nextPlaybackRate(
      media.playbackRate,
      this.playbackRates(),
    );
    this.rate.set(media.playbackRate);
  }

  protected toggleFullscreen() {
    const host = this.host.nativeElement;
    const doc = host.ownerDocument;
    if (!this.isVideo()) return;
    if (doc.fullscreenElement === host) {
      void doc.exitFullscreen?.().catch(() => undefined);
    } else if (typeof host.requestFullscreen === "function") {
      void host.requestFullscreen().catch(() => undefined);
    } else {
      // iOS Safari: only the video element itself goes fullscreen
      (
        this.element as
          (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null
      )?.webkitEnterFullscreen?.();
    }
  }

  protected togglePip() {
    const video = this.element as HTMLVideoElement | null;
    if (!video) return;
    const doc = video.ownerDocument as Document & {
      pictureInPictureElement?: Element | null;
      exitPictureInPicture?: () => Promise<void>;
    };
    if (doc.pictureInPictureElement === video) {
      void doc.exitPictureInPicture?.().catch(() => undefined);
    } else {
      void video.requestPictureInPicture?.().catch(() => undefined);
    }
  }

  protected onKeydown(event: KeyboardEvent) {
    if (!this.controls()) return;
    const target = event.target as HTMLElement;
    // Space / Enter activate the focused button
    if (
      (event.key === " " || event.key === "Enter") &&
      target.closest("button")
    ) {
      return;
    }
    const action = mediaKeyAction(event.key, event);
    const media = this.element;
    if (!action || !media) return;
    if (action.type === "fullscreen" && !this.isVideo()) return;
    if (action.type === "captions") {
      const next = toggledCaptionsTrack(
        this.tracks(),
        this.trackIndex(),
        this.lastTrack,
      );
      if (next === null) return;
      event.preventDefault();
      this.chooseTrack(next);
      return;
    }
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

  protected chooseTrack(index: number) {
    const current = this.trackIndex();
    if (index === current) return;
    const track = this.tracks()[index] ?? null;
    if (current >= 0) this.lastTrack = current;
    this.captionsChoice.set({ pref: captionsPreference(track), index });
    writeCaptionsPreference(
      captionsStorage(this.host.nativeElement.ownerDocument),
      track,
    );
    this.trackChange.emit({ index: track ? index : -1, track });
  }

  protected closeCaptionsMenu(refocus: boolean) {
    this.captionsMenu.set(false);
    if (refocus) this.captionsButton()?.nativeElement.focus();
  }

  protected onCaptionsFocusOut(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (next && !(event.currentTarget as HTMLElement).contains(next)) {
      this.captionsMenu.set(false);
    }
  }

  protected captionsMenuKeys(event: KeyboardEvent) {
    event.stopPropagation();
    const menu = event.currentTarget as HTMLElement;
    const items = Array.from(
      menu.querySelectorAll<HTMLElement>('[role="menuitemradio"]'),
    );
    const at = items.indexOf(menu.ownerDocument.activeElement as HTMLElement);
    let next = -1;
    if (event.key === "ArrowDown") next = (at + 1) % items.length;
    else if (event.key === "ArrowUp")
      next = (at - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else if (event.key === "Escape") {
      event.preventDefault();
      this.closeCaptionsMenu(true);
      return;
    } else if (event.key === "Tab") {
      this.captionsMenu.set(false);
      return;
    }
    if (next >= 0) {
      event.preventDefault();
      items[next]?.focus();
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

  protected dragSeek(event: PointerEvent) {
    const duration = this.duration();
    if (duration)
      this.drag(event, (fraction) => this.seek(fraction * duration));
  }

  protected dragVolume(event: PointerEvent) {
    this.drag(event, (fraction) => this.changeVolume(fraction));
  }

  protected seekKeys(event: KeyboardEvent) {
    const media = this.element;
    const duration = this.duration();
    if (!media || !duration) return;
    const skip = this.skipSeconds() || 10;
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
    else if (event.key === "End") next = duration;
    if (next === undefined) return;
    event.preventDefault();
    event.stopPropagation();
    this.seek(next);
  }

  protected volumeKeys(event: KeyboardEvent) {
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

  // --- media events --------------------------------------------------------
  protected syncTime(target: EventTarget | null) {
    const media = target as HTMLMediaElement;
    this.currentTime.set(media.currentTime);
    this.buffered.set(bufferedEnd(media.buffered, media.currentTime));
  }

  protected onPlay() {
    this.isPaused.set(false);
    this.hasEnded.set(false);
    this.played.emit();
  }

  protected onPause() {
    this.isPaused.set(true);
    this.loading.set(false);
    this.paused.emit();
  }

  protected onEnded() {
    this.isPaused.set(true);
    this.hasEnded.set(true);
    this.loading.set(false);
    this.ended.emit();
  }

  protected onLoadedMetadata(event: Event) {
    const media = event.currentTarget as HTMLMediaElement;
    const total = finiteDuration(media.duration);
    this.duration.set(total);
    this.failed.set(false);
    if (!this.startApplied) {
      this.startApplied = true;
      const start = this.startTime();
      if (start && start > 0) {
        media.currentTime = clampMediaTime(start, total);
      }
    }
    this.syncTime(media);
    this.loadedMetadata.emit({ duration: total });
  }

  protected onDurationChange(event: Event) {
    this.duration.set(
      finiteDuration((event.currentTarget as HTMLMediaElement).duration),
    );
  }

  protected onTimeUpdate(event: Event) {
    const media = event.currentTarget as HTMLMediaElement;
    this.syncTime(media);
    this.timeUpdate.emit({
      currentTime: media.currentTime,
      duration: finiteDuration(media.duration),
    });
  }

  protected onVolumeChange(event: Event) {
    const media = event.currentTarget as HTMLMediaElement;
    this.volume.set(media.volume);
    this.muted.set(media.muted);
    this.volumeChange.emit({ volume: media.volume, muted: media.muted });
  }

  protected onRateChange(event: Event) {
    const media = event.currentTarget as HTMLMediaElement;
    this.rate.set(media.playbackRate);
    this.rateChange.emit(media.playbackRate);
  }

  protected onError(event: Event) {
    this.failed.set(true);
    this.loading.set(false);
    this.mediaError.emit((event.currentTarget as HTMLMediaElement).error);
  }
}
