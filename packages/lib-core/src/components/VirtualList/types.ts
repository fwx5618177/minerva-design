import type { Ref } from "react";

export interface VirtualListItem {
  /** Unique key of the item */
  id: string | number;
  /** Arbitrary data for renderItem */
  metadata?: Record<string, string | number | boolean>;
}

/**
 * VirtualList props
 */
export interface VirtualListProps {
  /** Items to render */
  items: VirtualListItem[];
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
  /** Renders the content of one row */
  renderItem: (item: VirtualListItem, index: number) => React.ReactNode;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Inline styles of the scroll container */
  style?: React.CSSProperties;
  /** Called when scrolling near the bottom; return a promise that resolves once new items are loaded (no new call happens until it settles) */
  onLoadMore?: () => Promise<void> | void;
  /**
   * Distance from the bottom (px) at which onLoadMore is triggered
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
  ariaLabel?: string;
  /** Ref to the root (scroll container) <div> element */
  ref?: Ref<HTMLDivElement>;
}

export interface VirtualItem {
  index: number;
  start: number;
  height: number;
  measureRef?: (el: HTMLElement | null) => void;
}
