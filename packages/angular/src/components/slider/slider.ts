import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
  output,
  signal,
} from "@angular/core";
import {
  closestSliderThumb,
  cn,
  getSliderKeyValue,
  getSliderMarks,
  isSliderMarkActive,
  normalizeSliderValue,
  setSliderThumb,
  sliderPercent,
  sliderValueFromRatio,
  sliderValues,
  sliderValuesEqual,
  type ColorScheme,
  type SliderMark,
  type SliderScale,
  type SliderValue,
} from "@minerva/core";
import { getDirection, logicalArrowKey } from "@minerva/dom";
import { injectScope } from "../../config/scope";
import {
  MnFormValueControl,
  fieldWiring,
  injectFormField,
  provideValueAccessor,
} from "../../internal/forms";
import { MnHook } from "../../internal/hooks";
import { classOf } from "../../internal/classes";
import { sliderStyles as s } from "../../internal/styles";

export type { SliderMark, SliderValue };
export type SliderSize = "small" | "medium" | "large";
export type SliderColor = Extract<
  ColorScheme,
  "primary" | "success" | "info" | "warning" | "danger"
>;
export type SliderOrientation = "horizontal" | "vertical";

const optionalBoolean = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value);

const optionalStep = (value: unknown): number | null =>
  value === null || value === "null" || value === "marks"
    ? null
    : numberAttribute(value, 1);

const defaultFormat = (v: number) => String(v);

/**
 * Slider: picks a number (or a `[start, end]` range with `range`) on a
 * track. Same DOM, classes and styling hooks as React's Slider (the host
 * element is `display: contents`). Each thumb is a `role="slider"`: arrows
 * step (mirrored in RTL), PageUp / PageDown move by 10%, Home / End jump to
 * the bounds; clicking the track moves the closest thumb.
 *
 * Two-way binding: `[(value)]`, `ngModel` or a Reactive Forms control
 * (ControlValueAccessor). `valueChange` follows the drag; `changeEnd` fires
 * once the interaction ends (pointer release, key press): save there.
 * Inside `<mn-form-control>` it takes the field's id, label, description,
 * invalid / read-only / disabled states.
 *
 * @example
 * <mn-slider aria-label="Volume" [(value)]="volume" (changeEnd)="save($event)" />
 * <mn-slider range [value]="[20, 80]" [marks]="true" [step]="10" />
 */
@Component({
  selector: "mn-slider",
  exportAs: "mnSlider",
  imports: [MnHook],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(() => MnSlider)],
  host: {
    style: "display: contents",
    "[attr.aria-label]": "null",
    "[attr.id]": "null",
  },
  template: `
    <div [class]="rootClasses()" mnHook="slider" [mnStates]="rootStates()">
      <div
        [class]="s.control"
        mnHook="slider"
        mnPart="control"
        (pointerdown)="onPointerDown($event)"
        (pointermove)="onPointerMove($event)"
        (pointerup)="onPointerEnd($event)"
        (pointercancel)="onPointerEnd($event)"
      >
        <span [class]="s.rail" mnHook="slider" mnPart="rail"></span>
        <span
          [class]="s.range"
          [style]="rangeStyle()"
          mnHook="slider"
          mnPart="range"
        ></span>
        @for (mark of markList(); track mark.value) {
          <span
            [class]="markClass(mark.value)"
            [style]="at(mark.value)"
            aria-hidden="true"
            mnHook="slider"
            mnPart="mark"
            [mnStates]="{
              state: markActive(mark.value) ? 'active' : 'inactive',
            }"
          >
            @if (mark.label) {
              <span
                [class]="markLabelClass(mark.value)"
                mnHook="slider"
                mnPart="mark-label"
                >{{ mark.label }}</span
              >
            }
          </span>
        }
        @for (v of values(); track $index) {
          <span
            [class]="thumbClass($index)"
            [style]="at(v)"
            [attr.data-index]="$index"
            role="slider"
            [attr.tabindex]="isDisabled() ? -1 : 0"
            [attr.id]="$index === 0 ? field.id() : null"
            [attr.aria-label]="labelOf($index)"
            [attr.aria-labelledby]="labelledBy()"
            [attr.aria-describedby]="field.describedBy()"
            [attr.aria-valuemin]="range() && $index === 1 ? values()[0] : min()"
            [attr.aria-valuemax]="range() && $index === 0 ? values()[1] : max()"
            [attr.aria-valuenow]="v"
            [attr.aria-valuetext]="valueText(v, $index)"
            [attr.aria-orientation]="orientation()"
            [attr.aria-disabled]="isDisabled() ? 'true' : null"
            [attr.aria-readonly]="field.readOnly() ? 'true' : null"
            [attr.aria-invalid]="field.invalid() ? 'true' : null"
            (keydown)="onKeyDown($event, $index)"
            (blur)="notifyTouched()"
            mnHook="slider"
            mnPart="thumb"
            [mnStates]="{
              dragging: dragging() === $index,
              disabled: isDisabled(),
            }"
          >
            @if (tooltip()) {
              <span
                [class]="s.tooltip"
                aria-hidden="true"
                mnHook="slider"
                mnPart="tooltip"
                >{{ format(v) }}</span
              >
            }
          </span>
        }
      </div>
      @if (showValue()) {
        <span
          [class]="s.value"
          aria-hidden="true"
          mnHook="slider"
          mnPart="value"
          >{{ valueLabel() }}</span
        >
      }
      @if (name()) {
        @for (v of values(); track $index) {
          <input
            type="hidden"
            [attr.name]="name()"
            [value]="v"
            [disabled]="isDisabled()"
            mnHook="slider"
            mnPart="input"
          />
        }
      }
    </div>
  `,
})
export class MnSlider extends MnFormValueControl<SliderValue | undefined> {
  /**
   * Value: a number, or `[start, end]` with `range`. Bound (`[value]`), the
   * parent owns it: a change only emits `valueChange` (two-way
   * `[(value)]`); unbound, the slider owns it (`defaultValue`)
   */
  readonly value = input<SliderValue | undefined>(undefined);
  /** The value changed (while dragging, on each key press) */
  readonly valueChange = output<SliderValue>();
  /** The interaction ended (pointer release, key press): the final value */
  readonly changeEnd = output<SliderValue>();
  /** Initial value when `value` is not bound (min, or [min, max] with range) */
  readonly defaultValue = input<SliderValue | undefined>(undefined);
  /** Two thumbs selecting `[start, end]` @default false */
  readonly range = input(false, { transform: booleanAttribute });
  /** @default 0 */
  readonly min = input(0, { transform: numberAttribute });
  /** @default 100 */
  readonly max = input(100, { transform: numberAttribute });
  /** Step between two values; `null` snaps to the marks only @default 1 */
  readonly step = input<number | null, unknown>(1, { transform: optionalStep });
  /** Ticks of the scale: `{ value, label? }[]`, or `true` for one tick per step */
  readonly marks = input<SliderMark[] | boolean>(false);
  /** Snaps the value to the closest mark @default false */
  readonly snapToMarks = input(false, { transform: booleanAttribute });
  /** Disables the slider (an explicit `false` opts out of the field's disabled state) */
  readonly disabled = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Focusable, but the user cannot change the value @default false */
  readonly readOnly = input(false, { transform: booleanAttribute });
  /** Standalone error state */
  readonly invalid = input(false, { transform: booleanAttribute });
  /** @default "medium" */
  readonly size = input<SliderSize>("medium");
  /** @default "primary" */
  readonly color = input<SliderColor>("primary");
  /** Shows the value after the track @default false */
  readonly showValue = input(false, { transform: booleanAttribute });
  /** Value bubble above a thumb while dragged, hovered or focused @default false */
  readonly tooltip = input(false, { transform: booleanAttribute });
  /** Formats a value for the value label, the tooltip and aria-valuetext */
  readonly formatValue = input<((value: number) => string) | undefined>(
    undefined,
  );
  /** @default "horizontal" */
  readonly orientation = input<SliderOrientation>("horizontal");
  /** Name of the hidden input(s) (native forms) */
  readonly name = input<string | undefined>(undefined);
  /** id of the first thumb (default: the field's) */
  readonly id = input<string | undefined>(undefined);
  /** Accessible label of the thumbs */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: "aria-describedby",
  });
  /** aria-valuetext of a thumb (index 0, or 1 for the end thumb of a range) */
  readonly getAriaValueText = input<
    ((value: number, index: number) => string) | undefined
  >(undefined);

  protected readonly s = s;
  private readonly scope = injectScope();
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly fieldContext = injectFormField();
  protected readonly field = fieldWiring(this.fieldContext, {
    id: () => this.id(),
    describedBy: () => this.ariaDescribedby(),
    invalid: () => this.invalid() || this.controlInvalid(),
    readOnly: () => this.readOnly(),
  });
  protected readonly isDisabled = computed(
    () =>
      this.disabled() ??
      (this.formDisabled() || (this.fieldContext?.disabled() ?? false)),
  );
  protected readonly blocked = computed(
    () => this.isDisabled() || this.field.readOnly(),
  );

  private readonly internal = signal<SliderValue | undefined>(undefined);
  protected readonly dragging = signal<number | null>(null);
  /** Latest value of the interaction (a bound parent may lag) */
  private latest: SliderValue | null = null;

  protected readonly markList = computed(() =>
    getSliderMarks(this.marks(), this.min(), this.max(), this.step()),
  );
  private readonly scale = computed<SliderScale>(() => ({
    min: this.min(),
    max: this.max(),
    step: this.step(),
    marks: this.markList(),
    snapToMarks: this.snapToMarks(),
  }));
  protected readonly current = computed(() =>
    normalizeSliderValue(
      this.value() ??
        this.formValue() ??
        this.internal() ??
        this.defaultValue(),
      this.range(),
      this.scale(),
    ),
  );
  protected readonly values = computed(() => sliderValues(this.current()));
  protected readonly vertical = computed(
    () => this.orientation() === "vertical",
  );
  protected readonly labelledBy = computed(
    () =>
      this.ariaLabelledby() ??
      (this.fieldContext && !this.ariaLabel()
        ? this.fieldContext.labelId()
        : null),
  );
  protected readonly valueLabel = computed(() =>
    this.values()
      .map((v) => this.format(v))
      .join(" – "),
  );
  protected readonly rangeStyle = computed(() => {
    const list = this.values();
    const start = this.range() ? this.position(list[0]) : 0;
    const end = this.position(list[list.length - 1]);
    return this.vertical()
      ? { bottom: `${start}%`, height: `${end - start}%` }
      : { "inset-inline-start": `${start}%`, width: `${end - start}%` };
  });
  protected readonly rootStates = computed(() => ({
    disabled: this.isDisabled(),
    readonly: this.field.readOnly(),
    invalid: this.field.invalid(),
    dragging: this.dragging() !== null,
    size: this.size(),
    color: this.color(),
    orientation: this.orientation(),
    variant: this.range() ? "range" : "single",
  }));
  protected readonly rootClasses = computed(() =>
    cn(s.slider, classOf(s, this.size()), s[this.color()], {
      [s.vertical]: this.vertical(),
      [s.labelled]: this.markList().some((m) => m.label),
      [s.disabled]: this.isDisabled(),
      [s.readOnly]: this.field.readOnly(),
      [s.dragging]: this.dragging() !== null,
    }),
  );

  protected override fromForm(value: unknown): SliderValue | undefined {
    if (Array.isArray(value)) return [Number(value[0]), Number(value[1])];
    return value === null || value === undefined ? undefined : Number(value);
  }

  protected format(v: number): string {
    return (this.formatValue() ?? defaultFormat)(v);
  }

  protected valueText(v: number, index: number): string {
    const custom = this.getAriaValueText();
    return custom ? custom(v, index) : this.format(v);
  }

  protected labelOf(index: number): string | null {
    const label = this.ariaLabel();
    if (!this.range()) return label ?? null;
    const suffix = this.scope.t(
      index === 0 ? "slider.minimum" : "slider.maximum",
    );
    return label ? `${label} ${suffix}` : suffix;
  }

  private position(v: number): number {
    return sliderPercent(v, this.min(), this.max());
  }

  protected at(v: number): Record<string, string> {
    const percent = `${this.position(v)}%`;
    return this.vertical()
      ? { bottom: percent }
      : { "inset-inline-start": percent };
  }

  protected markActive(mark: number): boolean {
    return isSliderMarkActive(mark, this.current());
  }

  protected markClass(mark: number): string {
    return cn(s.mark, this.markActive(mark) && s.markActive);
  }

  protected markLabelClass(mark: number): string {
    return cn(
      s.markLabel,
      mark <= this.min() && s.markLabelStart,
      mark >= this.max() && s.markLabelEnd,
    );
  }

  protected thumbClass(index: number): string {
    return cn(s.thumb, this.dragging() === index && s.thumbDragging);
  }

  private now(): SliderValue {
    return this.latest ?? this.current();
  }

  private setValue(next: SliderValue): boolean {
    if (sliderValuesEqual(next, this.now())) return false;
    this.latest = next;
    this.internal.set(next);
    this.valueChange.emit(next);
    this.notifyChange(next);
    return true;
  }

  private control(event: Event): HTMLElement {
    return event.currentTarget as HTMLElement;
  }

  private valueAtPointer(event: PointerEvent): number {
    const control = this.control(event);
    const rect = control.getBoundingClientRect();
    let ratio: number;
    if (this.vertical()) {
      ratio = rect.height ? (rect.bottom - event.clientY) / rect.height : 0;
    } else {
      ratio = rect.width ? (event.clientX - rect.left) / rect.width : 0;
      if (getDirection(control) === "rtl") ratio = 1 - ratio;
    }
    return sliderValueFromRatio(ratio, this.scale());
  }

  protected onPointerDown(event: PointerEvent): void {
    if (this.blocked() || event.button !== 0) return;
    event.preventDefault();
    this.latest = null;
    const pointed = this.valueAtPointer(event);
    const thumbIndex = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-index]",
    )?.dataset["index"];
    const index =
      thumbIndex !== undefined
        ? Number(thumbIndex)
        : closestSliderThumb(this.now(), pointed);
    this.control(event).setPointerCapture?.(event.pointerId);
    this.dragging.set(index);
    this.host.nativeElement
      .querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.focus();
    if (thumbIndex === undefined)
      this.setValue(setSliderThumb(this.now(), index, pointed));
  }

  protected onPointerMove(event: PointerEvent): void {
    const index = this.dragging();
    if (index === null) return;
    this.setValue(
      setSliderThumb(this.now(), index, this.valueAtPointer(event)),
    );
  }

  protected onPointerEnd(event: PointerEvent): void {
    if (this.dragging() === null) return;
    const control = this.control(event);
    if (control.hasPointerCapture?.(event.pointerId))
      control.releasePointerCapture(event.pointerId);
    this.dragging.set(null);
    this.changeEnd.emit(this.now());
    this.latest = null;
  }

  protected onKeyDown(event: KeyboardEvent, index: number): void {
    if (this.blocked()) return;
    const key = this.vertical()
      ? event.key
      : logicalArrowKey(event.key, event.currentTarget as Element);
    const next = getSliderKeyValue(key, this.values()[index], this.scale());
    if (next === null) return;
    event.preventDefault();
    this.latest = null;
    if (this.setValue(setSliderThumb(this.now(), index, next)))
      this.changeEnd.emit(this.now());
    this.latest = null;
  }

  /** Focuses the first thumb */
  focus(options?: FocusOptions): void {
    this.host.nativeElement
      .querySelector<HTMLElement>('[role="slider"]')
      ?.focus(options);
  }
}
