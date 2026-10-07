import type { Ref } from "react";
import type { ColorScheme } from "@minerva/core";

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "color"
> {
  /** Called when the button is clicked (not called while disabled) */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button content */
  children?: React.ReactNode;
  /** Additional class name */
  className?: string;
  /**
   * Semantic color of the button
   * @default "primary"
   */
  color?: ColorScheme;
  /**
   * Visual style: `solid` (filled), `outline` (border only), `ghost`
   * (transparent until hovered) or `link` (text link look)
   * @default "solid"
   */
  variant?: "solid" | "outline" | "ghost" | "link";
  /**
   * Button size
   * @default "medium"
   */
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  /** Accessible label, required when the button only contains an icon */
  ariaLabel?: string;
  /**
   * Disables the button
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows a spinner and blocks activation (aria-busy / aria-disabled). The
   * button stays focusable so keyboard focus is not lost
   * @default false
   */
  loading?: boolean;
  /** Text shown instead of the content (and icons) while loading */
  loadingText?: React.ReactNode;
  /** Icon rendered before the content (hidden from assistive technologies by the caller) */
  startIcon?: React.ReactNode;
  /** Icon rendered after the content */
  endIcon?: React.ReactNode;
  /**
   * Stretches the button to the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Renders the button in its pressed/active state
   * @default false
   */
  active?: boolean;
  /** Preset shape of the button */
  shape?: "square" | "rounded" | "circle";
  /**
   * Corner radius: a preset or a number of pixels. The theme radius
   * (`--radius-md`) is used when omitted
   */
  borderRadius?:
    "none" | "small" | "medium" | "large" | "circle" | "square" | number;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Ref to the <button> element */
  ref?: Ref<HTMLButtonElement>;
}
