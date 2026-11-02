import type { Ref } from "react";
import type { ColorScheme, SliderMark, SliderValue } from "@minerva/core";
import type { DataAttributes } from "../../internal/dataAttributes";

export type { SliderMark, SliderValue };

/** Size of a Slider */
export type SliderSize = "small" | "medium" | "large";

/** Accent color of a Slider */
export type SliderColor = Extract<
  ColorScheme,
  "primary" | "success" | "info" | "warning" | "danger"
>;

/** Direction of a Slider track */
export type SliderOrientation = "horizontal" | "vertical";

/** `data-*` attributes are forwarded to the root element. */
export interface SliderProps extends DataAttributes {
  /**
   * Value (controlled): a number, or `[start, end]` with `range`. Values are
   * clamped to min..max and snapped to the step (or to the marks)
   */
  value?: SliderValue;
  /** Initial value (uncontrolled); defaults to min, or [min, max] with range */
  defaultValue?: SliderValue;
  /**
   * Two thumbs selecting `[start, end]`; the thumbs cannot cross
   * @default false
   */
  range?: boolean;
  /**
   * Smallest value
   * @default 0
   */
  min?: number;
  /**
   * Largest value
   * @default 100
   */
  max?: number;
  /**
   * Step between two values; `null` snaps to the marks only
   * @default 1
   */
  step?: number | null;
  /**
   * Ticks of the scale: an array of `{ value, label? }`, or `true` for one
   * tick per step (up to 101 ticks)
   */
  marks?: SliderMark[] | boolean;
  /**
   * Snaps the value to the closest mark (instead of the step)
   * @default false
   */
  snapToMarks?: boolean;
  /** Called with the new value while dragging and on each key press */
  onChange?: (value: SliderValue) => void;
  /**
   * Called with the final value when the interaction ends (pointer release,
   * key press): save here
   */
  onChangeEnd?: (value: SliderValue) => void;
  /**
   * Disables the slider. Inherited from an enclosing FormControl when not
   * set; an explicit `false` overrides the FormControl
   * @default false
   */
  disabled?: boolean;
  /**
   * Focusable and submitted, but the user cannot change the value.
   * Inherited from an enclosing FormControl when not set
   * @default false
   */
  readOnly?: boolean;
  /**
   * Thumb and track size
   * @default "medium"
   */
  size?: SliderSize;
  /**
   * Semantic color of the filled track and the thumbs
   * @default "primary"
   */
  color?: SliderColor;
  /**
   * Shows the value (formatted with formatValue) after the track
   * @default false
   */
  showValue?: boolean;
  /**
   * Shows the value in a bubble above a thumb while it is dragged, hovered
   * or focused
   * @default false
   */
  tooltip?: boolean;
  /** Formats a value for the value label, the tooltip and aria-valuetext */
  formatValue?: (value: number) => string;
  /**
   * Direction of the track
   * @default "horizontal"
   */
  orientation?: SliderOrientation;
  /**
   * Name of the hidden form input(s); a range submits two entries under
   * this name
   */
  name?: string;
  /**
   * Accessible label of the thumbs (range: suffixed with "Minimum" /
   * "Maximum"). Defaults to the enclosing FormControl's label
   */
  "aria-label"?: string;
  /** id(s) of the element(s) labelling the thumbs */
  "aria-labelledby"?: string;
  /**
   * Extra id(s) of elements describing the slider, merged with the enclosing
   * FormControl's helper / error text
   */
  "aria-describedby"?: string;
  /**
   * aria-valuetext of a thumb (index 0, or 1 for the end thumb of a range).
   * Defaults to formatValue
   */
  getAriaValueText?: (value: number, index: number) => string;
  /** Additional class name */
  className?: string;
  /** Inline styles of the root element */
  style?: React.CSSProperties;
  /** Ref to the root element */
  ref?: Ref<HTMLDivElement>;
}
