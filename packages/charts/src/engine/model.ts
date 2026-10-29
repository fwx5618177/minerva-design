// Options -> chart model: normalized data, colors, bar layout, stacks and
// the full ranges of the axes. Pure (colors go through the theme's resolver).

import {
  mix,
  packColor,
  rampColor,
  resolveStaticColor,
  toCss,
  type ColorResolver,
  type Rgba,
} from "./color";
import {
  collectCategories,
  collectYCategories,
  normalizeData,
  xResolver,
  type SeriesColumns,
  type YResolver,
} from "./data";
import { ensureSpan, niceDomain } from "./scale";
import { GridIndex } from "./spatial";
import type { ChartTheme } from "./theme";
import type {
  ChartAxisOptions,
  ChartAxisType,
  ChartCurve,
  ChartOptions,
  ChartSeries,
  ChartSeriesData,
  ChartSeriesType,
} from "./types";
import type { Range } from "./viewport";

export interface AxisModel {
  type: ChartAxisType;
  reverse: boolean;
  categories: string[];
  title?: string;
  format?: (value: number) => string;
  grid: boolean;
  visible: boolean;
  tickCount?: number;
}

export interface SeriesModel {
  index: number;
  /** Key of the GPU resources and of the data cache */
  key: string;
  id: string;
  name: string;
  type: ChartSeriesType;
  color: Rgba;
  colorCss: string;
  lineWidth: number;
  pointSize: number;
  opacity: number;
  hidden: boolean;
  showLabels: boolean;
  curve: ChartCurve;
  cols: SeriesColumns;
  /** Bars / candlesticks: x offset of the series inside a group and half of the bar width */
  barOffset: number;
  barHalfWidth: number;
  /** Bars: bottom / top of every bar (stacks included) */
  barBase: Float64Array | null;
  barTop: Float64Array | null;
  /** Stacked lines / areas: bottom / top of every point */
  stackBase: Float64Array | null;
  stackTop: Float64Array | null;
  /** Scatter / bar: resolved per-point colors */
  pointColors: (Rgba | undefined)[] | null;
  /** Candlesticks: colors of the rising / falling candles */
  upColor: Rgba;
  downColor: Rgba;
  /** Heatmaps: packed color of every cell (0 = no cell) and half of a cell, in data units */
  cellColors: Uint32Array | null;
  cellHalf: { x: number; y: number };
  /** Heatmaps: ramp of the colors and the values at its ends */
  colorScale: Rgba[];
  valueRange: Range;
  /** Corner radius in CSS pixels (bars, heatmap cells) */
  radius: number;
  /** Tooltip format of the values */
  format?: (value: number) => string;
}

export interface ChartModel {
  series: SeriesModel[];
  x: AxisModel;
  y: AxisModel;
  /** Full ranges (zoomed out) */
  base: { x: Range; y: Range };
  /** Every series is a scatter (or a heatmap): nearest tooltips, xy zoom */
  allScatter: boolean;
  zoom: { x: boolean; y: boolean };
  tooltipMode: "nearest" | "axis";
  /** Y value the areas are filled to */
  baseline: number;
  /** Smallest zoomed spans */
  minSpan: { x: number; y: number };
  /** Stacks are scaled to 100% */
  percent: boolean;
  /** Stack id of every series (`null` when not stacked) */
  stacks: (string | null)[];
}

export interface DataCacheEntry {
  data: ChartSeriesData;
  resolverKey: string;
  cols: SeriesColumns;
}

export type DataCache = Map<string, DataCacheEntry>;

const firstX = (data: ChartSeriesData): unknown => {
  if (typeof data === "object" && data !== null && !("length" in data)) {
    const xs = (data as { x?: ArrayLike<unknown> }).x;
    return xs && xs.length ? xs[0] : undefined;
  }
  const list = data as ArrayLike<unknown>;
  for (let i = 0; i < Math.min(list.length, 8); i++) {
    const item = list[i];
    if (Array.isArray(item)) return item[0];
    if (item && typeof item === "object") return (item as { x?: unknown }).x;
  }
  return undefined;
};

/** Axis type when not given: dates -> time, strings -> category */
export const detectXType = (
  datas: readonly ChartSeriesData[],
): ChartAxisType => {
  for (const data of datas) {
    const x = firstX(data);
    if (x instanceof Date) return "time";
    if (typeof x === "string") return "category";
  }
  return "linear";
};

const axisModel = (
  options: ChartAxisOptions | undefined,
  type: ChartAxisType,
  categories: string[],
  gridDefault: boolean,
): AxisModel => ({
  type,
  reverse: !!options?.reverse,
  categories,
  title: options?.title,
  format: options?.format,
  grid: options?.grid ?? gridDefault,
  visible: options?.visible ?? true,
  tickCount: options?.tickCount,
});

const extent = (values: ArrayLike<number>): Range => {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    if (!Number.isFinite(v)) continue;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return [min, max];
};

/** Smallest positive gap between consecutive values (bar width on numeric axes) */
const smallestStep = (columns: ArrayLike<number>[], sorted: boolean[]) => {
  let step = Infinity;
  columns.forEach((values, k) => {
    const xs = sorted[k] ? values : Float64Array.from(values).sort();
    for (let i = 1; i < xs.length; i++) {
      const d = xs[i] - xs[i - 1];
      if (d > 0 && d < step) step = d;
    }
  });
  return step;
};

const bandOf = (list: SeriesModel[], axis: "x" | "y", category: boolean) => {
  if (category) return 1;
  const step = smallestStep(
    list.map((s) => (axis === "x" ? s.cols.x : s.cols.y)),
    list.map((s) => axis === "x" && s.cols.sorted),
  );
  return Number.isFinite(step) ? step : 1;
};

/**
 * Stacks the y values of series sharing a stack id (positive and negative
 * values separately); `percent` scales every stack to 100 at each x
 */
const stackValues = (
  list: { s: SeriesModel; stack: string }[],
  percent: boolean,
): { base: Float64Array; top: Float64Array }[] => {
  const totals = new Map<string, Map<number, [number, number]>>();
  if (percent) {
    for (const { s, stack } of list) {
      let byX = totals.get(stack);
      if (!byX) totals.set(stack, (byX = new Map()));
      const { x, y, count } = s.cols;
      for (let i = 0; i < count; i++) {
        const v = y[i];
        if (!Number.isFinite(v)) continue;
        const t = byX.get(x[i]) ?? [0, 0];
        if (v >= 0) t[0] += v;
        else t[1] -= v;
        byX.set(x[i], t);
      }
    }
  }
  const running = new Map<string, Map<number, [number, number]>>();
  const members = new Map<string, number>();
  for (const { stack } of list)
    members.set(stack, (members.get(stack) ?? 0) + 1);
  return list.map(({ s, stack }) => {
    const { x, y, count } = s.cols;
    if (!percent && members.get(stack) === 1) {
      // alone in its stack (e.g. grouped bars): from zero, no bookkeeping
      const base = new Float64Array(count);
      const top = new Float64Array(count);
      for (let i = 0; i < count; i++) {
        const v = y[i];
        const valid = Number.isFinite(v);
        base[i] = valid ? 0 : NaN;
        top[i] = valid ? v : NaN;
      }
      return { base, top };
    }
    let byX = running.get(stack);
    if (!byX) running.set(stack, (byX = new Map()));
    const sums = totals.get(stack);
    const base = new Float64Array(count);
    const top = new Float64Array(count);
    for (let i = 0; i < count; i++) {
      let v = y[i];
      if (!Number.isFinite(v)) {
        base[i] = NaN;
        top[i] = NaN;
        continue;
      }
      if (sums) {
        const t = sums.get(x[i]);
        const total = t ? (v >= 0 ? t[0] : t[1]) : 0;
        v = total > 0 ? (v / total) * 100 : 0;
      }
      const t = byX.get(x[i]) ?? [0, 0];
      const b = v >= 0 ? t[0] : t[1];
      base[i] = b;
      top[i] = b + v;
      if (v >= 0) t[0] += v;
      else t[1] += v;
      byX.set(x[i], t);
    }
    return { base, top };
  });
};

const DEFAULT_UP = "var(--success-color, #16a34a)";
const DEFAULT_DOWN = "var(--danger-color, #dc2626)";

export const buildModel = (
  options: ChartOptions,
  theme: ChartTheme,
  hidden: ReadonlySet<string>,
  cache: DataCache,
  resolver: ColorResolver | null = null,
): ChartModel => {
  const resolve: ColorResolver =
    resolver ??
    theme.resolve ??
    ((value, fallback) => resolveStaticColor(value, {}, fallback));
  const input = options.series;
  const datas = input.map((s) => s.data);
  const xType = options.xAxis?.type ?? detectXType(datas);
  const categories =
    xType === "category"
      ? [...(options.xAxis?.categories ?? collectCategories(datas))]
      : [];
  const categoryMap = new Map(categories.map((c, i) => [c, i]));
  const resolveX = xResolver(xType, (name) => categoryMap.get(name) ?? NaN);

  // category y axis (heatmap rows): explicit, or detected from string y values
  const yOpts = options.yAxis;
  const heatmapData = input
    .filter((s) => s.type === "heatmap")
    .map((s) => s.data);
  const yCategories =
    yOpts?.type === "category" || (!yOpts?.type && heatmapData.length)
      ? [...(yOpts?.categories ?? collectYCategories(heatmapData))]
      : [];
  const yType: ChartAxisType =
    yOpts?.type === "category" || yCategories.length
      ? "category"
      : yOpts?.type === "time"
        ? "time"
        : "linear";
  const yCategoryMap = new Map(yCategories.map((c, i) => [c, i]));
  const resolveY: YResolver = (v) =>
    typeof v === "number"
      ? v
      : typeof v === "string"
        ? yType === "category"
          ? (yCategoryMap.get(v) ?? NaN)
          : Number(v)
        : NaN;
  const resolverKey = `${xType}|${categories.join("\u0001")}|${yType}|${yCategories.join("\u0001")}`;
  const percent = options.stackMode === "percent";

  const usedKeys = new Set<string>();
  const series: SeriesModel[] = input.map((s: ChartSeries, index) => {
    let key = s.id ?? `#${index}`;
    while (usedKeys.has(key)) key += "'";
    usedKeys.add(key);
    let entry = cache.get(key);
    if (!entry || entry.data !== s.data || entry.resolverKey !== resolverKey) {
      entry = {
        data: s.data,
        resolverKey,
        cols: normalizeData(s.data, resolveX, resolveY),
      };
      cache.set(key, entry);
    }
    const type = s.type ?? "line";
    const paletteColor = theme.palette[index % theme.palette.length];
    const color = s.color ? resolve(s.color, paletteColor) : paletteColor;
    const cols = entry.cols;
    let pointColors: (Rgba | undefined)[] | null = null;
    if ((type === "scatter" || type === "bar") && cols.colors) {
      const resolved = new Map<string, Rgba>();
      pointColors = cols.colors.map((c) => {
        if (c === undefined) return undefined;
        let rgba = resolved.get(c);
        if (!rgba) resolved.set(c, (rgba = resolve(c, color)));
        return rgba;
      });
    }
    let colorScale: Rgba[] = [];
    let valueRange: Range = [0, 1];
    let cellColors: Uint32Array | null = null;
    if (type === "heatmap") {
      colorScale =
        s.colorScale && s.colorScale.length
          ? s.colorScale.map((c) => resolve(c, color))
          : [mix(theme.background, color, 0.08), color];
      valueRange = s.valueRange
        ? [s.valueRange[0], s.valueRange[1]]
        : [cols.valueMin, cols.valueMax];
      if (!Number.isFinite(valueRange[0])) valueRange = [0, 1];
      const values = cols.value ?? cols.y;
      const [lo, hi] = valueRange;
      const span = hi - lo || 1;
      cellColors = new Uint32Array(cols.count);
      for (let i = 0; i < cols.count; i++) {
        const v = values[i];
        if (!Number.isFinite(v) || !Number.isFinite(cols.y[i])) continue;
        // 0 means "no cell": a fully transparent color packs to 0 as well
        cellColors[i] = packColor(rampColor(colorScale, (v - lo) / span));
      }
    }
    const id = s.id ?? String(index);
    return {
      index,
      key,
      id,
      name: s.name ?? `Series ${index + 1}`,
      type,
      color,
      colorCss: toCss(color),
      lineWidth: s.lineWidth ?? (type === "candlestick" ? 1 : 2),
      pointSize: s.pointSize ?? 8,
      opacity:
        s.opacity ?? (type === "area" ? 0.28 : type === "scatter" ? 0.78 : 1),
      hidden: !!s.hidden || hidden.has(id),
      showLabels: !!s.showLabels,
      curve: s.curve ?? "linear",
      cols,
      barOffset: 0,
      barHalfWidth: 0,
      barBase: null,
      barTop: null,
      stackBase: null,
      stackTop: null,
      pointColors,
      upColor:
        type === "candlestick"
          ? resolve(s.upColor ?? DEFAULT_UP, [0.09, 0.64, 0.29, 1])
          : color,
      downColor:
        type === "candlestick"
          ? resolve(s.downColor ?? DEFAULT_DOWN, [0.86, 0.15, 0.15, 1])
          : color,
      cellColors,
      cellHalf: { x: 0.5, y: 0.5 },
      colorScale,
      valueRange,
      radius: s.radius ?? (type === "heatmap" ? 2 : 3),
      format: s.format,
    };
  });

  const visible = series.filter((s) => !s.hidden);
  const allScatter =
    series.length > 0 &&
    series.every((s) => s.type === "scatter" || s.type === "heatmap");

  // Bars: groups (one slot per stack) and stacking
  const bars = visible.filter((s) => s.type === "bar");
  const band = bandOf(bars, "x", xType === "category");
  if (bars.length) {
    const slots = new Map<string, number>();
    const stackId = (s: SeriesModel) =>
      input[s.index].stack ?? `\u0000${s.key}`;
    for (const s of bars) {
      if (!slots.has(stackId(s))) slots.set(stackId(s), slots.size);
    }
    const group = band * (slots.size > 1 ? 0.78 : 0.62);
    const slotWidth = group / slots.size;
    const stacked = stackValues(
      bars.map((s) => ({ s, stack: stackId(s) })),
      false,
    );
    const percentStacked = percent
      ? stackValues(
          bars
            .filter((s) => input[s.index].stack !== undefined)
            .map((s) => ({ s, stack: stackId(s) })),
          true,
        )
      : [];
    let p = 0;
    bars.forEach((s, k) => {
      const slot = slots.get(stackId(s)) ?? 0;
      s.barOffset = -group / 2 + slotWidth * (slot + 0.5);
      s.barHalfWidth = (slotWidth / 2) * (slots.size > 1 ? 0.86 : 1);
      const values =
        percent && input[s.index].stack !== undefined
          ? percentStacked[p++]
          : stacked[k];
      s.barBase = values.base;
      s.barTop = values.top;
    });
  }

  // Stacked lines / areas
  const stackedLines = visible.filter(
    (s) =>
      (s.type === "line" || s.type === "area") &&
      input[s.index].stack !== undefined,
  );
  if (stackedLines.length) {
    const values = stackValues(
      stackedLines.map((s) => ({ s, stack: input[s.index].stack ?? "" })),
      percent,
    );
    stackedLines.forEach((s, k) => {
      s.stackBase = values[k].base;
      s.stackTop = values[k].top;
    });
  }

  // Candlesticks: one band per x, bodies of 60%
  const candles = visible.filter((s) => s.type === "candlestick");
  const candleBand = bandOf(candles, "x", xType === "category");
  for (const s of candles) s.barHalfWidth = candleBand * 0.3;

  // Heatmaps: cells of the size of the smallest step
  const heatmaps = visible.filter((s) => s.type === "heatmap");
  if (heatmaps.length) {
    const cx = bandOf(heatmaps, "x", xType === "category") / 2;
    const cy = bandOf(heatmaps, "y", yType === "category") / 2;
    for (const s of heatmaps) s.cellHalf = { x: cx, y: cy };
  }

  // X range
  const xOpts = options.xAxis;
  let xRange: Range;
  if (xType === "category") {
    xRange = [-0.5, Math.max(1, categories.length) - 0.5];
  } else {
    const values: number[] = [];
    for (const s of visible) {
      values.push(s.cols.xMin, s.cols.xMax);
      const pad =
        s.type === "bar"
          ? band / 2
          : s.type === "candlestick"
            ? candleBand / 2
            : s.type === "heatmap"
              ? s.cellHalf.x
              : 0;
      if (pad) values.push(s.cols.xMin - pad, s.cols.xMax + pad);
    }
    xRange = ensureSpan(
      ...extent(values),
      xType === "time" ? [Date.now() - 86400000, Date.now()] : [0, 1],
    );
    const pointsOnly = series.every((s) => s.type === "scatter");
    if (pointsOnly) {
      const pad = (xRange[1] - xRange[0]) * 0.04;
      xRange = [xRange[0] - pad, xRange[1] + pad];
    }
    const nice = xOpts?.nice ?? (pointsOnly && xType === "linear");
    if (nice && xType === "linear") {
      xRange = niceDomain(xRange[0], xRange[1], xOpts?.tickCount ?? 6);
    }
  }
  if (xOpts?.min !== undefined) xRange[0] = xOpts.min;
  if (xOpts?.max !== undefined) xRange[1] = xOpts.max;
  xRange = ensureSpan(xRange[0], xRange[1]);

  // Y range
  let yRange: Range;
  if (yType === "category") {
    yRange = [-0.5, Math.max(1, yCategories.length) - 0.5];
  } else {
    const yValues: number[] = [];
    for (const s of visible) {
      if (s.type === "bar" && s.barBase && s.barTop) {
        yValues.push(...extent(s.barBase), ...extent(s.barTop));
      } else if (s.stackBase && s.stackTop) {
        yValues.push(...extent(s.stackBase), ...extent(s.stackTop));
      } else if (s.type === "heatmap") {
        yValues.push(s.cols.yMin - s.cellHalf.y, s.cols.yMax + s.cellHalf.y);
      } else {
        yValues.push(s.cols.yMin, s.cols.yMax);
      }
    }
    const filled = bars.length > 0 || visible.some((s) => s.type === "area");
    if (bars.length || yOpts?.zero) yValues.push(0);
    if (bars.some((s) => s.showLabels)) {
      // room for the value labels above the tallest bar
      const [lo, hi] = extent(yValues);
      if (hi > 0) yValues.push(hi + (hi - Math.min(0, lo)) * 0.1);
      if (lo < 0) yValues.push(lo - (Math.max(0, hi) - lo) * 0.1);
    }
    yRange = ensureSpan(...extent(yValues));
    if (series.every((s) => s.type === "scatter")) {
      const pad = (yRange[1] - yRange[0]) * 0.06;
      yRange = [yRange[0] - pad, yRange[1] + pad];
    } else if (candles.length && !bars.length) {
      // room above / below the wicks
      const pad = (yRange[1] - yRange[0]) * 0.04;
      yRange = [yRange[0] - pad, yRange[1] + pad];
    }
    if ((yOpts?.nice ?? !heatmaps.length) && yType === "linear") {
      yRange = niceDomain(yRange[0], yRange[1], yOpts?.tickCount ?? 5);
    }
    if (percent && (bars.length || stackedLines.length)) {
      // 100% stacks: exactly 0-100 (or -100-100)
      yRange = [extent(yValues)[0] < 0 ? -100 : 0, 100];
    }
    if (filled && !yOpts?.zero) {
      // bars start at zero: no padding below / above it
      if (yRange[0] < 0 && extent(yValues)[0] >= 0) yRange[0] = 0;
    }
  }
  if (yOpts?.min !== undefined) yRange[0] = yOpts.min;
  if (yOpts?.max !== undefined) yRange[1] = yOpts.max;
  yRange = ensureSpan(yRange[0], yRange[1]);

  const zoomOption =
    options.interaction === false
      ? false
      : options.interaction === true || options.interaction === undefined
        ? true
        : (options.interaction.zoom ?? true);
  const zoomAxes =
    zoomOption === false
      ? { x: false, y: false }
      : zoomOption === true
        ? { x: true, y: allScatter }
        : { x: zoomOption.includes("x"), y: zoomOption.includes("y") };

  const tooltip =
    typeof options.tooltip === "object" ? options.tooltip : undefined;

  const yFormat =
    yOpts?.format ??
    (percent && (bars.length || stackedLines.length)
      ? (v: number) => `${+v.toFixed(1)}%`
      : undefined);

  return {
    series,
    x: axisModel(xOpts, xType, categories, false),
    y: {
      ...axisModel(yOpts, yType, yCategories, yType !== "category"),
      format: yFormat,
    },
    base: { x: xRange, y: yRange },
    allScatter,
    zoom: zoomAxes,
    tooltipMode: tooltip?.mode ?? (allScatter ? "nearest" : "axis"),
    baseline: Math.min(Math.max(0, yRange[0]), yRange[1]),
    minSpan: {
      x: xType === "category" ? 1 : (xRange[1] - xRange[0]) * 1e-7,
      y: yType === "category" ? 1 : (yRange[1] - yRange[0]) * 1e-7,
    },
    percent,
    stacks: input.map((s) =>
      s.stack !== undefined &&
      (s.type === "bar" || s.type === "line" || s.type === "area" || !s.type)
        ? `${s.type === "bar" ? "bar" : "line"}:${s.stack}`
        : null,
    ),
  };
};

/** Y value drawn for a point: its stacked top for stacks, the close for candles */
export const plottedY = (s: SeriesModel, i: number): number =>
  s.barTop ? s.barTop[i] : s.stackTop ? s.stackTop[i] : s.cols.y[i];

const grids = new WeakMap<SeriesColumns, GridIndex>();

/** Spatial index of a scatter series, built on first use and kept with its data */
export const gridOf = (s: SeriesModel): GridIndex => {
  let grid = grids.get(s.cols);
  if (!grid) {
    grid = new GridIndex(s.cols.x, s.cols.y, s.cols.count);
    grids.set(s.cols, grid);
  }
  return grid;
};
