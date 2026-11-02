import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { VectorBatch } from "../renderers/vector";
import type { VectorRenderer } from "../renderers/vector-gpu";
import type { ChartRendererKind } from "../types";
import { createShapeChart } from "./chart";
import type { ShapeChartInstance } from "./types";

const backends = vi.hoisted(() => ({
  /** Kinds the fake GPU accepts, in order of preference */
  available: ["webgpu"] as string[],
  created: [] as { kind: string; batches: VectorBatch[]; lost: () => void }[],
}));

vi.mock("../renderers/vector-gpu", () => ({
  createVectorRenderer: async (
    _requested: unknown,
    makeCanvas: () => HTMLCanvasElement,
    onLost: (kind: ChartRendererKind) => void,
    exclude: ReadonlySet<string> = new Set(),
  ): Promise<VectorRenderer | null> => {
    const kind = backends.available.find((k) => !exclude.has(k));
    if (!kind) return null;
    const entry = {
      kind,
      batches: [] as VectorBatch[],
      lost: () => onLost(kind as ChartRendererKind),
    };
    backends.created.push(entry);
    return {
      kind: kind as VectorRenderer["kind"],
      canvas: makeCanvas(),
      resize: () => {},
      render: (batch) => entry.batches.push(batch),
      destroy: () => {},
    };
  },
}));

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("createShapeChart on the GPU", () => {
  let container: HTMLElement;
  let chart: ShapeChartInstance | null = null;
  let texts: string[];

  beforeEach(() => {
    backends.available = ["webgpu"];
    backends.created = [];
    texts = [];
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(400);
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(300);
    const ctx = new Proxy({} as Record<string, unknown>, {
      get(target, key: string) {
        if (key in target) return target[key];
        if (key === "measureText")
          return (text: string) => ({ width: text.length * 6 });
        if (key === "fillText") return (text: string) => texts.push(text);
        return () => {};
      },
      set(target, key: string, value) {
        target[key] = value;
        return true;
      },
    });
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
      ctx as unknown as CanvasRenderingContext2D,
    );
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 1;
    });
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    chart?.destroy();
    chart = null;
    container.remove();
    vi.restoreAllMocks();
  });

  const root = () => container.querySelector<HTMLElement>(".minerva-chart")!;

  it("draws the shapes on the GPU and the text on the canvas above", async () => {
    chart = createShapeChart(container, {
      type: "pie",
      data: [
        { name: "Alpha", value: 2 },
        { name: "Beta", value: 1 },
      ],
      labels: "outside",
      animation: false,
    });
    expect(chart.getRenderer()).toBeNull();
    await flush();
    expect(chart.getRenderer()).toBe("webgpu");
    expect(root().dataset.renderer).toBe("webgpu");
    const [gpu] = backends.created;
    const batch = gpu.batches[gpu.batches.length - 1];
    expect(batch.count).toBeGreaterThan(0);
    expect(batch.draws.length).toBeGreaterThan(0);
    expect(texts.some((t) => t.includes("Alpha"))).toBe(true);
    const canvases = [...root().querySelectorAll("canvas")];
    // the Canvas2D layer is hidden, the GPU canvas sits below the text layer
    expect(canvases[0].style.display).toBe("none");
    const gpuIndex = canvases.findIndex(
      (c) => c.className === "minerva-chart-data",
    );
    expect(gpuIndex).toBeGreaterThan(0);
    expect(canvases[gpuIndex + 1].style.display).toBe("");
  });

  it("falls back to the next backend when the GPU is lost", async () => {
    backends.available = ["webgpu", "webgl2"];
    chart = createShapeChart(container, {
      type: "funnel",
      data: [
        { name: "A", value: 3 },
        { name: "B", value: 1 },
      ],
      animation: false,
    });
    await flush();
    backends.created[0].lost();
    await flush();
    expect(chart.getRenderer()).toBe("webgl2");
    expect(root().querySelectorAll(".minerva-chart-data")).toHaveLength(1);
  });

  it("uses Canvas2D when no GPU backend starts", async () => {
    backends.available = [];
    chart = createShapeChart(container, {
      type: "radar",
      indicators: [{ name: "A" }, { name: "B" }, { name: "C" }],
      series: [{ name: "S", values: [1, 2, 3] }],
      animation: false,
    });
    await flush();
    expect(chart.getRenderer()).toBe("canvas2d");
    expect(root().dataset.renderer).toBe("canvas2d");
    expect(root().querySelector("canvas")!.style.display).toBe("");
  });
});
