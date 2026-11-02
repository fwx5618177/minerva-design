/**
 * Props of `CodeBlock` (same names and defaults as React; React's string
 * children are the `code` prop, or the text of the default slot).
 *
 * DOM placement: without `copyable` / `showLanguage` the root is the <pre>
 * region and it receives every attribute. With `copyable` or a shown
 * language label the <pre> is wrapped in a
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
  /**
   * Language of the code: highlights its syntax and sets
   * `class="language-<x>"` / `data-language` on the <code>. Supported:
   * javascript (js, mjs, cjs), typescript (ts), jsx, tsx, json (jsonc,
   * json5), css (scss, less), html (xml, svg, vue), bash (sh, shell, zsh,
   * console), python (py), yaml (yml), sql, diff, markdown (md); other
   * names render plain text. Without it the text is not highlighted
   */
  language?: string;
  /**
   * Highlights the syntax of `language` (false: plain text, the language is
   * still set on the <code> and shown by `showLanguage`)
   * @default true
   */
  highlight?: boolean;
  /**
   * Numbers the lines in a gutter (hidden from assistive technology, not
   * part of the copied or selected text)
   * @default false
   */
  showLineNumbers?: boolean;
  /**
   * Shows the `language` as a small label in the top-right corner (e.g.
   * "JSON"); the <pre> is then wrapped in a <div> like with `copyable`
   * @default false
   */
  showLanguage?: boolean;
}
