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
