import type { Component } from "vue";

/** Flex direction of a Stack */
export type StackDirection =
  "row" | "column" | "row-reverse" | "column-reverse";
/** Cross-axis alignment of a Stack (`align-items`) */
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
/** Main-axis distribution of a Stack (`justify-content`) */
export type StackJustify =
  "start" | "center" | "end" | "between" | "around" | "evenly";

/** Props of `Stack` (same names and defaults as the React `StackProps`). */
export interface StackProps {
  /**
   * Element or component to render
   * @default "div"
   */
  as?: string | Component;
  /**
   * Flex direction
   * @default "column"
   */
  direction?: StackDirection;
  /**
   * Gap between items: numbers and numeric strings select spacing tokens
   * (`2` -> `var(--space-2)`), other strings are CSS values. No gap when omitted.
   */
  gap?: string | number;
  /** Cross-axis alignment (`align-items`); unset when omitted */
  align?: StackAlign;
  /** Main-axis distribution (`justify-content`); unset when omitted */
  justify?: StackJustify;
  /**
   * Wraps items onto multiple lines
   * @default false
   */
  wrap?: boolean;
  /**
   * Rendered between every two items (not before the first or after the
   * last), e.g. `"·"`; the `separator` slot renders any content (a vertical
   * `Divider`). Empty children (`v-if` comments) do not get a separator.
   */
  separator?: string;
  /**
   * Joins the items into one attached group (e.g. a segmented row of buttons):
   * no gap, shared borders and outer-only corner radii. The group gets
   * `role="group"` unless a role is given; label it with `aria-label`.
   * @default false
   */
  attached?: boolean;
}

/** Props of HStack: a Stack with a fixed row direction */
export type HStackProps = Omit<StackProps, "direction">;
/** Props of VStack: a Stack with a fixed column direction */
export type VStackProps = Omit<StackProps, "direction">;
