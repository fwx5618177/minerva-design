export type AlertVariant = "info" | "success" | "warning" | "error";
export type AlertSize = "small" | "medium" | "large";
export type AlertType = "default" | "outlined" | "filled";

export interface AlertProps {
  /** Alert title */
  title?: React.ReactNode;
  /** Alert content */
  children?: React.ReactNode;
  /**
   * Semantic variant, which sets the color and default icon
   * @default "info"
   */
  variant?: AlertVariant;
  /**
   * Alert size
   * @default "medium"
   */
  size?: AlertSize;
  /**
   * Visual style
   * @default "default"
   */
  type?: AlertType;
  /**
   * Shows the variant icon
   * @default true
   */
  showIcon?: boolean;
  /** Custom icon, replacing the variant icon */
  icon?: React.ReactNode;
  /**
   * Shows a close button
   * @default false
   */
  closable?: boolean;
  /** Custom close icon */
  closeIcon?: React.ReactNode;
  /** Called when the close button is clicked */
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Plays an entrance animation
   * @default true
   */
  animation?: boolean;
  /**
   * Entrance animation name
   * @default "slideIn"
   */
  animationName?: "slideIn" | "fadeIn" | "bounce" | "zoom";
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Action area rendered on the right, e.g. buttons */
  action?: React.ReactNode;
  /**
   * Shows a border
   * @default false
   */
  outlined?: boolean;
  /**
   * Fills the background with the variant color
   * @default false
   */
  filled?: boolean;
  /**
   * Banner mode, suited to page-level notices at the top of a page
   * @default false
   */
  banner?: boolean;
  /**
   * Adds a drop shadow
   * @default false
   */
  elevation?: boolean;
  /**
   * Rounds the corners
   * @default true
   */
  rounded?: boolean;
  /** Custom corner radius */
  borderRadius?: number | string;
  /**
   * Lets the content be expanded and collapsed (requires a title)
   * @default false
   */
  collapsible?: boolean;
  /**
   * Whether the content is initially expanded
   * @default true
   */
  defaultExpanded?: boolean;
  /** Called when the content is expanded or collapsed */
  onExpand?: (expanded: boolean) => void;
}
