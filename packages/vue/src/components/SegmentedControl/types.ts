import type { Component, VNode, VNodeChild } from "vue";

/** Density of a SegmentedControl */
export type SegmentedControlSize = "small" | "medium" | "large";

/**
 * Color of a SegmentedControl: `neutral` shows a raised surface thumb on a
 * muted track, `primary` a solid primary thumb
 */
export type SegmentedControlColor = "neutral" | "primary";

/**
 * Content of a segment icon or label (the React `ReactNode`): a string or
 * number (text), a VNode (`h(...)`), a component (rendered without props;
 * wrap it with `markRaw` inside reactive state) or a render function
 */
export type SegmentedControlContent =
  string | number | VNode | Component | (() => VNodeChild);

/** A segment of a SegmentedControl */
export interface SegmentedControlOptionObject {
  /** Value of the segment */
  value: string;
  /**
   * Visible label
   * @default the value (unless an icon is given)
   */
  label?: SegmentedControlContent;
  /** Icon shown before the label (alone for an icon-only segment) */
  icon?: SegmentedControlContent;
  /**
   * Blocks this segment
   * @default false
   */
  disabled?: boolean;
  /** Accessible name; required for an icon-only segment */
  "aria-label"?: string;
}

/** A segment: a plain string (value and label) or an option object */
export type SegmentedControlOption = string | SegmentedControlOptionObject;

/**
 * Props of `SegmentedControl` (same names and defaults as the React
 * `SegmentedControlProps`, except the selection: `v-model` (`modelValue`)
 * instead of `value`). Attributes fall through to the root `<div>`.
 */
export interface SegmentedControlProps {
  /** The segments: strings or option objects */
  options: readonly SegmentedControlOption[];
  /** Selected value (controlled, `v-model`) */
  modelValue?: string;
  /** Initially selected value (uncontrolled) */
  defaultValue?: string;
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
}
