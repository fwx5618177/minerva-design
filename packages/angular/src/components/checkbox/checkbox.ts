import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
  output,
  viewChild,
} from "@angular/core";
import { cn, createCheckboxMachine, type ColorScheme } from "@minerva/core";
import { classOf } from "../../internal/classes";
import { hasContent, templateOf, type MnContent } from "../../internal/content";
import { emptyContent } from "../../internal/empty-content";
import {
  MnFormValueControl,
  fieldWiring,
  injectFormField,
  provideValueAccessor,
} from "../../internal/forms";
import { MnHook } from "../../internal/hooks";
import { MnIcon } from "../../internal/icon";
import { injectId } from "../../internal/ids";
import { connectMachine } from "../../internal/machine";
import { checkboxStyles as s } from "../../internal/styles";

export type CheckboxSize = "small" | "medium" | "large";
export type CheckboxShape = "square" | "circle" | "rounded";
export type CheckboxColor = Extract<
  ColorScheme,
  "primary" | "success" | "info" | "warning" | "danger"
>;
export type CheckboxLabelPlacement = "start" | "end" | "top" | "bottom";

const optionalBoolean = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value);

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Checkbox: a native checkbox with a label, helper text and an indeterminate
 * (mixed) state. Same DOM, classes and styling hooks as React's Checkbox: the
 * host is the wrapper, the native `<input type="checkbox">` sits in a
 * `<label>` with the visual box and the label text (`label` input or the
 * projected content). Space toggles (native checkbox); the native `change`
 * event bubbles to the host.
 *
 * Two-way binding: `[(checked)]`, `ngModel` or a Reactive Forms control
 * (ControlValueAccessor). Inside `<mn-form-control>` it takes the field's id,
 * description, invalid / required / read-only / disabled states.
 *
 * @example
 * <mn-checkbox label="Accept the terms" [(checked)]="accepted" />
 * <mn-checkbox formControlName="newsletter">Send me news</mn-checkbox>
 */
@Component({
  selector: "mn-checkbox",
  exportAs: "mnCheckbox",
  imports: [MnHook, MnIcon, NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(() => MnCheckbox)],
  host: {
    "[class]": "rootClasses()",
    "data-minerva": "checkbox",
    "data-part": "root",
    "[attr.data-state]": "dataState()",
    "[attr.data-disabled]": "isDisabled() ? '' : null",
    "[attr.data-invalid]": "isError() ? '' : null",
    "[attr.data-readonly]": "field.readOnly() ? '' : null",
    "[attr.data-required]": "isRequired() ? '' : null",
    "[attr.data-size]": "size()",
    "[attr.data-color]": "color()",
    "[attr.data-shape]": "shape()",
    "[attr.id]": "null",
    "[attr.aria-label]": "null",
    "[attr.aria-labelledby]": "null",
    "[attr.aria-describedby]": "null",
    "[attr.name]": "null",
    "[attr.value]": "null",
    "[attr.required]": "null",
    "[attr.disabled]": "null",
  },
  template: `
    <label [class]="labelClasses()">
      <input
        #input
        type="checkbox"
        [class]="s.input"
        [attr.id]="field.id()"
        [attr.value]="value() ?? null"
        [attr.name]="name() ?? null"
        [checked]="state().checked"
        [indeterminate]="state().indeterminate"
        [disabled]="isDisabled()"
        [required]="isRequired()"
        [attr.aria-checked]="state().indeterminate ? 'mixed' : null"
        [attr.aria-label]="ariaLabel() ?? null"
        [attr.aria-labelledby]="ariaLabelledby() ?? null"
        [attr.aria-invalid]="isError() ? 'true' : null"
        [attr.aria-readonly]="fieldContext?.readOnly() ? 'true' : null"
        [attr.aria-describedby]="field.describedBy()"
        (click)="onClick($event)"
        (change)="onInputChange(input)"
        (blur)="notifyTouched()"
        mnHook="checkbox"
        mnPart="input"
      />
      <span [class]="s.checkmark" mnHook="checkbox" mnPart="control">
        @if (hasContent(icon()) && state().checked && !state().indeterminate) {
          @if (templateOf(icon()); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else {
            {{ icon() }}
          }
        }
      </span>
      <span
        #labelText
        [class]="s.label"
        [hidden]="labelEmpty()"
        mnHook="checkbox"
        mnPart="label"
      >
        @if (templateOf(label()); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else if (hasContent(label())) {
          {{ label() }}
        } @else {
          <ng-content />
        }
      </span>
    </label>
    @if (hasContent(helperText())) {
      <div [class]="s.helperTextWrapper">
        @if (isError()) {
          <span [class]="s.errorIcon" aria-hidden="true">
            @if (templateOf(errorIcon()); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" />
            } @else if (hasContent(errorIcon())) {
              {{ errorIcon() }}
            } @else {
              <svg mnIcon="CircleInfoFilled"></svg>
            }
          </span>
        }
        <span
          [attr.id]="helperId"
          [class]="helperClasses()"
          mnHook="checkbox"
          mnPart="helper-text"
        >
          @if (templateOf(helperText()); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else {
            {{ helperText() }}
          }
        </span>
      </div>
    }
  `,
})
export class MnCheckbox extends MnFormValueControl<boolean> {
  /** Checked state (two-way: `[(checked)]`; emits the user's toggles) */
  readonly checked = input<boolean | undefined>(undefined);
  readonly checkedChange = output<boolean>();
  /** Initial checked state when `checked` is not bound @default false */
  readonly defaultChecked = input(false, { transform: booleanAttribute });
  /**
   * Disables the checkbox. Inherited from an enclosing FormControl when not
   * set; an explicit `false` overrides the FormControl
   * @default false
   */
  readonly disabled = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /**
   * Shows the indeterminate (partially checked) state. It stays applied until
   * this input changes, also after the user toggles the box
   * @default false
   */
  readonly indeterminate = input(false, { transform: booleanAttribute });
  /** Name of the input, used in forms */
  readonly name = input<string | undefined>(undefined);
  /** Box shape @default "square" */
  readonly shape = input<CheckboxShape>("square");
  /** Checkbox size @default "medium" */
  readonly size = input<CheckboxSize>("medium");
  /** Label content (string or template); the projected content otherwise */
  readonly label = input<MnContent>(undefined);
  /**
   * Semantic color of the checked / indeterminate box
   * @default "primary"
   */
  readonly color = input<CheckboxColor>("primary");
  /** id of the input (defaults to the enclosing FormControl's id) */
  readonly id = input<string | undefined>(undefined);
  /** Value submitted with the form when checked */
  readonly value = input<string | undefined>(undefined);
  /** Extra ids of elements describing the checkbox (aria-describedby) */
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: "aria-describedby",
  });
  /** Accessible label, required when there is no visible label */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  /** id(s) of the element(s) labelling the checkbox */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });
  /** Custom icon shown when checked (string or template) */
  readonly icon = input<MnContent>(undefined);
  /**
   * Marks the input as required (inherited from an enclosing FormControl
   * when not set)
   * @default false
   */
  readonly required = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /**
   * Shows the error state (also set by an invalid enclosing FormControl or
   * an invalid bound form control)
   * @default false
   */
  readonly error = input(false, { transform: booleanAttribute });
  /** Icon shown before the helper text in the error state @default a filled info-circle icon */
  readonly errorIcon = input<MnContent>(undefined);
  /** Helper or error text shown below the checkbox (linked with aria-describedby) */
  readonly helperText = input<MnContent>(undefined);
  /** Position of the label relative to the box @default "end" */
  readonly labelPlacement = input<CheckboxLabelPlacement>("end");
  /** Read-only: focusable and submitted, but the user cannot toggle it @default false */
  readonly readOnly = input(false, { transform: booleanAttribute });

  protected readonly s = s;
  protected readonly templateOf = templateOf;
  protected readonly hasContent = hasContent;
  protected readonly helperId = injectId("checkbox-helper");
  protected readonly fieldContext = injectFormField();
  protected readonly field = fieldWiring(this.fieldContext, {
    id: () => this.id(),
    describedBy: () =>
      [
        hasContent(this.helperText()) ? this.helperId : null,
        this.ariaDescribedby(),
      ]
        .filter(Boolean)
        .join(" ") || null,
    readOnly: () => this.readOnly(),
  });
  protected readonly isDisabled = computed(
    () =>
      this.disabled() ??
      (this.formDisabled() || (this.fieldContext?.disabled() ?? false)),
  );
  protected readonly isRequired = computed(
    () => this.required() ?? this.fieldContext?.required() ?? false,
  );
  protected readonly isError = computed(
    () =>
      this.error() ||
      this.controlInvalid() ||
      (this.fieldContext?.invalid() ?? false),
  );

  private readonly machine = connectMachine(
    () =>
      createCheckboxMachine({
        defaultChecked: this.defaultChecked(),
        onCheckedChange: (checked) => {
          this.checkedChange.emit(checked);
          this.notifyChange(checked);
        },
      }),
    () => ({
      checked: this.checked() ?? this.formValue(),
      indeterminate: this.indeterminate(),
      disabled: this.isDisabled(),
      readOnly: this.field.readOnly(),
    }),
  );
  protected readonly state = this.machine.state;

  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>("input");
  private readonly labelRef = viewChild<ElementRef<HTMLElement>>("labelText");
  protected readonly labelEmpty = emptyContent(
    () => this.labelRef(),
    () => this.label(),
  );

  protected readonly dataState = computed(() =>
    this.state().indeterminate
      ? "indeterminate"
      : this.state().checked
        ? "checked"
        : "unchecked",
  );
  protected readonly rootClasses = computed(() =>
    cn(s.checkboxWrapper, this.isError() && s.error),
  );
  protected readonly labelClasses = computed(() =>
    cn(
      s.checkbox,
      classOf(s, this.size()),
      classOf(s, this.shape()),
      classOf(s, `label${capitalize(this.labelPlacement())}`),
      this.color() !== "primary" &&
        classOf(s, `color${capitalize(this.color())}`),
      this.isDisabled() && s.disabled,
      this.isError() && s.error,
    ),
  );
  protected readonly helperClasses = computed(() =>
    cn(s.helperText, this.isError() && s.errorText),
  );

  protected override fromForm(value: unknown): boolean {
    return !!value;
  }

  protected onClick(event: MouseEvent): void {
    // A read-only checkbox keeps its state
    if (this.field.readOnly()) event.preventDefault();
  }

  protected onInputChange(input: HTMLInputElement): void {
    if (!this.field.readOnly())
      this.machine.send({ type: "SET", checked: input.checked });
    // show the kept state (indeterminate input, blocked change)
    input.checked = this.state().checked;
    input.indeterminate = this.state().indeterminate;
  }

  /** Focuses the native checkbox */
  focus(options?: FocusOptions): void {
    this.inputRef()?.nativeElement.focus(options);
  }
}
