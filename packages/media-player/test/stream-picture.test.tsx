// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { MediaPlayer } from "../src";
import type { MediaEngineFactory } from "../src/engines/types";
const engine: MediaEngineFactory = {
  kind: "test",
  handles: () => true,
  attach: () => ({
    kind: "test",
    levels: () => [],
    currentLevel: () => "auto",
    setLevel: () => undefined,
    destroy: () => undefined,
  }),
};
afterEach(cleanup);
it("waits for streaming video dimensions instead of hiding a not-yet-decoded picture", () => {
  const { container } = render(
    <MediaPlayer
      src={{ src: "stream.m3u8", type: "hls" }}
      title="Stream"
      engines={[engine]}
    />,
  );
  const video = container.querySelector("video")!;
  Object.defineProperty(video, "duration", { configurable: true, value: 8 });
  fireEvent.loadedMetadata(video);
  expect(
    container.querySelector("[data-media]")?.getAttribute("data-media"),
  ).toBe("video");
  Object.defineProperty(video, "videoWidth", {
    configurable: true,
    value: 256,
  });
  Object.defineProperty(video, "videoHeight", {
    configurable: true,
    value: 144,
  });
  fireEvent(video, new Event("resize"));
  expect(
    container.querySelector("[data-aspect]")?.getAttribute("data-aspect"),
  ).toBe("1.7778");
});
it("still recognizes a pure audio stream once loaded data confirms no picture", () => {
  const { container } = render(
    <MediaPlayer
      src={{ src: "stream.mpd", type: "dash" }}
      title="Stream"
      engines={[engine]}
    />,
  );
  const video = container.querySelector("video")!;
  fireEvent.loadedMetadata(video);
  fireEvent.loadedData(video);
  expect(
    container.querySelector("[data-media]")?.getAttribute("data-media"),
  ).toBe("audio");
});
