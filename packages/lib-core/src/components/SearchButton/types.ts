export interface SearchButtonProps {
  /** Called when the button is clicked (not called while disabled) */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Accessible label; required when the button has no text */
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
   * Replaces the icon with a loading spinner
   * @default false
   */
  loading?: boolean;
  /** Optional text shown next to the icon */
  children?: React.ReactNode;
}
