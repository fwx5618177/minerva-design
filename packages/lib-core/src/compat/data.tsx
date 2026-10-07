// @novel-isr/ui compatibility: data group.
//
// Table / TableRoot / DataTable / TableCellContent, NavTree, Tabs and
// HtmlPreview were ported with the same DOM, `ui-*` hooks, `data-*` attributes
// and `--ui-tabs-*` override properties. The adapters below only map
// novel-isr-ui's prop names / values to Minerva's:
// - Table / TableRoot / DataTable: size "sm" | "md" | "lg" -> "small" | "medium" | "large";
//   DataTable `pagination` uses novel's Pagination props (page / onPageChange /
//   onPageSizeChange ...), mapped to Minerva's Pagination.
// - NavTree: `aria-label` -> `ariaLabel` (default kept as novel's English "Navigation").
// - Tabs / Tab: `colorScheme` ("brand" | "gray" | ...) -> `color` ("primary" | "neutral" | ...),
//   Radix `onValueChange` -> `onChange`.
// The compat layer does not depend on lib-core's language: novel-isr-ui's
// original (Chinese) built-in texts are passed explicitly as default props
// (empty text, retry, pagination labels); consumer props override them.
import type { ReactNode, Ref } from "react";
import type * as RadixTabs from "@radix-ui/react-tabs";
import {
  Table as MinervaTable,
  TableRoot as MinervaTableRoot,
  DataTable as MinervaDataTable,
  type TableProps as MinervaTableProps,
  type TableRootProps as MinervaTableRootProps,
  type DataTableProps as MinervaDataTableProps,
  type TableSize as MinervaTableSize,
} from "../components/Table";
import {
  toMinervaPaginationProps,
  type NovelPaginationProps,
} from "../internal/general-pagination";
import {
  NavTree as MinervaNavTree,
  type NavTreeProps as MinervaNavTreeProps,
} from "../components/NavTree";
import {
  Tabs as MinervaTabs,
  Tab as MinervaTab,
  type TabsColor,
} from "../components/Tabs";

// ─── Table ──────────────────────────────────────────────────────────────

export {
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  TableCellContent,
  computeFixedColumnLayout,
} from "../components/Table";
export type {
  TableColumn,
  TableVariant,
  TableScrollConfig,
  TableCellContentProps,
  FixedColumnLayout,
} from "../components/Table";

export type TableSize = "sm" | "md" | "lg";

const TABLE_SIZE: Record<TableSize, MinervaTableSize> = {
  sm: "small",
  md: "medium",
  lg: "large",
};

const tableSize = (size: TableSize | undefined) =>
  size === undefined ? undefined : TABLE_SIZE[size];

export interface TableRootProps extends Omit<MinervaTableRootProps, "size"> {
  size?: TableSize;
}

export const TableRoot = ({ size, ...props }: TableRootProps) => (
  <MinervaTableRoot {...props} size={tableSize(size)} />
);

export interface TableProps<T> extends Omit<MinervaTableProps<T>, "size"> {
  size?: TableSize;
}

export function Table<T>({
  size,
  emptyText = "暂无数据",
  ...props
}: TableProps<T>) {
  return (
    <MinervaTable<T> {...props} emptyText={emptyText} size={tableSize(size)} />
  );
}

export interface DataTableProps<T> extends Omit<
  MinervaDataTableProps<T>,
  "size" | "pagination"
> {
  size?: TableSize;
  /** Rows are already paginated. Fetching/slicing belongs to the data owner. */
  pagination?: NovelPaginationProps;
}

export function DataTable<T>({
  size,
  pagination,
  emptyText = "暂无数据",
  retryLabel = "重试",
  ...props
}: DataTableProps<T>) {
  return (
    <MinervaDataTable<T>
      {...props}
      emptyText={emptyText}
      retryLabel={retryLabel}
      size={tableSize(size)}
      pagination={pagination && toMinervaPaginationProps(pagination)}
    />
  );
}

// ─── NavTree ────────────────────────────────────────────────────────────

export type {
  NavTreeItem,
  NavTreeSection,
  NavTreeItemState,
} from "../components/NavTree";

export interface NavTreeProps extends Omit<MinervaNavTreeProps, "ariaLabel"> {
  "aria-label"?: string;
}

export const NavTree = ({
  "aria-label": ariaLabel = "Navigation",
  ...props
}: NavTreeProps) => <MinervaNavTree {...props} ariaLabel={ariaLabel} />;

// ─── Tabs ───────────────────────────────────────────────────────────────

export { TabList, TabPanel } from "../components/Tabs";
export type {
  TabListProps,
  TabPanelProps,
  TabsVariant,
  TabsOrientation,
} from "../components/Tabs";

export type TabsColorScheme =
  "brand" | "gray" | "success" | "warning" | "danger";

const TABS_COLOR: Record<TabsColorScheme, TabsColor> = {
  brand: "primary",
  gray: "neutral",
  success: "success",
  warning: "warning",
  danger: "danger",
};

const tabsColor = (scheme: TabsColorScheme | undefined) =>
  scheme === undefined ? undefined : TABS_COLOR[scheme];

export interface TabsProps extends Omit<RadixTabs.TabsProps, "asChild"> {
  variant?: "line" | "enclosed" | "soft" | "pills";
  colorScheme?: TabsColorScheme;
  ref?: Ref<HTMLDivElement>;
}

export const Tabs = ({ colorScheme, onValueChange, ...props }: TabsProps) => (
  <MinervaTabs
    {...props}
    // Minerva's onChange is the value callback; a DOM form onChange inherited
    // from the div props (never meaningful on tabs) is replaced.
    onChange={onValueChange}
    color={tabsColor(colorScheme)}
  />
);

export interface TabProps extends Omit<RadixTabs.TabsTriggerProps, "asChild"> {
  children: ReactNode;
  /** Override the group color and keep this tab tinted when inactive. */
  colorScheme?: TabsColorScheme;
  ref?: Ref<HTMLButtonElement>;
}

export const Tab = ({ colorScheme, ...props }: TabProps) => (
  <MinervaTab {...props} color={tabsColor(colorScheme)} />
);

// ─── HtmlPreview ────────────────────────────────────────────────────────

export { HtmlPreview } from "../components/HtmlPreview";
export type { HtmlPreviewProps } from "../components/HtmlPreview";
