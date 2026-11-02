import type { ReactNode, Ref } from "react";

/** Density of a SegmentedControl */
export type SegmentedControlSize = "small" | "medium" | "large";

/**
 * Color of a SegmentedControl: `neutral` shows a raised surface thumb on a
 * muted track, `primary` a solid primary thumb
 */
export type SegmentedControlColor = "neutral" | "primary";

/** A segment of a SegmentedControl */
export interface SegmentedControlOptionObject<T extends string = string> {
  /** Value of the segment */
  value: T;
  /**
   * Visible label
   * @default the value (unless an icon is given)
   */
  label?: ReactNode;
  /** Icon shown before the label (alone for an icon-only segment) */
  icon?: ReactNode;
  /**
   * Blocks this segment
   * @default false
   */
  disabled?: boolean;
  /** Accessible name; required for an icon-only segment */
  "aria-label"?: string;
}

/**
 * A segment: a plain string (value and label) or an option object
 */
export type SegmentedControlOption<T extends string = string> =
  T | SegmentedControlOptionObject<T>;

/**
 * Props of the SegmentedControl component: a single-choice segmented switch
 * for modes and filters (use Tabs when each choice has a content panel).
 * The value type `T` comes from `onChange` or an explicit type argument
 * (`<SegmentedControl<View> ...>`), never from `options` / `value` /
 * `defaultValue`, so literal values and mixed options do not narrow it.
 */
export interface SegmentedControlProps<T extends string = string> {
  /** The segments: strings or option objects */
  options: readonly SegmentedControlOption<NoInfer<T>>[];
  /** Selected value (controlled; pair with onChange) */
  value?: NoInfer<T>;
  /** Initially selected value (uncontrolled) */
  defaultValue?: NoInfer<T>;
  /** Called with the selected value */
  onChange?: (value: T) => void;
  /**
   * Segment density
   * @default "medium"
   */
  size?: SegmentedControlSize;
  /**
   * Thumb color
   * @default "neutral"
   */
  color?: SegmentedControlColor;
  /**
   * Fills the width of the container (the segments always share the width
   * equally)
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Blocks every segment
   * @default false
   */
  disabled?: boolean;
  /** Name of a hidden input carrying the value in a form */
  name?: string;
  /** Accessible label of the group */
  "aria-label"?: string;
  /** Id of the element labelling the group */
  "aria-labelledby"?: string;
  /** Root id */
  id?: string;
  /** Additional class name */
  className?: string;
  /** Ref to the root <div> (role="radiogroup") */
  ref?: Ref<HTMLDivElement>;
}
