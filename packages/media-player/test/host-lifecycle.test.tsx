// @vitest-environment happy-dom
import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { MediaPlayer, type PlayerChromeState } from "../src";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  localStorage.clear();
});
const chrome = (state: PlayerChromeState) => (
  <output data-testid="caption">{state.captionText}</output>
);

it("reattaches the same source and existing sound/rate when the native host changes", () => {
  const view = render(
    <MediaPlayer
      src="blob:movie.mp4"
      title="Host"
      kind="audio"
      mediaElement="audio"
      renderChrome={chrome}
    />,
  );
  const audio = view.container.querySelector("audio")!;
  act(() => {
    audio.volume = 0.35;
    audio.playbackRate = 1.5;
    fireEvent.volumeChange(audio);
    fireEvent.rateChange(audio);
  });
  view.rerender(
    <MediaPlayer
      src="blob:movie.mp4"
      title="Host"
      kind="video"
      mediaElement="video"
      renderChrome={chrome}
    />,
  );
  const video = view.container.querySelector("video")!;
  expect(audio.getAttribute("src")).toBeNull();
  expect(video.getAttribute("src")).toBe("blob:movie.mp4");
  expect(video.volume).toBe(0.35);
  expect(video.playbackRate).toBe(1.5);
  view.rerender(
    <MediaPlayer
      src="blob:movie.mp4"
      title="Host"
      kind="audio"
      mediaElement="audio"
      renderChrome={chrome}
    />,
  );
  const replacement = view.container.querySelector("audio")!;
  expect(replacement.getAttribute("src")).toBe("blob:movie.mp4");
  expect(replacement.volume).toBe(0.35);
  expect(replacement.playbackRate).toBe(1.5);
});

it("moves native caption listeners to the replacement media host", () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockRejectedValue(new Error("native captions only")),
  );
  const nativeTracks = new WeakMap<HTMLTrackElement, TextTrack>();
  vi.spyOn(HTMLTrackElement.prototype, "track", "get").mockImplementation(
    function (this: HTMLTrackElement) {
      let value = nativeTracks.get(this);
      if (!value) {
        value = Object.assign(new EventTarget(), {
          mode: "disabled",
          activeCues: null,
        }) as unknown as TextTrack;
        nativeTracks.set(this, value);
      }
      return value;
    },
  );
  const tracks = [
    { src: "data:text/vtt,WEBVTT", label: "English", default: true },
  ];
  const view = render(
    <MediaPlayer
      src="blob:movie.mp4"
      title="Host"
      kind="audio"
      mediaElement="audio"
      tracks={tracks}
      renderChrome={chrome}
    />,
  );
  const old = view.container.querySelector("track")!.track;
  const emit = (track: TextTrack, text: string) => {
    Object.defineProperty(track, "activeCues", {
      configurable: true,
      value: [{ text }],
    });
    act(() => track.dispatchEvent(new Event("cuechange")));
  };
  emit(old, "Original");
  expect(screen.getByTestId("caption").textContent).toBe("Original");
  view.rerender(
    <MediaPlayer
      src="blob:movie.mp4"
      title="Host"
      kind="video"
      mediaElement="video"
      tracks={tracks}
      renderChrome={chrome}
    />,
  );
  const current = view.container.querySelector("track")!.track;
  emit(current, "Replacement");
  expect(screen.getByTestId("caption").textContent).toBe("Replacement");
  emit(old, "Stale");
  expect(screen.getByTestId("caption").textContent).toBe("Replacement");
});

it("keeps bare Minerva native captions showing without a custom overlay after loading", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      text: async () => "WEBVTT\n\n00:00.000 --> 00:10.000\nCaption",
    }),
  );
  const view = render(
    <MediaPlayer
      src="blob:movie.mp4"
      title="Host"
      mediaElement="video"
      controls={false}
      tracks={[
        { src: "data:text/vtt,WEBVTT", label: "English", default: true },
      ]}
    />,
  );
  const video = view.container.querySelector("video")!;
  const track = { mode: "showing" };
  Object.defineProperty(video, "textTracks", {
    configurable: true,
    value: [track],
  });
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
  expect(
    view.container.querySelector('[data-testid="media-caption"]'),
  ).toBeNull();
  expect(track.mode).toBe("showing");
});

it("restores the playhead when a playing source moves to a different native host", () => {
  const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  const view = render(
    <MediaPlayer
      src="blob:movie.mp4"
      title="Host"
      kind="audio"
      mediaElement="audio"
      renderChrome={chrome}
    />,
  );
  const audio = view.container.querySelector("audio")!;
  audio.currentTime = 7;
  Object.defineProperty(audio, "paused", { configurable: true, value: false });
  view.rerender(
    <MediaPlayer
      src="blob:movie.mp4"
      title="Host"
      kind="video"
      mediaElement="video"
      renderChrome={chrome}
    />,
  );
  const video = view.container.querySelector("video")!;
  Object.defineProperty(video, "duration", { configurable: true, value: 10 });
  fireEvent.loadedMetadata(video);
  expect(video.currentTime).toBe(7);
  expect(play).toHaveBeenCalledOnce();
});
