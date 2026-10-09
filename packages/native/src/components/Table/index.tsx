import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
  type ViewProps,
} from "react-native";
import {
  getColumnCompare,
  nextSortState,
  type TableSortState,
} from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { textStyle } from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";
import { Checkbox } from "../Checkbox";
import { Button } from "../Button";
import { Pagination, type PaginationProps } from "../Pagination";
export type { TableSortState } from "@minerva/core";
export type TableRowKey = string | number;
export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  render?: (row: T, index: number) => ReactNode;
  width?: number;
  align?: "left" | "center" | "right";
  ellipsis?: boolean;
  sortable?: boolean | ((a: T, b: T) => number);
}
export interface TableRowSelection<T> {
  selectedRowKeys?: TableRowKey[];
  defaultSelectedRowKeys?: TableRowKey[];
  onChange?: (keys: TableRowKey[], rows: T[]) => void;
  getCheckboxProps?: (row: T) => { disabled?: boolean };
  getRowLabel?: (row: T, index: number) => string;
}
export interface TableProps<T> extends Omit<ViewProps, "children"> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey?: (row: T, index: number) => TableRowKey;
  emptyText?: ReactNode;
  /** @default false */
  loading?: boolean;
  /** @default "medium" */
  size?: "small" | "medium" | "large";
  /** @default "simple" */
  variant?: "simple" | "striped" | "bordered";
  scroll?: { x?: number; y?: number };
  sortState?: TableSortState | null;
  /** @default null */
  defaultSortState?: TableSortState | null;
  onSortChange?: (state: TableSortState) => void;
  /** @default false */
  manualSort?: boolean;
  rowSelection?: TableRowSelection<T>;
}
function Content({ children }: { children: ReactNode }) {
  const { tokens } = useTheme();
  return typeof children === "string" || typeof children === "number" ? (
    <Text style={textStyle(tokens)}>{children}</Text>
  ) : (
    children
  );
}
export function TableRoot({ children, ...props }: ViewProps) {
  return (
    <View {...props} role="table">
      {children}
    </View>
  );
}
export function TableHead(props: ViewProps) {
  return <View {...props} role="rowgroup" />;
}
export const TableBody = TableHead;
export function TableRow({ style, ...props }: ViewProps) {
  return (
    <View {...props} role="row" style={[{ flexDirection: "row" }, style]} />
  );
}
export function TableHeader({ children, ...props }: ViewProps) {
  return (
    <View {...props} role="columnheader">
      <Content>{children}</Content>
    </View>
  );
}
export function TableCell({ children, ...props }: ViewProps) {
  return (
    <View {...props} role="cell">
      <Content>{children}</Content>
    </View>
  );
}
/** Horizontally scrollable native table; row keys keep selection stable through sorting. */
export function Table<T>({
  columns,
  data,
  rowKey = (_, i) => i,
  emptyText,
  loading = false,
  size = "medium",
  variant = "simple",
  scroll,
  sortState,
  defaultSortState = null,
  onSortChange,
  manualSort = false,
  rowSelection,
  style,
  ...props
}: TableProps<T>) {
  const { tokens: t } = useTheme();
  const { t: translate } = useI18n();
  const [sort, setSort] = useControllable(
    sortState,
    defaultSortState,
    (next) => {
      if (next) onSortChange?.(next);
    },
  );
  const [selected, setSelected] = useControllable(
    rowSelection?.selectedRowKeys,
    rowSelection?.defaultSelectedRowKeys ?? [],
    (keys) =>
      rowSelection?.onChange?.(
        keys,
        data.filter((row, index) => keys.includes(rowKey(row, index))),
      ),
  );
  const indexed = data.map((row, index) => ({
    row,
    index,
    key: rowKey(row, index),
  }));
  const comparator = columns.find((c) => c.key === sort?.key);
  const compare = comparator && getColumnCompare(comparator);
  if (!manualSort && compare && sort?.order)
    indexed.sort(
      (a, b) => (sort.order === "descend" ? -1 : 1) * compare(a.row, b.row),
    );
  const enabled = indexed
    .filter(({ row }) => !rowSelection?.getCheckboxProps?.(row).disabled)
    .map((r) => r.key);
  const all = enabled.length > 0 && enabled.every((k) => selected.includes(k));
  const padding =
    t.space[size === "small" ? "2" : size === "large" ? "4" : "3"];
  const cell = (column: TableColumn<T>) => ({
    width: column.width ?? 160,
    padding,
    borderRightWidth: variant === "bordered" ? 1 : 0,
    borderColor: t.colors["border-color"],
    justifyContent: "center" as const,
  });
  const body = (
    <TableRoot
      {...props}
      style={[
        { minWidth: scroll?.x, backgroundColor: t.colors["surface-color"] },
        style,
      ]}
      accessibilityState={{ busy: loading }}
    >
      <TableHead>
        <TableRow style={{ backgroundColor: t.colors["surface-muted-color"] }}>
          {rowSelection && (
            <View style={{ width: 52, padding }}>
              <Checkbox
                accessibilityLabel={translate("table.selectAll")}
                checked={all}
                indeterminate={
                  !all && enabled.some((k) => selected.includes(k))
                }
                disabled={!enabled.length}
                onChange={() =>
                  setSelected(
                    all
                      ? selected.filter((k) => !enabled.includes(k))
                      : [...new Set([...selected, ...enabled])],
                  )
                }
              />
            </View>
          )}
          {columns.map((column) => (
            <TableHeader key={column.key} style={cell(column)}>
              {column.sortable ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    typeof column.header === "string"
                      ? column.header
                      : column.key
                  }
                  accessibilityHint={
                    sort?.key === column.key
                      ? (sort.order ?? "unsorted")
                      : "unsorted"
                  }
                  onPress={() => setSort(nextSortState(sort, column.key))}
                >
                  <Content>{column.header}</Content>
                  {sort?.key === column.key && sort.order && (
                    <Text style={textStyle(t)}>
                      {sort.order === "ascend" ? "↑" : "↓"}
                    </Text>
                  )}
                </Pressable>
              ) : (
                column.header
              )}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          <ActivityIndicator
            accessibilityLabel={translate("loadingState.label")}
            color={t.colors["primary-color"]}
          />
        ) : indexed.length === 0 ? (
          <View style={{ padding }}>
            <Content>{emptyText ?? translate("table.empty")}</Content>
          </View>
        ) : (
          indexed.map(({ row, index, key }, position) => (
            <TableRow
              key={key}
              style={{
                borderBottomWidth: 1,
                borderColor: t.colors["border-color"],
                backgroundColor:
                  variant === "striped" && position % 2
                    ? t.colors["surface-muted-color"]
                    : undefined,
              }}
            >
              {rowSelection && (
                <View style={{ width: 52, padding }}>
                  <Checkbox
                    accessibilityLabel={translate("table.selectRow", {
                      row: String(
                        rowSelection.getRowLabel?.(row, index) ?? key,
                      ),
                    })}
                    checked={selected.includes(key)}
                    disabled={rowSelection.getCheckboxProps?.(row).disabled}
                    onChange={() =>
                      setSelected(
                        selected.includes(key)
                          ? selected.filter((k) => k !== key)
                          : [...selected, key],
                      )
                    }
                  />
                </View>
              )}
              {columns.map((column) => (
                <TableCell key={column.key} style={cell(column)}>
                  {column.render ? (
                    column.render(row, index)
                  ) : (
                    <Text
                      numberOfLines={column.ellipsis ? 1 : undefined}
                      style={[textStyle(t), { textAlign: column.align }]}
                    >
                      {String(
                        (row as Record<string, unknown>)[column.key] ?? "",
                      )}
                    </Text>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </TableRoot>
  );
  return (
    <ScrollView horizontal nestedScrollEnabled style={{ flexGrow: 0 }}>
      <ScrollView
        nestedScrollEnabled
        style={{ maxHeight: scroll?.y, flexGrow: 0 }}
      >
        {body}
      </ScrollView>
    </ScrollView>
  );
}
export interface DataTableProps<T> extends TableProps<T> {
  pagination?: PaginationProps;
  error?: ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
}
export function DataTable<T>({
  pagination,
  error,
  onRetry,
  retryLabel,
  ...props
}: DataTableProps<T>) {
  const { t: translate } = useI18n();
  return error ? (
    <View accessibilityRole="alert">
      <Content>{error}</Content>
      {onRetry && (
        <Button onPress={onRetry}>
          {retryLabel ?? translate("table.retry")}
        </Button>
      )}
    </View>
  ) : (
    <View>
      <Table {...props} />
      {pagination && <Pagination {...pagination} />}
    </View>
  );
}
