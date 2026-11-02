// MediaPlayer of the native WeChat build: video through the host <video>
// (its own controls off, driven by wx.createVideoContext) and audio through
// wx.createInnerAudioContext, under the themed control bar of the other
// renderers: play / pause, skip back / forward, a touch seek bar with the
// buffered range, the time, mute (and a volume bar for audio), the playback
// speed (cycle button) and fullscreen (video).
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
import { nativeTranslate } from "./configuration";

type Instance = WechatMiniprogram.Component.TrivialInstance;
type Ctx = WechatMiniprogram.IAnyObject;
interface Rect {
  left: number;
  width: number;
}
interface State {
  video: Ctx | null;
  audio: Ctx | null;
  audioSrc: string;
  metadataSent: boolean;
  rects: Record<string, Rect | null>;
  dragging: string | null;
}

const states = new WeakMap<Instance, State>();
const VIDEO_ID = "mn-media-player-video";
const flag = (value = false) => ({ type: Boolean, value });
const text = (value = "") => ({ type: String, value });

const stateOf = (self: Instance): State => {
  let state = states.get(self);
  if (!state) {
    state = {
      video: null,
      audio: null,
      audioSrc: "",
      metadataSent: false,
      rects: {},
      dragging: null,
    };
    states.set(self, state);
  }
  return state;
};
const finite = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
const wxApi = (): WechatMiniprogram.IAnyObject | undefined =>
  typeof wx === "undefined" ? undefined : (wx as WechatMiniprogram.IAnyObject);
const isVideo = (self: Instance) =>
  inferMediaType(
    self.data.src,
    self.data.mimeType,
    self.data.type === "audio" || self.data.type === "video"
      ? self.data.type
      : undefined,
  ) === "video";
const context = (self: Instance) => {
  const state = stateOf(self);
  return self.data.isVideo ? state.video : state.audio;
};
const cssSize = (value: string) =>
  /^\d+(\.\d+)?$/.test(value.trim()) ? `${value.trim()}px` : value;

/** Derived view data (labels, percentages, classes) */
function sync(self: Instance) {
  const t = (key: string, options?: Record<string, unknown>) =>
    nativeTranslate(self, key, options);
  const video = isVideo(self);
  const { currentTime, duration, buffered, paused, ended, failed, loading } =
    self.data;
  const muted: boolean = self.data.mutedState;
  const volume: number = self.data.volumeState;
  const shownVolume = muted ? 0 : volume;
  const skip = Number(self.data.skipSeconds) || 0;
  const rate: number = self.data.rate;
  const rates = (self.data.playbackRates as number[]) ?? [];
  const status = ended ? "ended" : paused ? "paused" : "playing";
  const progress = mediaProgress(currentTime, duration) * 100;
  const rootStyle = video
    ? self.data.height
      ? `height:${cssSize(String(self.data.height))}`
      : `aspect-ratio:${self.data.aspectRatio}`
    : "";
  self.setData({
    isVideo: video,
    variant: video ? "video" : "audio",
    status,
    rootStyle,
    progress,
    bufferedPercent: mediaProgress(buffered, duration) * 100,
    volumePercent: shownVolume * 100,
    volumeNow: Math.round(shownVolume * 100),
    durationRounded: Math.round(duration),
    currentRounded: Math.round(currentTime),
    showSkip: skip > 0,
    showRate: rates.length > 1,
    showSpinner: loading && !failed,
    timeText: `${formatMediaTime(currentTime, duration)} / ${formatMediaTime(duration)}`,
    rateText: formatPlaybackRate(rate),
    labels: {
      root: self.data.ariaLabel || self.data.title || t("mediaPlayer.label"),
      toggle: paused ? t("mediaPlayer.play") : t("mediaPlayer.pause"),
      back: t("mediaPlayer.skipBack", { count: skip }),
      forward: t("mediaPlayer.skipForward", { count: skip }),
      seek: t("mediaPlayer.seek"),
      seekText: t("mediaPlayer.timeOf", {
        current: formatMediaTime(currentTime, duration),
        duration: formatMediaTime(duration),
      }),
      mute: muted ? t("mediaPlayer.unmute") : t("mediaPlayer.mute"),
      volume: t("mediaPlayer.volume"),
      rate: t("mediaPlayer.playbackRate", {
        rate: formatPlaybackRate(rate),
      }),
      fullscreen: self.data.fullscreen
        ? t("mediaPlayer.exitFullscreen")
        : t("mediaPlayer.fullscreen"),
      loading: t("mediaPlayer.loading"),
      error: t("mediaPlayer.error"),
    },
  });
}

function metadata(self: Instance, total: number) {
  const state = stateOf(self);
  if (state.metadataSent || total <= 0) return;
  state.metadataSent = true;
  self.setData({ duration: total });
  self.triggerEvent("loadedmetadata", { duration: total });
}

function timeUpdate(
  self: Instance,
  current: number,
  total: number,
  loaded?: number,
) {
  metadata(self, total);
  self.setData({
    currentTime: current,
    duration: total,
    ...(loaded === undefined ? {} : { buffered: loaded }),
  });
  self.triggerEvent("timeupdate", { currentTime: current, duration: total });
  sync(self);
}

function started(self: Instance) {
  self.setData({ paused: false, ended: false });
  self.triggerEvent("play", {});
  sync(self);
}
function stopped(self: Instance) {
  self.setData({ paused: true, loading: false });
  self.triggerEvent("pause", {});
  sync(self);
}
function finished(self: Instance) {
  self.setData({ paused: true, ended: true, loading: false });
  self.triggerEvent("ended", {});
  sync(self);
}
function failed(self: Instance, error: unknown) {
  self.setData({ failed: true, loading: false });
  self.triggerEvent("error", { error });
  sync(self);
}

function teardownAudio(self: Instance) {
  const state = stateOf(self);
  state.audio?.destroy?.();
  state.audio = null;
  state.audioSrc = "";
}

/** (Re)creates the host contexts for the current source */
function setup(self: Instance) {
  const state = stateOf(self);
  const video = isVideo(self);
  const api = wxApi();
  if (video) {
    teardownAudio(self);
    state.video = api?.createVideoContext?.(VIDEO_ID, self) ?? null;
    return;
  }
  state.video = null;
  const src: string = self.data.src;
  if (!src || state.audioSrc === src) return;
  teardownAudio(self);
  const ctx = api?.createInnerAudioContext?.() as Ctx | undefined;
  if (!ctx) return;
  state.audio = ctx;
  state.audioSrc = src;
  ctx.src = src;
  ctx.autoplay = self.data.autoPlay;
  ctx.loop = self.data.loop;
  ctx.volume = self.data.mutedState ? 0 : self.data.volumeState;
  if (self.data.startTime > 0) ctx.startTime = self.data.startTime;
  ctx.onPlay(() => started(self));
  ctx.onPause(() => stopped(self));
  ctx.onStop?.(() => {
    self.setData({ paused: true });
    sync(self);
  });
  ctx.onEnded(() => finished(self));
  ctx.onWaiting(() => {
    self.setData({ loading: true });
    sync(self);
  });
  ctx.onCanplay(() => {
    self.setData({ loading: false });
    metadata(self, finite(ctx.duration));
    sync(self);
  });
  ctx.onTimeUpdate(() =>
    timeUpdate(
      self,
      ctx.currentTime,
      finite(ctx.duration),
      finite(ctx.buffered),
    ),
  );
  ctx.onError((error: unknown) => failed(self, error));
}

function reset(self: Instance) {
  stateOf(self).metadataSent = false;
  self.setData({
    paused: true,
    ended: false,
    failed: false,
    loading: false,
    currentTime: 0,
    duration: 0,
    buffered: 0,
  });
}

function applyVolume(self: Instance) {
  const audio = stateOf(self).audio;
  if (audio) audio.volume = self.data.mutedState ? 0 : self.data.volumeState;
}

const touchX = (event: WechatMiniprogram.IAnyObject): number | undefined => {
  const touch = event?.touches?.[0] ?? event?.changedTouches?.[0];
  return touch?.clientX ?? touch?.pageX ?? touch?.x;
};

export const mediaPlayerTemplate = `<view class="mn-media-player mn-variant-{{variant}} {{status === 'playing' ? 'mn-playing' : ''}} {{loading ? 'mn-loading' : ''}} {{failed ? 'mn-invalid' : ''}}" style="{{rootStyle}}" data-minerva="media-player" data-part="root" data-variant="{{variant}}" data-status="{{status}}" role="{{controls ? 'group' : ''}}" aria-label="{{controls ? labels.root : ariaLabel}}"><video wx:if="{{isVideo}}" id="${VIDEO_ID}" class="mn-media-player__media" data-part="media" src="{{src}}" poster="{{poster}}" controls="{{!controls}}" autoplay="{{autoPlay}}" loop="{{loop}}" muted="{{mutedState}}" initial-time="{{startTime}}" show-center-play-btn="{{!controls}}" show-fullscreen-btn="{{!controls}}" show-play-btn="{{!controls}}" enable-progress-gesture="{{!controls}}" object-fit="contain" bindplay="onVideoPlay" bindpause="onVideoPause" bindended="onVideoEnded" bindwaiting="onVideoWaiting" bindloadedmetadata="onVideoMetadata" bindtimeupdate="onVideoTime" bindprogress="onVideoProgress" bindfullscreenchange="onVideoFullscreen" binderror="onVideoError"/><block wx:if="{{controls}}"><text wx:if="{{title}}" class="mn-media-player__title" data-part="title">{{title}}</text><view wx:if="{{isVideo && showSpinner}}" class="mn-media-player__spinner" data-part="spinner" role="status" aria-label="{{labels.loading}}"/><view wx:if="{{failed}}" class="mn-media-player__error" data-part="error" role="alert">{{labels.error}}</view><view class="mn-media-player__controls" data-part="controls"><view id="mn-media-player-seek" class="mn-media-player__seek" data-part="seek" data-track="seek" role="slider" aria-label="{{labels.seek}}" aria-valuemin="0" aria-valuemax="{{durationRounded}}" aria-valuenow="{{currentRounded}}" aria-valuetext="{{labels.seekText}}" aria-disabled="{{!duration}}" bindtouchstart="onTrackStart" bindtouchmove="onTrackMove" bindtouchend="onTrackEnd"><view class="mn-media-player__track"/><view class="mn-media-player__buffered" style="width:{{bufferedPercent}}%"/><view class="mn-media-player__fill" style="width:{{progress}}%"/><view class="mn-media-player__thumb" style="left:{{progress}}%"/></view><view class="mn-media-player__button mn-media-player__play" data-part="button" role="button" aria-label="{{labels.toggle}}" aria-disabled="{{failed}}" bindtap="onToggle"><text aria-hidden="true">{{paused ? '▶' : '❚❚'}}</text></view><block wx:if="{{showSkip}}"><view class="mn-media-player__button mn-media-player__back" data-part="button" data-delta="{{-skipSeconds}}" role="button" aria-label="{{labels.back}}" bindtap="onSkip"><text aria-hidden="true">−{{skipSeconds}}</text></view><view class="mn-media-player__button mn-media-player__forward" data-part="button" data-delta="{{skipSeconds}}" role="button" aria-label="{{labels.forward}}" bindtap="onSkip"><text aria-hidden="true">+{{skipSeconds}}</text></view></block><view wx:if="{{!isVideo && showSpinner}}" class="mn-media-player__spinner" data-part="spinner" role="status" aria-label="{{labels.loading}}"/><text class="mn-media-player__time" data-part="time">{{timeText}}</text><view class="mn-media-player__spacer"/><view class="mn-media-player__button mn-media-player__mute" data-part="button" role="button" aria-label="{{labels.mute}}" bindtap="onMute"><text aria-hidden="true">{{mutedState ? '🔇︎' : '🔊︎'}}</text></view><view wx:if="{{!isVideo}}" id="mn-media-player-volume" class="mn-media-player__volume" data-part="volume" data-track="volume" role="slider" aria-label="{{labels.volume}}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="{{volumeNow}}" aria-valuetext="{{volumeNow}}%" bindtouchstart="onTrackStart" bindtouchmove="onTrackMove" bindtouchend="onTrackEnd"><view class="mn-media-player__track"/><view class="mn-media-player__fill" style="width:{{volumePercent}}%"/><view class="mn-media-player__thumb" style="left:{{volumePercent}}%"/></view><view wx:if="{{showRate}}" class="mn-media-player__button mn-media-player__rate" data-part="button" role="button" aria-label="{{labels.rate}}" bindtap="onRate"><text aria-hidden="true">{{rateText}}</text></view><view wx:if="{{isVideo}}" class="mn-media-player__button mn-media-player__fullscreen" data-part="button" role="button" aria-label="{{labels.fullscreen}}" bindtap="onFullscreen"><text aria-hidden="true">⤢</text></view></view></block></view>`;

export const mediaPlayerProperties = {
  src: text(),
  type: text(),
  mimeType: text(),
  poster: text(),
  title: text(),
  autoPlay: flag(),
  loop: flag(),
  muted: { type: null, value: null },
  defaultMuted: flag(),
  startTime: { type: Number, value: 0 },
  playbackRates: { type: Array, value: [...DEFAULT_PLAYBACK_RATES] },
  skipSeconds: { type: Number, value: DEFAULT_SKIP_SECONDS },
  controls: flag(true),
  height: text(),
  aspectRatio: text("16 / 9"),
  ariaLabel: text(),
};

export const mediaPlayerMethods = {
  /** Starts playback */
  play(this: Instance) {
    context(this)?.play?.();
  },
  /** Pauses playback */
  pause(this: Instance) {
    context(this)?.pause?.();
  },
  /** Moves the playhead to `seconds` (clamped to the duration) */
  seek(this: Instance, seconds: number) {
    const next = clampMediaTime(Number(seconds), this.data.duration);
    context(this)?.seek?.(next);
    this.setData({ currentTime: next });
    sync(this);
  },
  onToggle(this: Instance) {
    if (this.data.failed) return;
    if (this.data.paused) this.play();
    else this.pause();
  },
  onSkip(this: Instance, event: WechatMiniprogram.BaseEvent) {
    this.seek(
      this.data.currentTime + Number(event.currentTarget.dataset.delta),
    );
  },
  onMute(this: Instance) {
    const muted = !this.data.mutedState;
    this.setData({ mutedState: muted });
    applyVolume(this);
    this.triggerEvent("volumechange", {
      volume: this.data.isVideo ? 1 : this.data.volumeState,
      muted,
    });
    sync(this);
  },
  setVolume(this: Instance, next: number) {
    const volume = clampVolume(next);
    const muted = volume > 0 ? false : this.data.mutedState;
    this.setData({ volumeState: volume, mutedState: muted });
    applyVolume(this);
    this.triggerEvent("volumechange", { volume, muted });
    sync(this);
  },
  onRate(this: Instance) {
    const next = nextPlaybackRate(this.data.rate, this.data.playbackRates);
    this.setData({ rate: next });
    const state = stateOf(this);
    if (this.data.isVideo) state.video?.playbackRate?.(next);
    else if (state.audio) state.audio.playbackRate = next;
    this.triggerEvent("ratechange", { rate: next });
    sync(this);
  },
  onFullscreen(this: Instance) {
    const video = stateOf(this).video;
    if (this.data.fullscreen) video?.exitFullScreen?.();
    else video?.requestFullScreen?.({ direction: 0 });
  },
  onTrackStart(this: Instance, event: WechatMiniprogram.TouchEvent) {
    const name = String(event.currentTarget.dataset.track);
    const x = touchX(event);
    if (x === undefined) return;
    const state = stateOf(this);
    state.dragging = name;
    this.createSelectorQuery()
      .select(`#mn-media-player-${name}`)
      .boundingClientRect((rect) => {
        const box = rect as { left?: number; width?: number } | null;
        if (!box || !box.width) return;
        state.rects[name] = { left: box.left ?? 0, width: box.width };
        this.applyTrack(name, x);
      })
      .exec();
  },
  onTrackMove(this: Instance, event: WechatMiniprogram.TouchEvent) {
    const state = stateOf(this);
    const x = touchX(event);
    if (!state.dragging || x === undefined) return;
    this.applyTrack(state.dragging, x);
  },
  onTrackEnd(this: Instance) {
    stateOf(this).dragging = null;
  },
  applyTrack(this: Instance, name: string, x: number) {
    const box = stateOf(this).rects[name];
    if (!box) return;
    const fraction = Math.min(1, Math.max(0, (x - box.left) / box.width));
    if (name === "volume") this.setVolume(fraction);
    else if (this.data.duration) this.seek(fraction * this.data.duration);
  },
  onVideoPlay(this: Instance) {
    started(this);
  },
  onVideoPause(this: Instance) {
    stopped(this);
  },
  onVideoEnded(this: Instance) {
    finished(this);
  },
  onVideoWaiting(this: Instance) {
    this.setData({ loading: true });
    sync(this);
  },
  onVideoMetadata(this: Instance, event: WechatMiniprogram.CustomEvent) {
    metadata(this, finite((event.detail as { duration?: number }).duration));
    sync(this);
  },
  onVideoTime(this: Instance, event: WechatMiniprogram.CustomEvent) {
    const detail = event.detail as { currentTime?: number; duration?: number };
    this.setData({ loading: false });
    timeUpdate(this, Number(detail.currentTime) || 0, finite(detail.duration));
  },
  onVideoProgress(this: Instance, event: WechatMiniprogram.CustomEvent) {
    const percent = Number((event.detail as { buffered?: number }).buffered);
    this.setData({ buffered: ((percent || 0) / 100) * this.data.duration });
    sync(this);
  },
  onVideoFullscreen(this: Instance, event: WechatMiniprogram.CustomEvent) {
    this.setData({
      fullscreen: !!(event.detail as { fullScreen?: boolean }).fullScreen,
    });
    sync(this);
  },
  onVideoError(this: Instance, event: WechatMiniprogram.CustomEvent) {
    failed(this, event.detail);
  },
};

export const mediaPlayerExtra = {
  data: {
    isVideo: true,
    variant: "video",
    status: "paused",
    rootStyle: "",
    paused: true,
    ended: false,
    loading: false,
    failed: false,
    currentTime: 0,
    duration: 0,
    buffered: 0,
    volumeState: 1,
    mutedState: false,
    rate: 1,
    fullscreen: false,
    progress: 0,
    bufferedPercent: 0,
    volumePercent: 100,
    volumeNow: 100,
    durationRounded: 0,
    currentRounded: 0,
    showSkip: true,
    showRate: true,
    showSpinner: false,
    timeText: "0:00 / 0:00",
    rateText: "1×",
    labels: {},
  },
  observers: {
    "src,type,mimeType": function (this: Instance) {
      reset(this);
      setup(this);
      sync(this);
    },
    muted(this: Instance, muted: boolean | null) {
      if (muted === null || muted === undefined) return;
      this.setData({ mutedState: !!muted });
      applyVolume(this);
      sync(this);
    },
    loop(this: Instance, loop: boolean) {
      const audio = stateOf(this).audio;
      if (audio) audio.loop = loop;
    },
    "title,ariaLabel,skipSeconds,playbackRates,height,aspectRatio,controls,localeLanguage":
      function (this: Instance) {
        sync(this);
      },
  },
  lifetimes: {
    attached(this: Instance) {
      this.setData({
        mutedState:
          this.data.muted === null || this.data.muted === undefined
            ? this.data.defaultMuted
            : !!this.data.muted,
      });
      setup(this);
      sync(this);
    },
    detached(this: Instance) {
      teardownAudio(this);
      states.delete(this);
    },
  },
};
