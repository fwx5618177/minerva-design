import type { VNodeChild } from "vue";

/** Kind of a Pagination item (`itemRender` / `#item` slot) */
export type PaginationItemType =
  "page" | "prev" | "next" | "jump-prev" | "jump-next";

/**
 * Props of `Pagination` (React `PaginationProps`): `current` and `pageSize`
 * are `v-model:current` / `v-model:pageSize`, `onChange` is the `change`
 * event (page, pageSize).
 */
export interface PaginationProps {
  /** Current page (1-based, controlled: `v-model:current`) */
  current?: number;
  /**
   * Initial page when uncontrolled (current not set)
   * @default 1
   */
  defaultCurrent?: number;
  /**
   * Total number of items
   * @default 0
   */
  total?: number;
  /** Number of items per page (controlled: `v-model:pageSize`) */
  pageSize?: number;
  /**
   * Initial number of items per page when uncontrolled (pageSize not set)
   * @default 10
   */
  defaultPageSize?: number;
  /**
   * Disables the pagination
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows an input to jump to a page
   * @default false
   */
  showQuickJumper?: boolean;
  /**
   * Shows a page size selector
   * @default false
   */
  showSizeChanger?: boolean;
  /**
   * Options of the page size selector
   * @default [10, 20, 50, 100]
   */
  pageSizeOptions?: number[];
  /**
   * Custom rendering of the page, prev/next and jump items (or the `item`
   * scoped slot)
   */
  itemRender?: (page: number, type: PaginationItemType) => VNodeChild;
  /**
   * Shows the total number of items; a function renders it (same signature
   * as totalRender)
   * @default false
   */
  showTotal?:
    boolean | ((total: number, range: [number, number]) => VNodeChild);
  /**
   * Custom rendering of the total (or the `total` scoped slot); range is the
   * [first, last] item index of the current page
   */
  totalRender?: (total: number, range: [number, number]) => VNodeChild;
  /**
   * Pagination size
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * Shape of the page items
   * @default "rounded"
   */
  shape?: "circle" | "rounded" | "square";
  /**
   * Visual style of the page items
   * @default "solid"
   */
  variant?: "solid" | "outline" | "ghost";
  /**
   * Simple mode: prev/next buttons with a page input
   * @default false
   */
  simple?: boolean;
  /**
   * Number of pages shown on each side of the current page (switches to
   * the compact page list)
   */
  siblingCount?: number;
  /** Number of pages always shown at both ends of the compact page list */
  boundaryCount?: number;
  /**
   * Hides the prev / next buttons
   * @default false
   */
  hideEdges?: boolean;
  /**
   * Replaces the page buttons with a read-only "current / total" counter
   * @default false
   */
  hideNumbers?: boolean;
  /**
   * Adapts the layout to small screens
   * @default false
   */
  responsive?: boolean;
  /**
   * Custom icons for the prev, next and jump items (or the `prev-icon`,
   * `next-icon`, `jump-prev-icon`, `jump-next-icon` slots)
   */
  icons?: {
    prev?: VNodeChild;
    next?: VNodeChild;
    jumpPrev?: VNodeChild;
    jumpNext?: VNodeChild;
  };
  /** Custom texts and accessible labels (override the localized defaults) */
  labels?: PaginationLabels;
}

/** Texts of Pagination; every omitted entry uses the localized default */
export interface PaginationLabels {
  /** @default "Previous page" (localized) */
  prev?: string;
  /** @default "Next page" (localized) */
  next?: string;
  /** @default "Previous 5 pages" (localized) */
  jumpPrev?: string;
  /** @default "Next 5 pages" (localized) */
  jumpNext?: string;
  /** @default (page) => `Page ${page}` (localized) */
  page?: (page: number) => string;
  /** Visible text of the quick jumper. @default "Go to" (localized) */
  jumpTo?: string;
  /** @default "Jump to page" (localized) */
  jumpToInput?: string;
  /** @default "Items per page" (localized) */
  pageSize?: string;
  /** @default (size) => `${size} / page` (localized) */
  pageSizeOption?: (size: number) => string;
  /** @default "Current page" (localized) */
  currentPage?: string;
  /** @default (total) => `Total ${total} items` (localized) */
  total?: (total: number) => string;
  /** Accessible label of the <nav> landmark. @default "Pagination" (localized) */
  nav?: string;
}
