import type { ColorScheme } from "@minerva/core";

/**
 * Props of `IconButton` (same names and defaults as the React
 * `IconButtonProps`; `pressed` is `v-model:pressed`). Other attributes go to
 * the `<button>`. CSS custom properties: `--icon-button-color`,
 * `--icon-button-hover-bg`, `--icon-button-pressed-color`,
 * `--icon-button-pressed-bg`.
 */
export interface IconButtonProps {
  /**
   * Accessible name of the button. Takes precedence over aria-label
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
   * Replaces the icon with a spinner and ignores activation (click, Enter,
   * Space, form submission) while staying focusable: exposed as
   * aria-busy + aria-disabled instead of the native disabled attribute
   * @default false
   */
  loading?: boolean;
  /**
   * Pressed state of a toggle button (controlled, `v-model:pressed`).
   * Setting pressed, defaultPressed or a `pressedChange` / `update:pressed`
   * listener makes the button a toggle: clicking flips the state and it is
   * exposed as aria-pressed
   */
  pressed?: boolean;
  /** Initial pressed state of an uncontrolled toggle button */
  defaultPressed?: boolean;
}
