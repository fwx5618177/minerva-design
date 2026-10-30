// The DOM-free half of a chart: annotations, layout, point labels, hit
// testing and tooltip content. Shared by createChart (DOM + GPU),
// createCanvasChart (any 2D context) and the React Native views.

import { axisTicks, type AxisTicks } from "./axis";
import { luminance, mix, toCss, unpackColor, type Rgba } from "./color";
import { nearestIndex } from "./data";
import { formatDuration, formatPercent, tickFormatter } from "./format";
import { numberFormat } from "./locale";
import {
  alongX,
  alongY,
  computePlot,
  createScales,
  heatCellStyle,
  screenRect,
  toData,
  toScreen,
  type Rect,
  type Scales,
} from "./layout";
import { gridOf, plottedY, type ChartModel, type SeriesModel } from "./model";
import type { PointLabel, ResolvedAnnotation } from "./overlay";
import type { ChartTheme } from "./theme";
import type { Range } from "./viewport";
import type {
  ChartAnnotation,
  ChartHoverEvent,
  ChartHoverItem,
  ChartOptions,
  ChartPadding,
  ChartView,
} from "./types";

export const MAX_POINT_LABELS = 300;
export const DEFAULT_PADDING = { top: 12, right: 16, bottom: 4, left: 4 };

export const fallbackResolve = (_value: string, fallback: Rgba) => fallback;

/**
 * Annotation colors resolved against the theme; `mapY` turns y values into
 * plotted units (log axes)
 */
export const resolveAnnotations = (
  annotations: readonly ChartAnnotation[] | undefined,
  theme: ChartTheme,
  mapY?: (value: number) => number,
): ResolvedAnnotation[] => {
  const resolve = theme.resolve ?? fallbackResolve;
  const y = <T extends number | undefined>(v: T): T =>
    (mapY && v !== undefined ? mapY(v) : v) as T;
  return (annotations ?? []).map((a) => {
    if (a.type === "rect") {
      const color = a.color ? resolve(a.color, theme.primary) : theme.primary;
      return {
        type: "rect",
        x0: a.x0,
        x1: a.x1,
        y0: y(a.y0),
        y1: y(a.y1),
        color,
        opacity: a.opacity ?? 0.08,
        label: a.label,
        labelPosition: a.labelPosition ?? "top-left",
        labelColor: a.labelColor
          ? resolve(a.labelColor, color)
          : mix(color, theme.text, 0.2),
      };
    }
    if (a.type === "text") {
      return {
        type: "text",
        x: a.x,
        y: y(a.y),
        text: a.text,
        anchor: a.anchor ?? "center",
        color: a.color ? resolve(a.color, theme.textMuted) : theme.textMuted,
        weight: a.weight ?? 500,
      };
    }
    return {
      type: "line",
      axis: a.axis,
      value: a.axis === "y" ? y(a.value) : a.value,
      color: a.color ? resolve(a.color, theme.textMuted) : theme.textMuted,
      width: a.width ?? 1,
      dash: [...(a.dash ?? [4, 4])],
      label: a.label,
    };
  });
};

export interface ChartLayout {
  plot: Rect;
  scales: Scales;
  xTicks: AxisTicks;
  yTicks: AxisTicks;
  /** Ticks of the right axis: at the left tick positions, labelled in right axis units */
  y2Ticks: AxisTicks | null;
}

export interface LayoutInput {
  model: ChartModel;
  view: ChartView;
  theme: ChartTheme;
  /** Size of the drawing area (legend excluded), CSS pixels */
  width: number;
  height: number;
  padding?: ChartPadding;
  /** Offset of the drawing area (e.g. below a legend) */
  top?: number;
  /** Width of a tick label in the theme font */
  measure: (text: string) => number;
}

/** Ticks, room for the axes and the plot rectangle */
export const layoutChart = (input: LayoutInput): ChartLayout => {
  const { model, view, theme, width, height, measure } = input;
  if (model.horizontal) return layoutHorizontal(input);
  // same count as the nice range of the model (its ends are then ticks),
  // fewer on short charts; category rows get a label each when they fit
  const yCount =
    model.y.tickCount ??
    (model.y.type === "category"
      ? Math.max(1, Math.floor((height - 40) / (theme.fontSize + 5)))
      : height >= 220
        ? 5
        : Math.max(2, Math.round((height - 48) / 52)));
  const yTicks = axisTicks(model.y, view.y, yCount);
  let yLabelWidth = 0;
  if (model.y.visible) {
    for (const label of yTicks.labels)
      yLabelWidth = Math.max(yLabelWidth, measure(label));
  }
  const y2Ticks = rightTicks(model, yTicks, view.y, yCount);
  let y2LabelWidth = 0;
  if (y2Ticks && model.y2?.visible) {
    for (const label of y2Ticks.labels)
      y2LabelWidth = Math.max(y2LabelWidth, measure(label));
  }
  let categoryWidth = 48;
  if (model.x.type === "category") {
    categoryWidth = 0;
    const step = Math.max(1, Math.floor(model.x.categories.length / 200));
    for (let i = 0; i < model.x.categories.length; i += step) {
      categoryWidth = Math.max(categoryWidth, measure(model.x.categories[i]));
    }
  }
  const padding = { ...DEFAULT_PADDING, ...input.padding };
  const plot = computePlot({
    width,
    height,
    padding,
    yLabelWidth: model.y.visible ? Math.ceil(yLabelWidth) : 0,
    y2LabelWidth: Math.ceil(y2LabelWidth),
    y2Title: !!model.y2?.title && !!model.y2.visible,
    xAxisVisible: model.x.visible,
    xTitle: !!model.x.title && model.x.visible,
    yTitle: !!model.y.title && model.y.visible,
    fontSize: theme.fontSize,
  });
  if (input.top) plot.y += input.top;
  const xCount =
    model.x.type === "category"
      ? Math.max(1, Math.floor(plot.width / (categoryWidth + 14)))
      : (model.x.tickCount ?? Math.max(3, Math.floor(plot.width / 88)));
  const xTicks = axisTicks(model.x, view.x, xCount);
  const scales = createScales(plot, view, model.x.reverse, model.y.reverse);
  return { plot, scales, xTicks, yTicks, y2Ticks };
};

/**
 * Right axis ticks: the left ticks labelled in right axis units; log axes
 * get their own decades
 */
const rightTicks = (
  model: ChartModel,
  yTicks: AxisTicks,
  view: Range,
  count: number,
): AxisTicks | null => {
  const axis = model.y2;
  const map = model.y2Map;
  if (!axis || !map || !map.scale) return null;
  if (map.log) {
    const a = (view[0] - map.offset) / map.scale;
    const b = (view[1] - map.offset) / map.scale;
    const ticks = axisTicks(axis, [Math.min(a, b), Math.max(a, b)], count);
    return {
      ...ticks,
      values: ticks.values.map((e) => e * map.scale + map.offset),
    };
  }
  const raw = yTicks.values.map((v) => (v - map.offset) / map.scale);
  const step = raw.length > 1 ? Math.abs(raw[1] - raw[0]) : 1;
  let maxAbs = 0;
  for (const v of raw) maxAbs = Math.max(maxAbs, Math.abs(v));
  const tick = axis.format ?? tickFormatter(step, maxAbs, model.locale);
  return {
    values: yTicks.values,
    labels: raw.map(tick),
    formatValue: axis.format ?? model.formatValue,
  };
};

/** Horizontal charts: the x axis on the left, the values along the bottom */
const layoutHorizontal = (input: LayoutInput): ChartLayout => {
  const { model, view, theme, width, height, measure } = input;
  const rows = Math.max(1, Math.floor((height - 40) / (theme.fontSize + 5)));
  const xCount =
    model.x.tickCount ??
    (model.x.type === "category"
      ? rows
      : height >= 220
        ? 5
        : Math.max(2, Math.round((height - 48) / 52)));
  const xTicks = axisTicks(model.x, view.x, xCount);
  let xLabelWidth = 0;
  if (model.x.visible) {
    if (model.x.type === "category") {
      // every name (the visible ones change when zooming)
      const names = model.x.categories;
      const step = Math.max(1, Math.floor(names.length / 200));
      for (let i = 0; i < names.length; i += step) {
        const name = model.x.format ? model.x.format(i) : names[i];
        xLabelWidth = Math.max(xLabelWidth, measure(name));
      }
    } else {
      for (const label of xTicks.labels)
        xLabelWidth = Math.max(xLabelWidth, measure(label));
    }
  }
  const padding = { ...DEFAULT_PADDING, ...input.padding };
  const plot = computePlot({
    width,
    height,
    padding,
    yLabelWidth: model.x.visible ? Math.ceil(xLabelWidth) : 0,
    xAxisVisible: model.y.visible,
    xTitle: !!model.y.title && model.y.visible,
    yTitle: !!model.x.title && model.x.visible,
    fontSize: theme.fontSize,
  });
  if (input.top) plot.y += input.top;
  const yCount =
    model.y.tickCount ??
    (model.y.type === "category"
      ? Math.max(1, Math.floor(plot.width / 60))
      : Math.max(3, Math.min(8, Math.floor(plot.width / 88))));
  const yTicks = axisTicks(model.y, view.y, yCount);
  const scales = createScales(
    plot,
    view,
    model.x.reverse,
    model.y.reverse,
    true,
  );
  return { plot, scales, xTicks, yTicks, y2Ticks: null };
};

/** Labels of the visible scatter points and bar values (`showLabels`) */
export const collectPointLabels = (
  model: ChartModel,
  view: ChartView,
  s: Scales,
  yTicks?: AxisTicks | null,
): PointLabel[] => {
  const labels: PointLabel[] = [];
  // 100% stacks: the axis shows percents, the labels the actual values
  const axisFormat = model.percent
    ? model.formatValue
    : (yTicks?.formatValue ?? model.formatValue);
  for (const series of model.series) {
    if (series.hidden || !series.showLabels) continue;
    if (series.type === "bar" && series.barTop) {
      // 100% stacks and right axis series: the values of the data
      const format =
        series.format ??
        (series.yAxis === "right"
          ? (model.y2?.format ?? model.formatValue)
          : axisFormat);
      const { x, count } = series.cols;
      const { y, y0, labels: texts } = series.raw;
      const top = series.barTop;
      const [x0, x1] = view.x[0] <= view.x[1] ? view.x : [view.x[1], view.x[0]];
      for (let i = 0; i < count && labels.length < MAX_POINT_LABELS; i++) {
        const xv = x[i] + series.barOffset;
        if (!Number.isFinite(y[i]) || xv < x0 || xv > x1) continue;
        // the end away from the base (the top, or the bottom of negative bars)
        const negative = top[i] < (series.barBase?.[i] ?? 0);
        const reversed = negative !== model.y.reverse;
        const p = toScreen(s, xv, top[i]);
        const step = series.floating && y0 && Number.isFinite(y0[i]);
        // ranges on a time axis (Gantt tasks) have no value to write
        if (step && model.y.type === "time" && !texts?.[i]) continue;
        const delta = step ? y[i] - (y0?.[i] ?? 0) : 0;
        labels.push({
          x: p.x,
          y: p.y,
          r: 0,
          text:
            texts?.[i] ??
            (step ? `${delta > 0 ? "+" : ""}${format(delta)}` : format(y[i])),
          placement: s.horizontal
            ? reversed
              ? "left"
              : "right"
            : reversed
              ? "below"
              : "above",
        });
      }
      continue;
    }
    if (series.type !== "scatter") continue;
    const { x, y, count, labels: texts, size } = series.cols;
    if (!texts) continue;
    for (let i = 0; i < count && labels.length < MAX_POINT_LABELS; i++) {
      const text = texts[i];
      if (!text) continue;
      const xi = x[i];
      const yi = y[i];
      if (xi < view.x[0] || xi > view.x[1] || yi < view.y[0] || yi > view.y[1])
        continue;
      const d = size && size[i] > 0 ? size[i] : series.pointSize;
      const p = toScreen(s, xi, yi);
      labels.push({ x: p.x, y: p.y, r: d / 2, text });
    }
  }
  return labels;
};

// ---------------------------------------------------------------- hit tests

interface Candidate {
  series: SeriesModel;
  index: number;
  /** Pixel position of the point */
  px: number;
  py: number;
  /** Distance along the x axis */
  dx: number;
  dist: number;
  inside: boolean;
  /** Box plots: value of the outlier under the pointer */
  outlier?: number;
}

/** Bars and box plots sit in a slot of their category */
const slotOffset = (s: SeriesModel) =>
  s.type === "bar" || s.type === "boxplot" ? s.barOffset : 0;

/**
 * Screen position of a point (the end of a bar or stack, the close of a
 * candle, the median of a box)
 */
export const pointOf = (s: SeriesModel, i: number, sc: Scales) => {
  const p = toScreen(sc, s.cols.x[i] + slotOffset(s), plottedY(s, i));
  return { px: p.x, py: p.y };
};

/** Whether a pixel (along x, along y) is on a column from `a` to `b` */
const onColumn = (
  sc: Scales,
  center: number,
  half: number,
  a: number,
  b: number,
  ax: number,
  ay: number,
) => {
  const pa = sc.yToPx(a);
  const pb = sc.yToPx(b);
  return (
    Math.abs(ax - center) <= half &&
    ay >= Math.min(pa, pb) - 2 &&
    ay <= Math.max(pa, pb) + 2
  );
};

const candidateOf = (
  s: SeriesModel,
  i: number,
  px: number,
  py: number,
  sc: Scales,
): Candidate => {
  const p = pointOf(s, i, sc);
  const ax = alongX(sc, px, py);
  const ay = alongY(sc, px, py);
  const center = sc.xToPx(s.cols.x[i] + slotOffset(s));
  let inside = false;
  if (s.type === "bar" && s.barBase && s.barTop) {
    const half = s.barHalfWidth / Math.abs(sc.xPerPx);
    inside = onColumn(sc, center, half, s.barBase[i], s.barTop[i], ax, ay);
  } else if (s.type === "candlestick" || s.type === "boxplot") {
    const { high, low, y } = s.cols;
    const half = Math.max(s.barHalfWidth / Math.abs(sc.xPerPx), 3);
    const a = high ? high[i] : y[i];
    const b = low ? low[i] : y[i];
    inside = onColumn(sc, center, half, a, b, ax, ay);
  }
  return {
    series: s,
    index: i,
    px: p.px,
    py: p.py,
    dx: Math.abs(sc.xToPx(s.cols.x[i]) - ax),
    dist: inside ? 0 : Math.hypot(p.px - px, p.py - py),
    inside,
  };
};

/** Outlier of a box under a pixel (`undefined` when none is in reach) */
const outlierAt = (
  s: SeriesModel,
  i: number,
  px: number,
  py: number,
  sc: Scales,
  slop: number,
): number | undefined => {
  const list = s.cols.outliers?.[i];
  if (!list) return undefined;
  const center = sc.xToPx(s.cols.x[i] + slotOffset(s));
  const ax = alongX(sc, px, py) - center;
  const ay = alongY(sc, px, py);
  const reach = s.outlierSize / 2 + 4 + slop;
  let best: number | undefined;
  let bestDist = reach;
  list.forEach((v, k) => {
    const d = Math.hypot(ax, sc.yToPx(v) - ay);
    if (d <= bestDist) {
      bestDist = d;
      // the value of the data (right axis series are mapped)
      best = s.raw.outliers?.[i]?.[k] ?? v;
    }
  });
  return best;
};

/** Diameter of a scatter dot */
export const dotSize = (s: SeriesModel, i: number) =>
  s.cols.size && s.cols.size[i] > 0 ? s.cols.size[i] : s.pointSize;

const maxSizes = new WeakMap<Float32Array, number>();

/** Largest dot of a series (bubbles reach further than plain dots) */
const maxDot = (s: SeriesModel) => {
  const sizes = s.cols.size;
  if (!sizes) return s.pointSize;
  let max = maxSizes.get(sizes);
  if (max === undefined) {
    max = s.pointSize;
    for (let i = 0; i < sizes.length; i++) if (sizes[i] > max) max = sizes[i];
    maxSizes.set(sizes, max);
  }
  return max;
};

const nearestScatter = (
  s: SeriesModel,
  px: number,
  py: number,
  sc: Scales,
  slop: number,
) => {
  const radius = Math.max(maxDot(s) / 2 + 6, 10) + slop;
  const at = toData(sc, px, py);
  const rx = radius * Math.abs(sc.xPerPx);
  const ry = radius * Math.abs(sc.yPerPx);
  let best = -1;
  let bestDist = Infinity;
  const { x, y } = s.cols;
  gridOf(s).query(at.x - rx, at.x + rx, at.y - ry, at.y + ry, (i) => {
    const p = toScreen(sc, x[i], y[i]);
    const d = Math.hypot(p.x - px, p.y - py);
    const reach = Math.max(dotSize(s, i) / 2 + 4, 8) + slop;
    if (d <= reach && d <= bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
};

/** Heatmap cell containing a data position, -1 if none */
const cellAt = (s: SeriesModel, xv: number, yv: number) => {
  const { x: hx, y: hy } = s.cellHalf;
  const { x, y } = s.cols;
  let found = -1;
  gridOf(s).query(xv - hx, xv + hx, yv - hy, yv + hy, (i) => {
    if (
      s.cellColors?.[i] &&
      Math.abs(x[i] - xv) <= hx &&
      Math.abs(y[i] - yv) <= hy
    ) {
      found = i;
    }
  });
  return found;
};

const nearestX = (s: SeriesModel, xv: number) => {
  const { x, y, count, sorted } = s.cols;
  if (sorted) return nearestIndex(x, y, count, xv);
  let best = -1;
  let bestD = Infinity;
  for (let i = 0; i < count; i++) {
    if (!Number.isFinite(y[i])) continue;
    const d = Math.abs(x[i] - xv);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
};

/** Hover payload item of a point (values of the data, right axis included) */
export const hoverItemOf = (s: SeriesModel, index: number): ChartHoverItem => {
  const pc = s.pointColors?.[index];
  const { open, high, low, value, y0, q1, q3, outliers, labels } = s.raw;
  const label = labels?.[index];
  let color = pc ? toCss(pc) : s.colorCss;
  const extra: Partial<ChartHoverItem> = {};
  if (s.type === "candlestick") {
    const o = open ? open[index] : NaN;
    if (Number.isFinite(o)) extra.open = o;
    if (high && Number.isFinite(high[index])) extra.high = high[index];
    if (low && Number.isFinite(low[index])) extra.low = low[index];
    color = toCss(s.raw.y[index] < o ? s.downColor : s.upColor);
  } else if (s.type === "heatmap") {
    const v = value ? value[index] : s.raw.y[index];
    if (Number.isFinite(v)) extra.value = v;
    const packed = s.cellColors?.[index];
    if (packed) color = toCss(unpackColor(packed));
  } else if (s.type === "boxplot") {
    if (high && Number.isFinite(high[index])) extra.high = high[index];
    if (low && Number.isFinite(low[index])) extra.low = low[index];
    if (q1 && Number.isFinite(q1[index])) extra.q1 = q1[index];
    if (q3 && Number.isFinite(q3[index])) extra.q3 = q3[index];
    const out = outliers?.[index];
    if (out) extra.outliers = out.length;
  } else {
    if (y0 && Number.isFinite(y0[index])) extra.y0 = y0[index];
    if (s.type === "scatter" && value && Number.isFinite(value[index]))
      extra.value = value[index];
  }
  return {
    seriesIndex: s.index,
    seriesId: s.id,
    seriesName: s.name,
    index,
    x: s.raw.x[index],
    y: s.raw.y[index],
    color,
    ...(label !== undefined ? { label } : {}),
    ...extra,
  };
};

const eventOf = (
  candidates: Candidate[],
  xTicks: AxisTicks | null,
): ChartHoverEvent | null => {
  if (!candidates.length) return null;
  candidates.sort((a, b) => a.series.index - b.series.index);
  const items = candidates.map((c) => {
    const item = hoverItemOf(c.series, c.index);
    if (c.outlier !== undefined) item.outlier = c.outlier;
    return item;
  });
  const x = items[0].x;
  return { items, x, xLabel: xTicks?.formatValue(x) ?? String(x) };
};

/**
 * Points under a pixel of the stage: the nearest point (scatter / `nearest`
 * tooltips) or every series at the nearest x (`axis` tooltips).
 * `slop` widens the reach of the dots (touch screens).
 */
export const hitTest = (
  model: ChartModel,
  sc: Scales,
  xTicks: AxisTicks | null,
  px: number,
  py: number,
  slop = 0,
): ChartHoverEvent | null => {
  const { plot } = sc;
  const margin = 6 + slop;
  if (
    px < plot.x - margin ||
    px > plot.x + plot.width + margin ||
    py < plot.y - margin ||
    py > plot.y + plot.height + margin
  ) {
    return null;
  }
  const at = toData(sc, px, py);
  const scatter: Candidate[] = [];
  const others: Candidate[] = [];
  for (const s of model.series) {
    if (s.hidden || !s.tooltip || s.cols.count === 0) continue;
    if (s.type === "scatter") {
      const i = nearestScatter(s, px, py, sc, slop);
      if (i >= 0) scatter.push(candidateOf(s, i, px, py, sc));
    } else if (s.type === "heatmap") {
      const i = cellAt(s, at.x, at.y);
      if (i >= 0) {
        const c = candidateOf(s, i, px, py, sc);
        c.inside = true;
        c.dist = 0;
        scatter.push(c);
      }
    } else {
      const i = nearestX(s, at.x);
      if (i < 0) continue;
      const c = candidateOf(s, i, px, py, sc);
      if (s.type === "boxplot") {
        c.outlier = outlierAt(s, i, px, py, sc, slop);
        if (c.outlier !== undefined) {
          c.inside = true;
          c.dist = 0;
        }
      }
      others.push(c);
    }
  }
  if (model.tooltipMode === "item") {
    // the shape under the pointer only: bars, boxes, cells, dots in reach
    // and lines within a few pixels; the last drawn wins
    const all = [...scatter, ...others].filter(
      (c) =>
        c.inside ||
        c.series.type === "scatter" ||
        ((c.series.type === "line" || c.series.type === "area") &&
          c.dist <= 8 + slop),
    );
    if (!all.length) return null;
    const best = all.reduce((a, b) =>
      b.dist < a.dist || (b.dist === a.dist && b.series.index > a.series.index)
        ? b
        : a,
    );
    return eventOf([best], xTicks);
  }
  if (model.tooltipMode === "nearest") {
    const all = [...scatter, ...others].filter(
      (c) => c.inside || c.series.type === "scatter" || c.dist <= 32 + slop,
    );
    if (!all.length) return null;
    const best = all.reduce((a, b) => (b.dist <= a.dist ? b : a));
    return eventOf([best], xTicks);
  }
  if (!others.length) {
    if (!scatter.length) return null;
    return eventOf(
      [scatter.reduce((a, b) => (b.dist <= a.dist ? b : a))],
      xTicks,
    );
  }
  const bestDx = Math.min(...others.map((c) => c.dx));
  const bandPx = model.x.type === "category" ? 0.5 / Math.abs(sc.xPerPx) : 0;
  const aligned = others.filter((c) => c.dx <= bestDx + Math.max(1, bandPx));
  const first = aligned.reduce((a, b) => (b.dx < a.dx ? b : a));
  const ordered = [first, ...aligned.filter((c) => c !== first), ...scatter];
  const event = eventOf(ordered, xTicks);
  if (event) {
    event.x = hoverItemOf(first.series, first.index).x;
    event.xLabel = xTicks?.formatValue(event.x) ?? String(event.x);
  }
  return event;
};

/** Whether two hover payloads point at the same points */
export const sameHover = (
  a: ChartHoverEvent | null,
  b: ChartHoverEvent | null,
): boolean =>
  a === b ||
  (!!a &&
    !!b &&
    a.items.length === b.items.length &&
    a.items.every(
      (it, i) =>
        it.index === b.items[i].index &&
        it.seriesIndex === b.items[i].seriesIndex,
    ));

// ------------------------------------------------------------------ tooltip

/** Change of a candlestick: `+1.25%` */
const CHANGE_PERCENT: Intl.NumberFormatOptions = {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export interface TooltipRow {
  /** Swatch color (CSS) */
  color: string | null;
  name: string;
  value: string;
}

export interface TooltipContent {
  title: string;
  /** Swatch of the title (single scatter point, Gantt task) */
  titleColor: string | null;
  /** Muted line below the title (the group of a Gantt task) */
  subtitle?: string;
  rows: TooltipRow[];
}

/** Extra rows of a point (`details` of its datum) */
const detailRows = (s: SeriesModel, index: number): TooltipRow[] =>
  s.raw.details?.[index]?.map((d) => ({
    color: null,
    name: d.name,
    value: d.value,
  })) ?? [];

/**
 * Default tooltip content of a hover payload; `y2Ticks` formats the values
 * of the right axis series
 */
export const tooltipContent = (
  model: ChartModel,
  event: ChartHoverEvent,
  yTicks: AxisTicks | null,
  y2Ticks: AxisTicks | null = null,
): TooltipContent => {
  const yFormat = yTicks?.formatValue ?? String;
  const formatOf = (s: SeriesModel) =>
    s.format ??
    (s.yAxis === "right"
      ? (y2Ticks?.formatValue ?? model.y2?.format ?? model.formatValue)
      : yFormat);
  const names = model.labels;
  const first = event.items[0];
  const firstSeries = first ? model.series[first.seriesIndex] : null;
  if (
    event.items.length === 1 &&
    first &&
    firstSeries?.type === "bar" &&
    first.y0 !== undefined &&
    model.y.type === "time"
  ) {
    // a task of a Gantt chart / timeline: its dates and its length
    const format = formatOf(firstSeries);
    const title = first.label ?? event.xLabel;
    return {
      title,
      titleColor: first.color,
      subtitle:
        first.label !== undefined
          ? `${event.xLabel} · ${firstSeries.name}`
          : firstSeries.name,
      rows: [
        { color: null, name: names.start, value: format(first.y0) },
        { color: null, name: names.end, value: format(first.y) },
        {
          color: null,
          name: names.duration,
          value: formatDuration(first.y - first.y0, model.locale),
        },
        ...detailRows(firstSeries, first.index),
      ],
    };
  }
  if (event.items.length === 1 && firstSeries?.type === "heatmap") {
    const yName =
      model.y.type === "category"
        ? (model.y.categories[Math.round(first.y)] ?? yFormat(first.y))
        : yFormat(first.y);
    return {
      title: `${event.xLabel} · ${yName}`,
      titleColor: null,
      rows: [
        {
          color: first.color,
          name: first.label ?? firstSeries.name,
          value:
            first.value === undefined
              ? "–"
              : (firstSeries.format ?? model.formatValue)(first.value),
        },
        ...detailRows(firstSeries, first.index),
      ],
    };
  }
  const scatterOnly = event.items.every(
    (it) => model.series[it.seriesIndex].type === "scatter",
  );
  if (scatterOnly && event.items.length === 1) {
    const it = event.items[0];
    const s = model.series[it.seriesIndex];
    const valueRow: TooltipRow[] =
      it.value !== undefined
        ? [
            {
              color: null,
              name: s.valueName ?? names.value,
              value: (s.format ?? model.formatValue)(it.value),
            },
          ]
        : [];
    if (model.x.type === "category") {
      // a dot on a category (Gantt milestones, dot plots)
      return {
        title: it.label ?? event.xLabel,
        titleColor: null,
        rows: [
          { color: it.color, name: it.seriesName, value: formatOf(s)(it.y) },
          ...valueRow,
          ...detailRows(s, it.index),
        ],
      };
    }
    const rows: TooltipRow[] = [
      { color: null, name: model.x.title ?? names.x, value: event.xLabel },
      {
        color: null,
        name:
          (s.yAxis === "right" ? model.y2?.title : model.y.title) ?? names.y,
        value: formatOf(s)(it.y),
      },
      ...valueRow,
      ...detailRows(s, it.index),
    ];
    if (it.label !== undefined && model.series.length > 1)
      rows.push({ color: null, name: "", value: it.seriesName });
    return { title: it.label ?? it.seriesName, titleColor: it.color, rows };
  }
  const rows: TooltipRow[] = [];
  /** Row of every item */
  const rowOf: number[] = [];
  // one labelled bar on a numeric axis (a histogram bin): the label is the title
  const binTitle =
    event.items.length === 1 &&
    firstSeries?.type === "bar" &&
    model.x.type !== "category" &&
    first?.label !== undefined
      ? first.label
      : null;
  for (const it of event.items) {
    const s = model.series[it.seriesIndex];
    const format = formatOf(s);
    rowOf.push(rows.length);
    if (s.type === "candlestick") {
      const change =
        it.open !== undefined && it.open !== 0
          ? ((it.y - it.open) / Math.abs(it.open)) * 100
          : NaN;
      rows.push({
        color: it.color,
        name: s.name,
        value: Number.isFinite(change)
          ? `${change >= 0 ? "+" : ""}${numberFormat(model.locale, CHANGE_PERCENT).format(change / 100)}`
          : "",
      });
      const ohlc: [string, number | undefined][] = [
        [names.open, it.open],
        [names.high, it.high],
        [names.low, it.low],
        [names.close, it.y],
      ];
      for (const [name, v] of ohlc) {
        if (v !== undefined && Number.isFinite(v))
          rows.push({ color: null, name, value: format(v) });
      }
      continue;
    }
    if (s.type === "boxplot") {
      if (it.outlier !== undefined) {
        // an outlier: its value and its group
        rows.push(
          {
            color: it.color,
            name: it.label ? `${it.seriesName} · ${it.label}` : it.seriesName,
            value: "",
          },
          { color: null, name: names.outlier, value: format(it.outlier) },
        );
        continue;
      }
      rows.push({
        color: it.color,
        name: it.label ? `${it.seriesName} · ${it.label}` : it.seriesName,
        value: "",
      });
      const stats: [string, number | undefined][] = [
        [names.max, it.high],
        [names.q3, it.q3],
        [names.median, it.y],
        [names.q1, it.q1],
        [names.min, it.low],
      ];
      for (const [name, v] of stats) {
        if (v !== undefined && Number.isFinite(v))
          rows.push({ color: null, name, value: format(v) });
      }
      if (it.outliers)
        rows.push({
          color: null,
          name: names.outliers,
          value: String(it.outliers),
        });
      continue;
    }
    let value = format(it.y);
    if (it.y0 !== undefined) {
      // waterfall steps: the change; time ranges and bands: both ends
      const delta = it.y - it.y0;
      value =
        s.type === "bar" && model.y.type !== "time"
          ? `${delta > 0 ? "+" : ""}${format(delta)}`
          : `${format(it.y0)} – ${format(it.y)}`;
    }
    rows.push({
      color: it.color,
      name:
        it.label && binTitle === null
          ? `${it.seriesName} · ${it.label}`
          : it.seriesName,
      value,
    });
    rows.push(...detailRows(s, it.index));
  }
  if (model.percent) {
    // 100% stacks: the share of every value next to it
    const totals = new Map<string, number>();
    for (const it of event.items) {
      const stack = stackIdOf(model, it.seriesIndex);
      if (stack !== null && Number.isFinite(it.y))
        totals.set(stack, (totals.get(stack) ?? 0) + Math.abs(it.y));
    }
    event.items.forEach((it, k) => {
      const stack = stackIdOf(model, it.seriesIndex);
      const total = stack !== null ? totals.get(stack) : undefined;
      const row = rows[rowOf[k]];
      if (total && row && Number.isFinite(it.y)) {
        const format = model.series[it.seriesIndex].format ?? model.formatValue;
        row.value = `${format(it.y)} · ${formatPercent((Math.abs(it.y) / total) * 100, model.locale, true)}`;
      }
    });
  }
  return { title: binTitle ?? event.xLabel, titleColor: null, rows };
};

/** Stack of a series in a 100% chart (`null` when it is not stacked) */
const stackIdOf = (model: ChartModel, seriesIndex: number): string | null =>
  model.series[seriesIndex].hidden ? null : model.stacks[seriesIndex];

/**
 * Shape of the hover marker of an item: a dot with a soft halo on a point,
 * a band behind the hovered bar group / candle, or the outline of a cell
 */
export type HoverMark =
  | {
      kind: "dot";
      x: number;
      y: number;
      size: number;
      color: string;
      /** Translucent series color of the halo around the dot */
      halo: string;
    }
  | { kind: "band"; x: number; y: number; width: number; height: number }
  | {
      /** Soft band over the row / column of a hovered cell (above the data) */
      kind: "guide";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      /** The hovered cell, lifted, with a ring inside its edge */
      kind: "cell";
      x: number;
      y: number;
      width: number;
      height: number;
      /** Fill of the cell (CSS) */
      color: string;
      /** Ring color (CSS), contrasting with the fill */
      ring: string;
      radius: number;
    };

/** Markers of the hovered points (pixels of the stage); bands come first */
export const hoverMarks = (
  model: ChartModel,
  sc: Scales,
  event: ChartHoverEvent,
): HoverMark[] => {
  const marks: HoverMark[] = [];
  const { plot } = sc;
  let bandLo = Infinity;
  let bandHi = -Infinity;
  for (const it of event.items) {
    const s = model.series[it.seriesIndex];
    if (s.type === "boxplot" && it.outlier !== undefined) {
      const p = toScreen(sc, it.x + slotOffset(s), plottedOutlier(s, it));
      marks.push({
        kind: "dot",
        x: p.x,
        y: p.y,
        size: s.outlierSize + 3,
        color: it.color,
        halo: toCss(s.pointColors?.[it.index] ?? s.color, 0.2),
      });
      continue;
    }
    if (s.type === "bar" || s.type === "candlestick" || s.type === "boxplot") {
      const c = sc.xToPx(it.x + slotOffset(s));
      const half = Math.max(s.barHalfWidth / Math.abs(sc.xPerPx), 1);
      bandLo = Math.min(bandLo, c - half);
      bandHi = Math.max(bandHi, c + half);
      continue;
    }
    if (s.type === "heatmap") {
      const cx = sc.xToPx(it.x);
      const cy = sc.yToPx(it.y);
      const hw = Math.abs(s.cellHalf.x / sc.xPerPx);
      const hh = Math.abs(s.cellHalf.y / sc.yPerPx);
      const cell = screenRect(sc, cx - hw, cx + hw, cy - hh, cy + hh);
      const style = heatCellStyle(cell.width, cell.height, s.radius);
      // the row and the column, clipped to the plot
      const top = Math.max(plot.y, cell.y);
      const bottom = Math.min(plot.y + plot.height, cell.y + cell.height);
      const left = Math.max(plot.x, cell.x);
      const right = Math.min(plot.x + plot.width, cell.x + cell.width);
      if (bottom > top)
        marks.push({
          kind: "guide",
          x: plot.x,
          y: top,
          width: plot.width,
          height: bottom - top,
        });
      if (right > left)
        marks.push({
          kind: "guide",
          x: left,
          y: plot.y,
          width: right - left,
          height: plot.height,
        });
      const packed = s.cellColors?.[it.index];
      const fill = packed ? unpackColor(packed) : s.color;
      marks.push({
        kind: "cell",
        x: cell.x + style.inset,
        y: cell.y + style.inset,
        width: Math.max(1, cell.width - style.inset * 2),
        height: Math.max(1, cell.height - style.inset * 2),
        color: it.color,
        ring: contrastRing(fill),
        radius: style.radius,
      });
      continue;
    }
    const { px, py } = pointOf(s, it.index, sc);
    if (
      px < plot.x - 1 ||
      px > plot.x + plot.width + 1 ||
      py < plot.y - 1 ||
      py > plot.y + plot.height + 1
    ) {
      continue;
    }
    const size =
      s.type === "scatter"
        ? dotSize(s, it.index) + 4
        : Math.max(9, s.lineWidth * 2 + 5);
    const rgba = s.pointColors?.[it.index] ?? s.color;
    marks.push({
      kind: "dot",
      x: px,
      y: py,
      size,
      color: it.color,
      halo: toCss(rgba, 0.2),
    });
  }
  if (bandHi > bandLo) {
    // the group of bars plus a margin, clipped to the plot
    const pad = Math.max(4, (bandHi - bandLo) * 0.14);
    const lo = sc.horizontal ? plot.y : plot.x;
    const hi = lo + (sc.horizontal ? plot.height : plot.width);
    const a = Math.max(lo, bandLo - pad);
    const b = Math.min(hi, bandHi + pad);
    if (b > a) {
      marks.unshift({
        kind: "band",
        ...(sc.horizontal
          ? { x: plot.x, y: a, width: plot.width, height: b - a }
          : { x: a, y: plot.y, width: b - a, height: plot.height }),
      });
    }
  }
  return marks;
};

/** Ring of a hovered cell: light on dark fills, dark on light ones */
export const contrastRing = (fill: Rgba): string =>
  luminance(fill) > 0.45
    ? "rgba(15, 23, 42, 0.78)"
    : "rgba(255, 255, 255, 0.9)";

/** Plotted value of the hovered outlier of a box */
const plottedOutlier = (s: SeriesModel, it: ChartHoverItem): number => {
  const raw = s.raw.outliers?.[it.index];
  const k = raw ? raw.indexOf(it.outlier ?? NaN) : -1;
  return (
    (k >= 0 ? s.cols.outliers?.[it.index]?.[k] : undefined) ?? it.outlier ?? 0
  );
};

/** A line from the end of a bar to the next bar, pixels of the stage */
export interface ConnectorSegment {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  color: string;
  width: number;
  dash: number[];
}

/**
 * Connectors of the bar series (`connector`, waterfalls): from the end of
 * every bar to the next bar, at the value where the next one starts
 */
export const connectorSegments = (
  model: ChartModel,
  sc: Scales,
): ConnectorSegment[] => {
  const out: ConnectorSegment[] = [];
  for (const s of model.series) {
    const c = s.connector;
    if (!c || s.hidden || s.type !== "bar" || !s.barTop) continue;
    const { x, count } = s.cols;
    const top = s.barTop;
    const half = s.barHalfWidth;
    const [v0, v1] =
      sc.view.x[0] <= sc.view.x[1] ? sc.view.x : [sc.view.x[1], sc.view.x[0]];
    const color = toCss(c.color, 0.75);
    let prev = -1;
    for (let i = 0; i < count && out.length < MAX_POINT_LABELS * 4; i++) {
      if (!Number.isFinite(top[i]) || !Number.isFinite(x[i])) continue;
      if (prev >= 0 && x[i] + half >= v0 && x[prev] - half <= v1) {
        const a = toScreen(sc, x[prev] + s.barOffset + half, top[prev]);
        const b = toScreen(sc, x[i] + s.barOffset - half, top[prev]);
        out.push({
          x0: a.x,
          y0: a.y,
          x1: b.x,
          y1: b.y,
          color,
          width: c.width,
          dash: c.dash,
        });
      }
      prev = i;
    }
  }
  return out;
};

/** Visual map of a heatmap: its color ramp and the values at the ends */
export interface ColorLegend {
  seriesIndex: number;
  /** CSS colors at even steps from the lowest to the highest value */
  stops: string[];
  /** Labels along the ramp (`at`: 0-1): the ends, and the middle of diverging ramps */
  labels: { at: number; text: string }[];
}

const COLOR_STOPS = 12;

/**
 * Color legend of a heatmap chart (every series is a heatmap; the first
 * visible one), `null` otherwise
 */
export const colorLegend = (model: ChartModel): ColorLegend | null => {
  if (!model.series.length || model.series.some((s) => s.type !== "heatmap"))
    return null;
  const s = model.series.find((it) => !it.hidden && it.colorLut);
  const lut = s?.colorLut;
  if (!s || !lut) return null;
  const stops: string[] = [];
  for (let k = 0; k < COLOR_STOPS; k++) {
    const packed = lut[Math.round((k / (COLOR_STOPS - 1)) * (lut.length - 1))];
    stops.push(toCss(unpackColor(packed ?? 0)));
  }
  const format = s.format ?? model.formatValue;
  const [lo, hi] = s.valueRange;
  const labels = [
    { at: 0, text: format(lo) },
    { at: 1, text: format(hi) },
  ];
  const mid = s.colorMidpoint;
  if (mid !== null && mid > lo && mid < hi)
    labels.splice(1, 0, { at: 0.5, text: format(mid) });
  return { seriesIndex: s.index, stops, labels };
};

/** Whether the legend shows (`legend` option; heatmaps get their color legend) */
export const legendShown = (
  option: ChartOptions["legend"],
  model: ChartModel,
  named: number,
): boolean =>
  option === undefined ? named > 1 || colorLegend(model) !== null : !!option;

/** Swatch of a series in the legend */
export const legendShape = (
  type: SeriesModel["type"],
): "dot" | "line" | "square" =>
  type === "scatter" ? "dot" : type === "line" ? "line" : "square";

/** Whether the guide line follows the pointer */
export const showsCrosshair = (
  model: ChartModel,
  event: ChartHoverEvent,
  crosshair: boolean | undefined,
) =>
  crosshair ??
  (model.tooltipMode === "axis" &&
    event.items.some((it) => {
      const type = model.series[it.seriesIndex].type;
      return type === "line" || type === "area";
    }) &&
    // bars get a band instead
    !event.items.some((it) => {
      const type = model.series[it.seriesIndex].type;
      return type === "bar" || type === "candlestick" || type === "boxplot";
    }));

/** Pixel of the guide line along the x axis (`null` when hidden / outside the plot) */
export const crosshairAt = (
  model: ChartModel,
  sc: Scales,
  event: ChartHoverEvent,
  crosshair: boolean | undefined,
): number | null => {
  if (!showsCrosshair(model, event, crosshair)) return null;
  const c = sc.xToPx(event.items[0].x);
  const lo = sc.horizontal ? sc.plot.y : sc.plot.x;
  const hi = lo + (sc.horizontal ? sc.plot.height : sc.plot.width);
  return c >= lo && c <= hi ? c : null;
};
