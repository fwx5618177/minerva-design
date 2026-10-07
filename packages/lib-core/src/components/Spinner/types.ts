import type { HTMLAttributes, Ref } from "react";

/** Diameter preset of a Spinner (12 / 16 / 24 / 32 / 48 px) */
export type SpinnerSize = "xsmall" | "small" | "medium" | "large" | "xlarge";

/** Color of a Spinner: theme primary, neutral gray, or the current text color */
export type SpinnerColor = "primary" | "neutral" | "current";

export interface SpinnerProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children" | "color"
> {
  /**
   * Diameter preset
   * @default "medium"
   */
  size?: SpinnerSize;
  /**
   * Ring color; "current" follows the surrounding text color
   * @default "primary"
   */
  color?: SpinnerColor;
  /**
   * Visually hidden text announced by the polite status region; pass "" when
   * the spinner is decorative (e.g. next to a visible label)
   * @default "Loading…" (localized)
   */
  label?: string;
  /** Ref to the root <span> element */
  ref?: Ref<HTMLSpanElement>;
}
