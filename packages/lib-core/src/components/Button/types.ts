export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** Called when the button is clicked (not called while disabled) */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button content */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
  /**
   * Visual style of the button
   * @default "primary"
   */
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "retry"
    | "back";
  /**
   * Button size
   * @default "medium"
   */
  size?: "small" | "medium" | "large" | "xlarge";
  /** Accessible label, required when the button only contains an icon */
  ariaLabel?: string;
  /**
   * Disables the button
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows a spinner and blocks interaction
   * @default false
   */
  loading?: boolean;
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
}
