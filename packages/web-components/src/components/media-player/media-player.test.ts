import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaMediaPlayer } from "./media-player";
import "../../elements/media-player";
import { customStates } from "../../internal/styling-hooks";
import { $, mount } from "../../../tests/utils";

// happy-dom / jsdom have no media pipeline: play / pause are stubbed to
// dispatch the events a browser would; duration / currentTime are values.
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

afterEach(() => {
  vi.restoreAllMocks();
});

let time = 0;

async function setup(attrs = `src="/song.mp3"`, children = "") {
  return mount<MinervaMediaPlayer>(
    `<minerva-media-player ${attrs}>${children}</minerva-media-player>`,
    "minerva-media-player",
  );
}

async function load(el: MinervaMediaPlayer, duration = 296) {
  const media = el.element!;
  time = 0;
  Object.defineProperty(media, "duration", {
    configurable: true,
    value: duration,
  });
  Object.defineProperty(media, "currentTime", {
    configurable: true,
    get: () => time,
    set: (value: number) => {
      time = value;
    },
  });
  media.dispatchEvent(new Event("loadedmetadata"));
  await el.updateComplete;
}

async function tick(el: MinervaMediaPlayer, seconds: number) {
  time = seconds;
  el.element!.dispatchEvent(new Event("timeupdate"));
  await el.updateComplete;
}

const button = (el: Element, name: string) =>
  $(el, `button[aria-label="${name}"]`);

describe("<minerva-media-player>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-media-player")).toBe(MinervaMediaPlayer);
  });

  it("infers the media type and renders the control bar", async () => {
    const el = await setup(`src="/clip.mp4"`, `<b slot="heading">Flower</b>`);
    expect(el.element!.tagName).toBe("VIDEO");
    const root = $(el, '[part="root"]');
    expect(root.getAttribute("role")).toBe("group");
    expect(root.getAttribute("aria-label")).toBe("Flower");
    expect(root.getAttribute("style")).toContain("aspect-ratio:16 / 9");
    expect([...customStates(el)]).toEqual(
      expect.arrayContaining(["variant-video", "status-paused"]),
    );
    for (const name of [
      "Play",
      "Back 10 seconds",
      "Forward 10 seconds",
      "Mute",
      "Playback speed 1×",
      "Full screen",
    ]) {
      expect(button(el, name)).toBeTruthy();
    }
    el.mimeType = "audio/mpeg";
    el.src = "/stream";
    await el.updateComplete;
    expect(el.element!.tagName).toBe("AUDIO");
    expect(
      el.shadowRoot!.querySelector('button[aria-label="Full screen"]'),
    ).toBeNull();
  });

  it("plays, pauses, re-emits the media events", async () => {
    const el = await setup();
    const events: string[] = [];
    const details: Record<string, unknown> = {};
    for (const name of [
      "minerva-play",
      "minerva-pause",
      "minerva-ended",
      "minerva-time-update",
      "minerva-loaded-metadata",
    ]) {
      el.addEventListener(name, (event) => {
        events.push(name);
        details[name] = (event as CustomEvent).detail;
      });
    }
    await load(el);
    expect(details["minerva-loaded-metadata"]).toEqual({ duration: 296 });
    expect($(el, '[part="time"]').textContent!.replace(/\s+/g, " ")).toBe(
      "0:00 / 4:56",
    );
    button(el, "Play").click();
    await el.updateComplete;
    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(customStates(el)).toContain("status-playing");

    await tick(el, 83);
    expect(details["minerva-time-update"]).toEqual({
      currentTime: 83,
      duration: 296,
    });
    expect($(el, '[role="slider"]').getAttribute("aria-valuetext")).toBe(
      "1:23 of 4:56",
    );

    button(el, "Pause").click();
    await el.updateComplete;
    expect(pauseSpy).toHaveBeenCalledTimes(1);
    el.element!.dispatchEvent(new Event("ended"));
    await el.updateComplete;
    expect(customStates(el)).toContain("status-ended");
    expect(events).toEqual([
      "minerva-loaded-metadata",
      "minerva-play",
      "minerva-time-update",
      "minerva-pause",
      "minerva-ended",
    ]);
  });

  it("applies start-time once and seeks with skip buttons and keys", async () => {
    const el = await setup(`src="/clip.mp4" start-time="42" skip-seconds="15"`);
    await load(el, 100);
    expect(time).toBe(42);
    button(el, "Forward 15 seconds").click();
    expect(time).toBe(57);

    const user = userEvent.setup();
    $(el, '[part="root"]').focus();
    await user.keyboard("{ArrowLeft}");
    expect(time).toBe(52);
    $(el, '[part="seek"]').focus();
    await user.keyboard("{End}");
    expect(time).toBe(100);
  });

  it("stops downloading once removed, and resumes where it was when moved back", async () => {
    const loadSpy = vi
      .spyOn(HTMLMediaElement.prototype, "load")
      .mockImplementation(() => undefined);
    const el = await setup(`src="/clip.mp4" start-time="42"`);
    await load(el, 100);
    await tick(el, 60);
    const media = el.element!;

    el.remove();
    await el.updateComplete;
    expect(media.hasAttribute("src")).toBe(false);
    expect(loadSpy).toHaveBeenCalled();

    document.body.append(el);
    await el.updateComplete;
    expect(el.element).toBe(media);
    expect(media.getAttribute("src")).toBe("/clip.mp4");
    time = 0;
    media.dispatchEvent(new Event("loadedmetadata"));
    expect(time).toBe(60);
  });

  it("a player removed before its first render never loads its source", async () => {
    // e.g. an innerHTML re-render: the orphan would starve the new player
    document.body.innerHTML = `<minerva-media-player src="/clip.mp4"></minerva-media-player>`;
    const orphan = document.body.firstElementChild as MinervaMediaPlayer;
    document.body.innerHTML = "";
    await orphan.updateComplete;
    expect(orphan.element!.hasAttribute("src")).toBe(false);
  });

  it("keyboard: Space / K, M, volume keys; Space on a button only clicks it", async () => {
    const el = await setup();
    await load(el);
    const user = userEvent.setup();
    const volumes: unknown[] = [];
    el.addEventListener("minerva-volume-change", (event) =>
      volumes.push((event as CustomEvent).detail),
    );
    $(el, '[part="root"]').focus();
    await user.keyboard(" ");
    expect(playSpy).toHaveBeenCalledTimes(1);
    await user.keyboard("k");
    expect(pauseSpy).toHaveBeenCalledTimes(1);
    await user.keyboard("m");
    expect(el.element!.muted).toBe(true);
    expect(el.muted).toBe(true);
    await user.keyboard("{ArrowUp}");
    expect(el.element!.muted).toBe(false);
    el.element!.dispatchEvent(new Event("volumechange"));
    expect(volumes.at(-1)).toEqual({ volume: 0.1, muted: false });

    button(el, "Mute").focus();
    await user.keyboard(" ");
    expect(playSpy).toHaveBeenCalledTimes(1);
  });

  it("cycles the playback rates", async () => {
    const el = await setup();
    el.playbackRates = [1, 2];
    await el.updateComplete;
    const rates: unknown[] = [];
    el.addEventListener("minerva-rate-change", (event) =>
      rates.push((event as CustomEvent).detail),
    );
    button(el, "Playback speed 1×").click();
    await el.updateComplete;
    expect(el.element!.playbackRate).toBe(2);
    expect(button(el, "Playback speed 2×").textContent!.trim()).toBe("2×");
    el.element!.dispatchEvent(new Event("ratechange"));
    expect(rates).toEqual([{ rate: 2 }]);
  });

  it("shows the spinner and the error state", async () => {
    const el = await setup(`src="/clip.mp4"`);
    el.element!.dispatchEvent(new Event("waiting"));
    await el.updateComplete;
    expect($(el, '[part="spinner"]').getAttribute("aria-label")).toBe(
      "Loading",
    );
    expect(customStates(el)).toContain("loading");
    const errors: unknown[] = [];
    el.addEventListener("minerva-error", () => errors.push(true));
    el.element!.dispatchEvent(new Event("error"));
    await el.updateComplete;
    expect(errors).toHaveLength(1);
    expect($(el, '[part="error"]').textContent!.trim()).toBe(
      "This media can't be played",
    );
    expect(customStates(el)).toContain("invalid");
    expect((button(el, "Play") as HTMLButtonElement).disabled).toBe(true);
  });

  it("exposes play / pause / seek / element", async () => {
    const el = await setup(`src="/clip.mp4"`);
    await load(el, 100);
    await el.play();
    expect(playSpy).toHaveBeenCalled();
    el.pause();
    expect(pauseSpy).toHaveBeenCalled();
    el.seek(500);
    expect(time).toBe(100);
    expect(el.element).toBe(el.shadowRoot!.querySelector("video"));
  });

  it("renders the bare media element with no-controls", async () => {
    const el = await setup(`src="/clip.mp4" no-controls`);
    expect(el.element).toBeTruthy();
    expect(el.shadowRoot!.querySelector("button")).toBeNull();
    expect(el.shadowRoot!.querySelector('[role="group"]')).toBeNull();
  });
});

describe("<minerva-media-player> captions", () => {
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
  const trackEls = (el: MinervaMediaPlayer) =>
    Array.from(el.element!.querySelectorAll("track"));

  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(HTMLTrackElement.prototype, "track", "get").mockImplementation(
      function (this: HTMLTrackElement) {
        return textTrackOf(this);
      },
    );
  });

  it("renders the tracks property as <track> children and draws the cue", async () => {
    const el = await setup(`src="/clip.mp4"`);
    el.tracks = tracks;
    await el.updateComplete;
    const els = trackEls(el);
    expect(els.map((track) => track.getAttribute("srclang"))).toEqual([
      "en",
      "fr",
    ]);
    expect(els[1]!.hasAttribute("default")).toBe(false);
    const fr = textTrackOf(els[1]!);
    expect(fr.mode).toBe("hidden");
    Object.defineProperty(fr, "activeCues", {
      configurable: true,
      value: [{ text: "Bonjour" }],
    });
    fr.dispatchEvent(new Event("cuechange"));
    await el.updateComplete;
    expect($(el, '[part="captions"]')!.textContent!.trim()).toBe("Bonjour");
  });

  it("chooses a track in the menu and fires minerva-track-change", async () => {
    const user = userEvent.setup();
    const el = await setup(`src="/clip.mp4"`);
    el.tracks = tracks;
    await el.updateComplete;
    const changes: unknown[] = [];
    el.addEventListener("minerva-track-change", (event) =>
      changes.push((event as CustomEvent).detail),
    );
    const cc = button(el, "Captions") as HTMLButtonElement;
    expect(cc.getAttribute("aria-haspopup")).toBe("menu");
    await user.click(cc);
    await el.updateComplete;
    expect(cc.getAttribute("aria-expanded")).toBe("true");
    const items = Array.from(
      el.shadowRoot!.querySelectorAll<HTMLElement>('[role="menuitemradio"]'),
    );
    expect(items.map((item) => item.textContent!.trim())).toEqual([
      "Off",
      "English",
      "Français",
    ]);
    expect(el.shadowRoot!.activeElement).toBe(items[2]);
    await user.keyboard("{ArrowUp}{Enter}");
    await el.updateComplete;
    expect(changes).toEqual([{ index: 0, track: tracks[0] }]);
    expect(el.shadowRoot!.querySelector('[role="menu"]')).toBeNull();
    expect(localStorage.getItem("minerva-media-player-captions")).toBe("en");
    expect(textTrackOf(trackEls(el)[0]!).mode).toBe("hidden");
    expect(textTrackOf(trackEls(el)[1]!).mode).toBe("disabled");

    await user.keyboard("c");
    expect(changes.at(-1)).toEqual({ index: -1, track: null });
  });

  it("reads <track> children and shows audio cues below the title", async () => {
    const srt = "1\n00:00:01,000 --> 00:00:03,000\nHello\n";
    const el = await setup(
      `src="/song.mp3"`,
      `<span slot="heading">Talk</span><track src="data:application/x-subrip,${encodeURIComponent(srt)}" srclang="en" label="English" default>`,
    );
    await load(el, 10);
    await new Promise((resolve) => setTimeout(resolve, 0));
    await tick(el, 2);
    expect(trackEls(el)).toHaveLength(1);
    expect($(el, '[part="captions"]')!.textContent!.trim()).toBe("Hello");
    expect(button(el, "Captions")).toBeTruthy();
  });
});
