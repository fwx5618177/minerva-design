// What a chart shows while a point is dragged (`interaction.dragPoints`),
// shared by the DOM host (chart.ts) and the canvas host (controller.ts):
// the point lifted under the pointer with its label, a placeholder where
// it was, and the area it would land in (`interaction.dropTargets`).

import { toCss } from "./color";
import { rectOf, type ResolvedAnnotation } from "./overlay";
import type { ChartModel } from "./model";
import type { Scales } from "./layout";
import { dotSize, pointOf } from "./scene";
import type { ChartHoverItem } from "./types";

/** The highlighted drop area, in pixels of the stage */
export interface DragTarget {
  x: number;
  y: number;
  width: number;
  height: number;
  /** Color of the area (CSS) */
  color: string;
}

/** A point being dragged, in pixels of the stage */
export interface DragPreview {
  /** Under the pointer */
  x: number;
  y: number;
  /** Diameter of the lifted dot */
  size: number;
  color: string;
  /** Label of the point (drawn in a pill next to the dot) */
  label: string | null;
  /** Where the point is drawn on the data layer (a placeholder ring) */
  origin: { x: number; y: number } | null;
  /** The area the point would land in (`interaction.dropTargets`) */
  target: DragTarget | null;
}

/** The area annotation under a stage position (the first one drawn) */
export const dropTargetAt = (
  annotations: readonly ResolvedAnnotation[],
  s: Scales,
  px: number,
  py: number,
): DragTarget | null => {
  const { plot } = s;
  const x = Math.max(plot.x, Math.min(plot.x + plot.width, px));
  const y = Math.max(plot.y, Math.min(plot.y + plot.height, py));
  for (const a of annotations) {
    if (a.type !== "rect") continue;
    const r = rectOf(a, s);
    if (x >= r.x && x <= r.x + r.width && y >= r.y && y <= r.y + r.height)
      return { ...r, color: toCss(a.color) };
  }
  return null;
};

/** The preview of a point dragged to a stage position */
export const dragPreview = (
  model: ChartModel,
  s: Scales,
  annotations: readonly ResolvedAnnotation[],
  item: ChartHoverItem,
  px: number,
  py: number,
  dropTargets: boolean,
): DragPreview => {
  const series = model.series[item.seriesIndex];
  const { plot } = s;
  const x = Math.max(plot.x, Math.min(plot.x + plot.width, px));
  const y = Math.max(plot.y, Math.min(plot.y + plot.height, py));
  let origin: DragPreview["origin"] = null;
  if (series && item.index < series.cols.count) {
    const p = pointOf(series, item.index, s);
    if (Number.isFinite(p.px) && Number.isFinite(p.py))
      origin = { x: p.px, y: p.py };
  }
  return {
    x,
    y,
    size: (series ? dotSize(series, item.index) : 8) + 6,
    color: item.color,
    label: item.label ?? null,
    origin,
    target: dropTargets ? dropTargetAt(annotations, s, x, y) : null,
  };
};
