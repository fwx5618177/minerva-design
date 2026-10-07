import { css, html, nothing, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import styles from "@lib-core-styles/components/Input/input.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  FormAssociatedElement,
  type ValidityResult,
  validityFlags,
} from "../../internal/form";
import { IconEye, IconEyeOff, IconX } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";

export type InputVariant = "outline" | "filled" | "unstyled";
export type InputSize = "small" | "medium" | "large";
export type InputType =
  | "text"
  | "email"
  | "password"
  | "search"
  | "tel"
  | "url"
  | "number"
  | "date"
  | "datetime-local"
  | "month"
  | "time"
  | "week";

let nextId = 0;

/**
 * Single-line text field (`<Input>` of lib-core) with prefix / suffix slots,
 * clear button, character count and password visibility toggle.
 *
 * Form-associated: submits `value` under `name`, supports `required`,
 * `minlength` / `maxlength` / `pattern` / `min` / `max` validation (the
 * browser's messages, from the inner `<input>`), `form.reset()` and
 * `<fieldset disabled>`. Name it with `<label for>`, a wrapping `<label>`,
 * `aria-label` or `aria-labelledby`.
 *
 * @summary Text field with prefix / suffix, clear button and character count.
 * @tag minerva-input
 * @slot prefix - Content before the text (icon, "@")
 * @slot suffix - Content after the text (unit, icon, button)
 * @csspart base - The field wrapper
 * @csspart input - The native `<input>`
 * @csspart clear-button - The clear button
 * @csspart password-toggle - The password visibility toggle
 * @csspart count - The character counter
 * @fires input - The value changed (each keystroke; native, composed)
 * @fires change - The value was committed (blur / Enter), re-dispatched from the inner input
 * @fires minerva-input - Same as `input`, with `detail: { value }`
 * @fires minerva-change - Same as `change`, with `detail: { value }`
 * @fires minerva-clear - The clear button emptied the field
 */
export class MinervaInput extends FormAssociatedElement {
  static override tagName = "minerva-input";
  static override shadowRootOptions = {
    ...FormAssociatedElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        width: 100%;
        min-width: 0;
        vertical-align: middle;
      }
    `,
    unsafeCSS(styles),
  ];

  /** Current value (property; the `value` attribute sets `defaultValue`) */
  @property({ attribute: false })
  value = "";

  /**
   * Initial value, restored by `form.reset()` (the `value` attribute). Like
   * `<input>`, changing it also changes `value` until the user edits it
   */
  @property({ attribute: "value" })
  defaultValue = "";

  /** Input type */
  @property({ reflect: true })
  type: InputType = "text";

  /** Visual style */
  @property({ reflect: true })
  variant: InputVariant = "outline";

  /** Height and font size */
  @property({ reflect: true })
  size: InputSize = "medium";

  /** Error state; sets aria-invalid */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /** Placeholder text */
  @property()
  placeholder = "";

  /** Read-only: focusable and submitted, not editable */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /** Minimum length */
  @property({ type: Number })
  minlength?: number;

  /** Maximum length */
  @property({ type: Number })
  maxlength?: number;

  /** Regular expression the value must match */
  @property()
  pattern?: string;

  /** Minimum (number / date types) */
  @property()
  min?: string;

  /** Maximum (number / date types) */
  @property()
  max?: string;

  /** Step (number / date types) */
  @property()
  step?: string;

  /** Autocomplete hint */
  @property()
  autocomplete?: string;

  /** Virtual keyboard hint */
  @property()
  inputmode?: string;

  /** Shows a clear button while the field has a value */
  @property({ type: Boolean, reflect: true })
  clearable = false;

  /** Accessible label of the clear button (default: localized "Clear") */
  @property({ attribute: "clear-label" })
  clearLabel?: string;

  /** Shows the number of characters (and maxlength) after the text */
  @property({ type: Boolean, attribute: "show-char-count" })
  showCharCount = false;

  /** Label of the password toggle while hidden (default: localized) */
  @property({ attribute: "show-password-label" })
  showPasswordLabel?: string;

  /** Label of the password toggle while visible (default: localized) */
  @property({ attribute: "hide-password-label" })
  hidePasswordLabel?: string;

  @state()
  private passwordVisible = false;

  @query("input")
  private input!: HTMLInputElement;

  private readonly countId = `minerva-input-count-${nextId++}`;
  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);
  private readonly slots = new HasSlotController(this);

  /** The user (or a script setting `value`) changed the value */
  private dirty = false;

  override focus(options?: FocusOptions): void {
    this.input?.focus(options);
  }

  override blur(): void {
    this.input?.blur();
  }

  /** Selects the text */
  select(): void {
    this.input?.select();
  }

  protected getFormValue(): string {
    return this.value;
  }

  protected override getValidity(): ValidityResult {
    const input = this.input;
    if (!input) {
      return this.required && !this.value
        ? {
            flags: { valueMissing: true },
            message: this.locale.t("validation.valueMissing"),
          }
        : { flags: {}, message: "" };
    }
    return {
      flags: validityFlags(input.validity),
      message: input.validationMessage,
      anchor: input,
    };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.value = this.defaultValue;
    this.passwordVisible = false;
  }

  protected override restoreFormState(state: unknown): void {
    if (typeof state === "string") this.value = state;
  }

  protected override willUpdate(changed: Map<PropertyKey, unknown>): void {
    if (changed.has("value") && changed.get("value") !== undefined) {
      this.dirty = this.value !== this.defaultValue || this.dirty;
    }
    if (changed.has("defaultValue") && !this.dirty) {
      this.value = this.defaultValue;
    }
    if (
      DEV &&
      changed.has("maxlength") &&
      this.minlength !== undefined &&
      this.maxlength !== undefined &&
      this.minlength > this.maxlength
    ) {
      devWarn(
        MinervaInput.tagName,
        `minlength (${this.minlength}) is greater than maxlength (${this.maxlength}): no value can be valid.`,
      );
    }
  }

  private handleInput() {
    this.value = this.input.value;
    this.emit("minerva-input", { value: this.value });
  }

  private handleChange() {
    this.value = this.input.value;
    // `change` is not composed: re-dispatch it from the host
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: this.value });
  }

  private clear() {
    this.value = "";
    this.input.value = "";
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.emit("minerva-input", { value: "" });
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: "" });
    this.emit("minerva-clear");
    // the clear button disappears: keep focus in the field
    this.input.focus();
  }

  protected override render() {
    const { t } = this.locale;
    const disabled = this.isDisabled;
    const isPassword = this.type === "password";
    const showClear =
      this.clearable && this.value !== "" && !disabled && !this.readonly;
    const passwordLabel = this.passwordVisible
      ? (this.hidePasswordLabel ?? t("input.hidePassword"))
      : (this.showPasswordLabel ?? t("input.showPassword"));
    const describedBy = this.showCharCount ? this.countId : undefined;

    return html`<div
      part="base"
      class=${classMap({
        root: true,
        [this.variant]: true,
        [this.size]: true,
        invalid: this.invalid,
        disabled,
      })}
      data-component="input"
    >
      ${
        this.slots.test("prefix")
          ? html`<span class="addon start"><slot name="prefix"></slot></span>`
          : nothing
      }
      <input
        part="input"
        class="field"
        .value=${live(this.value)}
        type=${isPassword && this.passwordVisible ? "text" : this.type}
        name=${this.name || nothing}
        placeholder=${this.placeholder || nothing}
        ?disabled=${disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        minlength=${this.minlength ?? nothing}
        maxlength=${this.maxlength ?? nothing}
        pattern=${this.pattern ?? nothing}
        min=${this.min ?? nothing}
        max=${this.max ?? nothing}
        step=${this.step ?? nothing}
        autocomplete=${(this.autocomplete as never) ?? nothing}
        inputmode=${this.inputmode ?? nothing}
        aria-label=${this.aria.label ?? nothing}
        aria-description=${this.aria.description ?? nothing}
        aria-describedby=${describedBy ?? nothing}
        aria-invalid=${
          this.invalid || this.aria.attr("aria-invalid") === "true"
            ? "true"
            : nothing
        }
        @input=${this.handleInput}
        @change=${this.handleChange}
      />
      ${
        showClear
          ? html`<button
              part="clear-button"
              type="button"
              class="action"
              aria-label=${this.clearLabel ?? t("input.clear")}
              @click=${this.clear}
            >
              ${IconX}
            </button>`
          : nothing
      }
      ${
        isPassword
          ? html`<button
              part="password-toggle"
              type="button"
              class="action"
              aria-label=${passwordLabel}
              ?disabled=${disabled}
              @click=${() => (this.passwordVisible = !this.passwordVisible)}
            >
              ${this.passwordVisible ? IconEyeOff : IconEye}
            </button>`
          : nothing
      }
      ${
        this.showCharCount
          ? html`<span id=${this.countId} class="count" part="count"
              >${
                this.maxlength != null && this.maxlength >= 0
                  ? `${this.value.length} / ${this.maxlength}`
                  : this.value.length
              }</span
            >`
          : nothing
      }
      ${
        this.slots.test("suffix")
          ? html`<span class="addon end"><slot name="suffix"></slot></span>`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-input": MinervaInput;
  }
}
