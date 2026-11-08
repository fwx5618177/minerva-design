// @vitest-environment happy-dom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useMediaEngine } from "../src/useMediaEngine";
import {
  PlayerError,
  type MediaEngine,
  type MediaEngineFactory,
} from "../src/engines/types";

afterEach(cleanup);

function factory(kind: string) {
  const engine: MediaEngine = {
    kind,
    levels: () => [],
    currentLevel: () => "auto",
    setLevel: vi.fn(),
    destroy: vi.fn(),
  };
  const attach = vi.fn(() => engine);
  return { factory: { kind, handles: () => true, attach }, engine, attach };
}

describe("media engine hook ownership", () => {
  it("replaces an engine when the registered factories change, without reloading equivalent arrays", () => {
    const first = factory("first");
    const second = factory("second");
    const videoRef = { current: document.createElement("video") };
    const { result, rerender } = renderHook(
      ({ engines }: { engines: readonly MediaEngineFactory[] }) =>
        useMediaEngine({
          videoRef,
          src: "clip.mp4",
          engines,
          onError: vi.fn(),
        }),
      { initialProps: { engines: [first.factory] } },
    );
    expect(result.current.engineKind).toBe("first");
    rerender({ engines: [first.factory] });
    expect(first.attach).toHaveBeenCalledOnce();
    videoRef.current.currentTime = 19;
    Object.defineProperty(videoRef.current, "paused", { value: false });
    rerender({ engines: [second.factory] });
    expect(first.engine.destroy).toHaveBeenCalledOnce();
    expect(second.attach).toHaveBeenCalledOnce();
    expect(result.current.engineKind).toBe("second");
    expect(result.current.takeResume()).toEqual({ time: 19, playing: true });
  });

  it("resumes a replacement host but does not transfer position to a different source", () => {
    const registered = factory("test");
    const videoRef = { current: document.createElement("video") };
    const engines = [registered.factory];
    const { result, rerender } = renderHook(
      ({ src, hostKey }) =>
        useMediaEngine({ videoRef, src, hostKey, engines, onError: vi.fn() }),
      { initialProps: { src: "first.mp4", hostKey: "video" } },
    );
    videoRef.current.currentTime = 24;
    Object.defineProperty(videoRef.current, "paused", { value: false });
    videoRef.current = document.createElement("video");
    rerender({ src: "first.mp4", hostKey: "audio" });
    expect(result.current.takeResume()).toEqual({ time: 24, playing: true });
    expect(result.current.takeResume()).toBeNull();
    videoRef.current.currentTime = 12;
    videoRef.current = document.createElement("video");
    rerender({ src: "second.mp4", hostKey: "video" });
    expect(result.current.takeResume()).toBeNull();
  });

  it("ignores cancelled engine callbacks and destroys a late async result", async () => {
    let finish!: (engine: MediaEngine) => void;
    const old = factory("old");
    let options!: Parameters<MediaEngineFactory["attach"]>[1];
    const delayed: MediaEngineFactory = {
      kind: "delayed",
      handles: () => true,
      attach: (_video, value) => {
        options = value;
        return new Promise((resolve) => {
          finish = resolve;
        });
      },
    };
    const current = factory("current");
    const onError = vi.fn();
    const videoRef = { current: document.createElement("video") };
    const { result, rerender } = renderHook(
      ({ src, engines }) => useMediaEngine({ videoRef, src, engines, onError }),
      { initialProps: { src: "first.mp4", engines: [delayed] } },
    );
    rerender({ src: "second.mp4", engines: [current.factory] });
    expect(options.signal?.aborted).toBe(true);
    await act(async () => {
      options.onLevels?.([
        { id: "stale", label: "stale" },
        { id: "old", label: "old" },
      ]);
      options.onError?.(new PlayerError("network", "cancelled"));
      finish(old.engine);
    });
    expect(old.engine.destroy).toHaveBeenCalledOnce();
    expect(result.current.engineKind).toBe("current");
    expect(result.current.qualityOptions).toEqual([]);
    expect(onError).not.toHaveBeenCalled();
  });
});
