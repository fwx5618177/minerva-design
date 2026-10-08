import type { ColorScheme } from "@minerva/core";

/** Props of `Button` (same names and defaults as the React `ButtonProps`). */
export interface ButtonProps {
  /** @default "button" */
  type?: "button" | "submit" | "reset";
  /** Semantic color. @default "primary" */
  color?: ColorScheme;
  /** Visual variant. @default "solid" */
  variant?: "solid" | "outline" | "ghost" | "link";
  /** @default "medium" */
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  /** @default false */
  disabled?: boolean;
  /** Busy: spinner, `aria-busy`, ignores presses. @default false */
  loading?: boolean;
  /** Label while loading (or the `loading-text` slot) */
  loadingText?: string;
  /** Takes the full width of its container. @default false */
  fullWidth?: boolean;
  /** Pressed / selected look (`data-state="active"`). @default false */
  active?: boolean;
  shape?: "square" | "rounded" | "circle";
  /** Corner radius: a scale step or px */
  borderRadius?:
    "none" | "small" | "medium" | "large" | "circle" | "square" | number;
}
