import type { FixedColumnLayout, TableColumn } from "./types";

const numericWidth = (width: string | number | undefined): number => {
  if (typeof width === "number") return width;
  if (typeof width === "string") {
    const n = parseFloat(width);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

/**
 * Sticky offsets of the fixed columns of a `Table` (pure function).
 *
 * Left-fixed columns accumulate the widths of the previous left-fixed columns,
 * right-fixed columns the widths of the following right-fixed ones. Like
 * antd / arco, fixed columns are expected to be declared contiguously at the
 * start / end of `columns`; this is not enforced at runtime, but the edge keys
 * (which get the boundary shadow) stop at the first non-fixed column.
 */
export function computeFixedColumnLayout<T>(
  columns: readonly TableColumn<T>[],
): FixedColumnLayout {
  const leftOffsets: Record<string, number> = {};
  const rightOffsets: Record<string, number> = {};
  let leftAcc = 0;
  for (const col of columns) {
    if (col.fixed === "left") {
      leftOffsets[col.key] = leftAcc;
      leftAcc += numericWidth(col.width);
    }
  }
  let rightAcc = 0;
  for (let i = columns.length - 1; i >= 0; i--) {
    const col = columns[i];
    if (col.fixed === "right") {
      rightOffsets[col.key] = rightAcc;
      rightAcc += numericWidth(col.width);
    }
  }
  let lastLeftFixedKey: string | undefined;
  for (const col of columns) {
    if (col.fixed === "left") lastLeftFixedKey = col.key;
    else if (lastLeftFixedKey !== undefined) break;
  }
  let firstRightFixedKey: string | undefined;
  for (let i = columns.length - 1; i >= 0; i--) {
    const col = columns[i];
    if (col.fixed === "right") firstRightFixedKey = col.key;
    else if (firstRightFixedKey !== undefined) break;
  }
  return { leftOffsets, rightOffsets, lastLeftFixedKey, firstRightFixedKey };
}
