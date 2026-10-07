import type { CSSProperties, ReactNode, Ref } from "react";

export interface PaginationProps {
  /** Current page (1-based, controlled); update it in onChange */
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
  /** Number of items per page (controlled); update it in onChange */
  pageSize?: number;
  /**
   * Initial number of items per page when uncontrolled (pageSize not set)
   * @default 10
   */
  defaultPageSize?: number;
  /** Called with the new page and page size when the page or page size changes (changing the page size resets to page 1) */
  onChange?: (page: number, pageSize: number) => void;
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
  /** Custom rendering of the page, prev/next and jump items */
  itemRender?: (
    page: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
  ) => ReactNode;
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /**
   * Shows the total number of items
   * @default false
   */
  showTotal?: boolean;
  /** Custom rendering of the total (default "Total N items", localized); range is the [first, last] item index of the current page */
  totalRender?: (total: number, range: [number, number]) => ReactNode;
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
   * @default "filled"
   */
  variant?: "filled" | "outlined" | "text";
  /**
   * Simple mode: prev/next buttons with a page input
   * @default false
   */
  simple?: boolean;
  /**
   * Adapts the layout to small screens
   * @default false
   */
  responsive?: boolean;
  /** Custom icons for the prev, next and jump items; omitted ones keep the default icon */
  icons?: {
    prev?: ReactNode;
    next?: ReactNode;
    jumpPrev?: ReactNode;
    jumpNext?: ReactNode;
  };
  /**
   * Custom texts and accessible labels. Each one overrides the localized
   * default (English defaults shown below)
   */
  labels?: PaginationLabels;
  /** Ref to the root <nav> element */
  ref?: Ref<HTMLElement>;
}

/** Texts of Pagination; every omitted entry uses the localized default */
export interface PaginationLabels {
  /**
   * Accessible label of the previous-page button
   * @default "Previous page" (localized)
   */
  prev?: string;
  /**
   * Accessible label of the next-page button
   * @default "Next page" (localized)
   */
  next?: string;
  /**
   * Label of the jump-backward item
   * @default "Previous 5 pages" (localized)
   */
  jumpPrev?: string;
  /**
   * Label of the jump-forward item
   * @default "Next 5 pages" (localized)
   */
  jumpNext?: string;
  /**
   * Accessible label of a page button
   * @default (page) => `Page ${page}` (localized)
   */
  page?: (page: number) => string;
  /**
   * Visible text of the quick jumper
   * @default "Go to" (localized)
   */
  jumpTo?: ReactNode;
  /**
   * Accessible label of the quick jumper input
   * @default "Jump to page" (localized)
   */
  jumpToInput?: string;
  /**
   * Accessible label of the page size selector
   * @default "Items per page" (localized)
   */
  pageSize?: string;
  /**
   * Text of a page size option
   * @default (size) => `${size} / page` (localized)
   */
  pageSizeOption?: (size: number) => string;
  /**
   * Accessible label of the simple-mode page input
   * @default "Current page" (localized)
   */
  currentPage?: string;
  /**
   * Accessible label of the <nav> landmark
   * @default "Pagination" (localized)
   */
  nav?: string;
}
