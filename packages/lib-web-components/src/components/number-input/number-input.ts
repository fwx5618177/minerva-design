import { css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import styles from "@lib-core-styles/components/NumberInput/numberInput.module.scss?inline";
import {
  clampNumber,
  formatNumberValue,
  inferStepPrecision,
  parseNumberDraft,
} from "@minerva/core";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  FormAssociatedElement,
  type ValidityResult,
} from "../../internal/form";
import { IconChevronDown, IconChevronUp } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

export type NumberInputSize = "small" | "medium" | "large";

/** `null` for a missing / empty / non-numeric attribute, else the number. */
const optionalNumber = {
  fromAttribute: (value: string | null) =>
    value === null || value.trim() === "" || Number.isNaN(Number(value))
      ? null
      : Number(value),
  toAttribute: (value: number | null) =>
    value === null ? null : String(value),
};

/**
 * Numeric text field (`<NumberInput>` of lib-core, `role="spinbutton"`) with
 * keyboard stepping, an optional stepper, min / max clamping and fixed
 * precision. The draft may hold intermediate text ("-", "1.") while typing;
 * it is committed on blur / Enter. Keyboard: ArrowUp / ArrowDown step,
 * PageUp / PageDown step by 10 steps, Home / End jump to min / max (only
 * when bounded). Mouse wheel never changes the value.
 *
 * Form-associated: submits the committed value (formatted with the
 * precision; `""` when empty) under `name`. Validity: `required` + empty ->
 * `valueMissing`; a non-numeric draft -> `badInput`; a draft (or value)
 * below `min` / above `max` -> `rangeUnderflow` / `rangeOverflow` (localized
 * messages). Supports `form.reset()` (restores the `value` attribute),
 * `<fieldset disabled>` and state restoration. Name it with `<label for>`,
 * `aria-label` or `aria-labelledby`.
 *
 * @summary Numeric field with keyboard stepping, stepper, min / max and precision.
 * @tag minerva-number-input
 * @csspart root - The field box (wraps the input and the stepper)
 * @csspart input - The native `<input>` (role="spinbutton")
 * @csspart stepper - The increment / decrement column
 * @csspart increment - The increment button
 * @csspart decrement - The decrement button
 * @fires input - The draft text changed (native, composed)
 * @fires change - A value was committed (blur / Enter / stepping)
 * @fires minerva-input - The draft text changed; `detail: { value }` (the parsed draft, `null` when not a number)
 * @fires minerva-change - A new value was committed; `detail: { value }` (`null` when cleared)
 */
export class MinervaNumberInput extends FormAssociatedElement {
  static override tagName = "minerva-number-input";
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
    sharedStyles(styles),
  ];

  /** Committed value; `null` is an empty field (property; the `value` attribute sets `defaultValue`) */
  @property({ attribute: false })
  value: number | null = null;

  /** Initial value, restored by `form.reset()` (the `value` attribute) */
  @property({ attribute: "value", converter: optionalNumber })
  defaultValue: number | null = null;

  /** Smallest allowed value; committed values are clamped to it */
  @property({ type: Number })
  min?: number;

  /** Largest allowed value; committed values are clamped to it */
  @property({ type: Number })
  max?: number;

  /** Amount added / removed by ArrowUp / ArrowDown and the stepper */
  @property({ type: Number })
  step = 1;

  /** Decimal places of the value; inferred from step when unset (0.01 -> 2) */
  @property({ type: Number })
  precision?: number;

  /** Field size */
  @property({ reflect: true })
  size: NumberInputSize = "medium";

  /** Error state (also set by an out-of-range or non-numeric draft) */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /** Focusable and submitted, but typing and stepping do not change the value */
  @property({ type: Boolean, reflect: true, attribute: "readonly" })
  readOnly = false;

  /** Shows increment / decrement buttons (the arrow keys always work) */
  @property({ type: Boolean, attribute: "show-stepper" })
  showStepper = false;

  /** Clearing the field falls back to min (or 0) instead of committing `null` */
  @property({ type: Boolean, attribute: "no-empty" })
  noEmpty = false;

  /** Placeholder text */
  @property()
  placeholder = "";

  /** Accessible label of the increment button (default: localized "Increase") */
  @property({ attribute: "increment-label" })
  incrementLabel?: string;

  /** Accessible label of the decrement button (default: localized "Decrease") */
  @property({ attribute: "decrement-label" })
  decrementLabel?: string;

  /** Hint shown while the draft is not a number (default: localized) */
  @property({ attribute: "not-a-number-message" })
  notANumberMessage?: string;

  /** Hint shown while the draft is below min (default: localized "Minimum {min}") */
  @property({ attribute: "below-min-message" })
  belowMinMessage?: string;

  /** Hint shown while the draft is above max (default: localized "Maximum {max}") */
  @property({ attribute: "above-max-message" })
  aboveMaxMessage?: string;

  /** Text currently in the field */
  @state()
  private draft = "";

  @query("input")
  private input!: HTMLInputElement;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);
  private dirty = false;

  private get resolvedPrecision(): number {
    return this.precision ?? inferStepPrecision(this.step);
  }

  private get locked(): boolean {
    return this.isDisabled || this.readOnly;
  }

  override focus(options?: FocusOptions): void {
    this.input?.focus(options);
  }

  override blur(): void {
    this.input?.blur();
  }

  /** Adds `step` (clamped); does not emit */
  stepUp(): void {
    this.value = this.stepped(this.step);
  }

  /** Removes `step` (clamped); does not emit */
  stepDown(): void {
    this.value = this.stepped(-this.step);
  }

  protected getFormValue(): string {
    return formatNumberValue(this.value, this.resolvedPrecision);
  }

  protected override getValidity(): ValidityResult {
    const { t } = this.locale;
    const anchor = this.input;
    const text = this.draft.trim();
    if (text && text !== "-" && text !== ".") {
      const parsed = parseNumberDraft(text);
      if (parsed === null) {
        return {
          flags: { badInput: true },
          message: this.notANumberMessage ?? t("numberInput.notANumber"),
          anchor,
        };
      }
      if (this.min !== undefined && parsed < this.min) {
        return {
          flags: { rangeUnderflow: true },
          message:
            this.belowMinMessage ??
            t("validation.rangeUnderflow", { min: this.min }),
          anchor,
        };
      }
      if (this.max !== undefined && parsed > this.max) {
        return {
          flags: { rangeOverflow: true },
          message:
            this.aboveMaxMessage ??
            t("validation.rangeOverflow", { max: this.max }),
          anchor,
        };
      }
      return { flags: {}, message: "" };
    }
    if (this.required && this.value === null) {
      return {
        flags: { valueMissing: true },
        message: t("validation.valueMissing"),
        anchor,
      };
    }
    return { flags: {}, message: "" };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.value = this.defaultValue;
    this.draft = formatNumberValue(this.value, this.resolvedPrecision);
  }

  protected override restoreFormState(state: unknown): void {
    if (typeof state === "string") this.value = parseNumberDraft(state);
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
    // Sync the draft when the value changes from outside, unless it already
    // shows that number (keeps "1." etc.)
    if (
      changed.has("value") ||
      changed.has("precision") ||
      changed.has("step")
    ) {
      const numeric = parseNumberDraft(this.draft);
      if (numeric === null || numeric !== this.value) {
        this.draft = formatNumberValue(this.value, this.resolvedPrecision);
      }
    }
    if (
      DEV &&
      (changed.has("min") || changed.has("max")) &&
      this.min !== undefined &&
      this.max !== undefined &&
      this.min > this.max
    ) {
      devWarn(
        MinervaNumberInput.tagName,
        `min (${this.min}) is greater than max (${this.max}): every value is clamped.`,
      );
    }
  }

  private stepped(delta: number): number {
    const base = parseNumberDraft(this.draft) ?? this.value ?? 0;
    return Number(
      clampNumber(base + delta, this.min, this.max).toFixed(
        this.resolvedPrecision,
      ),
    );
  }

  /** Commits `next` (rounded to the precision) and emits when it changed */
  private commitValue(next: number | null) {
    const precision = this.resolvedPrecision;
    const rounded = next === null ? null : Number(next.toFixed(precision));
    this.draft = formatNumberValue(rounded, precision);
    if (rounded === this.value) return;
    this.dirty = true;
    this.value = rounded;
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: rounded });
  }

  private commit(text: string) {
    if (this.locked) return;
    const trimmed = text.trim();
    if (trimmed === "" || trimmed === "-") {
      if (this.noEmpty) {
        this.commitValue(clampNumber(this.min ?? 0, this.min, this.max));
      } else this.commitValue(null);
      return;
    }
    const parsed = parseNumberDraft(trimmed);
    if (parsed === null) {
      // Invalid text falls back to the last valid value.
      this.draft = formatNumberValue(this.value, this.resolvedPrecision);
      return;
    }
    this.commitValue(clampNumber(parsed, this.min, this.max));
  }

  private adjust(delta: number) {
    if (this.locked) return;
    this.commitValue(this.stepped(delta));
  }

  private handleInput() {
    this.draft = String(this.input.value);
    this.emit("minerva-input", { value: parseNumberDraft(this.draft) });
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (this.locked || event.defaultPrevented) return;
    const { key } = event;
    if (key === "ArrowUp" || key === "ArrowDown") {
      event.preventDefault();
      this.adjust(key === "ArrowUp" ? this.step : -this.step);
    } else if (key === "PageUp" || key === "PageDown") {
      // WAI-ARIA spinbutton: Page Up / Down step by a larger amount (10 steps).
      event.preventDefault();
      this.adjust((key === "PageUp" ? 10 : -10) * this.step);
    } else if (key === "Home" && this.min !== undefined) {
      // Home / End jump to the bounds; without a bound they move the caret.
      event.preventDefault();
      this.commitValue(this.min);
    } else if (key === "End" && this.max !== undefined) {
      event.preventDefault();
      this.commitValue(this.max);
    } else if (key === "Enter") {
      this.input.blur();
    }
  }

  private handleBlur() {
    this.commit(String(this.input.value));
  }

  /** Draft-level hint: not a number, or out of range (lib-core's wording). */
  private draftError(): string | undefined {
    const { t } = this.locale;
    const text = this.draft.trim();
    if (!text || text === "-" || text === ".") return undefined;
    const parsed = parseNumberDraft(text);
    if (parsed === null) {
      return this.notANumberMessage ?? t("numberInput.notANumber");
    }
    if (this.min !== undefined && parsed < this.min) {
      return (
        this.belowMinMessage ?? t("numberInput.belowMin", { min: this.min })
      );
    }
    if (this.max !== undefined && parsed > this.max) {
      return (
        this.aboveMaxMessage ?? t("numberInput.aboveMax", { max: this.max })
      );
    }
    return undefined;
  }

  protected override hookStates() {
    return {
      disabled: this.isDisabled,
      invalid:
        this.invalid ||
        this.draftError() !== undefined ||
        this.aria.attr("aria-invalid") === "true",
      readonly: this.readOnly,
      required: this.required,
      size: this.size,
    };
  }

  protected override render() {
    const { t } = this.locale;
    const disabled = this.isDisabled;
    const locked = this.locked;
    const errorMessage = this.draftError();
    const internalInvalid = errorMessage !== undefined;
    const isInvalid =
      this.invalid ||
      internalInvalid ||
      this.aria.attr("aria-invalid") === "true";
    const current = this.value ?? 0;

    return html`<div
      part="root"
      class=${classMap({
        root: true,
        [this.size]: true,
        invalid: isInvalid,
        shake: internalInvalid,
        disabled,
      })}
      title=${errorMessage ?? nothing}
    >
      <input
        part="input"
        class="field"
        type="text"
        inputmode="decimal"
        role="spinbutton"
        .value=${live(this.draft)}
        placeholder=${this.placeholder || nothing}
        ?disabled=${disabled}
        ?readonly=${this.readOnly}
        ?required=${this.required}
        aria-valuemin=${this.min ?? nothing}
        aria-valuemax=${this.max ?? nothing}
        aria-valuenow=${this.value ?? nothing}
        aria-label=${this.aria.label ?? nothing}
        aria-description=${this.aria.description ?? nothing}
        aria-invalid=${isInvalid ? "true" : nothing}
        aria-required=${this.aria.attr("aria-required") ?? nothing}
        @input=${this.handleInput}
        @blur=${this.handleBlur}
        @keydown=${this.handleKeyDown}
      />
      ${
        this.showStepper
          ? html`<div class="stepper" part="stepper" aria-hidden="true">
              <button
                part="increment"
                type="button"
                class="step stepUp"
                tabindex="-1"
                ?disabled=${
                  locked || (this.max !== undefined && current >= this.max)
                }
                aria-label=${this.incrementLabel ?? t("numberInput.increment")}
                @click=${() => this.adjust(this.step)}
              >
                ${IconChevronUp}
              </button>
              <button
                part="decrement"
                type="button"
                class="step stepDown"
                tabindex="-1"
                ?disabled=${
                  locked || (this.min !== undefined && current <= this.min)
                }
                aria-label=${this.decrementLabel ?? t("numberInput.decrement")}
                @click=${() => this.adjust(-this.step)}
              >
                ${IconChevronDown}
              </button>
            </div>`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-number-input": MinervaNumberInput;
  }
}
