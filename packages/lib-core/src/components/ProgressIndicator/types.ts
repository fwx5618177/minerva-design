export interface ProgressIndicatorProps {
  /**
   * Indicator style
   * @default "spinner"
   */
  type?: "spinner" | "bar" | "wave" | "circle" | "dottedBar";
  /**
   * Indicator size
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /** Icon displayed before the indicator */
  icon?: React.ReactNode;
  /** Accessible label describing what is loading */
  ariaLabel?: string;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Custom width (ignored when full is set) */
  width?: string;
  /**
   * Stretches the indicator to the full width of its container
   * @default false
   */
  full?: boolean;
}
