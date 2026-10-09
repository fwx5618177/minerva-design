import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  type Signal,
} from "@angular/core";
import { cn, type ColorScheme } from "@minerva/core";
import { classOf } from "../../internal/classes";
import { hasContent, templateOf, type MnContent } from "../../internal/content";
import {
  MnFormValueControl,
  injectFormField,
  provideValueAccessor,
} from "../../internal/forms";
import { MnHook } from "../../internal/hooks";
import { injectId } from "../../internal/ids";
import { radioStyles as s } from "../../internal/styles";

export type RadioValue = string | number;
export type RadioSize = "small" | "medium" | "large";
export type RadioColor = Extract<
  ColorScheme,
  "primary" | "success" | "warning" | "danger"
>;
export type RadioGroupDirection = "horizontal" | "vertical";

/** State a `<mn-radio-group>` shares with its `<mn-radio>` options */
export interface RadioGroupContext {
  /** Selected value (`undefined` / `null`: none) */
  readonly value: Signal<RadioValue | null | undefined>;
  readonly name: Signal<string>;
  readonly disabled: Signal<boolean>;
  readonly size: Signal<RadioSize | undefined>;
  readonly color: Signal<RadioColor | undefined>;
  /** A radio of the group was checked by the user */
  select(value: RadioValue): void;
  /** A radio of the group lost the focus */
  touched(): void;
}

export const MN_RADIO_GROUP = new InjectionToken<RadioGroupContext>(
  "MN_RADIO_GROUP",
);

const optionalBoolean = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value);

/**
 * RadioGroup: a set of `<mn-radio>` options of which one can be selected,
 * rendered like React's RadioGroup (an optional visible label, the
 * `role="radiogroup"` list and a helper text). The radios are native radio
 * inputs sharing the group's `name` (a unique one is generated), so the
 * arrow keys move the selection and Tab enters / leaves the group at the
 * selected radio (roving focus of native radios).
 *
 * Two-way binding of the selected value: `[(value)]`, `ngModel` or a
 * Reactive Forms control (ControlValueAccessor). Inside `<mn-form-control>`
 * it is labelled / described by the field and takes its invalid, required
 * and disabled states.
 *
 * @example
 * <mn-radio-group label="Payment" [(value)]="payment">
 *   <mn-radio value="card" label="Card" />
 *   <mn-radio value="cash" label="Cash" />
 * </mn-radio-group>
 */
@Component({
  selector: "mn-radio-group",
  exportAs: "mnRadioGroup",
  imports: [MnHook, NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideValueAccessor(() => MnRadioGroup),
    {
      provide: MN_RADIO_GROUP,
      useFactory: () => inject(MnRadioGroup).context,
    },
  ],
  host: {
    "[class]": "rootClasses()",
    "data-minerva": "radio-group",
    "data-part": "root",
    "[attr.data-disabled]": "isDisabled() ? '' : null",
    "[attr.data-invalid]": "isError() ? '' : null",
    "[attr.data-required]": "isRequired() ? '' : null",
    "[attr.data-orientation]": "direction()",
    "[attr.data-size]": "size() ?? null",
    "[attr.data-color]": "color() ?? null",
    "[attr.id]": "null",
    "[attr.aria-label]": "null",
    "[attr.aria-labelledby]": "null",
    "[attr.aria-describedby]": "null",
    "[attr.name]": "null",
    "[attr.disabled]": "null",
    "[attr.required]": "null",
  },
  template: `
    @if (hasContent(label())) {
      <div
        [attr.id]="labelId"
        [class]="s.groupLabel"
        mnHook="radio-group"
        mnPart="label"
      >
        @if (templateOf(label()); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else {
          {{ label() }}
        }
      </div>
    }
    <div
      [class]="listClasses()"
      role="radiogroup"
      [attr.id]="id() ?? null"
      [attr.aria-labelledby]="labelledBy()"
      [attr.aria-label]="hasContent(label()) ? null : (ariaLabel() ?? null)"
      [attr.aria-describedby]="describedBy()"
      [attr.aria-required]="isRequired()"
      [attr.aria-invalid]="isError()"
      [attr.aria-disabled]="isDisabled() ? 'true' : null"
      mnHook="radio-group"
      mnPart="list"
    >
      <ng-content />
    </div>
    @if (hasContent(helperText())) {
      <div
        [attr.id]="helperId"
        [class]="helperClasses()"
        mnHook="radio-group"
        mnPart="helper-text"
      >
        @if (templateOf(helperText()); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else {
          {{ helperText() }}
        }
      </div>
    }
  `,
})
export class MnRadioGroup extends MnFormValueControl<RadioValue | null> {
  /** Value of the selected radio (two-way: `[(value)]`; `null`: none) */
  readonly value = model<RadioValue | null | undefined>(undefined);
  /** Initially selected value when `value` is not bound */
  readonly defaultValue = input<RadioValue | undefined>(undefined);
  /**
   * Name shared by all radios of the group (a unique name is generated when
   * omitted, so arrow-key navigation always works)
   */
  readonly name = input<string | undefined>(undefined);
  /** Visible label of the group (string or template); also its accessible name */
  readonly label = input<MnContent>(undefined);
  /** Accessible label of the group when there is no visible label */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  /**
   * id(s) of the element(s) labelling the group (takes precedence over the
   * visible `label` and the enclosing FormControl label)
   */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });
  /** Extra ids describing the group (merged with its helper / error text) */
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: "aria-describedby",
  });
  /** id of the element with role="radiogroup" */
  readonly id = input<string | undefined>(undefined);
  /**
   * Disables every radio in the group (inherited from an enclosing
   * FormControl when not set)
   * @default false
   */
  readonly disabled = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Layout direction of the radios @default "vertical" */
  readonly direction = input<RadioGroupDirection>("vertical");
  /** Size applied to every radio in the group; when not set each radio uses its own size */
  readonly size = input<RadioSize | undefined>(undefined);
  /**
   * Shows the error state (also set by an invalid enclosing FormControl or an
   * invalid bound form control)
   * @default false
   */
  readonly error = input(false, { transform: booleanAttribute });
  /** Helper text shown below the group (linked with aria-describedby) */
  readonly helperText = input<MnContent>(undefined);
  /**
   * Marks the group as required (aria-required; inherited from an enclosing
   * FormControl when not set)
   * @default false
   */
  readonly required = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /**
   * Semantic color applied to every radio in the group (overrides the
   * radios' own color); when not set each radio uses its own color
   */
  readonly color = input<RadioColor | undefined>(undefined);

  protected readonly s = s;
  protected readonly templateOf = templateOf;
  protected readonly hasContent = hasContent;
  private readonly generatedName = injectId("radio-group");
  protected readonly labelId = injectId("radio-group-label");
  protected readonly helperId = injectId("radio-group-helper");
  private readonly field = injectFormField();

  protected readonly isDisabled = computed(
    () =>
      this.disabled() ??
      (this.formDisabled() || (this.field?.disabled() ?? false)),
  );
  protected readonly isRequired = computed(
    () => this.required() ?? this.field?.required() ?? false,
  );
  protected readonly isError = computed(
    () =>
      this.error() || this.controlInvalid() || (this.field?.invalid() ?? false),
  );
  /** The selected value (the bound value, else the default) */
  protected readonly selected = computed(() => {
    const value = this.value();
    return value !== undefined ? value : this.defaultValue();
  });
  protected readonly labelledBy = computed(() => {
    if (this.ariaLabelledby()) return this.ariaLabelledby()!;
    if (hasContent(this.label())) return this.labelId;
    if (!this.ariaLabel() && this.field) return this.field.labelId();
    return null;
  });
  protected readonly describedBy = computed(() => {
    const field = this.field;
    const ids = [
      hasContent(this.helperText()) ? this.helperId : null,
      field?.invalid() && field.hasErrorMessage() ? field.errorId() : null,
      field && !field.invalid() && field.hasHelperText()
        ? field.helperId()
        : null,
      this.ariaDescribedby(),
    ].filter(Boolean);
    return ids.length ? ids.join(" ") : null;
  });
  protected readonly rootClasses = computed(() =>
    cn(s.radioGroupWrapper, this.isError() && s.error),
  );
  protected readonly listClasses = computed(() =>
    cn(s.radioGroup, classOf(s, this.direction())),
  );
  protected readonly helperClasses = computed(() =>
    cn(s.helperText, this.isError() && s.errorText),
  );

  /** The state shared with the radios (MN_RADIO_GROUP) */
  readonly context: RadioGroupContext = {
    value: this.selected,
    name: computed(() => this.name() ?? this.generatedName),
    disabled: this.isDisabled,
    size: this.size,
    color: this.color,
    select: (value) => {
      if (this.isDisabled() || value === this.selected()) return;
      this.value.set(value);
      this.notifyChange(value);
    },
    touched: () => this.notifyTouched(),
  };

  override writeValue(value: RadioValue | null | undefined): void {
    this.value.set(value ?? null);
  }
}
