import type { ColorScheme } from "@minerva/core";

/**
 * Props of the Badge (same names and defaults as React).
 *
 * Colors come from the theme tokens of `color`. To override them for a single
 * badge, set these CSS custom properties (e.g. through `style` or a class):
 * `--badge-bg` (background), `--badge-fg` (text) and `--badge-border`
 * (border color of the `outline` variant).
 */
export interface BadgeProps {
  /**
   * Semantic color of the badge
   * @default "primary"
   */
  color?: ColorScheme;
  /**
   * Visual style: `solid` (filled), `subtle` (tinted background) or
   * `outline` (bordered)
   * @default "solid"
   */
  variant?: "solid" | "subtle" | "outline";
  /**
   * Badge size
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * Content displayed inside the badge (count, short text); the `content`
   * slot renders rich content
   */
  content?: string | number;
  /**
   * Corner of the children the badge is placed on (ignored by standalone badges)
   * @default "top-right"
   */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /**
   * Renders a small dot instead of content
   * @default false
   */
  dot?: boolean;
  /** Custom border radius (CSS value) */
  borderRadius?: string;
  /** Custom border width (CSS value) */
  borderWidth?: string;
  /**
   * ARIA role of the badge element; set it to "presentation" or "none" when
   * the badge must not be announced as a live status
   * @default "status"
   */
  role?: string;
}
