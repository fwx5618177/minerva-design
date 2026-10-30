// 1.5 cartesian additions: perceptual heatmap ramps and their color legend,
// lifted cells, log value axes (left and right), box plot outlier rings and
// hover, waterfall connectors, item tooltips and the tooltip columns, on the
// DOM chart, the controller (mini-programs / React Native) and Canvas2D.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axisTicks } from "./axis";
import { createCanvasChart, drawPrimitives, type ChartCanvas } from "./canvas";
import { createChart } from "./chart";
import {
  fromOklab,
  luminance,
  mixOklab,
  oklabRamp,
  toOklab,
  withLightness,
} from "./color";
import { createChartController, scenePrimitives } from "./controller";
import { buildItems, cellStyleKey } from "./items";
import { heatCellStyle, toScreen } from "./layout";
import {
  buildModel,
  fromPlotY,
  heatPosition,
  heatmapStops,
  toPlotY,
  type DataCache,
} from "./model";
import { drawForeground } from "./overlay";
import { heatmapChartOptions, waterfallSeries } from "./presets";
import type { ScatterItem } from "./renderers/types";
import {
  colorLegend,
  connectorSegments,
  contrastRing,
  hitTest,
  hoverMarks,
  layoutChart,
  legendShown,
  resolveAnnotations,
  tooltipContent,
} from "./scene";
import { createTheme } from "./theme";
import type { ChartInstance, ChartOptions } from "./types";

const light = createTheme();
const dark = createTheme({
  variables: {
    "--background-color": "#0f172a",
    "--surface-color": "#0f172a",
    "--text-color": "#f1f5f9",
    "--text-secondary-color": "#94a3b8",
    "--border-color": "#334155",
  },
});

const model = (options: ChartOptions, theme = light) =>
  buildModel(options, theme, new Set(), new Map() as DataCache);

const measure = (text: string) => text.length * 6;

const layout = (options: ChartOptions, width = 400, height = 300) => {
  const m = model(options);
  return {
    model: m,
    ...layoutChart({
      model: m,
      view: { x: [...m.base.x], y: [...m.base.y] },
      theme: light,
      width,
      height,
      measure,
    }),
  };
};

const heatmap = (extra: Partial<ChartOptions["series"][number]> = {}) =>
  heatmapChartOptions({
    data: [
      { x: "Mon", y: "AM", value: -4 },
      { x: "Tue", y: "AM", value: 0 },
      { x: "Mon", y: "PM", value: 2 },
      { x: "Tue", y: "PM", value: 8 },
    ],
    name: "Load",
    ...(extra as object),
  });

// ------------------------------------------------------------------ color

describe("OKLab", () => {
  it("round-trips colors and mixes them perceptually", () => {
    const c: [number, number, number, number] = [0.31, 0.27, 0.9, 1];
    const back = fromOklab(toOklab(c));
    back.forEach((v, i) => expect(v).toBeCloseTo(c[i]!, 4));
    // black to white: the middle is the perceptual gray, darker than 0.5
    const gray = mixOklab([0, 0, 0, 1], [1, 1, 1, 1], 0.5);
    expect(gray[0]).toBeCloseTo(0.39, 1);
    expect(toOklab(withLightness(c, 0.8))[0]).toBeCloseTo(0.8, 1);
    const lut = oklabRamp([c], 4);
    expect(new Set(lut).size).toBe(1);
    expect(oklabRamp([], 4)[0]).toBe(0);
    // a transparent ramp still draws (0 is "no cell")
    expect(oklabRamp([[0, 0, 0, 0]], 2)[0]).not.toBe(0);
  });

  it("builds theme-aware sequential and diverging ramps", () => {
    const hue = light.primary;
    const neg: [number, number, number, number] = [0.86, 0.15, 0.15, 1];
    const lightRamp = heatmapStops("sequential", hue, light, neg);
    const darkRamp = heatmapStops("sequential", hue, dark, neg);
    // light: near white to deep; dark: near the surface to bright
    expect(luminance(lightRamp[0]!)).toBeGreaterThan(0.85);
    expect(luminance(lightRamp[lightRamp.length - 1]!)).toBeLessThan(0.25);
    expect(luminance(darkRamp[0]!)).toBeLessThan(0.2);
    expect(luminance(darkRamp[darkRamp.length - 1]!)).toBeGreaterThan(0.45);
    const diverging = heatmapStops("diverging", hue, dark, neg);
    expect(diverging).toHaveLength(5);
    // the ends carry the hues, the middle is neutral
    const mid = toOklab(diverging[2]!);
    expect(Math.hypot(mid[1], mid[2])).toBeLessThan(0.05);
    expect(toOklab(diverging[0]!)[1]).toBeGreaterThan(0.05);
  });
});

// ---------------------------------------------------------------- heatmaps

describe("heatmaps", () => {
  it("map values through a midpoint and show a color legend", () => {
    const m = model(heatmap({ colorScale: "diverging" }));
    const s = m.series[0]!;
    // diverging data spanning 0: 0 is the middle of the ramp
    expect(s.colorMidpoint).toBe(0);
    expect(heatPosition(s, 0)).toBe(0.5);
    expect(heatPosition(s, -4)).toBe(0);
    expect(heatPosition(s, 8)).toBe(1);
    expect(heatPosition(s, 4)).toBeCloseTo(0.75);
    expect(heatPosition(s, 99)).toBe(1);
    // without a midpoint: linear over the range
    const linear = model(heatmap()).series[0]!;
    expect(linear.colorMidpoint).toBeNull();
    expect(heatPosition(linear, 2)).toBeCloseTo(0.5);
    // explicit midpoint outside the range: linear
    expect(
      heatPosition({ valueRange: [0, 10], colorMidpoint: 20 }, 5),
    ).toBeCloseTo(0.5);
    // diverging data on one side: the middle of the range
    const positive = model(
      heatmapChartOptions({
        data: [
          { x: "a", y: "b", value: 2 },
          { x: "c", y: "b", value: 6 },
        ],
        colorScale: "diverging",
      }),
    ).series[0]!;
    expect(positive.colorMidpoint).toBe(4);

    const legend = colorLegend(m)!;
    expect(legend.stops).toHaveLength(12);
    expect(legend.labels.map((l) => [l.at, l.text])).toEqual([
      [0, "-4"],
      [0.5, "0"],
      [1, "8"],
    ]);
    // heatmaps show their color legend by default; others keep the rule
    expect(legendShown(undefined, m, 1)).toBe(true);
    expect(legendShown(false, m, 1)).toBe(false);
    const line = model({ series: [{ data: [1, 2] }] });
    expect(colorLegend(line)).toBeNull();
    expect(legendShown(undefined, line, 1)).toBe(false);
    // a custom ramp: interpolated in OKLab, no midpoint
    const custom = model(heatmap({ colorScale: ["#000000", "#ffffff"] }));
    expect(custom.series[0]!.colorMidpoint).toBeNull();
    expect(colorLegend(custom)!.labels).toHaveLength(2);
    // every cell hidden: no legend
    expect(
      colorLegend(
        buildModel(heatmap(), light, new Set(["heatmap"]), new Map()),
      ),
    ).toBeNull();
  });

  it("sizes the gaps and corners of the cells with their size on screen", () => {
    expect(heatCellStyle(3, 30, 2)).toEqual({ inset: 0, radius: 0 });
    expect(heatCellStyle(10, 10, 2)).toEqual({ inset: 0.5, radius: 2 });
    // corners of at most 20% of the cell
    expect(heatCellStyle(6, 40, 4).radius).toBe(1.25);
    expect(heatCellStyle(100, 100, 2).inset).toBe(1);
    const m = model(heatmap());
    const small = cellStyleKey(m, { x: 20, y: 20 });
    const large = cellStyleKey(m, { x: 120, y: 120 });
    expect(small).not.toBe(large);
    expect(cellStyleKey(model({ series: [{ data: [1] }] }))).toBe("");
    const items = buildItems(m, { x: 0, y: 0 }, 1, { x: 120, y: 120 });
    const cells = items[0]!;
    if (cells.kind !== "bar") throw new Error("bar expected");
    expect(cells.inset).toBe(1);
    // tiny cells: a minimal inset the renderers fade into an overlap
    const tiny = buildItems(m, { x: 0, y: 0 }, 1, { x: 2, y: 2 })[0]!;
    if (tiny.kind !== "bar") throw new Error("bar expected");
    expect(tiny.inset).toBe(0.5);
    expect(buildItems(m, { x: 0, y: 0 }, 1)[0]).toMatchObject({ inset: 0.5 });
  });

  it("lifts the hovered cell with a ring contrasting with its fill", () => {
    expect(contrastRing([1, 1, 1, 1])).toContain("15, 23, 42");
    expect(contrastRing([0.1, 0.1, 0.2, 1])).toContain("255, 255, 255");
  });
});

// --------------------------------------------------------------- log axes

describe("log axes", () => {
  const options: ChartOptions = {
    xAxis: { type: "category", categories: ["a", "b", "c"] },
    yAxis: { type: "log" },
    series: [
      { type: "bar", name: "Users", data: [12, 1500, 0] },
      { type: "line", name: "Line", data: [5, 50, 800] },
    ],
    annotations: [
      { type: "line", axis: "y", value: 100 },
      { type: "rect", y0: 10, y1: 1000 },
      { type: "text", y: 10, text: "t" },
    ],
  };

  it("plots the logarithms on whole decades, bars from the bottom", () => {
    const m = model(options);
    expect(m.y.type).toBe("log");
    expect(m.base.y).toEqual([0, 4]);
    const bars = m.series[0]!;
    expect(bars.barTop![0]).toBeCloseTo(Math.log10(12));
    // from the bottom of the axis; 0 has no logarithm
    expect(Array.from(bars.barBase!.slice(0, 2))).toEqual([0, 0]);
    expect(bars.barTop![2]).toBe(-Infinity);
    // tooltips keep the values of the data
    expect(bars.raw.y[1]).toBe(1500);
    expect(m.baseline).toBe(0);
    expect(toPlotY(m, 1000)).toBe(3);
    expect(fromPlotY(m, 2)).toBe(100);
    expect(toPlotY(model({ series: [{ data: [1] }] }), 5)).toBe(5);
    // annotations are mapped too
    const a = resolveAnnotations(options.annotations, light, Math.log10);
    expect(
      a.map((x) =>
        x.type === "line" ? x.value : x.type === "rect" ? x.y0 : x.y,
      ),
    ).toEqual([2, 1, 1]);
    // min / max are values
    const bounded = model({
      ...options,
      yAxis: { type: "log", min: 1, max: 1e5, nice: false },
    });
    expect(bounded.base.y).toEqual([0, 5]);
  });

  it("ticks every decade, with 2 and 5 on short ranges", () => {
    const axis = model(options).y;
    const long = axisTicks(axis, [0, 8], 5);
    expect(long.labels).toEqual(["1", "100", "10k", "1M", "100M"]);
    const short = axisTicks(axis, [0, 2], 6);
    expect(short.labels).toEqual(["1", "2", "5", "10", "20", "50", "100"]);
    expect(short.formatValue(1500)).toBe("1,500");
    // under a decade: plain ticks of the values
    const tight = axisTicks(axis, [Math.log10(20), Math.log10(80)], 4);
    expect(tight.labels).toEqual(["20", "40", "60", "80"]);
    const formatted = axisTicks({ ...axis, format: (v) => `${v}u` }, [0, 1], 3);
    expect(formatted.labels[0]).toBe("1u");
  });

  it("supports a log right axis with its own decades", () => {
    const {
      model: m,
      y2Ticks,
      yTicks,
    } = layout({
      xAxis: { type: "category", categories: ["a", "b", "c"] },
      yAxis2: { type: "log" },
      series: [
        { type: "bar", name: "Revenue", data: [10, 20, 30] },
        {
          type: "line",
          name: "Users",
          yAxis: "right",
          data: [1200, 85_000, 2_400_000],
        },
        { type: "area", name: "Area", yAxis: "right", data: [10, 100, 1000] },
      ],
    });
    expect(m.y2?.type).toBe("log");
    expect(m.y2Map?.log).toBe(true);
    expect(y2Ticks!.labels).toContain("1M");
    expect(y2Ticks!.labels).toContain("10k");
    // the decades are placed on the left scale
    const map = m.y2Map!;
    const k = y2Ticks!.labels.indexOf("1M");
    expect(y2Ticks!.values[k]).toBeCloseTo(6 * map.scale + map.offset);
    // the right line keeps its values in the tooltip
    const users = m.series[1]!;
    expect(users.raw.y[2]).toBe(2_400_000);
    expect(users.cols.y[2]).toBeCloseTo(
      Math.log10(2_400_000) * map.scale + map.offset,
    );
    // the right area is filled from the bottom of the axis
    expect(m.series[2]!.stackBase![0]).toBe(m.base.y[0]);
    expect(yTicks.values.length).toBeGreaterThan(1);
    // explicit bounds are values
    const bounded = model({
      series: [{ yAxis: "right", data: [5, 50] }, { data: [1, 2] }],
      yAxis2: { type: "log", min: 1, max: 1000 },
    });
    expect(bounded.y2Map!.offset).toBeCloseTo(bounded.base.y[0]);
  });

  it("converts pixels to values on log axes", () => {
    const ctrl = createChartController({
      options,
      measureText: measure,
    });
    ctrl.setSize(400, 300);
    const p = ctrl.toPixel(1, 100)!;
    expect(ctrl.fromPixel(p.x, p.y)!.y).toBeCloseTo(100);
    ctrl.destroy();
    // a tap on empty space reports a value, not a logarithm
    const dots = createChartController({
      options: {
        yAxis: { type: "log" },
        series: [
          {
            type: "scatter",
            data: [
              [0, 1],
              [10, 1000],
            ],
          },
        ],
      },
      measureText: measure,
    });
    dots.setSize(400, 300);
    const clicks: { x: number; y: number }[] = [];
    dots.on("plotClick", (e) => clicks.push(e));
    const q = dots.toPixel(5, 30)!;
    dots.pointerDown(q.x, q.y);
    dots.pointerUp(q.x, q.y);
    expect(clicks[0]?.y).toBeCloseTo(30);
    dots.destroy();
  });
});

// -------------------------------------------------------- box plot outliers

describe("box plot outliers", () => {
  const options: ChartOptions = {
    xAxis: { type: "category", categories: ["api", "web"] },
    series: [
      {
        type: "boxplot",
        name: "Latency",
        data: [
          { x: "api", low: 2, q1: 4, y: 5, q3: 7, high: 9, outliers: [15, 18] },
          { x: "web", low: 1, q1: 3, y: 4, q3: 5, high: 6 },
        ],
      },
    ],
  };

  it("draws rings by default, dots on demand", () => {
    const m = model(options);
    expect(m.series[0]!.outlierShape).toBe("hollow");
    expect(m.series[0]!.outlierSize).toBe(7);
    const rings = buildItems(m, { x: 0, y: 0 }, 1).find(
      (it) => it.kind === "scatter",
    ) as ScatterItem;
    expect(rings.opacity).toBe(0);
    expect(rings.stroke).toBeGreaterThan(0);
    expect(new Float32Array(rings.instances)[2]).toBe(7);
    const filled = model({
      ...options,
      series: [
        { ...options.series[0]!, outlierShape: "filled", outlierSize: 9 },
      ],
    });
    const dots = buildItems(filled, { x: 0, y: 0 }, 1).find(
      (it) => it.kind === "scatter",
    ) as ScatterItem;
    expect(dots.opacity).toBeGreaterThan(0);
    expect(new Float32Array(dots.instances)[2]).toBe(9);
  });

  it("hit tests an outlier and shows its value and group", () => {
    const { model: m, scales, xTicks, yTicks } = layout(options);
    const p = toScreen(scales, 0, 15);
    const hit = hitTest(m, scales, xTicks, p.x + 2, p.y)!;
    expect(hit.items[0]!.outlier).toBe(15);
    const content = tooltipContent(m, hit, yTicks);
    expect(content.title).toBe("api");
    expect(content.rows.map((r) => [r.name, r.value])).toEqual([
      ["Latency", ""],
      ["Outlier", "15"],
    ]);
    const marks = hoverMarks(m, scales, hit);
    expect(marks[0]).toMatchObject({ kind: "dot", x: p.x });
    expect(marks[0]?.kind === "dot" && marks[0].y).toBeCloseTo(p.y);
    // on the box itself: its statistics
    const q = toScreen(scales, 0, 5);
    const box = hitTest(m, scales, xTicks, q.x, q.y)!;
    expect(box.items[0]!.outlier).toBeUndefined();
    // away from the outliers of a box without any
    const r = toScreen(scales, 1, 15);
    expect(hitTest(m, scales, xTicks, r.x, r.y)?.items[0]?.outlier).toBe(
      undefined,
    );
  });

  it("gives ring primitives to the platforms without a canvas", () => {
    const ctrl = createChartController({
      options: { ...options, orientation: "horizontal" },
      measureText: measure,
    });
    ctrl.setSize(400, 300);
    const dots = scenePrimitives(ctrl.getScene()!).find(
      (p) => p.kind === "dots",
    );
    expect(dots).toMatchObject({ opacity: 0, stroke: 1.25 });
    ctrl.destroy();
  });
});

// ------------------------------------------------------ waterfall connectors

describe("waterfall connectors", () => {
  const steps = [
    { label: "Start", value: 10, kind: "change" as const },
    { label: "Cost", value: -4 },
    { label: "Total", kind: "total" as const },
  ];

  it("join the end of every bar to the next one", () => {
    const series = waterfallSeries(steps, { locale: "en" });
    expect(series.connector).toBe(true);
    const { model: m, scales } = layout({ series: [series] });
    const lines = connectorSegments(m, scales);
    expect(lines).toHaveLength(2);
    // at the running total, from the right edge to the next left edge
    const y10 = scales.yToPx(10);
    expect(lines[0]).toMatchObject({
      y0: y10,
      y1: y10,
      width: 1,
      dash: [3, 3],
    });
    expect(lines[0]!.x1).toBeGreaterThan(lines[0]!.x0);
    expect(lines[1]!.y0).toBeCloseTo(scales.yToPx(6));
    // styled, or off
    const styled = model({
      series: [
        waterfallSeries(steps, {
          connector: { color: "#ff0000", dash: [], width: 2 },
        }),
      ],
    });
    expect(styled.series[0]!.connector).toMatchObject({
      color: [1, 0, 0, 1],
      dash: [],
      width: 2,
    });
    const off = model({
      series: [waterfallSeries(steps, { connector: false })],
    });
    expect(off.series[0]!.connector).toBeNull();
    // lines and hidden series have none
    expect(
      model({ series: [{ data: [1, 2], connector: true }] }).series[0]!
        .connector,
    ).toBeNull();
    const hidden = buildModel(
      { series: [series] },
      light,
      new Set(["waterfall"]),
      new Map(),
    );
    expect(connectorSegments(hidden, scales)).toEqual([]);
  });

  it("are vertical in horizontal waterfalls and drawn dashed", () => {
    const { model: m, scales } = layout({
      orientation: "horizontal",
      series: [waterfallSeries(steps)],
    });
    const lines = connectorSegments(m, scales);
    expect(lines[0]!.x0).toBeCloseTo(lines[0]!.x1);
    const calls: string[] = [];
    const ctx = new Proxy({} as Record<string, unknown>, {
      get: (t, k: string) =>
        k in t
          ? t[k]
          : (...args: unknown[]) => calls.push(`${k}:${args.length}`),
      set: (t, k: string, v) => ((t[k] = v), true),
    }) as unknown as CanvasRenderingContext2D;
    drawForeground(ctx, {
      width: 400,
      height: 300,
      scales,
      theme: light,
      annotations: [],
      pointLabels: [],
      connectors: [
        ...lines,
        { x0: 0, y0: 5, x1: 20, y1: 5, color: "red", width: 1, dash: [] },
      ],
    });
    expect(
      calls.filter((c) => c.startsWith("setLineDash")).length,
    ).toBeGreaterThanOrEqual(4);
    expect(calls.filter((c) => c === "stroke:0").length).toBe(3);
  });
});

// ---------------------------------------------------------- item tooltips

describe("item tooltips", () => {
  it("show only the shape under the pointer, details included", () => {
    const options: ChartOptions = {
      xAxis: { type: "category", categories: ["a", "b"] },
      tooltip: { mode: "item" },
      series: [
        {
          type: "bar",
          name: "Sales",
          data: [
            { x: "a", y: 10, details: [{ name: "Owner", value: "Ada" }] },
            { x: "b", y: 4 },
          ],
        },
        { type: "line", name: "Target", data: [8, 8] },
        { type: "bar", name: "Hidden", tooltip: false, data: [3, 3] },
      ],
    };
    const { model: m, scales, xTicks, yTicks } = layout(options);
    const p = toScreen(scales, 0, 2);
    const hit = hitTest(m, scales, xTicks, p.x - 10, p.y)!;
    expect(hit.items.map((it) => it.seriesName)).toEqual(["Sales"]);
    expect(tooltipContent(m, hit, yTicks).rows).toEqual([
      expect.objectContaining({ name: "Sales", value: "10" }),
      { color: null, name: "Owner", value: "Ada" },
    ]);
    // near the line only
    const l = toScreen(scales, 1, 8);
    expect(hitTest(m, scales, xTicks, l.x, l.y - 3)?.items[0]?.seriesName).toBe(
      "Target",
    );
    // empty space
    const e = toScreen(scales, 1, 20);
    expect(hitTest(m, scales, xTicks, e.x - 10, e.y)).toBeNull();
    // the series without tooltip is not in axis tooltips either
    const axis = layout({ ...options, tooltip: { mode: "axis" } });
    const a = toScreen(axis.scales, 0, 2);
    expect(
      hitTest(axis.model, axis.scales, axis.xTicks, a.x, a.y)!.items.map(
        (it) => it.seriesName,
      ),
    ).toEqual(["Sales", "Target"]);
  });

  it("list the details of scatter points and heatmap cells", () => {
    const scatter = layout({
      series: [
        {
          type: "scatter",
          name: "P",
          data: [{ x: 1, y: 2, details: [{ name: "Team", value: "Core" }] }],
        },
      ],
    });
    const p = toScreen(scatter.scales, 1, 2);
    const hit = hitTest(
      scatter.model,
      scatter.scales,
      scatter.xTicks,
      p.x,
      p.y,
    )!;
    expect(
      tooltipContent(scatter.model, hit, scatter.yTicks).rows.pop(),
    ).toEqual({ color: null, name: "Team", value: "Core" });
    const dots = layout({
      xAxis: { type: "category", categories: ["m"] },
      series: [
        {
          type: "scatter",
          name: "D",
          data: [{ x: "m", y: 3, details: [{ name: "Due", value: "Fri" }] }],
        },
      ],
    });
    const q = toScreen(dots.scales, 0, 3);
    const rows = tooltipContent(
      dots.model,
      hitTest(dots.model, dots.scales, dots.xTicks, q.x, q.y)!,
      dots.yTicks,
    ).rows;
    expect(rows.pop()).toEqual({ color: null, name: "Due", value: "Fri" });
    const cells = layout({
      series: [
        {
          type: "heatmap",
          data: [
            { x: "a", y: "b", value: 1, details: [{ name: "n", value: "v" }] },
          ],
        },
      ],
    });
    const c = toScreen(cells.scales, 0, 0);
    expect(
      tooltipContent(
        cells.model,
        hitTest(cells.model, cells.scales, cells.xTicks, c.x, c.y)!,
        cells.yTicks,
      ).rows[1],
    ).toEqual({ color: null, name: "n", value: "v" });
  });
});

// ------------------------------------------------- controller and Canvas2D

/** 2D context double recording the calls */
const fakeContext = (gradients = true) => {
  const calls: { name: string; args: unknown[] }[] = [];
  const state: Record<string, unknown> = {};
  const ctx = new Proxy(state, {
    get(target, key: string) {
      if (key in target) return target[key];
      if (key === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      if (key === "createLinearGradient")
        return gradients ? () => ({ addColorStop() {} }) : undefined;
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

const fakeCanvas = (gradients = true) => {
  const { ctx, calls } = fakeContext(gradients);
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

describe("controller and Canvas2D", () => {
  it("lays out the color legend with the hovered value", () => {
    for (const position of ["top", "bottom"] as const) {
      const ctrl = createChartController({
        options: { ...heatmap(), legend: { position } },
        measureText: measure,
      });
      ctrl.setSize(400, 300);
      const scene = ctrl.getScene()!;
      const colors = scene.legend!.colors!;
      expect(scene.legend!.entries).toEqual([]);
      expect(colors.stops).toHaveLength(12);
      expect(colors.caret).toBeNull();
      expect(colors.bar.y < 150).toBe(position === "top");
      const cell = ctrl.toPixel(1, 1)!;
      ctrl.pointerMove(cell.x, cell.y);
      const hovered = ctrl.getScene()!;
      const caret = hovered.legend!.colors!.caret!;
      expect(caret).toBeCloseTo(colors.bar.x + colors.bar.width);
      expect(hovered.hover!.marks.map((mk) => mk.kind)).toEqual([
        "guide",
        "guide",
        "cell",
      ]);
      ctrl.destroy();
    }
  });

  it("lays the tooltip out in a label and a value column", () => {
    const ctrl = createChartController({
      options: {
        locale: "en",
        orientation: "horizontal",
        xAxis: { type: "category", categories: ["Design"] },
        yAxis: { type: "time", timeZone: "utc" },
        series: [
          {
            type: "bar",
            name: "Phase",
            data: [
              {
                x: "Design",
                y0: Date.UTC(2026, 0, 1),
                y: Date.UTC(2026, 0, 29),
                details: [{ name: "Progress", value: "35%" }],
              },
            ],
          },
        ],
      },
      measureText: measure,
    });
    ctrl.setSize(400, 200);
    const p = ctrl.toPixel(0, Date.UTC(2026, 0, 10))!;
    ctrl.pointerMove(p.x, p.y);
    const tip = ctrl.getScene()!.hover!.tooltip!;
    expect(tip.content.subtitle).toBe("Phase");
    expect(tip.swatchWidth).toBe(0);
    // title, subtitle and 4 rows
    expect(tip.box.height).toBe(6 * tip.lineHeight + tip.padding * 2);
    expect(tip.content.rows.map((r) => r.value)).toContain("4 weeks");
    ctrl.destroy();
  });

  it("draws the color legend, lifted cells, connectors and tooltips", () => {
    for (const gradients of [true, false]) {
      const { canvas, calls, flush } = fakeCanvas(gradients);
      const chart = createCanvasChart({
        canvas,
        width: 400,
        height: 300,
        options: heatmap({ colorScale: "diverging" }),
      });
      flush();
      const cell = chart.toPixel(1, 1)!;
      chart.pointerMove(cell.x, cell.y);
      flush();
      // the ramp (a gradient or even steps), the mid tick, the caret ring
      expect(calls.some((c) => c.name === "fillRect")).toBe(true);
      expect(calls.filter((c) => c.name === "stroke").length).toBeGreaterThan(
        1,
      );
      expect(
        calls.some((c) => c.name === "fillText" && c.args[0] === "8"),
      ).toBe(true);
      chart.destroy();
    }
    const { canvas, calls, flush } = fakeCanvas();
    const chart = createCanvasChart({
      canvas,
      width: 400,
      height: 300,
      options: {
        series: [
          waterfallSeries([
            { label: "a", value: 3 },
            { label: "b", value: 2 },
          ]),
        ],
      },
    });
    flush();
    expect(calls.some((c) => c.name === "setLineDash")).toBe(true);
    // a Gantt-like tooltip: its subtitle is written
    const gantt = createCanvasChart({
      canvas,
      width: 400,
      height: 200,
      options: {
        locale: "en",
        orientation: "horizontal",
        xAxis: { type: "category", categories: ["T"] },
        yAxis: { type: "time" },
        series: [
          {
            type: "bar",
            name: "Group",
            data: [{ x: "T", y0: 0, y: 86_400_000 }],
          },
        ],
      },
    });
    flush();
    const p = gantt.toPixel(0, 43_200_000)!;
    gantt.pointerMove(p.x, p.y);
    flush();
    expect(
      calls.some((c) => c.name === "fillText" && c.args[0] === "Group"),
    ).toBe(true);
    chart.destroy();
    gantt.destroy();
  });

  it("draws hollow and filled dots of the shape primitives", () => {
    const { ctx, calls } = fakeContext();
    drawPrimitives(
      ctx as unknown as CanvasRenderingContext2D,
      [
        {
          kind: "dots",
          seriesIndex: 0,
          opacity: 0,
          dots: [10, 10, 8],
          colors: ["red"],
          stroke: 1.25,
        },
        {
          kind: "dots",
          seriesIndex: 0,
          opacity: 1,
          dots: [5, 5, 6],
          colors: [],
        },
      ],
      { x: 0, y: 0, width: 100, height: 100 },
    );
    expect(calls.filter((c) => c.name === "stroke")).toHaveLength(1);
    expect(calls.filter((c) => c.name === "fill")).toHaveLength(1);
  });
});

// ------------------------------------------------------------ DOM chart

describe("DOM chart", () => {
  const WIDTH = 600;
  const HEIGHT = 300;
  let container: HTMLDivElement;
  let chart: ChartInstance | null = null;

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

  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(
      WIDTH,
    );
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(
      HEIGHT,
    );
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    chart?.destroy();
    chart = null;
    container.remove();
    vi.restoreAllMocks();
  });

  it("shows the color legend of heatmaps with a caret on the hovered value", async () => {
    const c = await mount(heatmap({ colorScale: "diverging" }));
    const legend = container.querySelector<HTMLElement>(
      ".minerva-chart-legend",
    )!;
    expect(legend.style.display).toBe("flex");
    expect(legend.textContent).toContain("-4");
    expect(legend.textContent).toContain("8");
    expect(legend.innerHTML).toContain("linear-gradient");
    const p = c.toPixel(0, 0)!;
    move(p.x, p.y);
    const tooltip = container.querySelector<HTMLElement>(
      ".minerva-chart-tooltip",
    )!;
    expect(tooltip.style.display).toBe("block");
    expect(tooltip.textContent).toContain("Load");
    // the caret sits at -4: the left end
    const caret = [...legend.querySelectorAll<HTMLElement>("div")].find(
      (el) => el.style.width === "4px",
    )!;
    expect(caret.style.display).toBe("block");
    expect(caret.style.left).toBe("0.00%");
    // the lifted cell has a ring inside its edge
    const lifted = [...container.querySelectorAll<HTMLElement>("div")].find(
      (el) => el.style.transform === "scale(1.12)",
    );
    expect(lifted?.style.boxShadow).toContain("rgba");
    // moving away hides the caret
    move(1, 1);
    expect(caret.style.display).toBe("none");
  });

  it("writes the tooltip in a grid with a subtitle and log axes map pixels", async () => {
    const c = await mount({
      locale: "en",
      orientation: "horizontal",
      xAxis: { type: "category", categories: ["T"] },
      yAxis: { type: "time", timeZone: "utc" },
      series: [
        {
          type: "bar",
          name: "Group",
          data: [{ x: "T", y0: 0, y: 2 * 86_400_000 }],
        },
      ],
    });
    const p = c.toPixel(0, 86_400_000)!;
    move(p.x, p.y);
    const tooltip = container.querySelector<HTMLElement>(
      ".minerva-chart-tooltip",
    )!;
    expect(tooltip.textContent).toContain("2 days");
    const grid = [...tooltip.querySelectorAll<HTMLElement>("div")].find(
      (el) => el.style.display === "grid",
    )!;
    expect(grid.style.gridTemplateColumns).toBe("minmax(0, 1fr) auto");
    chart?.destroy();
    const log = await mount({
      yAxis: { type: "log" },
      series: [{ data: [1, 10, 100] }],
      annotations: [{ type: "line", axis: "y", value: 10 }],
    });
    const q = log.toPixel(1, 10)!;
    expect(log.fromPixel(q.x, q.y)!.y).toBeCloseTo(10);
  });
});
