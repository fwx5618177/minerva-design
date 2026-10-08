import type { ColorScheme } from "@minerva/core";

export type TagSize = "small" | "medium" | "large";
export type TagShape = "square" | "rounded" | "circle";

/**
 * Props of the Tag (same names and defaults as React; `onClick` / `onClose`
 * are the `click` / `close` emits).
 *
 * The colors of each `color` can be overridden with CSS custom properties
 * (e.g. through `style`, a class or a theme): `--tag-<color>-bg` (background
 * of the `subtle` and `outline` variants) and `--tag-<color>-text` (text and
 * border color of those variants), e.g. `--tag-danger-bg`,
 * `--tag-neutral-text`.
 */
export interface TagProps {
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
  /**
   * Renders the tag content as a native button (focusable, activated with
   * Enter / Space). With closable, the close button is a sibling button
   * @default false
   */
  clickable?: boolean;
  /**
   * Pressed (selected) state of a toggle tag, e.g. a selectable filter
   * (requires clickable); sets aria-pressed and the selected style
   */
  pressed?: boolean;
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
  /**
   * Disables the tag and its close button
   * @default false
   */
  disabled?: boolean;
  /**
   * Accessible label of the close button: a string, or a function of the
   * tag's text label (the text of its children)
   * @default "Remove {label}" (localized), or "Close" when the tag has no text
   */
  closeLabel?: string | ((label: string) => string);
  /**
   * Shows a ripple effect when a clickable tag is activated
   * @default true
   */
  ripple?: boolean;
}
