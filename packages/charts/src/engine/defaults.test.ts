import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getDefaultChartRenderer,
  resolveRendererPreference,
  setDefaultChartRenderer,
  subscribeDefaultChartRenderer,
} from "./defaults";
import type { ChartRendererPreference } from "./types";

afterEach(() => setDefaultChartRenderer("auto"));

describe("default chart renderer", () => {
  it("starts on auto and keeps what is set", () => {
    expect(getDefaultChartRenderer()).toBe("auto");
    for (const kind of ["webgpu", "webgl2", "webgl", "canvas2d"] as const) {
      setDefaultChartRenderer(kind);
      expect(getDefaultChartRenderer()).toBe(kind);
    }
    setDefaultChartRenderer("auto");
    expect(getDefaultChartRenderer()).toBe("auto");
  });

  it("turns unknown values into auto", () => {
    setDefaultChartRenderer("webgl");
    setDefaultChartRenderer("opengl" as ChartRendererPreference);
    expect(getDefaultChartRenderer()).toBe("auto");
    setDefaultChartRenderer("canvas2d");
    setDefaultChartRenderer(undefined as unknown as ChartRendererPreference);
    expect(getDefaultChartRenderer()).toBe("auto");
  });

  it("notifies the subscribers of changes only, until they unsubscribe", () => {
    const listener = vi.fn();
    const off = subscribeDefaultChartRenderer(listener);
    setDefaultChartRenderer("webgl2");
    setDefaultChartRenderer("webgl2");
    setDefaultChartRenderer("canvas2d");
    expect(listener.mock.calls).toEqual([["webgl2"], ["canvas2d"]]);
    off();
    setDefaultChartRenderer("webgpu");
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("lets a listener unsubscribe while being notified", () => {
    const second = vi.fn();
    const off = subscribeDefaultChartRenderer(() => off());
    const offSecond = subscribeDefaultChartRenderer(second);
    setDefaultChartRenderer("webgl");
    setDefaultChartRenderer("canvas2d");
    expect(second.mock.calls).toEqual([["webgl"], ["canvas2d"]]);
    offSecond();
  });

  it("keeps notifying when a listener throws, and reports the error", async () => {
    const error = new Error("listener failed");
    const reported = new Promise<unknown>((resolve) => {
      const original = globalThis.queueMicrotask;
      const spy = vi
        .spyOn(globalThis, "queueMicrotask")
        .mockImplementation((callback) => {
          spy.mockRestore();
          original(() => {
            try {
              callback();
            } catch (thrown) {
              resolve(thrown);
            }
          });
        });
    });
    const after = vi.fn();
    const offThrowing = subscribeDefaultChartRenderer(() => {
      throw error;
    });
    const offAfter = subscribeDefaultChartRenderer(after);
    setDefaultChartRenderer("webgl2");
    expect(after).toHaveBeenCalledWith("webgl2");
    await expect(reported).resolves.toBe(error);
    offThrowing();
    offAfter();
  });

  it("is shared by every copy of the engine on the page", async () => {
    setDefaultChartRenderer("webgl");
    vi.resetModules();
    const copy = await import("./defaults");
    expect(copy.getDefaultChartRenderer()).toBe("webgl");
    const listener = vi.fn();
    const off = subscribeDefaultChartRenderer(listener);
    copy.setDefaultChartRenderer("canvas2d");
    expect(getDefaultChartRenderer()).toBe("canvas2d");
    expect(listener).toHaveBeenCalledWith("canvas2d");
    off();
  });

  it("starts from a default seeded before any engine copy loaded", async () => {
    const host = globalThis as unknown as Record<symbol, unknown>;
    const key = Symbol.for("minerva-design.charts.defaults");
    const seed = Symbol.for("minerva-design.charts.defaultRenderer");
    const shared = host[key];
    const fresh = async (value: unknown) => {
      delete host[key];
      host[seed] = value;
      vi.resetModules();
      return (await import("./defaults")).getDefaultChartRenderer();
    };
    try {
      expect(await fresh("canvas2d")).toBe("canvas2d");
      expect(await fresh("webgl")).toBe("webgl");
      expect(await fresh("vulkan")).toBe("auto");
      expect(await fresh(undefined)).toBe("auto");
      // read once: an existing state ignores later seeds
      setDefaultChartRenderer("webgl2");
      host[seed] = "canvas2d";
      expect(getDefaultChartRenderer()).toBe("webgl2");
    } finally {
      delete host[seed];
      host[key] = shared;
    }
  });

  it("resolves auto (or no preference) through the default", () => {
    expect(resolveRendererPreference(undefined)).toBe("auto");
    expect(resolveRendererPreference("auto")).toBe("auto");
    setDefaultChartRenderer("webgl2");
    expect(resolveRendererPreference(undefined)).toBe("webgl2");
    expect(resolveRendererPreference("auto")).toBe("webgl2");
    // a chart's own backend wins over the default
    expect(resolveRendererPreference("canvas2d")).toBe("canvas2d");
    expect(resolveRendererPreference("webgpu")).toBe("webgpu");
  });
});
