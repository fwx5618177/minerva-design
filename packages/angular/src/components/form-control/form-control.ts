import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Directive,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
  untracked,
  type Signal,
} from "@angular/core";
import { FormGroupDirective, NgControl, NgForm } from "@angular/forms";
import { cn } from "@minerva/core";
import { hasContent, templateOf, type MnContent } from "../../internal/content";
import {
  MN_FORM_FIELD,
  injectFormField,
  type FormFieldContext,
} from "../../internal/forms";
import { MnHook } from "../../internal/hooks";
import { injectId } from "../../internal/ids";
import { formControlStyles as s } from "../../internal/styles";

const optionalBoolean = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value);

/**
 * Shared field logic of `<mn-form-control>` and `<mn-form-field>`: the inputs,
 * the field context provided to the label, control, helper text and error
 * message, and the state of the bound Angular form control (an `ngModel` /
 * `formControl` / `formControlName` inside the field).
 */
@Directive({
  host: {
    "[class]": "rootClass",
    "[attr.id]": "null",
    "[attr.disabled]": "null",
    "[attr.required]": "null",
    "[attr.readonly]": "null",
    "[attr.invalid]": "null",
    "data-minerva": "form-control",
    "data-part": "root",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.data-invalid]": "context.invalid() ? '' : null",
    "[attr.data-readonly]": "readOnly() ? '' : null",
    "[attr.data-required]": "required() ? '' : null",
  },
})
export abstract class MnFieldBase {
  /**
   * Marks the field as invalid: the control gets aria-invalid and the error
   * message replaces the helper text. When not set, the field follows the
   * Angular form control bound inside it (invalid and touched / submitted);
   * an explicit `false` opts out.
   * @default false
   */
  readonly invalid = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /**
   * Marks the field as required (aria-required on the control, indicator on the label)
   * @default false
   */
  readonly required = input(false, { transform: booleanAttribute });
  /**
   * Disables the control inside the field
   * @default false
   */
  readonly disabled = input(false, { transform: booleanAttribute });
  /**
   * Makes the control inside the field read-only
   * @default false
   */
  readonly readOnly = input(false, { transform: booleanAttribute });
  /**
   * Id of the control; the label, helper and error ids derive from it
   * (`${id}-label`, `${id}-helper`, `${id}-error`). Generated when omitted
   */
  readonly id = input<string | undefined>(undefined);

  private readonly autoId = injectId("field");
  private readonly ngControl = contentChild(NgControl, { descendants: true });
  private readonly form =
    inject(FormGroupDirective, { optional: true }) ??
    inject(NgForm, { optional: true });
  /** The bound form control is invalid and touched (or its form submitted) */
  protected readonly controlInvalid = signal(false);
  /** A form control is bound inside the field */
  protected readonly hasControl = computed(() => !!this.ngControl()?.control);

  private readonly helperCount = signal(0);
  private readonly errorCount = signal(0);

  /** Invalid state when `invalid` is not set */
  protected fallbackInvalid(): boolean {
    return this.controlInvalid();
  }

  /** The field state shared with the parts and the control (MN_FORM_FIELD) */
  readonly context: FormFieldContext = (() => {
    const id = computed(() => this.id() || this.autoId);
    return {
      id,
      labelId: computed(() => `${id()}-label`),
      helperId: computed(() => `${id()}-helper`),
      errorId: computed(() => `${id()}-error`),
      invalid: computed(() => this.invalid() ?? this.fallbackInvalid()),
      required: this.required,
      disabled: this.disabled,
      readOnly: this.readOnly,
      hasHelperText: computed(() => this.helperCount() > 0),
      hasErrorMessage: computed(() => this.errorCount() > 0),
      registerHelperText: (present: boolean) =>
        this.helperCount.update((n) => Math.max(0, n + (present ? 1 : -1))),
      registerErrorMessage: (present: boolean) =>
        this.errorCount.update((n) => Math.max(0, n + (present ? 1 : -1))),
    };
  })();

  protected readonly rootClass = s.root;

  constructor() {
    effect((onCleanup) => {
      const control = this.ngControl()?.control;
      if (!control) {
        this.controlInvalid.set(false);
        return;
      }
      untracked(() => {
        const update = () =>
          this.controlInvalid.set(
            control.invalid && (control.touched || !!this.form?.submitted),
          );
        update();
        const subscriptions = [control.events.subscribe(update)];
        if (this.form) subscriptions.push(this.form.ngSubmit.subscribe(update));
        onCleanup(() => subscriptions.forEach((sub) => sub.unsubscribe()));
      });
    });
  }
}

/**
 * FormControl: field container that shares id / invalid / required /
 * disabled / read-only state with its label (`<mn-form-label>`), the control
 * inside it (`<mn-input>`, `<mn-checkbox>`, `<mn-select>`...), the helper
 * text (`<mn-form-helper-text>`) and the error message
 * (`<mn-form-error-message>`), like React's FormControl context.
 *
 * Angular forms: when `invalid` is not set, the field follows the form control
 * bound inside it (`ngModel`, `formControl`, `formControlName`): invalid once
 * touched or submitted, so the error message replaces the helper text.
 *
 * @example
 * <mn-form-control required>
 *   <mn-form-label>Email</mn-form-label>
 *   <mn-input formControlName="email" />
 *   <mn-form-helper-text>We never share it</mn-form-helper-text>
 *   <mn-form-error-message>Enter a valid email</mn-form-error-message>
 * </mn-form-control>
 */
@Component({
  selector: "mn-form-control",
  exportAs: "mnFormControl",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MN_FORM_FIELD, useFactory: () => inject(MnFormControl).context },
  ],
  template: `<ng-content />`,
})
export class MnFormControl extends MnFieldBase {}

/**
 * FormLabel: the `<label>` of the closest field's control (`for` / `id`
 * wiring), with an `aria-hidden` indicator after the text when the field is
 * required. The host is `display: contents`.
 *
 * @example
 * <mn-form-label requiredIndicator="(required)">Name</mn-form-label>
 */
@Component({
  selector: "mn-form-label",
  exportAs: "mnFormLabel",
  imports: [MnHook, NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: "display: contents", "[attr.id]": "null" },
  template: `
    <label
      [attr.id]="field?.labelId() ?? null"
      [attr.for]="htmlFor() ?? field?.id() ?? null"
      [class]="labelClass()"
      mnHook="form-control"
      mnPart="label"
      ><ng-content />
      @if (field?.required()) {
        <span
          [class]="s.required"
          aria-hidden="true"
          mnHook="form-control"
          mnPart="required-indicator"
        >
          @if (templateOf(requiredIndicator()); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else {
            {{ requiredIndicator() }}
          }
        </span>
      }
    </label>
  `,
})
export class MnFormLabel {
  /**
   * Indicator shown after the text when the field is required (hidden from
   * assistive technology, which gets aria-required instead)
   * @default "*"
   */
  readonly requiredIndicator = input<MnContent>("*");
  /** id of the labelled control (default: the field's control) */
  readonly htmlFor = input<string | undefined>(undefined);
  /** Extra classes of the `<label>` */
  readonly labelClassName = input<string | undefined>(undefined, {
    alias: "class",
  });

  protected readonly s = s;
  protected readonly templateOf = templateOf;
  protected readonly field = injectFormField();
  protected readonly labelClass = computed(() =>
    cn(s.label, this.labelClassName()),
  );
}

/** Registers a rendered helper / error element with the field while `visible` */
function registerWhile(
  visible: Signal<boolean>,
  register: ((present: boolean) => void) | undefined,
): void {
  if (!register) return;
  let registered = false;
  const set = (present: boolean) => {
    if (present === registered) return;
    registered = present;
    register(present);
  };
  effect(() => {
    const present = visible();
    untracked(() => set(present));
  });
  inject(DestroyRef).onDestroy(() => set(false));
}

/**
 * FormHelperText: help text of the field (its id describes the control);
 * replaced by the error message while the field is invalid. The host is
 * `display: contents`.
 *
 * @example
 * <mn-form-helper-text>At least 8 characters</mn-form-helper-text>
 */
@Component({
  selector: "mn-form-helper-text",
  exportAs: "mnFormHelperText",
  imports: [MnHook],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: "display: contents", "[attr.id]": "null" },
  template: `
    @if (visible()) {
      <div
        [attr.id]="field?.helperId() ?? null"
        [class]="helperClass()"
        mnHook="form-control"
        mnPart="helper-text"
      >
        <ng-content />
      </div>
    }
  `,
})
export class MnFormHelperText {
  /** Extra classes of the helper `<div>` */
  readonly helperClassName = input<string | undefined>(undefined, {
    alias: "class",
  });

  protected readonly field = injectFormField();
  protected readonly visible = computed(() => !this.field?.invalid());
  protected readonly helperClass = computed(() =>
    cn(s.helper, this.helperClassName()),
  );

  constructor() {
    registerWhile(this.visible, this.field?.registerHelperText);
  }
}

/**
 * FormErrorMessage: error message of the field (`role="alert"`, its id
 * describes the control); only rendered inside a field while it is invalid.
 * The host is `display: contents`.
 *
 * @example
 * <mn-form-error-message>Enter a valid email</mn-form-error-message>
 */
@Component({
  selector: "mn-form-error-message",
  exportAs: "mnFormErrorMessage",
  imports: [MnHook],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: "display: contents", "[attr.id]": "null" },
  template: `
    @if (visible()) {
      <div
        [attr.id]="field?.errorId() ?? null"
        role="alert"
        [class]="errorClass()"
        mnHook="form-control"
        mnPart="error-message"
      >
        <ng-content />
      </div>
    }
  `,
})
export class MnFormErrorMessage {
  /** Extra classes of the error `<div>` */
  readonly errorClassName = input<string | undefined>(undefined, {
    alias: "class",
  });

  protected readonly field = injectFormField();
  protected readonly visible = computed(() => !!this.field?.invalid());
  protected readonly errorClass = computed(() =>
    cn(s.error, this.errorClassName()),
  );

  constructor() {
    registerWhile(this.visible, this.field?.registerErrorMessage);
  }
}

/**
 * FormField: `<mn-form-control>` with its label, helper text and error
 * message in one component (React's FormField). `errorMessage` makes the
 * field invalid unless `invalid` is set explicitly; with an Angular form
 * control bound inside it, the error message shows while that control is
 * invalid (touched / submitted) instead.
 *
 * @example
 * <mn-form-field label="Title" helperText="Public title" errorMessage="Required">
 *   <mn-input formControlName="title" />
 * </mn-form-field>
 */
@Component({
  selector: "mn-form-field",
  exportAs: "mnFormField",
  imports: [
    MnFormLabel,
    MnFormHelperText,
    MnFormErrorMessage,
    NgTemplateOutlet,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MN_FORM_FIELD, useFactory: () => inject(MnFormField).context },
  ],
  template: `
    <mn-form-label>
      @if (templateOf(label()); as tpl) {
        <ng-container [ngTemplateOutlet]="tpl" />
      } @else {
        {{ label() }}
      }
    </mn-form-label>
    <ng-content />
    @if (hasContent(helperText())) {
      <mn-form-helper-text>
        @if (templateOf(helperText()); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else {
          {{ helperText() }}
        }
      </mn-form-helper-text>
    }
    @if (hasContent(errorMessage())) {
      <mn-form-error-message>
        @if (templateOf(errorMessage()); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else {
          {{ errorMessage() }}
        }
      </mn-form-error-message>
    }
  `,
})
export class MnFormField extends MnFieldBase {
  /** Label of the field (string or template) */
  readonly label = input<MnContent>(undefined);
  /** Help text below the control (hidden while the field is invalid) */
  readonly helperText = input<MnContent>(undefined);
  /**
   * Error message; makes the field invalid unless `invalid` is set
   * explicitly (or an Angular form control is bound inside the field: then
   * it follows that control)
   */
  readonly errorMessage = input<MnContent>(undefined);

  protected readonly templateOf = templateOf;
  protected readonly hasContent = hasContent;

  protected override fallbackInvalid(): boolean {
    return this.hasControl()
      ? this.controlInvalid()
      : hasContent(this.errorMessage());
  }
}
