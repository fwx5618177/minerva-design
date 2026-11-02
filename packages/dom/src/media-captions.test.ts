import { afterEach, describe, expect, it, vi } from "vitest";
import type { MediaTrack } from "@minerva/core";
import { bindMediaCaptions, textTrackCueText } from "./media-captions";

const VTT = "WEBVTT\n\n00:01.000 --> 00:03.000\n<b>Hello</b>\n";
const SRT = "1\n00:00:01,000 --> 00:00:03,000\nBonjour\n";

const tracks: MediaTrack[] = [
  { src: "/en.vtt", srclang: "en", label: "English" },
  { src: "/fr.srt", srclang: "fr", label: "Français" },
];

// happy-dom builds a new TextTrack on each `track` read and refuses the
// "hidden" mode: stub a stable one.
const fakeTrack = (el: HTMLTrackElement) => {
  const track = Object.assign(new EventTarget(), {
    mode: "disabled",
    activeCues: null as unknown,
  });
  Object.defineProperty(el, "track", { configurable: true, value: track });
  return track as unknown as TextTrack;
};

function setup() {
  const video = document.createElement("video");
  for (const t of tracks) {
    const el = document.createElement("track");
    el.src = t.src;
    el.label = t.label;
    fakeTrack(el);
    video.append(el);
  }
  document.body.append(video);
  const els = Array.from(video.querySelectorAll("track"));
  return { video, els };
}

const setTime = (media: HTMLMediaElement, time: number) => {
  Object.defineProperty(media, "currentTime", {
    configurable: true,
    get: () => time,
  });
  media.dispatchEvent(new Event("timeupdate"));
};

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

afterEach(() => {
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

describe("bindMediaCaptions", () => {
  it("hides the selected TextTrack and emits its active cues", () => {
    const { video, els } = setup();
    const onText = vi.fn();
    const stop = bindMediaCaptions(video, tracks, 0, onText);
    const track = els[0]!.track;
    expect(track.mode).toBe("hidden");
    expect(els[1]!.track.mode).toBe("disabled");

    Object.defineProperty(track, "activeCues", {
      configurable: true,
      value: [{ text: "<v A>Hello</v>" }, { text: "World" }],
    });
    track.dispatchEvent(new Event("cuechange"));
    expect(onText).toHaveBeenLastCalledWith("Hello\nWorld");

    video.dispatchEvent(new Event("enterpictureinpicture"));
    expect(track.mode).toBe("showing");
    video.dispatchEvent(new Event("leavepictureinpicture"));
    expect(track.mode).toBe("hidden");

    stop();
    expect(track.mode).toBe("disabled");
    track.dispatchEvent(new Event("cuechange"));
    expect(onText).toHaveBeenCalledTimes(2);
  });

  it("emits an empty text when off", () => {
    const { video } = setup();
    const onText = vi.fn();
    bindMediaCaptions(video, tracks, -1, onText);
    expect(onText).toHaveBeenCalledWith("");
  });

  it("fetches and parses SRT files, synchronized with the time", async () => {
    const { video } = setup();
    const fetchText = vi.fn(async () => SRT);
    const onText = vi.fn();
    bindMediaCaptions(video, tracks, 1, onText, { fetchText });
    await flush();
    expect(fetchText).toHaveBeenCalledWith("/fr.srt");
    setTime(video, 2);
    expect(onText).toHaveBeenLastCalledWith("Bonjour");
    setTime(video, 5);
    expect(onText).toHaveBeenLastCalledWith("");
  });

  it("falls back to fetch when the <track> fails to load", async () => {
    const { video, els } = setup();
    const fetchMock = vi.fn(async () => new Response(VTT));
    vi.stubGlobal("fetch", fetchMock);
    const onText = vi.fn();
    bindMediaCaptions(video, tracks, 0, onText, {
      crossOrigin: "use-credentials",
    });
    els[0]!.dispatchEvent(new Event("error"));
    await flush();
    expect(fetchMock).toHaveBeenCalledWith("/en.vtt", {
      credentials: "include",
    });
    setTime(video, 1.5);
    expect(onText).toHaveBeenLastCalledWith("Hello");
  });

  it("decodes data: URL tracks without fetching", async () => {
    const video = document.createElement("audio");
    const fetchText = vi.fn(async () => "");
    const onText = vi.fn();
    bindMediaCaptions(
      video,
      [{ src: `data:text/vtt,${encodeURIComponent(VTT)}`, label: "A" }],
      0,
      onText,
      { fetchText },
    );
    await flush();
    setTime(video, 1);
    expect(onText).toHaveBeenLastCalledWith("Hello");
    expect(fetchText).not.toHaveBeenCalled();
  });

  it("reads no text without active cues", () => {
    expect(textTrackCueText(null)).toBe("");
  });
});
