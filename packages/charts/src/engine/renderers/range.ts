// Instances to draw: sorted series only draw what is inside the view, so
// zooming into a million points costs what is visible.

import type { RenderFrame, RenderItem } from "./types";

const lowerBound = (
  values: Float32Array,
  stride: number,
  count: number,
  value: number,
) => {
  let lo = 0;
  let hi = count;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (values[mid * stride] < value) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

/** Visible relative x range of a frame */
export const visibleX = (frame: RenderFrame): [number, number] => {
  const { xScale, xOffset } = frame.transform;
  const a = (-1 - xOffset) / xScale;
  const b = (1 - xOffset) / xScale;
  return a < b ? [a, b] : [b, a];
};

/** First instance and instance count to draw */
export const instanceRange = (
  item: RenderItem,
  frame: RenderFrame,
): [number, number] => {
  switch (item.kind) {
    case "line":
    case "area": {
      const segments = Math.max(0, item.count - 1);
      if (!item.sorted || segments === 0) return [0, segments];
      const [x0, x1] = visibleX(frame);
      const start = Math.max(0, lowerBound(item.points, 2, item.count, x0) - 1);
      const end = Math.min(
        item.count - 1,
        lowerBound(item.points, 2, item.count, x1),
      );
      return [start, Math.max(0, end - start)];
    }
    case "bar": {
      if (!item.sorted) return [0, item.count];
      const [x0, x1] = visibleX(frame);
      const pad = Math.abs(item.halfWidth);
      const start = lowerBound(item.instances, 3, item.count, x0 - pad);
      const end = lowerBound(item.instances, 3, item.count, x1 + pad);
      return [start, Math.max(0, end - start)];
    }
    default:
      return [0, item.count];
  }
};
