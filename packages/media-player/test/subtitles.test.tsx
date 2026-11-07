// @vitest-environment happy-dom
import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { MediaPlayer } from "../src";
import { parseSubtitles, captionAt } from "../src/subtitles";
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  localStorage.clear();
});
it("parses SRT/VTT timestamps, multiline text and treats markup as text", () => {
  const cues = parseSubtitles(
    "1\r\n00:00:01,000 --> 00:00:03,500\r\nHello\r\n<script>alert(1)</script>\r\n\r\n2\r\n00:00:04,000 --> 00:00:05,000\r\nBye",
  );
  expect(cues).toHaveLength(2);
  expect(captionAt(cues, 1)).toContain("Hello\n");
  expect(captionAt(cues, 3.5)).toBe("");
  expect(
    parseSubtitles("WEBVTT\n\n00:01.000 --> 00:02.000 align:start\nHi"),
  ).toEqual([{ start: 1, end: 2, text: "Hi" }]);
});
it("renders SRT captions for audio and restores explicit language choice", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      text: async () => "1\n00:00:01,000 --> 00:00:03,000\nHello <b>world</b>",
    }),
  );
  const change = vi.fn();
  const tracks = [
    {
      src: "data:application/x-subrip,1%0A00%3A00%3A01%2C000%20--%3E%2000%3A00%3A03%2C000%0AHello",
      label: "English",
      srclang: "en",
      default: true,
    },
  ];
  const view = render(
    <MediaPlayer
      src="blob:a"
      title="Audio"
      kind="audio"
      tracks={tracks}
      onTrackChange={change}
    />,
  );
  const video = view.container.querySelector("video")!;
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  video.currentTime = 1.5;
  fireEvent.timeUpdate(video);
  await waitFor(() =>
    expect(screen.getByTestId("media-caption").textContent).toBe("Hello world"),
  );
  expect(view.container.querySelector("b")).toBeNull();
  fireEvent.keyDown(screen.getByRole("group"), { key: "c" });
  expect(change).toHaveBeenLastCalledWith({ index: -1, track: null });
  view.unmount();
  render(
    <MediaPlayer src="blob:b" title="Next" kind="audio" tracks={tracks} />,
  );
  expect(screen.queryByTestId("media-caption")).toBeNull();
});
it("aborts stale subtitle requests and never displays a previous track response", async () => {
  let finish: ((value: unknown) => void) | undefined;
  const signals: AbortSignal[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn((url, options) => {
      signals.push(options.signal);
      if (String(url).includes("old"))
        return new Promise((resolve) => {
          finish = resolve;
        });
      return Promise.resolve({
        ok: true,
        text: async () => "WEBVTT\n\n00:00.000 --> 00:10.000\nCurrent",
      });
    }),
  );
  const view = render(
    <MediaPlayer
      src="blob:v"
      title="Test"
      tracks={[
        { src: "data:text/vtt,WEBVTT%0A%0Aold", label: "Old", default: true },
      ]}
    />,
  );
  view.rerender(
    <MediaPlayer
      src="blob:v"
      title="Test"
      tracks={[
        { src: "data:text/vtt,WEBVTT%0A%0Anew", label: "New", default: true },
      ]}
    />,
  );
  await waitFor(() =>
    expect(screen.getByTestId("media-caption").textContent).toBe("Current"),
  );
  expect(signals[0].aborted).toBe(true);
  finish?.({
    ok: true,
    text: async () => "WEBVTT\n\n00:00.000 --> 00:10.000\nStale",
  });
  await waitFor(() =>
    expect(screen.getByTestId("media-caption").textContent).toBe("Current"),
  );
  view.unmount();
  expect(signals.at(-1)?.aborted).toBe(true);
});
it("handles invalid timing, metadata blocks, overlapping cues and size limits", () => {
  expect(
    parseSubtitles(
      "NOTE hello\nignored\n\n00:61.000 --> 02:00.000\nBad\n\n00:03.000 --> 00:02.000\nBackwards",
    ),
  ).toEqual([]);
  expect(
    captionAt(
      parseSubtitles(
        "00:00.000 --> 00:02.000\nA\n\n00:01.000 --> 00:03.000\nB",
      ),
      1,
    ),
  ).toBe("A\nB");
  expect(() => parseSubtitles("x".repeat(2_000_001))).toThrow("too large");
});
it("keeps native captions hidden after metadata reload to prevent duplicate rendering", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      text: async () => "WEBVTT\n\n00:00.000 --> 00:10.000\nCaption",
    }),
  );
  const { container } = render(
    <MediaPlayer
      src="blob:v"
      title="Test"
      tracks={[
        { src: "data:text/vtt,WEBVTT", label: "English", default: true },
      ]}
    />,
  );
  const video = container.querySelector("video")!;
  const native = { mode: "showing" };
  Object.defineProperty(video, "textTracks", {
    configurable: true,
    value: [native],
  });
  await waitFor(() =>
    expect(screen.getByTestId("media-caption").textContent).toBe("Caption"),
  );
  expect(native.mode).toBe("hidden");
  fireEvent.loadedMetadata(video);
  expect(native.mode).toBe("hidden");
});
it("decodes subtitle formatting and entities into safe plain text", () => {
  const cues = parseSubtitles(
    "WEBVTT\n\n00:00.000 --> 00:02.000\n<v Speaker><b>Hello</b> &amp; &#x4e16;&#30028;",
  );
  expect(captionAt(cues, 1)).toBe("Hello & 世界");
});
it("honors cross-origin credentials and restores native VTT display for PiP/fullscreen", async () => {
  const fetcher = vi.fn().mockResolvedValue({
    ok: true,
    text: async () => "WEBVTT\n\n00:00.000 --> 00:10.000\nCaption",
  });
  vi.stubGlobal("fetch", fetcher);
  const { container } = render(
    <MediaPlayer
      src="blob:v"
      title="Test"
      crossOrigin="use-credentials"
      tracks={[
        { src: "data:text/vtt,WEBVTT", label: "English", default: true },
      ]}
    />,
  );
  const video = container.querySelector("video")!;
  const native = { mode: "showing" };
  Object.defineProperty(video, "textTracks", {
    configurable: true,
    value: [native],
  });
  await waitFor(() =>
    expect(screen.getByTestId("media-caption").textContent).toBe("Caption"),
  );
  expect(fetcher.mock.calls[0][1].credentials).toBe("include");
  fireEvent(video, new Event("enterpictureinpicture"));
  expect(native.mode).toBe("showing");
  fireEvent(video, new Event("leavepictureinpicture"));
  expect(native.mode).toBe("hidden");
  fireEvent(video, new Event("webkitbeginfullscreen"));
  expect(native.mode).toBe("showing");
  fireEvent(video, new Event("webkitendfullscreen"));
  expect(native.mode).toBe("hidden");
});
