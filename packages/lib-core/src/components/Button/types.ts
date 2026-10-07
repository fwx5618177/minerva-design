import type { Ref } from "react";

/** Color role of a Button (`error` and `danger` are aliases) */
export type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "danger"
  | "info"
  | "accent"
  | "neutral"
  | "retry"
  | "back";

/**
 * Fill style of a Button: `solid` (filled), `outline` (border only), `ghost`
 * (transparent until hovered) or `link` (text link look)
 */
export type ButtonAppearance = "solid" | "outline" | "ghost" | "link";

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** Called when the button is clicked (not called while disabled) */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button content */
  children?: React.ReactNode;
  /** Additional class name */
  className?: string;
  /**
   * Color of the button. `retry` and `back` are gradient presets of the
   * classic look; `accent` and `neutral` are best combined with `appearance`
   * @default "primary"
   */
  variant?: ButtonColor;
  /**
   * Fill style. When omitted the classic filled look is used; set it to get
   * the compact token-based design (solid, outline, ghost or link)
   */
  appearance?: ButtonAppearance;
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
   * Corner radius: a preset or a number of pixels
   * @default "medium"
   */
  borderRadius?:
    "none" | "small" | "medium" | "large" | "circle" | "square" | number;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Ref to the <button> element */
  ref?: Ref<HTMLButtonElement>;
}
