/** Preset size of an Avatar, or a size in pixels */
export type AvatarSize =
  "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | number;

/**
 * Props of `Avatar` (same names and defaults as React). The `aria-label`
 * attribute names the avatar (default: `name`, or "avatar" localized).
 */
export interface AvatarProps {
  /** Image URL. When omitted (or when it fails to load), the initials of name are shown */
  src?: string;
  /**
   * Name of the person; used for the initials (first letters of the first two
   * words, or the first CJK character), the alt text and the accessible label
   * @default ""
   */
  name?: string;
  /**
   * Alternative text of the image; pass "" for a decorative avatar
   * @default name, or "avatar" (localized)
   */
  alt?: string;
  /**
   * Custom fallback text shown instead of the initials when there is no
   * image (or the `fallback` slot)
   */
  fallback?: string;
  /**
   * Avatar shape
   * @default "circle"
   */
  shape?: "circle" | "square" | "rounded";
  /**
   * Avatar size: a preset (xsmall 24px, small 32px, medium 48px, large 64px,
   * xlarge 80px, xxlarge 96px) or a number of pixels
   * @default "medium"
   */
  size?: AvatarSize;
  /**
   * Uses tighter margins for overlapping avatars
   * @default false
   */
  stacked?: boolean;
}

/**
 * Props of `AvatarGroup` (same names as React). The `aria-label` attribute
 * overrides the localized "Avatar group" / "Avatar group with {count} more".
 */
export interface AvatarGroupProps {
  /** Number of additional avatars, shown as a "+N" indicator */
  count?: number;
  /**
   * Maximum number of avatars to display; the others are counted in the
   * "+N" indicator (added to count)
   */
  max?: number;
}
