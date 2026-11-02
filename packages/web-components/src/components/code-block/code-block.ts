import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  CODE_MARK_COLORS,
  applyCodeMarks,
  codeLanguageLabel,
  codeMarkBackground,
  detectCodeLanguage,
  highlightCode,
  splitCodeMarkLines,
  type CodeLanguage,
  type CodeMark,
  type CodeMarkRun,
  type HighlightToken,
} from "@minerva/core";
import {
  clickedCodeMark,
  getCodeSelectionRange,
  type CodeSelectionRange,
} from "@minerva/dom";
import styles from "@react-styles/components/CodeBlock/codeBlock.module.scss?inline";
import iconButtonStyles from "@react-styles/components/IconButton/iconButton.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { IconCheck, IconCopy, IconX } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

/** How long the "Copied" / "Copy failed" feedback stays visible (ms). */
const COPY_FEEDBACK_MS = 2000;

/** `detail` of the `minerva-copy` event */
export interface CodeBlockCopyDetail {
  /** The text written (or attempted) to the clipboard */
  text: string;
  /** Whether the clipboard write succeeded */
  success: boolean;
}

/** Result of the last copy */
export type CodeBlockCopyStatus = "idle" | "copied" | "failed";

/** `detail` of the `minerva-mark-click` event */
export interface CodeBlockMarkClickDetail {
  /** The clicked mark (the item of `marks`; the topmost where they overlap) */
  mark: CodeMark;
  /** The original click */
  originalEvent: MouseEvent;
}

export type { CodeMark, CodeMarkColor } from "@minerva/core";
export type { CodeSelectionRange } from "@minerva/dom";

const toCss = (value: string | number | undefined) =>
  value === undefined || value === ""
    ? undefined
    : typeof value === "number" || /^\d+(\.\d+)?$/.test(value)
      ? `${value}px`
      : value;

const tokens = (list: readonly HighlightToken[]) =>
  list.map(({ type, text }) =>
    type ? html`<span class=${`token-${type}`}>${text}</span>` : text,
  );

const markScheme = (color: string | undefined) => {
  const value = color?.trim();
  return value && (CODE_MARK_COLORS as readonly string[]).includes(value)
    ? value
    : undefined;
};

const runs = (list: readonly CodeMarkRun[], clickable: boolean) =>
  list.map(({ mark, index, tokens: runTokens }) => {
    if (!mark) return tokens(runTokens);
    const background = codeMarkBackground(mark.color);
    return html`<mark
      part="code-mark"
      class=${["mark", clickable ? "markClickable" : "", mark.className ?? ""]
        .filter(Boolean)
        .join(" ")}
      data-mark-id=${mark.id ?? nothing}
      data-mark-index=${index}
      data-mark-color=${markScheme(mark.color) ?? nothing}
      title=${mark.title ?? nothing}
      style=${background ? `--code-mark-bg:${background}` : nothing}
      >${tokens(runTokens)}</mark
    >`;
  });

/**
 * Contents of the <code>: highlighted tokens, marks and / or numbered
 * lines (lit templates: the code is text, never parsed as HTML). The text
 * content stays the source text (line numbers are generated content).
 */
function codeContent(
  text: string,
  language: string | undefined,
  lineNumbers: boolean,
  marks: readonly CodeMark[] | undefined,
  clickable: boolean,
): string | unknown[] {
  const marked = !!marks?.length;
  if (!language && !lineNumbers && !marked) return text;
  const list = language
    ? highlightCode(text, language)
    : [{ type: null, text }];
  if (!lineNumbers && !marked) return tokens(list);
  const marksRuns = applyCodeMarks(list, marks);
  if (!lineNumbers) return runs(marksRuns, clickable);
  const lines = splitCodeMarkLines(marksRuns);
  const trailingBreak = text.endsWith("\n");
  return lines.map(
    (line, i) =>
      html`<span class="line"
          ><span
            class="lineNumber"
            part="line-number"
            aria-hidden="true"
            data-line=${i + 1}
          ></span
          >${runs(line, clickable)}</span
        >${i < lines.length - 1 || trailingBreak ? "\n" : nothing}`,
  );
}

/**
 * A read-only block of preformatted text: logs, payloads, configuration
 * (`<CodeBlock>` of React). It is a named, keyboard-focusable region so
 * its overflow can be scrolled without a mouse.
 *
 * The text is the `code` property, else the element's text content
 * (rendered verbatim, never parsed as HTML; escape `<` in markup or set
 * `code`). `language` highlights the syntax (colored spans, see
 * `--code-token-<type>-color`; `no-highlight` keeps plain text) and sets
 * `class="language-<x>"` / `data-language` on the `<code>`
 * (`language="auto"` detects it from the text);
 * `show-language` shows it as a small label, `show-line-numbers` numbers
 * the lines. With
 * `copyable`, a copy button writes the text to the clipboard; its label
 * switches to "Copied" / "Copy failed" for two seconds and the result is
 * announced through a polite live region. `marks` wraps character ranges
 * in `<mark>`s over the highlighting; `getSelectionRange()` maps the
 * user's selection to offsets to create them.
 *
 * @summary Read-only, scrollable code region with syntax highlighting and an optional copy button.
 * @tag minerva-code-block
 * @csspart root - The positioned outer wrapper of the region and its actions (only when copyable, or with a language label)
 * @csspart region - The `<pre>` scroll region (role=region): the visible box of the code
 * @csspart code - The `<code>` element
 * @csspart line-number - The number of a line, in the gutter (with show-line-numbers; aria-hidden, generated content)
 * @csspart code-mark - A `<mark>` wrapping a marked character range (with marks; also has `data-mark-id`, `data-mark-color` and the mark's className)
 * @csspart language - The language label (with show-language)
 * @csspart copy-button - The copy button (while copyable)
 * @fires minerva-copy - The copy button (or `copy()`) was used: `detail: { text, success }` (`text` is the copied text; React's `onCopied` is called with it on success).
 * @fires minerva-mark-click - A mark was clicked (not at the end of a text selection drag): `detail: { mark, originalEvent }` (`mark` is the item of `marks`, the topmost where they overlap; React's `onMarkClick`).
 */
export class MinervaCodeBlock extends MinervaElement {
  static override tagName = "minerva-code-block";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
        max-width: 100%;
      }
      .iconButton svg {
        width: 16px;
        height: 16px;
      }
    `,
    sharedStyles(iconButtonStyles),
    sharedStyles(styles),
  ];

  /** Source text (default: the element's text content) */
  @property()
  code?: string;

  /**
   * Language of the code: highlights its syntax (javascript / js, typescript
   * / ts, jsx, tsx, json, css / scss, html / xml / vue, bash / sh, python /
   * py, yaml, sql, diff, markdown / md; other names render plain text) and
   * sets `class="language-<x>"` / `data-language` on the `<code>`. `auto`
   * detects the language from the text (`detectCodeLanguage`, "plain" when
   * unsure): the `<code>` and the label then show the detected name
   */
  @property({ reflect: true })
  language?: string;

  /** Keeps the code plain (no syntax highlighting) despite `language` (the React library's `highlight={false}`) */
  @property({ type: Boolean, attribute: "no-highlight", reflect: true })
  noHighlight = false;

  /** Numbers the lines in a gutter (aria-hidden, not part of the copied text) */
  @property({ type: Boolean, attribute: "show-line-numbers", reflect: true })
  showLineNumbers = false;

  /** Shows the `language` as a small label in the top-right corner (e.g. "JSON") */
  @property({ type: Boolean, attribute: "show-language", reflect: true })
  showLanguage = false;

  /** Scrolls long lines horizontally instead of wrapping them (the React library's `wrap={false}`) */
  @property({ type: Boolean, attribute: "no-wrap", reflect: true })
  noWrap = false;

  /** Maximum height before the block scrolls (CSS value, numbers are pixels) */
  @property({ attribute: "max-height" })
  maxHeight = "24rem";

  /** Shows a copy button writing the text to the clipboard */
  @property({ type: Boolean, reflect: true })
  copyable = false;

  /**
   * Character ranges to mark (saved highlights, annotations, search hits),
   * rendered as `<mark part="code-mark">` over the syntax highlighting (the
   * copied text stays the raw code). `start` / `end` are UTF-16 offsets into
   * `text`, clamped to it; empty ranges are ignored. Marks may cross tokens
   * and lines (with show-line-numbers a mark is cut at each line break).
   * Where marks overlap, the later one in the array wins (its color, class,
   * title and click). `color`: a theme color name (a translucent tint) or
   * any CSS color (default: translucent yellow, `--code-block-mark-bg`).
   * Set the property, or a JSON array in the `marks` attribute
   */
  @property({ type: Array })
  marks?: readonly CodeMark[];

  /** Gives the marks a click affordance (pointer cursor, hover underline): set it when listening to `minerva-mark-click` */
  @property({ type: Boolean, attribute: "clickable-marks", reflect: true })
  clickableMarks = false;

  @state()
  private status: CodeBlockCopyStatus = "idle";

  private timer?: ReturnType<typeof setTimeout>;
  /** Last detection of `language="auto"` */
  private detected?: { text: string; language: CodeLanguage };
  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this);
  // re-renders when the text content changes
  private readonly slots = new HasSlotController(this);

  /** The text shown (and copied) */
  get text(): string {
    return this.code ?? this.textContent ?? "";
  }

  /**
   * Offsets in `text` of the user's selection inside the code (to save it
   * as a mark), `null` when nothing of the code is selected. Reads the
   * selection through the shadow root (`getComposedRanges`, or the
   * shadow root's own selection in Chromium); `selection` overrides it
   */
  getSelectionRange(
    selection?: Selection | AbstractRange | null,
  ): CodeSelectionRange | null {
    const code = this.shadowRoot?.querySelector("code");
    if (!code) return null;
    if (selection !== undefined) return getCodeSelectionRange(code, selection);
    const own = (
      this.shadowRoot as ShadowRoot & { getSelection?: () => Selection | null }
    ).getSelection?.();
    return getCodeSelectionRange(
      code,
      own ?? this.ownerDocument.defaultView?.getSelection() ?? null,
    );
  }

  private onCodeClick(event: MouseEvent) {
    const mark = clickedCodeMark(
      event.target,
      event.currentTarget as Element,
      this.marks,
    );
    if (mark)
      this.emit<CodeBlockMarkClickDetail>("minerva-mark-click", {
        mark,
        originalEvent: event,
      });
  }

  /** Copies the text to the clipboard; resolves with whether it worked */
  async copy(): Promise<boolean> {
    const text = this.text;
    const clipboard =
      typeof navigator === "undefined" ? undefined : navigator.clipboard;
    let success = false;
    if (typeof clipboard?.writeText === "function") {
      try {
        await clipboard.writeText(text);
        success = true;
      } catch {
        success = false;
      }
    }
    if (!this.isConnected) return success;
    this.showStatus(success ? "copied" : "failed");
    this.emit<CodeBlockCopyDetail>("minerva-copy", {
      text,
      success,
    });
    return success;
  }

  private showStatus(next: CodeBlockCopyStatus) {
    clearTimeout(this.timer);
    this.status = next;
    this.timer = setTimeout(() => (this.status = "idle"), COPY_FEEDBACK_MS);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.timer);
    this.status = "idle";
  }

  protected override updated(): void {
    if (DEV && this.copyable && !this.text.trim()) {
      devWarn(
        MinervaCodeBlock.tagName,
        "copyable is set but there is no text to copy (set code or the text content).",
      );
    }
  }

  /** The language of the `<code>`: `language`, `auto` resolved from `text` */
  private resolveLanguage(text: string): string | undefined {
    const language = this.language?.trim() || undefined;
    if (language?.toLowerCase() !== "auto") return language;
    if (this.detected?.text !== text) {
      this.detected = { text, language: detectCodeLanguage(text) };
    }
    return this.detected.language;
  }

  protected override render() {
    void this.slots;
    const t = this.locale.t;
    const name = this.aria.label ?? t("codeBlock.label");
    const maxHeight = toCss(this.maxHeight);
    const text = this.text;
    const lang = this.resolveLanguage(text);
    const label = this.showLanguage && lang ? codeLanguageLabel(lang) : "";
    const wrapped = this.copyable || !!label;
    const lines = this.showLineNumbers
      ? text.replace(/\n$/, "").split("\n").length
      : 0;
    const region = html`<pre
      part="region"
      role="region"
      tabindex="0"
      aria-label=${name}
      aria-description=${this.aria.description ?? nothing}
      data-wrap=${String(!this.noWrap)}
      class=${classMap({
        codeBlock: true,
        copyable: this.copyable,
        labeled: !!label,
      })}
      style=${styleMap(wrapped ? {} : { maxHeight })}
    ><code
        part="code"
        class=${lang ? `language-${lang}` : nothing}
        data-language=${lang ?? nothing}
        style=${lines ? `--code-line-digits:${Math.max(String(lines).length, 2)}` : nothing}
        @click=${this.onCodeClick}
      >${codeContent(
      text,
      this.noHighlight ? undefined : lang,
      this.showLineNumbers,
      Array.isArray(this.marks) ? this.marks : undefined,
      this.clickableMarks,
    )}</code></pre>`;

    if (!wrapped) return region;

    const status = this.status;
    const statusText =
      status === "copied"
        ? t("codeBlock.copied")
        : status === "failed"
          ? t("codeBlock.copyFailed")
          : "";
    const buttonLabel = statusText || t("codeBlock.copy");
    const color =
      status === "failed"
        ? "danger"
        : status === "copied"
          ? "success"
          : "neutral";

    return html`<div part="root" class="root" style=${styleMap({ maxHeight })}>
      ${region}
      <div class="actions">
        ${
          label
            ? html`<span part="language" class="language" aria-hidden="true"
                >${label}</span
              >`
            : nothing
        }
        ${
          this.copyable
            ? html`<button
                type="button"
                part="copy-button"
                class="iconButton ${color} variant-ghost small square"
                aria-label=${buttonLabel}
                title=${buttonLabel}
                @click=${() => void this.copy()}
              >
                ${
                  status === "copied"
                    ? IconCheck
                    : status === "failed"
                      ? IconX
                      : IconCopy
                }
              </button>`
            : nothing
        }
      </div>
      ${
        this.copyable
          ? html`<span class="visuallyHidden" aria-live="polite"
              >${statusText}</span
            >`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-code-block": MinervaCodeBlock;
  }
}
