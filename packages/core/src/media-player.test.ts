import { describe, expect, it } from "vitest";
import {
  bufferedEnd,
  clampMediaTime,
  clampVolume,
  formatMediaTime,
  formatPlaybackRate,
  inferMediaType,
  mediaKeyAction,
  mediaProgress,
  nextPlaybackRate,
} from "./media-player";

describe("media player helpers", () => {
  it("formats times as m:ss or h:mm:ss", () => {
    expect(formatMediaTime(0)).toBe("0:00");
    expect(formatMediaTime(83.9)).toBe("1:23");
    expect(formatMediaTime(3725)).toBe("1:02:05");
    expect(formatMediaTime(65, 4000)).toBe("0:01:05");
    expect(formatMediaTime(Number.NaN)).toBe("0:00");
    expect(formatMediaTime(Infinity)).toBe("0:00");
    expect(formatMediaTime(-3)).toBe("0:00");
  });

  it("infers the media type", () => {
    expect(inferMediaType("a.mp3")).toBe("audio");
    expect(inferMediaType("https://x/a.M4A?x=1#t")).toBe("audio");
    expect(inferMediaType("a.mp4")).toBe("video");
    expect(inferMediaType("stream", "audio/mpeg")).toBe("audio");
    expect(inferMediaType("a.mp3", "video/mp4")).toBe("video");
    expect(inferMediaType("a.mp4", null, "audio")).toBe("audio");
    expect(inferMediaType(undefined)).toBe("video");
  });

  it("clamps times, volumes and progress", () => {
    expect(clampMediaTime(-1, 10)).toBe(0);
    expect(clampMediaTime(12, 10)).toBe(10);
    expect(clampMediaTime(12)).toBe(12);
    expect(clampVolume(1.4)).toBe(1);
    expect(clampVolume(-1)).toBe(0);
    expect(clampVolume(0.333)).toBe(0.33);
    expect(mediaProgress(5, 10)).toBe(0.5);
    expect(mediaProgress(5, 0)).toBe(0);
  });

  it("cycles playback rates", () => {
    expect(nextPlaybackRate(1)).toBe(1.25);
    expect(nextPlaybackRate(2)).toBe(0.5);
    expect(nextPlaybackRate(3, [1, 2])).toBe(1);
    expect(nextPlaybackRate(1, [])).toBe(1);
    expect(formatPlaybackRate(1.25)).toBe("1.25×");
    expect(formatPlaybackRate(1)).toBe("1×");
  });

  it("finds the buffered end around the current time", () => {
    const ranges = (list: [number, number][]) => ({
      length: list.length,
      start: (i: number) => list[i]![0],
      end: (i: number) => list[i]![1],
    });
    expect(bufferedEnd(null, 3)).toBe(0);
    expect(bufferedEnd(ranges([[0, 8]]), 3)).toBe(8);
    expect(
      bufferedEnd(
        ranges([
          [0, 2],
          [5, 9],
        ]),
        6,
      ),
    ).toBe(9);
    expect(
      bufferedEnd(
        ranges([
          [0, 2],
          [5, 9],
        ]),
        3,
      ),
    ).toBe(2);
  });

  it("maps keys to actions", () => {
    expect(mediaKeyAction(" ")).toEqual({ type: "toggle" });
    expect(mediaKeyAction("k")).toEqual({ type: "toggle" });
    expect(mediaKeyAction("ArrowLeft")).toEqual({ type: "seek", delta: -5 });
    expect(mediaKeyAction("ArrowUp")).toEqual({ type: "volume", delta: 0.1 });
    expect(mediaKeyAction("m")).toEqual({ type: "mute" });
    expect(mediaKeyAction("F")).toEqual({ type: "fullscreen" });
    expect(mediaKeyAction("x")).toBeNull();
    expect(mediaKeyAction("k", { ctrlKey: true })).toBeNull();
  });
});
