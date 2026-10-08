import { css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import { applyEdits, createScanner, format } from "jsonc-parser";
import iconButtonStyles from "@lib-core-styles/components/IconButton/iconButton.module.scss?inline";
import textareaStyles from "@lib-core-styles/components/Textarea/textarea.module.scss?inline";
import styles from "@lib-core-styles/components/JsonField/jsonField.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  FormAssociatedElement,
  type ValidityResult,
} from "../../internal/form";
import {
  IconBraces,
  IconCircleAlert,
  IconCircleCheck,
} from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

type Validation =
  { status: "empty" | "valid" } | { status: "invalid"; error: string };

function validate(value: string): Validation {
  if (!value.trim()) return { status: "empty" };
  try {
    JSON.parse(value);
    return { status: "valid" };
  } catch (error) {
    return {
      status: "invalid",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Re-indents with jsonc-parser text edits, so numeric lexemes, escapes,
 * duplicate keys and key order are preserved (no JSON.parse round trip).
 */
function formatJson(value: string, indent: number): string {
  const spaces = Math.min(10, Math.max(0, Math.trunc(indent) || 0));
  if (spaces > 0) {
    return applyEdits(
      value,
      format(value, undefined, {
        tabSize: spaces,
        insertSpaces: true,
        eol: "\n",
      }),
    );
  }
  // Compact: concatenate the tokens, dropping whitespace between them.
  const scanner = createScanner(value, true);
  const tokens: string[] = [];
  while (scanner.getPosition() < value.length) {
    scanner.scan();
    const offset = scanner.getTokenOffset();
    tokens.push(value.slice(offset, offset + scanner.getTokenLength()));
  }
  return tokens.join("");
}

/**
 * Strict-JSON textarea with a format button and accessible syntax feedback
 * (`<JsonField>` of lib-core): the status line is withheld while the field
 * is focused and re-checked on blur. Formatting re-indents with
 * `jsonc-parser` text edits (no JSON.parse round trip).
 *
 * Form-associated: submits the text under `name`. Validity: `required` +
 * empty -> `valueMissing`; text that is not valid JSON -> `badInput` with the
 * localized "Invalid JSON: <parser error>" message (also while focused, so
 * the form cannot be submitted with broken JSON). Supports `form.reset()`
 * (restores the `value` attribute), `<fieldset disabled>` and state
 * restoration. Name it with `<label for>`, `aria-label` or `aria-labelledby`.
 *
 * @summary JSON textarea with formatting and syntax feedback.
 * @tag minerva-json-field
 * @csspart base - The wrapper
 * @csspart format-button - The format button
 * @csspart textarea - The native `<textarea>`
 * @csspart status - The validation status line
 * @fires input - The text changed (native, composed)
 * @fires change - The text was committed (blur) or formatted
 * @fires minerva-input - The text changed (typing or formatting); `detail: { value }`
 * @fires minerva-change - The text was committed (blur) or formatted; `detail: { value }`
 */
export class MinervaJsonField extends FormAssociatedElement {
  static override tagName = "minerva-json-field";
  static override shadowRootOptions = {
    ...FormAssociatedElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        width: 100%;
        min-width: 0;
      }
    `,
    sharedStyles(textareaStyles),
    sharedStyles(iconButtonStyles),
    sharedStyles(styles),
    css`
      /* the textarea's size classes are global here: keep the icon button's own size */
      .toolbar .iconButton {
        min-height: 0;
      }
      .status > svg {
        width: 16px;
        height: 16px;
      }
    `,
  ];

  /** JSON text (property; the `value` attribute sets `defaultValue`) */
  @property({ attribute: false })
  value = "";

  /** Initial text, restored by `form.reset()` (the `value` attribute) */
  @property({ attribute: "value" })
  defaultValue = "";

  /** Rows of the textarea */
  @property({ type: Number })
  rows = 8;

  /** Hides the format button (the syntax feedback stays) */
  @property({ type: Boolean, attribute: "hide-toolbar" })
  hideToolbar = false;

  /** Spaces per indentation level when formatting (0 to 10; 0 compacts) */
  @property({ type: Number })
  indent = 2;

  /** Error state (also set by a syntax error after blur) */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /** Read-only: focusable and submitted, not editable nor formattable */
  @property({ type: Boolean, reflect: true, attribute: "readonly" })
  readOnly = false;

  /** Placeholder text */
  @property()
  placeholder = "";

  /** Accessible label of the format button (default: localized "Format JSON") */
  @property({ attribute: "format-label" })
  formatLabel?: string;

  /** Status text for valid JSON (default: localized "Valid JSON") */
  @property({ attribute: "valid-label" })
  validLabel?: string;

  /** Status prefix for invalid JSON, before the parser error (default: localized "Invalid JSON") */
  @property({ attribute: "invalid-label" })
  invalidLabel?: string;

  @state()
  private focused = false;

  @query("textarea")
  private textarea!: HTMLTextAreaElement;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);
  private dirty = false;

  override focus(options?: FocusOptions): void {
    this.textarea?.focus(options);
  }

  override blur(): void {
    this.textarea?.blur();
  }

  /** Formats the text (no-op unless it is valid JSON); does not emit */
  formatValue(): void {
    if (validate(this.value).status === "valid") {
      this.value = formatJson(this.value, this.indent);
    }
  }

  protected getFormValue(): string {
    return this.value;
  }

  protected override getValidity(): ValidityResult {
    const anchor = this.textarea;
    const result = validate(this.value);
    if (result.status === "invalid") {
      return {
        flags: { badInput: true },
        message: `${this.invalidLabel ?? this.locale.t("jsonField.invalid")}: ${result.error}`,
        anchor,
      };
    }
    if (this.required && result.status === "empty") {
      return {
        flags: { valueMissing: true },
        message: this.locale.t("validation.valueMissing"),
        anchor,
      };
    }
    return { flags: {}, message: "" };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.value = this.defaultValue;
  }

  protected override restoreFormState(state: unknown): void {
    if (typeof state === "string") this.value = state;
  }

  protected override willUpdate(changed: Map<PropertyKey, unknown>): void {
    // first update: a value set before connecting wins over the default
    // unless the value attribute is present
    if (
      changed.has("defaultValue") &&
      !this.dirty &&
      (this.hasUpdated || this.hasAttribute("value"))
    ) {
      this.value = this.defaultValue;
    }
    if (DEV && changed.has("indent") && (this.indent < 0 || this.indent > 10)) {
      devWarn(
        MinervaJsonField.tagName,
        `indent (${this.indent}) is clamped to 0..10.`,
      );
    }
  }

  private get locked(): boolean {
    return this.isDisabled || this.readOnly;
  }

  private formatNow() {
    if (this.locked || validate(this.value).status !== "valid") return;
    const next = formatJson(this.value, this.indent);
    if (next === this.value) return;
    this.dirty = true;
    this.value = next;
    this.emit("minerva-input", { value: next });
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: next });
  }

  private handleInput() {
    if (this.locked) return;
    this.dirty = true;
    this.value = String(this.textarea.value);
    this.emit("minerva-input", { value: this.value });
  }

  private handleChange() {
    this.value = String(this.textarea.value);
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: this.value });
  }

  protected override render() {
    const { t } = this.locale;
    const disabled = this.isDisabled;
    const validation: Validation = this.focused
      ? { status: "empty" }
      : validate(this.value);
    const syntaxInvalid = validation.status === "invalid";
    // host aria-invalid is not forwarded: the ElementInternals polyfill
    // mirrors validity there, which would defeat the withheld feedback
    const invalid = syntaxInvalid || this.invalid;
    const formatDisabled = this.locked || !this.value.trim();
    const statusText =
      validation.status === "valid"
        ? (this.validLabel ?? t("jsonField.valid"))
        : validation.status === "invalid"
          ? `${this.invalidLabel ?? t("jsonField.invalid")}: ${validation.error}`
          : "";
    const description = [
      this.aria.description,
      syntaxInvalid ? statusText : undefined,
    ]
      .filter(Boolean)
      .join(" ");

    return html`<div class="root" part="base">
      ${
        this.hideToolbar
          ? nothing
          : html`<div class="toolbar">
              <button
                part="format-button"
                type="button"
                class=${classMap({
                  iconButton: true,
                  neutral: true,
                  "variant-ghost": true,
                  small: true,
                  square: true,
                  disabled: formatDisabled,
                })}
                ?disabled=${formatDisabled}
                tabindex=${formatDisabled ? "-1" : "0"}
                aria-label=${this.formatLabel ?? t("jsonField.format")}
                @click=${this.formatNow}
              >
                ${IconBraces}
              </button>
            </div>`
      }
      <textarea
        part="textarea"
        class=${classMap({
          textarea: true,
          outline: true,
          medium: true,
          invalid,
        })}
        style="resize: none"
        rows=${this.rows}
        spellcheck="false"
        .value=${live(this.value)}
        name=${this.name || nothing}
        placeholder=${this.placeholder || nothing}
        ?disabled=${disabled}
        ?readonly=${this.readOnly}
        ?required=${this.required}
        aria-label=${this.aria.label ?? nothing}
        aria-description=${description || nothing}
        aria-invalid=${invalid ? "true" : nothing}
        @input=${this.handleInput}
        @change=${this.handleChange}
        @focus=${() => (this.focused = true)}
        @blur=${() => (this.focused = false)}
      ></textarea>
      <div
        part="status"
        role="status"
        aria-live="polite"
        class=${classMap({ status: true, statusInvalid: syntaxInvalid })}
      >
        ${
          validation.status === "valid"
            ? html`${IconCircleCheck}<span>${statusText}</span>`
            : validation.status === "invalid"
              ? html`${IconCircleAlert}<span>${statusText}</span>`
              : nothing
        }
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-json-field": MinervaJsonField;
  }
}
