import { computeFixedColumnLayout as computeLayout } from "@minerva/core";
import type { FixedColumnLayout, TableColumn } from "./types";

/**
 * Sticky offsets of the fixed columns of a `Table` (pure function; see
 * `computeFixedColumnLayout` of minerva-design/core).
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
  return computeLayout(columns);
}
