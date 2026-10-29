import { describe, expect, it, vi } from "vitest";
import { createCanvasChart, type ChartCanvas } from "./canvas";
import { resolveStaticColor } from "./color";
import { createChartController, scenePrimitives } from "./controller";
import { quadrantCenter, quadrantChartOptions, quadrantOf } from "./presets";
import { createTheme } from "./theme";
import type { ChartOptions } from "./types";

/** 2D context double recording the calls (mini-program canvases have the same API) */
const fakeContext = () => {
  const calls: { name: string; args: unknown[] }[] = [];
  const state: Record<string, unknown> = {};
  const ctx = new Proxy(state, {
    get(target, key: string) {
      if (key in target) return target[key];
      if (key === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      if (key === "createLinearGradient") return () => ({ addColorStop() {} });
      return (...args: unknown[]) => {
        calls.push({ name: key, args });
      };
    },
    set(target, key: string, value) {
      target[key] = value;
      return true;
    },
  });
  return { ctx, calls };
};

const fakeCanvas = () => {
  const { ctx, calls } = fakeContext();
  const frames: (() => void)[] = [];
  const canvas: ChartCanvas = {
    width: 0,
    height: 0,
    getContext: () => ctx,
    requestAnimationFrame: (cb) => frames.push(cb),
    cancelAnimationFrame: () => {},
  };
  const flush = () => {
    while (frames.length) frames.shift()!();
  };
  return { canvas, calls, flush };
};

const measureText = (text: string) => text.length * 6;

describe("static colors", () => {
  it("resolves var() through variables and fallbacks", () => {
    expect(resolveStaticColor("var(--a)", { "--a": "#ff0000" })).toEqual([
      1, 0, 0, 1,
    ]);
    expect(resolveStaticColor("var(--missing, #00ff00)")).toEqual([0, 1, 0, 1]);
    expect(
      resolveStaticColor("var(--x, var(--y, rgb(0, 0, 255)))", {}),
    ).toEqual([0, 0, 1, 1]);
    expect(resolveStaticColor("white")).toEqual([1, 1, 1, 1]);
  });

  it("builds a theme from Minerva variables", () => {
    const theme = createTheme({
      variables: { "--primary-color": "#112233", "--text-color": "#000000" },
    });
    expect(theme.palette[0]).toEqual([0x11 / 255, 0x22 / 255, 0x33 / 255, 1]);
    expect(theme.text).toEqual([0, 0, 0, 1]);
  });
});

describe("quadrant presets", () => {
  const config = { reverseX: true };

  it("maps positions to the quadrants seen on screen", () => {
    expect(quadrantOf(config, 8, 8)).toBe("topLeft");
    expect(quadrantOf(config, 2, 8)).toBe("topRight");
    expect(quadrantOf(config, 8, 2)).toBe("bottomLeft");
    expect(quadrantOf({}, 8, 2)).toBe("bottomRight");
    expect(quadrantCenter(config, "topLeft")).toEqual({ x: 7.5, y: 7.5 });
    expect(quadrantOf(config, 7.5, 7.5)).toBe("topLeft");
  });

  it("builds tinted areas, dividers and inner axis labels", () => {
    const options = quadrantChartOptions({
      points: [{ x: 1, y: 9, label: "A" }],
      quadrants: { topLeft: { label: "Do", color: "#ff0000" } },
      axisLabels: { top: "Important", right: "Later" },
      showTicks: false,
      draggable: true,
    });
    const types = options.annotations!.map((a) => a.type);
    expect(types.filter((t) => t === "rect")).toHaveLength(4);
    expect(types.filter((t) => t === "line")).toHaveLength(2);
    expect(types.filter((t) => t === "text")).toHaveLength(2);
    expect(options.xAxis?.visible).toBe(false);
    expect(options.interaction).toMatchObject({
      zoom: false,
      dragPoints: true,
    });
    const data = options.series[0].data as readonly { color?: string }[];
    expect(data[0].color).toBe("#ff0000");
    expect(typeof options.tooltip).toBe("object");
  });
});

const lineOptions: ChartOptions = {
  series: [
    { id: "a", name: "A", data: [1, 3, 2, 5] },
    { id: "b", name: "B", type: "bar", data: [2, 2, 2, 2] },
  ],
};

describe("createChartController", () => {
  it("lays the scene out and hit tests touches", () => {
    const controller = createChartController({
      options: lineOptions,
      measureText,
    });
    expect(controller.getScene()).toBeNull();
    controller.setSize(400, 240);
    const scene = controller.getScene()!;
    expect(scene.legend?.entries.map((e) => e.name)).toEqual(["A", "B"]);
    expect(scene.layout.plot.y).toBeGreaterThanOrEqual(scene.legend!.height);
    const hover = vi.fn();
    const click = vi.fn();
    controller.on("hover", hover);
    controller.on("click", click);
    const p = controller.toPixel(1, 3)!;
    controller.pointerDown(p.x, p.y, { touch: true });
    controller.pointerUp(p.x, p.y, { touch: true });
    expect(hover).toHaveBeenCalled();
    expect(click.mock.calls[0][0].items).toHaveLength(2);
    expect(controller.getScene()!.hover?.tooltip?.content.rows).toHaveLength(2);
  });

  it("toggles series from the legend", () => {
    const controller = createChartController({
      options: lineOptions,
      measureText,
    });
    controller.setSize(400, 240);
    const entry = controller.getScene()!.legend!.entries[1];
    const x = entry.box.x + 4;
    const y = entry.box.y + 4;
    controller.pointerDown(x, y, { touch: true });
    controller.pointerUp(x, y, { touch: true });
    expect(controller.getScene()!.model.series[1].hidden).toBe(true);
  });

  it("pinches to zoom and double taps to reset", () => {
    const controller = createChartController({
      options: { series: [{ data: Array.from({ length: 100 }, (_, i) => i) }] },
      measureText,
    });
    controller.setSize(400, 240);
    const zoom = vi.fn();
    controller.on("zoom", zoom);
    controller.pointerDown(150, 120, { id: 1, touch: true });
    controller.pointerDown(250, 120, { id: 2, touch: true });
    controller.pointerMove(100, 120, { id: 1, touch: true });
    controller.pointerMove(300, 120, { id: 2, touch: true });
    controller.pointerUp(100, 120, { id: 1, touch: true });
    controller.pointerUp(300, 120, { id: 2, touch: true });
    const span = controller.getView().x[1] - controller.getView().x[0];
    expect(span).toBeLessThan(99);
    expect(zoom).toHaveBeenCalled();
    controller.pointerDown(200, 120, { touch: true });
    controller.pointerUp(200, 120, { touch: true });
    controller.pointerDown(200, 120, { touch: true });
    controller.pointerUp(200, 120, { touch: true });
    expect(controller.getView().x).toEqual([0, 99]);
  });

  it("drags points and reports empty plot clicks", () => {
    const options = quadrantChartOptions({
      points: [{ x: 2, y: 2, label: "A" }],
      draggable: true,
    });
    const controller = createChartController({ options, measureText });
    controller.setSize(400, 300);
    const drop = vi.fn();
    const plotClick = vi.fn();
    controller.on("drop", drop);
    controller.on("plotClick", plotClick);
    const from = controller.toPixel(2, 2)!;
    const to = controller.toPixel(8, 8)!;
    controller.pointerDown(from.x, from.y);
    controller.pointerMove((from.x + to.x) / 2, (from.y + to.y) / 2);
    expect(controller.getScene()!.dragging).not.toBeNull();
    controller.pointerMove(to.x, to.y);
    controller.pointerUp(to.x, to.y);
    expect(drop).toHaveBeenCalledTimes(1);
    expect(drop.mock.calls[0][0].x).toBeCloseTo(8, 5);
    expect(drop.mock.calls[0][0].item.index).toBe(0);
    controller.pointerDown(to.x, to.y);
    controller.pointerUp(to.x, to.y);
    expect(plotClick.mock.calls[0][0].y).toBeCloseTo(8, 5);
  });

  it("describes the data as bounded primitives", () => {
    const n = 50000;
    const controller = createChartController({
      options: {
        series: [
          { data: Float64Array.from({ length: n }, (_, i) => Math.sin(i)) },
          {
            type: "scatter",
            data: {
              x: Float64Array.from({ length: n }, (_, i) => i),
              y: Float64Array.from({ length: n }, (_, i) => (i * 7919) % 1000),
            },
          },
        ],
      },
      measureText,
    });
    controller.setSize(300, 200);
    const primitives = scenePrimitives(controller.getScene()!);
    const line = primitives.find((p) => p.kind === "line")!;
    const dots = primitives.find((p) => p.kind === "dots")!;
    const points = line.kind === "line" ? line.segments.flat().length / 2 : 0;
    expect(points).toBeLessThan(300 * 5);
    expect(dots.kind === "dots" && dots.colors.length).toBeLessThan(4001);
  });
});

describe("createCanvasChart", () => {
  it("draws every layer on one canvas", () => {
    const { canvas, calls, flush } = fakeCanvas();
    const chart = createCanvasChart({
      canvas,
      width: 300,
      height: 200,
      pixelRatio: 2,
      options: quadrantChartOptions({
        points: [{ x: 2, y: 8, label: "Task" }],
        quadrants: { topLeft: { label: "Do first" } },
        axisLabels: { top: "Important" },
      }),
    });
    flush();
    expect(canvas.width).toBe(600);
    expect(canvas.height).toBe(400);
    const texts = calls
      .filter((c) => c.name === "fillText")
      .map((c) => c.args[0]);
    expect(texts).toEqual(
      expect.arrayContaining(["Do first", "Important", "Task"]),
    );
    expect(calls.some((c) => c.name === "arc")).toBe(true);

    const hover = vi.fn();
    chart.on("hover", hover);
    const p = chart.toPixel(2, 8)!;
    chart.touchStart([{ x: p.x, y: p.y, identifier: 3 }]);
    chart.touchEnd([{ x: p.x, y: p.y, identifier: 3 }]);
    calls.length = 0;
    chart.render();
    expect(hover).toHaveBeenCalled();
    // tooltip box + texts
    expect(
      calls.filter((c) => c.name === "fillText").map((c) => c.args[0]),
    ).toContain("Task");
    chart.destroy();
  });

  it("works without requestAnimationFrame", async () => {
    const { ctx } = fakeContext();
    const raf = globalThis.requestAnimationFrame;
    // @ts-expect-error simulate a host without requestAnimationFrame
    globalThis.requestAnimationFrame = undefined;
    try {
      const canvas: ChartCanvas = {
        width: 0,
        height: 0,
        getContext: () => ctx,
      };
      const chart = createCanvasChart({
        canvas,
        width: 100,
        height: 80,
        options: { series: [{ data: [1, 2] }] },
      });
      await new Promise((r) => setTimeout(r, 30));
      expect(canvas.width).toBe(100);
      chart.destroy();
    } finally {
      globalThis.requestAnimationFrame = raf;
    }
  });
});
