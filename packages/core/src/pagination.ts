// Page number lists of the paginations of the React library and the web components.

/** Pages skipped by the jump-prev / jump-next items of a pagination. */
export const PAGINATION_JUMP_SIZE = 5;

const rangeOf = (start: number, end: number): number[] => {
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
};

/**
 * Window of `windowSize` consecutive page numbers centered on `current`,
 * clamped to `[1, totalPages]`.
 */
export function getPageRange(
  current: number,
  totalPages: number,
  windowSize = 5,
): number[] {
  let start = Math.max(1, current - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  if (end - start + 1 < windowSize) start = Math.max(1, end - windowSize + 1);
  return rangeOf(start, end);
}

/** An entry of `getCompactPageItems`: a page number or a "…" gap. */
export type CompactPageItem = number | "ellipsis-start" | "ellipsis-end";

/**
 * Compact page list: `boundary` pages at each end, `siblings` pages on each
 * side of the current `page` and "…" gaps. Every page is listed when they
 * fit; a gap of a single page shows that page instead.
 */
export function getCompactPageItems(
  totalPages: number,
  page: number,
  siblings: number,
  boundary: number,
): CompactPageItem[] {
  // boundaries + current and its siblings + two gap slots
  const totalSlots = boundary * 2 + siblings * 2 + 3;
  if (totalPages <= totalSlots) return rangeOf(1, totalPages);

  const leftSibling = Math.max(page - siblings, boundary + 1);
  const rightSibling = Math.min(page + siblings, totalPages - boundary);
  const showStartGap = leftSibling > boundary + 2;
  const showEndGap = rightSibling < totalPages - boundary - 1;
  const clusterSize = boundary + siblings * 2 + 2;

  if (!showStartGap) {
    return [
      ...rangeOf(1, clusterSize),
      "ellipsis-end",
      ...rangeOf(totalPages - boundary + 1, totalPages),
    ];
  }
  if (!showEndGap) {
    return [
      ...rangeOf(1, boundary),
      "ellipsis-start",
      ...rangeOf(totalPages - clusterSize + 1, totalPages),
    ];
  }
  return [
    ...rangeOf(1, boundary),
    "ellipsis-start",
    ...rangeOf(leftSibling, rightSibling),
    "ellipsis-end",
    ...rangeOf(totalPages - boundary + 1, totalPages),
  ];
}
