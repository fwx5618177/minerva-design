export interface StatusIndicatorProps {
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Accessible label describing the status */
  ariaLabel?: string;
  /**
   * Disables the click feedback animation
   * @default false
   */
  disabled?: boolean;
  /**
   * Status, which sets the color and icon
   * @default "success"
   */
  status?: "success" | "error" | "warning" | "info";
  /**
   * Shape of the indicator
   * @default "circle"
   */
  shape?: "circle" | "square" | "rounded";
  /** Presence type; overrides the status color. Use "custom" together with color */
  type?: "online" | "offline" | "away" | "busy" | "custom";
  /**
   * Shows a text label next to the indicator (presence types only)
   * @default false
   */
  showLabel?: boolean;
  /**
   * Indicator size
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /** Custom background color, applied when type is "custom" */
  color?: string;
}
