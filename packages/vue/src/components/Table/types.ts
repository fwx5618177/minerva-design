import type { VNodeChild } from "vue";
import type { PaginationProps } from "../Pagination/types";

/** Density of the table cells */
export type TableSize = "small" | "medium" | "large";

/** Visual style of the table */
export type TableVariant = "simple" | "striped" | "bordered";

/** Horizontal alignment of a column */
export type TableColumnAlign = "left" | "center" | "right";

/** Side a column sticks to while the table scrolls horizontally */
export type TableColumnFixed = "left" | "right";

/**
 * Scroll configuration (same model as antd / arco / mantine). Numbers are
 * pixels, strings are any CSS length.
 */
export interface TableScrollConfig {
  /**
   * Minimum width of the table. The wrapper already scrolls horizontally, so
   * the table scrolls as soon as its container is narrower than this value
   */
  x?: number | string;
  /**
   * Maximum visible height of the table. The wrapper scrolls vertically and
   * the header row stays sticky
   */
  y?: number | string;
}

/**
 * Props of `TableRoot`, the styled `<table>` (wrapped in a scroll container).
 * Other attributes (`aria-label`, `class`, `style`...) fall through to the
 * `<table>`.
 */
export interface TableRootProps {
  /**
   * Density of the cells
   * @default "medium"
   */
  size?: TableSize;
  /**
   * Visual style: plain rows, zebra stripes or bordered cells
   * @default "simple"
   */
  variant?: TableVariant;
  /**
   * Highlights body rows on hover
   * @default false
   */
  hoverable?: boolean;
  /**
   * Horizontal minimum width / vertical maximum height of the scroll area.
   * When set (or when the content overflows), the scroll area becomes a
   * focusable region named by the table's `aria-label` / `aria-labelledby`
   * (default: "Scrollable table", localized) so keyboard users can scroll it
   */
  scroll?: TableScrollConfig;
}

/** Props of `TableHead` (`<thead>`; attributes fall through) */
export type TableHeadProps = Record<never, never>;

/** Props of `TableBody` (`<tbody>`; attributes fall through) */
export type TableBodyProps = Record<never, never>;

/**
 * Props of `TableRow` (`<tr>`; attributes fall through). A row with
 * `aria-selected` true gets the `data-selected` item hook.
 */
export type TableRowProps = Record<never, never>;

/**
 * Props of `TableHeader` (`<th>`; attributes fall through). A header with
 * `aria-sort` ascending / descending / none gets the `data-sort` item hook.
 */
export type TableHeaderProps = Record<never, never>;

/** Props of `TableCell` (`<td>`; attributes fall through) */
export type TableCellProps = Record<never, never>;

/** A column of the declarative `Table` */
export interface TableColumn<T> {
  /** Unique key of the column; also the default field read from each row */
  key: string;
  /** Header content (or the `header-<key>` slot) */
  header: VNodeChild;
  /**
   * Renders a cell (or the `cell-<key>` slot); defaults to `row[key]`.
   * `rowIndex` is the position in the rendered (sorted) rows
   */
  render?: (row: T, rowIndex: number) => VNodeChild;
  /**
   * Column width (numbers are pixels). Applied as both width and min-width so
   * narrow containers scroll instead of squeezing the column. Required for
   * fixed columns (their offsets are the sum of the previous widths)
   */
  width?: string | number;
  /** Horizontal alignment of the header and cells */
  align?: TableColumnAlign;
  /**
   * Truncates the content on a single line with an ellipsis
   * @default false
   */
  ellipsis?: boolean;
  /**
   * Sticks the column to the left or right edge while scrolling
   * horizontally. Fixed columns must be declared contiguously at the start
   * (left) or end (right) of `columns`
   */
  fixed?: TableColumnFixed;
  /**
   * Makes the column sortable: its header becomes a button cycling ascending
   * → descending → unsorted. `true` compares `row[key]` (numbers, dates,
   * then strings with a locale / numeric collation; empty values last); a
   * function `(a, b) => number` compares two rows for the ascending order
   * @default false
   */
  sortable?: boolean | TableSortCompare<T>;
}

/** Key identifying a row (returned by `rowKey`) */
export type TableRowKey = string | number;

/** Direction of a sorted column */
export type TableSortOrder = "ascend" | "descend";

/** Compares two rows for the ascending order (like `Array.prototype.sort`) */
export type TableSortCompare<T> = (a: T, b: T) => number;

/** Sort state of a `Table` */
export interface TableSortState {
  /** Key of the sorted column */
  key: string;
  /** Sort direction; `null` means unsorted */
  order: TableSortOrder | null;
}

/** Row selection configuration of a `Table` (leading checkbox column) */
export interface TableRowSelection<T> {
  /**
   * Selection mode (multiple selection with checkboxes)
   * @default "checkbox"
   */
  type?: "checkbox";
  /**
   * Keys of the selected rows (controlled). The `v-model:selectedRowKeys`
   * prop of the Table takes precedence
   */
  selectedRowKeys?: TableRowKey[];
  /**
   * Keys of the initially selected rows (uncontrolled)
   * @default []
   */
  defaultSelectedRowKeys?: TableRowKey[];
  /**
   * Called with the new selected keys and the matching rows of `data` (the
   * Table also emits `selectionChange`)
   */
  onChange?: (selectedRowKeys: TableRowKey[], selectedRows: T[]) => void;
  /**
   * Per-row checkbox options; disabled rows cannot be toggled and are
   * skipped by the select-all checkbox
   */
  getCheckboxProps?: (row: T) => { disabled?: boolean };
  /**
   * Names a row in the accessible label of its checkbox ("Select row
   * {name}")
   * @default the row key
   */
  getRowLabel?: (row: T, index: number) => string;
}

/** Props of the declarative `Table` */
export interface TableProps<T> extends TableRootProps {
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Rows to render */
  data: T[];
  /** Extracts a stable key from a row (defaults to the row index) */
  rowKey?: (row: T, index: number) => TableRowKey;
  /**
   * Content of the single row shown when `data` is empty (or the `empty`
   * slot)
   * @default "No data" (localized)
   */
  emptyText?: string;
  /**
   * Renders placeholder skeleton rows instead of the data
   * @default false
   */
  loading?: boolean;
  /**
   * Number of skeleton rows rendered while loading
   * @default 5
   */
  loadingRows?: number;
  /**
   * Sort state (controlled, `v-model:sortState`); `null` means unsorted
   */
  sortState?: TableSortState | null;
  /**
   * Initial sort state (uncontrolled)
   * @default null
   */
  defaultSortState?: TableSortState | null;
  /**
   * Skips local sorting: `data` is rendered as given (sorted by the data
   * owner, e.g. a server) while the headers still reflect the sort state
   * @default false
   */
  manualSort?: boolean;
  /** Adds a leading checkbox column to select rows */
  rowSelection?: TableRowSelection<T>;
  /**
   * Keys of the selected rows (controlled, `v-model:selectedRowKeys`; wins
   * over `rowSelection.selectedRowKeys`). Setting it (or
   * `defaultSelectedRowKeys`) also enables the selection column
   */
  selectedRowKeys?: TableRowKey[];
  /**
   * Keys of the initially selected rows (uncontrolled; wins over
   * `rowSelection.defaultSelectedRowKeys`)
   */
  defaultSelectedRowKeys?: TableRowKey[];
}

/**
 * Pagination rendered under a `DataTable`: the props of the `Pagination`
 * component, plus `onChange` (its `change` event: page and page size)
 */
export type DataTablePagination = PaginationProps & {
  /** Called with the new page and page size */
  onChange?: (page: number, pageSize: number) => void;
};

/** Props of `DataTable`: a `Table` with pagination and error / retry states */
export interface DataTableProps<T> extends TableProps<T> {
  /**
   * Pagination rendered under the table (or the `pagination` slot). Rows
   * are expected to be already paginated: fetching / slicing belongs to the
   * data owner
   */
  pagination?: DataTablePagination;
  /**
   * Error message (or the `error` slot); replaces the table (and
   * pagination) with an alert
   */
  error?: string;
  /**
   * Called by the retry button shown with `error` (`@retry`; no button
   * without a listener)
   */
  onRetry?: () => void;
  /**
   * Text of the retry button
   * @default "Retry" (localized)
   */
  retryLabel?: string;
}

/** Sticky offsets computed by `computeFixedColumnLayout` */
export interface FixedColumnLayout {
  /** Left offset (px) of every left-fixed column, by column key */
  leftOffsets: Record<string, number>;
  /** Right offset (px) of every right-fixed column, by column key */
  rightOffsets: Record<string, number>;
  /** Last column of the leading left-fixed block (gets the edge shadow) */
  lastLeftFixedKey: string | undefined;
  /** First column of the trailing right-fixed block (gets the edge shadow) */
  firstRightFixedKey: string | undefined;
}

/**
 * Props of `TableCellContent`: bounded primary / secondary content of a cell.
 * Attributes fall through to the root `<div>`.
 */
export interface TableCellContentProps {
  /** Main content (or the default slot) */
  primary?: string | number;
  /** Secondary, muted content rendered under the primary content (or the `secondary` slot) */
  secondary?: string | number;
  /**
   * Renders the primary content as `<code>` in the monospace font
   * @default false
   */
  monospace?: boolean;
  /**
   * Maximum width (numbers are pixels); long content wraps
   * @default 360
   */
  maxWidth?: string | number;
}
