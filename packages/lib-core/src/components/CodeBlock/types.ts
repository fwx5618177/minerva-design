import type { HTMLAttributes, Ref } from "react";

export interface CodeBlockProps extends Omit<
  HTMLAttributes<HTMLPreElement>,
  "children"
> {
  /** Source text, rendered verbatim (never parsed as HTML) */
  children: string;
  /**
   * Accessible name of the scrollable code region (the native `aria-label` /
   * `aria-labelledby` attributes also work)
   * @default "Code" (localized)
   */
  ariaLabel?: string;
  /**
   * Wraps long lines (pre-wrap) instead of scrolling horizontally
   * @default true
   */
  wrap?: boolean;
  /**
   * Maximum height before the block scrolls (numbers are pixels)
   * @default "24rem"
   */
  maxHeight?: string | number;
  /**
   * Tab order of the region; it is focusable by default so keyboard users can
   * scroll it
   * @default 0
   */
  tabIndex?: number;
  /** Ref to the <pre> element */
  ref?: Ref<HTMLPreElement>;
}
