<script setup lang="ts">
/**
 * MediaPlayer: video through the uni `<video>` component (its own controls
 * off, driven by `uni.createVideoContext`) and audio through
 * `uni.createInnerAudioContext`, under the themed control bar of the web
 * renderers: play / pause, skip back / forward, a touch seek bar with the
 * buffered range, the time, mute (and a volume bar for audio), the playback
 * speed (cycle button) and fullscreen (video). The template ref exposes
 * `play()`, `pause()`, `seek(seconds)` and `context`.
 */
import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import {
  DEFAULT_PLAYBACK_RATES,
  DEFAULT_SKIP_SECONDS,
  clampMediaTime,
  clampVolume,
  formatMediaTime,
  formatPlaybackRate,
  inferMediaType,
  mediaProgress,
  nextPlaybackRate,
} from "@minerva/core";
import { useI18n } from "./i18n";

const props = withDefaults(
  defineProps<{
    src?: string;
    type?: "audio" | "video";
    mimeType?: string;
    poster?: string;
    title?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    defaultMuted?: boolean;
    startTime?: number;
    playbackRates?: readonly number[];
    skipSeconds?: number;
    controls?: boolean;
    height?: number | string;
    aspectRatio?: string;
    ariaLabel?: string;
  }>(),
  {
    src: undefined,
    type: undefined,
    autoPlay: false,
    loop: false,
    muted: undefined,
    defaultMuted: false,
    startTime: undefined,
    playbackRates: () => DEFAULT_PLAYBACK_RATES,
    skipSeconds: DEFAULT_SKIP_SECONDS,
    controls: true,
    height: undefined,
    aspectRatio: "16 / 9",
  },
);
const emit = defineEmits<{
  timeUpdate: [detail: { currentTime: number; duration: number }];
  ended: [];
  play: [];
  pause: [];
  loadedMetadata: [detail: { duration: number }];
  error: [error: unknown];
  rateChange: [rate: number];
  volumeChange: [detail: { volume: number; muted: boolean }];
}>();
const { t } = useI18n();
const instance = getCurrentInstance();
const uid = `mn-media-${instance?.uid ?? 0}`;
const videoId = `${uid}-video`;

const type = computed(() =>
  inferMediaType(props.src, props.mimeType, props.type),
);
const isVideo = computed(() => type.value === "video");
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
let metadataSent = false;

const finite = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
const status = computed(() =>
  ended.value ? "ended" : paused.value ? "paused" : "playing",
);

function metadata(total: number) {
  if (metadataSent || total <= 0) return;
  metadataSent = true;
  duration.value = total;
  emit("loadedMetadata", { duration: total });
}

// --- host contexts ---------------------------------------------------------
type Ctx = Record<string, any>;
let videoCtx: Ctx | null = null;
let audioCtx: Ctx | null = null;

function setupVideo() {
  videoCtx = null;
  if (!isVideo.value || typeof uni === "undefined") return;
  videoCtx =
    (uni as any).createVideoContext?.(videoId, instance?.proxy) ?? null;
}

function teardownAudio() {
  audioCtx?.destroy?.();
  audioCtx = null;
}

function setupAudio() {
  teardownAudio();
  if (isVideo.value || !props.src || typeof uni === "undefined") return;
  const ctx = (uni as any).createInnerAudioContext?.() as Ctx | undefined;
  if (!ctx) return;
  audioCtx = ctx;
  ctx.src = props.src;
  ctx.autoplay = props.autoPlay;
  ctx.loop = props.loop;
  ctx.volume = muted.value ? 0 : volume.value;
  if (props.startTime && props.startTime > 0) ctx.startTime = props.startTime;
  ctx.onPlay(onPlay);
  ctx.onPause(onPause);
  ctx.onStop?.(() => (paused.value = true));
  ctx.onEnded(onEnded);
  ctx.onWaiting(() => (loading.value = true));
  ctx.onCanplay(() => {
    loading.value = false;
    metadata(finite(ctx.duration));
  });
  ctx.onTimeUpdate(() =>
    time(ctx.currentTime, finite(ctx.duration), finite(ctx.buffered)),
  );
  ctx.onError(onError);
}

function reset() {
  metadataSent = false;
  failed.value = false;
  ended.value = false;
  paused.value = true;
  currentTime.value = 0;
  duration.value = 0;
  buffered.value = 0;
}

onMounted(() => {
  setupVideo();
  setupAudio();
});
onBeforeUnmount(teardownAudio);
watch([() => props.src, isVideo], () => {
  reset();
  setupVideo();
  setupAudio();
});
watch(
  () => props.muted,
  (next) => {
    if (next !== undefined) muted.value = next;
  },
);
watch([muted, volume, () => props.loop], () => {
  if (!audioCtx) return;
  audioCtx.volume = muted.value ? 0 : volume.value;
  audioCtx.loop = props.loop;
});

// --- shared event handling -------------------------------------------------
function onPlay() {
  paused.value = false;
  ended.value = false;
  emit("play");
}
function onPause() {
  paused.value = true;
  loading.value = false;
  emit("pause");
}
function onEnded() {
  paused.value = true;
  ended.value = true;
  loading.value = false;
  emit("ended");
}
function onError(error: unknown) {
  failed.value = true;
  loading.value = false;
  emit("error", error);
}
function time(current: number, total: number, loaded?: number) {
  metadata(total);
  currentTime.value = current;
  duration.value = total;
  if (loaded !== undefined) buffered.value = loaded;
  emit("timeUpdate", { currentTime: current, duration: total });
}
const detail = (event: any) => event?.detail ?? {};
function onVideoTime(event: any) {
  loading.value = false;
  const d = detail(event);
  time(Number(d.currentTime) || 0, finite(d.duration));
}
function onVideoMetadata(event: any) {
  metadata(finite(detail(event).duration));
}
function onVideoProgress(event: any) {
  buffered.value =
    ((Number(detail(event).buffered) || 0) / 100) * duration.value;
}
function onVideoFullscreen(event: any) {
  fullscreen.value = !!detail(event).fullScreen;
}
function onVideoError(event: any) {
  onError(detail(event));
}

// --- commands ----------------------------------------------------------------
function play() {
  (isVideo.value ? videoCtx : audioCtx)?.play?.();
}
function pause() {
  (isVideo.value ? videoCtx : audioCtx)?.pause?.();
}
function seek(seconds: number) {
  const next = clampMediaTime(seconds, duration.value);
  (isVideo.value ? videoCtx : audioCtx)?.seek?.(next);
  currentTime.value = next;
}
defineExpose({
  play,
  pause,
  seek,
  get context() {
    return isVideo.value ? videoCtx : audioCtx;
  },
});
function toggle() {
  if (failed.value) return;
  if (paused.value) play();
  else pause();
}
function toggleMute() {
  muted.value = !muted.value;
  emit("volumeChange", {
    volume: isVideo.value ? 1 : volume.value,
    muted: muted.value,
  });
}
function changeVolume(next: number) {
  volume.value = clampVolume(next);
  if (volume.value > 0) muted.value = false;
  emit("volumeChange", { volume: volume.value, muted: muted.value });
}
function cycleRate() {
  const next = nextPlaybackRate(rate.value, props.playbackRates);
  rate.value = next;
  if (isVideo.value) videoCtx?.playbackRate?.(next);
  else if (audioCtx) audioCtx.playbackRate = next;
  emit("rateChange", next);
}
function toggleFullscreen() {
  if (fullscreen.value) videoCtx?.exitFullScreen?.();
  else videoCtx?.requestFullScreen?.({ direction: 0 });
}

// --- touch tracks ----------------------------------------------------------
interface Rect {
  left: number;
  width: number;
}
const rects: Record<string, Rect | null> = { seek: null, volume: null };
let dragging: "seek" | "volume" | null = null;
const touchX = (event: any): number | undefined => {
  const touch = event?.touches?.[0] ?? event?.changedTouches?.[0];
  return touch?.clientX ?? touch?.pageX ?? touch?.x;
};
function measure(name: "seek" | "volume", done: (rect: Rect) => void) {
  const el = (instance?.proxy?.$el as HTMLElement | undefined)?.querySelector?.(
    `.mn-media-player__${name}`,
  );
  if (el?.getBoundingClientRect) {
    const box = el.getBoundingClientRect();
    if (box.width > 0) done({ left: box.left, width: box.width });
    return;
  }
  try {
    if (typeof uni === "undefined") return;
    uni
      .createSelectorQuery()
      .in(instance?.proxy)
      .select(`#${uid}-${name}`)
      .boundingClientRect((result: any) => {
        if (result?.width > 0)
          done({ left: result.left ?? 0, width: result.width });
      })
      .exec();
  } catch {}
}
function apply(name: "seek" | "volume", x: number, box: Rect) {
  const fraction = Math.min(1, Math.max(0, (x - box.left) / box.width));
  if (name === "volume") changeVolume(fraction);
  else if (duration.value) seek(fraction * duration.value);
}
function touchStart(name: "seek" | "volume", event: any) {
  const x = touchX(event);
  if (x === undefined) return;
  dragging = name;
  measure(name, (box) => {
    rects[name] = box;
    apply(name, x, box);
  });
}
function touchMove(event: any) {
  const x = touchX(event);
  const box = dragging ? rects[dragging] : null;
  if (!dragging || !box || x === undefined) return;
  apply(dragging, x, box);
}
function touchEnd() {
  dragging = null;
}

const cssSize = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;
const rootStyle = computed(() =>
  isVideo.value
    ? props.height !== undefined
      ? { height: cssSize(props.height) }
      : { aspectRatio: props.aspectRatio }
    : {},
);
const label = computed(
  () => props.ariaLabel ?? props.title ?? t("mediaPlayer.label"),
);
const progress = computed(
  () => mediaProgress(currentTime.value, duration.value) * 100,
);
const bufferedPercent = computed(
  () => mediaProgress(buffered.value, duration.value) * 100,
);
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
const rateText = computed(() => formatPlaybackRate(rate.value));
const showSpinner = computed(() => loading.value && !failed.value);
</script>
<template>
  <view
    class="mn-media-player"
    :class="[
      `mn-variant-${type}`,
      {
        'mn-playing': status === 'playing',
        'mn-loading': loading,
        'mn-invalid': failed,
      },
    ]"
    :style="rootStyle"
    data-minerva="media-player"
    data-part="root"
    :data-variant="type"
    :data-status="status"
    :data-loading="loading ? '' : undefined"
    :data-invalid="failed ? '' : undefined"
    :role="controls ? 'group' : undefined"
    :aria-label="controls ? label : ariaLabel"
  >
    <video
      v-if="isVideo"
      :id="videoId"
      class="mn-media-player__media"
      data-part="media"
      :src="src ?? ''"
      :poster="poster"
      :controls="!controls"
      :autoplay="autoPlay"
      :loop="loop"
      :muted="muted"
      :initial-time="startTime"
      :show-center-play-btn="!controls"
      :show-fullscreen-btn="!controls"
      :show-play-btn="!controls"
      :enable-progress-gesture="!controls"
      object-fit="contain"
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
      @waiting="loading = true"
      @loadedmetadata="onVideoMetadata"
      @timeupdate="onVideoTime"
      @progress="onVideoProgress"
      @fullscreenchange="onVideoFullscreen"
      @error="onVideoError"
    />
    <template v-if="controls">
      <text v-if="title" class="mn-media-player__title" data-part="title">{{
        title
      }}</text>
      <view
        v-if="isVideo && showSpinner"
        class="mn-media-player__spinner"
        data-part="spinner"
        role="status"
        :aria-label="t('mediaPlayer.loading')"
      />
      <view
        v-if="failed"
        class="mn-media-player__error"
        data-part="error"
        role="alert"
        >{{ t("mediaPlayer.error") }}</view
      >
      <view class="mn-media-player__controls" data-part="controls">
        <view
          :id="`${uid}-seek`"
          class="mn-media-player__seek"
          data-part="seek"
          role="slider"
          :aria-label="t('mediaPlayer.seek')"
          aria-valuemin="0"
          :aria-valuemax="Math.round(duration)"
          :aria-valuenow="Math.round(currentTime)"
          :aria-valuetext="seekText"
          :aria-disabled="duration ? undefined : 'true'"
          @touchstart="touchStart('seek', $event)"
          @touchmove="touchMove"
          @touchend="touchEnd"
          ><view class="mn-media-player__track" /><view
            class="mn-media-player__buffered"
            :style="{ width: `${bufferedPercent}%` }" /><view
            class="mn-media-player__fill"
            :style="{ width: `${progress}%` }" /><view
            class="mn-media-player__thumb"
            :style="{ left: `${progress}%` }"
        /></view>
        <view
          class="mn-media-player__button mn-media-player__play"
          data-part="button"
          role="button"
          :aria-label="paused ? t('mediaPlayer.play') : t('mediaPlayer.pause')"
          :aria-disabled="failed ? 'true' : undefined"
          @tap="toggle"
          ><text aria-hidden="true">{{ paused ? "▶" : "❚❚" }}</text></view
        >
        <template v-if="skipSeconds > 0">
          <view
            class="mn-media-player__button"
            data-part="button"
            role="button"
            :aria-label="t('mediaPlayer.skipBack', { count: skipSeconds })"
            @tap="seek(currentTime - skipSeconds)"
            ><text aria-hidden="true">−{{ skipSeconds }}</text></view
          >
          <view
            class="mn-media-player__button"
            data-part="button"
            role="button"
            :aria-label="t('mediaPlayer.skipForward', { count: skipSeconds })"
            @tap="seek(currentTime + skipSeconds)"
            ><text aria-hidden="true">+{{ skipSeconds }}</text></view
          >
        </template>
        <view
          v-if="!isVideo && showSpinner"
          class="mn-media-player__spinner"
          data-part="spinner"
          role="status"
          :aria-label="t('mediaPlayer.loading')"
        />
        <text class="mn-media-player__time" data-part="time">{{
          timeText
        }}</text>
        <view class="mn-media-player__spacer" />
        <view
          class="mn-media-player__button"
          data-part="button"
          role="button"
          :aria-label="muted ? t('mediaPlayer.unmute') : t('mediaPlayer.mute')"
          @tap="toggleMute"
          ><text aria-hidden="true">{{
            muted ? "🔇\uFE0E" : "🔊\uFE0E"
          }}</text></view
        >
        <view
          v-if="!isVideo"
          :id="`${uid}-volume`"
          class="mn-media-player__volume"
          data-part="volume"
          role="slider"
          :aria-label="t('mediaPlayer.volume')"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="Math.round(shownVolume * 100)"
          :aria-valuetext="`${Math.round(shownVolume * 100)}%`"
          @touchstart="touchStart('volume', $event)"
          @touchmove="touchMove"
          @touchend="touchEnd"
          ><view class="mn-media-player__track" /><view
            class="mn-media-player__fill"
            :style="{ width: `${shownVolume * 100}%` }" /><view
            class="mn-media-player__thumb"
            :style="{ left: `${shownVolume * 100}%` }"
        /></view>
        <view
          v-if="playbackRates.length > 1"
          class="mn-media-player__button mn-media-player__rate"
          data-part="button"
          role="button"
          :aria-label="t('mediaPlayer.playbackRate', { rate: rateText })"
          @tap="cycleRate"
          ><text aria-hidden="true">{{ rateText }}</text></view
        >
        <view
          v-if="isVideo"
          class="mn-media-player__button"
          data-part="button"
          role="button"
          :aria-label="
            fullscreen
              ? t('mediaPlayer.exitFullscreen')
              : t('mediaPlayer.fullscreen')
          "
          @tap="toggleFullscreen"
          ><text aria-hidden="true">⤢</text></view
        >
      </view>
    </template>
  </view>
</template>
