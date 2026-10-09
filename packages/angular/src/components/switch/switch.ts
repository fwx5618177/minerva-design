import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";
import { cn, createSwitchMachine, type ColorScheme } from "@minerva/core";
import { hasContent, templateOf, type MnContent } from "../../internal/content";
import {
  MnFormValueControl,
  fieldWiring,
  injectFormField,
  provideValueAccessor,
} from "../../internal/forms";
import { MnHook } from "../../internal/hooks";
import { classOf } from "../../internal/classes";
import { connectMachine } from "../../internal/machine";
import { switchStyles as s } from "../../internal/styles";

export type SwitchSize = "small" | "medium" | "large";
export type SwitchColor = Extract<
  ColorScheme,
  "primary" | "success" | "info" | "warning" | "danger"
>;
export type SwitchLabelPlacement = "start" | "end" | "top" | "bottom";

const RIPPLE_DURATION = 400;

const PLACEMENT = {
  start: s.labelStart,
  end: s.labelEnd,
  top: s.labelTop,
  bottom: s.labelBottom,
} as const;

const optionalBoolean = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value);

/**
 * Switch: toggles between two states. A native checkbox with `role="switch"`
 * (Space and Enter toggle), optional side labels (`offLabel` / `onLabel`) or a
 * two-segment control (`variant="segmented"`). Same DOM, classes and styling
 * hooks as React's Switch (the host element is `display: contents`).
 *
 * Two-way binding: `[(checked)]`, `ngModel` or a Reactive Forms control
 * (ControlValueAccessor; `checkedChange` / the form value report user
 * toggles). Inside `<mn-form-control>` it takes the field's id, description,
 * invalid / required / read-only / disabled states.
 *
 * @example
 * <mn-switch label="Wi-Fi" [(checked)]="wifi" />
 * <mn-switch formControlName="notifications" offLabel="Off" onLabel="On" />
 */
@Component({
  selector: "mn-switch",
  exportAs: "mnSwitch",
  imports: [MnHook, NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(() => MnSwitch)],
  host: {
    style: "display: contents",
    "[attr.aria-label]": "null",
    "[attr.id]": "null",
  },
  template: `
    <ng-template #inputTpl>
      <input
        #input
        type="checkbox"
        [attr.role]="segmented() ? null : 'switch'"
        [class]="segmented() ? s.hiddenInput : ''"
        [attr.id]="segmented() ? null : field.id()"
        [attr.name]="name() ?? null"
        [attr.value]="value() ?? null"
        [attr.aria-label]="segmented() ? null : (ariaLabel() ?? null)"
        [attr.aria-labelledby]="segmented() ? null : (ariaLabelledby() ?? null)"
        [attr.aria-checked]="segmented() ? null : state().checked"
        [attr.aria-disabled]="
          segmented() ? null : isDisabled() || loading() ? 'true' : null
        "
        [attr.aria-busy]="loading() ? 'true' : null"
        [attr.aria-invalid]="segmented() || !field.invalid() ? null : 'true'"
        [attr.aria-required]="segmented() || !field.required() ? null : 'true'"
        [attr.aria-readonly]="segmented() || !field.readOnly() ? null : 'true'"
        [attr.aria-describedby]="segmented() ? null : field.describedBy()"
        [attr.aria-hidden]="segmented() ? 'true' : null"
        [attr.tabindex]="segmented() ? -1 : null"
        [checked]="state().checked"
        [disabled]="isDisabled() || loading()"
        (change)="onInputChange(input)"
        (click)="onInputClick($event)"
        (keydown)="onKeyDown($event, input)"
        (blur)="notifyTouched()"
        mnHook="switch"
        mnPart="input"
      />
    </ng-template>
    <ng-template #iconTpl>
      <span [class]="s.icon" mnHook="switch" mnPart="icon">
        @if (templateOf(icon()); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else {
          {{ icon() }}
        }
      </span>
    </ng-template>
    <ng-template #control>
      <span [class]="s.switchBase" mnHook="switch" mnPart="control">
        <ng-container [ngTemplateOutlet]="inputTpl" />
        <span [class]="s.track" mnHook="switch" mnPart="track"></span>
        <span [class]="s.thumb" mnHook="switch" mnPart="thumb">
          @if (iconPlacement() === "start" && hasContent(icon())) {
            <ng-container [ngTemplateOutlet]="iconTpl" />
          }
        </span>
        @if (ripple()) {
          <span [class]="s.rippleEffect"></span>
        }
      </span>
    </ng-template>
    <ng-template #sideLabel let-on>
      @if (templateOf(on ? onLabel() : offLabel()); as tpl) {
        <ng-container [ngTemplateOutlet]="tpl" />
      } @else {
        {{ on ? onLabel() : offLabel() }}
      }
    </ng-template>

    @if (segmented()) {
      <span
        role="group"
        [attr.id]="field.id()"
        [attr.aria-label]="ariaLabel() ?? null"
        [attr.aria-labelledby]="groupLabelledby()"
        [attr.aria-describedby]="field.describedBy()"
        [attr.aria-disabled]="blocked() ? 'true' : null"
        [class]="segmentedClasses()"
        mnHook="switch"
        [mnStates]="rootStates()"
      >
        <ng-container [ngTemplateOutlet]="inputTpl" />
        @for (on of [false, true]; track on) {
          <button
            type="button"
            [class]="segmentClass(on)"
            [disabled]="blocked()"
            [attr.aria-pressed]="state().checked === on"
            (click)="setState(on)"
            mnHook="switch"
            mnPart="segment"
          >
            <ng-container
              [ngTemplateOutlet]="sideLabel"
              [ngTemplateOutletContext]="{ $implicit: on }"
            />
          </button>
        }
      </span>
    } @else if (bilateral()) {
      <span [class]="switchClasses()" mnHook="switch" [mnStates]="rootStates()">
        <ng-container
          [ngTemplateOutlet]="side"
          [ngTemplateOutletContext]="{ $implicit: false }"
        />
        <ng-container [ngTemplateOutlet]="control" />
        <ng-container
          [ngTemplateOutlet]="side"
          [ngTemplateOutletContext]="{ $implicit: true }"
        />
        @if (iconPlacement() === "end" && hasContent(icon())) {
          <ng-container [ngTemplateOutlet]="iconTpl" />
        }
      </span>
    } @else {
      <label
        [class]="switchClasses()"
        mnHook="switch"
        [mnStates]="rootStates()"
      >
        @if (labelFirst() && hasContent(label())) {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
        <ng-container [ngTemplateOutlet]="control" />
        @if (iconPlacement() === "end" && hasContent(icon())) {
          <ng-container [ngTemplateOutlet]="iconTpl" />
        }
        @if (!labelFirst() && hasContent(label())) {
          <ng-container [ngTemplateOutlet]="labelTpl" />
        }
      </label>
    }
    <ng-template #side let-on>
      <button
        type="button"
        [class]="sideClass(on)"
        [disabled]="blocked()"
        (click)="setState(on)"
        mnHook="switch"
        mnPart="side"
      >
        <ng-container
          [ngTemplateOutlet]="sideLabel"
          [ngTemplateOutletContext]="{ $implicit: on }"
        />
      </button>
    </ng-template>
    <ng-template #labelTpl>
      <span [class]="s.label" mnHook="switch" mnPart="label">
        @if (templateOf(label()); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else {
          {{ label() }}
        }
      </span>
    </ng-template>
  `,
})
export class MnSwitch extends MnFormValueControl<boolean> {
  /**
   * Checked state. Bound (`[checked]`), the parent owns it: a toggle only
   * emits `checkedChange` (two-way `[(checked)]` accepts it, React's
   * controlled mode); unbound, the switch owns its state (`defaultChecked`)
   */
  readonly checked = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** The user toggled the switch (the requested state) */
  readonly checkedChange = output<boolean>();
  /** Initial state when `checked` is not bound @default false */
  readonly defaultChecked = input(false, { transform: booleanAttribute });
  /** Disables the switch (an explicit `false` opts out of the field's disabled state) */
  readonly disabled = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Standalone validation and form states. */
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly readOnly = input(false, { transform: booleanAttribute });
  /** @default "medium" */
  readonly size = input<SwitchSize>("medium");
  /** @default "primary" */
  readonly color = input<SwitchColor>("primary");
  /** @default "round" */
  readonly shape = input<"round" | "square">("round");
  /** "segmented" (with offLabel and onLabel) renders two segments @default "slider" */
  readonly variant = input<"slider" | "segmented">("slider");
  /** Label text (or template); the content of the switch otherwise */
  readonly label = input<MnContent>(undefined);
  /** Label of the off side / segment */
  readonly offLabel = input<MnContent>(undefined);
  /** Label of the on side / segment */
  readonly onLabel = input<MnContent>(undefined);
  /** Accessible label (no visible label) */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: "aria-describedby",
  });
  /** Name of the native checkbox (native forms) */
  readonly name = input<string | undefined>(undefined);
  /** id of the native checkbox (default: the field's) */
  readonly id = input<string | undefined>(undefined);
  /** Value submitted by native forms when checked */
  readonly value = input<string | undefined>(undefined);
  /** @default "end" */
  readonly labelPlacement = input<SwitchLabelPlacement>("end");
  /** Shows a busy state and blocks toggling @default false */
  readonly loading = input(false, { transform: booleanAttribute });
  /** Ripple feedback on toggle @default true */
  readonly ripple = input(true, { transform: booleanAttribute });
  /** Icon (string or template) in the thumb or after the slider */
  readonly icon = input<MnContent>(undefined);
  /** @default "start" */
  readonly iconPlacement = input<"start" | "end">("start");

  protected readonly s = s;
  protected readonly templateOf = templateOf;
  protected readonly hasContent = hasContent;
  private readonly fieldContext = injectFormField();
  protected readonly field = fieldWiring(this.fieldContext, {
    id: () => this.id(),
    describedBy: () => this.ariaDescribedby(),
    invalid: () => this.invalid() || this.controlInvalid(),
    required: () => this.required(),
    readOnly: () => this.readOnly(),
  });
  protected readonly isDisabled = computed(
    () =>
      this.disabled() ??
      (this.formDisabled() || (this.fieldContext?.disabled() ?? false)),
  );
  protected readonly blocked = computed(
    () => this.isDisabled() || this.loading() || this.field.readOnly(),
  );

  private readonly machine = connectMachine(
    () =>
      createSwitchMachine({
        defaultChecked: this.defaultChecked(),
        onCheckedChange: (checked) => {
          this.checkedChange.emit(checked);
          this.notifyChange(checked);
        },
      }),
    () => ({
      checked: this.checked() ?? this.formValue(),
      disabled: this.blocked(),
    }),
  );
  protected readonly state = this.machine.state;

  private readonly rippleActive = signal(false);
  private rippleTimer: ReturnType<typeof setTimeout> | undefined;
  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>("input");

  protected readonly bilateral = computed(
    () => hasContent(this.offLabel()) && hasContent(this.onLabel()),
  );
  protected readonly segmented = computed(
    () => this.variant() === "segmented" && this.bilateral(),
  );
  protected readonly labelFirst = computed(
    () => this.labelPlacement() === "start" || this.labelPlacement() === "top",
  );
  protected readonly groupLabelledby = computed(
    () =>
      this.ariaLabelledby() ??
      (this.fieldContext && !this.ariaLabel()
        ? this.fieldContext.labelId()
        : null),
  );
  protected readonly rootStates = computed(() => ({
    state: this.state().checked ? "checked" : "unchecked",
    disabled: this.isDisabled(),
    loading: this.loading(),
    invalid: this.field.invalid(),
    readonly: this.field.readOnly(),
    required: this.field.required(),
    size: this.size(),
    color: this.color(),
    shape: this.shape(),
    variant: this.segmented() ? "segmented" : "slider",
  }));
  protected readonly switchClasses = computed(() => {
    const checked = this.state().checked;
    return cn(
      s.switch,
      classOf(s, this.size()),
      !this.bilateral() && PLACEMENT[this.labelPlacement()],
      s[this.color()],
      {
        [s.checked]: checked,
        [s.checkedLarge]: checked && this.size() === "large",
        [s.disabled]: this.isDisabled(),
        [s.loading]: this.loading(),
        [s.square]: this.shape() === "square",
        [s.ripple]: this.ripple() && this.rippleActive(),
        [s.bilateral]: this.bilateral(),
      },
    );
  });
  protected readonly segmentedClasses = computed(() =>
    cn(
      s.segmented,
      classOf(s, this.size()),
      s[this.color()],
      this.blocked() && s.disabled,
    ),
  );

  constructor() {
    super();
    inject(DestroyRef).onDestroy(() => clearTimeout(this.rippleTimer));
  }

  protected override fromForm(value: unknown): boolean {
    return !!value;
  }

  protected sideClass(on: boolean): string {
    return cn(s.side, this.state().checked === on && s.sideActive);
  }

  protected segmentClass(on: boolean): string {
    return cn(s.segment, this.state().checked === on && s.segmentActive);
  }

  protected onInputChange(input: HTMLInputElement): void {
    if (!this.blocked())
      this.machine.send({ type: "SET", checked: input.checked });
    // the native box flipped: show the kept state (blocked / unchanged)
    input.checked = this.state().checked;
  }

  protected onInputClick(event: MouseEvent): void {
    if (this.field.readOnly()) {
      event.preventDefault();
      return;
    }
    if (!this.ripple() || this.blocked()) return;
    clearTimeout(this.rippleTimer);
    this.rippleActive.set(true);
    this.rippleTimer = setTimeout(
      () => this.rippleActive.set(false),
      RIPPLE_DURATION,
    );
  }

  /** Native checkboxes toggle on Space only; the switch pattern also allows Enter */
  protected onKeyDown(event: KeyboardEvent, input: HTMLInputElement): void {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (!this.blocked()) input.click();
  }

  /** Side labels / segments set a state through the native input */
  protected setState(next: boolean): void {
    if (this.blocked() || next === this.state().checked) return;
    this.inputRef()?.nativeElement.click();
  }

  /** Focuses the native control */
  focus(options?: FocusOptions): void {
    this.inputRef()?.nativeElement.focus(options);
  }
}
