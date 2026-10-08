/**
 * Props of `CodeBlock` (same names and defaults as React; React's string
 * children are the `code` prop, or the text of the default slot).
 *
 * DOM placement: without `copyable` the root is the <pre> region and it
 * receives every attribute. With `copyable` the <pre> is wrapped in a
 * positioned <div> (the copy button cannot live inside <pre>); `class`,
 * `style` (including the `maxHeight` cap) and other attributes then go to
 * that outermost <div>, while `tabindex`, `aria-label`, `aria-labelledby` and
 * `aria-describedby` stay on the <pre> region.
 */
export interface CodeBlockProps {
  /**
   * Source text, rendered verbatim (never parsed as HTML). Without it, the
   * text of the default slot (templates condense whitespace in static text:
   * prefer this prop or `{{ source }}` for multi-line code)
   */
  code?: string;
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
   * Shows a copy button in the top-right corner that writes the text to the
   * clipboard; its label switches to "Copied" / "Copy failed" for about two
   * seconds and the result is announced through a polite live region. When
   * set, the <pre> is wrapped in a <div> (see the interface description)
   * @default false
   */
  copyable?: boolean;
}
