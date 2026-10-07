import type { HTMLAttributes, ReactNode } from "react";
import type { PaginationProps } from "../components/Pagination/types";

/**
 * Props of @novel-isr/ui's Pagination (used by the compat layer, and by any
 * compat component that embeds a novel-style `pagination` prop).
 */
export interface NovelPaginationProps extends HTMLAttributes<HTMLElement> {
  /** Total number of items */
  total: number;
  /** Items per page */
  pageSize: number;
  /** Current page (1-based) */
  page: number;
  /** Called with the new page */
  onPageChange: (page: number) => void;
  /** Pages shown on each side of the current page (default 1) */
  siblingCount?: number;
  /** Pages always shown at each end (default 1) */
  boundaryCount?: number;
  /** Hides the prev / next buttons */
  hideEdges?: boolean;
  /** "‹ X / N ›" only, no page list */
  simple?: boolean;
  /** No page list (prev / next + counter) */
  hideNumbers?: boolean;
  /** Page sizes of the selector (enabled together with onPageSizeChange) */
  pageSizeOptions?: readonly number[];
  /** Called with the new page size */
  onPageSizeChange?: (size: number) => void;
  /** Text after the size in each selector option (default "条 / 页") */
  pageSizeLabel?: string;
  /** Shows the total, optionally with a custom renderer */
  showTotal?: boolean | ((total: number, range: [number, number]) => ReactNode);
}

/**
 * Maps @novel-isr/ui Pagination props to Minerva's Pagination props:
 * page / onPageChange / onPageSizeChange -> current / onChange, the compact
 * page list (siblingCount / boundaryCount, default 1 / 1), simple -> the
 * counter (hideNumbers) plus the `ui-pagination-simple` hook. Passes
 * novel-isr-ui's original Chinese texts explicitly (whatever lib-core's language).
 */
export function toMinervaPaginationProps({
  total,
  pageSize,
  page,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  hideEdges = false,
  simple = false,
  hideNumbers = false,
  pageSizeOptions,
  onPageSizeChange,
  pageSizeLabel = "条 / 页",
  showTotal = false,
  className,
  ...rest
}: NovelPaginationProps): PaginationProps {
  const showSizeChanger = Boolean(pageSizeOptions?.length && onPageSizeChange);
  return {
    ...rest,
    total,
    pageSize,
    current: page,
    siblingCount,
    boundaryCount,
    hideEdges,
    hideNumbers: simple || hideNumbers,
    showTotal,
    showSizeChanger,
    // novel-isr-ui used its (Radix) Select popup
    sizeChangerVariant: "select",
    pageSizeOptions: pageSizeOptions ? [...pageSizeOptions] : undefined,
    // @novel-isr/ui's built-in (Chinese) texts; page buttons are named by
    // their number. "aria-label" in rest still overrides the nav label.
    labels: {
      nav: "分页",
      prev: "上一页",
      next: "下一页",
      page: (p) => String(p),
      total: (count) => `共 ${count} 条`,
      pageSize: "每页显示条数",
      pageSizeOption: (size) => `${size} ${pageSizeLabel}`,
    },
    className:
      [simple && "ui-pagination-simple", className].filter(Boolean).join(" ") ||
      undefined,
    onChange: (nextPage, nextSize) => {
      if (nextSize !== pageSize) onPageSizeChange?.(nextSize);
      else onPageChange(nextPage);
    },
  };
}
