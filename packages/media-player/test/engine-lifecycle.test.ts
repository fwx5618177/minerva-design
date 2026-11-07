// @vitest-environment happy-dom
import { describe, expect, it, vi } from "vitest";
import { attachHls, createHlsEngine } from "../src/engines/hls";
import { attachDash, createDashEngine } from "../src/engines/dash";
import { attachMpegts, createFlvEngine } from "../src/engines/flv";

describe("stream engine resource ownership", () => {
  it("releases HLS when initialization throws and ignores invalid quality IDs", () => {
    const destroy = vi.fn();
    class Hls {
      static isSupported = () => true;
      static Events = { MANIFEST_PARSED: "manifest", ERROR: "error" };
      static ErrorTypes = { NETWORK_ERROR: "network", MEDIA_ERROR: "media" };
      levels = [{ height: 720 }];
      currentLevel = -1;
      autoLevelEnabled = false;
      on = vi.fn();
      startLoad = vi.fn();
      recoverMediaError = vi.fn();
      destroy = destroy;
      loadSource = (): void => {
        throw new Error("source");
      };
      attachMedia = vi.fn();
    }
    expect(() =>
      attachHls(Hls, document.createElement("video"), "x", {}),
    ).toThrow("source");
    expect(destroy).toHaveBeenCalledOnce();
    const engine = attachHls(
      class extends Hls {
        loadSource = vi.fn();
      },
      document.createElement("video"),
      "x",
      {},
    );
    engine.setLevel("0");
    expect(engine.currentLevel()).toBe("0");
    engine.setLevel("99");
    expect(engine.currentLevel()).toBe("0");
    engine.destroy();
    engine.destroy();
    expect(destroy).toHaveBeenCalledTimes(2);
  });
  it("releases DASH and FLV when their host initialization fails", () => {
    const reset = vi.fn();
    const dash = {
      MediaPlayer: Object.assign(
        () => ({
          create: () => ({
            on: vi.fn(),
            updateSettings: vi.fn(),
            initialize: () => {
              throw Error("dash");
            },
            reset,
          }),
        }),
        { events: {} },
      ),
    };
    expect(() =>
      attachDash(dash, document.createElement("video"), "x", {}),
    ).toThrow("dash");
    expect(reset).toHaveBeenCalledOnce();
    const player = {
      on: vi.fn(),
      attachMediaElement: () => {
        throw Error("flv");
      },
      load: vi.fn(),
      unload: vi.fn(),
      detachMediaElement: vi.fn(),
      destroy: vi.fn(),
    };
    const flv = {
      isSupported: () => true,
      createPlayer: () => player,
      Events: { ERROR: "error" },
    };
    expect(() =>
      attachMpegts(flv, document.createElement("video"), {
        type: "flv",
        url: "x",
      }),
    ).toThrow("flv");
    expect(player.destroy).toHaveBeenCalledOnce();
    expect(player.detachMediaElement).toHaveBeenCalledOnce();
  });
  it.each(["hls", "dash", "flv"] as const)(
    "does not attach a late %s import after source cancellation",
    async (kind) => {
      let resolve!: (mod: unknown) => void;
      const load = () =>
        new Promise<unknown>((r) => {
          resolve = r;
        });
      const create =
        kind === "hls"
          ? createHlsEngine
          : kind === "dash"
            ? createDashEngine
            : createFlvEngine;
      const engine = create({ load });
      const controller = new AbortController();
      const video = document.createElement("video");
      video.canPlayType = () => "";
      const attaching = engine.attach(video, {
        source: { src: "x" },
        url: "x",
        type: kind,
        signal: controller.signal,
      });
      controller.abort();
      resolve({});
      await expect(attaching).rejects.toMatchObject({ name: "AbortError" });
      expect(video.getAttribute("src")).toBeNull();
    },
  );
});
