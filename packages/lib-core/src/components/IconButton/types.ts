import type { TooltipProps } from "../Tooltip";

type TooltipVariant = Pick<
  TooltipProps,
  "content" | "variant" | "shape" | "arrow"
>;

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon element to display */
  icon: React.ReactNode;
  /** Color variant; a neutral style is used when omitted */
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  /**
   * Button size
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * Button shape
   * @default "circle"
   */
  shape?: "circle" | "square";
  /**
   * Disables the button and removes it from the tab order
   * @default false
   */
  disabled?: boolean;
  /**
   * Replaces the icon with a spinner and blocks interaction
   * @default false
   */
  loading?: boolean;
  /**
   * Renders the button in its active (pressed) state
   * @default false
   */
  active?: boolean;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Custom icon color */
  color?: string;
  /** Custom icon color in the active state */
  activeColor?: string;
  /** Custom background color */
  bgColor?: string;
  /** Custom background color on hover */
  hoverColor?: string;
  /** Custom fill color of the icon */
  fillColor?: string;
  /** Tooltip configuration (content, variant, shape, arrow); requires showTooltip */
  tooltip?: TooltipVariant;
  /**
   * Shows the tooltip on hover and focus
   * @default false
   */
  showTooltip?: boolean;
  /**
   * Accessible label; always set it, since the button only contains an icon
   * @default "icon button"
   */
  ariaLabel?: string;
}
