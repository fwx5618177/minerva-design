import type {
  HTMLAttributes,
  ReactNode,
  Ref,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
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

/** Props of `TableRoot`, the styled `<table>` (wrapped in a scroll container) */
export interface TableRootProps extends Omit<
  TableHTMLAttributes<HTMLTableElement>,
  "size"
> {
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
  /** Ref to the `<table>` element */
  ref?: Ref<HTMLTableElement>;
}

/** Props of `TableHead` (`<thead>`) */
export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  /** Ref to the `<thead>` element */
  ref?: Ref<HTMLTableSectionElement>;
}

/** Props of `TableBody` (`<tbody>`) */
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  /** Ref to the `<tbody>` element */
  ref?: Ref<HTMLTableSectionElement>;
}

/** Props of `TableRow` (`<tr>`) */
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Ref to the `<tr>` element */
  ref?: Ref<HTMLTableRowElement>;
}

/** Props of `TableHeader` (`<th>`) */
export interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Ref to the `<th>` element */
  ref?: Ref<HTMLTableCellElement>;
}

/** Props of `TableCell` (`<td>`) */
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Ref to the `<td>` element */
  ref?: Ref<HTMLTableCellElement>;
}

/** A column of the declarative `Table` */
export interface TableColumn<T> {
  /** Unique key of the column; also the default field read from each row */
  key: string;
  /** Header content */
  header: ReactNode;
  /** Renders a cell; defaults to `row[key]` */
  render?: (row: T, rowIndex: number) => ReactNode;
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
  /** Keys of the selected rows (controlled) */
  selectedRowKeys?: TableRowKey[];
  /**
   * Keys of the initially selected rows (uncontrolled)
   * @default []
   */
  defaultSelectedRowKeys?: TableRowKey[];
  /** Called with the new selected keys and the matching rows of `data` */
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
export interface TableProps<T> extends Omit<TableRootProps, "children"> {
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Rows to render */
  data: T[];
  /** Extracts a stable key from a row (defaults to the row index) */
  rowKey?: (row: T, index: number) => TableRowKey;
  /**
   * Content of the single row shown when `data` is empty
   * @default "No data" (localized)
   */
  emptyText?: ReactNode;
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
   * Sort state (controlled); `null` means unsorted. Use with `onSortChange`
   */
  sortState?: TableSortState | null;
  /**
   * Initial sort state (uncontrolled)
   * @default null
   */
  defaultSortState?: TableSortState | null;
  /** Called with the next sort state when a sortable header is activated */
  onSortChange?: (sortState: TableSortState) => void;
  /**
   * Skips local sorting: `data` is rendered as given (sorted by the data
   * owner, e.g. a server) while the headers still reflect the sort state
   * @default false
   */
  manualSort?: boolean;
  /** Adds a leading checkbox column to select rows */
  rowSelection?: TableRowSelection<T>;
}

/** Props of `DataTable`: a `Table` with pagination and error / retry states */
export interface DataTableProps<T> extends TableProps<T> {
  /**
   * Pagination rendered under the table. Rows are expected to be already
   * paginated: fetching / slicing belongs to the data owner
   */
  pagination?: PaginationProps;
  /** Error message; replaces the table (and pagination) with an alert */
  error?: ReactNode;
  /** Called by the retry button shown with `error` (no button when omitted) */
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

/** Props of `TableCellContent`: bounded primary / secondary content of a cell */
export interface TableCellContentProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Main content */
  primary: ReactNode;
  /** Secondary, muted content rendered under the primary content */
  secondary?: ReactNode;
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
  /** Ref to the root `<div>` element */
  ref?: Ref<HTMLDivElement>;
}
