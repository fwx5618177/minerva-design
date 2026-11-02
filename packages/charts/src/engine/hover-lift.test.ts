// Hover emphasis of bars (columns, horizontal bars, histograms, waterfalls,
// Gantt tasks) and heatmap cells: the lifted marks of the scene, their
// drawing on Canvas2D and on the DOM layer between the data and the labels.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { drawScene } from "./canvas";
import { createChart } from "./chart";
import { toCss } from "./color";
import { createChartController } from "./controller";
import { buildModel, type DataCache } from "./model";
import { ganttSeries } from "./presets";
import {
  contrastRing,
  hitTest,
  hoverMarks,
  layoutChart,
  liftedBarRect,
  type BarHoverMark,
  type HoverMark,
} from "./scene";
import { toScreen } from "./layout";
import { createTheme } from "./theme";
import type { ChartInstance, ChartOptions } from "./types";

const theme = createTheme();
const measure = (text: string) => text.length * 6;

const layout = (options: ChartOptions, width = 480, height = 300) => {
  const model = buildModel(options, theme, new Set(), new Map() as DataCache);
  const l = layoutChart({
    model,
    view: { x: [...model.base.x], y: [...model.base.y] },
    theme,
    width,
    height,
    measure,
  });
  return { model, ...l };
};

/** Marks of the pointer at a data position */
const marksAt = (options: ChartOptions, x: number, y: number) => {
  const l = layout(options);
  const p = toScreen(l.scales, x, y);
  const hit = hitTest(l.model, l.scales, l.xTicks, p.x, p.y);
  if (!hit) throw new Error("hit expected");
  return { ...l, hit, marks: hoverMarks(l.model, l.scales, hit) };
};

const bars = (marks: HoverMark[]) =>
  marks.filter((m): m is BarHoverMark => m.kind === "bar");

const columns: ChartOptions = {
  xAxis: { type: "category", categories: ["A", "B", "C"] },
  series: [{ type: "bar", name: "Sales", color: "#4f46e5", data: [3, 5, 2] }],
};

describe("lifted bars", () => {
  it("keeps the band and lifts the hovered column: thicker, never longer", () => {
    const { marks, scales } = marksAt(columns, 1, 2.5);
    expect(marks.map((m) => m.kind)).toEqual(["band", "bar"]);
    const [bar] = bars(marks);
    expect(bar).toMatchObject({
      seriesIndex: 0,
      index: 1,
      base: "bottom",
      backdrop: false,
      radius: 3,
      ring: contrastRing([0x4f / 255, 0x46 / 255, 0xe5 / 255, 1]),
    });
    // the bar as drawn: from the baseline to its value
    expect(bar.y).toBeCloseTo(scales.yToPx(5));
    expect(bar.y + bar.height).toBeCloseTo(scales.yToPx(0));
    const r = liftedBarRect(bar);
    expect(r.y).toBe(bar.y);
    expect(r.height).toBe(bar.height);
    expect(bar.grow).toBeGreaterThan(0);
    expect(r.width).toBeCloseTo(bar.width + bar.grow * 2);
    // a few pixels: 20% of the thickness at most
    expect(bar.grow * 2).toBeLessThanOrEqual(bar.width * 0.2);
  });

  it("grows horizontal bars across their height", () => {
    const { marks, scales } = marksAt(
      { ...columns, orientation: "horizontal" },
      1,
      2.5,
    );
    const [bar] = bars(marks);
    expect(bar.base).toBe("left");
    expect(bar.x).toBeCloseTo(scales.yToPx(0));
    const r = liftedBarRect(bar);
    expect(r.x).toBe(bar.x);
    expect(r.width).toBe(bar.width);
    expect(r.height).toBeCloseTo(bar.height + bar.grow * 2);
  });

  it("puts the base of negative columns at their top", () => {
    const { marks } = marksAt(
      {
        ...columns,
        series: [{ type: "bar", data: [3, -4, 2] }],
      },
      1,
      -2,
    );
    expect(bars(marks)[0]?.base).toBe("top");
  });

  it("never widens grouped bars into their neighbours", () => {
    const { marks } = marksAt(
      {
        ...columns,
        series: [
          { type: "bar", name: "A", data: [3, 5, 2] },
          { type: "bar", name: "B", data: [4, 1, 6] },
          { type: "bar", name: "C", data: [2, 2, 2] },
        ],
      },
      1,
      0.5,
    );
    const lifted = bars(marks).map(liftedBarRect);
    expect(lifted).toHaveLength(3);
    lifted.sort((a, b) => a.x - b.x);
    for (let k = 1; k < lifted.length; k++)
      expect(lifted[k - 1].x + lifted[k - 1].width).toBeLessThan(lifted[k].x);
  });

  it("lifts every segment of a stacked column, square like the data", () => {
    const { marks } = marksAt(
      {
        ...columns,
        series: [
          { type: "bar", stack: "s", data: [3, 5, 2] },
          { type: "bar", stack: "s", data: [1, 2, 3] },
        ],
      },
      1,
      2,
    );
    const lifted = bars(marks);
    expect(lifted).toHaveLength(2);
    expect(lifted.every((m) => m.radius === 0)).toBe(true);
    // the upper segment starts where the lower one ends
    const [lo, hi] = lifted;
    expect(hi.y + hi.height).toBeCloseTo(lo.y);
  });

  it("lifts the bins of histograms that touch", () => {
    const { marks } = marksAt(
      {
        xAxis: { type: "category", categories: ["0", "1", "2"] },
        series: [{ type: "bar", barWidth: 1, data: [3, 5, 2] }],
      },
      1,
      2,
    );
    const [bar] = bars(marks);
    expect(bar.grow).toBeGreaterThan(0);
  });

  it("gives boxes and candles a band only", () => {
    const box = marksAt(
      {
        xAxis: { type: "category", categories: ["a"] },
        series: [
          {
            type: "boxplot",
            data: [{ x: 0, y: 5, low: 1, q1: 3, q3: 7, high: 9 }],
          },
        ],
      },
      0,
      5,
    );
    expect(box.marks.map((m) => m.kind)).toEqual(["band"]);
    const candle = marksAt(
      {
        series: [
          {
            type: "candlestick",
            data: [{ x: 0, y: 7, open: 5, high: 9, low: 4 }],
          },
        ],
      },
      0,
      6,
    );
    expect(candle.marks.map((m) => m.kind)).toEqual(["band"]);
  });
});

describe("lifted Gantt tasks", () => {
  const day = 86_400_000;
  const t0 = Date.UTC(2026, 0, 5);
  const g = ganttSeries(
    [
      {
        name: "Design",
        start: t0,
        end: t0 + 10 * day,
        progress: 0.5,
        color: "#10b981",
      },
      { name: "Build", start: t0 + 12 * day, end: t0 + 20 * day },
      { name: "Launch", start: t0 + 22 * day, milestone: true },
    ],
    { locale: "en" },
  );
  const options: ChartOptions = {
    locale: "en",
    orientation: "horizontal",
    series: g.series,
    xAxis: { type: "category", categories: g.categories },
    yAxis: { type: "time", min: g.domain[0], max: g.domain[1] },
  };

  it("rings a translucent task in its color and redraws its progress over it", () => {
    const { marks, model } = marksAt(options, 0, t0 + 7 * day);
    const [task, progress, ...rest] = bars(marks);
    expect(rest).toHaveLength(0);
    expect(task).toMatchObject({ base: "left", backdrop: true, radius: 4 });
    expect(task.ring).toBe(toCss([0x10 / 255, 0xb9 / 255, 0x81 / 255, 1]));
    expect(task.grow).toBeGreaterThan(0);
    expect(model.series[progress.seriesIndex].id).toBe("gantt:progress");
    expect(progress.ring).toBeNull();
    // the same lane, half of the length, the same growth
    expect(progress.x).toBeCloseTo(task.x);
    expect(progress.y).toBeCloseTo(task.y);
    expect(progress.width).toBeCloseTo(task.width / 2, 0);
    expect(progress.grow).toBe(task.grow);
  });

  it("keeps a plain dot on milestones", () => {
    const { marks } = marksAt(options, 2, t0 + 22 * day);
    expect(marks.some((m) => m.kind === "dot")).toBe(true);
    expect(bars(marks)).toHaveLength(0);
  });
});

// --------------------------------------------------------------- Canvas2D

/** 2D context double recording the calls and the styles they used */
const recordingContext = () => {
  const calls: { name: string; args: unknown[]; fill: unknown }[] = [];
  const state: Record<string, unknown> = {};
  const ctx = new Proxy(state, {
    get(target, key: string) {
      if (key in target) return target[key];
      if (key === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      if (key === "createLinearGradient") return () => ({ addColorStop() {} });
      return (...args: unknown[]) => {
        calls.push({
          name: key,
          args,
          fill: key === "stroke" ? target.strokeStyle : target.fillStyle,
        });
      };
    },
    set(target, key: string, value) {
      target[key] = value;
      return true;
    },
  });
  return { ctx: ctx as unknown as CanvasRenderingContext2D, calls };
};

describe("canvas host", () => {
  it("draws the lifted bar clipped to the plot, below the value labels", () => {
    const controller = createChartController({
      options: {
        ...columns,
        series: [
          { ...columns.series[0], data: [3, 5.25, 2], showLabels: true },
        ],
      },
      measureText: measure,
    });
    controller.setSize(400, 240);
    const p = controller.toPixel(1, 2.5)!;
    controller.pointerMove(p.x, p.y);
    const scene = controller.getScene()!;
    const bar = bars(scene.hover?.marks ?? [])[0];
    expect(bar).toBeDefined();
    const { ctx, calls } = recordingContext();
    drawScene(ctx, scene, [], { x: 0, y: 0 }, 1);
    const clip = calls.findIndex((c) => c.name === "clip");
    const fill = calls.findIndex(
      (c, k) => k > clip && c.name === "fill" && c.fill === bar.color,
    );
    const ring = calls.findIndex(
      (c, k) => k > fill && c.name === "stroke" && c.fill === bar.ring,
    );
    // the value label (the tooltip repeats it later)
    const label = calls.findIndex(
      (c) => c.name === "fillText" && c.args[0] === "5.25",
    );
    expect(clip).toBeGreaterThanOrEqual(0);
    expect(fill).toBeGreaterThan(clip);
    expect(ring).toBeGreaterThan(fill);
    expect(label).toBeGreaterThan(ring);
  });
});

// -------------------------------------------------------------------- DOM

describe("DOM lift layer", () => {
  const WIDTH = 600;
  const HEIGHT = 300;
  let container: HTMLDivElement;
  let chart: ChartInstance | null = null;
  let animate: ReturnType<typeof vi.fn>;
  let animateBefore: PropertyDescriptor | undefined;
  let reduced = false;
  let matchMediaBefore: typeof window.matchMedia;

  const mount = async (options: ChartOptions) => {
    chart = createChart(container, options);
    await chart.ready;
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => setTimeout(resolve, 0)),
    );
    return chart;
  };

  const move = (x: number, y: number) =>
    container.querySelector(".minerva-chart-stage")!.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: x,
        clientY: y,
        bubbles: true,
        pointerId: 1,
      }),
    );

  const liftLayer = () =>
    [...container.querySelector(".minerva-chart-stage")!.children].find(
      (el) => (el as HTMLElement).style.isolation === "isolate",
    ) as HTMLElement;

  const liftedBars = () =>
    [...liftLayer().querySelectorAll<HTMLElement>("div div")].filter(
      (el) => el.style.display === "block",
    );

  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(
      WIDTH,
    );
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(
      HEIGHT,
    );
    animate = vi.fn();
    animateBefore = Object.getOwnPropertyDescriptor(
      Element.prototype,
      "animate",
    );
    Object.defineProperty(Element.prototype, "animate", {
      value: animate,
      configurable: true,
      writable: true,
    });
    reduced = false;
    matchMediaBefore = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      matches: reduced && query.includes("reduce"),
      media: query,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      onchange: null,
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    chart?.destroy();
    chart = null;
    container.remove();
    window.matchMedia = matchMediaBefore;
    if (animateBefore)
      Object.defineProperty(Element.prototype, "animate", animateBefore);
    else delete (Element.prototype as { animate?: unknown }).animate;
    vi.restoreAllMocks();
  });

  it("sits between the data and the foreground canvas", async () => {
    await mount(columns);
    const stage = container.querySelector(".minerva-chart-stage")!;
    const layers = [...stage.children];
    const canvases = stage.querySelectorAll("canvas");
    const foreground = canvases[canvases.length - 1]!;
    expect(layers.indexOf(liftLayer())).toBe(layers.indexOf(foreground) - 1);
    const data = stage.querySelector(".minerva-chart-data");
    if (data)
      expect(layers.indexOf(data)).toBeLessThan(layers.indexOf(liftLayer()));
  });

  it("lifts the hovered bar with a ring and plays its entry once", async () => {
    const c = await mount(columns);
    const p = c.toPixel(1, 2.5)!;
    move(p.x, p.y);
    const [el] = liftedBars();
    expect(el).toBeDefined();
    expect(el.style.background).toContain("rgb");
    expect(el.style.boxShadow).toContain("inset");
    expect(el.style.borderRadius).toBe("3px");
    expect(animate).toHaveBeenCalledTimes(1);
    const [from] = animate.mock.calls[0][0] as Keyframe[];
    expect(String(from.transform)).toMatch(/^scaleX\(0\.\d+\)$/);
    // the same bar: no new entry
    move(p.x + 1, p.y);
    expect(animate).toHaveBeenCalledTimes(1);
    // another bar
    const q = c.toPixel(2, 1)!;
    move(q.x, q.y);
    expect(animate).toHaveBeenCalledTimes(2);
    // away: hidden
    move(1, 1);
    expect(liftedBars()).toHaveLength(0);
  });

  it("keeps a static emphasis when the user prefers reduced motion", async () => {
    reduced = true;
    const c = await mount(columns);
    const p = c.toPixel(1, 2.5)!;
    move(p.x, p.y);
    expect(liftedBars()).toHaveLength(1);
    expect(animate).not.toHaveBeenCalled();
  });
});
