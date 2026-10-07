import type { Ref } from "react";
import type { TooltipProps } from "../Tooltip";

type TooltipVariant = Pick<
  TooltipProps,
  "content" | "variant" | "shape" | "arrow"
>;

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ref to the <button> element */
  ref?: Ref<HTMLButtonElement>;
  /** Icon element to display (children are used when omitted) */
  icon?: React.ReactNode;
  /** Icon element, alternative to the icon prop */
  children?: React.ReactNode;
  /**
   * Accessible name of the button, also shown as its tooltip (unless
   * showTooltip is false). Takes precedence over ariaLabel
   */
  label?: string;
  /**
   * Color variant; a neutral style is used when omitted (`danger` is an
   * alias of `error`)
   */
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "danger"
    | "info"
    | "neutral";
  /**
   * Fill style: `ghost` (transparent until hovered, the default look),
   * `solid` (filled with the variant color) or `outline` (bordered)
   * @default "ghost"
   */
  appearance?: "ghost" | "solid" | "outline";
  /**
   * Button size
   * @default "medium"
   */
  size?: "xsmall" | "small" | "medium" | "large";
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
   * Shows the tooltip on hover and focus (its content is tooltip.content,
   * or the label)
   * @default true when label is set, otherwise false
   */
  showTooltip?: boolean;
  /**
   * Accessible label; always set it, since the button only contains an icon
   * @default "icon button" (localized)
   */
  ariaLabel?: string;
}
