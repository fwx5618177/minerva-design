// Options -> chart model: normalized data, colors, bar layout, stacks and
// the full ranges of the axes. Pure (colors go through the theme's resolver).

import {
  luminance,
  mixOklab,
  oklabRamp,
  resolveStaticColor,
  toCss,
  withLightness,
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
import { formatPercent, valueFormatter } from "./format";
import { chartLabels } from "./labels";
import { resolveLocale } from "./locale";
import { ensureSpan, niceDomain, tickStep } from "./scale";
import { GridIndex } from "./spatial";
import type { ChartTheme } from "./theme";
import type {
  ChartAxisOptions,
  ChartAxisType,
  ChartColorScheme,
  ChartCurve,
  ChartOptions,
  ChartSeries,
  ChartSeriesData,
  ChartLabels,
  ChartSeriesType,
  ChartTimeZone,
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
  /** Locale of the tick and tooltip labels (historical English texts when omitted) */
  locale?: string;
  /** Calendar of a time axis */
  timeZone?: ChartTimeZone;
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
  /**
   * Plotted columns: the data, mapped onto the left axis for the series of
   * the right axis (`raw` keeps the values of the data)
   */
  cols: SeriesColumns;
  /** Columns of the data (shown in tooltips and labels) */
  raw: SeriesColumns;
  /** Value axis of the series */
  yAxis: "left" | "right";
  /** Bars with a start (`y0`): drawn from it, never stacked */
  floating: boolean;
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
  /** Heatmaps: value at the middle of the ramp (`null`: linear over the range) */
  colorMidpoint: number | null;
  /** Heatmaps: 256 packed colors along the ramp (OKLab) */
  colorLut: Uint32Array | null;
  /** Hit tests and tooltips include the series */
  tooltip: boolean;
  /** Box plots: outlier rings or dots, and their diameter */
  outlierShape: "hollow" | "filled";
  outlierSize: number;
  /** Bars: lines from the end of every bar to the next one */
  connector: { color: Rgba; dash: number[]; width: number } | null;
  /** Corner radius in CSS pixels (bars, heatmap cells) */
  radius: number;
  /** Tooltip format of the values */
  format?: (value: number) => string;
  /** Scatter: name of the `value` of the points */
  valueName?: string;
}

/**
 * Map of the values of a series onto the plotted (left axis) units:
 * `left = (log ? log10(value) : value) * scale + offset`
 */
export interface AxisMap {
  scale: number;
  offset: number;
  /** Logarithmic axis: the values are plotted as their base-10 logarithm */
  log?: boolean;
}

/** Plotted units of a log axis: the base-10 logarithm of the values */
const LOG_MAP: AxisMap = { scale: 1, offset: 0, log: true };

export interface ChartModel {
  series: SeriesModel[];
  x: AxisModel;
  y: AxisModel;
  /** Right value axis (`yAxis2`), `null` when no series uses it */
  y2: AxisModel | null;
  /** Right axis values -> left axis values */
  y2Map: AxisMap | null;
  /** The x axis runs down the left side, the values along the bottom */
  horizontal: boolean;
  /** Resolved locale (`locale` option, else the page language) */
  locale: string;
  /** Texts of the locale with the `labels` overrides */
  labels: ChartLabels;
  /** Tooltip value of the locale (series without `format`) */
  formatValue: (value: number) => string;
  /** Full ranges (zoomed out) */
  base: { x: Range; y: Range };
  /** Every series is a scatter (or a heatmap): nearest tooltips, xy zoom */
  allScatter: boolean;
  zoom: { x: boolean; y: boolean };
  tooltipMode: "nearest" | "axis" | "item";
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
  locale: string,
): AxisModel => ({
  type,
  reverse: !!options?.reverse,
  categories,
  title: options?.title,
  format: options?.format,
  grid: options?.grid ?? gridDefault,
  visible: options?.visible ?? true,
  tickCount: options?.tickCount,
  locale,
  timeZone: options?.timeZone ?? "local",
});

/** Defined entries only (`{ open: undefined }` keeps the built-in text) */
const definedEntries = <T extends object>(value: T | undefined): Partial<T> => {
  const out: Partial<T> = {};
  if (!value) return out;
  for (const key of Object.keys(value) as (keyof T)[]) {
    if (value[key] !== undefined) out[key] = value[key];
  }
  return out;
};

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

/** Dates in the y values (or starts) of objects: a time value axis */
const hasDateY = (datas: readonly ChartSeriesData[]): boolean => {
  for (const data of datas) {
    if (typeof data !== "object" || data === null || !("length" in data))
      continue;
    const list = data as ArrayLike<unknown>;
    for (let i = 0; i < Math.min(list.length, 8); i++) {
      const item = list[i];
      if (item && typeof item === "object" && !Array.isArray(item)) {
        const d = item as { y?: unknown; y0?: unknown };
        if (d.y instanceof Date || d.y0 instanceof Date) return true;
      }
    }
  }
  return false;
};

const precise = (v: number) => Number(v.toPrecision(12));

/** Next step of the 1, 2, 5 × 10^k sequence */
const nextStep = (step: number) => {
  const power = 10 ** Math.floor(Math.log10(step) + 1e-9);
  const f = step / power;
  return (f < 1.5 ? 2 : f < 3.5 ? 5 : 10) * power;
};

/**
 * Range of the right axis covering [lo, hi] with as many tick intervals as
 * the left range has (its ticks then line up with the left grid)
 */
export const alignedDomain = (
  lo: number,
  hi: number,
  left: Range,
  count: number,
): Range => {
  const [a0, a1] = left;
  const stepL = tickStep(a0, a1, count);
  const n = stepL > 0 ? Math.round((a1 - a0) / stepL) : 0;
  [lo, hi] = ensureSpan(lo, hi);
  if (n < 1 || Math.abs(n * stepL - (a1 - a0)) > stepL * 1e-6) {
    return niceDomain(lo, hi, count);
  }
  let step = tickStep(lo, hi, n);
  for (let k = 0; k < 40 && step > 0; k++) {
    const start = Math.floor(lo / step + 1e-9) * step;
    if (start + n * step >= hi - step * 1e-9) {
      return [precise(start), precise(start + n * step)];
    }
    step = nextStep(step);
  }
  return niceDomain(lo, hi, count);
};

const mapped = new WeakMap<
  SeriesColumns,
  { key: string; cols: SeriesColumns }
>();

/** Columns of a right-axis series in left axis units (cached with the data) */
const mapColumns = (src: SeriesColumns, map: AxisMap): SeriesColumns => {
  const key = `${map.scale},${map.offset},${!!map.log}`;
  const hit = mapped.get(src);
  if (hit && hit.key === key) return hit.cols;
  const f = mapper(map);
  const column = (a: Float64Array | null) => (a ? a.map(f) : null);
  const raw = src;
  const cols: SeriesColumns = {
    ...raw,
    y: raw.y.map(f),
    open: column(raw.open),
    high: column(raw.high),
    low: column(raw.low),
    y0: column(raw.y0),
    q1: column(raw.q1),
    q3: column(raw.q3),
    outliers: raw.outliers ? raw.outliers.map((list) => list?.map(f)) : null,
  };
  if (map.log) {
    // zeros and negatives have no logarithm: the extent of the others
    const range: Range = [Infinity, -Infinity];
    const add = (a: ArrayLike<number> | null | undefined) => {
      if (!a) return;
      for (let i = 0; i < a.length; i++) {
        const v = a[i];
        if (!Number.isFinite(v)) continue;
        if (v < range[0]) range[0] = v;
        if (v > range[1]) range[1] = v;
      }
    };
    for (const c of [cols.y, cols.y0, cols.high, cols.low, cols.q1, cols.q3])
      add(c);
    cols.outliers?.forEach((list) => add(list));
    cols.yMin = range[0] <= range[1] ? range[0] : NaN;
    cols.yMax = range[0] <= range[1] ? range[1] : NaN;
  } else {
    const lo = f(raw.yMin);
    const hi = f(raw.yMax);
    cols.yMin = Math.min(lo, hi);
    cols.yMax = Math.max(lo, hi);
  }
  mapped.set(src, { key, cols });
  return cols;
};

/** A log range widened to whole decades (`[0.3, 2.4]` -> `[0, 3]`) */
const decades = (range: Range): Range => {
  const lo = Math.floor(range[0] + 1e-9);
  const hi = Math.ceil(range[1] - 1e-9);
  return [lo, hi > lo ? hi : lo + 1];
};

/** Exponent of `m × 10^k`, exact for the values of the ticks */
const niceExponent = (m: number, k: number) =>
  Math.log10(Number((m * 10 ** k).toPrecision(12)));

/**
 * A log range widened to the closest 1, 2 or 5 × 10^k bounds (the values
 * 900 - 140k -> 500 - 200k), tighter than whole decades
 */
const niceLogRange = (range: Range): Range => {
  const below = (e: number) => {
    const k = Math.floor(e + 1e-9);
    let best = k;
    for (const m of [2, 5]) {
      const v = niceExponent(m, k);
      if (v <= e + 1e-9) best = v;
    }
    return best;
  };
  const above = (e: number) => {
    const k = Math.floor(e - 1e-9);
    for (const m of [1, 2, 5]) {
      const v = niceExponent(m, k);
      if (v >= e - 1e-9) return v;
    }
    return k + 1;
  };
  const lo = below(range[0]);
  const hi = above(range[1]);
  return [lo, hi > lo + 1e-9 ? hi : above(lo + 1e-6)];
};

/**
 * Plots a series through a map: its columns, bars, stacks and lower
 * edges (bars / areas of the right axis start at `zero`)
 */
const logColumns = (s: SeriesModel, map: AxisMap, zero = -Infinity) => {
  const f = mapper(map);
  const column = (a: Float64Array | null) => (a ? a.map(f) : null);
  const rawBase = s.stackBase;
  s.cols = mapColumns(s.cols, map);
  s.barBase =
    s.barBase && !s.floating
      ? s.barBase.map((v) => (v === 0 ? (map.log ? -Infinity : f(0)) : f(v)))
      : column(s.barBase);
  s.barTop = column(s.barTop);
  s.stackTop = column(s.stackTop);
  s.stackBase =
    rawBase && rawBase === s.raw.y0
      ? s.cols.y0
      : rawBase
        ? column(rawBase)
        : s.type === "area"
          ? new Float64Array(s.cols.count).fill(zero)
          : null;
};

/** Value -> plotted units of a map (`-Infinity` for 0 on log axes) */
const mapper =
  (map: AxisMap) =>
  (v: number): number =>
    (map.log ? Math.log10(v) : v) * map.scale + map.offset;

/** Value of the y axis -> plotted y (the logarithm on log axes) */
export const toPlotY = (model: { y: AxisModel }, value: number): number =>
  model.y.type === "log" ? Math.log10(value) : value;

/** Plotted y -> value of the y axis */
export const fromPlotY = (model: { y: AxisModel }, value: number): number =>
  model.y.type === "log" ? 10 ** value : value;

/** Value of the x axis -> plotted x (the logarithm on log axes) */
export const toPlotX = (model: { x: AxisModel }, value: number): number =>
  model.x.type === "log" ? Math.log10(value) : value;

/** Plotted x -> value of the x axis */
export const fromPlotX = (model: { x: AxisModel }, value: number): number =>
  model.x.type === "log" ? 10 ** value : value;

/** A view in plotted units -> the values of the axes (zoom events, `getView`) */
export const viewToValues = (
  model: { x: AxisModel; y: AxisModel },
  view: { x: Range; y: Range },
): { x: Range; y: Range } => ({
  x: [fromPlotX(model, view.x[0]), fromPlotX(model, view.x[1])],
  y: [fromPlotY(model, view.y[0]), fromPlotY(model, view.y[1])],
});

/** Values of the axes -> a view in plotted units (`setView`); missing axes keep `current` */
export const viewFromValues = (
  model: { x: AxisModel; y: AxisModel },
  next: { x?: Range; y?: Range },
  current: { x: Range; y: Range },
): { x: Range; y: Range } => ({
  x: next.x
    ? [toPlotX(model, next.x[0]), toPlotX(model, next.x[1])]
    : current.x,
  y: next.y
    ? [toPlotY(model, next.y[0]), toPlotY(model, next.y[1])]
    : current.y,
});

const logXCache = new WeakMap<SeriesColumns, SeriesColumns>();

/**
 * Columns plotted on a log x axis: the logarithms of the x values; points
 * without one (x <= 0) become gaps (cached with the data)
 */
const logXColumns = (raw: SeriesColumns): SeriesColumns => {
  const hit = logXCache.get(raw);
  if (hit) return hit;
  const x = raw.x.map((v) => (v > 0 ? Math.log10(v) : NaN));
  let y = raw.y;
  let gaps = false;
  for (let i = 0; i < raw.count; i++) {
    if (Number.isFinite(x[i])) continue;
    if (!gaps) y = Float64Array.from(raw.y);
    gaps = true;
    y[i] = NaN;
  }
  const [xMin, xMax] = extent(x);
  const cols: SeriesColumns = {
    ...raw,
    x,
    y,
    xMin,
    xMax,
    sorted: raw.sorted && !gaps,
  };
  logXCache.set(raw, cols);
  return cols;
};

/** Replaces the bases of bars / areas on log axes (`-Infinity`) by the bottom of the axis */
const floorBases = (s: SeriesModel, floor: number) => {
  for (const a of [s.barBase, s.stackBase]) {
    if (!a) continue;
    for (let i = 0; i < a.length; i++) if (a[i] === -Infinity) a[i] = floor;
  }
};

/** Position (0-1) of a heatmap value on its color ramp */
export const heatPosition = (
  s: Pick<SeriesModel, "valueRange" | "colorMidpoint">,
  v: number,
): number => {
  const [lo, hi] = s.valueRange;
  const mid = s.colorMidpoint;
  let t: number;
  if (mid !== null && mid > lo && mid < hi) {
    t =
      v < mid
        ? ((v - lo) / (mid - lo)) * 0.5
        : 0.5 + ((v - mid) / (hi - mid)) * 0.5;
  } else {
    t = (v - lo) / (hi - lo || 1);
  }
  return t < 0 ? 0 : t > 1 ? 1 : t;
};

/**
 * Built-in ramps of heatmaps, perceptual (OKLab) and theme-aware: light
 * themes go from a near-white tint to a deep hue, dark themes from a dark
 * tint of the surface to a bright saturated hue; diverging ramps meet in a
 * neutral middle
 */
export const heatmapStops = (
  scheme: ChartColorScheme,
  color: Rgba,
  theme: ChartTheme,
  negative: Rgba,
): Rgba[] => {
  const dark = luminance(theme.background) < 0.4;
  if (scheme === "diverging") {
    const neutral = mixOklab(
      theme.surface,
      theme.textMuted,
      dark ? 0.12 : 0.08,
    );
    const end = (c: Rgba) =>
      dark ? withLightness(c, 0.7, 1.25) : withLightness(c, 0.5, 1.05);
    const side = (c: Rgba) => mixOklab(neutral, end(c), 0.5);
    return [end(negative), side(negative), neutral, side(color), end(color)];
  }
  return dark
    ? [
        mixOklab(theme.surface, color, 0.14),
        withLightness(color, 0.46, 0.95),
        withLightness(color, 0.64, 1.2),
        withLightness(color, 0.8, 1.15),
      ]
    : [
        mixOklab(theme.surface, color, 0.06),
        withLightness(color, 0.8, 0.6),
        withLightness(color, 0.58, 1),
        withLightness(color, 0.36, 0.9),
      ];
};

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
  // resolved at every build: a page language switch shows on the next update
  const locale = resolveLocale(options.locale);
  const tooltipOptions =
    typeof options.tooltip === "object" ? options.tooltip : undefined;
  const labels = chartLabels(locale, {
    ...definedEntries(tooltipOptions?.labels),
    ...definedEntries(options.labels),
  });
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
      : yOpts?.type === "time" || (!yOpts?.type && hasDateY(datas))
        ? "time"
        : yOpts?.type === "log"
          ? "log"
          : "linear";
  const yLog = yType === "log";
  const yCategoryMap = new Map(yCategories.map((c, i) => [c, i]));
  const resolveY: YResolver = (v) =>
    typeof v === "number"
      ? v
      : typeof v === "string"
        ? yType === "category"
          ? (yCategoryMap.get(v) ?? NaN)
          : yType === "time"
            ? Date.parse(v)
            : Number(v)
        : v instanceof Date
          ? v.getTime()
          : NaN;
  const resolverKey = `${xType}|${categories.join("\u0001")}|${yType}|${yCategories.join("\u0001")}`;
  const percent = options.stackMode === "percent";
  const horizontal = options.orientation === "horizontal";

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
    if (
      (type === "scatter" || type === "bar" || type === "boxplot") &&
      cols.colors
    ) {
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
    let colorMidpoint: number | null = null;
    let colorLut: Uint32Array | null = null;
    if (type === "heatmap") {
      const scale = s.colorScale;
      const scheme: ChartColorScheme =
        scale === "diverging" ? "diverging" : "sequential";
      colorScale =
        typeof scale === "object" && scale.length
          ? scale.map((c) => resolve(c, color))
          : heatmapStops(
              scheme,
              color,
              theme,
              resolve(DEFAULT_DOWN, [0.86, 0.15, 0.15, 1]),
            );
      valueRange = s.valueRange
        ? [s.valueRange[0], s.valueRange[1]]
        : [cols.valueMin, cols.valueMax];
      if (!Number.isFinite(valueRange[0])) valueRange = [0, 1];
      const [lo, hi] = valueRange;
      colorMidpoint =
        s.colorMidpoint ??
        (scheme === "diverging" && typeof scale !== "object"
          ? lo < 0 && hi > 0
            ? 0
            : (lo + hi) / 2
          : null);
      const lut = oklabRamp(colorScale);
      colorLut = lut;
      const values = cols.value ?? cols.y;
      const ramp = { valueRange, colorMidpoint };
      cellColors = new Uint32Array(cols.count);
      for (let i = 0; i < cols.count; i++) {
        const v = values[i];
        if (!Number.isFinite(v) || !Number.isFinite(cols.y[i])) continue;
        // 0 means "no cell": the ramp never packs to 0
        cellColors[i] = lut[Math.round(heatPosition(ramp, v) * 255)];
      }
    }
    const connector = s.connector
      ? typeof s.connector === "object"
        ? s.connector
        : {}
      : null;
    const id = s.id ?? String(index);
    return {
      index,
      key,
      id,
      name: s.name ?? `${labels.series} ${index + 1}`,
      type,
      color,
      colorCss: toCss(color),
      lineWidth:
        s.lineWidth ??
        (type === "candlestick" ? 1 : type === "boxplot" ? 1.5 : 2),
      pointSize: s.pointSize ?? (type === "boxplot" ? 6 : 8),
      opacity:
        s.opacity ??
        (type === "area"
          ? 0.28
          : type === "scatter"
            ? 0.78
            : type === "boxplot"
              ? 0.22
              : 1),
      hidden: !!s.hidden || hidden.has(id),
      showLabels: !!s.showLabels,
      curve: s.curve ?? "linear",
      cols,
      raw: cols,
      yAxis: s.yAxis === "right" && !horizontal ? "right" : "left",
      floating: type === "bar" && !!cols.y0,
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
      colorMidpoint,
      colorLut,
      tooltip: s.tooltip !== false,
      outlierShape: s.outlierShape ?? "hollow",
      outlierSize: s.outlierSize ?? s.pointSize ?? 7,
      connector:
        connector && type === "bar"
          ? {
              color: connector.color
                ? resolve(connector.color, theme.textMuted)
                : theme.textMuted,
              dash: [...(connector.dash ?? [3, 3])],
              width: connector.width ?? 1,
            }
          : null,
      radius: s.radius ?? (type === "heatmap" ? 2 : type === "boxplot" ? 0 : 3),
      format: s.format,
      valueName: s.valueName,
    };
  });

  const visible = series.filter((s) => !s.hidden);
  const xLog = xType === "log";
  // log x axis: every series is plotted on the logarithms of its x values
  if (xLog) for (const s of series) s.cols = logXColumns(s.raw);
  const allScatter =
    series.length > 0 &&
    series.every((s) => s.type === "scatter" || s.type === "heatmap");

  // Bars and box plots: groups (one slot per stack) and stacking; floating
  // bars (with starts) are drawn from their starts
  const slotted = visible.filter(
    (s) => s.type === "bar" || s.type === "boxplot",
  );
  const bars = visible.filter((s) => s.type === "bar");
  const band = bandOf(slotted, "x", xType === "category");
  if (slotted.length) {
    const slots = new Map<string, number>();
    const stackId = (s: SeriesModel) =>
      input[s.index].stack ?? `\u0000${s.key}`;
    for (const s of slotted) {
      if (!slots.has(stackId(s))) slots.set(stackId(s), slots.size);
    }
    let share = 0;
    for (const s of slotted) {
      const w = input[s.index].barWidth;
      if (w !== undefined && w > share) share = Math.min(1, w);
    }
    const group = band * (share || (slots.size > 1 ? 0.78 : 0.62));
    const slotWidth = group / slots.size;
    for (const s of slotted) {
      const slot = slots.get(stackId(s)) ?? 0;
      s.barOffset = -group / 2 + slotWidth * (slot + 0.5);
      s.barHalfWidth = (slotWidth / 2) * (slots.size > 1 ? 0.86 : 1);
    }
    const stackedBars = bars.filter((s) => !s.floating);
    const stacked = stackValues(
      stackedBars.map((s) => ({ s, stack: stackId(s) })),
      false,
    );
    const percentStacked = percent
      ? stackValues(
          stackedBars
            .filter((s) => input[s.index].stack !== undefined)
            .map((s) => ({ s, stack: stackId(s) })),
          true,
        )
      : [];
    let p = 0;
    stackedBars.forEach((s, k) => {
      const values =
        percent && input[s.index].stack !== undefined
          ? percentStacked[p++]
          : stacked[k];
      s.barBase = values.base;
      s.barTop = values.top;
    });
    for (const s of bars) {
      const { y, y0, count } = s.cols;
      if (!s.floating || !y0) continue;
      const base = new Float64Array(count);
      const top = new Float64Array(count);
      for (let i = 0; i < count; i++) {
        const valid = Number.isFinite(y[i]);
        base[i] = valid ? (Number.isFinite(y0[i]) ? y0[i] : 0) : NaN;
        top[i] = valid ? y[i] : NaN;
      }
      s.barBase = base;
      s.barTop = top;
    }
  }

  // Range areas: filled down to their lower edges
  for (const s of visible) {
    if (s.type === "area" && s.cols.y0 && input[s.index].stack === undefined)
      s.stackBase = s.cols.y0;
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
        s.type === "bar" || s.type === "boxplot"
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
    if (xLog && xOpts?.nice !== false) xRange = niceLogRange(xRange);
  }
  const xBound = (v: number) => (xLog ? Math.log10(v) : v);
  if (xOpts?.min !== undefined) xRange[0] = xBound(xOpts.min);
  if (xOpts?.max !== undefined) xRange[1] = xBound(xOpts.max);
  xRange = ensureSpan(xRange[0], xRange[1]);

  // Log axis: the left series are plotted as logarithms (stacks are summed
  // first); bars and areas from zero start at the bottom of the axis
  if (yLog) {
    for (const s of series) {
      if (s.yAxis === "right" || s.type === "heatmap") continue;
      logColumns(s, LOG_MAP);
    }
  }

  // Y range (left axis: the series of the right axis are mapped onto it)
  const valuesOf = (
    list: SeriesModel[],
    zero: boolean | undefined,
    log = false,
  ) => {
    const values: number[] = [];
    for (const s of list) {
      if (s.type === "bar" && s.barBase && s.barTop) {
        values.push(...extent(s.barBase), ...extent(s.barTop));
      } else if (s.stackBase && s.stackTop) {
        values.push(...extent(s.stackBase), ...extent(s.stackTop));
      } else if (s.type === "heatmap") {
        values.push(s.cols.yMin - s.cellHalf.y, s.cols.yMax + s.cellHalf.y);
      } else {
        values.push(s.cols.yMin, s.cols.yMax);
      }
    }
    const listBars = list.filter((s) => s.type === "bar");
    if (!log && (listBars.some((s) => !s.floating) || zero)) values.push(0);
    if (listBars.some((s) => s.showLabels)) {
      // room for the value labels above the tallest bar
      const [lo, hi] = extent(values);
      if (hi > 0) values.push(hi + (hi - Math.min(0, lo)) * 0.1);
      if (lo < 0) values.push(lo - (Math.max(0, hi) - lo) * 0.1);
    }
    return values;
  };
  const leftVisible = visible.filter((s) => s.yAxis === "left");
  const leftSeries = leftVisible.length ? leftVisible : visible;
  const leftBars = leftSeries.filter((s) => s.type === "bar");
  let yRange: Range;
  if (yType === "category") {
    yRange = [-0.5, Math.max(1, yCategories.length) - 0.5];
  } else {
    const yValues = valuesOf(leftSeries, yOpts?.zero, yLog);
    const filled =
      leftBars.length > 0 || leftSeries.some((s) => s.type === "area");
    yRange = ensureSpan(...extent(yValues));
    if (series.every((s) => s.type === "scatter")) {
      const pad = (yRange[1] - yRange[0]) * 0.06;
      yRange = [yRange[0] - pad, yRange[1] + pad];
    } else if (
      (candles.length || leftSeries.some((s) => s.type === "boxplot")) &&
      !leftBars.length
    ) {
      // room above / below the wicks and the outliers
      const pad = (yRange[1] - yRange[0]) * 0.04;
      yRange = [yRange[0] - pad, yRange[1] + pad];
    }
    if ((yOpts?.nice ?? !heatmaps.length) && yType === "linear") {
      yRange = niceDomain(yRange[0], yRange[1], yOpts?.tickCount ?? 5);
    }
    if (yLog && yOpts?.nice !== false) yRange = decades(yRange);
    if (percent && (bars.length || stackedLines.length)) {
      // 100% stacks: exactly 0-100 (or -100-100)
      yRange = [extent(yValues)[0] < 0 ? -100 : 0, 100];
    }
    if (filled && !yOpts?.zero && !yLog) {
      // bars start at zero: no padding below / above it
      if (yRange[0] < 0 && extent(yValues)[0] >= 0) yRange[0] = 0;
    }
  }
  const yBound = (v: number) => (yLog ? Math.log10(v) : v);
  if (yOpts?.min !== undefined) yRange[0] = yBound(yOpts.min);
  if (yOpts?.max !== undefined) yRange[1] = yBound(yOpts.max);
  yRange = ensureSpan(yRange[0], yRange[1]);
  if (yLog) {
    for (const s of series) if (s.yAxis === "left") floorBases(s, yRange[0]);
  }

  // Right axis: a range aligned on the left ticks; its series are mapped
  // onto the left axis
  const y2Opts = options.yAxis2;
  let y2: AxisModel | null = null;
  let y2Map: AxisMap | null = null;
  const rightSeries = series.filter((s) => s.yAxis === "right");
  if (rightSeries.length && yType !== "category") {
    const y2Log = y2Opts?.type === "log";
    const rightVisible = rightSeries.filter((s) => !s.hidden);
    // log: the extent of the logarithms
    const values = y2Log
      ? rightVisible.flatMap((s) => {
          const c = mapColumns(s.raw, LOG_MAP);
          return [c.yMin, c.yMax];
        })
      : valuesOf(rightVisible, y2Opts?.zero);
    const [lo, hi] = ensureSpan(...extent(values));
    let domain: Range =
      y2Opts?.nice === false
        ? [lo, hi]
        : y2Log
          ? decades([lo, hi])
          : alignedDomain(lo, hi, yRange, yOpts?.tickCount ?? 5);
    const y2Bound = (v: number) => (y2Log ? Math.log10(v) : v);
    if (y2Opts?.min !== undefined) domain[0] = y2Bound(y2Opts.min);
    if (y2Opts?.max !== undefined) domain[1] = y2Bound(y2Opts.max);
    domain = ensureSpan(domain[0], domain[1]);
    const scale = (yRange[1] - yRange[0]) / (domain[1] - domain[0]);
    const map: AxisMap = {
      scale,
      offset: yRange[0] - domain[0] * scale,
      log: y2Log,
    };
    y2Map = map;
    const zero = y2Log
      ? yRange[0]
      : mapper(map)(Math.min(Math.max(0, domain[0]), domain[1]));
    for (const s of rightSeries) {
      logColumns(s, map, zero);
      floorBases(s, yRange[0]);
    }
    y2 = axisModel(y2Opts, y2Log ? "log" : "linear", [], false, locale);
  }

  // range bars on a time axis (Gantt charts): rows are unrelated, the
  // tooltip shows the task under the pointer
  const timeline =
    yType === "time" &&
    series.some((s) => s.type === "bar") &&
    series.every((s) => (s.type === "bar" ? s.floating : s.type === "scatter"));

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

  const yFormat =
    yOpts?.format ??
    (percent && (bars.length || stackedLines.length)
      ? (v: number) => formatPercent(v, locale)
      : undefined);

  return {
    series,
    x: axisModel(xOpts, xType, categories, false, locale),
    y: {
      ...axisModel(yOpts, yType, yCategories, yType !== "category", locale),
      format: yFormat,
    },
    y2,
    y2Map,
    horizontal,
    locale,
    labels,
    formatValue: valueFormatter(locale),
    base: { x: xRange, y: yRange },
    allScatter,
    zoom: zoomAxes,
    tooltipMode:
      tooltipOptions?.mode ??
      (allScatter ? "nearest" : timeline ? "item" : "axis"),
    baseline: yLog ? yRange[0] : Math.min(Math.max(0, yRange[0]), yRange[1]),
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
