import simulate from "miniprogram-simulate";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { mediaPlayer } from "./index";

// No media in the simulator: fake wx.createVideoContext /
// wx.createInnerAudioContext, and fire the host <video> events by hand.
type Listener = (payload?: unknown) => void;
const videoContext = {
  play: vi.fn(),
  pause: vi.fn(),
  seek: vi.fn(),
  playbackRate: vi.fn(),
  requestFullScreen: vi.fn(),
  exitFullScreen: vi.fn(),
};
let audio: ReturnType<typeof fakeAudio>;
function fakeAudio() {
  const listeners: Record<string, Listener> = {};
  const on = (name: string) => (cb: Listener) => {
    listeners[name] = cb;
  };
  return {
    listeners,
    src: "",
    autoplay: false,
    loop: false,
    startTime: 0,
    volume: 1,
    playbackRate: 1,
    currentTime: 0,
    duration: 0,
    buffered: 0,
    play: vi.fn(),
    pause: vi.fn(),
    seek: vi.fn(),
    destroy: vi.fn(),
    onPlay: on("play"),
    onPause: on("pause"),
    onStop: on("stop"),
    onEnded: on("ended"),
    onWaiting: on("waiting"),
    onCanplay: on("canplay"),
    onTimeUpdate: on("timeupdate"),
    onError: on("error"),
  };
}

const wxGlobal = globalThis as unknown as { wx: Record<string, unknown> };
let original: Record<string, unknown> | undefined;
beforeEach(() => {
  original = wxGlobal.wx;
  wxGlobal.wx = {
    ...(original ?? {}),
    createVideoContext: vi.fn(() => videoContext),
    createInnerAudioContext: vi.fn(() => (audio = fakeAudio())),
  };
});

const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => {
  mounted.splice(0).forEach((w) => w.detach());
  wxGlobal.wx = original as Record<string, unknown>;
  vi.clearAllMocks();
});
function mount(props: Record<string, unknown>) {
  const id = simulate.load({
    tagName: "media-player-case",
    template: mediaPlayer.template,
    ...mediaPlayer.definition,
  });
  const w = simulate.render(id, props);
  const events: [string, unknown][] = [];
  for (const name of [
    "play",
    "pause",
    "ended",
    "timeupdate",
    "loadedmetadata",
    "error",
    "ratechange",
    "volumechange",
  ])
    w.addEventListener(name, (event: { detail: unknown }) =>
      events.push([name, event.detail]),
    );
  w.attach(document.createElement("div"));
  mounted.push(w);
  return { w, events };
}
const BUTTONS: Record<string, string> = {
  play: "Play",
  back: "Back 10 seconds",
  forward: "Forward 10 seconds",
  mute: "Mute",
  rate: "Playback speed 1×",
  fullscreen: "Full screen",
};
const button = (w: ReturnType<typeof mount>["w"], name: string) =>
  w.querySelector(`.mn-media-player__${name}`);

it("media player renders a video with the host controls off and the themed bar", () => {
  const { w } = mount({ src: "/clip.mp4", title: "Flower" });
  expect(w.data.isVideo).toBe(true);
  expect(w.data.status).toBe("paused");
  expect(w.data.labels.root).toBe("Flower");
  expect(w.querySelector(".mn-media-player__title")!.dom!.textContent).toBe(
    "Flower",
  );
  for (const name of Object.keys(BUTTONS))
    expect(button(w, name), name).toBeTruthy();
  expect(w.data.labels).toMatchObject({
    toggle: BUTTONS.play,
    back: BUTTONS.back,
    forward: BUTTONS.forward,
    mute: BUTTONS.mute,
    rate: BUTTONS.rate,
    fullscreen: BUTTONS.fullscreen,
  });
  expect(w.querySelector(".mn-media-player__volume")).toBeFalsy();
});

it("media player drives the video context and follows the host events", async () => {
  const { w, events } = mount({ src: "/clip.mp4" });
  const video = w.querySelector(".mn-media-player__media")!;
  video.dispatchEvent("loadedmetadata", { detail: { duration: 296 } });
  await simulate.sleep(0);
  expect(events).toContainEqual(["loadedmetadata", { duration: 296 }]);
  button(w, "play")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(videoContext.play).toHaveBeenCalled();
  video.dispatchEvent("play");
  await simulate.sleep(0);
  expect(w.data.status).toBe("playing");
  video.dispatchEvent("timeupdate", {
    detail: { currentTime: 83, duration: 296 },
  });
  await simulate.sleep(0);
  expect(events).toContainEqual([
    "timeupdate",
    { currentTime: 83, duration: 296 },
  ]);
  expect(w.data.labels.seekText).toBe("1:23 of 4:56");
  expect(w.data.timeText).toBe("1:23 / 4:56");
  button(w, "forward")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(videoContext.seek).toHaveBeenCalledWith(93);
  button(w, "rate")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(videoContext.playbackRate).toHaveBeenCalledWith(1.25);
  expect(events).toContainEqual(["ratechange", { rate: 1.25 }]);
  button(w, "fullscreen")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(videoContext.requestFullScreen).toHaveBeenCalled();
  video.dispatchEvent("ended");
  await simulate.sleep(0);
  expect(w.data.status).toBe("ended");
  expect(events.map(([name]) => name)).toContain("ended");
});

it("media player plays audio through an InnerAudioContext with a volume bar", async () => {
  const { w, events } = mount({ src: "/song.mp3", startTime: 12 });
  expect(w.data.isVideo).toBe(false);
  expect(audio.src).toBe("/song.mp3");
  expect(audio.startTime).toBe(12);
  button(w, "play")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(audio.play).toHaveBeenCalled();
  audio.listeners.play!();
  audio.currentTime = 20;
  audio.duration = 100;
  audio.listeners.timeupdate!();
  await simulate.sleep(0);
  expect(w.data.timeText).toBe("0:20 / 1:40");
  w.instance.seek(500);
  expect(audio.seek).toHaveBeenCalledWith(100);
  button(w, "mute")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(audio.volume).toBe(0);
  expect(events).toContainEqual(["volumechange", { volume: 1, muted: true }]);
  expect(w.data.volumeNow).toBe(0);
  w.detach();
  mounted.splice(0);
  expect(audio.destroy).toHaveBeenCalled();
});

it("media player shows the spinner and the error state", async () => {
  const { w, events } = mount({ src: "/song.mp3" });
  audio.listeners.waiting!();
  await simulate.sleep(0);
  expect(w.querySelector(".mn-media-player__spinner")).toBeTruthy();
  expect(w.data.labels.loading).toBe("Loading");
  audio.listeners.error!({ errCode: 10004 });
  await simulate.sleep(0);
  expect(events).toContainEqual(["error", { error: { errCode: 10004 } }]);
  expect(w.querySelector(".mn-media-player__error")!.dom!.textContent).toBe(
    "This media can't be played",
  );
});
