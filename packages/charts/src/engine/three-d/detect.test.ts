import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setDefaultChartRenderer } from "../defaults";
import type { ChartRendererKind } from "../types";
import { createRenderer3D } from "./detect";

// Fake 3D backends: `available` says which ones start (a software GPU is
// refused when hardware is required).
const { available, tried } = vi.hoisted(() => ({
  available: {} as Record<
    ChartRendererKind,
    "hardware" | "software" | "missing"
  >,
  tried: [] as { kind: ChartRendererKind; requireHardware: boolean }[],
}));

const { start3D } = vi.hoisted(() => ({
  start3D: (kind: ChartRendererKind, requireHardware: boolean) => {
    tried.push({ kind, requireHardware });
    const state = available[kind];
    return state === "missing" || (state === "software" && requireHardware)
      ? null
      : { kind };
  },
}));

vi.mock("./webgpu", () => ({
  createWebGpu3D: async (_: unknown, __: unknown, requireHardware = false) =>
    start3D("webgpu", requireHardware),
}));
vi.mock("./webgl", () => ({
  createWebGl3D: async (
    _: unknown,
    version: 1 | 2,
    __: unknown,
    requireHardware = false,
  ) => start3D(version === 2 ? "webgl2" : "webgl", requireHardware),
}));
vi.mock("./canvas2d", () => ({
  createCanvas2d3D: () => start3D("canvas2d", false),
}));

const start = () =>
  createRenderer3D(
    "auto",
    () => document.createElement("canvas"),
    () => {},
  );

beforeEach(() => {
  tried.length = 0;
  Object.assign(available, {
    webgpu: "missing",
    webgl2: "software",
    webgl: "hardware",
    canvas2d: "hardware",
  });
});

afterEach(() => setDefaultChartRenderer("auto"));

describe("createRenderer3D and the default renderer", () => {
  it("auto skips missing and software backends", async () => {
    expect((await start())?.kind).toBe("webgl");
    expect(tried.map((t) => t.requireHardware)).toEqual([true, true, true]);
  });

  it("auto starts from the default backend, forced", async () => {
    setDefaultChartRenderer("webgl2");
    expect((await start())?.kind).toBe("webgl2");
    expect(tried).toEqual([{ kind: "webgl2", requireHardware: false }]);
  });

  it("falls back from an unavailable default", async () => {
    setDefaultChartRenderer("webgpu");
    expect((await start())?.kind).toBe("webgl");
    expect(tried).toEqual([
      { kind: "webgpu", requireHardware: false },
      { kind: "webgl2", requireHardware: true },
      { kind: "webgl", requireHardware: true },
    ]);
  });

  it("uses Canvas2D when it is the default", async () => {
    setDefaultChartRenderer("canvas2d");
    expect((await start())?.kind).toBe("canvas2d");
    expect(tried.map((t) => t.kind)).toEqual(["canvas2d"]);
  });
});
