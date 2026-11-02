import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import MediaPlayer from "./MediaPlayer.vue";

// The uni mock has no media APIs: install fakes of the video context and of
// the InnerAudioContext; the host <video> events are fired by hand.
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
    async emit(name: string, payload?: unknown) {
      listeners[name]?.(payload);
      await nextTick();
    },
  };
}

const uniGlobal = (globalThis as unknown as { uni: Record<string, unknown> })
  .uni;
beforeEach(() => {
  uniGlobal.createVideoContext = vi.fn(() => videoContext);
  uniGlobal.createInnerAudioContext = vi.fn(() => (audio = fakeAudio()));
});
afterEach(() => {
  delete uniGlobal.createVideoContext;
  delete uniGlobal.createInnerAudioContext;
});

const fireVideo = async (
  w: ReturnType<typeof mount>,
  name: string,
  detail: unknown = {},
) => {
  w.find("video").element.dispatchEvent(new CustomEvent(name, { detail }));
  await nextTick();
};
const button = (w: ReturnType<typeof mount>, label: string) =>
  w.find(`[role="button"][aria-label="${label}"]`);

it("media player renders a video with the host controls off and the themed bar", () => {
  const w = mount(MediaPlayer, {
    props: { src: "/clip.mp4", title: "Flower" },
  });
  const root = w.find('[data-minerva="media-player"]');
  expect(root.attributes("role")).toBe("group");
  expect(root.attributes("aria-label")).toBe("Flower");
  expect(root.classes()).toContain("mn-variant-video");
  expect(root.attributes("data-status")).toBe("paused");
  expect(w.find(".mn-media-player__title").text()).toBe("Flower");
  for (const label of [
    "Play",
    "Back 10 seconds",
    "Forward 10 seconds",
    "Mute",
    "Playback speed 1×",
    "Full screen",
  ]) {
    expect(button(w, label).exists(), label).toBe(true);
  }
  expect(w.find('[aria-label="Volume"]').exists()).toBe(false);
});

it("media player drives the video context and follows the host events", async () => {
  const w = mount(MediaPlayer, { props: { src: "/clip.mp4" } });
  await fireVideo(w, "loadedmetadata", { duration: 296 });
  expect(w.emitted("loadedMetadata")).toEqual([[{ duration: 296 }]]);
  await button(w, "Play").trigger("click");
  expect(videoContext.play).toHaveBeenCalled();
  await fireVideo(w, "play");
  expect(w.emitted("play")).toHaveLength(1);
  expect(w.attributes("data-status")).toBe("playing");
  await fireVideo(w, "timeupdate", { currentTime: 83, duration: 296 });
  expect(w.emitted("timeUpdate")!.at(-1)).toEqual([
    { currentTime: 83, duration: 296 },
  ]);
  expect(w.find('[role="slider"]').attributes("aria-valuetext")).toBe(
    "1:23 of 4:56",
  );
  await button(w, "Forward 10 seconds").trigger("click");
  expect(videoContext.seek).toHaveBeenCalledWith(93);
  await button(w, "Playback speed 1×").trigger("click");
  expect(videoContext.playbackRate).toHaveBeenCalledWith(1.25);
  expect(w.emitted("rateChange")).toEqual([[1.25]]);
  await button(w, "Full screen").trigger("click");
  expect(videoContext.requestFullScreen).toHaveBeenCalled();
  await fireVideo(w, "ended");
  expect(w.emitted("ended")).toHaveLength(1);
  expect(w.attributes("data-status")).toBe("ended");
});

it("media player plays audio through an InnerAudioContext with a volume bar", async () => {
  const w = mount(MediaPlayer, { props: { src: "/song.mp3", startTime: 12 } });
  expect(w.classes()).toContain("mn-variant-audio");
  expect(audio.src).toBe("/song.mp3");
  expect(audio.startTime).toBe(12);
  await button(w, "Play").trigger("click");
  expect(audio.play).toHaveBeenCalled();
  await audio.emit("play");
  audio.currentTime = 20;
  audio.duration = 100;
  await audio.emit("timeupdate");
  expect(w.find(".mn-media-player__time").text()).toBe("0:20 / 1:40");
  (w.vm as unknown as { seek: (s: number) => void }).seek(500);
  expect(audio.seek).toHaveBeenCalledWith(100);
  await button(w, "Mute").trigger("click");
  expect(audio.volume).toBe(0);
  expect(w.emitted("volumeChange")).toEqual([[{ volume: 1, muted: true }]]);
  expect(w.find('[aria-label="Volume"]').attributes("aria-valuenow")).toBe("0");
  w.unmount();
  expect(audio.destroy).toHaveBeenCalled();
});

it("media player shows the spinner and the error state", async () => {
  const w = mount(MediaPlayer, { props: { src: "/song.mp3" } });
  await audio.emit("waiting");
  expect(w.find('[role="status"]').attributes("aria-label")).toBe("Loading");
  expect(w.attributes("data-loading")).toBe("");
  await audio.emit("error", { errCode: 10004 });
  expect(w.emitted("error")).toEqual([[{ errCode: 10004 }]]);
  expect(w.find('[role="alert"]').text()).toBe("This media can't be played");
  expect(w.classes()).toContain("mn-invalid");
});

it("media player controls=false hands the video to the host controls", () => {
  const w = mount(MediaPlayer, {
    props: { src: "/clip.mp4", controls: false },
  });
  expect(w.find("video").attributes("controls")).toBeDefined();
  expect(w.find('[role="button"]').exists()).toBe(false);
});

const VTT =
  "WEBVTT\n\n00:01.000 --> 00:03.000\nHello <i>there</i>\n\n00:05.000 --> 00:06.000\nBye\n";
const SRT = "1\n00:00:01,000 --> 00:00:03,000\nBonjour\n";
const captionTracks = [
  {
    src: `data:text/vtt,${encodeURIComponent(VTT)}`,
    srclang: "en",
    label: "English",
    default: true,
  },
  { src: "https://cdn.example.com/fr.srt", srclang: "fr", label: "Français" },
];
const flush = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  await nextTick();
};
const captions = (w: ReturnType<typeof mount>) =>
  w.find('[data-part="captions"]');

function captionsHost(stored: Record<string, unknown> = {}) {
  uniGlobal.getStorageSync = vi.fn((key: string) => stored[key]);
  uniGlobal.setStorageSync = vi.fn((key: string, value: unknown) => {
    stored[key] = value;
  });
  uniGlobal.request = vi.fn(
    (options: {
      url: string;
      success: (result: { statusCode: number; data: unknown }) => void;
    }) => options.success({ statusCode: 200, data: SRT }),
  );
  return stored;
}
afterEach(() => {
  delete uniGlobal.getStorageSync;
  delete uniGlobal.setStorageSync;
  delete uniGlobal.request;
});

it("media player draws the active cue of the default track at the video time", async () => {
  captionsHost();
  const w = mount(MediaPlayer, {
    props: { src: "/clip.mp4", tracks: captionTracks },
  });
  await flush();
  expect(captions(w).exists()).toBe(false);
  await fireVideo(w, "timeupdate", { currentTime: 1.5, duration: 10 });
  expect(captions(w).text()).toBe("Hello there");
  await fireVideo(w, "timeupdate", { currentTime: 4, duration: 10 });
  expect(captions(w).exists()).toBe(false);
});

it("media player chooses captions with the CC button and remembers them", async () => {
  const stored = captionsHost();
  const w = mount(MediaPlayer, {
    props: { src: "/clip.mp4", tracks: captionTracks },
  });
  const cc = button(w, "Captions");
  expect(cc.attributes("aria-expanded")).toBe("false");
  await cc.trigger("click");
  const menu = w.find('[data-part="captions-menu"]');
  const options = menu.findAll('[role="button"]');
  expect(options.map((o) => o.text())).toEqual(["Off", "English", "Français"]);
  expect(options[1]!.attributes("aria-pressed")).toBe("true");
  await options[2]!.trigger("click");
  expect(w.emitted("trackChange")).toEqual([
    [{ index: 1, track: captionTracks[1] }],
  ]);
  expect(stored["minerva-media-player-captions"]).toBe("fr");
  expect(w.find('[data-part="captions-menu"]').exists()).toBe(false);
  await flush();
  expect(uniGlobal.request).toHaveBeenCalledWith(
    expect.objectContaining({
      url: "https://cdn.example.com/fr.srt",
      dataType: "text",
    }),
  );
  await fireVideo(w, "timeupdate", { currentTime: 2, duration: 10 });
  expect(captions(w).text()).toBe("Bonjour");
});

it("media player shows audio cues under the title, from the remembered track", async () => {
  captionsHost({ "minerva-media-player-captions": "en-US" });
  const w = mount(MediaPlayer, {
    props: {
      src: "/talk.mp3",
      title: "Talk",
      tracks: [{ ...captionTracks[0]!, default: false }, captionTracks[1]!],
    },
  });
  await flush();
  const area = captions(w);
  expect(area.exists()).toBe(true);
  expect(
    area.element.compareDocumentPosition(
      w.find(".mn-media-player__title").element,
    ) & Node.DOCUMENT_POSITION_PRECEDING,
  ).toBeTruthy();
  audio.currentTime = 2;
  await audio.emit("timeupdate");
  expect(captions(w).text()).toBe("Hello there");
});
