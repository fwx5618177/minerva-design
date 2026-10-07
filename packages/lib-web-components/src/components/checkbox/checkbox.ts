import { css, html, nothing } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import type { ColorScheme } from "@minerva/core";
import styles from "@lib-core-styles/components/Checkbox/checkbox.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  FormAssociatedElement,
  type ValidityResult,
} from "../../internal/form";
import { IconCircleInfoFilled } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

export type CheckboxShape = "square" | "circle" | "rounded";
export type CheckboxSize = "small" | "medium" | "large";
export type CheckboxLabelPlacement = "start" | "end" | "top" | "bottom";
export type CheckboxColor = Extract<
  ColorScheme,
  "primary" | "success" | "info" | "warning" | "danger"
>;

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * A checkbox with label, helper text and indeterminate state (`<Checkbox>`
 * of lib-core), rendering a native `<input type="checkbox">` in its shadow
 * root (Space toggles it; Enter does nothing, as natively).
 *
 * Form-associated: when checked, submits `value` (default `"on"`) under
 * `name`; `required` makes it invalid until checked (`valueMissing`, with
 * the localized "check this box" message); supports `form.reset()` (restores
 * the `checked` attribute), `<fieldset disabled>` and state restoration.
 * `indeterminate` stays applied until it is changed (as in lib-core), also
 * after the user toggles the box.
 *
 * @summary Checkbox with label, helper text and indeterminate state.
 * @tag minerva-checkbox
 * @slot - Label content (alternative to the `label` attribute)
 * @slot icon - Custom icon shown inside the box when checked
 * @csspart base - The wrapper
 * @csspart control - The `<label>` wrapping the box and the label
 * @csspart input - The native `<input type="checkbox">`
 * @csspart checkmark - The visual box
 * @csspart label - The label text
 * @csspart helper-text - The helper / error text
 * @fires change - The checked state changed (re-dispatched from the inner input)
 * @fires minerva-change - The user toggled the box; `detail: { checked, value }`
 */
export class MinervaCheckbox extends FormAssociatedElement {
  static override tagName = "minerva-checkbox";
  static override shadowRootOptions = {
    ...FormAssociatedElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      .checkmark ::slotted(*) {
        position: relative;
        z-index: 1;
        display: inline-flex;
        color: var(--checkbox-checkmark-color, var(--text-inverse-color));
      }
    `,
    sharedStyles(styles),
  ];

  /** Checked state (property; the `checked` attribute sets `defaultChecked`) */
  @property({ attribute: false })
  checked = false;

  /**
   * Initial checked state, restored by `form.reset()` (the `checked`
   * attribute). Changing it also changes `checked` until the user toggles
   */
  @property({ type: Boolean, attribute: "checked", reflect: true })
  defaultChecked = false;

  /** Shows the indeterminate (partially checked) state (aria-checked="mixed") */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /** Value submitted with the form when checked */
  @property()
  value = "on";

  /** Label text (alternative to the default slot) */
  @property()
  label = "";

  /** Box shape */
  @property({ reflect: true })
  shape: CheckboxShape = "square";

  /** Checkbox size */
  @property({ reflect: true })
  size: CheckboxSize = "medium";

  /** Semantic color of the checked / indeterminate box */
  @property({ reflect: true })
  color: CheckboxColor = "primary";

  /** Position of the label relative to the box */
  @property({ attribute: "label-placement", reflect: true })
  labelPlacement: CheckboxLabelPlacement = "end";

  /** Shows the error state (sets aria-invalid) */
  @property({ type: Boolean, reflect: true })
  error = false;

  /** Helper or error text shown below the checkbox (describes it) */
  @property({ attribute: "helper-text" })
  helperText = "";

  /** Read-only: focusable and submitted, but the user cannot toggle it */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  @query("input")
  private input!: HTMLInputElement;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);
  private readonly slots = new HasSlotController(this);
  private dirty = false;

  override focus(options?: FocusOptions): void {
    this.input?.focus(options);
  }

  override blur(): void {
    this.input?.blur();
  }

  override click(): void {
    this.input?.click();
  }

  protected getFormValue(): string | null {
    return this.checked ? this.value : null;
  }

  protected override getValidity(): ValidityResult {
    if (this.required && !this.checked) {
      return {
        flags: { valueMissing: true },
        message: this.locale.t("validation.checkMissing"),
        anchor: this.input,
      };
    }
    return { flags: {}, message: "" };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.checked = this.defaultChecked;
  }

  protected override restoreFormState(state: unknown): void {
    this.checked = state !== null && state !== undefined && state !== "";
  }

  protected override willUpdate(changed: Map<PropertyKey, unknown>): void {
    // first update: a state set before connecting wins over the default
    // unless the checked attribute is present
    if (
      changed.has("defaultChecked") &&
      !this.dirty &&
      (this.hasUpdated || this.hasAttribute("checked"))
    ) {
      this.checked = this.defaultChecked;
    }
  }

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    // `indeterminate` only exists as a DOM property; a click clears it
    if (this.input) this.input.indeterminate = this.indeterminate;
    if (DEV && !this.aria.label && !this.label && !this.textContent?.trim()) {
      devWarn(
        MinervaCheckbox.tagName,
        "no label: set the label attribute, slot a label, or use aria-label / <label for>.",
      );
    }
  }

  private handleClick(event: MouseEvent) {
    if (this.readonly) event.preventDefault();
  }

  private handleChange() {
    if (this.readonly) return;
    this.dirty = true;
    this.input.indeterminate = this.indeterminate;
    this.checked = this.input.checked;
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { checked: this.checked, value: this.value });
  }

  protected override render() {
    const disabled = this.isDisabled;
    const hasLabel = !!this.label || this.slots.test("[default]");
    const description = [this.helperText, this.aria.description]
      .filter(Boolean)
      .join(" ");
    const invalid = this.error || this.aria.attr("aria-invalid") === "true";
    return html`<div
      part="base"
      class=${classMap({ checkboxWrapper: true, error: invalid })}
    >
      <label
        part="control"
        class=${classMap({
          checkbox: true,
          [this.size]: true,
          [this.shape]: true,
          [`label${capitalize(this.labelPlacement)}`]: true,
          [`color${capitalize(this.color)}`]: this.color !== "primary",
          disabled,
          error: invalid,
        })}
      >
        <input
          part="input"
          type="checkbox"
          class="input"
          .checked=${live(this.checked)}
          ?disabled=${disabled}
          ?required=${this.required}
          aria-checked=${this.indeterminate ? "mixed" : nothing}
          aria-label=${this.aria.label ?? nothing}
          aria-description=${description || nothing}
          aria-invalid=${invalid ? "true" : nothing}
          aria-readonly=${this.readonly ? "true" : nothing}
          @click=${this.handleClick}
          @change=${this.handleChange}
        />
        <span class="checkmark" part="checkmark"
          >${
            this.checked && !this.indeterminate
              ? html`<slot name="icon"></slot>`
              : nothing
          }</span
        >
        ${
          hasLabel
            ? html`<span class="label" part="label"
                >${this.label || html`<slot></slot>`}</span
              >`
            : nothing
        }
      </label>
      ${
        this.helperText
          ? html`<div class="helperTextWrapper">
              ${
                invalid
                  ? html`<span class="errorIcon" aria-hidden="true"
                      >${IconCircleInfoFilled}</span
                    >`
                  : nothing
              }
              <span
                part="helper-text"
                class=${classMap({ helperText: true, errorText: invalid })}
                >${this.helperText}</span
              >
            </div>`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-checkbox": MinervaCheckbox;
  }
}
