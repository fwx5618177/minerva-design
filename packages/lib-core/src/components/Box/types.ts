import type { ElementType, HTMLAttributes, Ref } from "react";

/**
 * A spacing value: numbers and numeric strings select spacing tokens
 * (`4` -> `var(--space-4)`, `0.5` -> `var(--space-0-5)`); other strings are CSS
 * values used as-is (`"12px"`, `"auto"`, `"var(--x)"`).
 */
export type BoxSpace = string | number;

/** A size value: numbers are pixels, strings are CSS lengths. */
export type BoxSize = string | number;

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  /** Ref to the rendered element */
  ref?: Ref<HTMLElement>;
  /**
   * Element or component to render
   * @default "div"
   */
  as?: ElementType;
  /** Padding on all sides (spacing token or CSS value) */
  p?: BoxSpace;
  /** Horizontal padding (left and right) */
  px?: BoxSpace;
  /** Vertical padding (top and bottom) */
  py?: BoxSpace;
  /** Top padding */
  pt?: BoxSpace;
  /** Right padding */
  pr?: BoxSpace;
  /** Bottom padding */
  pb?: BoxSpace;
  /** Left padding */
  pl?: BoxSpace;
  /** Margin on all sides (spacing token or CSS value such as "auto") */
  m?: BoxSpace;
  /** Horizontal margin (left and right) */
  mx?: BoxSpace;
  /** Vertical margin (top and bottom) */
  my?: BoxSpace;
  /** Top margin */
  mt?: BoxSpace;
  /** Right margin */
  mr?: BoxSpace;
  /** Bottom margin */
  mb?: BoxSpace;
  /** Left margin */
  ml?: BoxSpace;
  /** Width: numbers are pixels, strings are CSS lengths */
  w?: BoxSize;
  /** Height: numbers are pixels, strings are CSS lengths */
  h?: BoxSize;
  /** Minimum width */
  minW?: BoxSize;
  /** Minimum height */
  minH?: BoxSize;
  /** Maximum width */
  maxW?: BoxSize;
  /** Maximum height */
  maxH?: BoxSize;
  /**
   * Background: a surface alias (`"bg"`, `"bg.subtle"`, `"bg.muted"`, `"bg.canvas"`,
   * `"bg.elevated"`, `"bg.emphasis"`) or any CSS background value
   */
  bg?: string;
  /** Border radius: a radius token (none, sm, md, lg, xl, 2xl, full) or any CSS value */
  rounded?: string;
  /** Box shadow: a shadow token (sm, md, lg, xl) or any CSS value */
  boxShadow?: string;
  /** CSS border shorthand, used as-is */
  border?: string;
}
