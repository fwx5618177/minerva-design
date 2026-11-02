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
