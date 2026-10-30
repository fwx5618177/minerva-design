import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setDefaultChartRenderer } from "../defaults";
import type { ChartRendererKind } from "../types";
import { createRenderer } from "./detect";

// The backends are replaced by fakes: `available` says which ones start
// (and whether only on a software GPU, refused when hardware is required).
type Availability = "hardware" | "software" | "missing" | "throws";

const { available, tried, fake } = vi.hoisted(() => {
  const available: Record<ChartRendererKind, Availability> = {
    webgpu: "hardware",
    webgl2: "hardware",
    webgl: "hardware",
    canvas2d: "hardware",
  };
  const tried: { kind: ChartRendererKind; requireHardware: boolean }[] = [];
  const fake =
    (kind: ChartRendererKind) =>
    async (
      _canvas: HTMLCanvasElement,
      _onLost: unknown,
      requireHardware = false,
    ) => {
      tried.push({ kind, requireHardware });
      const state = available[kind];
      if (state === "throws") throw new Error(`${kind} failed`);
      if (state === "missing" || (state === "software" && requireHardware))
        return null;
      return { kind, destroy: () => {} };
    };
  return { available, tried, fake };
});

vi.mock("./webgpu", () => ({ createWebGpuRenderer: fake("webgpu") }));
vi.mock("./webgl2", () => ({ createWebGl2Renderer: fake("webgl2") }));
vi.mock("./webgl", () => ({ createWebGlRenderer: fake("webgl") }));
vi.mock("./canvas2d", () => ({
  createCanvas2dRenderer: (canvas: HTMLCanvasElement) =>
    fake("canvas2d")(canvas, null, false),
}));

const start = (preference: Parameters<typeof createRenderer>[0]) =>
  createRenderer(
    preference,
    () => document.createElement("canvas"),
    () => {},
  );

beforeEach(() => {
  tried.length = 0;
  Object.assign(available, {
    webgpu: "hardware",
    webgl2: "hardware",
    webgl: "hardware",
    canvas2d: "hardware",
  });
});

afterEach(() => setDefaultChartRenderer("auto"));

describe("createRenderer and the default renderer", () => {
  it("auto picks the best backend, on hardware only", async () => {
    available.webgpu = "missing";
    available.webgl2 = "software";
    const renderer = await start("auto");
    expect(renderer?.kind).toBe("webgl");
    expect(tried).toEqual([
      { kind: "webgpu", requireHardware: true },
      { kind: "webgl2", requireHardware: true },
      { kind: "webgl", requireHardware: true },
    ]);
  });

  it("auto starts from the default backend, forced (software allowed)", async () => {
    available.webgl2 = "software";
    setDefaultChartRenderer("webgl2");
    const renderer = await start("auto");
    expect(renderer?.kind).toBe("webgl2");
    expect(tried).toEqual([{ kind: "webgl2", requireHardware: false }]);
  });

  it("falls back from an unavailable default to hardware backends, then Canvas2D", async () => {
    available.webgpu = "missing";
    available.webgl2 = "software";
    available.webgl = "software";
    setDefaultChartRenderer("webgpu");
    const renderer = await start("auto");
    expect(renderer?.kind).toBe("canvas2d");
    expect(tried).toEqual([
      { kind: "webgpu", requireHardware: false },
      { kind: "webgl2", requireHardware: true },
      { kind: "webgl", requireHardware: true },
      { kind: "canvas2d", requireHardware: false },
    ]);
  });

  it("goes on when a backend throws", async () => {
    available.webgl = "throws";
    setDefaultChartRenderer("webgl");
    expect((await start("auto"))?.kind).toBe("canvas2d");
  });

  it("Canvas2D as the default skips the GPU backends", async () => {
    setDefaultChartRenderer("canvas2d");
    expect((await start("auto"))?.kind).toBe("canvas2d");
    expect(tried.map((t) => t.kind)).toEqual(["canvas2d"]);
  });

  it("a chart's own backend wins over the default", async () => {
    setDefaultChartRenderer("canvas2d");
    expect((await start("webgl2"))?.kind).toBe("webgl2");
    expect(tried).toEqual([{ kind: "webgl2", requireHardware: false }]);
  });

  it("returns null when nothing starts", async () => {
    available.canvas2d = "missing";
    available.webgpu = "missing";
    available.webgl2 = "missing";
    available.webgl = "missing";
    expect(await start("auto")).toBeNull();
  });

  it("skips the excluded backends (lost contexts)", async () => {
    setDefaultChartRenderer("webgl2");
    const renderer = await createRenderer(
      "auto",
      () => document.createElement("canvas"),
      () => {},
      new Set<ChartRendererKind>(["webgl2"]),
    );
    expect(renderer?.kind).toBe("webgl");
    expect(tried).toEqual([{ kind: "webgl", requireHardware: true }]);
  });
});
