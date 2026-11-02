import type { ColorScheme, SliderMark, SliderValue } from "@minerva/core";

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

/**
 * Props of `Slider` (same names and defaults as the React `SliderProps`,
 * except the value: `v-model` (`modelValue`) instead of `value`).
 * `aria-label`, `aria-labelledby` and `aria-describedby` go to the thumbs;
 * other attributes fall through to the root `<div>`.
 */
export interface SliderProps {
  /** Value (controlled, `v-model`): a number, or `[start, end]` with `range` */
  modelValue?: SliderValue;
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
  /** Ticks of the scale: `{ value, label? }[]`, or `true` for one tick per step */
  marks?: SliderMark[] | boolean;
  /**
   * Snaps the value to the closest mark (instead of the step)
   * @default false
   */
  snapToMarks?: boolean;
  /**
   * Disables the slider. Inherited from an enclosing FormControl when not set
   * @default false
   */
  disabled?: boolean;
  /**
   * The user cannot change the value. Inherited from an enclosing FormControl
   * when not set
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
   * Shows the value after the track
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
  /** Name of the hidden form input(s); a range submits two entries */
  name?: string;
  /** aria-valuetext of a thumb (index 0, or 1 for the end thumb of a range) */
  getAriaValueText?: (value: number, index: number) => string;
}
