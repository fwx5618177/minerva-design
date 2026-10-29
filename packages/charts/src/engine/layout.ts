// Plot rectangle and data <-> pixel mappings (CSS pixels of the stage).

import type { ChartView } from "./types";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Scales {
  plot: Rect;
  view: ChartView;
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
): Scales => {
  const [x0, x1] = view.x;
  const [y0, y1] = view.y;
  const xs = plot.width / (x1 - x0 || 1);
  const ys = plot.height / (y1 - y0 || 1);
  const left = plot.x;
  const right = plot.x + plot.width;
  const top = plot.y;
  const bottom = plot.y + plot.height;
  return {
    plot,
    view,
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

export interface LayoutInput {
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
  /** Width of the widest y tick label (0 when the axis is hidden) */
  yLabelWidth: number;
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
  const right = padding.right;
  return {
    x: Math.round(left),
    y: Math.round(top),
    width: Math.max(10, Math.round(width - left - right)),
    height: Math.max(10, Math.round(height - top - bottom)),
  };
};
