import type { HTMLAttributes, Ref } from "react";
import type { ColorScheme } from "@minerva/core";

export type TagSize = "small" | "medium" | "large";
export type TagShape = "square" | "rounded" | "circle";

/**
 * Props of the Tag.
 *
 * The colors of each `color` can be overridden with CSS custom properties
 * (e.g. through `style`, a class or a theme): `--tag-<color>-bg` (background
 * of the `subtle` and `outline` variants) and `--tag-<color>-text` (text and
 * border color of those variants), e.g. `--tag-danger-bg`,
 * `--tag-neutral-text`.
 */
export interface TagProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onClick" | "color"
> {
  /** Content of the tag */
  children?: React.ReactNode;
  /**
   * Semantic color of the tag
   * @default "neutral"
   */
  color?: ColorScheme;
  /**
   * Visual style: `subtle` (tinted background), `outline` (tinted background
   * with a border) or `solid` (filled with the color, inverse text)
   * @default "subtle"
   */
  variant?: "subtle" | "outline" | "solid";
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
   * Renders the tag content as a native button (focusable, activated with
   * Enter / Space). With closable, the close button is a sibling button
   * @default false
   */
  clickable?: boolean;
  /** Called when the tag is activated (requires clickable) */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Pressed (selected) state of a toggle tag, e.g. a selectable filter
   * (requires clickable); sets aria-pressed and the selected style
   */
  pressed?: boolean;
  /** Icon displayed before the content */
  icon?: React.ReactNode;
  /** Avatar (e.g. a small Avatar or image) displayed before the content */
  avatar?: React.ReactNode;
  /**
   * Shows a spinner instead of the icon / avatar, marks the tag busy and
   * blocks its action; the close button is hidden
   * @default false
   */
  loading?: boolean;
  /**
   * Shows a shadow
   * @default false
   */
  elevation?: boolean;
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
   * @default "Close" (localized)
   */
  closeLabel?: string;
  /**
   * Shows a ripple effect when a clickable tag is activated
   * @default true
   */
  ripple?: boolean;
  /** Ref to the root element */
  ref?: Ref<HTMLDivElement>;
}
