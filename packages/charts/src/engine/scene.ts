// The DOM-free half of a chart: annotations, layout, point labels, hit
// testing and tooltip content. Shared by createChart (DOM + GPU),
// createCanvasChart (any 2D context) and the React Native views.

import { axisTicks, type AxisTicks } from "./axis";
import { mix, toCss, unpackColor, type Rgba } from "./color";
import { nearestIndex } from "./data";
import { formatValue } from "./format";
import { computePlot, createScales, type Rect, type Scales } from "./layout";
import { gridOf, plottedY, type ChartModel, type SeriesModel } from "./model";
import type { PointLabel, ResolvedAnnotation } from "./overlay";
import type { ChartTheme } from "./theme";
import type {
  ChartAnnotation,
  ChartHoverEvent,
  ChartHoverItem,
  ChartPadding,
  ChartView,
} from "./types";

export const MAX_POINT_LABELS = 300;
export const DEFAULT_PADDING = { top: 12, right: 16, bottom: 4, left: 4 };

export const fallbackResolve = (_value: string, fallback: Rgba) => fallback;

/** Annotation colors resolved against the theme */
export const resolveAnnotations = (
  annotations: readonly ChartAnnotation[] | undefined,
  theme: ChartTheme,
): ResolvedAnnotation[] => {
  const resolve = theme.resolve ?? fallbackResolve;
  return (annotations ?? []).map((a) => {
    if (a.type === "rect") {
      const color = a.color ? resolve(a.color, theme.primary) : theme.primary;
      return {
        type: "rect",
        x0: a.x0,
        x1: a.x1,
        y0: a.y0,
        y1: a.y1,
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
        y: a.y,
        text: a.text,
        anchor: a.anchor ?? "center",
        color: a.color ? resolve(a.color, theme.textMuted) : theme.textMuted,
        weight: a.weight ?? 500,
      };
    }
    return {
      type: "line",
      axis: a.axis,
      value: a.value,
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
  return { plot, scales, xTicks, yTicks };
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
    ? formatValue
    : (yTicks?.formatValue ?? formatValue);
  for (const series of model.series) {
    if (series.hidden || !series.showLabels) continue;
    if (series.type === "bar" && series.barTop) {
      const format = series.format ?? axisFormat;
      const { x, y, count } = series.cols;
      const top = series.barTop;
      const [x0, x1] = view.x[0] <= view.x[1] ? view.x : [view.x[1], view.x[0]];
      for (let i = 0; i < count && labels.length < MAX_POINT_LABELS; i++) {
        const xv = x[i] + series.barOffset;
        if (!Number.isFinite(y[i]) || xv < x0 || xv > x1) continue;
        const negative = top[i] < (series.barBase?.[i] ?? 0);
        labels.push({
          x: s.xToPx(xv),
          y: s.yToPx(top[i]),
          r: 0,
          text: format(y[i]),
          placement: negative ? "below" : "above",
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
      labels.push({ x: s.xToPx(xi), y: s.yToPx(yi), r: d / 2, text });
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
  dx: number;
  dist: number;
  inside: boolean;
}

/** Pixel position of a point (the top of a bar or stack, the close of a candle) */
export const pointOf = (s: SeriesModel, i: number, sc: Scales) => {
  const xv = s.cols.x[i] + (s.type === "bar" ? s.barOffset : 0);
  return { px: sc.xToPx(xv), py: sc.yToPx(plottedY(s, i)) };
};

const candidateOf = (
  s: SeriesModel,
  i: number,
  px: number,
  py: number,
  sc: Scales,
): Candidate => {
  const p = pointOf(s, i, sc);
  let inside = false;
  if (s.type === "bar" && s.barBase) {
    const half = s.barHalfWidth / sc.xPerPx;
    const base = sc.yToPx(s.barBase[i]);
    inside =
      Math.abs(px - p.px) <= half &&
      py >= Math.min(base, p.py) - 2 &&
      py <= Math.max(base, p.py) + 2;
  } else if (s.type === "candlestick") {
    const { high, low, y } = s.cols;
    const half = Math.max(s.barHalfWidth / sc.xPerPx, 3);
    const a = sc.yToPx(high ? high[i] : y[i]);
    const b = sc.yToPx(low ? low[i] : y[i]);
    inside =
      Math.abs(px - p.px) <= half &&
      py >= Math.min(a, b) - 2 &&
      py <= Math.max(a, b) + 2;
  }
  return {
    series: s,
    index: i,
    px: p.px,
    py: p.py,
    dx: Math.abs(sc.xToPx(s.cols.x[i]) - px),
    dist: inside ? 0 : Math.hypot(p.px - px, p.py - py),
    inside,
  };
};

/** Diameter of a scatter dot */
export const dotSize = (s: SeriesModel, i: number) =>
  s.cols.size && s.cols.size[i] > 0 ? s.cols.size[i] : s.pointSize;

const nearestScatter = (
  s: SeriesModel,
  px: number,
  py: number,
  sc: Scales,
  slop: number,
) => {
  const radius = Math.max(s.pointSize / 2 + 6, 10) + slop;
  const xv = sc.pxToX(px);
  const yv = sc.pxToY(py);
  const rx = radius * sc.xPerPx;
  const ry = radius * sc.yPerPx;
  let best = -1;
  let bestDist = Infinity;
  const { x, y } = s.cols;
  gridOf(s).query(xv - rx, xv + rx, yv - ry, yv + ry, (i) => {
    const d = Math.hypot(sc.xToPx(x[i]) - px, sc.yToPx(y[i]) - py);
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

/** Hover payload item of a point */
export const hoverItemOf = (s: SeriesModel, index: number): ChartHoverItem => {
  const pc = s.pointColors?.[index];
  const label = s.cols.labels?.[index];
  const { open, high, low, value } = s.cols;
  let color = pc ? toCss(pc) : s.colorCss;
  const extra: Partial<ChartHoverItem> = {};
  if (s.type === "candlestick") {
    const o = open ? open[index] : NaN;
    if (Number.isFinite(o)) extra.open = o;
    if (high && Number.isFinite(high[index])) extra.high = high[index];
    if (low && Number.isFinite(low[index])) extra.low = low[index];
    color = toCss(s.cols.y[index] < o ? s.downColor : s.upColor);
  } else if (s.type === "heatmap") {
    const v = value ? value[index] : s.cols.y[index];
    if (Number.isFinite(v)) extra.value = v;
    const packed = s.cellColors?.[index];
    if (packed) color = toCss(unpackColor(packed));
  }
  return {
    seriesIndex: s.index,
    seriesId: s.id,
    seriesName: s.name,
    index,
    x: s.cols.x[index],
    y: s.cols.y[index],
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
  const items = candidates.map((c) => hoverItemOf(c.series, c.index));
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
  const xv = sc.pxToX(px);
  const scatter: Candidate[] = [];
  const others: Candidate[] = [];
  for (const s of model.series) {
    if (s.hidden || s.cols.count === 0) continue;
    if (s.type === "scatter") {
      const i = nearestScatter(s, px, py, sc, slop);
      if (i >= 0) scatter.push(candidateOf(s, i, px, py, sc));
    } else if (s.type === "heatmap") {
      const i = cellAt(s, sc.pxToX(px), sc.pxToY(py));
      if (i >= 0) {
        const c = candidateOf(s, i, px, py, sc);
        c.inside = true;
        c.dist = 0;
        scatter.push(c);
      }
    } else {
      const i = nearestX(s, xv);
      if (i >= 0) others.push(candidateOf(s, i, px, py, sc));
    }
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
  const bandPx = model.x.type === "category" ? 0.5 / sc.xPerPx : 0;
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

export interface TooltipRow {
  /** Swatch color (CSS) */
  color: string | null;
  name: string;
  value: string;
}

export interface TooltipContent {
  title: string;
  /** Swatch of the title (single scatter point) */
  titleColor: string | null;
  rows: TooltipRow[];
}

/** Default tooltip content of a hover payload */
export const tooltipContent = (
  model: ChartModel,
  event: ChartHoverEvent,
  yTicks: AxisTicks | null,
): TooltipContent => {
  const yFormat = yTicks?.formatValue ?? String;
  const first = event.items[0];
  const firstSeries = first ? model.series[first.seriesIndex] : null;
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
              : (firstSeries.format ?? formatValue)(first.value),
        },
      ],
    };
  }
  const scatterOnly = event.items.every(
    (it) => model.series[it.seriesIndex].type === "scatter",
  );
  if (scatterOnly && event.items.length === 1) {
    const it = event.items[0];
    const rows: TooltipRow[] = [
      { color: null, name: model.x.title ?? "x", value: event.xLabel },
      { color: null, name: model.y.title ?? "y", value: yFormat(it.y) },
    ];
    if (it.label !== undefined && model.series.length > 1)
      rows.push({ color: null, name: "", value: it.seriesName });
    return { title: it.label ?? it.seriesName, titleColor: it.color, rows };
  }
  const rows: TooltipRow[] = [];
  /** Row of every item */
  const rowOf: number[] = [];
  for (const it of event.items) {
    const s = model.series[it.seriesIndex];
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
          ? `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`
          : "",
      });
      const ohlc: [string, number | undefined][] = [
        ["Open", it.open],
        ["High", it.high],
        ["Low", it.low],
        ["Close", it.y],
      ];
      for (const [name, v] of ohlc) {
        if (v !== undefined && Number.isFinite(v))
          rows.push({ color: null, name, value: (s.format ?? yFormat)(v) });
      }
      continue;
    }
    rows.push({
      color: it.color,
      name: it.label ? `${it.seriesName} · ${it.label}` : it.seriesName,
      value: (s.format ?? yFormat)(it.y),
    });
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
        const format = model.series[it.seriesIndex].format ?? formatValue;
        row.value = `${format(it.y)} · ${((Math.abs(it.y) / total) * 100).toFixed(1)}%`;
      }
    });
  }
  return { title: event.xLabel, titleColor: null, rows };
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
  | { kind: "cell"; x: number; y: number; width: number; height: number };

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
    if (s.type === "bar" || s.type === "candlestick") {
      const cx = sc.xToPx(it.x + s.barOffset);
      const half = Math.max(s.barHalfWidth / sc.xPerPx, 1);
      bandLo = Math.min(bandLo, cx - half);
      bandHi = Math.max(bandHi, cx + half);
      continue;
    }
    if (s.type === "heatmap") {
      const cx = sc.xToPx(it.x);
      const cy = sc.yToPx(it.y);
      const hw = Math.abs(s.cellHalf.x / sc.xPerPx);
      const hh = Math.abs(s.cellHalf.y / sc.yPerPx);
      marks.push({
        kind: "cell",
        x: cx - hw,
        y: cy - hh,
        width: hw * 2,
        height: hh * 2,
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
    const x0 = Math.max(plot.x, bandLo - pad);
    const x1 = Math.min(plot.x + plot.width, bandHi + pad);
    if (x1 > x0) {
      marks.unshift({
        kind: "band",
        x: x0,
        y: plot.y,
        width: x1 - x0,
        height: plot.height,
      });
    }
  }
  return marks;
};

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
      return type === "bar" || type === "candlestick";
    }));
