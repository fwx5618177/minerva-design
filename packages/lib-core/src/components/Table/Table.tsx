import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import {
  IconChevronDown,
  IconChevronUp,
  IconChevronsUpDown,
} from "../../internal/icons";
import { computeFixedColumnLayout } from "./fixedColumns";
import type {
  TableBodyProps,
  TableCellProps,
  TableColumn,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRootProps,
  TableRowKey,
  TableRowProps,
  TableSortCompare,
  TableSortState,
} from "./types";
import styles from "./table.module.scss";

const toLength = (value: number | string | undefined): string | undefined =>
  value === undefined
    ? undefined
    : typeof value === "number"
      ? `${value}px`
      : value;

/**
 * TableRoot: a styled `<table>` inside a horizontally scrolling wrapper. Use it
 * with TableHead / TableBody / TableRow / TableHeader / TableCell for custom
 * headers or merged cells; use `Table` for the declarative columns API.
 */
export const TableRoot = ({
  size = "medium",
  variant = "simple",
  hoverable = false,
  scroll,
  className,
  style,
  ref,
  ...rest
}: TableRootProps) => {
  const { t } = useI18n();
  const scrollX = toLength(scroll?.x);
  const scrollY = toLength(scroll?.y);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);

  // Without an explicit scroll config, the wrapper still scrolls when the
  // content overflows it: track that so it can become a focusable region.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () =>
      setOverflowing(
        el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight,
      );
    update();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => observer.disconnect();
  }, []);

  // A scrolling wrapper is a tab stop so keyboard users can scroll it; it is
  // named after the table (or a localized default).
  const scrollable = Boolean(scrollX || scrollY) || overflowing;
  const labelledBy = rest["aria-labelledby"];
  const regionProps = scrollable
    ? {
        role: "region",
        tabIndex: 0,
        "aria-labelledby": labelledBy,
        "aria-label": labelledBy
          ? undefined
          : (rest["aria-label"] ?? t("table.scrollRegion")),
      }
    : undefined;
  const wrapperStyle: CSSProperties | undefined = scrollY
    ? { maxHeight: scrollY, overflowY: "auto" }
    : undefined;
  const tableStyle: CSSProperties | undefined =
    scrollX || style
      ? { ...(scrollX ? { minWidth: scrollX } : {}), ...style }
      : undefined;

  return (
    <div
      ref={wrapperRef}
      {...regionProps}
      className={cn(
        styles.wrapper,
        variant === "bordered" && styles.wrapperBordered,
        scrollY && styles.wrapperScrollY,
      )}
      style={wrapperStyle}
    >
      <table
        ref={ref}
        className={cn(
          styles.table,
          styles[size],
          styles[variant],
          hoverable && styles.hoverable,
          scrollX && styles.scrollX,
          className,
        )}
        style={tableStyle}
        {...rest}
      />
    </div>
  );
};

/** `<thead>` of a TableRoot */
export const TableHead = ({ ref, ...props }: TableHeadProps) => (
  <thead ref={ref} {...props} />
);

/** `<tbody>` of a TableRoot */
export const TableBody = ({ ref, ...props }: TableBodyProps) => (
  <tbody ref={ref} {...props} />
);

/** `<tr>` of a TableRoot */
export const TableRow = ({ ref, ...props }: TableRowProps) => (
  <tr ref={ref} {...props} />
);

/** `<th>` of a TableRoot */
export const TableHeader = ({ ref, ...props }: TableHeaderProps) => (
  <th ref={ref} {...props} />
);

/** `<td>` of a TableRoot */
export const TableCell = ({ ref, ...props }: TableCellProps) => (
  <td ref={ref} {...props} />
);

const isEmpty = (value: unknown): boolean =>
  value === null || value === undefined || value === "";

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

/** Default ascending comparison of two cell values (empty values last) */
const compareValues = (a: unknown, b: unknown): number => {
  if (isEmpty(a) || isEmpty(b)) return isEmpty(a) ? (isEmpty(b) ? 0 : 1) : -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === "boolean" && typeof b === "boolean")
    return Number(a) - Number(b);
  return collator.compare(String(a), String(b));
};

const compareFor = <T,>(col: TableColumn<T>): TableSortCompare<T> | null => {
  if (typeof col.sortable === "function") return col.sortable;
  if (col.sortable)
    return (a, b) =>
      compareValues(
        (a as Record<string, unknown>)[col.key],
        (b as Record<string, unknown>)[col.key],
      );
  return null;
};

/** Next state of the ascending → descending → unsorted cycle */
const nextSortState = (
  current: TableSortState | null,
  key: string,
): TableSortState => {
  const order = current?.key === key ? current.order : null;
  return {
    key,
    order: order === null ? "ascend" : order === "ascend" ? "descend" : null,
  };
};

const ARIA_SORT = { ascend: "ascending", descend: "descending" } as const;

/** Width of the selection column (px) */
const SELECTION_WIDTH = 48;

/**
 * Table: declarative data table (`columns` + `data`) with sortable columns,
 * row selection, sticky fixed columns, ellipsis columns, empty and loading
 * states.
 */
export function Table<T>({
  columns,
  data,
  rowKey,
  emptyText,
  loading = false,
  loadingRows = 5,
  sortState: sortStateProp,
  defaultSortState,
  onSortChange,
  manualSort = false,
  rowSelection,
  ...rootProps
}: TableProps<T>) {
  const { t } = useI18n();
  const layout = computeFixedColumnLayout(columns);
  const { rightOffsets, lastLeftFixedKey, firstRightFixedKey } = layout;
  const hasSelection = rowSelection !== undefined;
  // The selection column sticks with a leading left-fixed block and shifts it.
  const selectionFixed = hasSelection && columns[0]?.fixed === "left";
  const leftShift = selectionFixed ? SELECTION_WIDTH : 0;

  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("Table", {
      prop: "sortState",
      value: sortStateProp,
      defaultProp: "defaultSortState",
      defaultValue: defaultSortState,
      handlerProp: "onSortChange",
      handler: onSortChange,
    });
  }
  const [sortState, setSortState] = useControllableState<TableSortState | null>(
    {
      value: sortStateProp,
      defaultValue: defaultSortState ?? null,
      onChange: (next) => {
        if (next) onSortChange?.(next);
      },
      name: "Table",
      prop: "sortState",
    },
  );
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("Table", {
      prop: "rowSelection.selectedRowKeys",
      value: rowSelection?.selectedRowKeys,
      defaultProp: "rowSelection.defaultSelectedRowKeys",
      defaultValue: rowSelection?.defaultSelectedRowKeys,
      handlerProp: "rowSelection.onChange",
      handler: rowSelection?.onChange,
    });
  }
  const [selectedKeys, setSelectedKeys] = useControllableState<TableRowKey[]>({
    value: rowSelection?.selectedRowKeys,
    defaultValue: rowSelection?.defaultSelectedRowKeys ?? [],
    name: "Table",
    prop: "rowSelection.selectedRowKeys",
    defaultProp: "rowSelection.defaultSelectedRowKeys",
  });

  // Row keys come from the position in `data`, so they survive sorting.
  const keyOf = (row: T, index: number): TableRowKey =>
    rowKey ? rowKey(row, index) : index;
  const entries = data.map((row, index) => ({
    row,
    index,
    key: keyOf(row, index),
  }));

  const activeOrder = sortState?.order ?? null;
  const sortColumn =
    activeOrder === null
      ? undefined
      : columns.find((col) => col.key === sortState?.key);
  const compare = sortColumn ? compareFor(sortColumn) : null;
  const rows =
    !manualSort && compare
      ? [...entries].sort((a, b) =>
          activeOrder === "descend"
            ? compare(b.row, a.row)
            : compare(a.row, b.row),
        )
      : entries;

  // Selection
  const selectedSet = new Set(selectedKeys);
  const isRowDisabled = (row: T) =>
    Boolean(rowSelection?.getCheckboxProps?.(row).disabled);
  const selectable = entries.filter((e) => !isRowDisabled(e.row));
  const allSelected =
    selectable.length > 0 && selectable.every((e) => selectedSet.has(e.key));
  const someSelected =
    !allSelected && entries.some((e) => selectedSet.has(e.key));

  const commitSelection = (keys: TableRowKey[]) => {
    setSelectedKeys(keys);
    const keySet = new Set(keys);
    rowSelection?.onChange?.(
      keys,
      entries.filter((e) => keySet.has(e.key)).map((e) => e.row),
    );
  };

  const toggleRow = (key: TableRowKey, checked: boolean) =>
    commitSelection(
      checked
        ? [...selectedKeys.filter((k) => k !== key), key]
        : selectedKeys.filter((k) => k !== key),
    );

  // Select-all only touches the selectable rows: disabled rows keep their
  // state, keys outside `data` (e.g. other pages) are preserved.
  const toggleAll = () => {
    const selectableKeys = new Set(selectable.map((e) => e.key));
    commitSelection(
      allSelected
        ? selectedKeys.filter((k) => !selectableKeys.has(k))
        : [
            ...selectedKeys,
            ...selectable.map((e) => e.key).filter((k) => !selectedSet.has(k)),
          ],
    );
  };

  // Column width goes to both width and min-width: with table-layout: auto the
  // min-width is a hard floor, so narrow containers scroll instead of squeezing.
  const cellStyleFor = (col: TableColumn<T>): CSSProperties => {
    const style: CSSProperties = { textAlign: col.align };
    const width = toLength(col.width);
    if (width !== undefined) {
      style.width = width;
      style.minWidth = width;
    }
    if (col.fixed === "left")
      style.left = `${(layout.leftOffsets[col.key] ?? 0) + leftShift}px`;
    else if (col.fixed === "right")
      style.right = `${rightOffsets[col.key] ?? 0}px`;
    return style;
  };

  const cellPropsFor = (col: TableColumn<T>) => ({
    style: cellStyleFor(col),
    "data-ellipsis": col.ellipsis ? "true" : undefined,
    "data-fixed": col.fixed,
    "data-fixed-edge":
      col.fixed === "left" && col.key === lastLeftFixedKey
        ? "left"
        : col.fixed === "right" && col.key === firstRightFixedKey
          ? "right"
          : undefined,
  });

  const selectionCellProps = {
    className: styles.selectionCell,
    style: {
      width: SELECTION_WIDTH,
      minWidth: SELECTION_WIDTH,
      ...(selectionFixed ? { left: 0 } : {}),
    },
    "data-fixed": selectionFixed ? "left" : undefined,
  };

  const columnCount = columns.length + (hasSelection ? 1 : 0);

  let body: ReactNode;
  if (loading) {
    body = Array.from({ length: loadingRows }, (_, i) => (
      <TableRow key={`skeleton-${i}`} aria-hidden="true">
        {hasSelection && <TableCell {...selectionCellProps} />}
        {columns.map((col) => (
          <TableCell
            key={col.key}
            {...cellPropsFor(col)}
            data-ellipsis={undefined}
          >
            <span className={styles.skeleton} />
          </TableCell>
        ))}
      </TableRow>
    ));
  } else if (data.length === 0) {
    body = (
      <TableRow>
        <TableCell colSpan={columnCount} className={styles.empty}>
          {emptyText ?? t("table.empty")}
        </TableCell>
      </TableRow>
    );
  } else {
    body = rows.map(({ row, index, key }, i) => {
      const selected = hasSelection && selectedSet.has(key);
      return (
        <TableRow
          key={key}
          aria-selected={selected || undefined}
          data-selected={selected || undefined}
        >
          {hasSelection && (
            <TableCell {...selectionCellProps}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selected}
                disabled={isRowDisabled(row)}
                aria-label={t("table.selectRow", {
                  row: rowSelection.getRowLabel?.(row, index) ?? String(key),
                })}
                onChange={(e) => toggleRow(key, e.target.checked)}
              />
            </TableCell>
          )}
          {columns.map((col) => (
            <TableCell key={col.key} {...cellPropsFor(col)}>
              {col.render
                ? col.render(row, i)
                : ((row as Record<string, unknown>)[col.key] as ReactNode)}
            </TableCell>
          ))}
        </TableRow>
      );
    });
  }

  const renderHeader = (col: TableColumn<T>) => {
    if (!col.sortable)
      return (
        <TableHeader key={col.key} scope="col" {...cellPropsFor(col)}>
          {col.header}
        </TableHeader>
      );
    const order = sortState?.key === col.key ? sortState.order : null;
    const Icon =
      order === "ascend"
        ? IconChevronUp
        : order === "descend"
          ? IconChevronDown
          : IconChevronsUpDown;
    return (
      <TableHeader
        key={col.key}
        scope="col"
        aria-sort={order ? ARIA_SORT[order] : "none"}
        {...cellPropsFor(col)}
      >
        <button
          type="button"
          className={styles.sortButton}
          data-sort-order={order ?? undefined}
          onClick={() => setSortState(nextSortState(sortState, col.key))}
        >
          <span className={styles.sortLabel}>{col.header}</span>
          <Icon aria-hidden="true" className={styles.sortIcon} />
        </button>
      </TableHeader>
    );
  };

  return (
    <TableRoot {...rootProps}>
      <TableHead>
        <TableRow>
          {hasSelection && (
            <TableHeader scope="col" {...selectionCellProps}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={allSelected}
                disabled={selectable.length === 0 || loading}
                aria-label={t("table.selectAll")}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={toggleAll}
              />
            </TableHeader>
          )}
          {columns.map(renderHeader)}
        </TableRow>
      </TableHead>
      <TableBody>{body}</TableBody>
    </TableRoot>
  );
}
