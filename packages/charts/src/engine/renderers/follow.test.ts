import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createChart } from "../chart";
import { setDefaultChartRenderer } from "../defaults";
import { createGraphChart } from "../graph/chart";
import { createOrderBookHeatmap } from "../orderbook/heatmap";
import { createChart3D } from "../three-d/chart";
import { createTradingChart } from "../trading/chart";
import type { ChartRendererKind, ChartRendererPreference } from "../types";
import { followDefaultRenderer } from "./follow";

// Fake backends (2D and 3D): every call is accepted, `available` says which
// backends start, `destroyed` counts the renderers torn down per kind.
const { available, destroyed, fakeRenderer } = vi.hoisted(() => {
  const available: Record<string, boolean> = {};
  const destroyed: Record<string, number> = {};
  const fakeRenderer = (kind: string, canvas: HTMLCanvasElement) => {
    if (!available[kind]) return null;
    const target: Record<string | symbol, unknown> = {
      kind,
      canvas,
      destroy: () => {
        destroyed[kind] = (destroyed[kind] ?? 0) + 1;
      },
    };
    return new Proxy(target, {
      // not a thenable: async factories resolve to it
      get: (t, key) => (key in t || key === "then" ? t[key] : () => {}),
    });
  };
  return { available, destroyed, fakeRenderer };
});

vi.mock("./webgpu", () => ({
  createWebGpuRenderer: async (canvas: HTMLCanvasElement) =>
    fakeRenderer("webgpu", canvas),
}));
vi.mock("./webgl2", () => ({
  createWebGl2Renderer: async (canvas: HTMLCanvasElement) =>
    fakeRenderer("webgl2", canvas),
}));
vi.mock("./webgl", () => ({
  createWebGlRenderer: async (canvas: HTMLCanvasElement) =>
    fakeRenderer("webgl", canvas),
}));
vi.mock("./canvas2d", () => ({
  createCanvas2dRenderer: (canvas: HTMLCanvasElement) =>
    fakeRenderer("canvas2d", canvas),
}));
vi.mock("../three-d/webgpu", () => ({
  createWebGpu3D: async (canvas: HTMLCanvasElement) =>
    fakeRenderer("webgpu", canvas),
}));
vi.mock("../three-d/webgl", () => ({
  createWebGl3D: async (canvas: HTMLCanvasElement, version: 1 | 2) =>
    fakeRenderer(version === 2 ? "webgl2" : "webgl", canvas),
}));
vi.mock("../three-d/canvas2d", () => ({
  createCanvas2d3D: (canvas: HTMLCanvasElement) =>
    fakeRenderer("canvas2d", canvas),
}));
// the order book heatmap picks its heat-field backend with the same chain
vi.mock("../orderbook/field", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../orderbook/field")>()),
  createHeatFieldRenderer: (await import("./detect")).createRenderer,
}));

describe("followDefaultRenderer", () => {
  afterEach(() => setDefaultChartRenderer("auto"));

  it("recreates on changes while the preference is unset or auto", () => {
    let own: ChartRendererPreference | undefined;
    const recreate = vi.fn();
    const off = followDefaultRenderer(() => own, recreate);
    setDefaultChartRenderer("webgl");
    own = "auto";
    setDefaultChartRenderer("canvas2d");
    expect(recreate).toHaveBeenCalledTimes(2);
    // read at change time: setOptions({ renderer }) opts out
    own = "webgl2";
    setDefaultChartRenderer("webgpu");
    expect(recreate).toHaveBeenCalledTimes(2);
    own = undefined;
    off();
    setDefaultChartRenderer("auto");
    expect(recreate).toHaveBeenCalledTimes(2);
  });
});

/** A 2D context accepting every call (happy-dom has no canvas) */
const fakeContext = () =>
  new Proxy({} as Record<string | symbol, unknown>, {
    get(target, key) {
      if (key in target) return target[key];
      if (key === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      if (key === "createLinearGradient") return () => ({ addColorStop() {} });
      if (key === "getImageData")
        return () => ({ data: new Uint8ClampedArray(4) });
      return () => {};
    },
    set(target, key, value) {
      target[key] = value;
      return true;
    },
  });

const tick = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => setTimeout(resolve, 0)),
  );

interface Mounted {
  ready: Promise<ChartRendererKind | null>;
  destroy(): void;
  setOptions?(options: never): void;
}

const HOUR = 3_600_000;

/** One chart of every GPU engine, with an optional own renderer */
const ENGINES: Record<
  string,
  (el: HTMLElement, renderer?: ChartRendererPreference) => Mounted
> = {
  cartesian: (el, renderer) =>
    createChart(el, { series: [{ data: [1, 3, 2] }], renderer }),
  trading: (el, renderer) =>
    createTradingChart(el, {
      bars: Array.from({ length: 20 }, (_, i) => ({
        time: i * HOUR,
        open: 10,
        high: 12,
        low: 9,
        close: 11,
        volume: 100,
      })),
      renderer,
    }),
  orderBookHeatmap: (el, renderer) =>
    createOrderBookHeatmap(el, { interval: 100, locale: "en-US", renderer }),
  "3d": (el, renderer) =>
    createChart3D(el, {
      series: [{ name: "Cloud", data: [[0, 0, 0]] }],
      renderer,
    }),
  graph: (el, renderer) =>
    createGraphChart(el, {
      nodes: [{ id: "a" }, { id: "b" }],
      edges: [{ source: "a", target: "b" }],
      layout: "none",
      animation: false,
      renderer,
    }),
};

describe.each(Object.keys(ENGINES))(
  "%s chart and the default renderer",
  (name) => {
    const create = ENGINES[name]!;
    let container: HTMLDivElement;
    let chart: Mounted | null = null;

    const used = () =>
      container.querySelector<HTMLElement>("[data-renderer]")?.dataset.renderer;

    const settle = async () => {
      await tick();
      await tick();
    };

    beforeEach(() => {
      Object.assign(available, {
        webgpu: true,
        webgl2: true,
        webgl: true,
        canvas2d: true,
      });
      for (const key of Object.keys(destroyed)) delete destroyed[key];
      document.documentElement.lang = "en";
      vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(
        600,
      );
      vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(
        400,
      );
      vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(((
        kind: string,
      ) =>
        kind === "2d"
          ? fakeContext()
          : null) as unknown as typeof HTMLCanvasElement.prototype.getContext);
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    afterEach(() => {
      chart?.destroy();
      chart = null;
      container.remove();
      setDefaultChartRenderer("auto");
      document.documentElement.removeAttribute("lang");
      vi.restoreAllMocks();
    });

    it("switches backend live when the default changes", async () => {
      chart = create(container);
      expect(await chart.ready).toBe("webgpu");
      expect(used()).toBe("webgpu");
      setDefaultChartRenderer("canvas2d");
      await settle();
      expect(used()).toBe("canvas2d");
      expect(destroyed.webgpu).toBe(1);
      setDefaultChartRenderer("webgl");
      await settle();
      expect(used()).toBe("webgl");
      setDefaultChartRenderer("auto");
      await settle();
      expect(used()).toBe("webgpu");
    });

    it("shows the backend actually in use when a forced default falls back", async () => {
      available.webgpu = false;
      setDefaultChartRenderer("canvas2d");
      chart = create(container);
      expect(await chart.ready).toBe("canvas2d");
      setDefaultChartRenderer("webgpu");
      await settle();
      expect(used()).toBe("webgl2");
    });

    it("keeps an explicit renderer, and stops following once destroyed", async () => {
      chart = create(container, "webgl2");
      expect(await chart.ready).toBe("webgl2");
      setDefaultChartRenderer("canvas2d");
      await settle();
      expect(used()).toBe("webgl2");
      expect(destroyed.webgl2).toBeUndefined();

      chart.destroy();
      chart = create(container);
      await chart.ready;
      chart.destroy();
      chart = null;
      const after = { ...destroyed };
      setDefaultChartRenderer("webgl");
      await settle();
      // no renderer was created (nor destroyed) for the destroyed charts
      expect(destroyed).toEqual(after);
    });
  },
);
