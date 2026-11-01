import type { HTMLAttributes, ReactNode, Ref } from "react";
import type { ColorScheme } from "@minerva/core";

/** Indicator style of a ProgressIndicator */
export type ProgressIndicatorVariant =
  "spinner" | "bar" | "wave" | "circle" | "dottedBar";

/** Semantic color of a ProgressIndicator ("current" follows the text color) */
export type ProgressIndicatorColor = ColorScheme | "current";

/**
 * Size preset of a ProgressIndicator: the diameter of round indicators
 * (12 / 16 / 24 / 32 / 48 px) or the thickness of bars
 */
export type ProgressIndicatorSize =
  "xsmall" | "small" | "medium" | "large" | "xlarge";

export interface ProgressIndicatorProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "color"
> {
  /**
   * Indicator style
   * @default "spinner"
   */
  variant?: ProgressIndicatorVariant;
  /**
   * Indicator size
   * @default "medium"
   */
  size?: ProgressIndicatorSize;
  /**
   * Semantic color of the indicator: theme primary, neutral gray or a status
   * color (success / warning / danger / info). "current" is a special value
   * that follows the surrounding text color (currentColor), e.g. inside
   * buttons or colored containers
   * @default "primary"
   */
  color?: ProgressIndicatorColor;
  /**
   * Current progress. Setting it switches the bar and circle variants to
   * determinate mode (a filled bar / arc and aria-valuenow); the value is
   * clamped between 0 and max. Other variants ignore it and stay
   * indeterminate.
   */
  value?: number;
  /**
   * Value that represents completion (determinate mode only); non-positive
   * values fall back to 100
   * @default 100
   */
  max?: number;
  /**
   * Shows the formatted value (a percentage by default) next to a
   * determinate indicator
   * @default false
   */
  showValue?: boolean;
  /**
   * Formats the value shown by showValue; a string or number result is also
   * used as aria-valuetext
   * @default (value, max) => `${Math.round((value / max) * 100)}%`
   */
  format?: (value: number, max: number) => ReactNode;
  /** Icon displayed before the indicator */
  icon?: ReactNode;
  /**
   * Visible text shown next to the indicator; it also names the progressbar
   * unless aria-label is set
   */
  label?: ReactNode;
  /**
   * Accessible label describing what is loading (used when there is no
   * visible label)
   * @default "Loading" (localized; "Progress" in determinate mode)
   */
  "aria-label"?: string;
  /**
   * Purely visual: drops the progressbar role and hides the indicator from
   * assistive technologies. Use it when a surrounding element (a status
   * region, a busy button) already conveys the loading state.
   * @default false
   */
  decorative?: boolean;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /**
   * Custom width (ignored when full is set). Bars default to 200px; round
   * indicators size to their content.
   */
  width?: string;
  /**
   * Stretches the indicator to the full width of its container
   * @default false
   */
  full?: boolean;
  /** Ref to the root <div> element */
  ref?: Ref<HTMLDivElement>;
}
