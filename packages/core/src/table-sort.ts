// Default sorting of table columns, shared by the React library's Table and
// <minerva-data-table>: value comparison, per-column comparator and the
// ascending -> descending -> unsorted header cycle.

/** Sort direction of a column. */
export type TableSortOrder = "ascend" | "descend";

/** Sorted column and direction; `order: null` means unsorted. */
export interface TableSortState {
  /** Key of the sorted column */
  key: string;
  /** Sort direction; `null` means unsorted */
  order: TableSortOrder | null;
}

/** The column fields read by `getColumnCompare`. */
export interface SortableColumnLike<T> {
  key: string;
  sortable?: boolean | ((a: T, b: T) => number);
}

const isEmpty = (value: unknown): boolean =>
  value === null || value === undefined || value === "";

// Created on first use so importing the module stays free of Intl work.
let collator: Intl.Collator | null = null;

/**
 * Default ascending comparison of two cell values: numbers, dates and
 * booleans by value, everything else as text (numeric-aware, case and
 * accent insensitive). Empty values (`null`, `undefined`, `""`) sort last.
 */
export function compareTableValues(a: unknown, b: unknown): number {
  if (isEmpty(a) || isEmpty(b)) return isEmpty(a) ? (isEmpty(b) ? 0 : 1) : -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === "boolean" && typeof b === "boolean")
    return Number(a) - Number(b);
  collator ??= new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });
  return collator.compare(String(a), String(b));
}

/**
 * Ascending comparator of a column: its own `sortable` function, the
 * default comparison of `row[key]` when `sortable` is `true`, else `null`.
 */
export function getColumnCompare<T>(
  col: SortableColumnLike<T>,
): ((a: T, b: T) => number) | null {
  if (typeof col.sortable === "function") return col.sortable;
  if (col.sortable)
    return (a, b) =>
      compareTableValues(
        (a as Record<string, unknown>)[col.key],
        (b as Record<string, unknown>)[col.key],
      );
  return null;
}

/** Next state of the ascending -> descending -> unsorted cycle of `key`. */
export function nextSortState(
  current: TableSortState | null | undefined,
  key: string,
): TableSortState {
  const order = current?.key === key ? current.order : null;
  return {
    key,
    order: order === null ? "ascend" : order === "ascend" ? "descend" : null,
  };
}
