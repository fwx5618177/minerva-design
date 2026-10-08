import { css, html, nothing } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import styles from "@react-styles/components/Textarea/textarea.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  FormAssociatedElement,
  type ValidityResult,
  validityFlags,
} from "../../internal/form";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

export type TextareaVariant = "outline" | "filled" | "unstyled";
export type TextareaSize = "small" | "medium" | "large";

/**
 * Multi-line text field sharing the input's look (`<Textarea>` of React).
 * Manual resizing is disabled, as in React: set `rows` or size the
 * element instead.
 *
 * Form-associated: submits `value` under `name`, supports `required`,
 * `minlength` / `maxlength` validation (the browser's messages, from the
 * inner `<textarea>`), `form.reset()` and `<fieldset disabled>`. Name it with
 * `<label for>`, a wrapping `<label>`, `aria-label` or `aria-labelledby`.
 *
 * @summary Multi-line text field.
 * @tag minerva-textarea
 * @csspart root - The native `<textarea>`
 * @fires input - The value changed (each keystroke; native, composed)
 * @fires change - The value was committed (blur), re-dispatched from the inner textarea
 * @fires minerva-input - Same as `input`, with `detail: { value }`
 * @fires minerva-change - Same as `change`, with `detail: { value }`
 */
export class MinervaTextarea extends FormAssociatedElement {
  static override tagName = "minerva-textarea";
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
    sharedStyles(styles),
  ];

  /** Current value (property; the `value` attribute sets `defaultValue`) */
  @property({ attribute: false })
  value = "";

  /**
   * Initial value, restored by `form.reset()` (the `value` attribute). Like
   * `<textarea>`, changing it also changes `value` until the user edits it
   */
  @property({ attribute: "value" })
  defaultValue = "";

  /** Visual style */
  @property({ reflect: true })
  variant: TextareaVariant = "outline";

  /** Font size and minimum height */
  @property({ reflect: true })
  size: TextareaSize = "medium";

  /** Error state; sets aria-invalid */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /** Placeholder text */
  @property()
  placeholder = "";

  /** Read-only: focusable and submitted, not editable */
  @property({ type: Boolean, reflect: true, attribute: "readonly" })
  readOnly = false;

  /** Visible text lines */
  @property({ type: Number })
  rows?: number;

  /** Minimum length */
  @property({ type: Number, attribute: "minlength" })
  minLength?: number;

  /** Maximum length */
  @property({ type: Number, attribute: "maxlength" })
  maxLength?: number;

  /** Autocomplete hint */
  @property()
  autocomplete?: string;

  /** Text wrapping when submitted ("soft" / "hard" / "off") */
  @property()
  wrap?: "soft" | "hard" | "off";

  @query("textarea")
  private textarea!: HTMLTextAreaElement;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);

  /** The user (or a script setting `value`) changed the value */
  private dirty = false;

  override focus(options?: FocusOptions): void {
    this.textarea?.focus(options);
  }

  override blur(): void {
    this.textarea?.blur();
  }

  /** Selects the text */
  select(): void {
    this.textarea?.select();
  }

  protected getFormValue(): string {
    return this.value;
  }

  protected override getValidity(): ValidityResult {
    const textarea = this.textarea;
    if (!textarea) {
      return this.required && !this.value
        ? {
            flags: { valueMissing: true },
            message: this.locale.t("validation.valueMissing"),
          }
        : { flags: {}, message: "" };
    }
    return {
      flags: validityFlags(textarea.validity),
      message: textarea.validationMessage,
      anchor: textarea,
    };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.value = this.defaultValue;
  }

  protected override restoreFormState(state: unknown): void {
    if (typeof state === "string") this.value = state;
  }

  protected override willUpdate(changed: Map<PropertyKey, unknown>): void {
    if (changed.has("value") && changed.get("value") !== undefined) {
      this.dirty = this.value !== this.defaultValue || this.dirty;
    }
    // first update: a value set before connecting wins over the default
    // unless the value attribute is present
    if (
      changed.has("defaultValue") &&
      !this.dirty &&
      (this.hasUpdated || this.hasAttribute("value"))
    ) {
      this.value = this.defaultValue;
    }
    if (
      DEV &&
      (changed.has("minLength") || changed.has("maxLength")) &&
      this.minLength !== undefined &&
      this.maxLength !== undefined &&
      this.minLength > this.maxLength
    ) {
      devWarn(
        MinervaTextarea.tagName,
        `minlength (${this.minLength}) is greater than maxlength (${this.maxLength}): no value can be valid.`,
      );
    }
  }

  private handleInput() {
    this.value = String(this.textarea.value);
    this.emit("minerva-input", { value: this.value });
  }

  private handleChange() {
    this.value = String(this.textarea.value);
    // `change` is not composed: re-dispatch it from the host
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: this.value });
  }

  protected override hookStates() {
    return {
      disabled: this.isDisabled,
      invalid: this.invalid || this.aria.attr("aria-invalid") === "true",
      readonly: this.readOnly,
      required: this.required,
      size: this.size,
      variant: this.variant,
    };
  }

  protected override render() {
    const invalid = this.invalid || this.aria.attr("aria-invalid") === "true";
    return html`<textarea
      part="root"
      class=${classMap({
        textarea: true,
        [this.variant]: true,
        [this.size]: true,
        invalid,
      })}
      style="resize: none"
      .value=${live(this.value)}
      name=${this.name || nothing}
      placeholder=${this.placeholder || nothing}
      rows=${this.rows ?? nothing}
      ?disabled=${this.isDisabled}
      ?readonly=${this.readOnly}
      ?required=${this.required}
      minlength=${this.minLength ?? nothing}
      maxlength=${this.maxLength ?? nothing}
      autocomplete=${(this.autocomplete as never) ?? nothing}
      wrap=${this.wrap ?? nothing}
      aria-label=${this.aria.label ?? nothing}
      aria-description=${this.aria.description ?? nothing}
      aria-invalid=${invalid ? "true" : nothing}
      aria-required=${this.aria.attr("aria-required") ?? nothing}
      aria-readonly=${this.aria.attr("aria-readonly") ?? nothing}
      @input=${this.handleInput}
      @change=${this.handleChange}
    ></textarea>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-textarea": MinervaTextarea;
  }
}
