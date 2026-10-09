import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
} from "@angular/core";
import { cn } from "@minerva/core";
import { classOf } from "../../internal/classes";
import {
  MnFormValueControl,
  fieldWiring,
  injectFormField,
  provideValueAccessor,
} from "../../internal/forms";
import { textareaStyles as s } from "../../internal/styles";

export type TextareaVariant = "outline" | "filled" | "unstyled";
export type TextareaSize = "small" | "medium" | "large";

/**
 * Textarea: a multi-line text field sharing Input's look. An attribute
 * component, so the host IS the native `<textarea>` (native attributes such
 * as `rows`, `placeholder`, `maxlength` and the native `input` / `change`
 * events apply as usual). Manual resizing is disabled (set `rows` or layout
 * dimensions instead).
 *
 * Two-way binding: `[(value)]`, `ngModel` or a Reactive Forms control
 * (ControlValueAccessor). Inside `<mn-form-control>` it takes the field's id,
 * description, invalid / required / read-only / disabled states.
 *
 * @example
 * <textarea mnTextarea aria-label="Bio" rows="4" [(value)]="bio"></textarea>
 * <textarea mnTextarea formControlName="comment"></textarea>
 */
@Component({
  selector: "textarea[mnTextarea]",
  exportAs: "mnTextarea",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(() => MnTextarea)],
  host: {
    "[class]": "classes()",
    "[style.resize]": "'none'",
    "[attr.id]": "field.id()",
    "[value]": "current()",
    "[disabled]": "field.disabled()",
    "[readOnly]": "field.readOnly()",
    "[required]": "required()",
    "[attr.aria-describedby]": "field.describedBy()",
    "[attr.aria-invalid]": "field.invalid() ? 'true' : null",
    "[attr.aria-required]": "fieldContext?.required() ? 'true' : null",
    "[attr.aria-readonly]": "fieldContext?.readOnly() ? 'true' : null",
    "data-minerva": "textarea",
    "data-part": "root",
    "[attr.data-disabled]": "field.disabled() ? '' : null",
    "[attr.data-invalid]": "field.invalid() ? '' : null",
    "[attr.data-readonly]": "field.readOnly() ? '' : null",
    "[attr.data-required]": "field.required() ? '' : null",
    "[attr.data-size]": "size()",
    "[attr.data-variant]": "variant()",
    "(input)": "onInput()",
    "(blur)": "notifyTouched()",
  },
  template: ``,
})
export class MnTextarea extends MnFormValueControl<string> {
  /** Current text (two-way: `[(value)]`) */
  readonly value = model<string | undefined>(undefined);
  /**
   * Initial text when `value` is not bound (like `<textarea>`, changing it
   * also changes the text until the user edits it)
   * @default ""
   */
  readonly defaultValue = input<string>("");
  /** Visual style @default "outline" */
  readonly variant = input<TextareaVariant>("outline");
  /** Font size and minimum height @default "medium" */
  readonly size = input<TextareaSize>("medium");
  /** Error state (also set by an invalid FormControl); sets aria-invalid @default false */
  readonly invalid = input(false, { transform: booleanAttribute });
  /** Disables the control @default false */
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Read-only: focusable and submitted, not editable @default false */
  readonly readOnly = input(false, { transform: booleanAttribute });
  /** The control must have a value for the form to be submitted @default false */
  readonly required = input(false, { transform: booleanAttribute });
  /** id of the textarea (default: the field's) */
  readonly id = input<string | undefined>(undefined);
  /** Extra ids of elements describing the textarea */
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: "aria-describedby",
  });

  private readonly host = inject<ElementRef<HTMLTextAreaElement>>(ElementRef);
  protected readonly fieldContext = injectFormField();
  protected readonly field = fieldWiring(this.fieldContext, {
    id: () => this.id(),
    describedBy: () => this.ariaDescribedby(),
    invalid: () => this.invalid() || this.controlInvalid(),
    required: () => this.required(),
    readOnly: () => this.readOnly(),
    disabled: () => this.disabled() || this.formDisabled(),
  });
  protected readonly current = computed(
    () => this.value() ?? this.defaultValue() ?? "",
  );
  protected readonly classes = computed(() =>
    cn(
      s.textarea,
      classOf(s, this.variant()),
      classOf(s, this.size()),
      this.field.invalid() && s.invalid,
    ),
  );

  override writeValue(value: string | null | undefined): void {
    this.value.set(value == null ? "" : String(value));
  }

  protected onInput(): void {
    const next = this.host.nativeElement.value;
    this.value.set(next);
    this.notifyChange(next);
  }
}
