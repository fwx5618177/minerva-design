import type { HTMLAttributes, ReactNode, Ref } from "react";
import type { ColorScheme } from "@minerva/core";

/** Indicator style of a ProgressIndicator */
export type ProgressIndicatorVariant =
  "spinner" | "bar" | "wave" | "circle" | "dottedBar";

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
   * Semantic color of the indicator: theme primary or neutral gray.
   * "current" is a special value that follows the surrounding text color
   * (currentColor), e.g. inside buttons or colored containers
   * @default "primary"
   */
  color?: Extract<ColorScheme, "primary" | "neutral"> | "current";
  /** Icon displayed before the indicator */
  icon?: ReactNode;
  /**
   * Visible text shown next to the indicator; it also names the progressbar
   * unless ariaLabel is set
   */
  label?: ReactNode;
  /**
   * Accessible label describing what is loading (used when there is no
   * visible label)
   * @default "Loading" (localized)
   */
  ariaLabel?: string;
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
