// Pure keyboard navigation over an indexed collection (lists, menus, tabs,
// radio groups, pickers...): the index math behind the DOM roving focus
// controller of @minerva/dom, reusable by renderers without a DOM.

export type Orientation = "horizontal" | "vertical" | "both";
export type Direction = "ltr" | "rtl";

export interface GetNextIndexOptions {
  /** Index of the current item (`-1` when none). */
  currentIndex: number;
  /** Number of items. */
  count: number;
  /** `KeyboardEvent.key`. */
  key: string;
  /** Which arrow keys move. @default "vertical" */
  orientation?: Orientation;
  /** Reading direction; `"rtl"` swaps ArrowLeft / ArrowRight. @default "ltr" */
  dir?: Direction;
  /** Wrap around at both ends. @default true */
  loop?: boolean;
  /** Disabled items are skipped. */
  isDisabled?: (index: number) => boolean;
  /** Enables PageUp / PageDown, moving by this many items. */
  pageSize?: number;
}

type Move = "next" | "prev" | "first" | "last" | "pageNext" | "pagePrev";

function keyToMove(
  key: string,
  orientation: Orientation,
  dir: Direction,
  pageSize: number | undefined,
): Move | null {
  const vertical = orientation !== "horizontal";
  const horizontal = orientation !== "vertical";
  switch (key) {
    case "ArrowDown":
      return vertical ? "next" : null;
    case "ArrowUp":
      return vertical ? "prev" : null;
    case "ArrowRight":
      return horizontal ? (dir === "rtl" ? "prev" : "next") : null;
    case "ArrowLeft":
      return horizontal ? (dir === "rtl" ? "next" : "prev") : null;
    case "Home":
      return "first";
    case "End":
      return "last";
    case "PageDown":
      return pageSize ? "pageNext" : null;
    case "PageUp":
      return pageSize ? "pagePrev" : null;
    default:
      return null;
  }
}

/** First enabled index scanning from `start` by `step`, within bounds. */
function scan(
  start: number,
  step: 1 | -1,
  count: number,
  isDisabled: (index: number) => boolean,
): number | null {
  for (let i = start; i >= 0 && i < count; i += step) {
    if (!isDisabled(i)) return i;
  }
  return null;
}

/**
 * Pure keyboard navigation for lists, menus, tabs, radio groups...
 *
 * Returns the index to move to for `key`, or `null` when the key is not a
 * navigation key for this orientation, or there is nowhere to go (edge
 * reached without `loop`, or every other item disabled).
 *
 * - ArrowUp / ArrowDown: vertical and both orientations.
 * - ArrowLeft / ArrowRight: horizontal and both (swapped in RTL).
 * - Home / End: first / last enabled item.
 * - PageUp / PageDown: only with `pageSize` (clamped, never wraps).
 */
export function getNextIndex({
  currentIndex,
  count,
  key,
  orientation = "vertical",
  dir = "ltr",
  loop = true,
  isDisabled = () => false,
  pageSize,
}: GetNextIndexOptions): number | null {
  if (count <= 0) return null;
  const move = keyToMove(key, orientation, dir, pageSize);
  if (!move) return null;

  switch (move) {
    case "first":
      return scan(0, 1, count, isDisabled);
    case "last":
      return scan(count - 1, -1, count, isDisabled);
    case "pageNext":
    case "pagePrev": {
      const step = move === "pageNext" ? 1 : -1;
      const from = currentIndex < 0 ? (step === 1 ? -1 : count) : currentIndex;
      const target = Math.min(
        count - 1,
        Math.max(0, from + step * (pageSize as number)),
      );
      const found =
        scan(target, step === 1 ? -1 : 1, count, isDisabled) ??
        scan(target, step, count, isDisabled);
      return found === currentIndex ? null : found;
    }
    default: {
      const step = move === "next" ? 1 : -1;
      if (currentIndex < 0 || currentIndex >= count) {
        return scan(step === 1 ? 0 : count - 1, step, count, isDisabled);
      }
      for (let n = 1; n < count; n++) {
        let i = currentIndex + step * n;
        if (i < 0 || i >= count) {
          if (!loop) return null;
          i = (i + count) % count;
        }
        if (!isDisabled(i)) return i;
      }
      return null;
    }
  }
}
