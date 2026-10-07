import type { Ref } from "react";

export interface SearchButtonProps {
  /** Called when the button is clicked (not called while disabled) */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /**
   * Accessible label. Icon-only buttons default to "Search" (localized); with children the
   * visible text is used
   */
  ariaLabel?: string;
  /**
   * Disables the button
   * @default false
   */
  disabled?: boolean;
  /**
   * Button shape; buttons with children are always rendered square
   * @default "circle"
   */
  shape?: "circle" | "square" | "rounded";
  /**
   * Color variant
   * @default "primary"
   */
  variant?: "primary" | "warning" | "error" | "success" | "info";
  /**
   * Hover animation
   * @default "none"
   */
  animation?: "none" | "expand" | "shrink" | "shake";
  /**
   * Button size
   * @default "medium"
   */
  size?: "small" | "medium" | "large" | "xlarge";
  /** Text color */
  color?: string;
  /**
   * Color of the search icon
   * @default "var(--text-inverse-color)"
   */
  iconColor?: string;
  /** Custom background color */
  bgColor?: string;
  /**
   * Replaces the icon with a loading spinner and blocks activation
   * (including form submission)
   * @default false
   */
  loading?: boolean;
  /** Optional text shown next to the icon */
  children?: React.ReactNode;
  /** Native button type (the browser default is "submit" inside a form) */
  type?: "button" | "submit" | "reset";
  /** Ref to the <button> element */
  ref?: Ref<HTMLButtonElement>;
}
