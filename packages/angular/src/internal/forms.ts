import {
  DestroyRef,
  Directive,
  InjectionToken,
  Injector,
  computed,
  forwardRef,
  inject,
  signal,
  type OnInit,
  type Provider,
  type Signal,
  type Type,
} from "@angular/core";
import {
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgForm,
  type ControlValueAccessor,
} from "@angular/forms";

// ---------------------------------------------------------------------------
// Field context (MnFormControl -> the control inside it)

/**
 * Field state shared by `<mn-form-control>` with the control inside it
 * (input, textarea, select, checkbox...), like React's FormControl context.
 */
export interface FormFieldContext {
  /** id of the control (the label's `for`) */
  readonly id: Signal<string>;
  readonly helperId: Signal<string>;
  readonly errorId: Signal<string>;
  readonly labelId: Signal<string>;
  readonly invalid: Signal<boolean>;
  readonly required: Signal<boolean>;
  readonly disabled: Signal<boolean>;
  readonly readOnly: Signal<boolean>;
  /** A helper / error element is rendered (aria-describedby references existing ids only) */
  readonly hasHelperText: Signal<boolean>;
  readonly hasErrorMessage: Signal<boolean>;
  registerHelperText(present: boolean): void;
  registerErrorMessage(present: boolean): void;
}

export const MN_FORM_FIELD = new InjectionToken<FormFieldContext>(
  "MN_FORM_FIELD",
);

/** The closest field (`<mn-form-control>`), or `null` */
export const injectFormField = (): FormFieldContext | null =>
  inject(MN_FORM_FIELD, { optional: true });

/** Own state of a control, merged with its field by `fieldWiring` */
export interface ControlState {
  id?: () => string | null | undefined;
  disabled?: () => boolean;
  readOnly?: () => boolean;
  required?: () => boolean;
  invalid?: () => boolean;
  describedBy?: () => string | null | undefined;
}

/** Field-aware attributes of a control (React's `useFormControlProps`) */
export interface FieldWiring {
  readonly id: Signal<string | null>;
  readonly describedBy: Signal<string | null>;
  readonly invalid: Signal<boolean>;
  readonly required: Signal<boolean>;
  readonly readOnly: Signal<boolean>;
  readonly disabled: Signal<boolean>;
}

/**
 * Merges the closest field into a control's own state: `id`,
 * `aria-describedby` (error when invalid, helper otherwise, plus the
 * control's own), invalid, required, read-only and disabled.
 */
export function fieldWiring(
  field: FormFieldContext | null,
  own: ControlState,
): FieldWiring {
  return {
    id: computed(() => own.id?.() || field?.id() || null),
    describedBy: computed(() => {
      const ids = [
        field && field.invalid() && field.hasErrorMessage()
          ? field.errorId()
          : null,
        field && !field.invalid() && field.hasHelperText()
          ? field.helperId()
          : null,
        own.describedBy?.(),
      ].filter(Boolean);
      return ids.length ? ids.join(" ") : null;
    }),
    invalid: computed(() => !!(field?.invalid() || own.invalid?.())),
    required: computed(() => !!(field?.required() || own.required?.())),
    readOnly: computed(() => !!(field?.readOnly() || own.readOnly?.())),
    disabled: computed(() => !!(field?.disabled() || own.disabled?.())),
  };
}

// ---------------------------------------------------------------------------
// ControlValueAccessor

/** `NG_VALUE_ACCESSOR` provider of a form control component */
export const provideValueAccessor = (type: () => Type<unknown>): Provider => ({
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(type),
  multi: true,
});

/**
 * Base of the form controls: the `ControlValueAccessor` plumbing for
 * `ngModel`, `formControl` / `formControlName` (Reactive Forms) and signal
 * state for the template:
 *
 * - `writeValue(value)`: implemented by the control (sets its model)
 * - `notifyChange(value)` / `notifyTouched()`: call on user interaction
 * - `formDisabled`: disabled by the form (`setDisabledState`)
 * - `controlInvalid`: the bound form control is invalid and touched (or its
 *   form was submitted), so the control shows its error state like an
 *   explicit `invalid` input.
 */
@Directive()
export abstract class MnFormValueControl<T>
  implements ControlValueAccessor, OnInit
{
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private onChange: (value: T) => void = () => {};
  private onTouched: () => void = () => {};

  /** Disabled through the forms API */
  protected readonly formDisabled = signal(false);
  /** The bound form control is invalid and touched / submitted */
  protected readonly controlInvalid = signal(false);

  abstract writeValue(value: T): void;

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.formDisabled.set(disabled);
  }

  /** Reports a user change to the bound form control */
  protected notifyChange(value: T): void {
    this.onChange(value);
  }

  /** Reports the end of an interaction (blur) to the bound form control */
  protected notifyTouched(): void {
    this.onTouched();
  }

  ngOnInit(): void {
    // Lazily (NgControl injects this component through NG_VALUE_ACCESSOR)
    const ngControl = this.injector.get(NgControl, null, {
      self: true,
      optional: true,
    });
    const control = ngControl?.control;
    if (!control) return;
    const form =
      this.injector.get(FormGroupDirective, null, { optional: true }) ??
      this.injector.get(NgForm, null, { optional: true });
    const update = () =>
      this.controlInvalid.set(
        control.invalid && (control.touched || !!form?.submitted),
      );
    update();
    const subscriptions = [control.events.subscribe(update)];
    if (form) subscriptions.push(form.ngSubmit.subscribe(update));
    this.destroyRef.onDestroy(() =>
      subscriptions.forEach((s) => s.unsubscribe()),
    );
  }
}
