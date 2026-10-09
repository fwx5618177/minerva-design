import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
  linkedSignal,
  model,
  numberAttribute,
  viewChild,
} from "@angular/core";
import {
  clampNumber,
  cn,
  formatNumberValue,
  inferStepPrecision,
  parseNumberDraft,
} from "@minerva/core";
import {
  MnFormValueControl,
  fieldWiring,
  injectFormField,
  provideValueAccessor,
} from "../../internal/forms";
import { MnHook } from "../../internal/hooks";
import { MnIcon } from "../../internal/icon";
import { classOf } from "../../internal/classes";
import { injectScope } from "../../config/scope";
import { numberInputStyles as s } from "../../internal/styles";

export type NumberInputSize = "small" | "medium" | "large";

const optionalNumber = (value: unknown): number | undefined =>
  value === undefined || value === null || value === ""
    ? undefined
    : numberAttribute(value);

const nullableNumber = (value: unknown): number | null => {
  if (value === undefined || value === null || value === "") return null;
  const n = numberAttribute(value, NaN);
  return Number.isNaN(n) ? null : n;
};

/**
 * NumberInput: numeric text field (role="spinbutton") with keyboard stepping
 * (arrows, Page Up / Down, Home / End to min / max when bounded), an optional
 * stepper, min / max clamping and fixed precision. The draft may hold
 * intermediate text ("-", "1.") while typing; it is committed on blur /
 * Enter. Mouse wheel never changes the value. Same DOM, classes and styling
 * hooks as React's NumberInput: the host is the field box, the native
 * `<input>` is inside it (it receives `placeholder`, `name`, `id`,
 * `aria-label`...). The native `input` / `change` events bubble to the host.
 *
 * Two-way binding: `[(value)]`, `ngModel` or a Reactive Forms control
 * (ControlValueAccessor); both receive committed values only (blur / Enter,
 * stepping), `null` when the field is cleared. Inside `<mn-form-control>` it
 * takes the field's id, description, invalid / required / read-only /
 * disabled states.
 *
 * @example
 * <mn-number-input aria-label="Qty" [(value)]="qty" [min]="0" [max]="10" showStepper />
 * <mn-number-input formControlName="price" [step]="0.01" />
 */
@Component({
  selector: "mn-number-input",
  exportAs: "mnNumberInput",
  imports: [MnHook, MnIcon],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(() => MnNumberInput)],
  host: {
    "[class]": "rootClasses()",
    "data-component": "number-input",
    "data-minerva": "number-input",
    "data-part": "root",
    "[attr.data-disabled]": "isDisabled() ? '' : null",
    "[attr.data-invalid]": "isInvalid() ? '' : null",
    "[attr.data-readonly]": "field.readOnly() ? '' : null",
    "[attr.data-required]": "field.required() ? '' : null",
    "[attr.data-size]": "size()",
    "[attr.title]": "errorMessage() ?? null",
    "[attr.id]": "null",
    "[attr.aria-label]": "null",
    "[attr.aria-labelledby]": "null",
    "[attr.aria-describedby]": "null",
    "[attr.placeholder]": "null",
    "[attr.name]": "null",
    "[attr.required]": "null",
    "[attr.disabled]": "null",
    "[attr.readonly]": "null",
    "[attr.min]": "null",
    "[attr.max]": "null",
    "[attr.step]": "null",
  },
  template: `
    <input
      #input
      inputmode="decimal"
      type="text"
      role="spinbutton"
      [class]="s.field"
      [attr.id]="field.id()"
      [value]="draft()"
      [attr.name]="name() ?? null"
      [attr.placeholder]="placeholder() ?? null"
      [attr.aria-label]="ariaLabel() ?? null"
      [attr.aria-labelledby]="ariaLabelledby() ?? null"
      [attr.aria-describedby]="field.describedBy()"
      [attr.aria-valuemin]="min() ?? null"
      [attr.aria-valuemax]="max() ?? null"
      [attr.aria-valuenow]="current() ?? null"
      [attr.aria-invalid]="isInvalid() ? 'true' : null"
      [attr.aria-required]="fieldContext?.required() ? 'true' : null"
      [attr.aria-readonly]="fieldContext?.readOnly() ? 'true' : null"
      [required]="required()"
      [readOnly]="field.readOnly()"
      [disabled]="isDisabled()"
      (input)="draft.set(input.value)"
      (blur)="onBlur(input)"
      (keydown)="onKeyDown($event, input)"
      mnHook="number-input"
      mnPart="input"
    />
    @if (showStepper()) {
      <div
        [class]="s.stepper"
        aria-hidden="true"
        mnHook="number-input"
        mnPart="stepper"
      >
        <button
          type="button"
          [class]="stepUpClass"
          tabindex="-1"
          [disabled]="!canIncrement()"
          [attr.aria-label]="
            incrementLabel() ?? scope.t('numberInput.increment')
          "
          (click)="adjust(step())"
          mnHook="number-input"
          mnPart="increment"
        >
          <svg mnIcon="ChevronUp" size="12"></svg>
        </button>
        <button
          type="button"
          [class]="stepDownClass"
          tabindex="-1"
          [disabled]="!canDecrement()"
          [attr.aria-label]="
            decrementLabel() ?? scope.t('numberInput.decrement')
          "
          (click)="adjust(-step())"
          mnHook="number-input"
          mnPart="decrement"
        >
          <svg mnIcon="ChevronDown" size="12"></svg>
        </button>
      </div>
    }
  `,
})
export class MnNumberInput extends MnFormValueControl<number | null> {
  /**
   * Current value (two-way: `[(value)]`); `null` is an empty field. Updated
   * and emitted (`valueChange`, React `onChange`) with committed values only:
   * on blur / Enter, stepping and stepper clicks, never while typing
   */
  readonly value = model<number | null | undefined>(undefined);
  /**
   * Initial value when `value` is not bound
   * @default null
   */
  readonly defaultValue = input<number | null, unknown>(null, {
    transform: nullableNumber,
  });
  /** Smallest allowed value; committed values are clamped to it */
  readonly min = input<number | undefined, unknown>(undefined, {
    transform: optionalNumber,
  });
  /** Largest allowed value; committed values are clamped to it */
  readonly max = input<number | undefined, unknown>(undefined, {
    transform: optionalNumber,
  });
  /**
   * Amount added / removed by ArrowUp / ArrowDown and the stepper
   * @default 1
   */
  readonly step = input<number, unknown>(1, {
    transform: (v: unknown) => optionalNumber(v) ?? 1,
  });
  /** Decimal places of the value; inferred from step when omitted (step 0.01 -> 2) */
  readonly precision = input<number | undefined, unknown>(undefined, {
    transform: optionalNumber,
  });
  /** Field size @default "medium" */
  readonly size = input<NumberInputSize>("medium");
  /**
   * Error state (also set by an invalid FormControl or an out-of-range draft)
   * @default false
   */
  readonly invalid = input(false, { transform: booleanAttribute });
  /** Disables the field (also set by the form / FormControl) @default false */
  readonly disabled = input(false, { transform: booleanAttribute });
  /**
   * Focusable and copyable, but typing and stepping do not change the value
   * (also set by FormControl)
   * @default false
   */
  readonly readOnly = input(false, { transform: booleanAttribute });
  /** Shows increment / decrement buttons; the arrow keys always work @default false */
  readonly showStepper = input(false, { transform: booleanAttribute });
  /**
   * Clearing the field commits `null`; otherwise it falls back to min (or 0)
   * @default true
   */
  readonly allowEmpty = input(true, { transform: booleanAttribute });
  /** Accessible label of the increment button @default "Increase" (localized) */
  readonly incrementLabel = input<string | undefined>(undefined);
  /** Accessible label of the decrement button @default "Decrease" (localized) */
  readonly decrementLabel = input<string | undefined>(undefined);
  /**
   * Hint shown (as the wrapper title) while the draft is not a number
   * @default "Enter a number" (localized)
   */
  readonly notANumberMessage = input<string | undefined>(undefined);
  /** Hint shown while the draft is below min @default "Minimum {min}" (localized) */
  readonly belowMinMessage = input<string | undefined>(undefined);
  /** Hint shown while the draft is above max @default "Maximum {max}" (localized) */
  readonly aboveMaxMessage = input<string | undefined>(undefined);
  /** Placeholder text */
  readonly placeholder = input<string | undefined>(undefined);
  /** Name submitted with the form data */
  readonly name = input<string | undefined>(undefined);
  /** The control must have a value for the form to be submitted @default false */
  readonly required = input(false, { transform: booleanAttribute });
  /** id of the native input (default: the field's) */
  readonly id = input<string | undefined>(undefined);
  /** Accessible label (no visible label) */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  /** id(s) of the element(s) labelling the input */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });
  /** Extra ids of elements describing the input */
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: "aria-describedby",
  });

  protected readonly s = s;
  protected readonly stepUpClass = cn(s.step, s.stepUp);
  protected readonly stepDownClass = cn(s.step, s.stepDown);
  protected readonly scope = injectScope();
  protected readonly fieldContext = injectFormField();
  protected readonly field = fieldWiring(this.fieldContext, {
    id: () => this.id(),
    describedBy: () => this.ariaDescribedby(),
    invalid: () => this.invalid() || this.controlInvalid(),
    required: () => this.required(),
    readOnly: () => this.readOnly(),
    disabled: () => this.disabled() || this.formDisabled(),
  });
  protected readonly isDisabled = this.field.disabled;
  private readonly isLocked = computed(
    () => this.isDisabled() || this.field.readOnly(),
  );
  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>("input");

  /** The value (the bound value, else the default) */
  protected readonly current = computed<number | null>(() => {
    const value = this.value();
    return value !== undefined ? value : (this.defaultValue() ?? null);
  });
  private readonly decimals = computed(
    () => this.precision() ?? inferStepPrecision(this.step()),
  );

  /**
   * Text of the field. Re-synced when the value changes from outside, unless
   * the draft already shows that number (keeps "1." etc.)
   */
  protected readonly draft = linkedSignal<
    { current: number | null; precision: number },
    string
  >({
    source: () => ({ current: this.current(), precision: this.decimals() }),
    computation: (source, previous) => {
      if (previous) {
        const numeric = parseNumberDraft(previous.value);
        if (
          numeric !== null &&
          numeric === source.current &&
          previous.source.precision === source.precision
        ) {
          return previous.value;
        }
      }
      return formatNumberValue(source.current, source.precision);
    },
  });

  /** Draft-level validation: not a number, or out of range */
  protected readonly errorMessage = computed<string | undefined>(() => {
    const text = this.draft().trim();
    if (!text || text === "-" || text === ".") return undefined;
    const parsed = parseNumberDraft(text);
    const min = this.min();
    const max = this.max();
    if (parsed === null) {
      return this.notANumberMessage() ?? this.scope.t("numberInput.notANumber");
    }
    if (min !== undefined && parsed < min) {
      return (
        this.belowMinMessage() ?? this.scope.t("numberInput.belowMin", { min })
      );
    }
    if (max !== undefined && parsed > max) {
      return (
        this.aboveMaxMessage() ?? this.scope.t("numberInput.aboveMax", { max })
      );
    }
    return undefined;
  });
  private readonly internalInvalid = computed(
    () => this.errorMessage() !== undefined,
  );
  protected readonly isInvalid = computed(
    () => this.field.invalid() || this.internalInvalid(),
  );
  protected readonly canIncrement = computed(() => {
    const max = this.max();
    return !(
      this.isLocked() ||
      (max !== undefined && (this.current() ?? 0) >= max)
    );
  });
  protected readonly canDecrement = computed(() => {
    const min = this.min();
    return !(
      this.isLocked() ||
      (min !== undefined && (this.current() ?? 0) <= min)
    );
  });
  protected readonly rootClasses = computed(() =>
    cn(
      s.root,
      classOf(s, this.size()),
      this.isInvalid() && s.invalid,
      this.internalInvalid() && s.shake,
      this.isDisabled() && s.disabled,
    ),
  );

  override writeValue(value: unknown): void {
    this.value.set(nullableNumber(value));
  }

  protected onBlur(input: HTMLInputElement): void {
    this.commit(input.value);
    this.notifyTouched();
  }

  protected onKeyDown(event: KeyboardEvent, input: HTMLInputElement): void {
    if (this.isLocked() || event.defaultPrevented) return;
    const step = this.step();
    const min = this.min();
    const max = this.max();
    if (event.key === "ArrowUp") {
      event.preventDefault();
      this.adjust(step);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      this.adjust(-step);
    } else if (event.key === "PageUp" || event.key === "PageDown") {
      // WAI-ARIA spinbutton: Page Up / Down step by a larger amount (10 steps)
      event.preventDefault();
      this.adjust((event.key === "PageUp" ? 10 : -10) * step);
    } else if (event.key === "Home" && min !== undefined) {
      // Home / End jump to the bounds; without a bound they move the caret
      event.preventDefault();
      this.emit(min);
    } else if (event.key === "End" && max !== undefined) {
      event.preventDefault();
      this.emit(max);
    } else if (event.key === "Enter") {
      input.blur();
    }
  }

  /** Steps the value by `delta` (from the draft, else the value, else 0) */
  protected adjust(delta: number): void {
    if (this.isLocked()) return;
    const base = parseNumberDraft(this.draft()) ?? this.current() ?? 0;
    this.emit(clampNumber(base + delta, this.min(), this.max()));
  }

  private commit(text: string): void {
    if (this.isLocked()) return;
    const trimmed = text.trim();
    if (trimmed === "" || trimmed === "-") {
      if (this.allowEmpty()) {
        this.setCurrent(null);
        this.draft.set("");
      } else {
        this.emit(clampNumber(this.min() ?? 0, this.min(), this.max()));
      }
      return;
    }
    const parsed = parseNumberDraft(trimmed);
    if (parsed === null) {
      // Invalid text falls back to the last valid value
      this.draft.set(formatNumberValue(this.current(), this.decimals()));
      return;
    }
    this.emit(clampNumber(parsed, this.min(), this.max()));
  }

  private emit(next: number): void {
    const precision = this.decimals();
    const rounded = Number(next.toFixed(precision));
    this.setCurrent(rounded);
    this.draft.set(rounded.toFixed(precision));
  }

  private setCurrent(next: number | null): void {
    if (Object.is(next, this.current())) return;
    this.value.set(next);
    this.notifyChange(next);
  }

  /** Focuses the native input */
  focus(options?: FocusOptions): void {
    this.inputRef()?.nativeElement.focus(options);
  }

  /** The native `<input>` element (after rendering) */
  get nativeElement(): HTMLInputElement | undefined {
    return this.inputRef()?.nativeElement;
  }
}
