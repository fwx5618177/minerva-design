import { css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  closestSliderThumb,
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
import styles from "@react-styles/components/Slider/slider.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { FormAssociatedElement } from "../../internal/form";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { itemParts } from "../../internal/styling-hooks";
import { sharedStyles } from "../../internal/styles";

export type { SliderMark, SliderValue };
export type SliderSize = "small" | "medium" | "large";
export type SliderColor = Extract<
  ColorScheme,
  "primary" | "success" | "info" | "warning" | "danger"
>;
export type SliderOrientation = "horizontal" | "vertical";

/** `value` attribute: "30", or "20,80" for a range */
const valueConverter = {
  fromAttribute(text: string | null): SliderValue | undefined {
    if (text === null || text.trim() === "") return undefined;
    const parts = text.split(",").map((part) => Number(part.trim()));
    return parts.length >= 2 ? [parts[0], parts[1]] : parts[0];
  },
  toAttribute(value: SliderValue | undefined): string | null {
    if (value === undefined) return null;
    return Array.isArray(value) ? value.join(",") : String(value);
  },
};

/** `step` attribute: a number, or "null" / "marks" (snap to the marks only) */
const stepConverter = {
  fromAttribute(text: string | null): number | null {
    if (text === null) return 1;
    const n = Number(text);
    return text.trim() === "" || !Number.isFinite(n) ? null : n;
  },
  toAttribute(value: number | null): string {
    return value === null ? "null" : String(value);
  },
};

/** `marks` attribute: present for one tick per step, or a JSON array */
const marksConverter = {
  fromAttribute(text: string | null): SliderMark[] | boolean {
    if (text === null) return false;
    const trimmed = text.trim();
    if (trimmed.startsWith("[")) {
      try {
        return JSON.parse(trimmed) as SliderMark[];
      } catch {
        return false;
      }
    }
    return trimmed !== "false";
  },
};

const defaultFormat = (v: number) => String(v);

/**
 * Picks a number, or a `[start, end]` range with `range`, on a track
 * (`<Slider>` of React). Each thumb is a `role="slider"`: ArrowRight /
 * ArrowUp add a step (ArrowLeft increases in RTL), PageUp / PageDown move by
 * 10%, Home / End jump to the bounds. Clicking the track moves the closest
 * thumb there; dragging captures the pointer.
 *
 * Form-associated: submits the value under `name` (a range submits two
 * entries); supports `form.reset()` (restores the `value` attribute),
 * `<fieldset disabled>` and state restoration.
 *
 * @summary Range input with one or two thumbs, marks, value label and tooltip.
 * @tag minerva-slider
 * @csspart root - The outermost element
 * @csspart control - The interactive area holding the rail, the marks and the thumbs
 * @csspart rail - The full-length track
 * @csspart range - The filled part of the track (up to the value, or between the thumbs)
 * @csspart thumb - A thumb (`role=slider`)
 * @csspart thumb--dragging - Item state of `thumb`: dragged
 * @csspart thumb--disabled - Item state of `thumb`: disabled
 * @csspart tooltip - The value bubble of a thumb (with `tooltip`, while dragging or focused)
 * @csspart mark - A tick of the scale
 * @csspart mark--active - Item state of `mark`: inside the filled range
 * @csspart mark--inactive - Item state of `mark`: outside the filled range
 * @csspart mark-label - The label of a mark
 * @csspart value - The inline value label (with `show-value`)
 * @fires input - The value changed while dragging or with a key (native-like)
 * @fires change - The interaction ended (native-like)
 * @fires minerva-change - The value changed (while dragging, on each key press); `detail: { value }`
 * @fires minerva-change-end - The interaction ended (pointer release, key press): save here; `detail: { value }`
 */
export class MinervaSlider extends FormAssociatedElement {
  static override tagName = "minerva-slider";
  static override shadowRootOptions = {
    ...FormAssociatedElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }
      :host([orientation="vertical"]) {
        display: inline-block;
        width: auto;
      }
    `,
    sharedStyles(styles),
  ];

  /** Value: a number, or `[start, end]` with `range` (property; the `value` attribute sets `defaultValue`) */
  @property({ attribute: false })
  value: SliderValue | undefined = undefined;

  /** Initial value, restored by `form.reset()` (the `value` attribute: "30" or "20,80") */
  @property({ attribute: "value", converter: valueConverter })
  defaultValue: SliderValue | undefined = undefined;

  /** Two thumbs selecting `[start, end]`; the thumbs cannot cross */
  @property({ type: Boolean, reflect: true })
  range = false;

  /** Smallest value */
  @property({ type: Number })
  min = 0;

  /** Largest value */
  @property({ type: Number })
  max = 100;

  /** Step between two values; `null` (attribute "null") snaps to the marks only */
  @property({ converter: stepConverter })
  step: number | null = 1;

  /** Ticks of the scale: `{ value, label? }[]` (property or JSON attribute), or `true` (empty attribute) for one tick per step */
  @property({ converter: marksConverter })
  marks: SliderMark[] | boolean = false;

  /** Snaps the value to the closest mark (instead of the step) */
  @property({ type: Boolean, attribute: "snap-to-marks" })
  snapToMarks = false;

  /** Focusable and submitted, but the user cannot change the value */
  @property({ type: Boolean, reflect: true, attribute: "readonly" })
  readOnly = false;

  /** Error state (aria-invalid) */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /** Thumb and track size */
  @property({ reflect: true })
  size: SliderSize = "medium";

  /** Semantic color of the filled track and the thumbs */
  @property({ reflect: true })
  color: SliderColor = "primary";

  /** Shows the value after the track */
  @property({ type: Boolean, attribute: "show-value" })
  showValue = false;

  /** Shows the value in a bubble above a thumb while it is dragged, hovered or focused */
  @property({ type: Boolean })
  tooltip = false;

  /** Direction of the track */
  @property({ reflect: true })
  orientation: SliderOrientation = "horizontal";

  /** Formats a value for the value label, the tooltip and aria-valuetext (property) */
  @property({ attribute: false })
  formatValue: ((value: number) => string) | undefined = undefined;

  /** aria-valuetext of a thumb, index 0 or 1 (property; defaults to formatValue) */
  @property({ attribute: false })
  getAriaValueText: ((value: number, index: number) => string) | undefined =
    undefined;

  @state()
  private dragging: number | null = null;

  @query(".control")
  private control!: HTMLElement;

  private dirty = false;
  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);

  private get scale(): SliderScale {
    return {
      min: this.min,
      max: this.max,
      step: this.step,
      marks: getSliderMarks(this.marks, this.min, this.max, this.step),
      snapToMarks: this.snapToMarks,
    };
  }

  /** The value, clamped and snapped (a pair with `range`) */
  private get resolvedValue(): SliderValue {
    return normalizeSliderValue(this.value, this.range, this.scale);
  }

  private get blocked(): boolean {
    return this.isDisabled || this.readOnly;
  }

  override focus(options?: FocusOptions): void {
    this.renderRoot
      .querySelector<HTMLElement>('[role="slider"]')
      ?.focus(options);
  }

  override blur(): void {
    (this.shadowRoot?.activeElement as HTMLElement | null)?.blur();
  }

  protected getFormValue(): string | FormData | null {
    const value = this.resolvedValue;
    if (!Array.isArray(value)) return String(value);
    if (!this.name) return null;
    const data = new FormData();
    for (const v of value) data.append(this.name, String(v));
    return data;
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.value = this.defaultValue;
  }

  protected override restoreFormState(
    state: string | File | FormData | null,
  ): void {
    if (typeof state === "string") this.value = Number(state);
    else if (state instanceof FormData && this.name) {
      const [a, b] = state.getAll(this.name).map(Number);
      this.value = [a, b];
    }
  }

  protected override willUpdate(changed: Map<PropertyKey, unknown>): void {
    // the value attribute seeds the value until the user changes it
    if (changed.has("defaultValue") && !this.dirty) {
      this.value = this.defaultValue;
    }
  }

  private format(v: number): string {
    return (this.formatValue ?? defaultFormat)(v);
  }

  private setValue(next: SliderValue): boolean {
    if (sliderValuesEqual(next, this.resolvedValue)) return false;
    this.dirty = true;
    this.value = next;
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.emit("minerva-change", { value: next });
    return true;
  }

  private commit() {
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change-end", { value: this.resolvedValue });
  }

  private valueAtPointer(event: PointerEvent): number {
    const rect = this.control.getBoundingClientRect();
    let ratio: number;
    if (this.orientation === "vertical") {
      ratio = rect.height ? (rect.bottom - event.clientY) / rect.height : 0;
    } else {
      ratio = rect.width ? (event.clientX - rect.left) / rect.width : 0;
      if (getDirection(this) === "rtl") ratio = 1 - ratio;
    }
    return sliderValueFromRatio(ratio, this.scale);
  }

  private handlePointerDown(event: PointerEvent) {
    if (this.blocked || event.button !== 0) return;
    event.preventDefault();
    const pointed = this.valueAtPointer(event);
    const thumbIndex = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-index]",
    )?.dataset.index;
    const index =
      thumbIndex !== undefined
        ? Number(thumbIndex)
        : closestSliderThumb(this.resolvedValue, pointed);
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    this.dragging = index;
    this.renderRoot
      .querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.focus();
    if (thumbIndex === undefined)
      this.setValue(setSliderThumb(this.resolvedValue, index, pointed));
  }

  private handlePointerMove(event: PointerEvent) {
    if (this.dragging === null) return;
    this.setValue(
      setSliderThumb(
        this.resolvedValue,
        this.dragging,
        this.valueAtPointer(event),
      ),
    );
  }

  private handlePointerEnd(event: PointerEvent) {
    if (this.dragging === null) return;
    const target = event.currentTarget as HTMLElement;
    if (target.hasPointerCapture?.(event.pointerId))
      target.releasePointerCapture(event.pointerId);
    this.dragging = null;
    this.commit();
  }

  private handleKeyDown(event: KeyboardEvent, index: number) {
    if (this.blocked) return;
    const key =
      this.orientation === "vertical"
        ? event.key
        : logicalArrowKey(event.key, this);
    const values = sliderValues(this.resolvedValue);
    const next = getSliderKeyValue(key, values[index], this.scale);
    if (next === null) return;
    event.preventDefault();
    if (this.setValue(setSliderThumb(this.resolvedValue, index, next)))
      this.commit();
  }

  protected override hookStates() {
    return {
      disabled: this.isDisabled,
      readonly: this.readOnly,
      invalid: this.invalid || this.aria.attr("aria-invalid") === "true",
      dragging: this.dragging !== null,
      size: this.size,
      color: this.color,
      orientation: this.orientation,
      variant: this.range ? "range" : "single",
    };
  }

  private labelOf(index: number): string | undefined {
    const label = this.aria.label;
    if (!this.range) return label;
    const suffix = this.locale.t(
      index === 0 ? "slider.minimum" : "slider.maximum",
    );
    return label ? `${label} ${suffix}` : suffix;
  }

  protected override render() {
    const value = this.resolvedValue;
    const values = sliderValues(value);
    const { min, max, orientation } = this;
    const vertical = orientation === "vertical";
    const marks = getSliderMarks(this.marks, min, max, this.step);
    const disabled = this.isDisabled;
    const invalid = this.invalid || this.aria.attr("aria-invalid") === "true";
    const position = (v: number) => sliderPercent(v, min, max);
    const at = (percent: number) =>
      styleMap(
        vertical
          ? { bottom: `${percent}%` }
          : { "inset-inline-start": `${percent}%` },
      );
    const start = this.range ? position(values[0]) : 0;
    const end = position(values[values.length - 1]);
    const rangeStyle = styleMap(
      vertical
        ? { bottom: `${start}%`, height: `${end - start}%` }
        : { "inset-inline-start": `${start}%`, width: `${end - start}%` },
    );

    return html`<div
      part="root"
      class=${classMap({
        slider: true,
        [this.size]: true,
        [this.color]: true,
        vertical,
        labelled: marks.some((m) => m.label),
        disabled,
        readOnly: this.readOnly,
        dragging: this.dragging !== null,
      })}
    >
      <div
        part="control"
        class="control"
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerEnd}
        @pointercancel=${this.handlePointerEnd}
      >
        <span part="rail" class="rail"></span>
        <span part="range" class="range" style=${rangeStyle}></span>
        ${marks.map((mark) => {
          const active = isSliderMarkActive(mark.value, value);
          return html`<span
            part=${itemParts("mark", { state: active ? "active" : "inactive" })}
            class=${classMap({ mark: true, markActive: active })}
            style=${at(position(mark.value))}
            aria-hidden="true"
            >${
              mark.label
                ? html`<span
                    part="mark-label"
                    class=${classMap({
                      markLabel: true,
                      markLabelStart: mark.value <= min,
                      markLabelEnd: mark.value >= max,
                    })}
                    >${mark.label}</span
                  >`
                : nothing
            }</span
          >`;
        })}
        ${values.map((v, index) => {
          const thumbDragging = this.dragging === index;
          return html`<span
            part=${itemParts("thumb", { dragging: thumbDragging, disabled })}
            class=${classMap({ thumb: true, thumbDragging })}
            style=${at(position(v))}
            data-index=${index}
            role="slider"
            tabindex=${disabled ? "-1" : "0"}
            aria-label=${this.labelOf(index) ?? nothing}
            aria-description=${this.aria.description ?? nothing}
            aria-valuemin=${String(this.range && index === 1 ? values[0] : min)}
            aria-valuemax=${String(this.range && index === 0 ? values[1] : max)}
            aria-valuenow=${String(v)}
            aria-valuetext=${
              this.getAriaValueText
                ? this.getAriaValueText(v, index)
                : this.format(v)
            }
            aria-orientation=${orientation}
            aria-disabled=${disabled ? "true" : nothing}
            aria-readonly=${this.readOnly ? "true" : nothing}
            aria-invalid=${invalid ? "true" : nothing}
            @keydown=${(event: KeyboardEvent) => this.handleKeyDown(event, index)}
            >${
              this.tooltip
                ? html`<span part="tooltip" class="tooltip" aria-hidden="true"
                    >${this.format(v)}</span
                  >`
                : nothing
            }</span
          >`;
        })}
      </div>
      ${
        this.showValue
          ? html`<span part="value" class="value" aria-hidden="true"
              >${values.map((v) => this.format(v)).join(" – ")}</span
            >`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-slider": MinervaSlider;
  }
}
