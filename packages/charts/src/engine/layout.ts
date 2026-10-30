// Plot rectangle and data <-> pixel mappings (CSS pixels of the stage).

import type { ChartView } from "./types";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Data <-> pixel mappings of a plot. `xToPx` / `yToPx` give the pixel along
 * the axis showing that data axis: the screen x / y of vertical charts, the
 * screen y / x of horizontal ones (use `toScreen` / `toData` for points).
 */
export interface Scales {
  plot: Rect;
  view: ChartView;
  /** The x axis runs down the left side, the values along the bottom */
  horizontal: boolean;
  xToPx(value: number): number;
  yToPx(value: number): number;
  pxToX(px: number): number;
  pxToY(px: number): number;
  /** Data units per CSS pixel */
  xPerPx: number;
  yPerPx: number;
}

export const createScales = (
  plot: Rect,
  view: ChartView,
  reverseX: boolean,
  reverseY: boolean,
  horizontal = false,
): Scales => {
  const [x0, x1] = view.x;
  const [y0, y1] = view.y;
  const left = plot.x;
  const right = plot.x + plot.width;
  const top = plot.y;
  const bottom = plot.y + plot.height;
  if (horizontal) {
    // x from top to bottom, y from left to right
    const xs = plot.height / (x1 - x0 || 1);
    const ys = plot.width / (y1 - y0 || 1);
    return {
      plot,
      view,
      horizontal,
      xToPx: reverseX
        ? (v) => bottom - (v - x0) * xs
        : (v) => top + (v - x0) * xs,
      yToPx: reverseY
        ? (v) => right - (v - y0) * ys
        : (v) => left + (v - y0) * ys,
      pxToX: reverseX
        ? (p) => x0 + (bottom - p) / xs
        : (p) => x0 + (p - top) / xs,
      pxToY: reverseY
        ? (p) => y0 + (right - p) / ys
        : (p) => y0 + (p - left) / ys,
      xPerPx: 1 / xs,
      yPerPx: 1 / ys,
    };
  }
  const xs = plot.width / (x1 - x0 || 1);
  const ys = plot.height / (y1 - y0 || 1);
  return {
    plot,
    view,
    horizontal,
    xToPx: reverseX
      ? (v) => right - (v - x0) * xs
      : (v) => left + (v - x0) * xs,
    yToPx: reverseY
      ? (v) => top + (v - y0) * ys
      : (v) => bottom - (v - y0) * ys,
    pxToX: reverseX
      ? (p) => x0 + (right - p) / xs
      : (p) => x0 + (p - left) / xs,
    pxToY: reverseY
      ? (p) => y0 + (p - top) / ys
      : (p) => y0 + (bottom - p) / ys,
    xPerPx: 1 / xs,
    yPerPx: 1 / ys,
  };
};

/** Screen pixel of a data point */
export const toScreen = (
  s: Scales,
  x: number,
  y: number,
): { x: number; y: number } =>
  s.horizontal
    ? { x: s.yToPx(y), y: s.xToPx(x) }
    : { x: s.xToPx(x), y: s.yToPx(y) };

/** Data point under a screen pixel */
export const toData = (
  s: Scales,
  px: number,
  py: number,
): { x: number; y: number } =>
  s.horizontal
    ? { x: s.pxToX(py), y: s.pxToY(px) }
    : { x: s.pxToX(px), y: s.pxToY(py) };

/** Coordinate of a screen pixel along the x axis (`xToPx` space) */
export const alongX = (s: Scales, px: number, py: number) =>
  s.horizontal ? py : px;

/** Coordinate of a screen pixel along the value axis (`yToPx` space) */
export const alongY = (s: Scales, px: number, py: number) =>
  s.horizontal ? px : py;

/**
 * Screen rectangle between two pixels along x (`xa`, `xb`) and two along
 * y (`ya`, `yb`)
 */
export const screenRect = (
  s: Scales,
  xa: number,
  xb: number,
  ya: number,
  yb: number,
): Rect => {
  const a = Math.min(xa, xb);
  const b = Math.max(xa, xb);
  const c = Math.min(ya, yb);
  const d = Math.max(ya, yb);
  return s.horizontal
    ? { x: c, y: a, width: d - c, height: b - a }
    : { x: a, y: c, width: b - a, height: d - c };
};

/** Length in pixels of the x axis (plot width, height when horizontal) */
export const xLength = (s: Scales) =>
  s.horizontal ? s.plot.height : s.plot.width;

export interface LayoutInput {
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
  /** Width of the widest tick label of the left axis (0 when the axis is hidden) */
  yLabelWidth: number;
  /** Width of the widest tick label of the right axis (0 without one) */
  y2LabelWidth?: number;
  /** The right axis has a title */
  y2Title?: boolean;
  xAxisVisible: boolean;
  xTitle: boolean;
  yTitle: boolean;
  fontSize: number;
}

/** Room for the axes, then the plot area */
export const computePlot = (input: LayoutInput): Rect => {
  const { width, height, padding, fontSize } = input;
  const line = Math.ceil(fontSize * 1.4);
  const left =
    padding.left +
    (input.yLabelWidth > 0 ? input.yLabelWidth + 8 : 0) +
    (input.yTitle ? line + 6 : 0);
  const bottom =
    padding.bottom +
    (input.xAxisVisible ? line + 8 : 0) +
    (input.xTitle ? line + 4 : 0);
  const top = padding.top;
  const y2Width = input.y2LabelWidth ?? 0;
  const right =
    y2Width > 0 || input.y2Title
      ? Math.max(4, padding.left) +
        (y2Width > 0 ? y2Width + 8 : 0) +
        (input.y2Title ? line + 6 : 0)
      : padding.right;
  return {
    x: Math.round(left),
    y: Math.round(top),
    width: Math.max(10, Math.round(width - left - right)),
    height: Math.max(10, Math.round(height - top - bottom)),
  };
};
