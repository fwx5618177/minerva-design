import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Injectable,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  viewChild,
} from "@angular/core";
import { cn } from "@minerva/core";
import { classOf } from "../../internal/classes";
import { hasContent, templateOf, type MnContent } from "../../internal/content";
import { emptyContent } from "../../internal/empty-content";
import { injectFormField } from "../../internal/forms";
import { MnHook } from "../../internal/hooks";
import { MnIcon } from "../../internal/icon";
import { injectId } from "../../internal/ids";
import { radioStyles as s } from "../../internal/styles";
import {
  MN_RADIO_GROUP,
  type RadioColor,
  type RadioSize,
  type RadioValue,
} from "./radio-group";

const optionalBoolean = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value);

/**
 * Standalone radios by name: checking one unchecks the bound `checked` of
 * the others with the same name (the browser unchecks their inputs without
 * an event), like Angular's own radio registry.
 */
@Injectable({ providedIn: "root" })
class MnRadioRegistry {
  private readonly radios = new Set<MnRadio>();

  add(radio: MnRadio): void {
    this.radios.add(radio);
  }

  remove(radio: MnRadio): void {
    this.radios.delete(radio);
  }

  checked(radio: MnRadio, name: string): void {
    for (const other of this.radios)
      if (other !== radio && other.groupName() === name) other.uncheck();
  }
}

/**
 * Radio: a native radio input with its label (`label` input or the projected
 * content) and an optional helper / error text. Same DOM, classes and
 * styling hooks as React's Radio (the host is the wrapper).
 *
 * Inside `<mn-radio-group>` the group drives its checked state, name, size,
 * color and disabled state (the group holds the value). A standalone radio
 * supports `[(checked)]` (`checkedChange` emits `true` when the user checks
 * it, `false` when another standalone radio of the same name is checked).
 *
 * @example
 * <mn-radio-group [(value)]="plan">
 *   <mn-radio value="free" label="Free" />
 *   <mn-radio value="pro">Pro</mn-radio>
 * </mn-radio-group>
 */
@Component({
  selector: "mn-radio",
  exportAs: "mnRadio",
  imports: [MnHook, MnIcon, NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClasses()",
    "data-minerva": "radio",
    "data-part": "root",
    "[attr.data-state]": "dataState()",
    "[attr.data-disabled]": "isDisabled() ? '' : null",
    "[attr.data-invalid]": "error() ? '' : null",
    "[attr.data-size]": "radioSize()",
    "[attr.data-color]": "radioColor()",
    "[attr.id]": "null",
    "[attr.aria-label]": "null",
    "[attr.aria-labelledby]": "null",
    "[attr.aria-describedby]": "null",
    "[attr.name]": "null",
    "[attr.value]": "null",
    "[attr.required]": "null",
    "[attr.disabled]": "null",
    "[attr.checked]": "null",
  },
  template: `
    <label [class]="labelClasses()">
      <input
        #input
        type="radio"
        [class]="s.input"
        [attr.name]="groupName() || null"
        [value]="value() ?? 'on'"
        [checked]="isChecked() ?? defaultChecked()"
        [disabled]="isDisabled()"
        [required]="required()"
        [attr.aria-label]="ariaLabel() ?? null"
        [attr.aria-labelledby]="ariaLabelledby() ?? null"
        [attr.id]="id() ?? null"
        [attr.aria-describedby]="describedBy()"
        (change)="onInputChange(input)"
        (blur)="group?.touched()"
        mnHook="radio"
        mnPart="input"
      />
      <span [class]="s.radioMark" mnHook="radio" mnPart="control"></span>
      <span
        #labelText
        [class]="s.label"
        [hidden]="labelEmpty()"
        mnHook="radio"
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
    @if (hasContent(helper())) {
      <div [class]="s.helperTextWrapper">
        @if (error() && hasContent(errorMessage())) {
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
          mnHook="radio"
          mnPart="helper-text"
        >
          @if (templateOf(helper()); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else {
            {{ helper() }}
          }
        </span>
      </div>
    }
  `,
})
export class MnRadio {
  /**
   * Whether the radio is checked (two-way: `[(checked)]`). Ignored inside a
   * RadioGroup
   */
  readonly checked = model<boolean | undefined>(undefined);
  /** Initial checked state when `checked` is not bound. Ignored inside a RadioGroup @default false */
  readonly defaultChecked = input(false, { transform: booleanAttribute });
  /**
   * Disables the radio. Inherited from an enclosing FormControl when not
   * set; an explicit `false` overrides the FormControl
   * @default false
   */
  readonly disabled = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Native name attribute. Inside a RadioGroup the group's name is used */
  readonly name = input<string | undefined>(undefined);
  /** Value of the radio; identifies it within a RadioGroup */
  readonly value = input<RadioValue | undefined>(undefined);
  /** Radio size. Overridden by the RadioGroup size when the group sets one @default "medium" */
  readonly size = input<RadioSize>("medium");
  /**
   * Semantic color of the checked radio. Overridden by the RadioGroup color
   * when the group sets one
   * @default "primary"
   */
  readonly color = input<RadioColor>("primary");
  /** Label displayed next to the radio (string or template); the projected content otherwise */
  readonly label = input<MnContent>(undefined);
  /** Accessible label, required when there is no visible label */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  /** id(s) of the element(s) labelling the radio */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });
  /** Id of the native `<input>` (e.g. for an external `<label for>`) */
  readonly id = input<string | undefined>(undefined);
  /** Extra ids describing the radio (merged with its helper / error text) */
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: "aria-describedby",
  });
  /** Marks the input as required @default false */
  readonly required = input(false, { transform: booleanAttribute });
  /**
   * Shows the error state (errorMessage replaces helperText and describes the radio)
   * @default false
   */
  readonly error = input(false, { transform: booleanAttribute });
  /** Icon shown before the error message @default a filled info-circle icon */
  readonly errorIcon = input<MnContent>(undefined);
  /** Message shown below the radio when error is true (linked with aria-describedby) */
  readonly errorMessage = input<MnContent>(undefined);
  /** Helper text shown below the radio (linked with aria-describedby) */
  readonly helperText = input<MnContent>(undefined);

  protected readonly s = s;
  protected readonly templateOf = templateOf;
  protected readonly hasContent = hasContent;
  protected readonly group = inject(MN_RADIO_GROUP, { optional: true });
  private readonly field = injectFormField();
  private readonly registry = inject(MnRadioRegistry);
  protected readonly helperId = injectId("radio-helper");

  private readonly ownDisabled = computed(
    () => this.disabled() ?? this.field?.disabled() ?? false,
  );
  protected readonly isDisabled = computed(
    () => (this.group?.disabled() ?? false) || this.ownDisabled(),
  );
  /** Checked state (`undefined`: a standalone radio left to the DOM) */
  protected readonly isChecked = computed<boolean | undefined>(() => {
    if (this.group) {
      const value = this.group.value();
      return value !== undefined && value !== null && value === this.value();
    }
    return this.checked();
  });
  /** Name of the native input (the group's inside a group) */
  readonly groupName = computed(
    () => (this.group ? this.group.name() : this.name()) ?? "",
  );
  protected readonly radioSize = computed(
    () => this.group?.size() || this.size(),
  );
  protected readonly radioColor = computed(
    () => this.group?.color() ?? this.color(),
  );
  protected readonly helper = computed(() =>
    this.error() ? this.errorMessage() : this.helperText(),
  );
  protected readonly describedBy = computed(
    () =>
      [hasContent(this.helper()) ? this.helperId : null, this.ariaDescribedby()]
        .filter(Boolean)
        .join(" ") || null,
  );
  protected readonly dataState = computed(() => {
    const checked = this.isChecked();
    return checked === undefined ? null : checked ? "checked" : "unchecked";
  });
  protected readonly rootClasses = computed(() =>
    cn(
      s.radioWrapper,
      classOf(s, this.radioSize()),
      classOf(s, this.radioColor()),
      this.error() && s.error,
    ),
  );
  protected readonly labelClasses = computed(() =>
    cn(s.radio, this.isDisabled() && s.disabled),
  );
  protected readonly helperClasses = computed(() =>
    cn(s.helperText, this.error() && s.errorText),
  );

  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>("input");
  private readonly labelRef = viewChild<ElementRef<HTMLElement>>("labelText");
  protected readonly labelEmpty = emptyContent(
    () => this.labelRef(),
    () => this.label(),
  );

  constructor() {
    this.registry.add(this);
    inject(DestroyRef).onDestroy(() => this.registry.remove(this));
  }

  protected onInputChange(input: HTMLInputElement): void {
    if (this.ownDisabled() || !input.checked) return;
    if (this.group) {
      const value = this.value();
      if (value !== undefined) this.group.select(value);
      // a rejected selection keeps the group's state
      input.checked = !!this.isChecked();
      return;
    }
    this.checked.set(true);
    const name = this.groupName();
    if (name) this.registry.checked(this, name);
  }

  /** @internal Another standalone radio of the same name was checked */
  uncheck(): void {
    if (!this.group && this.checked()) this.checked.set(false);
  }

  /** Focuses the native radio */
  focus(options?: FocusOptions): void {
    this.inputRef()?.nativeElement.focus(options);
  }
}
