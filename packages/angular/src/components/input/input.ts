import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
  model,
  numberAttribute,
  output,
  signal,
  viewChild,
} from "@angular/core";
import { cn } from "@minerva/core";
import { hasContent, templateOf, type MnContent } from "../../internal/content";
import {
  MnFormValueControl,
  fieldWiring,
  injectFormField,
  provideValueAccessor,
} from "../../internal/forms";
import { MnHook } from "../../internal/hooks";
import { MnIcon } from "../../internal/icon";
import { injectId } from "../../internal/ids";
import { classOf } from "../../internal/classes";
import { injectScope } from "../../config/scope";
import { inputStyles as s } from "../../internal/styles";

export type InputVariant = "outline" | "filled" | "unstyled";
export type InputSize = "small" | "medium" | "large";
export type InputType =
  | "date"
  | "datetime-local"
  | "email"
  | "month"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

const optionalNumber = (value: unknown): number | undefined =>
  value === undefined || value === null || value === ""
    ? undefined
    : numberAttribute(value);

/**
 * Input: a single-line text field with optional prefix / suffix, clear
 * button, character count and password visibility toggle. Same DOM, classes
 * and styling hooks as React's Input: the host is the field box, the native
 * `<input>` is inside it (it receives the native attributes: `placeholder`,
 * `name`, `maxLength`, `aria-label`...). The native `input` / `change` events
 * bubble to the host.
 *
 * Two-way binding: `[(value)]`, `ngModel` or a Reactive Forms control
 * (ControlValueAccessor; every keystroke updates the value). Inside
 * `<mn-form-control>` it takes the field's id, description, invalid /
 * required / read-only / disabled states.
 *
 * @example
 * <mn-input aria-label="Name" [(value)]="name" clearable />
 * <mn-input formControlName="weight" suffix="kg" />
 */
@Component({
  selector: "mn-input",
  exportAs: "mnInput",
  imports: [MnHook, MnIcon, NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(() => MnInput)],
  host: {
    "[class]": "rootClasses()",
    "data-component": "input",
    "data-minerva": "input",
    "data-part": "root",
    "[attr.data-disabled]": "isDisabled() ? '' : null",
    "[attr.data-invalid]": "isInvalid() ? '' : null",
    "[attr.data-readonly]": "field.readOnly() ? '' : null",
    "[attr.data-required]": "field.required() ? '' : null",
    "[attr.data-size]": "size()",
    "[attr.data-variant]": "variant()",
    "[attr.id]": "null",
    "[attr.aria-label]": "null",
    "[attr.aria-labelledby]": "null",
    "[attr.aria-describedby]": "null",
    "[attr.placeholder]": "null",
    "[attr.name]": "null",
    "[attr.type]": "null",
    "[attr.required]": "null",
    "[attr.disabled]": "null",
    "[attr.readonly]": "null",
    "[attr.maxlength]": "null",
    "[attr.minlength]": "null",
    "[attr.pattern]": "null",
    "[attr.min]": "null",
    "[attr.max]": "null",
    "[attr.step]": "null",
    "[attr.autocomplete]": "null",
    "[attr.inputmode]": "null",
  },
  template: `
    @if (hasContent(prefix())) {
      <span [class]="addonStart" mnHook="input" mnPart="prefix">
        @if (templateOf(prefix()); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else {
          {{ prefix() }}
        }
      </span>
    }
    <input
      #input
      [class]="s.field"
      [attr.id]="field.id()"
      [type]="nativeType()"
      [value]="current()"
      [attr.name]="name() ?? null"
      [attr.placeholder]="placeholder() ?? null"
      [attr.autocomplete]="autocomplete() ?? null"
      [attr.inputmode]="inputmode() ?? null"
      [attr.maxlength]="maxLength() ?? null"
      [attr.minlength]="minLength() ?? null"
      [attr.pattern]="pattern() ?? null"
      [attr.min]="min() ?? null"
      [attr.max]="max() ?? null"
      [attr.step]="step() ?? null"
      [attr.aria-label]="ariaLabel() ?? null"
      [attr.aria-labelledby]="ariaLabelledby() ?? null"
      [attr.aria-describedby]="field.describedBy()"
      [attr.aria-invalid]="isInvalid() ? 'true' : null"
      [attr.aria-required]="fieldContext?.required() ? 'true' : null"
      [attr.aria-readonly]="fieldContext?.readOnly() ? 'true' : null"
      [required]="required()"
      [readOnly]="field.readOnly()"
      [disabled]="isDisabled()"
      (input)="onInput(input)"
      (blur)="notifyTouched()"
      mnHook="input"
      mnPart="input"
    />
    @if (showClear()) {
      <button
        type="button"
        [class]="s.action"
        [attr.aria-label]="clearLabel() ?? scope.t('input.clear')"
        (click)="clearValue()"
        mnHook="input"
        mnPart="clear-button"
      >
        <svg mnIcon="X"></svg>
      </button>
    }
    @if (type() === "password") {
      <button
        type="button"
        [class]="s.action"
        [attr.aria-label]="passwordLabel()"
        [disabled]="isDisabled()"
        (click)="passwordVisible.set(!passwordVisible())"
        mnHook="input"
        mnPart="password-toggle"
      >
        <svg [mnIcon]="passwordVisible() ? 'EyeOff' : 'Eye'"></svg>
      </button>
    }
    @if (showCharCount()) {
      <span [attr.id]="countId" [class]="s.count" mnHook="input" mnPart="count">
        {{ countText() }}
      </span>
    }
    @if (hasContent(suffix())) {
      <span [class]="addonEnd" mnHook="input" mnPart="suffix">
        @if (templateOf(suffix()); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else {
          {{ suffix() }}
        }
      </span>
    }
  `,
})
export class MnInput extends MnFormValueControl<string> {
  /** Current text (two-way: `[(value)]`) */
  readonly value = model<string | undefined>(undefined);
  /**
   * Initial text when `value` is not bound (like `<input>`, changing it also
   * changes the text until the user edits it)
   * @default ""
   */
  readonly defaultValue = input<string>("");
  /** Visual style @default "outline" */
  readonly variant = input<InputVariant>("outline");
  /** Height and font size @default "medium" */
  readonly size = input<InputSize>("medium");
  /** Error state (also set by an invalid FormControl); sets aria-invalid @default false */
  readonly invalid = input(false, { transform: booleanAttribute });
  /** Content before the text, e.g. an icon or "@" (string or template) */
  readonly prefix = input<MnContent>(undefined);
  /** Content after the text, e.g. a unit, an icon or a button (string or template) */
  readonly suffix = input<MnContent>(undefined);
  /**
   * Shows a clear button while the field has a value (not when disabled or
   * read-only). Clearing empties the value and keeps focus in the field
   * @default false
   */
  readonly clearable = input(false, { transform: booleanAttribute });
  /** Accessible label of the clear button @default "Clear" (localized) */
  readonly clearLabel = input<string | undefined>(undefined);
  /**
   * Shows the number of characters (and maxLength, when set) after the text;
   * the count is linked to the input with aria-describedby
   * @default false
   */
  readonly showCharCount = input(false, { transform: booleanAttribute });
  /**
   * Accessible label of the password visibility toggle (shown for
   * type="password") while the password is hidden
   * @default "Show password" (localized)
   */
  readonly showPasswordLabel = input<string | undefined>(undefined);
  /**
   * Accessible label of the password visibility toggle while the password is visible
   * @default "Hide password" (localized)
   */
  readonly hidePasswordLabel = input<string | undefined>(undefined);
  /** Input type @default "text" */
  readonly type = input<InputType>("text");
  /** Placeholder text */
  readonly placeholder = input<string | undefined>(undefined);
  /** Name submitted with the form data */
  readonly name = input<string | undefined>(undefined);
  /** id of the native input (default: the field's) */
  readonly id = input<string | undefined>(undefined);
  /** Disables the control @default false */
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Read-only: focusable and submitted, not editable @default false */
  readonly readOnly = input(false, { transform: booleanAttribute });
  /** The control must have a value for the form to be submitted @default false */
  readonly required = input(false, { transform: booleanAttribute });
  /** Minimum length */
  readonly minLength = input<number | undefined, unknown>(undefined, {
    transform: optionalNumber,
  });
  /** Maximum length */
  readonly maxLength = input<number | undefined, unknown>(undefined, {
    transform: optionalNumber,
  });
  /** Regular expression the value must match */
  readonly pattern = input<string | undefined>(undefined);
  /** Minimum (number / date types) */
  readonly min = input<string | number | undefined>(undefined);
  /** Maximum (number / date types) */
  readonly max = input<string | number | undefined>(undefined);
  /** Step (number / date types) */
  readonly step = input<string | number | undefined>(undefined);
  /** Autocomplete hint */
  readonly autocomplete = input<string | undefined>(undefined);
  /** Virtual keyboard hint */
  readonly inputmode = input<string | undefined>(undefined);
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
  /** The clear button emptied the field (React `onClear`) */
  readonly clear = output<void>();

  protected readonly s = s;
  protected readonly templateOf = templateOf;
  protected readonly hasContent = hasContent;
  protected readonly scope = injectScope();
  protected readonly countId = injectId("input-count");
  protected readonly addonStart = cn(s.addon, s.start);
  protected readonly addonEnd = cn(s.addon, s.end);
  protected readonly fieldContext = injectFormField();
  protected readonly field = fieldWiring(this.fieldContext, {
    id: () => this.id(),
    describedBy: () =>
      [this.ariaDescribedby(), this.showCharCount() ? this.countId : null]
        .filter(Boolean)
        .join(" ") || null,
    invalid: () => this.invalid() || this.controlInvalid(),
    required: () => this.required(),
    readOnly: () => this.readOnly(),
    disabled: () => this.disabled() || this.formDisabled(),
  });
  protected readonly isDisabled = this.field.disabled;
  protected readonly isInvalid = this.field.invalid;
  protected readonly passwordVisible = signal(false);
  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>("input");

  /** The text shown (the bound value, else the default) */
  protected readonly current = computed(
    () => this.value() ?? this.defaultValue() ?? "",
  );
  protected readonly nativeType = computed(() =>
    this.type() === "password" && this.passwordVisible() ? "text" : this.type(),
  );
  protected readonly showClear = computed(
    () =>
      this.clearable() &&
      this.current() !== "" &&
      !this.isDisabled() &&
      !this.field.readOnly(),
  );
  protected readonly passwordLabel = computed(() =>
    this.passwordVisible()
      ? (this.hidePasswordLabel() ?? this.scope.t("input.hidePassword"))
      : (this.showPasswordLabel() ?? this.scope.t("input.showPassword")),
  );
  protected readonly countText = computed(() => {
    const max = this.maxLength();
    const length = this.current().length;
    return max != null && max >= 0 ? `${length} / ${max}` : `${length}`;
  });
  protected readonly rootClasses = computed(() =>
    cn(
      s.root,
      classOf(s, this.variant()),
      classOf(s, this.size()),
      this.isInvalid() && s.invalid,
      this.isDisabled() && s.disabled,
    ),
  );

  override writeValue(value: string | null | undefined): void {
    this.value.set(value == null ? "" : String(value));
  }

  protected onInput(input: HTMLInputElement): void {
    this.setValue(input.value);
  }

  /** Empties the field (like the clear button) and keeps focus in it */
  protected clearValue(): void {
    const input = this.inputRef()?.nativeElement;
    if (input) input.value = "";
    this.setValue("");
    this.clear.emit();
    input?.focus();
  }

  private setValue(next: string): void {
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
