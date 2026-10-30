import { describe, expect, it } from "vitest";
import { axisTicks } from "./axis";
import { packColor, parseColor, toCss, toHex } from "./color";
import {
  collectCategories,
  lowerBound,
  nearestIndex,
  normalizeData,
  xResolver,
} from "./data";
import { decimateMinMax } from "./decimate";
import { formatCompact, formatValue, tickFormatter } from "./format";
import { buildItems } from "./items";
import { computePlot, createScales } from "./layout";
import { buildModel, detectXType, gridOf, type DataCache } from "./model";
import { drawBackground, placeLabels } from "./overlay";
import { rendererCandidates } from "./renderers/detect";
import { instanceRange, visibleX } from "./renderers/range";
import { GAP } from "./renderers/types";
import {
  ensureSpan,
  linearTicks,
  niceDomain,
  stepDecimals,
  tickStep,
} from "./scale";
import { GridIndex } from "./spatial";
import type { ChartTheme } from "./theme";
import { formatTime, timeTicks } from "./time";
import {
  clampRange,
  panRange,
  sameRange,
  wheelFactor,
  zoomRange,
} from "./viewport";

const theme: ChartTheme = {
  palette: [
    [1, 0, 0, 1],
    [0, 1, 0, 1],
  ],
  text: [0, 0, 0, 1],
  textMuted: [0.4, 0.4, 0.4, 1],
  grid: [0.9, 0.9, 0.9, 1],
  axis: [0.8, 0.8, 0.8, 1],
  background: [1, 1, 1, 1],
  surface: [1, 1, 1, 1],
  primary: [1, 0, 0, 1],
  fontFamily: "sans-serif",
  fontSize: 11,
};

const linear = xResolver("linear", () => NaN);

describe("scale", () => {
  it("picks 1-2-5 steps", () => {
    expect(tickStep(0, 10, 5)).toBe(2);
    expect(tickStep(0, 100, 10)).toBe(10);
    expect(tickStep(0, 1, 4)).toBe(0.2);
    expect(tickStep(5, 5, 5)).toBe(0);
  });

  it("generates ticks without float noise", () => {
    expect(linearTicks(0, 1, 5)).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1]);
    expect(linearTicks(0.1, 0.35, 5)).toEqual([
      0.1, 0.15, 0.2, 0.25, 0.3, 0.35,
    ]);
    expect(linearTicks(10, 0, 2)).toEqual([0, 5, 10]);
  });

  it("extends ranges to ticks", () => {
    expect(niceDomain(0.3, 9.6, 5)).toEqual([0, 10]);
    expect(niceDomain(-3, 47, 5)).toEqual([-10, 50]);
  });

  it("gives degenerate ranges a span", () => {
    expect(ensureSpan(5, 5)).toEqual([4.5, 5.5]);
    expect(ensureSpan(0, 0)).toEqual([-1, 1]);
    expect(ensureSpan(Infinity, -Infinity)).toEqual([0, 1]);
    expect(ensureSpan(3, 1)).toEqual([1, 3]);
  });

  it("counts the decimals of a step", () => {
    expect(stepDecimals(0.25)).toBe(1);
    expect(stepDecimals(0.05)).toBe(2);
    expect(stepDecimals(10)).toBe(0);
  });
});

describe("format", () => {
  it("formats compact numbers", () => {
    expect(formatCompact(1234567)).toBe("1.23M");
    expect(formatCompact(1500)).toBe("1.5k");
    expect(formatCompact(-2e9)).toBe("-2B");
    expect(formatCompact(0.5)).toBe("0.5");
    expect(formatCompact(-0)).toBe("0");
  });

  it("formats ticks consistently", () => {
    const f = tickFormatter(0.5, 3);
    expect([0, 0.5, 1].map(f)).toEqual(["0.0", "0.5", "1.0"]);
    expect(tickFormatter(5000, 40000)(25000)).toBe("25k");
    expect(tickFormatter(1, 3)(-0)).toBe("0");
  });

  it("formats tooltip values", () => {
    expect(formatValue(1234)).toBe("1,234");
    expect(formatValue(3.14159)).toBe("3.142");
    expect(formatValue(2.5e7)).toBe("25M");
    expect(formatValue(NaN)).toBe("–");
  });
});

describe("time", () => {
  it("aligns daily ticks on midnight", () => {
    const start = new Date(2026, 0, 1, 7).getTime();
    const end = new Date(2026, 0, 10, 7).getTime();
    const ticks = timeTicks(start, end, 5);
    expect(ticks.unit).toBe("day");
    for (const v of ticks.values) {
      const d = new Date(v);
      expect(d.getHours()).toBe(0);
      expect(v).toBeGreaterThanOrEqual(start);
      expect(v).toBeLessThanOrEqual(end);
    }
    expect(ticks.format(new Date(2026, 0, 4).getTime())).toBe("01-04");
  });

  it("uses months and years for long ranges", () => {
    const months = timeTicks(
      new Date(2025, 0, 1).getTime(),
      new Date(2026, 0, 1).getTime(),
      6,
    );
    expect(months.unit).toBe("month");
    expect(months.format(new Date(2026, 0, 1).getTime())).toBe("2026");
    const years = timeTicks(
      new Date(2000, 0, 1).getTime(),
      new Date(2030, 0, 1).getTime(),
      6,
    );
    expect(years.unit).toBe("year");
    expect(new Date(years.values[0]).getFullYear() % 5).toBe(0);
  });

  it("formats full timestamps", () => {
    const t = new Date(2026, 4, 6, 9, 3, 7).getTime();
    expect(formatTime(t, "second")).toBe("2026-05-06 09:03:07");
    expect(formatTime(t, "day")).toBe("2026-05-06");
    expect(formatTime(NaN)).toBe("–");
  });

  it("falls back to numeric ticks below a second", () => {
    const ticks = timeTicks(1000, 1500, 5);
    expect(ticks.unit).toBe("millisecond");
    expect(ticks.values[0]).toBe(1000);
  });
});

describe("color", () => {
  it("parses computed color syntaxes", () => {
    expect(parseColor("#f00")).toEqual([1, 0, 0, 1]);
    expect(parseColor("#00ff0080")?.[3]).toBeCloseTo(128 / 255);
    expect(parseColor("rgb(255, 0, 0)")).toEqual([1, 0, 0, 1]);
    expect(parseColor("rgba(0, 0, 255, 0.5)")).toEqual([0, 0, 1, 0.5]);
    expect(parseColor("rgb(0 128 255 / 50%)")?.[3]).toBe(0.5);
    expect(parseColor("color(srgb 1 0.5 0)")).toEqual([1, 0.5, 0, 1]);
    expect(parseColor("transparent")).toEqual([0, 0, 0, 0]);
    expect(parseColor("oklch(0.6 0.2 30)")).toBeNull();
    expect(parseColor("#zz")).toBeNull();
  });

  it("serializes colors", () => {
    expect(toCss([1, 0, 0, 1], 0.5)).toBe("rgba(255, 0, 0, 0.5)");
    expect(toHex([0, 0.5, 1, 1])).toBe("#0080ff");
    expect(packColor([1, 0, 0, 1])).toBe(0xff0000ff);
  });
});

describe("data", () => {
  it("normalizes every data form", () => {
    expect(Array.from(normalizeData([3, null, 5], linear).y)).toEqual([
      3,
      NaN,
      5,
    ]);
    const tuples = normalizeData(
      [
        [1, 2],
        [3, 4],
      ],
      linear,
    );
    expect(Array.from(tuples.x)).toEqual([1, 3]);
    const objects = normalizeData(
      [{ x: 2, y: 1, label: "a", size: 4, color: "red" }],
      linear,
    );
    expect(objects.labels).toEqual(["a"]);
    expect(objects.colors).toEqual(["red"]);
    expect(objects.size?.[0]).toBe(4);
    const columns = normalizeData(
      { x: new Float64Array([0, 1]), y: new Float32Array([5, 6]) },
      linear,
    );
    expect(columns.count).toBe(2);
    expect(columns.yMax).toBe(6);
  });

  it("tracks extents and order", () => {
    const sorted = normalizeData(
      [
        [0, 1],
        [1, 5],
        [2, -2],
      ],
      linear,
    );
    expect(sorted.sorted).toBe(true);
    expect([sorted.xMin, sorted.xMax, sorted.yMin, sorted.yMax]).toEqual([
      0, 2, -2, 5,
    ]);
    expect(
      normalizeData(
        [
          [2, 1],
          [1, 1],
        ],
        linear,
      ).sorted,
    ).toBe(false);
    const empty = normalizeData([], linear);
    expect(Number.isNaN(empty.xMin)).toBe(true);
  });

  it("resolves dates and categories", () => {
    const time = xResolver("time", () => NaN);
    expect(time(new Date(5), 0)).toBe(5);
    expect(time("1970-01-01T00:00:00.010Z", 0)).toBe(10);
    const categories = collectCategories([
      [
        { x: "a", y: 1 },
        { x: "b", y: 2 },
      ],
      [
        ["b", 3],
        ["c", 1],
      ],
    ]);
    expect(categories).toEqual(["a", "b", "c"]);
  });

  it("searches sorted x", () => {
    const x = [0, 1, 2, 3, 4];
    expect(lowerBound(x, 5, 2.5)).toBe(3);
    expect(nearestIndex(x, [1, 1, NaN, 1, 1], 5, 2.1)).toBe(3);
    expect(nearestIndex(x, [1, 1, NaN, 1, 1], 5, 1.9)).toBe(1);
    expect(nearestIndex(x, [1, 1, 1, 1, 1], 5, 9)).toBe(4);
    expect(nearestIndex([], [], 0, 1)).toBe(-1);
  });
});

describe("decimateMinMax", () => {
  it("keeps the extremes of each pixel column", () => {
    const n = 10000;
    const points = new Float64Array(n * 2);
    for (let i = 0; i < n; i++) {
      points[i * 2] = i;
      points[i * 2 + 1] = i === 5000 ? 100 : Math.sin(i);
    }
    const out = decimateMinMax(points, 0, n, (x) => x / 100);
    expect(out.length).toBeLessThanOrEqual(400);
    let max = -Infinity;
    for (let i = 0; i < out.length; i++)
      max = Math.max(max, out.points[i * 2 + 1]);
    expect(max).toBe(100);
  });

  it("keeps gaps", () => {
    const points = [0, 1, 1, NaN, 2, 3, 3, GAP];
    const out = decimateMinMax(points, 0, 4, (x) => x, GAP / 2);
    const ys = Array.from(out.points.slice(0, out.length * 2)).filter(
      (_, i) => i % 2 === 1,
    );
    expect(ys).toEqual([1, NaN, 3, NaN]);
  });
});

describe("GridIndex", () => {
  it("finds the points inside a box", () => {
    const n = 5000;
    const x = new Float64Array(n);
    const y = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      x[i] = (i * 7919) % 1000;
      y[i] = (i * 104729) % 1000;
    }
    const grid = new GridIndex(x, y, n);
    const found = new Set<number>();
    grid.query(100, 150, 200, 260, (i) => found.add(i));
    for (let i = 0; i < n; i++) {
      if (x[i] >= 100 && x[i] <= 150 && y[i] >= 200 && y[i] <= 260) {
        expect(found.has(i)).toBe(true);
      }
    }
    expect(found.size).toBeLessThan(n / 4);
  });

  it("skips missing values", () => {
    const grid = new GridIndex([NaN, 1], [1, NaN], 2);
    const found: number[] = [];
    grid.query(-10, 10, -10, 10, (i) => found.push(i));
    expect(found).toEqual([]);
  });
});

describe("viewport", () => {
  it("zooms around an anchor and clamps", () => {
    expect(zoomRange([0, 10], 5, 0.5)).toEqual([2.5, 7.5]);
    expect(clampRange([-5, 5], [0, 100], 1)).toEqual([0, 10]);
    expect(clampRange([0, 500], [0, 100], 1)).toEqual([0, 100]);
    expect(clampRange([50, 50], [0, 100], 2)).toEqual([49, 51]);
    expect(panRange([0, 10], 5)).toEqual([5, 15]);
    expect(sameRange([0, 1], [0, 1 + 1e-12])).toBe(true);
  });

  it("converts wheel deltas", () => {
    expect(wheelFactor(100, 0, false)).toBeGreaterThan(1);
    expect(wheelFactor(-100, 0, false)).toBeLessThan(1);
    expect(wheelFactor(-5, 0, true)).toBeLessThan(
      wheelFactor(-5, 0, false) + 0.01,
    );
    expect(wheelFactor(1e6, 0, false)).toBeCloseTo(Math.E);
  });
});

describe("layout", () => {
  it("maps data to pixels both ways", () => {
    const plot = { x: 10, y: 20, width: 100, height: 50 };
    const s = createScales(plot, { x: [0, 10], y: [0, 5] }, false, false);
    expect(s.xToPx(5)).toBe(60);
    expect(s.yToPx(0)).toBe(70);
    expect(s.pxToX(s.xToPx(3))).toBeCloseTo(3);
    const r = createScales(plot, { x: [0, 10], y: [0, 5] }, true, true);
    expect(r.xToPx(0)).toBe(110);
    expect(r.yToPx(0)).toBe(20);
    expect(r.pxToY(r.yToPx(2))).toBeCloseTo(2);
  });

  it("leaves room for the axes", () => {
    const plot = computePlot({
      width: 400,
      height: 300,
      padding: { top: 10, right: 10, bottom: 10, left: 10 },
      yLabelWidth: 30,
      xAxisVisible: true,
      xTitle: true,
      yTitle: false,
      fontSize: 10,
    });
    expect(plot.x).toBe(48);
    expect(plot.width).toBe(342);
    expect(plot.height).toBeLessThan(300 - 10 - 10 - 14);
  });
});

describe("axisTicks", () => {
  it("labels category axes with a step", () => {
    const axis = {
      type: "category" as const,
      reverse: false,
      categories: Array.from({ length: 20 }, (_, i) => `c${i}`),
      grid: false,
      visible: true,
    };
    const ticks = axisTicks(axis, [-0.5, 19.5], 5);
    expect(ticks.values).toEqual([0, 4, 8, 12, 16]);
    expect(ticks.labels[1]).toBe("c4");
    expect(ticks.formatValue(2.2)).toBe("c2");
  });

  it("uses the axis formatter", () => {
    const axis = {
      type: "linear" as const,
      reverse: false,
      categories: [],
      grid: true,
      visible: true,
      format: (v: number) => `${v}%`,
    };
    expect(axisTicks(axis, [0, 100], 2).labels).toEqual(["0%", "50%", "100%"]);
  });
});

describe("model", () => {
  it("detects the x axis type", () => {
    expect(detectXType([[{ x: new Date(), y: 1 }]])).toBe("time");
    expect(detectXType([[["a", 1]]])).toBe("category");
    expect(detectXType([[1, 2, 3]])).toBe("linear");
  });

  it("stacks bars and starts the y range at zero", () => {
    const model = buildModel(
      {
        series: [
          {
            type: "bar",
            stack: "s",
            data: [
              ["a", 2],
              ["b", 3],
            ],
          },
          {
            type: "bar",
            stack: "s",
            data: [
              ["a", 4],
              ["b", -1],
            ],
          },
        ],
      },
      theme,
      new Set(),
      new Map(),
      null,
    );
    expect(model.x.type).toBe("category");
    expect(model.base.x).toEqual([-0.5, 1.5]);
    expect(Array.from(model.series[1].barBase!)).toEqual([2, 0]);
    expect(Array.from(model.series[1].barTop!)).toEqual([6, -1]);
    expect(model.base.y[0]).toBeLessThanOrEqual(-1);
    expect(model.base.y[1]).toBeGreaterThanOrEqual(6);
    expect(model.series[0].barOffset).toBe(model.series[1].barOffset);
  });

  it("groups unstacked bars side by side", () => {
    const model = buildModel(
      {
        series: [
          { type: "bar", data: [1, 2] },
          { type: "bar", data: [3, 4] },
        ],
      },
      theme,
      new Set(),
      new Map(),
      null,
    );
    expect(model.series[0].barOffset).toBeLessThan(0);
    expect(model.series[1].barOffset).toBeGreaterThan(0);
  });

  it("reuses normalized data and honors hidden series", () => {
    const cache: DataCache = new Map();
    const data = [1, 2, 3];
    const options = {
      series: [
        { id: "a", data },
        { id: "b", data: [10, 20] },
      ],
    };
    const first = buildModel(options, theme, new Set(), cache, null);
    const second = buildModel(options, theme, new Set(["b"]), cache, null);
    expect(second.series[0].cols).toBe(first.series[0].cols);
    expect(second.series[1].hidden).toBe(true);
    expect(second.base.y[1]).toBeLessThan(10);
    expect(second.series[0].color).toEqual(theme.palette[0]);
  });

  it("zooms both axes of scatter charts and applies explicit bounds", () => {
    const model = buildModel(
      {
        series: [
          {
            type: "scatter",
            data: [
              [1, 1],
              [2, 3],
            ],
          },
        ],
        xAxis: { min: 0, max: 5 },
      },
      theme,
      new Set(),
      new Map(),
      null,
    );
    expect(model.zoom).toEqual({ x: true, y: true });
    expect(model.tooltipMode).toBe("nearest");
    expect(model.base.x).toEqual([0, 5]);
    expect(gridOf(model.series[0])).toBe(gridOf(model.series[0]));
  });

  it("turns interactions off", () => {
    const model = buildModel(
      { series: [{ data: [1] }], interaction: false },
      theme,
      new Set(),
      new Map(),
      null,
    );
    expect(model.zoom).toEqual({ x: false, y: false });
  });
});

describe("buildItems", () => {
  it("encodes positions relative to the origin with gap sentinels", () => {
    const model = buildModel(
      {
        series: [
          {
            type: "area",
            data: [
              [1000, 1],
              [1001, null],
              [1002, 3],
            ],
          },
          {
            type: "scatter",
            data: [{ x: 1000, y: 2, color: "#00ff00", size: 20 }],
          },
          { type: "bar", data: [[1000, 5]] },
        ],
      },
      theme,
      new Set(),
      new Map(),
      null,
    );
    const items = buildItems(model, { x: 1000, y: 0 }, 7);
    expect(items.map((i) => i.kind)).toEqual([
      "area",
      "bar",
      "line",
      "scatter",
    ]);
    const area = items[0];
    if (area.kind !== "area") throw new Error("area expected");
    // x, top, bottom (the baseline, 0 here)
    expect(Array.from(area.points)).toEqual(
      [0, 1, 0, 1, GAP, 0, 2, 3, 0].map(Math.fround),
    );
    const scatter = items[3];
    if (scatter.kind !== "scatter") throw new Error("scatter expected");
    const f = new Float32Array(scatter.instances);
    expect(f[2]).toBe(20);
    expect(new Uint32Array(scatter.instances)[3]).toBe(packColor([0, 1, 0, 1]));
    expect(items.every((i) => i.version === 7)).toBe(true);
  });
});

describe("drawBackground", () => {
  it("labels every tick of a reversed x axis", () => {
    const texts: string[] = [];
    const ctx = new Proxy(
      {
        measureText: (t: string) => ({ width: t.length * 6 }),
        fillText: (t: string) => texts.push(t),
      } as Record<string, unknown>,
      {
        get: (target, key) => target[key as string] ?? (() => {}),
        set: () => true,
      },
    ) as unknown as CanvasRenderingContext2D;
    const axis = {
      type: "linear" as const,
      reverse: true,
      categories: [],
      grid: false,
      visible: true,
    };
    const scales = createScales(
      { x: 40, y: 10, width: 400, height: 200 },
      { x: [0, 10], y: [0, 10] },
      true,
      false,
    );
    drawBackground(ctx, {
      width: 460,
      height: 240,
      scales,
      x: axis,
      y: { ...axis, reverse: false, visible: false },
      xTicks: axisTicks(axis, [0, 10], 5),
      yTicks: axisTicks(axis, [0, 10], 5),
      theme,
      annotations: [],
    });
    expect(texts).toEqual(["10", "8", "6", "4", "2", "0"]);
  });
});

describe("placeLabels", () => {
  it("skips labels without a free slot", () => {
    const plot = { x: 0, y: 0, width: 200, height: 200 };
    const placed = placeLabels(
      [
        { x: 50, y: 50, r: 4, text: "first" },
        { x: 50, y: 50, r: 4, text: "second" },
        { x: 50, y: 50, r: 4, text: "third" },
        { x: 50, y: 50, r: 4, text: "4" },
        { x: 50, y: 50, r: 4, text: "5" },
      ],
      plot,
      (t) => t.length * 6,
      12,
    );
    expect(placed.length).toBe(4);
    expect(placed[0].box.x).toBeGreaterThan(50);
    expect(placed[1].box.x + placed[1].box.width).toBeLessThan(50);
  });
});

describe("instanceRange", () => {
  const frame = (x0: number, x1: number) => ({
    transform: {
      xScale: 2 / (x1 - x0),
      xOffset: -1 - (x0 * 2) / (x1 - x0),
      yScale: 1,
      yOffset: 0,
    },
    width: 100,
    height: 100,
    dpr: 1,
  });
  const pts = new Float32Array(
    Array.from({ length: 100 }, (_, i) => [i, 0]).flat(),
  );

  it("draws only the visible segments of sorted lines", () => {
    const line = {
      kind: "line" as const,
      key: "l",
      version: 1,
      color: [0, 0, 0, 1] as const,
      points: pts,
      count: 100,
      width: 1,
      sorted: true,
    };
    expect(visibleX(frame(10, 20))[0]).toBeCloseTo(10);
    expect(instanceRange(line, frame(10, 20))).toEqual([9, 11]);
    expect(instanceRange({ ...line, sorted: false }, frame(10, 20))).toEqual([
      0, 99,
    ]);
    expect(instanceRange(line, frame(500, 600))[1]).toBe(0);
  });

  it("pads bars by their width", () => {
    const instances = new Float32Array(
      Array.from({ length: 10 }, (_, i) => [i, 0, 1, 0]).flat(),
    ).buffer;
    const bar = {
      kind: "bar" as const,
      key: "b",
      version: 1,
      color: [0, 0, 0, 1] as const,
      instances,
      count: 10,
      halfWidth: 0.4,
      radius: 0,
      inset: 0,
      minHalf: 0,
      sorted: true,
    };
    expect(instanceRange(bar, frame(2.5, 4.5))).toEqual([3, 2]);
  });
});

describe("rendererCandidates", () => {
  it("falls back from the requested backend only", () => {
    expect(rendererCandidates("auto")).toEqual([
      "webgpu",
      "webgl2",
      "webgl",
      "canvas2d",
    ]);
    expect(rendererCandidates("webgl2")).toEqual([
      "webgl2",
      "webgl",
      "canvas2d",
    ]);
    expect(rendererCandidates("webgl")).toEqual(["webgl", "canvas2d"]);
    expect(rendererCandidates("canvas2d")).toEqual(["canvas2d"]);
    expect(rendererCandidates("auto", new Set(["webgpu"]))).toEqual([
      "webgl2",
      "webgl",
      "canvas2d",
    ]);
    expect(rendererCandidates("webgpu", new Set(["webgpu", "webgl2"]))).toEqual(
      ["webgl", "canvas2d"],
    );
  });
});
