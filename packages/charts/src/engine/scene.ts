// The DOM-free half of a chart: annotations, layout, point labels, hit
// testing and tooltip content. Shared by createChart (DOM + GPU),
// createCanvasChart (any 2D context) and the React Native views.

import { axisTicks, type AxisTicks } from "./axis";
import { mix, toCss, type Rgba } from "./color";
import { nearestIndex } from "./data";
import { computePlot, createScales, type Rect, type Scales } from "./layout";
import { gridOf, type ChartModel, type SeriesModel } from "./model";
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
  // fewer on short charts
  const yCount =
    model.y.tickCount ??
    (height >= 220 ? 5 : Math.max(2, Math.round((height - 48) / 52)));
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
      : (model.x.tickCount ?? Math.max(2, Math.floor(plot.width / 96)));
  const xTicks = axisTicks(model.x, view.x, xCount);
  const scales = createScales(plot, view, model.x.reverse, model.y.reverse);
  return { plot, scales, xTicks, yTicks };
};

/** Labels of the visible scatter points (`showLabels`) */
export const collectPointLabels = (
  model: ChartModel,
  view: ChartView,
  s: Scales,
): PointLabel[] => {
  const labels: PointLabel[] = [];
  for (const series of model.series) {
    if (series.hidden || series.type !== "scatter" || !series.showLabels)
      continue;
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

/** Pixel position of a point (the top of a bar) */
export const pointOf = (s: SeriesModel, i: number, sc: Scales) => {
  const xv = s.cols.x[i] + (s.type === "bar" ? s.barOffset : 0);
  const yv = s.type === "bar" && s.barTop ? s.barTop[i] : s.cols.y[i];
  return { px: sc.xToPx(xv), py: sc.yToPx(yv) };
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
  return {
    seriesIndex: s.index,
    seriesId: s.id,
    seriesName: s.name,
    index,
    x: s.cols.x[index],
    y: s.cols.y[index],
    color: pc ? toCss(pc) : s.colorCss,
    ...(label !== undefined ? { label } : {}),
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
  return {
    title: event.xLabel,
    titleColor: null,
    rows: event.items.map((it) => ({
      color: it.color,
      name: it.label ? `${it.seriesName} · ${it.label}` : it.seriesName,
      value: yFormat(it.y),
    })),
  };
};

/** Shape of the hover marker of an item: a ring on a point, or a bar highlight */
export type HoverMark =
  | { kind: "dot"; x: number; y: number; size: number; color: string }
  | { kind: "bar"; x: number; y: number; width: number; height: number };

/** Markers of the hovered points (pixels of the stage) */
export const hoverMarks = (
  model: ChartModel,
  sc: Scales,
  event: ChartHoverEvent,
): HoverMark[] => {
  const marks: HoverMark[] = [];
  const { plot } = sc;
  for (const it of event.items) {
    const s = model.series[it.seriesIndex];
    if (s.type === "bar" && s.barBase && s.barTop) {
      const cx = sc.xToPx(it.x + s.barOffset);
      const half = Math.max(s.barHalfWidth / sc.xPerPx, 1);
      const a = sc.yToPx(s.barBase[it.index]);
      const b = sc.yToPx(s.barTop[it.index]);
      marks.push({
        kind: "bar",
        x: cx - half,
        y: Math.min(a, b),
        width: half * 2,
        height: Math.max(1, Math.abs(a - b)),
      });
      continue;
    }
    const px = sc.xToPx(it.x);
    const py = sc.yToPx(it.y);
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
        ? dotSize(s, it.index) + 6
        : Math.max(10, s.lineWidth * 2 + 6);
    marks.push({ kind: "dot", x: px, y: py, size, color: it.color });
  }
  return marks;
};

/** Whether the guide line follows the pointer */
export const showsCrosshair = (
  model: ChartModel,
  event: ChartHoverEvent,
  crosshair: boolean | undefined,
) =>
  crosshair ??
  (model.tooltipMode === "axis" &&
    event.items.some((it) => model.series[it.seriesIndex].type !== "scatter"));
