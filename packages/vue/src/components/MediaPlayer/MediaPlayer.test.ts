import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render } from "@testing-library/vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MediaPlayer, type MediaPlayerExpose } from ".";

// No media pipeline in the test DOM: play / pause are stubbed to dispatch
// the events a browser would; duration / currentTime are plain values.
let playSpy: ReturnType<typeof vi.spyOn>;
let pauseSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  playSpy = vi
    .spyOn(HTMLMediaElement.prototype, "play")
    .mockImplementation(function (this: HTMLMediaElement) {
      Object.defineProperty(this, "paused", {
        configurable: true,
        value: false,
      });
      this.dispatchEvent(new Event("play"));
      return Promise.resolve();
    });
  pauseSpy = vi
    .spyOn(HTMLMediaElement.prototype, "pause")
    .mockImplementation(function (this: HTMLMediaElement) {
      Object.defineProperty(this, "paused", {
        configurable: true,
        value: true,
      });
      this.dispatchEvent(new Event("pause"));
    });
});

afterEach(() => vi.restoreAllMocks());

type Props = Record<string, unknown>;
const renderPlayer = (props: Props = {}) =>
  render(MediaPlayer, { props: { src: "/song.mp3", ...props } as never });

const media = () => document.querySelector<HTMLMediaElement>("audio, video")!;
const button = (label: string) =>
  document.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;
const group = () => document.querySelector<HTMLElement>('[role="group"]')!;

let time = 0;
const load = async (duration = 296) => {
  const element = media();
  time = 0;
  Object.defineProperty(element, "duration", {
    configurable: true,
    value: duration,
  });
  Object.defineProperty(element, "currentTime", {
    configurable: true,
    get: () => time,
    set: (value: number) => {
      time = value;
    },
  });
  await fireEvent(element, new Event("loadedmetadata"));
};
const tick = async (seconds: number) => {
  time = seconds;
  await fireEvent(media(), new Event("timeupdate"));
};

describe("MediaPlayer (Vue)", () => {
  it("infers audio / video and renders the control bar", () => {
    renderPlayer({ src: "/clip.mp4", title: "Flower" });
    expect(media().tagName).toBe("VIDEO");
    expect(group().getAttribute("aria-label")).toBe("Flower");
    expect(group().dataset.minerva).toBe("media-player");
    expect(group().dataset.variant).toBe("video");
    expect(group().dataset.status).toBe("paused");
    for (const name of [
      "Play",
      "Back 10 seconds",
      "Forward 10 seconds",
      "Mute",
      "Playback speed 1×",
      "Full screen",
    ]) {
      expect(button(name)).toBeTruthy();
    }
    expect(
      document.querySelector('[data-part="title"]')!.textContent,
    ).toContain("Flower");
  });

  it("plays, pauses and emits the events", async () => {
    const view = renderPlayer();
    await load();
    expect(view.emitted("loadedMetadata")).toEqual([[{ duration: 296 }]]);
    await fireEvent.click(button("Play"));
    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(view.emitted("play")).toHaveLength(1);
    expect(group().dataset.status).toBe("playing");
    await tick(83);
    expect(view.emitted("timeUpdate")!.at(-1)).toEqual([
      { currentTime: 83, duration: 296 },
    ]);
    expect(
      document
        .querySelector('[data-part="seek"]')!
        .getAttribute("aria-valuetext"),
    ).toBe("1:23 of 4:56");
    expect(document.querySelector('[data-part="time"]')!.textContent).toBe(
      "1:23 / 4:56",
    );
    await fireEvent.click(button("Pause"));
    expect(pauseSpy).toHaveBeenCalledTimes(1);
    expect(view.emitted("pause")).toHaveLength(1);
    await fireEvent(media(), new Event("ended"));
    expect(view.emitted("ended")).toHaveLength(1);
    expect(group().dataset.status).toBe("ended");
  });

  it("applies startTime once and seeks with the skip buttons and keys", async () => {
    renderPlayer({ src: "/clip.mp4", startTime: 42, skipSeconds: 15 });
    await load(100);
    expect(time).toBe(42);
    await fireEvent.click(button("Forward 15 seconds"));
    expect(time).toBe(57);
    await fireEvent.keyDown(group(), { key: "ArrowLeft" });
    expect(time).toBe(52);
    await fireEvent.keyDown(document.querySelector('[data-part="seek"]')!, {
      key: "End",
    });
    expect(time).toBe(100);
  });

  it("keyboard: Space / K toggle, M mutes, arrows change the volume", async () => {
    const view = renderPlayer();
    await load();
    await fireEvent.keyDown(group(), { key: " " });
    expect(playSpy).toHaveBeenCalledTimes(1);
    await fireEvent.keyDown(group(), { key: "k" });
    expect(pauseSpy).toHaveBeenCalledTimes(1);
    await fireEvent.keyDown(group(), { key: "m" });
    expect(media().muted).toBe(true);
    expect(button("Unmute").getAttribute("aria-pressed")).toBe("true");
    await fireEvent.keyDown(group(), { key: "m" });
    await fireEvent.keyDown(group(), { key: "ArrowDown" });
    expect(media().volume).toBe(0.9);
    await fireEvent(media(), new Event("volumechange"));
    expect(view.emitted("volumeChange")!.at(-1)).toEqual([
      { volume: 0.9, muted: false },
    ]);
    // Space on a button activates the button only
    await fireEvent.keyDown(button("Mute"), { key: " " });
    expect(playSpy).toHaveBeenCalledTimes(1);
  });

  it("cycles the playback rates", async () => {
    const view = renderPlayer({ playbackRates: [1, 1.5] });
    await fireEvent.click(button("Playback speed 1×"));
    expect(media().playbackRate).toBe(1.5);
    expect(button("Playback speed 1.5×").textContent!.trim()).toBe("1.5×");
    await fireEvent(media(), new Event("ratechange"));
    expect(view.emitted("rateChange")).toEqual([[1.5]]);
  });

  it("shows the spinner and the error state", async () => {
    const view = renderPlayer({ src: "/clip.mp4" });
    await fireEvent(media(), new Event("waiting"));
    expect(
      document.querySelector('[role="status"]')!.getAttribute("aria-label"),
    ).toBe("Loading");
    expect(group().dataset.loading).toBe("");
    await fireEvent(media(), new Event("error"));
    expect(view.emitted("error")).toHaveLength(1);
    expect(document.querySelector('[role="alert"]')!.textContent).toContain(
      "This media can't be played",
    );
    expect(group().dataset.invalid).toBe("");
    expect(button("Play").disabled).toBe(true);
  });

  it("exposes play / pause / seek / element", async () => {
    const player = ref<MediaPlayerExpose | null>(null);
    const Host = defineComponent({
      setup: () => () => h(MediaPlayer, { ref: player, src: "/clip.mp4" }),
    });
    render(Host);
    await nextTick();
    await load(100);
    expect(player.value!.element).toBe(media());
    await player.value!.play();
    expect(playSpy).toHaveBeenCalled();
    player.value!.pause();
    expect(pauseSpy).toHaveBeenCalled();
    player.value!.seek(500);
    expect(time).toBe(100);
  });

  it("renders the bare media element without controls; applies muted", async () => {
    const view = renderPlayer({
      src: "/clip.mp4",
      controls: false,
      muted: true,
    });
    expect(media()).toBeTruthy();
    expect(media().muted).toBe(true);
    expect(document.querySelector("button")).toBeNull();
    expect(document.querySelector('[role="group"]')).toBeNull();
    await view.rerender({ src: "/clip.mp4", controls: false, muted: false });
    expect(media().muted).toBe(false);
  });
});

describe("MediaPlayer captions (Vue)", () => {
  // happy-dom builds a new TextTrack on each `track` read and refuses the
  // "hidden" mode: one stable fake per <track>.
  const textTracks = new WeakMap<HTMLTrackElement, TextTrack>();
  const textTrackOf = (el: HTMLTrackElement) => {
    let track = textTracks.get(el);
    if (!track) {
      track = Object.assign(new EventTarget(), {
        mode: "disabled",
        activeCues: null,
      }) as unknown as TextTrack;
      textTracks.set(el, track);
    }
    return track;
  };
  const tracks = [
    { src: "/en.vtt", srclang: "en", label: "English" },
    { src: "/fr.vtt", srclang: "fr", label: "Français", default: true },
  ];
  const trackEls = () => Array.from(media().querySelectorAll("track"));

  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(HTMLTrackElement.prototype, "track", "get").mockImplementation(
      function (this: HTMLTrackElement) {
        return textTrackOf(this);
      },
    );
  });

  it("renders <track> children and draws the active cue", async () => {
    renderPlayer({ src: "/clip.mp4", tracks });
    await nextTick();
    const els = trackEls();
    expect(els.map((el) => el.getAttribute("srclang"))).toEqual(["en", "fr"]);
    expect(els[0]!.getAttribute("kind")).toBe("subtitles");
    expect(els[1]!.hasAttribute("default")).toBe(false);
    const fr = textTrackOf(els[1]!);
    expect(fr.mode).toBe("hidden");
    Object.defineProperty(fr, "activeCues", {
      configurable: true,
      value: [{ text: "<i>Bonjour</i>" }],
    });
    fr.dispatchEvent(new Event("cuechange"));
    await nextTick();
    expect(document.querySelector('[data-part="captions"]')!.textContent).toBe(
      "Bonjour",
    );
  });

  it("chooses a track in the captions menu and emits trackChange", async () => {
    const view = renderPlayer({ src: "/clip.mp4", tracks });
    await nextTick();
    const cc = button("Captions");
    expect(cc.getAttribute("aria-haspopup")).toBe("menu");
    await fireEvent.click(cc);
    await nextTick();
    const items = Array.from(
      document.querySelectorAll<HTMLElement>('[role="menuitemradio"]'),
    );
    expect(items.map((item) => item.textContent?.trim())).toEqual([
      "Off",
      "English",
      "Français",
    ]);
    expect(items[2]!.getAttribute("aria-checked")).toBe("true");
    expect(document.activeElement).toBe(items[2]);
    await fireEvent.keyDown(items[2]!, { key: "Home" });
    expect(document.activeElement).toBe(items[0]);
    await fireEvent.click(items[1]!);
    expect(view.emitted("trackChange")).toEqual([
      [{ index: 0, track: tracks[0] }],
    ]);
    expect(document.querySelector('[role="menu"]')).toBeNull();
    expect(localStorage.getItem("minerva-media-player-captions")).toBe("en");
    await nextTick();
    expect(textTrackOf(trackEls()[0]!).mode).toBe("hidden");
    expect(textTrackOf(trackEls()[1]!).mode).toBe("disabled");

    group().focus();
    await fireEvent.keyDown(group(), { key: "c" });
    expect(view.emitted("trackChange")![1]).toEqual([
      { index: -1, track: null },
    ]);
  });

  it("shows SRT cues of an audio player under the title", async () => {
    const srt = "1\n00:00:01,000 --> 00:00:03,000\nHello\n";
    renderPlayer({
      title: "Talk",
      tracks: [
        {
          src: `data:application/x-subrip,${encodeURIComponent(srt)}`,
          label: "English",
          default: true,
        },
      ],
    });
    await load(10);
    await new Promise((resolve) => setTimeout(resolve, 0));
    await tick(2);
    expect(document.querySelector('[data-part="captions"]')!.textContent).toBe(
      "Hello",
    );
  });
});
