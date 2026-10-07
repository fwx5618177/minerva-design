import type { Ref } from "react";
import type { ColorScheme } from "@minerva/core";
import type { TooltipProps } from "../Tooltip";

type IconButtonTooltip = Pick<
  TooltipProps,
  "content" | "color" | "variant" | "shape" | "arrow"
>;

/**
 * Styling hooks (CSS custom properties, set them on the button or an
 * ancestor): `--icon-button-color` (icon color), `--icon-button-hover-bg`
 * (hover background), `--icon-button-pressed-color` and
 * `--icon-button-pressed-bg` (pressed toggle state).
 */
export interface IconButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> {
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
   * Semantic color of the button
   * @default "neutral"
   */
  color?: ColorScheme;
  /**
   * Visual style: `ghost` (transparent until hovered), `solid` (filled with
   * the color) or `outline` (bordered)
   * @default "ghost"
   */
  variant?: "ghost" | "solid" | "outline";
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
   * Pressed state of a toggle button (controlled; pair with
   * onPressedChange). Setting pressed, defaultPressed or onPressedChange
   * makes the button a toggle: clicking flips the state and it is exposed
   * as aria-pressed
   */
  pressed?: boolean;
  /** Initial pressed state of an uncontrolled toggle button */
  defaultPressed?: boolean;
  /** Called with the new pressed state when a toggle button is activated */
  onPressedChange?: (pressed: boolean) => void;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Tooltip configuration (content, color, variant, shape, arrow); requires showTooltip */
  tooltip?: IconButtonTooltip;
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
