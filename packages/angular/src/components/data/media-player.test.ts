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
