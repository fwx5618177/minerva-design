<script setup lang="ts">
/**
 * MediaPlayer: an `<audio>` / `<video>` element with themed custom controls.
 * Play / pause, skip back / forward, a seek bar (role=slider, buffered range),
 * the time, mute and volume, the playback speed (cycle button), fullscreen and
 * picture-in-picture (video), and a captions menu when `tracks` are given
 * (cues drawn by the player). Keyboard on the focused player: Space / K
 * play-pause, ← / → seek by 5 s, ↑ / ↓ volume, M mute, F fullscreen,
 * C captions on / off.
 * The template ref exposes `play()`, `pause()`, `seek(seconds)` and
 * `element`.
 */
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  useAttrs,
  useSlots,
  watch,
} from "vue";
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
import styles from "@react-styles/components/MediaPlayer/mediaPlayer.module.scss";
import { hooks } from "../../internal/hooks";
import { useI18n } from "../../config/useI18n";
import type {
  MediaPlayerExpose,
  MediaPlayerProps,
  MediaPlayerTimeDetail,
  MediaPlayerTrackChangeDetail,
  MediaPlayerVolumeDetail,
} from "./types";

defineOptions({ name: "MediaPlayer", inheritAttrs: false });

const props = withDefaults(defineProps<MediaPlayerProps>(), {
  src: undefined,
  type: undefined,
  mimeType: undefined,
  poster: undefined,
  title: undefined,
  autoPlay: false,
  loop: false,
  muted: undefined,
  defaultMuted: undefined,
  preload: "metadata",
  crossOrigin: undefined,
  startTime: undefined,
  playbackRates: () => DEFAULT_PLAYBACK_RATES,
  skipSeconds: DEFAULT_SKIP_SECONDS,
  controls: true,
  height: undefined,
  aspectRatio: "16 / 9",
  pictureInPicture: false,
  tracks: () => [],
  "aria-label": undefined,
});

const emit = defineEmits<{
  /** The playhead moved */
  timeUpdate: [detail: MediaPlayerTimeDetail];
  /** Playback reached the end */
  ended: [];
  /** Playback started */
  play: [];
  /** Playback paused */
  pause: [];
  /** The metadata loaded */
  loadedMetadata: [detail: { duration: number }];
  /** The media can't be loaded or played */
  error: [error: MediaError | null];
  /** The playback speed changed */
  rateChange: [rate: number];
  /** The volume or the muted state changed */
  volumeChange: [detail: MediaPlayerVolumeDetail];
  /** The user chose captions (index -1 and track null: Off) */
  trackChange: [detail: MediaPlayerTrackChangeDetail];
}>();

defineSlots<{
  /** Title of the media (replaces the title prop) */
  title?: () => unknown;
}>();

const attrs = useAttrs();
const slots = useSlots();
const { t } = useI18n();
// `aria-label` is a declared prop: Vue stores it camelized
const ariaLabel = computed(
  () => (props as unknown as { ariaLabel?: string }).ariaLabel,
);

const root = shallowRef<HTMLElement | null>(null);
const media = shallowRef<HTMLMediaElement | null>(null);
let startApplied = false;

const paused = ref(true);
const ended = ref(false);
const loading = ref(false);
const failed = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const buffered = ref(0);
const volume = ref(1);
const muted = ref(props.muted ?? props.defaultMuted ?? false);
const rate = ref(1);
const fullscreen = ref(false);
const pip = ref(false);
const pipSupported = ref(false);

const type = computed(() =>
  inferMediaType(props.src, props.mimeType, props.type),
);
const isVideo = computed(() => type.value === "video");
const status = computed(() =>
  ended.value ? "ended" : paused.value ? "paused" : "playing",
);

const finiteDuration = (value: number) =>
  Number.isFinite(value) && value > 0 ? value : 0;

watch(
  () => props.src,
  () => {
    startApplied = false;
    failed.value = false;
    ended.value = false;
    currentTime.value = 0;
    duration.value = 0;
    buffered.value = 0;
  },
);

watch(
  () => props.muted,
  (next) => {
    if (next === undefined) return;
    muted.value = next;
    if (media.value) media.value.muted = next;
  },
);

const onFullscreenChange = () => {
  fullscreen.value = !!root.value && document.fullscreenElement === root.value;
};

onMounted(() => {
  pipSupported.value =
    (document as Document & { pictureInPictureEnabled?: boolean })
      .pictureInPictureEnabled === true;
  document.addEventListener("fullscreenchange", onFullscreenChange);
});

onBeforeUnmount(() =>
  document.removeEventListener("fullscreenchange", onFullscreenChange),
);

// --- captions ---------------------------------------------------------------
// The choice is kept as its remembered form (language / label / "off") so it
// survives a new `tracks` array; `index` disambiguates equal languages.
const captionsStorage = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};
const captionsChoice = ref<{ pref: string | null; index: number }>({
  pref: null,
  index: -1,
});
const trackIndex = computed(() => {
  const { pref, index } = captionsChoice.value;
  const chosen = props.tracks[index];
  return chosen && captionsPreference(chosen) === pref
    ? index
    : pickCaptionsTrack(props.tracks, pref);
});
const caption = ref("");
const captionsMenu = ref(false);
const captionsButton = shallowRef<HTMLButtonElement | null>(null);
const captionsControl = shallowRef<HTMLElement | null>(null);
let lastTrack = -1;
const tracksKey = computed(() =>
  props.tracks
    .map((track) => `${track.src}\n${track.srclang}\n${track.label}`)
    .join("\n\n"),
);

onMounted(() => {
  const stored = readCaptionsPreference(captionsStorage());
  if (stored) captionsChoice.value = { pref: stored, index: -1 };
});

watch(
  [media, tracksKey, trackIndex, () => props.crossOrigin, () => props.controls],
  (_, __, onCleanup) => {
    const element = media.value;
    if (!element || !props.controls) return;
    onCleanup(
      bindMediaCaptions(
        element,
        props.tracks,
        trackIndex.value,
        (text) => (caption.value = text),
        { crossOrigin: props.crossOrigin },
      ),
    );
  },
  { flush: "post", immediate: true },
);

const onCaptionsPointerDown = (event: PointerEvent) => {
  if (!captionsControl.value?.contains(event.target as Node)) {
    captionsMenu.value = false;
  }
};
watch(captionsMenu, (open, _, onCleanup) => {
  if (!open) return;
  void nextTick(() =>
    captionsControl.value
      ?.querySelector<HTMLElement>('[aria-checked="true"]')
      ?.focus({ preventScroll: true }),
  );
  document.addEventListener("pointerdown", onCaptionsPointerDown);
  onCleanup(() =>
    document.removeEventListener("pointerdown", onCaptionsPointerDown),
  );
});

const chooseTrack = (index: number) => {
  if (index === trackIndex.value) return;
  const track = props.tracks[index] ?? null;
  if (trackIndex.value >= 0) lastTrack = trackIndex.value;
  captionsChoice.value = { pref: captionsPreference(track), index };
  writeCaptionsPreference(captionsStorage(), track);
  emit("trackChange", { index: track ? index : -1, track });
};

const closeCaptionsMenu = (refocus: boolean) => {
  captionsMenu.value = false;
  if (refocus) captionsButton.value?.focus();
};

const onCaptionsFocusOut = (event: FocusEvent) => {
  const next = event.relatedTarget as Node | null;
  if (next && !(event.currentTarget as HTMLElement).contains(next)) {
    captionsMenu.value = false;
  }
};

const captionsMenuKeys = (event: KeyboardEvent) => {
  event.stopPropagation();
  const items = Array.from(
    (event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(
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
    captionsMenu.value = false;
    return;
  }
  if (next >= 0) {
    event.preventDefault();
    items[next]?.focus();
  }
};

const captionsOptions = computed(() => [
  { index: -1, label: t("mediaPlayer.captionsOff") },
  ...props.tracks.map((track, index) => ({ index, label: track.label })),
]);
const showCaptions = computed(() =>
  isVideo.value ? caption.value !== "" : trackIndex.value >= 0,
);

const play = (): Promise<void> => {
  const element = media.value;
  if (!element) return Promise.resolve();
  // autoplay policies reject play(): the paused state stays visible
  return Promise.resolve(element.play()).catch(() => undefined);
};

const pause = () => media.value?.pause();

const seek = (seconds: number) => {
  const element = media.value;
  if (!element) return;
  const next = clampMediaTime(seconds, finiteDuration(element.duration));
  element.currentTime = next;
  currentTime.value = next;
};

const exposed: MediaPlayerExpose = {
  play,
  pause,
  seek,
  get element() {
    return media.value;
  },
};
defineExpose(exposed);

const toggle = () => {
  const element = media.value;
  if (!element) return;
  if (element.paused || element.ended) void play();
  else element.pause();
};

const toggleMute = () => {
  const element = media.value;
  if (!element) return;
  element.muted = !element.muted;
  muted.value = element.muted;
};

const changeVolume = (next: number) => {
  const element = media.value;
  if (!element) return;
  element.volume = clampVolume(next);
  if (element.volume > 0 && element.muted) element.muted = false;
  volume.value = element.volume;
  muted.value = element.muted;
};

const cycleRate = () => {
  const element = media.value;
  if (!element) return;
  element.playbackRate = nextPlaybackRate(
    element.playbackRate,
    props.playbackRates,
  );
  rate.value = element.playbackRate;
};

const toggleFullscreen = () => {
  const node = root.value;
  if (!node || !isVideo.value) return;
  if (document.fullscreenElement === node) {
    void document.exitFullscreen?.().catch(() => undefined);
  } else if (typeof node.requestFullscreen === "function") {
    void node.requestFullscreen().catch(() => undefined);
  } else {
    // iOS Safari: only the video element itself goes fullscreen
    (
      media.value as
        (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null
    )?.webkitEnterFullscreen?.();
  }
};

const togglePip = () => {
  const video = media.value as HTMLVideoElement | null;
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

const onKeydown = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement;
  // Space / Enter activate the focused button
  if ((event.key === " " || event.key === "Enter") && target.closest("button"))
    return;
  const action = mediaKeyAction(event.key, event);
  const element = media.value;
  if (!action || !element) return;
  if (action.type === "fullscreen" && !isVideo.value) return;
  if (action.type === "captions") {
    const next = toggledCaptionsTrack(
      props.tracks,
      trackIndex.value,
      lastTrack,
    );
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
      seek(element.currentTime + action.delta);
      break;
    case "volume":
      changeVolume((element.muted ? 0 : element.volume) + action.delta);
      break;
    case "mute":
      toggleMute();
      break;
    case "fullscreen":
      toggleFullscreen();
      break;
  }
};

const pointerFraction = (event: PointerEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  return rect.width > 0
    ? Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    : 0;
};

const drag = (event: PointerEvent, apply: (fraction: number) => void) => {
  const target = event.currentTarget as HTMLElement;
  if (event.type === "pointerdown") {
    target.setPointerCapture?.(event.pointerId);
  } else if (!target.hasPointerCapture?.(event.pointerId)) {
    return;
  }
  apply(pointerFraction(event));
};

const dragSeek = (event: PointerEvent) => {
  if (duration.value)
    drag(event, (fraction) => seek(fraction * duration.value));
};
const dragVolume = (event: PointerEvent) => drag(event, changeVolume);

const seekKeys = (event: KeyboardEvent) => {
  const element = media.value;
  if (!element || !duration.value) return;
  const skip = props.skipSeconds || 10;
  const steps: Record<string, number> = {
    ArrowLeft: -5,
    ArrowDown: -5,
    ArrowRight: 5,
    ArrowUp: 5,
    PageDown: -skip,
    PageUp: skip,
  };
  let next: number | undefined;
  if (event.key in steps) next = element.currentTime + steps[event.key]!;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = duration.value;
  if (next === undefined) return;
  event.preventDefault();
  event.stopPropagation();
  seek(next);
};

const volumeKeys = (event: KeyboardEvent) => {
  const element = media.value;
  if (!element) return;
  const current = element.muted ? 0 : element.volume;
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

// --- media events ---------------------------------------------------------
const syncTime = (element: HTMLMediaElement) => {
  currentTime.value = element.currentTime;
  buffered.value = bufferedEnd(element.buffered, element.currentTime);
};
const target = (event: Event) => event.currentTarget as HTMLMediaElement;

const mediaListeners = {
  play: () => {
    paused.value = false;
    ended.value = false;
    emit("play");
  },
  pause: () => {
    paused.value = true;
    loading.value = false;
    emit("pause");
  },
  playing: () => (loading.value = false),
  canplay: () => (loading.value = false),
  waiting: () => (loading.value = true),
  ended: () => {
    paused.value = true;
    ended.value = true;
    loading.value = false;
    emit("ended");
  },
  loadedmetadata: (event: Event) => {
    const element = target(event);
    const total = finiteDuration(element.duration);
    duration.value = total;
    failed.value = false;
    if (!startApplied) {
      startApplied = true;
      if (props.startTime && props.startTime > 0) {
        element.currentTime = clampMediaTime(props.startTime, total);
      }
    }
    syncTime(element);
    emit("loadedMetadata", { duration: total });
  },
  durationchange: (event: Event) =>
    (duration.value = finiteDuration(target(event).duration)),
  timeupdate: (event: Event) => {
    const element = target(event);
    syncTime(element);
    emit("timeUpdate", {
      currentTime: element.currentTime,
      duration: finiteDuration(element.duration),
    });
  },
  progress: (event: Event) => syncTime(target(event)),
  volumechange: (event: Event) => {
    const element = target(event);
    volume.value = element.volume;
    muted.value = element.muted;
    emit("volumeChange", { volume: element.volume, muted: element.muted });
  },
  ratechange: (event: Event) => {
    rate.value = target(event).playbackRate;
    emit("rateChange", target(event).playbackRate);
  },
  error: (event: Event) => {
    failed.value = true;
    loading.value = false;
    emit("error", target(event).error);
  },
  enterpictureinpicture: () => (pip.value = true),
  leavepictureinpicture: () => (pip.value = false),
};

const videoListeners = computed(() =>
  props.controls
    ? { ...mediaListeners, click: toggle, dblclick: toggleFullscreen }
    : mediaListeners,
);

const cssSize = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

const mediaAttrs = computed(() => ({
  class: styles.media,
  src: props.src,
  autoplay: props.autoPlay,
  loop: props.loop,
  muted: muted.value,
  preload: props.preload,
  crossorigin: props.crossOrigin,
  ...hooks("media-player", "media"),
}));

const rootAttrs = computed(() => {
  const style: Record<string, string> = {};
  if (isVideo.value && props.controls) {
    if (props.height !== undefined) style.height = cssSize(props.height);
    else style.aspectRatio = props.aspectRatio;
  }
  if (!props.controls) {
    return {
      ...attrs,
      class: [styles.mediaPlayer, styles.bare, attrs.class],
      ...hooks("media-player", "root", {
        variant: type.value,
        status: status.value,
      }),
    };
  }
  return {
    ...attrs,
    role: "group",
    tabindex: 0,
    "aria-label": ariaLabel.value ?? props.title ?? t("mediaPlayer.label"),
    class: [
      styles.mediaPlayer,
      isVideo.value ? styles.video : styles.audio,
      status.value === "playing" && styles.playing,
      attrs.class,
    ],
    style: [style, attrs.style as never],
    ...hooks("media-player", "root", {
      variant: type.value,
      status: status.value,
      loading: loading.value,
      invalid: failed.value,
    }),
  };
});

const hasTitle = computed(() => !!props.title || !!slots.title);
const shownVolume = computed(() => (muted.value ? 0 : volume.value));
const seekText = computed(() =>
  t("mediaPlayer.timeOf", {
    current: formatMediaTime(currentTime.value, duration.value),
    duration: formatMediaTime(duration.value),
  }),
);
const timeText = computed(
  () =>
    `${formatMediaTime(currentTime.value, duration.value)} / ${formatMediaTime(duration.value)}`,
);
const seekStyle = computed(() => ({
  "--_mp-value": `${mediaProgress(currentTime.value, duration.value) * 100}%`,
  "--_mp-buffered": `${mediaProgress(buffered.value, duration.value) * 100}%`,
}));
const showSpinner = computed(() => loading.value && !failed.value);
const icons = MEDIA_ICON_PATHS;
</script>

<template>
  <div
    ref="root"
    v-bind="rootAttrs"
    @keydown="controls ? onKeydown($event) : undefined"
  >
    <video
      v-if="isVideo"
      ref="media"
      v-bind="mediaAttrs"
      :poster="poster"
      playsinline
      :style="
        !controls && height !== undefined
          ? { height: cssSize(height), width: 'auto' }
          : undefined
      "
      v-on="videoListeners"
    >
      <track
        v-for="(track, index) in tracks"
        :key="`${index}:${track.src}`"
        :kind="track.kind ?? 'subtitles'"
        :src="track.src"
        :srclang="track.srclang"
        :label="track.label"
        :default="!controls && index === trackIndex ? true : undefined"
      />
    </video>
    <audio v-else ref="media" v-bind="mediaAttrs" v-on="mediaListeners">
      <track
        v-for="(track, index) in tracks"
        :key="`${index}:${track.src}`"
        :kind="track.kind ?? 'subtitles'"
        :src="track.src"
        :srclang="track.srclang"
        :label="track.label"
        :default="!controls && index === trackIndex ? true : undefined"
      />
    </audio>
    <template v-if="controls">
      <div
        v-if="hasTitle"
        :class="styles.title"
        v-bind="hooks('media-player', 'title')"
      >
        <slot name="title">{{ title }}</slot>
      </div>
      <span
        v-if="isVideo && showSpinner"
        :class="styles.spinner"
        role="status"
        :aria-label="t('mediaPlayer.loading')"
        v-bind="hooks('media-player', 'spinner')"
      />
      <div
        v-if="showCaptions"
        :class="styles.captions"
        v-bind="hooks('media-player', 'captions')"
      >
        <span v-if="caption" :class="styles.cue">{{ caption }}</span>
      </div>
      <div
        v-if="failed"
        :class="styles.error"
        role="alert"
        v-bind="hooks('media-player', 'error')"
      >
        {{ t("mediaPlayer.error") }}
      </div>
      <div :class="styles.controls" v-bind="hooks('media-player', 'controls')">
        <div
          :class="[styles.slider, styles.seek]"
          role="slider"
          tabindex="0"
          :aria-label="t('mediaPlayer.seek')"
          aria-valuemin="0"
          :aria-valuemax="Math.round(duration)"
          :aria-valuenow="Math.round(currentTime)"
          :aria-valuetext="seekText"
          :aria-disabled="duration ? undefined : 'true'"
          :style="seekStyle"
          v-bind="hooks('media-player', 'seek')"
          @pointerdown="dragSeek"
          @pointermove="dragSeek"
          @keydown="seekKeys"
        >
          <span :class="styles.track" />
          <span :class="styles.buffered" />
          <span :class="styles.fill" />
          <span :class="styles.thumb" />
        </div>
        <button
          type="button"
          :class="styles.button"
          :aria-label="paused ? t('mediaPlayer.play') : t('mediaPlayer.pause')"
          :disabled="failed"
          v-bind="hooks('media-player', 'button')"
          @click="toggle"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path :d="paused ? icons.play : icons.pause" />
          </svg>
        </button>
        <template v-if="skipSeconds > 0">
          <button
            type="button"
            :class="styles.button"
            :aria-label="t('mediaPlayer.skipBack', { count: skipSeconds })"
            :disabled="failed"
            v-bind="hooks('media-player', 'button')"
            @click="seek(currentTime - skipSeconds)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path :d="icons.skipBack" />
            </svg>
          </button>
          <button
            type="button"
            :class="styles.button"
            :aria-label="t('mediaPlayer.skipForward', { count: skipSeconds })"
            :disabled="failed"
            v-bind="hooks('media-player', 'button')"
            @click="seek(currentTime + skipSeconds)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path :d="icons.skipForward" />
            </svg>
          </button>
        </template>
        <span
          v-if="!isVideo && showSpinner"
          :class="styles.spinner"
          role="status"
          :aria-label="t('mediaPlayer.loading')"
          v-bind="hooks('media-player', 'spinner')"
        />
        <span :class="styles.time" v-bind="hooks('media-player', 'time')">{{
          timeText
        }}</span>
        <span :class="styles.spacer" />
        <button
          type="button"
          :class="styles.button"
          :aria-label="muted ? t('mediaPlayer.unmute') : t('mediaPlayer.mute')"
          :aria-pressed="muted"
          v-bind="hooks('media-player', 'button')"
          @click="toggleMute"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path :d="muted || volume === 0 ? icons.muted : icons.volume" />
          </svg>
        </button>
        <div
          :class="[styles.slider, styles.volume]"
          role="slider"
          tabindex="0"
          :aria-label="t('mediaPlayer.volume')"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="Math.round(shownVolume * 100)"
          :aria-valuetext="`${Math.round(shownVolume * 100)}%`"
          :style="{ '--_mp-value': `${shownVolume * 100}%` }"
          v-bind="hooks('media-player', 'volume')"
          @pointerdown="dragVolume"
          @pointermove="dragVolume"
          @keydown="volumeKeys"
        >
          <span :class="styles.track" />
          <span :class="styles.fill" />
          <span :class="styles.thumb" />
        </div>
        <button
          v-if="playbackRates.length > 1"
          type="button"
          :class="[styles.button, styles.rate]"
          :aria-label="
            t('mediaPlayer.playbackRate', { rate: formatPlaybackRate(rate) })
          "
          v-bind="hooks('media-player', 'button')"
          @click="cycleRate"
        >
          {{ formatPlaybackRate(rate) }}
        </button>
        <span
          v-if="tracks.length > 0"
          ref="captionsControl"
          :class="styles.captionsControl"
          @focusout="onCaptionsFocusOut"
        >
          <button
            ref="captionsButton"
            type="button"
            :class="[styles.button, trackIndex >= 0 && styles.captionsOn]"
            :aria-label="t('mediaPlayer.captions')"
            aria-haspopup="menu"
            :aria-expanded="captionsMenu"
            v-bind="hooks('media-player', 'button')"
            @click="captionsMenu = !captionsMenu"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path :d="icons.captions" />
            </svg>
          </button>
          <div
            v-if="captionsMenu"
            role="menu"
            :aria-label="t('mediaPlayer.captions')"
            :class="styles.captionsMenu"
            v-bind="hooks('media-player', 'captions-menu')"
            @keydown="captionsMenuKeys"
          >
            <button
              v-for="option in captionsOptions"
              :key="option.index"
              type="button"
              role="menuitemradio"
              :aria-checked="option.index === trackIndex"
              :tabindex="option.index === trackIndex ? 0 : -1"
              :class="styles.captionsOption"
              @click="
                chooseTrack(option.index);
                closeCaptionsMenu(true);
              "
            >
              {{ option.label }}
            </button>
          </div>
        </span>
        <button
          v-if="isVideo && pictureInPicture && pipSupported"
          type="button"
          :class="styles.button"
          :aria-label="
            pip
              ? t('mediaPlayer.exitPictureInPicture')
              : t('mediaPlayer.pictureInPicture')
          "
          :aria-pressed="pip"
          v-bind="hooks('media-player', 'button')"
          @click="togglePip"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path :d="icons.pictureInPicture" />
          </svg>
        </button>
        <button
          v-if="isVideo"
          type="button"
          :class="styles.button"
          :aria-label="
            fullscreen
              ? t('mediaPlayer.exitFullscreen')
              : t('mediaPlayer.fullscreen')
          "
          v-bind="hooks('media-player', 'button')"
          @click="toggleFullscreen"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path :d="fullscreen ? icons.exitFullscreen : icons.fullscreen" />
          </svg>
        </button>
      </div>
    </template>
  </div>
</template>
