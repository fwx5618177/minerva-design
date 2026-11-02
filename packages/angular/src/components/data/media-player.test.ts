import { Component, signal, viewChild } from "@angular/core";
import type { ComponentFixture } from "@angular/core/testing";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, settle } from "../../testing";
import { MnMediaPlayer } from ".";

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

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

const root = () => document.querySelector<HTMLElement>("mn-media-player")!;
const media = () => document.querySelector<HTMLMediaElement>("audio, video")!;
const button = (label: string) =>
  document.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;

let time = 0;
async function load(fixture: ComponentFixture<unknown>, duration = 296) {
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
  fireEvent(element, new Event("loadedmetadata"));
  await settle(fixture);
}

async function fire(fixture: ComponentFixture<unknown>, name: string) {
  fireEvent(media(), new Event(name));
  await settle(fixture);
}

@Component({
  imports: [MnMediaPlayer],
  template: `<mn-media-player
    [src]="src()"
    [title]="title()"
    [startTime]="startTime()"
    [skipSeconds]="skipSeconds()"
    [playbackRates]="rates()"
    (played)="events.push('play')"
    (paused)="events.push('pause')"
    (ended)="events.push('ended')"
    (timeUpdate)="times.push($event)"
    (loadedMetadata)="metadata.push($event)"
    (rateChange)="rateEvents.push($event)"
    (volumeChange)="volumes.push($event)"
    (mediaError)="errors.push($event)"
  />`,
})
class Host {
  readonly player = viewChild.required(MnMediaPlayer);
  readonly src = signal("/song.mp3");
  readonly title = signal<string | undefined>(undefined);
  readonly startTime = signal<number | undefined>(undefined);
  readonly skipSeconds = signal(10);
  readonly rates = signal<readonly number[]>([0.5, 0.75, 1, 1.25, 1.5, 2]);
  events: string[] = [];
  times: unknown[] = [];
  metadata: unknown[] = [];
  rateEvents: unknown[] = [];
  volumes: unknown[] = [];
  errors: unknown[] = [];
}

describe("MnMediaPlayer", () => {
  it("infers the media type and renders the control bar", async () => {
    const fixture = await render(Host);
    fixture.componentInstance.src.set("/clip.mp4");
    fixture.componentInstance.title.set("Flower");
    await settle(fixture);
    expect(media().tagName).toBe("VIDEO");
    expect(root().getAttribute("data-part")).toBe("root");
    expect(root().getAttribute("data-variant")).toBe("video");
    expect(root().getAttribute("data-status")).toBe("paused");
    expect(root().getAttribute("role")).toBe("group");
    expect(root().getAttribute("aria-label")).toBe("Flower");
    expect(root().hasAttribute("title")).toBe(false);
    expect(root().style.aspectRatio).toBe("16 / 9");
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
      document.querySelector('[data-part="title"]')!.textContent!.trim(),
    ).toBe("Flower");
  });

  it("plays, pauses and emits the outputs", async () => {
    const fixture = await render(Host);
    const host = fixture.componentInstance;
    await load(fixture);
    expect(host.metadata).toEqual([{ duration: 296 }]);
    button("Play").click();
    await settle(fixture);
    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(root().getAttribute("data-status")).toBe("playing");
    time = 83;
    await fire(fixture, "timeupdate");
    expect(host.times.at(-1)).toEqual({ currentTime: 83, duration: 296 });
    expect(
      document
        .querySelector('[data-part="seek"]')!
        .getAttribute("aria-valuetext"),
    ).toBe("1:23 of 4:56");
    expect(document.querySelector('[data-part="time"]')!.textContent).toBe(
      "1:23 / 4:56",
    );
    button("Pause").click();
    await settle(fixture);
    expect(pauseSpy).toHaveBeenCalledTimes(1);
    await fire(fixture, "ended");
    expect(root().getAttribute("data-status")).toBe("ended");
    expect(host.events).toEqual(["play", "pause", "ended"]);
  });

  it("applies startTime once and seeks with skip buttons and keys", async () => {
    const fixture = await render(Host);
    fixture.componentInstance.src.set("/clip.mp4");
    fixture.componentInstance.startTime.set(42);
    fixture.componentInstance.skipSeconds.set(15);
    await settle(fixture);
    await load(fixture, 100);
    expect(time).toBe(42);
    button("Forward 15 seconds").click();
    expect(time).toBe(57);
    fireEvent.keyDown(root(), { key: "ArrowLeft" });
    expect(time).toBe(52);
    fireEvent.keyDown(document.querySelector('[data-part="seek"]')!, {
      key: "End",
    });
    expect(time).toBe(100);
  });

  it("keyboard: Space / K toggle, M mutes, arrows change the volume", async () => {
    const fixture = await render(Host);
    await load(fixture);
    fireEvent.keyDown(root(), { key: " " });
    expect(playSpy).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(root(), { key: "k" });
    expect(pauseSpy).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(root(), { key: "m" });
    await settle(fixture);
    expect(media().muted).toBe(true);
    expect(button("Unmute").getAttribute("aria-pressed")).toBe("true");
    fireEvent.keyDown(root(), { key: "m" });
    fireEvent.keyDown(root(), { key: "ArrowDown" });
    expect(media().volume).toBe(0.9);
    await fire(fixture, "volumechange");
    expect(fixture.componentInstance.volumes.at(-1)).toEqual({
      volume: 0.9,
      muted: false,
    });
    fireEvent.keyDown(button("Mute"), { key: " " });
    expect(playSpy).toHaveBeenCalledTimes(1);
  });

  it("cycles the playback rates", async () => {
    const fixture = await render(Host);
    fixture.componentInstance.rates.set([1, 1.5]);
    await settle(fixture);
    button("Playback speed 1×").click();
    await settle(fixture);
    expect(media().playbackRate).toBe(1.5);
    expect(button("Playback speed 1.5×").textContent!.trim()).toBe("1.5×");
    await fire(fixture, "ratechange");
    expect(fixture.componentInstance.rateEvents).toEqual([1.5]);
  });

  it("shows the spinner and the error state", async () => {
    const fixture = await render(Host);
    await fire(fixture, "waiting");
    expect(
      document.querySelector('[role="status"]')!.getAttribute("aria-label"),
    ).toBe("Loading");
    expect(root().getAttribute("data-loading")).toBe("");
    await fire(fixture, "error");
    expect(fixture.componentInstance.errors).toHaveLength(1);
    expect(document.querySelector('[role="alert"]')!.textContent).toContain(
      "This media can't be played",
    );
    expect(root().getAttribute("data-invalid")).toBe("");
    expect(button("Play").disabled).toBe(true);
  });

  it("exposes play / pause / seek / element", async () => {
    const fixture = await render(Host);
    await load(fixture, 100);
    const player = fixture.componentInstance.player();
    expect(player.element).toBe(media());
    await player.play();
    expect(playSpy).toHaveBeenCalled();
    player.pause();
    expect(pauseSpy).toHaveBeenCalled();
    player.seek(500);
    expect(time).toBe(100);
  });

  it("renders the bare media element without controls; applies muted", async () => {
    @Component({
      imports: [MnMediaPlayer],
      template: `<mn-media-player
        src="/clip.mp4"
        [controls]="false"
        [muted]="muted()"
      />`,
    })
    class Bare {
      readonly muted = signal(true);
    }
    const fixture = await render(Bare);
    expect(media().muted).toBe(true);
    expect(document.querySelector("button")).toBeNull();
    expect(root().getAttribute("role")).toBeNull();
    fixture.componentInstance.muted.set(false);
    await settle(fixture);
    expect(media().muted).toBe(false);
  });
});

describe("MnMediaPlayer captions", () => {
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

  @Component({
    imports: [MnMediaPlayer],
    template: `<mn-media-player
      [src]="src()"
      title="Talk"
      [tracks]="tracks()"
      (trackChange)="changes.push($event)"
    />`,
  })
  class Host {
    readonly src = signal("/clip.mp4");
    readonly tracks =
      signal<
        { src: string; srclang?: string; label: string; default?: boolean }[]
      >(tracks);
    readonly changes: unknown[] = [];
  }

  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(HTMLTrackElement.prototype, "track", "get").mockImplementation(
      function (this: HTMLTrackElement) {
        return textTrackOf(this);
      },
    );
  });

  it("renders <track> children and draws the active cue", async () => {
    const fixture = await render(Host);
    await settle(fixture);
    const els = trackEls();
    expect(els.map((el) => el.getAttribute("srclang"))).toEqual(["en", "fr"]);
    expect(els[0]!.getAttribute("kind")).toBe("subtitles");
    expect(els[1]!.hasAttribute("default")).toBe(false);
    const fr = textTrackOf(els[1]!);
    expect(fr.mode).toBe("hidden");
    Object.defineProperty(fr, "activeCues", {
      configurable: true,
      value: [{ text: "Bonjour" }],
    });
    fr.dispatchEvent(new Event("cuechange"));
    await settle(fixture);
    expect(
      document.querySelector('[data-part="captions"]')!.textContent!.trim(),
    ).toBe("Bonjour");
  });

  it("chooses a track in the captions menu and emits trackChange", async () => {
    const fixture = await render(Host);
    await settle(fixture);
    const cc = button("Captions");
    expect(cc.getAttribute("aria-haspopup")).toBe("menu");
    fireEvent.click(cc);
    await settle(fixture);
    expect(cc.getAttribute("aria-expanded")).toBe("true");
    const items = Array.from(
      document.querySelectorAll<HTMLElement>('[role="menuitemradio"]'),
    );
    expect(items.map((item) => item.textContent!.trim())).toEqual([
      "Off",
      "English",
      "Français",
    ]);
    expect(document.activeElement).toBe(items[2]);
    fireEvent.keyDown(items[2]!, { key: "ArrowUp" });
    expect(document.activeElement).toBe(items[1]);
    fireEvent.click(items[1]!);
    await settle(fixture);
    expect(fixture.componentInstance.changes).toEqual([
      { index: 0, track: tracks[0] },
    ]);
    expect(document.querySelector('[role="menu"]')).toBeNull();
    expect(localStorage.getItem("minerva-media-player-captions")).toBe("en");
    expect(textTrackOf(trackEls()[0]!).mode).toBe("hidden");
    expect(textTrackOf(trackEls()[1]!).mode).toBe("disabled");

    fireEvent.keyDown(root(), { key: "c" });
    await settle(fixture);
    expect(fixture.componentInstance.changes.at(-1)).toEqual({
      index: -1,
      track: null,
    });
  });

  it("shows SRT cues of an audio player under the title", async () => {
    const srt = "1\n00:00:01,000 --> 00:00:03,000\nHello\n";
    const fixture = await render(Host);
    fixture.componentInstance.src.set("/talk.mp3");
    fixture.componentInstance.tracks.set([
      {
        src: `data:application/x-subrip,${encodeURIComponent(srt)}`,
        label: "English",
        default: true,
      },
    ]);
    await settle(fixture);
    await load(fixture, 10);
    await new Promise((resolve) => setTimeout(resolve, 0));
    time = 2;
    fireEvent(media(), new Event("timeupdate"));
    await settle(fixture);
    expect(
      document.querySelector('[data-part="captions"]')!.textContent!.trim(),
    ).toBe("Hello");
  });
});
