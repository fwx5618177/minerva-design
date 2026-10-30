// Option presets of the chart components, shared by every platform (React,
// mini-programs, React Native): they turn component props into engine
// options.

import {
  localeLabels,
  numberFormat,
  resolveLocale,
  type LabelDictionary,
} from "./locale";
import { tickStep } from "./scale";
import type {
  ChartAnnotation,
  ChartCurve,
  ChartInteractionOptions,
  ChartOptions,
  ChartPointDatum,
  ChartSeries,
  ChartSeriesType,
  ChartXValue,
} from "./types";

/** Default series names of the presets */
interface PresetLabels {
  value: string;
  values: string;
  count: string;
  change: string;
  tasks: string;
  progress: string;
  milestones: string;
}

const PRESET_LABELS: LabelDictionary<PresetLabels> = {
  en: {
    value: "Value",
    values: "Values",
    count: "Count",
    change: "Change",
    tasks: "Tasks",
    progress: "Progress",
    milestones: "Milestones",
  },
  zh: {
    value: "数值",
    values: "数值",
    count: "数量",
    change: "变化",
    tasks: "任务",
    progress: "进度",
    milestones: "里程碑",
  },
  ja: {
    value: "値",
    values: "値",
    count: "件数",
    change: "増減",
    tasks: "タスク",
    progress: "進捗",
    milestones: "マイルストーン",
  },
  fr: {
    value: "Valeur",
    values: "Valeurs",
    count: "Effectif",
    change: "Variation",
    tasks: "Tâches",
    progress: "Avancement",
    milestones: "Jalons",
  },
};

/** Default series names of the presets in a locale (the page language by default) */
export const presetLabels = (locale?: string): PresetLabels =>
  localeLabels(PRESET_LABELS, locale);

/** Gives the series without a `type` the type of the component */
export const withSeriesType = (
  series: readonly ChartSeries[],
  type: ChartSeriesType,
  stack?: string,
  curve?: ChartCurve,
): ChartSeries[] =>
  series.map((s) => {
    const t = s.type ?? type;
    return {
      ...s,
      type: t,
      ...(stack !== undefined && t === type ? { stack: s.stack ?? stack } : {}),
      ...(curve !== undefined && (t === "line" || t === "area")
        ? { curve: s.curve ?? curve }
        : {}),
    };
  });

/** Options of the line-like components */
export interface LineSeriesOptions {
  /** Stacks the series on top of each other */
  stacked?: boolean;
  /** Shape of the lines */
  curve?: ChartCurve;
}

/** Series of a LineChart (`area` fills them) */
export const lineSeries = (
  series: readonly ChartSeries[],
  area = false,
  extra: LineSeriesOptions = {},
) =>
  withSeriesType(
    series,
    area ? "area" : "line",
    extra.stacked ? "stack" : undefined,
    extra.curve,
  );

/** Series of an AreaChart */
export const areaSeries = (
  series: readonly ChartSeries[],
  extra: LineSeriesOptions = {},
) => lineSeries(series, true, extra);

/** Series of a BarChart (`stacked` stacks them, `labels` shows the values) */
export const barSeries = (
  series: readonly ChartSeries[],
  stacked = false,
  labels = false,
) =>
  withSeriesType(series, "bar", stacked ? "stack" : undefined).map((s) =>
    labels && s.type === "bar" ? { ...s, showLabels: s.showLabels ?? true } : s,
  );

/** Series of a ScatterChart */
export const scatterSeries = (series: readonly ChartSeries[]) =>
  withSeriesType(series, "scatter");

/** Series of a CandlestickChart */
export const candlestickSeries = (series: readonly ChartSeries[]) =>
  withSeriesType(series, "candlestick");

/** A cell of a HeatmapChart */
export interface HeatmapCell {
  /** Column: a category name (or a number on a numeric axis) */
  x: string | number;
  /** Row: a category name (or a number on a numeric axis) */
  y: string | number;
  /** Value mapped to the color scale; `null` leaves the cell empty */
  value: number | null;
}

/** Settings of a heatmap (the props of HeatmapChart) */
export interface HeatmapConfig {
  /** Cells */
  data: readonly HeatmapCell[];
  /** Column names in order (collected from the data when omitted) */
  xCategories?: readonly string[];
  /** Row names from bottom to top (collected from the data when omitted) */
  yCategories?: readonly string[];
  /** Colors from the lowest to the highest value; a ramp of the first palette color by default */
  colorScale?: readonly string[];
  /** Values at the ends of the color scale; the data range by default */
  valueRange?: readonly [number, number];
  /** Name of the value in the tooltip */
  name?: string;
  /** Corner radius of the cells, in pixels */
  radius?: number;
  /** Formats the values in the tooltip */
  format?: (value: number) => string;
}

/** Engine options of a heatmap */
export const heatmapChartOptions = (
  config: HeatmapConfig,
  base: Partial<ChartOptions> = {},
): ChartOptions => {
  const numericX = config.data.some((c) => typeof c.x === "number");
  const numericY = config.data.some((c) => typeof c.y === "number");
  return {
    ...base,
    series: [
      {
        id: "heatmap",
        name: config.name ?? presetLabels(base.locale).value,
        type: "heatmap",
        data: config.data.map((c) => ({ x: c.x, y: c.y, value: c.value })),
        colorScale: config.colorScale,
        valueRange: config.valueRange,
        radius: config.radius,
        format: config.format,
      },
    ],
    xAxis: {
      ...(numericX
        ? {}
        : { type: "category" as const, categories: config.xCategories }),
      grid: false,
      ...base.xAxis,
    },
    yAxis: {
      ...(numericY
        ? {}
        : { type: "category" as const, categories: config.yCategories }),
      grid: false,
      ...base.yAxis,
    },
    legend: base.legend ?? false,
    interaction: base.interaction ?? { zoom: false },
    tooltip: base.tooltip ?? { mode: "nearest" },
  };
};

/** Settings of a sparkline (the props of Sparkline) */
export interface SparklineConfig {
  /** Values (or `[x, y]` pairs, typed arrays, ...) */
  data: ChartSeries["data"];
  /**
   * How the values are drawn
   * @default "line"
   */
  type?: "line" | "area" | "bar";
  /** Color (any CSS color); the first palette color by default */
  color?: string;
  /**
   * Shape of the line
   * @default "smooth"
   */
  curve?: ChartCurve;
  /** Name shown in the tooltip */
  name?: string;
  /** Draws a reference line at this value (e.g. a target or the average) */
  reference?: number;
  /** Formats the value in the tooltip */
  format?: (value: number) => string;
}

/** Engine options of a sparkline: no axes, no legend, a tooltip only */
export const sparklineOptions = (
  config: SparklineConfig,
  base: Partial<ChartOptions> = {},
): ChartOptions => {
  const type = config.type ?? "line";
  return {
    ...base,
    series: [
      {
        id: "sparkline",
        name: config.name ?? presetLabels(base.locale).value,
        type,
        data: config.data,
        color: config.color,
        curve: type === "bar" ? undefined : (config.curve ?? "smooth"),
        lineWidth: 1.5,
        opacity: type === "area" ? 0.22 : undefined,
        radius: type === "bar" ? 1.5 : undefined,
        format: config.format,
      },
    ],
    xAxis: { visible: false, grid: false, ...base.xAxis },
    yAxis: { visible: false, grid: false, nice: false, ...base.yAxis },
    legend: false,
    padding: base.padding ?? { top: 4, right: 4, bottom: 4, left: 4 },
    interaction: base.interaction ?? { zoom: false },
    annotations:
      config.reference !== undefined
        ? [
            ...(base.annotations ?? []),
            {
              type: "line",
              axis: "y",
              value: config.reference,
              dash: [2, 3],
            },
          ]
        : base.annotations,
  };
};

/** A point of a QuadrantChart */
export interface QuadrantPoint {
  /** Position on the horizontal axis */
  x: number;
  /** Position on the vertical axis */
  y: number;
  /** Text drawn next to the dot and shown in the tooltip */
  label?: string;
  /** Dot color (any CSS color); the color of its quadrant by default */
  color?: string;
  /** Dot diameter in pixels */
  size?: number;
}

/** Title and color of a quadrant */
export interface QuadrantRegion {
  /** Title drawn in the outer corner of the quadrant */
  label?: string;
  /** Background tint and default dot color (any CSS color) */
  color?: string;
}

/** The four quadrants of a QuadrantChart */
export interface QuadrantRegions {
  topLeft?: QuadrantRegion;
  topRight?: QuadrantRegion;
  bottomLeft?: QuadrantRegion;
  bottomRight?: QuadrantRegion;
}

/** A quadrant, as seen on screen */
export type QuadrantCorner = keyof QuadrantRegions;

/** Texts at the four ends of the dividers, inside the plot */
export interface QuadrantAxisLabels {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

/** Settings of a quadrant matrix (the props of QuadrantChart) */
export interface QuadrantConfig {
  /** Points to place */
  points: readonly QuadrantPoint[];
  /**
   * Range of the horizontal axis
   * @default [0, 10]
   */
  xDomain?: [number, number];
  /**
   * Range of the vertical axis
   * @default [0, 10]
   */
  yDomain?: [number, number];
  /** X value of the vertical divider (the middle of `xDomain` by default) */
  xSplit?: number;
  /** Y value of the horizontal divider (the middle of `yDomain` by default) */
  ySplit?: number;
  /** Titles and colors of the quadrants */
  quadrants?: QuadrantRegions;
  /** Title of the horizontal axis */
  xLabel?: string;
  /** Title of the vertical axis */
  yLabel?: string;
  /** Texts at the ends of the dividers, drawn inside the plot (e.g. "Important" at the top) */
  axisLabels?: QuadrantAxisLabels;
  /**
   * Shows the numeric ticks of the axes; `false` keeps only the matrix
   * @default true
   */
  showTicks?: boolean;
  /** Reverses the horizontal axis (e.g. "urgent" on the left) */
  reverseX?: boolean;
  /**
   * Draws the labels next to the dots (overlapping labels are skipped)
   * @default true
   */
  showLabels?: boolean;
  /**
   * Dot diameter in pixels
   * @default 12
   */
  pointSize?: number;
  /** Name of the points in the tooltip */
  name?: string;
  /** Lets the user drag the dots (`drag` / `drop` events) */
  draggable?: boolean;
}

export const DEFAULT_QUADRANT_COLORS: Required<Record<QuadrantCorner, string>> =
  {
    topLeft: "var(--danger-color, #ef4444)",
    topRight: "var(--primary-color, #4f46e5)",
    bottomLeft: "var(--warning-color, #f59e0b)",
    bottomRight: "var(--text-secondary-color, #64748b)",
  };

const DIVIDER = "var(--border-strong-color, var(--border-color, #cbd5e1))";

const splits = (config: QuadrantConfig) => {
  const [x0, x1] = config.xDomain ?? [0, 10];
  const [y0, y1] = config.yDomain ?? [0, 10];
  return {
    x0,
    x1,
    y0,
    y1,
    xs: config.xSplit ?? (x0 + x1) / 2,
    ys: config.ySplit ?? (y0 + y1) / 2,
  };
};

/** Quadrant of a data position, as seen on screen */
export const quadrantOf = (
  config: Pick<
    QuadrantConfig,
    "xDomain" | "yDomain" | "xSplit" | "ySplit" | "reverseX"
  >,
  x: number,
  y: number,
): QuadrantCorner => {
  const { xs, ys } = splits(config as QuadrantConfig);
  const right = config.reverseX ? x < xs : x >= xs;
  const top = y >= ys;
  return top
    ? right
      ? "topRight"
      : "topLeft"
    : right
      ? "bottomRight"
      : "bottomLeft";
};

/** Center of a quadrant in data coordinates */
export const quadrantCenter = (
  config: Pick<
    QuadrantConfig,
    "xDomain" | "yDomain" | "xSplit" | "ySplit" | "reverseX"
  >,
  corner: QuadrantCorner,
): { x: number; y: number } => {
  const { x0, x1, y0, y1, xs, ys } = splits(config as QuadrantConfig);
  const visualRight = corner.endsWith("Right");
  const dataHigh = config.reverseX ? !visualRight : visualRight;
  return {
    x: dataHigh ? (xs + x1) / 2 : (x0 + xs) / 2,
    y: corner.startsWith("top") ? (ys + y1) / 2 : (y0 + ys) / 2,
  };
};

/** Engine options of a quadrant matrix */
export const quadrantChartOptions = (
  config: QuadrantConfig,
  base: Omit<ChartOptions, "series"> = {},
): ChartOptions => {
  const { x0, x1, y0, y1, xs, ys } = splits(config);
  const reverseX = !!config.reverseX;
  const color = (corner: QuadrantCorner) =>
    config.quadrants?.[corner]?.color ?? DEFAULT_QUADRANT_COLORS[corner];

  const series: ChartSeries[] = [
    {
      type: "scatter",
      name: config.name ?? "",
      pointSize: config.pointSize ?? 12,
      showLabels: config.showLabels ?? true,
      opacity: 0.9,
      data: config.points.map((p) => ({
        x: p.x,
        y: p.y,
        label: p.label,
        size: p.size,
        color: p.color ?? color(quadrantOf(config, p.x, p.y)),
      })),
    },
  ];

  // visual left / right -> data ranges
  const left: [number, number] = reverseX ? [xs, x1] : [x0, xs];
  const right: [number, number] = reverseX ? [x0, xs] : [xs, x1];
  const rect = (
    corner: QuadrantCorner,
    [xa, xb]: [number, number],
    [ya, yb]: [number, number],
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right",
  ): ChartAnnotation => ({
    type: "rect",
    x0: xa,
    x1: xb,
    y0: ya,
    y1: yb,
    color: color(corner),
    opacity: 0.07,
    label: config.quadrants?.[corner]?.label,
    labelPosition: position,
  });
  const ends = config.axisLabels ?? {};
  const visualLeft = reverseX ? x1 : x0;
  const visualRight = reverseX ? x0 : x1;
  const texts: ChartAnnotation[] = [
    ...(ends.top
      ? [{ type: "text", x: xs, y: y1, text: ends.top, anchor: "top" } as const]
      : []),
    ...(ends.bottom
      ? [
          {
            type: "text",
            x: xs,
            y: y0,
            text: ends.bottom,
            anchor: "bottom",
          } as const,
        ]
      : []),
    ...(ends.left
      ? [
          {
            type: "text",
            x: visualLeft,
            y: ys,
            text: ends.left,
            anchor: "left",
          } as const,
        ]
      : []),
    ...(ends.right
      ? [
          {
            type: "text",
            x: visualRight,
            y: ys,
            text: ends.right,
            anchor: "right",
          } as const,
        ]
      : []),
  ];

  const annotations: ChartAnnotation[] = [
    rect("topLeft", left, [ys, y1], "top-left"),
    rect("topRight", right, [ys, y1], "top-right"),
    rect("bottomLeft", left, [y0, ys], "bottom-left"),
    rect("bottomRight", right, [y0, ys], "bottom-right"),
    { type: "line", axis: "x", value: xs, dash: [], color: DIVIDER },
    { type: "line", axis: "y", value: ys, dash: [], color: DIVIDER },
    ...texts,
    ...(base.annotations ?? []),
  ];

  const showTicks = config.showTicks ?? true;
  const interaction: boolean | ChartInteractionOptions =
    base.interaction === false
      ? false
      : {
          zoom: false,
          ...(typeof base.interaction === "object" ? base.interaction : {}),
          ...(config.draggable ? { dragPoints: true } : {}),
        };

  return {
    ...base,
    series,
    annotations,
    tooltip:
      base.tooltip ??
      (showTicks
        ? undefined
        : {
            render: (event) => {
              const item = event.items[0];
              if (!item) return null;
              const region =
                config.quadrants?.[quadrantOf(config, item.x, item.y)]?.label;
              return [item.label ?? config.name ?? "", region ?? ""]
                .filter(Boolean)
                .join("\n");
            },
          }),
    xAxis: {
      min: x0,
      max: x1,
      title: config.xLabel,
      reverse: reverseX,
      nice: false,
      grid: false,
      tickCount: 4,
      visible: showTicks || !!config.xLabel,
      ...(showTicks ? {} : { format: () => "" }),
    },
    yAxis: {
      min: y0,
      max: y1,
      title: config.yLabel,
      nice: false,
      grid: false,
      tickCount: 4,
      visible: showTicks || !!config.yLabel,
      ...(showTicks ? {} : { format: () => "" }),
    },
    legend: base.legend ?? false,
    padding:
      base.padding ??
      (showTicks ? undefined : { top: 4, right: 4, bottom: 4, left: 4 }),
    interaction,
  };
};

// ------------------------------------------------------------- statistics

/** Finite values of a list, as a sorted typed array */
const sortedFinite = (values: ArrayLike<number>): Float64Array => {
  let n = 0;
  for (let i = 0; i < values.length; i++) if (Number.isFinite(values[i])) n++;
  const out = new Float64Array(n);
  let k = 0;
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    if (Number.isFinite(v)) out[k++] = v;
  }
  return out.sort();
};

/** Quantile `p` (0-1) of sorted values, linearly interpolated (NumPy / Excel) */
const quantileOf = (sorted: ArrayLike<number>, p: number): number => {
  const n = sorted.length;
  if (!n) return NaN;
  const at = Math.min(1, Math.max(0, p)) * (n - 1);
  const lo = Math.floor(at);
  const hi = Math.min(n - 1, lo + 1);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (at - lo);
};

/**
 * Quantiles of values (`[0.5, 0.95, 0.99]` gives the median, p95 and p99),
 * linearly interpolated like NumPy and Excel; non-finite values are ignored
 */
export const quantiles = (
  values: ArrayLike<number>,
  ps: readonly number[],
): number[] => {
  const sorted = sortedFinite(values);
  return ps.map((p) => quantileOf(sorted, p));
};

/** How the bins of a histogram are chosen: a count, or a rule */
export type HistogramBinning =
  number | "auto" | "sturges" | "freedman-diaconis";

/** Options of `binValues` */
export interface BinOptions {
  /**
   * Number of bins, or the rule choosing it: `sturges` (log2 n + 1, for
   * small normal-ish samples), `freedman-diaconis` (bin width from the
   * interquartile range, robust to outliers); `auto` uses Freedman-Diaconis
   * and Sturges when the spread is zero
   * @default "auto"
   */
  bins?: HistogramBinning;
  /** Range covered by the bins (values outside are not counted); the data range by default */
  domain?: readonly [number, number];
  /**
   * Rounds the bin width to 1, 2 or 5 × 10^k and aligns the edges on it
   * @default true
   */
  nice?: boolean;
}

/** Bins of a histogram */
export interface HistogramBins {
  /** Edges of the bins: one more than the bins */
  edges: number[];
  /** Number of values in every bin */
  counts: number[];
  /** Width of a bin */
  width: number;
  /** Number of values counted (finite, inside the domain) */
  total: number;
}

/** At most this many values are sorted to estimate the spread (Freedman-Diaconis) */
const SPREAD_SAMPLE = 100_000;

/**
 * Counts values into bins of equal width: linear in the number of values
 * (a million samples take a few milliseconds; the spread of large samples
 * is estimated on an even subsample)
 */
export const binValues = (
  values: ArrayLike<number>,
  options: BinOptions = {},
): HistogramBins => {
  let n = 0;
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    if (!Number.isFinite(v)) continue;
    n++;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  let [lo, hi] = options.domain ?? [min, max];
  if (!n || !Number.isFinite(lo) || !Number.isFinite(hi)) {
    return { edges: [0, 1], counts: [0], width: 1, total: 0 };
  }
  if (lo > hi) [lo, hi] = [hi, lo];
  if (hi === lo) {
    lo -= 0.5;
    hi += 0.5;
  }
  const span = hi - lo;
  const rule = options.bins ?? "auto";
  const sturges = Math.ceil(Math.log2(n)) + 1;
  let count: number;
  if (typeof rule === "number") {
    count = Math.round(rule);
  } else if (rule === "sturges") {
    count = sturges;
  } else {
    // Freedman-Diaconis: width = 2 IQR / n^(1/3)
    const stride = Math.max(1, Math.floor(values.length / SPREAD_SAMPLE));
    const sample: number[] = [];
    for (let i = 0; i < values.length; i += stride) {
      const v = values[i];
      if (Number.isFinite(v)) sample.push(v);
    }
    const sorted = Float64Array.from(sample).sort();
    const iqr = quantileOf(sorted, 0.75) - quantileOf(sorted, 0.25);
    const width = (2 * iqr) / Math.cbrt(n);
    count = width > 0 ? Math.ceil(span / width) : sturges;
  }
  count = Math.max(1, Math.min(1000, count || 1));
  let width = span / count;
  let start = lo;
  if (options.nice ?? true) {
    width = tickStep(lo, hi, count) || width;
    start = Math.floor(lo / width + 1e-9) * width;
    count = Math.max(1, Math.ceil((hi - start) / width - 1e-9));
  }
  const end = start + count * width;
  const counts = new Array<number>(count).fill(0);
  let total = 0;
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    if (!(v >= start && v <= end)) continue;
    // the last bin includes its right edge
    const k = Math.min(count - 1, Math.floor((v - start) / width));
    counts[k]++;
    total++;
  }
  const edges: number[] = [];
  for (let k = 0; k <= count; k++)
    edges.push(Number((start + k * width).toPrecision(12)));
  return { edges, counts, width, total };
};

/** Options of `histogramSeries` */
export interface HistogramSeriesOptions extends BinOptions {
  /** Name of the series (legend, tooltip) */
  name?: string;
  /** Bar color (any CSS color) */
  color?: string;
  /** Formats the edges of the bins in the tooltip */
  format?: (value: number) => string;
  /** Bins already computed (`binValues`): `values` are then ignored */
  binned?: HistogramBins;
  /**
   * Locale of the default name and of the bin edges
   * @default the page language
   */
  locale?: string;
}

/** Bar series of a histogram: one touching bar per bin, labelled with its range */
export const histogramSeries = (
  values: ArrayLike<number>,
  options: HistogramSeriesOptions = {},
): ChartSeries => {
  const bins = options.binned ?? binValues(values, options);
  const locale = resolveLocale(options.locale);
  const format =
    options.format ?? ((value: number) => formatEdge(value, locale));
  return {
    id: "histogram",
    name: options.name ?? presetLabels(locale).count,
    type: "bar",
    color: options.color,
    barWidth: 1,
    radius: 1,
    data: bins.counts.map((count, k) => {
      const a = bins.edges[k] ?? 0;
      const b = bins.edges[k + 1] ?? a;
      return {
        x: (a + b) / 2,
        y: count,
        label: `${format(a)} – ${format(b)}`,
      };
    }),
  };
};

const formatEdge = (value: number, locale: string) =>
  numberFormat(locale, { maximumSignificantDigits: 6 }).format(value);

/** Options of `boxplotStats` */
export interface BoxplotStatsOptions {
  /**
   * Reach of the whiskers in interquartile ranges beyond the box (Tukey:
   * 1.5); `"minmax"` extends them to the extremes (no outliers)
   * @default 1.5
   */
  whisker?: number | "minmax";
}

/** Five-number summary of a sample, with the outliers */
export interface BoxplotStats {
  /** Lower whisker: the smallest value within reach */
  low: number;
  /** First quartile */
  q1: number;
  median: number;
  /** Third quartile */
  q3: number;
  /** Upper whisker: the largest value within reach */
  high: number;
  /** Values beyond the whiskers */
  outliers: number[];
  min: number;
  max: number;
  mean: number;
  /** Number of finite values */
  count: number;
}

/** Quartiles, whiskers (Tukey's 1.5 IQR by default) and outliers of raw values */
export const boxplotStats = (
  values: ArrayLike<number>,
  options: BoxplotStatsOptions = {},
): BoxplotStats => {
  const sorted = sortedFinite(values);
  const n = sorted.length;
  if (!n) {
    return {
      low: NaN,
      q1: NaN,
      median: NaN,
      q3: NaN,
      high: NaN,
      outliers: [],
      min: NaN,
      max: NaN,
      mean: NaN,
      count: 0,
    };
  }
  const q1 = quantileOf(sorted, 0.25);
  const median = quantileOf(sorted, 0.5);
  const q3 = quantileOf(sorted, 0.75);
  const min = sorted[0];
  const max = sorted[n - 1];
  let sum = 0;
  for (let i = 0; i < n; i++) sum += sorted[i];
  const whisker = options.whisker ?? 1.5;
  let low = min;
  let high = max;
  const outliers: number[] = [];
  if (whisker !== "minmax") {
    const reach = (q3 - q1) * whisker;
    const from = q1 - reach;
    const to = q3 + reach;
    let i = 0;
    while (i < n && sorted[i] < from) outliers.push(sorted[i++]);
    low = i < n ? sorted[i] : q1;
    let j = n - 1;
    const upper: number[] = [];
    while (j >= 0 && sorted[j] > to) upper.push(sorted[j--]);
    high = j >= 0 ? sorted[j] : q3;
    outliers.push(...upper.reverse());
  }
  return {
    low: Math.min(low, q1),
    q1,
    median,
    q3,
    high: Math.max(high, q3),
    outliers,
    min,
    max,
    mean: sum / n,
    count: n,
  };
};

/** A sample of a box plot */
export interface BoxplotGroup {
  /** Category (or position) of the box */
  x: ChartXValue;
  /** Raw values: their quartiles, whiskers and outliers are computed */
  values: ArrayLike<number>;
  /** Color of the box (any CSS color) */
  color?: string;
}

/** Box plot data of raw samples (one datum per group) */
export const boxplotData = (
  groups: readonly BoxplotGroup[],
  options: BoxplotStatsOptions = {},
): ChartPointDatum[] =>
  groups.map((g) => {
    const s = boxplotStats(g.values, options);
    return {
      x: g.x,
      y: Number.isFinite(s.median) ? s.median : null,
      low: s.low,
      q1: s.q1,
      q3: s.q3,
      high: s.high,
      outliers: s.outliers,
      ...(g.color ? { color: g.color } : {}),
    };
  });

/** Series of a BoxPlotChart */
export const boxplotSeries = (series: readonly ChartSeries[]) =>
  withSeriesType(series, "boxplot");

// ---------------------------------------------------------------- waterfall

/** A bar of a waterfall chart */
export interface WaterfallStep {
  /** Category name of the bar */
  label: string;
  /** Change (positive or negative); ignored by totals */
  value?: number;
  /**
   * `subtotal` and `total` bars show the running total, from zero
   * @default "change"
   */
  kind?: "change" | "subtotal" | "total";
  /** Color of this bar (any CSS color) */
  color?: string;
}

/** Options of `waterfallSeries` */
export interface WaterfallOptions {
  /** Name of the series (tooltip) */
  name?: string;
  /** Color of the increases @default the success color */
  upColor?: string;
  /** Color of the decreases @default the danger color */
  downColor?: string;
  /** Color of the totals and subtotals @default the primary color */
  totalColor?: string;
  /**
   * Value the first change starts from
   * @default 0
   */
  start?: number;
  /**
   * Writes the change (or the total) at the end of every bar
   * @default false
   */
  labels?: boolean;
  /** Formats the values (labels, tooltip) */
  format?: (value: number) => string;
  /**
   * Locale of the default name
   * @default the page language
   */
  locale?: string;
}

/**
 * Floating bar series of a waterfall (bridge) chart: every change starts
 * where the previous one ended; totals and subtotals start from zero
 */
export const waterfallSeries = (
  steps: readonly WaterfallStep[],
  options: WaterfallOptions = {},
): ChartSeries => {
  const up = options.upColor ?? "var(--success-color, #16a34a)";
  const down = options.downColor ?? "var(--danger-color, #dc2626)";
  const total = options.totalColor ?? "var(--primary-color, #4f46e5)";
  let running = options.start ?? 0;
  const data: ChartPointDatum[] = steps.map((step) => {
    if (step.kind === "total" || step.kind === "subtotal") {
      return { x: step.label, y: running, color: step.color ?? total };
    }
    const value = step.value ?? 0;
    const from = running;
    running += value;
    return {
      x: step.label,
      y0: from,
      y: running,
      color: step.color ?? (value >= 0 ? up : down),
    };
  });
  return {
    id: "waterfall",
    name: options.name ?? presetLabels(options.locale).change,
    type: "bar",
    color: total,
    data,
    showLabels: options.labels ?? false,
    format: options.format,
  };
};

// ------------------------------------------------------------------ bubbles

/** Options of `bubbleSeries` */
export interface BubbleOptions {
  /**
   * Diameter in pixels of the smallest bubbles
   * @default 6
   */
  minSize?: number;
  /**
   * Diameter in pixels of the largest value
   * @default 48
   */
  maxSize?: number;
  /** Value drawn with `maxSize` (share a scale between charts); the largest value by default */
  maxValue?: number;
}

/**
 * Scatter series whose dots are sized by the `value` of their points: the
 * area of a bubble is proportional to its value (diameter ∝ √value), the
 * scale is shared by every series. Points are drawn from the largest to
 * the smallest, so small bubbles stay on top (hover indexes refer to that
 * order).
 */
export const bubbleSeries = (
  series: readonly ChartSeries[],
  options: BubbleOptions = {},
): ChartSeries[] => {
  const minSize = options.minSize ?? 6;
  const maxSize = options.maxSize ?? 48;
  const valuesOf = (data: ChartSeries["data"]): ArrayLike<number> | null => {
    if (typeof data !== "object" || data === null) return null;
    if (!("length" in data)) {
      const v = (data as { value?: ArrayLike<number> }).value;
      return v ?? null;
    }
    const list = data as ArrayLike<unknown>;
    const out = new Float64Array(list.length).fill(NaN);
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item && typeof item === "object" && !Array.isArray(item)) {
        const v = (item as { value?: unknown }).value;
        if (typeof v === "number") out[i] = v;
      }
    }
    return out;
  };
  let top = options.maxValue ?? 0;
  if (options.maxValue === undefined) {
    for (const s of series) {
      const values = valuesOf(s.data);
      if (!values) continue;
      for (let i = 0; i < values.length; i++) {
        const v = Math.abs(values[i]);
        if (v > top) top = v;
      }
    }
  }
  const sizeOf = (v: number) =>
    Number.isFinite(v) && top > 0
      ? Math.max(minSize, maxSize * Math.sqrt(Math.min(1, Math.abs(v) / top)))
      : minSize;
  return series.map((s) => {
    const base: ChartSeries = {
      ...s,
      type: s.type ?? "scatter",
      opacity: s.opacity ?? 0.68,
    };
    if (base.type !== "scatter") return base;
    const data = s.data;
    if (typeof data === "object" && data !== null && !("length" in data)) {
      const values = (data as { value?: ArrayLike<number> }).value;
      if (!values) return base;
      const size = new Float32Array(values.length);
      for (let i = 0; i < values.length; i++) size[i] = sizeOf(values[i]);
      return { ...base, data: { ...data, size } };
    }
    const list = data as ArrayLike<unknown>;
    const points: ChartPointDatum[] = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (!item || typeof item !== "object" || Array.isArray(item)) continue;
      const d = item as ChartPointDatum;
      points.push({
        ...d,
        size: d.size ?? sizeOf(typeof d.value === "number" ? d.value : NaN),
      });
    }
    points.sort((a, b) => (b.size ?? 0) - (a.size ?? 0));
    return { ...base, data: points };
  });
};

// -------------------------------------------------------------------- gantt

/** A task (or milestone) of a Gantt chart */
export interface GanttTask {
  /** Row name (unique) */
  name: string;
  /** Start (a timestamp or a date) */
  start: number | Date;
  /** End; omitted for milestones */
  end?: number | Date;
  /** Share done, 0-1: drawn as a solid bar over the task */
  progress?: number;
  /** Group (phase, team): a color and a legend entry per group */
  group?: string;
  /** Color of the task (any CSS color); the color of its group by default */
  color?: string;
  /** Draws a dot at `start` instead of a bar */
  milestone?: boolean;
}

/** Options of `ganttSeries` */
export interface GanttOptions {
  /** Colors of the groups in order of appearance (any CSS colors); the chart palette by default */
  colors?: readonly string[];
  /**
   * Name of the tasks without a group
   * @default "Tasks" (in the `locale`)
   */
  taskName?: string;
  /**
   * Name of the progress bars (legend, tooltip)
   * @default "Progress" (in the `locale`)
   */
  progressName?: string;
  /**
   * Name of the milestones (legend, tooltip)
   * @default "Milestones" (in the `locale`)
   */
  milestoneName?: string;
  /** Formats the progress shares (tooltip) @default "60%" */
  formatProgress?: (share: number) => string;
  /**
   * Locale of the default names and of the progress shares
   * @default the page language
   */
  locale?: string;
}

/** Series of a Gantt chart and the row names in order */
export interface GanttSeries {
  series: ChartSeries[];
  /** Task names from top to bottom (the `categories` of the x axis) */
  categories: string[];
  /** Time range of the tasks with a small margin (the `min` / `max` of the value axis) */
  domain: [number, number];
}

const THEMED = [
  "--primary-color",
  "--success-color",
  "--warning-color",
  "--danger-color",
  "--info-color",
];
const FALLBACK = [
  "#4f46e5",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#0ea5e9",
  "#8b5cf6",
  "#14b8a6",
  "#f97316",
];

/** Color `k` of the chart palette as a CSS color (theme variables first) */
export const paletteColor = (k: number): string => {
  const i = k % 8;
  const fallback = FALLBACK[i] ?? "#4f46e5";
  const themed = THEMED[i];
  return themed
    ? `var(--chart-series-${i + 1}, var(${themed}, ${fallback}))`
    : `var(--chart-series-${i + 1}, ${fallback})`;
};

const time = (v: number | Date | undefined) =>
  v instanceof Date ? v.getTime() : v === undefined ? NaN : v;

/**
 * Floating bar series of a Gantt chart (horizontal, on a time axis): a
 * translucent bar per task with its progress drawn over it, one series per
 * group, and the milestones as dots
 */
export const ganttSeries = (
  tasks: readonly GanttTask[],
  options: GanttOptions = {},
): GanttSeries => {
  const locale = resolveLocale(options.locale);
  const names = presetLabels(locale);
  const taskName = options.taskName ?? names.tasks;
  const groups: string[] = [];
  for (const t of tasks) {
    const g = t.group ?? taskName;
    if (!t.milestone && !groups.includes(g)) groups.push(g);
  }
  const colorOf = (g: string) => {
    const k = Math.max(0, groups.indexOf(g));
    return options.colors?.[k] ?? paletteColor(k);
  };
  const formatProgress =
    options.formatProgress ??
    ((share: number) =>
      numberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }).format(share));
  const series: ChartSeries[] = groups.map((g) => ({
    id: `gantt:${g}`,
    name: g,
    type: "bar",
    stack: "gantt",
    color: colorOf(g),
    opacity: 0.3,
    barWidth: 0.62,
    radius: 4,
    data: tasks
      .filter((t) => !t.milestone && (t.group ?? taskName) === g)
      .map((t) => ({
        x: t.name,
        y0: time(t.start),
        y: time(t.end ?? t.start),
        ...(t.color ? { color: t.color } : {}),
      })),
  }));
  const progress = tasks.filter(
    (t) => !t.milestone && t.progress !== undefined && t.progress > 0,
  );
  if (progress.length) {
    series.push({
      id: "gantt:progress",
      name: options.progressName ?? names.progress,
      type: "bar",
      stack: "gantt",
      // every bar has the color of its task: a neutral legend swatch
      color: "var(--text-secondary-color, #6b7280)",
      radius: 4,
      data: progress.map((t) => {
        const start = time(t.start);
        const end = time(t.end ?? t.start);
        const share = Math.min(1, Math.max(0, t.progress ?? 0));
        return {
          x: t.name,
          y0: start,
          y: start + (end - start) * share,
          label: formatProgress(share),
          color: t.color ?? colorOf(t.group ?? taskName),
        };
      }),
    });
  }
  const milestones = tasks.filter((t) => t.milestone);
  if (milestones.length) {
    series.push({
      id: "gantt:milestones",
      name: options.milestoneName ?? names.milestones,
      type: "scatter",
      color: "var(--text-color, #1f2937)",
      pointSize: 13,
      opacity: 1,
      data: milestones.map((t) => ({
        x: t.name,
        y: time(t.start),
        ...(t.color ? { color: t.color } : {}),
      })),
    });
  }
  let lo = Infinity;
  let hi = -Infinity;
  for (const t of tasks) {
    for (const v of [time(t.start), time(t.end ?? t.start)]) {
      if (v < lo) lo = v;
      if (v > hi) hi = v;
    }
  }
  // room for the milestone dots at the ends
  const pad = Number.isFinite(hi - lo) ? Math.max((hi - lo) * 0.025, 1) : 0;
  return {
    series,
    categories: tasks.map((t) => t.name),
    domain: Number.isFinite(lo) ? [lo - pad, hi + pad] : [0, 1],
  };
};

// -------------------------------------------------------------- range areas

/** Series of a RangeAreaChart: bands between `y0` and `y` (thin edges) */
export const rangeAreaSeries = (
  series: readonly ChartSeries[],
  curve?: ChartCurve,
) =>
  withSeriesType(series, "area", undefined, curve).map((s) =>
    s.type === "area" ? { ...s, lineWidth: s.lineWidth ?? 1.5 } : s,
  );
