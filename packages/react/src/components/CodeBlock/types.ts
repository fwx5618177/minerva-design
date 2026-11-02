import type { HTMLAttributes, MouseEvent, Ref } from "react";
import type { CodeMark } from "@minerva/core";

/**
 * DOM placement: without `copyable` / `showLanguage` the root is the <pre>
 * region and it receives `className`, `style`, `ref` and every native
 * attribute. With `copyable` or a shown language label the <pre> is wrapped
 * in a positioned <div> (the copy button and the label cannot live inside
 * <pre>); `className`, `style` (including the `maxHeight` cap) and native
 * attributes then go to that outermost <div>, while `ref`, `tabIndex`,
 * `aria-label`, `aria-labelledby` and `aria-describedby` stay on the <pre>
 * region.
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
  /**
   * Called with the copied text after the copy button wrote it to the
   * clipboard (not on failure). The counterpart of the `minerva-copy` event
   * of `<minerva-code-block>` (`detail.text`, with `detail.success`); named
   * `onCopied` so it does not replace the native `onCopy` clipboard event
   * handler, which still goes to the element
   */
  onCopied?: (text: string) => void;
  /**
   * Language of the code: highlights its syntax and sets
   * `class="language-<x>"` / `data-language` on the <code>. Supported:
   * javascript (js, mjs, cjs), typescript (ts), jsx, tsx, json (jsonc,
   * json5), css (scss, less), html (xml, svg, vue), bash (sh, shell, zsh,
   * console), python (py), yaml (yml), sql, diff, markdown (md); other
   * names render plain text. `"auto"` detects the language from the text
   * (`detectCodeLanguage` of minerva-design/core, "plain" when unsure): the
   * class, `data-language` and the label show the detected name. Without it
   * the text is not highlighted
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
  /**
   * Character ranges to mark (saved highlights, annotations, search hits),
   * rendered as <mark> elements over the syntax highlighting (the token
   * colors are kept; the copied text stays the raw code). `start` / `end`
   * are UTF-16 offsets into the code string (`children`), clamped to it;
   * empty ranges are ignored. Marks may cross tokens and lines (with
   * `showLineNumbers` a mark is cut at each line break). Where marks
   * overlap, the later one in the array wins (its color, class, title and
   * click); the earlier one is cut around it. Each element gets
   * `data-mark-id` (the mark's `id`) and the mark's `className` / `title`;
   * `color` is a theme color name (a translucent tint) or any CSS color
   * (default: translucent yellow, `--code-block-mark-bg`). To create one
   * from the user's selection, see `getCodeSelectionRange` of
   * `minerva-design/core`
   */
  marks?: readonly CodeMark[];
  /**
   * Called when a mark is clicked (not at the end of a text selection drag),
   * with the mark object of `marks` (the topmost one where marks overlap).
   * Marks are not focusable: offer a keyboard path to the same action (a
   * list of the highlights, for example)
   */
  onMarkClick?: (mark: CodeMark, event: MouseEvent<HTMLElement>) => void;
  /** Ref to the <pre> element (also when copyable) */
  ref?: Ref<HTMLPreElement>;
}
