// Box of what a cartesian hover shows (the hovered bars, candles, boxes,
// dots with their halo, heatmap cell), which the tooltip must not cover.

import type { Rect, Scales } from "./layout";
import type { ChartModel } from "./model";
import { hoverMarks, type HoverMark } from "./scene";
import { unionRect } from "./tooltip";
import type { ChartHoverEvent } from "./types";

/** Room around the marks (grown / lifted marks, halos) */
const PAD = 3;

/**
 * Box (stage pixels) of the hovered marks: bars from their base to their
 * end, candles and boxes from high to low, dots with their halo, the
 * hovered cell; clipped to the plot. `null` when nothing is drawn.
 */
export const hoverRect = (
  model: ChartModel,
  sc: Scales,
  event: ChartHoverEvent,
  marks: readonly HoverMark[] = hoverMarks(model, sc, event),
): Rect | null => {
  let box: Rect | null = null;
  for (const mark of marks) {
    if (mark.kind === "band" || mark.kind === "guide") continue;
    if (mark.kind === "dot") {
      // the halo is 4px wide
      const r = mark.size / 2 + 4;
      box = unionRect(box, {
        x: mark.x - r,
        y: mark.y - r,
        width: r * 2,
        height: r * 2,
      });
    } else if ("width" in mark && "height" in mark) {
      box = unionRect(box, mark);
    }
  }
  // the band of bars, candles and boxes spans the plot: their own extent
  for (const it of event.items) {
    const s = model.series[it.seriesIndex];
    if (!s || it.outlier !== undefined) continue;
    if (s.type !== "bar" && s.type !== "candlestick" && s.type !== "boxplot")
      continue;
    const i = it.index;
    const x =
      (s.cols.x[i] ?? it.x) + (s.type === "candlestick" ? 0 : s.barOffset);
    const c = sc.xToPx(x);
    const half = Math.max(
      s.barHalfWidth / Math.abs(sc.xPerPx),
      s.type === "bar" ? 1 : 3,
    );
    const { high, low, y } = s.cols;
    const a =
      s.type === "bar"
        ? (s.barBase?.[i] ?? model.baseline)
        : high
          ? high[i]
          : y[i];
    const b = s.type === "bar" ? (s.barTop?.[i] ?? y[i]) : low ? low[i] : y[i];
    const pa = sc.yToPx(a);
    const pb = sc.yToPx(b);
    if (!Number.isFinite(c) || !Number.isFinite(pa) || !Number.isFinite(pb))
      continue;
    const lo = Math.min(pa, pb);
    const len = Math.abs(pb - pa);
    box = unionRect(
      box,
      sc.horizontal
        ? { x: lo, y: c - half, width: len, height: half * 2 }
        : { x: c - half, y: lo, width: half * 2, height: len },
    );
  }
  if (!box) return null;
  const { plot } = sc;
  const x = Math.max(plot.x - PAD, box.x - PAD);
  const y = Math.max(plot.y - PAD, box.y - PAD);
  const right = Math.min(plot.x + plot.width + PAD, box.x + box.width + PAD);
  const bottom = Math.min(plot.y + plot.height + PAD, box.y + box.height + PAD);
  return right > x && bottom > y
    ? { x, y, width: right - x, height: bottom - y }
    : null;
};

/**
 * Boxes (stage pixels) of every visible bar, clipped to the plot: the
 * other bars a tooltip should not cover
 */
export const barRects = (model: ChartModel, sc: Scales): Rect[] => {
  const rects: Rect[] = [];
  const { plot } = sc;
  const px0 = plot.x;
  const py0 = plot.y;
  const px1 = plot.x + plot.width;
  const py1 = plot.y + plot.height;
  // along the category axis: the screen y of horizontal charts
  const lo = sc.horizontal ? py0 : px0;
  const hi = sc.horizontal ? py1 : px1;
  for (const s of model.series) {
    if (s.hidden || s.type !== "bar") continue;
    const { x: xs, y: ys } = s.cols;
    const half = Math.max(s.barHalfWidth / Math.abs(sc.xPerPx), 1);
    const n = Math.min(xs.length, ys.length);
    for (let i = 0; i < n; i++) {
      const c = sc.xToPx(xs[i] + s.barOffset);
      if (!(c + half > lo && c - half < hi)) continue;
      const pa = sc.yToPx(s.barBase?.[i] ?? model.baseline);
      const pb = sc.yToPx(s.barTop?.[i] ?? ys[i]);
      if (!Number.isFinite(pa) || !Number.isFinite(pb)) continue;
      const r = sc.horizontal
        ? {
            x0: Math.min(pa, pb),
            x1: Math.max(pa, pb),
            y0: c - half,
            y1: c + half,
          }
        : {
            x0: c - half,
            x1: c + half,
            y0: Math.min(pa, pb),
            y1: Math.max(pa, pb),
          };
      const x0 = Math.max(px0, r.x0);
      const y0 = Math.max(py0, r.y0);
      const x1 = Math.min(px1, r.x1);
      const y1 = Math.min(py1, r.y1);
      if (x1 - x0 > 0.5 && y1 - y0 > 0.5)
        rects.push({ x: x0, y: y0, width: x1 - x0, height: y1 - y0 });
    }
  }
  return rects;
};

const NO_OBSTACLES: readonly Rect[] = [];
const obstacleCache = new WeakMap<
  Scales,
  { model: ChartModel; rects: readonly Rect[] }
>();

/**
 * What a tooltip of the chart must not cover besides the hovered marks:
 * the bars of horizontal charts (Gantt tasks, rows of bars) and of
 * floating (range) bars. Cached per layout, so pointer moves only query it.
 */
export const tooltipObstacles = (
  model: ChartModel,
  sc: Scales,
): readonly Rect[] => {
  const cached = obstacleCache.get(sc);
  if (cached?.model === model) return cached.rects;
  const applies = model.series.some(
    (s) =>
      !s.hidden && s.type === "bar" && (sc.horizontal || s.floating === true),
  );
  const rects = applies ? barRects(model, sc) : NO_OBSTACLES;
  obstacleCache.set(sc, { model, rects });
  return rects;
};
