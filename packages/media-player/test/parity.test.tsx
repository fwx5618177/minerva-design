// @vitest-environment happy-dom
import React, { createRef } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  cleanup,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { MediaPlayer, type MediaPlayerHandle } from "../src";
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
it("supports bare media, external muted/loop updates, explicit layout and element handle", () => {
  const ref = createRef<MediaPlayerHandle>();
  const { container, rerender } = render(
    <MediaPlayer
      ref={ref}
      src="blob:v"
      title="Test"
      controls={false}
      muted
      loop
      preload="none"
      height={240}
      aspectRatio="4 / 3"
      style={{ borderRadius: 3 }}
      aria-label="Preview"
    />,
  );
  const video = container.querySelector("video")!;
  expect(screen.queryByRole("button")).toBeNull();
  expect(video.preload).toBe("none");
  expect(video.muted).toBe(true);
  expect(video.loop).toBe(true);
  expect(ref.current?.element).toBe(video);
  expect(screen.getByRole("group", { name: "Preview" }).style.height).toBe(
    "240px",
  );
  rerender(
    <MediaPlayer
      ref={ref}
      src="blob:v"
      title="Test"
      controls={false}
      muted={false}
      loop={false}
    />,
  );
  expect(video.muted).toBe(false);
  expect(video.loop).toBe(false);
});
it("forwards actual media events and metadata to current callbacks", () => {
  const onPlay = vi.fn(),
    onPause = vi.fn(),
    onRateChange = vi.fn(),
    onVolumeChange = vi.fn(),
    onLoadedMetadata = vi.fn();
  const { container } = render(
    <MediaPlayer
      src="blob:v"
      title="Test"
      onPlay={onPlay}
      onPause={onPause}
      onRateChange={onRateChange}
      onVolumeChange={onVolumeChange}
      onLoadedMetadata={onLoadedMetadata}
    />,
  );
  const video = container.querySelector("video")!;
  act(() => {
    video.dispatchEvent(new Event("play"));
    video.dispatchEvent(new Event("pause"));
    video.playbackRate = 1.5;
    video.dispatchEvent(new Event("ratechange"));
    video.volume = 0.4;
    video.dispatchEvent(new Event("volumechange"));
    Object.defineProperty(video, "duration", { configurable: true, value: 30 });
    video.dispatchEvent(new Event("loadedmetadata"));
  });
  expect(onPlay).toHaveBeenCalled();
  expect(onPause).toHaveBeenCalled();
  expect(onRateChange).toHaveBeenLastCalledWith(1.5);
  expect(onVolumeChange).toHaveBeenLastCalledWith({
    volume: 0.4,
    muted: false,
  });
  expect(onLoadedMetadata).toHaveBeenCalledWith({ duration: 30 });
});
it("uses configured skip duration on video controls", () => {
  const { container } = render(
    <MediaPlayer src="blob:v" title="Test" skipSeconds={15} />,
  );
  const video = container.querySelector("video")!;
  Object.defineProperty(video, "duration", { configurable: true, value: 100 });
  fireEvent.click(screen.getByRole("button", { name: "前进 15 秒" }));
  expect(video.currentTime).toBe(15);
});
it("provides localized controls with host message overrides", () => {
  render(
    <MediaPlayer
      src="blob:v"
      title="Test"
      locale="en"
      messages={{ play: "Start playback" }}
    />,
  );
  expect(screen.getByRole("button", { name: "Start playback" })).toBeTruthy();
  expect(screen.getByRole("button", { name: "Mute" })).toBeTruthy();
});
it("limits the speed menu to configured rates and supports zero skip buttons", () => {
  render(
    <MediaPlayer
      src="blob:v"
      title="Test"
      playbackRates={[1, 1.25]}
      skipSeconds={0}
    />,
  );
  expect(screen.queryByRole("button", { name: /前进|后退/ })).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "设置" }));
  fireEvent.click(screen.getByRole("menuitem", { name: /播放速度/ }));
  expect(
    screen.getAllByRole("menuitemradio").map((node) => node.textContent),
  ).toEqual(["正常", "1.25x"]);
});
it("returns playback rejections through the imperative API", async () => {
  const ref = createRef<MediaPlayerHandle>();
  render(<MediaPlayer ref={ref} src="blob:v" title="Test" controls={false} />);
  vi.spyOn(ref.current!.video!, "play").mockRejectedValue(new Error("denied"));
  await expect(ref.current!.play()).rejects.toThrow("denied");
});
