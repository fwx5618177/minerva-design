import type { HTMLAttributes, Ref } from "react";

/**
 * DOM placement: without `copyable` the root is the <pre> region and it
 * receives `className`, `style`, `ref` and every native attribute. With
 * `copyable` the <pre> is wrapped in a positioned <div> (the copy button
 * cannot live inside <pre>); `className`, `style` (including the `maxHeight`
 * cap) and native attributes then go to that outermost <div>, while `ref`,
 * `tabIndex`, `aria-label`, `aria-labelledby` and `aria-describedby` stay on
 * the <pre> region.
 */
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
  "aria-label"?: string;
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
  /**
   * Shows a copy button in the top-right corner that writes the text to the
   * clipboard; its label switches to "Copied" / "Copy failed" for about two
   * seconds and the result is announced through a polite live region. When
   * set, the <pre> is wrapped in a <div> (see the interface description)
   * @default false
   */
  copyable?: boolean;
  /** Ref to the <pre> element (also when copyable) */
  ref?: Ref<HTMLPreElement>;
}
