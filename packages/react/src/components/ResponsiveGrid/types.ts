import type { ElementType, HTMLAttributes, Ref } from "react";

/**
 * Column counts (integers 1-12): one number for every width, or per container
 * breakpoint (base, sm >= 480px, md >= 768px, lg >= 1200px). Missing
 * breakpoints inherit the previous one, starting at 1.
 */
export type ResponsiveGridColumns =
  number | { base?: number; sm?: number; md?: number; lg?: number };

export interface ResponsiveGridProps extends HTMLAttributes<HTMLElement> {
  /** Ref to the outer (query container) element */
  ref?: Ref<HTMLElement>;
  /**
   * Element or component rendered as the outer container (div, section, nav...)
   * @default "div"
   */
  as?: ElementType;
  /**
   * Column counts, responding to the grid's own width (container queries):
   * a number, or `{ base, sm, md, lg }` (480 / 768 / 1200px). Integers 1-12;
   * other values throw a RangeError.
   * @default 1
   */
  columns?: ResponsiveGridColumns;
  /**
   * Gap between rows and columns: numbers and numeric strings select spacing
   * tokens, other strings are CSS values
   * @default 4
   */
  gap?: string | number;
  /** Gap between rows; defaults to `gap` */
  rowGap?: string | number;
  /** Gap between columns; defaults to `gap` */
  columnGap?: string | number;
}

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref to the item element (or to the slotted child with `asChild`) */
  ref?: Ref<HTMLDivElement>;
  /**
   * Spans the full row of the surrounding grid
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Merges the item props, classes and ref into its single child instead of
   * rendering a wrapper div
   * @default false
   */
  asChild?: boolean;
}
