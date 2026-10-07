import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import { computeFixedColumnLayout } from "./fixedColumns";
import type {
  TableBodyProps,
  TableCellProps,
  TableColumn,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRootProps,
  TableRowProps,
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
  const scrollX = toLength(scroll?.x);
  const scrollY = toLength(scroll?.y);
  const wrapperStyle: CSSProperties | undefined = scrollY
    ? { maxHeight: scrollY, overflowY: "auto" }
    : undefined;
  const tableStyle: CSSProperties | undefined =
    scrollX || style
      ? { ...(scrollX ? { minWidth: scrollX } : {}), ...style }
      : undefined;

  return (
    <div
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

/**
 * Table: declarative data table (`columns` + `data`) with sticky fixed
 * columns, ellipsis columns, empty and loading states.
 */
export function Table<T>({
  columns,
  data,
  rowKey,
  emptyText,
  loading = false,
  loadingRows = 5,
  ...rootProps
}: TableProps<T>) {
  const { t } = useI18n();
  const { leftOffsets, rightOffsets, lastLeftFixedKey, firstRightFixedKey } =
    computeFixedColumnLayout(columns);

  // Column width goes to both width and min-width: with table-layout: auto the
  // min-width is a hard floor, so narrow containers scroll instead of squeezing.
  const cellStyleFor = (col: TableColumn<T>): CSSProperties => {
    const style: CSSProperties = { textAlign: col.align };
    const width = toLength(col.width);
    if (width !== undefined) {
      style.width = width;
      style.minWidth = width;
    }
    if (col.fixed === "left") style.left = `${leftOffsets[col.key] ?? 0}px`;
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

  let body: ReactNode;
  if (loading) {
    body = Array.from({ length: loadingRows }, (_, i) => (
      <TableRow key={`skeleton-${i}`} aria-hidden="true">
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
        <TableCell colSpan={columns.length} className={styles.empty}>
          {emptyText ?? t("table.empty")}
        </TableCell>
      </TableRow>
    );
  } else {
    body = data.map((row, i) => (
      <TableRow key={rowKey ? rowKey(row, i) : i}>
        {columns.map((col) => (
          <TableCell key={col.key} {...cellPropsFor(col)}>
            {col.render
              ? col.render(row, i)
              : ((row as Record<string, unknown>)[col.key] as ReactNode)}
          </TableCell>
        ))}
      </TableRow>
    ));
  }

  return (
    <TableRoot {...rootProps}>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableHeader key={col.key} scope="col" {...cellPropsFor(col)}>
              {col.header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{body}</TableBody>
    </TableRoot>
  );
}
