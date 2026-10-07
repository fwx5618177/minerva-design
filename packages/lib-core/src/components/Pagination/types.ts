import { ReactNode, CSSProperties } from "react";

export interface PaginationProps {
  /**
   * Current page (1-based); update it in onChange
   * @default 1
   */
  current?: number;
  /**
   * Total number of items
   * @default 0
   */
  total?: number;
  /**
   * Number of items per page
   * @default 10
   */
  pageSize?: number;
  /** Called with the new page and page size when the page or page size changes */
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
  /** Custom rendering of the total; range is the [first, last] item index of the current page */
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
  /** Custom icons for the prev, next and jump items */
  icons?: {
    prev?: ReactNode;
    next?: ReactNode;
    jumpPrev?: ReactNode;
    jumpNext?: ReactNode;
  };
}
