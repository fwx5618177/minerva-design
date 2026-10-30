import { describe, expect, it } from "vitest";
import { createCanvasChart, type ChartCanvas } from "./canvas";
import { createChartController, scenePrimitives } from "./controller";
import { buildItems } from "./items";
import { axisTicks } from "./axis";
import { formatCompact, formatValue, tickFormatter } from "./format";
import { createScales, toData, toScreen } from "./layout";
import { rectOf } from "./overlay";
import { alignedDomain, buildModel, type DataCache } from "./model";
import {
  binValues,
  boxplotData,
  boxplotStats,
  bubbleSeries,
  ganttSeries,
  histogramSeries,
  quantiles,
  waterfallSeries,
} from "./presets";
import type { BarItem } from "./renderers/types";
import {
  collectPointLabels,
  hitTest,
  hoverMarks,
  layoutChart,
  tooltipContent,
} from "./scene";
import { createTheme } from "./theme";
import { formatTime, timeTicks } from "./time";
import type { ChartOptions } from "./types";

const theme = createTheme();
const measure = (text: string) => text.length * 6;
const model = (options: ChartOptions) =>
  buildModel(options, theme, new Set(), new Map() as DataCache);
const layout = (options: ChartOptions, width = 400, height = 300) => {
  const m = model(options);
  return {
    model: m,
    ...layoutChart({
      model: m,
      view: { x: [...m.base.x], y: [...m.base.y] },
      theme,
      width,
      height,
      measure,
    }),
  };
};

describe("horizontal orientation", () => {
  const options: ChartOptions = {
    orientation: "horizontal",
    series: [
      {
        type: "bar",
        name: "Score",
        showLabels: true,
        data: [
          ["Alpha", 30],
          ["Beta", -10],
          ["Gamma", 20],
        ],
      },
    ],
  };

  it("maps x down the left side and the values to the right", () => {
    const { scales, plot, xTicks } = layout(options);
    expect(scales.horizontal).toBe(true);
    // first category at the top
    const a = toScreen(scales, 0, 0);
    const c = toScreen(scales, 2, 0);
    expect(a.y).toBeLessThan(c.y);
    expect(a.x).toBe(c.x);
    const right = toScreen(scales, 0, 30);
    expect(right.x).toBeGreaterThan(a.x);
    expect(right.x).toBeLessThanOrEqual(plot.x + plot.width + 0.001);
    const back = toData(scales, right.x, right.y);
    expect(back.x).toBeCloseTo(0);
    expect(back.y).toBeCloseTo(30);
    expect(xTicks.labels).toEqual(["Alpha", "Beta", "Gamma"]);
    // room for the longest category name on the left
    expect(plot.x).toBeGreaterThanOrEqual(measure("Gamma") + 8);
  });

  it("hit tests the bar under the pointer and draws a horizontal band", () => {
    const { model: m, scales, xTicks } = layout(options);
    const p = toScreen(scales, 2, 10);
    const hit = hitTest(m, scales, xTicks, p.x, p.y);
    expect(hit?.items[0]?.index).toBe(2);
    expect(hit?.xLabel).toBe("Gamma");
    const band = hoverMarks(m, scales, hit!)[0];
    expect(band?.kind).toBe("band");
    if (band?.kind === "band") {
      expect(band.width).toBe(scales.plot.width);
      expect(band.height).toBeLessThan(scales.plot.height / 2);
    }
  });

  it("puts value labels after positive bars and before negative ones", () => {
    const { model: m, scales, yTicks } = layout(options);
    const labels = collectPointLabels(m, scales.view, scales, yTicks);
    expect(labels.map((l) => l.placement)).toEqual(["right", "left", "right"]);
  });

  it("draws the data of mini-program charts as shapes", () => {
    const calls: string[] = [];
    const ctx = new Proxy(
      {},
      {
        get: (_t, key: string) =>
          key === "measureText"
            ? (text: string) => ({ width: text.length * 6 })
            : (...args: unknown[]) => {
                calls.push(`${key}:${args.length}`);
              },
        set: () => true,
      },
    );
    const frames: (() => void)[] = [];
    const canvas: ChartCanvas = {
      width: 0,
      height: 0,
      getContext: () => ctx,
      requestAnimationFrame: (cb) => frames.push(cb),
    };
    const chart = createCanvasChart({
      canvas,
      width: 300,
      height: 200,
      options,
    });
    chart.render();
    // three bars, as rounded rects (fill) or rects
    expect(calls.filter((c) => c === "fill:0").length).toBeGreaterThanOrEqual(
      3,
    );
    chart.destroy();
  });

  it("gives screen-space primitives (bars grow along x)", () => {
    const controller = createChartController({
      options,
      measureText: measure,
    });
    controller.setSize(400, 300);
    const scene = controller.getScene()!;
    const bars = scenePrimitives(scene).find((p) => p.kind === "bars");
    expect(bars?.kind).toBe("bars");
    if (bars?.kind === "bars") {
      const [, , w0, h0] = bars.rects;
      expect(w0).toBeGreaterThan(h0!);
    }
    // the guide line of horizontal charts is horizontal
    const p = toScreen(scene.layout.scales, 0, 10);
    controller.pointerMove(p.x, p.y);
    expect(controller.getScene()?.hover?.crosshairX).toBeNull();
  });
});

describe("floating bars and range areas", () => {
  it("draws bars from their starts, unstacked, rounded", () => {
    const m = model({
      series: [
        {
          type: "bar",
          stack: "s",
          data: [
            { x: "a", y0: 10, y: 20 },
            { x: "b", y0: 20, y: 15 },
          ],
        },
        { type: "bar", stack: "s", data: [{ x: "a", y0: 10, y: 14 }] },
      ],
    });
    const s = m.series[0]!;
    expect(s.floating).toBe(true);
    expect([...s.barBase!]).toEqual([10, 20]);
    expect([...s.barTop!]).toEqual([20, 15]);
    // no zero forced on the value axis
    expect(m.base.y[0]).toBeGreaterThan(0);
    const items = buildItems(m, { x: 0, y: 0 }, 1) as BarItem[];
    expect(items.every((it) => it.radius > 0)).toBe(true);
    // both series share one slot
    expect(m.series[0]!.barOffset).toBe(m.series[1]!.barOffset);
  });

  it("fills range areas between their edges with a line on each", () => {
    const m = model({
      series: [
        {
          type: "area",
          data: [
            { x: 0, y0: 1, y: 3 },
            { x: 1, y0: 2, y: 5 },
          ],
        },
      ],
    });
    expect(m.series[0]!.stackBase).toBe(m.series[0]!.cols.y0);
    expect(m.base.y[0]).toBeLessThanOrEqual(1);
    const items = buildItems(m, { x: 0, y: 0 }, 1);
    expect(items.map((i) => i.kind)).toEqual(["area", "line", "line"]);
  });

  it("shows both ends of ranges and the change of steps in the tooltip", () => {
    const options: ChartOptions = {
      series: [
        { type: "area", name: "Band", data: [{ x: 0, y0: 1, y: 3 }] },
        { type: "bar", name: "Step", data: [{ x: 0, y0: 5, y: 3 }] },
      ],
    };
    const { model: m, scales, xTicks, yTicks } = layout(options);
    const p = toScreen(scales, 0, 2);
    const hit = hitTest(m, scales, xTicks, p.x, p.y)!;
    const rows = tooltipContent(m, hit, yTicks).rows;
    expect(rows.map((r) => r.value)).toEqual(["1 – 3", "-2"]);
  });
});

describe("box plots", () => {
  const options: ChartOptions = {
    tooltip: { labels: { median: "Médiane" } },
    series: [
      {
        type: "boxplot",
        name: "Latency",
        data: [
          { x: "api", low: 2, q1: 4, y: 5, q3: 7, high: 10, outliers: [25] },
          { x: "web", low: 1, q1: 3, y: 4, q3: 6, high: 9 },
        ],
      },
    ],
  };

  it("includes the outliers in the range and builds the shapes", () => {
    const m = model(options);
    expect(m.base.y[1]).toBeGreaterThanOrEqual(25);
    const kinds = buildItems(m, { x: 0, y: 0 }, 1).map((i) => i.key);
    expect(kinds).toEqual([
      "#0:box",
      "#0:stems",
      "#0:caps",
      "#0:edges",
      "#0:median",
      "#0:outliers",
    ]);
  });

  it("hit tests a box and lists its statistics", () => {
    const { model: m, scales, xTicks, yTicks } = layout(options);
    const p = toScreen(scales, 0, 6);
    const hit = hitTest(m, scales, xTicks, p.x, p.y)!;
    expect(hit.items[0]).toMatchObject({ q1: 4, q3: 7, y: 5, outliers: 1 });
    const rows = tooltipContent(m, hit, yTicks).rows.map((r) => r.name);
    expect(rows).toEqual([
      "Latency",
      "Max",
      "Q3",
      "Médiane",
      "Q1",
      "Min",
      "Outliers",
    ]);
  });

  it("has primitives for the views of React Native", () => {
    const controller = createChartController({ options, measureText: measure });
    controller.setSize(400, 300);
    const prims = scenePrimitives(controller.getScene()!);
    expect(prims.map((p) => p.kind)).toEqual(["bars", "bars", "dots"]);
    expect(prims[0]?.kind === "bars" && prims[0].opacity).toBeCloseTo(0.22);
  });
});

describe("dual axis", () => {
  const options: ChartOptions = {
    yAxis2: { title: "Growth" },
    series: [
      {
        type: "bar",
        name: "Revenue",
        data: [
          ["Q1", 120],
          ["Q2", 180],
        ],
      },
      {
        type: "line",
        name: "Growth",
        yAxis: "right",
        data: [
          ["Q1", 0.05],
          ["Q2", 0.12],
        ],
      },
    ],
  };

  it("aligns the right range on the left ticks", () => {
    expect(alignedDomain(0, 37, [0, 100], 5)).toEqual([0, 50]);
    expect(alignedDomain(-3, 12, [0, 200], 5)).toEqual([-5, 15]);
  });

  it("maps the right series onto the left axis and keeps their values", () => {
    const { model: m, y2Ticks, yTicks, scales, xTicks } = layout(options);
    expect(m.y2?.title).toBe("Growth");
    const right = m.series[1]!;
    expect(right.raw.y[1]).toBe(0.12);
    expect(right.cols.y[1]).toBeGreaterThan(100);
    expect(y2Ticks?.values).toEqual(yTicks.values);
    expect(y2Ticks?.labels).toEqual(["0.04", "0.06", "0.08", "0.10", "0.12"]);
    const p = toScreen(scales, 1, 100);
    const hit = hitTest(m, scales, xTicks, p.x, p.y)!;
    expect(hit.items.map((it) => it.y)).toEqual([180, 0.12]);
    expect(tooltipContent(m, hit, yTicks, y2Ticks).rows[1]?.value).toBe("0.12");
  });

  it("leaves room for the right axis", () => {
    const without = layout({ series: options.series.slice(0, 1) });
    const withAxis = layout(options);
    expect(withAxis.plot.width).toBeLessThan(without.plot.width);
  });
});

describe("statistics presets", () => {
  it("bins values with nice edges", () => {
    const values = Float64Array.from({ length: 1000 }, (_, i) => i % 100);
    const bins = binValues(values, { bins: 10 });
    expect(bins.edges[0]).toBe(0);
    expect(bins.width).toBe(10);
    expect(bins.counts.reduce((a, b) => a + b, 0)).toBe(1000);
    expect(bins.total).toBe(1000);
    const sturges = binValues(values, { bins: "sturges", nice: false });
    expect(sturges.counts.length).toBe(11);
    const fd = binValues(values);
    expect(fd.counts.length).toBeGreaterThan(5);
    const series = histogramSeries(values, { bins: 10 });
    expect(series.barWidth).toBe(1);
    expect((series.data as unknown as { label: string }[])[0]?.label).toBe(
      "0 – 10",
    );
  });

  it("bins a million samples quickly", () => {
    const values = new Float64Array(1_000_000);
    for (let i = 0; i < values.length; i++) values[i] = Math.sin(i) * 100;
    const t = performance.now();
    const bins = binValues(values);
    expect(performance.now() - t).toBeLessThan(500);
    expect(bins.total).toBe(values.length);
  });

  it("computes quantiles, quartiles and outliers", () => {
    expect(quantiles([1, 2, 3, 4], [0, 0.5, 1])).toEqual([1, 2.5, 4]);
    const stats = boxplotStats([1, 2, 3, 4, 5, 6, 7, 8, 100]);
    expect(stats.median).toBe(5);
    expect(stats.q1).toBe(3);
    expect(stats.q3).toBe(7);
    expect(stats.outliers).toEqual([100]);
    expect(stats.high).toBe(8);
    expect(boxplotStats([1, 100], { whisker: "minmax" }).outliers).toEqual([]);
    expect(boxplotData([{ x: "a", values: [1, 2, 3] }])[0]).toMatchObject({
      x: "a",
      y: 2,
    });
  });

  it("builds waterfalls with running totals", () => {
    const series = waterfallSeries([
      { label: "Revenue", value: 100 },
      { label: "Costs", value: -30 },
      { label: "Gross", kind: "subtotal" },
      { label: "Tax", value: -20 },
      { label: "Net", kind: "total" },
    ]);
    const data = series.data as { y0?: number; y: number }[];
    expect(data.map((d) => [d.y0, d.y])).toEqual([
      [0, 100],
      [100, 70],
      [undefined, 70],
      [70, 50],
      [undefined, 50],
    ]);
  });

  it("sizes bubbles by area", () => {
    const [s] = bubbleSeries(
      [
        {
          data: [
            { x: 0, y: 0, value: 25 },
            { x: 1, y: 1, value: 100 },
          ],
        },
      ],
      { minSize: 2, maxSize: 40 },
    );
    const data = s!.data as unknown as { size: number; value: number }[];
    // the largest first, diameters proportional to the square roots
    expect(data.map((d) => d.size)).toEqual([40, 20]);
    expect(s!.type).toBe("scatter");
  });

  it("builds Gantt series per group with progress and milestones", () => {
    const gantt = ganttSeries([
      { name: "Design", start: 0, end: 10, progress: 0.5, group: "A" },
      { name: "Build", start: 10, end: 30, group: "B" },
      { name: "Launch", start: 30, milestone: true },
    ]);
    expect(gantt.categories).toEqual(["Design", "Build", "Launch"]);
    expect(gantt.series.map((s) => s.name)).toEqual([
      "A",
      "B",
      "Progress",
      "Milestones",
    ]);
    const progress = gantt.series[2]!.data as { y0: number; y: number }[];
    expect(progress[0]).toMatchObject({ y0: 0, y: 5 });
    const m = model({
      orientation: "horizontal",
      xAxis: { type: "category", categories: gantt.categories },
      yAxis: { type: "time" },
      series: gantt.series,
    });
    expect(m.base.y).toEqual([0, 30]);
  });
});

describe("scales", () => {
  it("round-trips pixels of horizontal and reversed axes", () => {
    const plot = { x: 10, y: 20, width: 200, height: 100 };
    const view = {
      x: [0, 10] as [number, number],
      y: [0, 50] as [number, number],
    };
    for (const horizontal of [false, true]) {
      for (const reverse of [false, true]) {
        const sc = createScales(plot, view, reverse, !reverse, horizontal);
        const p = toScreen(sc, 3, 20);
        const d = toData(sc, p.x, p.y);
        expect(d.x).toBeCloseTo(3);
        expect(d.y).toBeCloseTo(20);
      }
    }
  });
});

describe("rect annotations with open edges", () => {
  const plot = { x: 40, y: 10, width: 300, height: 200 };
  const view = {
    x: [0, 10] as [number, number],
    y: [0, 100] as [number, number],
  };

  it.each([false, true])(
    "fills x bands, y bands and open rects (horizontal: %s)",
    (horizontal) => {
      for (const reverse of [false, true]) {
        const s = createScales(plot, view, reverse, reverse, horizontal);
        const xBand = rectOf({ type: "rect", x0: 2, x1: 4 } as never, s);
        const yBand = rectOf({ type: "rect", y0: 20, y1: 60 } as never, s);
        const open = rectOf({ type: "rect", x0: 5 } as never, s);
        for (const r of [xBand, yBand, open]) {
          expect(Number.isFinite(r.width) && r.width > 0).toBe(true);
          expect(Number.isFinite(r.height) && r.height > 0).toBe(true);
          expect(r.x).toBeGreaterThanOrEqual(plot.x);
          expect(r.y).toBeGreaterThanOrEqual(plot.y);
          expect(r.x + r.width).toBeLessThanOrEqual(plot.x + plot.width);
          expect(r.y + r.height).toBeLessThanOrEqual(plot.y + plot.height);
        }
        // the band spans the whole plot across its axis
        const across = horizontal ? xBand.width : xBand.height;
        expect(across).toBe(horizontal ? plot.width : plot.height);
        expect(horizontal ? xBand.height : xBand.width).toBeCloseTo(
          (horizontal ? plot.height : plot.width) / 5,
        );
        // half-open: from x = 5 to the end of the axis
        expect(horizontal ? open.height : open.width).toBeCloseTo(
          (horizontal ? plot.height : plot.width) / 2,
        );
      }
    },
  );

  it("leaves out rects outside the view", () => {
    const s = createScales(plot, view, false, false);
    const r = rectOf({ type: "rect", x0: 20, x1: 30 } as never, s);
    expect(r.width).toBe(0);
  });

  it("fills open bands in the mini-program canvas", () => {
    const fills: number[][] = [];
    const ctx = new Proxy(
      {},
      {
        get: (_t, key: string) =>
          key === "measureText"
            ? (text: string) => ({ width: text.length * 6 })
            : key === "fillRect"
              ? (...args: number[]) => {
                  fills.push(args);
                }
              : () => undefined,
        set: () => true,
      },
    );
    const canvas: ChartCanvas = {
      width: 0,
      height: 0,
      getContext: () => ctx,
      requestAnimationFrame: () => 0,
    };
    const chart = createCanvasChart({
      canvas,
      width: 300,
      height: 200,
      options: {
        series: [{ data: [1, 3, 2, 5] }],
        annotations: [
          { type: "rect", x0: 1, x1: 2, color: "#f00" },
          { type: "rect", y0: 2, y1: 3, color: "#00f" },
        ],
      },
    });
    chart.render();
    const bands = fills.filter(
      (f) => f.length === 4 && f.every(Number.isFinite) && f[2]! > 0,
    );
    expect(bands.length).toBeGreaterThanOrEqual(2);
    chart.destroy();
  });
});

describe("locale", () => {
  const series = [{ name: "a", data: [1, 2] }];

  it("keeps the historical output without a locale", () => {
    expect(formatCompact(1234567)).toBe("1.23M");
    expect(formatCompact(1234567, 1)).toBe("1.2M");
    expect(formatValue(1234)).toBe("1,234");
    expect(tickFormatter(5000, 40000)(25000)).toBe("25k");
  });

  it("uses the compact units and separators of the language", () => {
    expect(formatCompact(1234567, 2, "en")).toBe("1.23M");
    expect(formatCompact(1234567, 2, "zh-CN")).toBe("123.46万");
    expect(formatCompact(3e8, 2, "zh-CN")).toBe("3亿");
    expect(formatCompact(3e8, 2, "ja")).toBe("3億");
    expect(formatCompact(1500, 2, "fr-FR")).toMatch(/^1,5\s?k$/);
    expect(formatCompact(2e9, 2, "fr")).toMatch(/^2\s?Md$/);
    expect(tickFormatter(5000, 40000, "zh")(25000)).toBe("2.5万");
    expect(tickFormatter(0.5, 3, "fr")(1.5)).toBe("1,5");
    expect(tickFormatter(1, 3, "fr")(-0)).toBe("0");
    expect(formatValue(1234.5, "de")).toBe("1.234,5");
    expect(formatValue(1234, "zh")).toBe("1,234");
  });

  it("formats time ticks and tooltips with Intl and a time zone", () => {
    const t = Date.UTC(2026, 4, 6, 9, 3, 7);
    expect(formatTime(t, "day", "en-US", "utc")).toBe("Wed, May 6, 2026");
    expect(formatTime(t, "second", undefined, "utc")).toBe(
      "2026-05-06 09:03:07",
    );
    expect(formatTime(t, "day", "zh-CN", "utc")).toContain("2026年5月6日");
    expect(formatTime(t, "day", "fr-FR", "utc")).toContain("mai");
    // UTC days start on UTC midnights
    const days = timeTicks(
      Date.UTC(2026, 0, 1, 7),
      Date.UTC(2026, 0, 10, 7),
      5,
      "en",
      "utc",
    );
    expect(days.unit).toBe("day");
    for (const v of days.values) expect(new Date(v).getUTCHours()).toBe(0);
    expect(days.format(Date.UTC(2026, 0, 4))).toBe("Jan 4");
    const months = timeTicks(
      Date.UTC(2025, 0, 1),
      Date.UTC(2026, 0, 1),
      6,
      "fr",
      "utc",
    );
    expect(months.format(Date.UTC(2025, 2, 1))).toBe("mars");
    expect(months.format(Date.UTC(2026, 0, 1))).toBe("2026");
  });

  it("threads the locale and the time zone through the model", () => {
    const m = model({
      series: [
        {
          data: [
            { x: Date.UTC(2026, 0, 1), y: 12000 },
            { x: Date.UTC(2026, 0, 9), y: 50000 },
          ],
        },
      ],
      xAxis: { type: "time", timeZone: "utc" },
      locale: "zh-CN",
    });
    expect(m.locale).toBe("zh-CN");
    expect(m.series[0]?.name).toBe("系列 1");
    expect(m.x.timeZone).toBe("utc");
    const y = axisTicks(m.y, [0, 50000], 5);
    expect(y.labels).toContain("2万");
    const x = axisTicks(m.x, m.base.x, 5);
    for (const v of x.values) expect(new Date(v).getUTCHours()).toBe(0);
    expect(x.labels.some((l) => l.includes("月"))).toBe(true);
  });

  it("translates the tooltip rows; labels and tooltip.labels override", () => {
    const options: ChartOptions = {
      series: [
        {
          type: "boxplot",
          name: "api",
          data: [{ x: "a", low: 1, q1: 2, y: 3, q3: 4, high: 5 }],
        },
      ],
      locale: "fr",
    };
    const { model: m, yTicks } = layout(options);
    const hit = {
      x: 0,
      xLabel: "a",
      items: [
        {
          seriesIndex: 0,
          seriesId: "0",
          seriesName: "api",
          index: 0,
          x: 0,
          y: 3,
          low: 1,
          q1: 2,
          q3: 4,
          high: 5,
          color: "#000",
        },
      ],
    };
    const names = tooltipContent(m, hit as never, yTicks).rows.map(
      (r) => r.name,
    );
    expect(names).toContain("Médiane");
    const custom = model({
      ...options,
      labels: { median: "P50" },
      tooltip: { labels: { median: "ignored", max: "Top" } },
    });
    const rows = tooltipContent(custom, hit as never, yTicks).rows.map(
      (r) => r.name,
    );
    expect(rows).toContain("P50");
    expect(rows).toContain("Top");
    expect(rows).toContain("Q1");
  });

  it("follows the page language when no locale is set", () => {
    const root = (globalThis as { document?: Document }).document;
    if (!root) {
      expect(model({ series, locale: "ja" }).labels.chart).toBe("グラフ");
      return;
    }
    const before = root.documentElement.lang;
    root.documentElement.lang = "ja";
    expect(model({ series }).labels.chart).toBe("グラフ");
    root.documentElement.lang = "fr";
    expect(model({ series }).labels.chart).toBe("Graphique");
    root.documentElement.lang = before;
  });
});
