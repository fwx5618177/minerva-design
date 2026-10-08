import { property, state } from "lit/decorators.js";
import { attachInternals } from "./internals";
import { MinervaElement } from "./minerva-element";

/** Value a form-associated element contributes to its form's `FormData`. */
export type FormValue = string | File | FormData | null;

/** Validity of the current value: flags + the message shown to the user. */
export interface ValidityResult {
  flags: ValidityStateFlags;
  message: string;
  /** Element the browser anchors the validation bubble to */
  anchor?: HTMLElement | null;
}

const VALID: ValidityResult = { flags: {}, message: "" };

const VALIDITY_KEYS = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooLong",
  "tooShort",
  "rangeUnderflow",
  "rangeOverflow",
  "stepMismatch",
  "badInput",
] as const;

/**
 * Plain flags copied from a native `ValidityState` (its properties are
 * prototype getters: `Object.values()` / spreading would see nothing).
 */
export function validityFlags(validity: ValidityState): ValidityStateFlags {
  const flags: ValidityStateFlags = {};
  for (const key of VALIDITY_KEYS) if (validity[key]) flags[key] = true;
  return flags;
}

export { attachInternals };

/**
 * Base class of the form controls (input, checkbox, select...): a
 * form-associated custom element built on `ElementInternals`.
 *
 * - participates in `<form>` submission (`name` + `getFormValue()`), in
 *   `FormData`, constraint validation (`required`, custom validity,
 *   `checkValidity()` / `reportValidity()`, `:invalid`), `form.reset()`
 *   (`formResetCallback`), `<fieldset disabled>` (`formDisabledCallback`)
 *   and bfcache / autofill restoration (`formStateRestoreCallback`)
 * - `<label for="id">` and wrapping labels name the element (`labels`);
 *   subclasses forward the label to their inner control.
 *
 * Subclasses implement `getFormValue()`, optionally `getValidity()` /
 * `restoreFormState()`, and reset their value in `resetFormValue()`.
 */
export abstract class FormAssociatedElement extends MinervaElement {
  static formAssociated = true;

  /** `ElementInternals` (null only in environments without support). */
  protected readonly internals: ElementInternals | null;

  /** Name submitted with the form data */
  @property({ reflect: true })
  name = "";

  /**
   * Disables the control (not focusable, not submitted, not validated)
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The control must have a value for the form to be submitted
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /** Disabled by an ancestor `<fieldset disabled>` */
  @state()
  protected formDisabled = false;

  /** Message set with `setCustomValidity()` */
  private customError = "";

  constructor() {
    super();
    this.internals = attachInternals(this);
  }

  /** Whether the control is disabled (itself or by a disabled fieldset). */
  get isDisabled(): boolean {
    return this.disabled || this.formDisabled;
  }

  /** The form owning the element */
  get form(): HTMLFormElement | null {
    return this.internals?.form ?? null;
  }

  /** `<label>` elements associated with the element */
  get labels(): NodeList | null {
    return this.internals?.labels ?? null;
  }

  /** Validity state (same as `<input>.validity`) */
  get validity(): ValidityState | undefined {
    return this.internals?.validity;
  }

  /** Message describing the current validation error (empty when valid) */
  get validationMessage(): string {
    return this.internals?.validationMessage ?? "";
  }

  /** Whether the element is a candidate for constraint validation */
  get willValidate(): boolean {
    return this.internals?.willValidate ?? false;
  }

  /** Checks validity; fires `invalid` when invalid. */
  checkValidity(): boolean {
    return this.internals?.checkValidity() ?? true;
  }

  /** Checks validity and shows the browser's validation message. */
  reportValidity(): boolean {
    return this.internals?.reportValidity() ?? true;
  }

  /** Sets (or clears, with `""`) a custom validation error. */
  setCustomValidity(message: string): void {
    this.customError = message;
    this.syncFormState();
  }

  /** Value contributed to the form data (`null`: nothing submitted). */
  protected abstract getFormValue(): FormValue;

  /** Validity of the current value (custom errors are added on top). */
  protected getValidity(): ValidityResult {
    return VALID;
  }

  /** Restores the value saved by the browser (bfcache, autofill). */
  protected restoreFormState(state: string | File | FormData | null): void {
    void state;
  }

  /** Resets the value to its default (`form.reset()`). */
  protected abstract resetFormValue(): void;

  /** Pushes the value and validity to the form (called after each update). */
  protected syncFormState(): void {
    const internals = this.internals;
    if (!internals) return;
    const disabled = this.isDisabled;
    internals.setFormValue(disabled ? null : this.getFormValue());
    if (disabled) {
      internals.setValidity({});
      return;
    }
    if (this.customError) {
      const anchor = this.getValidity().anchor ?? undefined;
      internals.setValidity({ customError: true }, this.customError, anchor);
      return;
    }
    const { flags, message, anchor } = this.getValidity();
    const invalid = Object.values(flags).some(Boolean);
    if (invalid) internals.setValidity(flags, message, anchor ?? undefined);
    else internals.setValidity({});
  }

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    this.syncFormState();
  }

  formResetCallback(): void {
    this.customError = "";
    this.resetFormValue();
  }

  formDisabledCallback(disabled: boolean): void {
    this.formDisabled = disabled;
  }

  formStateRestoreCallback(state: string | File | FormData | null): void {
    this.restoreFormState(state);
  }
}
