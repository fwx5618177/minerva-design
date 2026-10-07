export type TagVariant =
  "default" | "primary" | "success" | "warning" | "error" | "info";
export type TagSize = "small" | "medium" | "large";
export type TagShape = "square" | "rounded" | "circle";

export interface TagProps {
  /** Content of the tag */
  children?: React.ReactNode;
  /**
   * Color scheme
   * @default "default"
   */
  variant?: TagVariant;
  /**
   * Tag size
   * @default "medium"
   */
  size?: TagSize;
  /**
   * Tag shape
   * @default "rounded"
   */
  shape?: TagShape;
  /**
   * Shows a close button
   * @default false
   */
  closable?: boolean;
  /** Called when the close button is clicked */
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Makes the tag behave like a button (focusable, activated with Enter / Space)
   * @default false
   */
  clickable?: boolean;
  /** Called when the tag is activated (requires clickable) */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Icon displayed before the content */
  icon?: React.ReactNode;
  /**
   * Shows a border
   * @default false
   */
  bordered?: boolean;
  /**
   * Shows a shadow
   * @default false
   */
  elevation?: boolean;
  /** Custom background color */
  bgColor?: string;
  /** Custom text color */
  textColor?: string;
  /** Custom border color */
  borderColor?: string;
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /**
   * Disables the tag and its close button
   * @default false
   */
  disabled?: boolean;
  /** Custom close icon */
  closeIcon?: React.ReactNode;
  /**
   * Accessible label of the close button
   * @default "Close"
   */
  closeLabel?: string;
  /**
   * Shows a ripple effect on click
   * @default true
   */
  ripple?: boolean;
}
