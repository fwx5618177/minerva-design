import type { VNodeChild } from "vue";

export interface VirtualListItem {
  /** Unique key of the item */
  id: string | number;
  /** Arbitrary data for renderItem */
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Props of `VirtualList` (same names and defaults as the React
 * `VirtualListProps`). Other attributes (id, class, style, data-*, aria-*,
 * listeners...) fall through to the root (scroll container) element.
 * Rows render with the default scoped slot (`#default="{ item, index }"`)
 * or the `renderItem` function.
 */
export interface VirtualListProps<T extends VirtualListItem = VirtualListItem> {
  /** Items to render */
  items: readonly T[];
  /** Fixed row height in pixels; measured from the first item when omitted */
  itemHeight?: number;
  /**
   * Padding of each row in pixels
   * @default 8
   */
  itemPadding?: number;
  /**
   * Number of rows rendered above and below the visible area
   * @default 5
   */
  overscan?: number;
  /** Maximum height of the scroll container in pixels */
  maxHeight: number;
  /**
   * Renders the content of one row (the default scoped slot wins when both
   * are given)
   */
  renderItem?: (item: T, index: number) => VNodeChild;
  /**
   * `@load-more` listener: called when scrolling near the bottom; return a
   * promise that resolves once new items are loaded (no new call happens
   * until it settles). A function prop (not an emit) so its promise is seen
   */
  onLoadMore?: () => Promise<void> | void;
  /**
   * Distance from the bottom (px) at which `load-more` is triggered
   * @default 100
   */
  loadMoreThreshold?: number;
  /**
   * Batches scroll updates with requestAnimationFrame and requestIdleCallback
   * @default false
   */
  highPerformance?: boolean;
  /**
   * Shows a loading indicator at the bottom of the list
   * @default false
   */
  loading?: boolean;
  /** Accessible name of the list */
  "aria-label"?: string;
}

export interface VirtualItem {
  index: number;
  start: number;
  height: number;
  measureRef?: (el: HTMLElement | null) => void;
}
