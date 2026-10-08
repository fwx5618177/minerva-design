// Visible window of a fixed-row-height virtual list.

/** Inputs of `getVirtualRange`. */
export interface VirtualRangeInput {
  /** Scroll offset of the viewport (px) */
  scrollTop: number;
  /** Height of the viewport (px) */
  viewportHeight: number;
  /** Height of one row (px); `0` or less renders nothing */
  itemHeight: number;
  /** Number of rows */
  itemCount: number;
  /** Rows rendered above and below the viewport; negative or NaN means 0 */
  overscan?: number;
}

/** Rows to render: indexes `[start, end)`. */
export interface VirtualRange {
  start: number;
  end: number;
  /** Rows the window holds (viewport rows plus both overscans) */
  visibleCount: number;
}

/** The rows of a virtual list to render for the current scroll position. */
export function getVirtualRange({
  scrollTop,
  viewportHeight,
  itemHeight,
  itemCount,
  overscan = 0,
}: VirtualRangeInput): VirtualRange {
  if (!(itemHeight > 0)) return { start: 0, end: 0, visibleCount: 0 };
  const extra = Math.max(0, overscan || 0);
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - extra);
  const visibleCount = Math.ceil(viewportHeight / itemHeight) + 2 * extra;
  const end = Math.min(itemCount, start + visibleCount);
  return { start, end, visibleCount };
}
