import type { HTMLAttributes, Ref } from "react";
import type { ColorScheme } from "@minerva/core";

/**
 * Props of the Badge.
 *
 * Colors come from the theme tokens of `color`. To override them for a single
 * badge, set these CSS custom properties (e.g. through `style` or a class):
 * `--badge-bg` (background), `--badge-fg` (text) and `--badge-border`
 * (border color of the `outline` variant).
 */
export interface BadgeProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children" | "content" | "color"
> {
  /**
   * Element the badge is attached to. Without children (or with plain text /
   * number children, used as the content) the badge renders inline in the
   * normal flow instead of being positioned on a corner
   */
  children?: React.ReactNode;
  /**
   * Additional class name of the badge
   * @default ""
   */
  className?: string;
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
   * Content displayed inside the badge (count, short text, icon + text...).
   * Use it instead of children for rich content of a standalone badge
   */
  content?: React.ReactNode;
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
  /** Accessible label of the badge, e.g. "5 unread messages" */
  ariaLabel?: string;
  /** Icon displayed before the content */
  icon?: React.ReactNode;
  /**
   * ARIA role of the badge element; set it to "presentation" or "none" when
   * the badge must not be announced as a live status
   * @default "status"
   */
  role?: React.AriaRole;
  /** Ref to the root element: the wrapper when attached to children, otherwise the badge itself */
  ref?: Ref<HTMLElement>;
}
