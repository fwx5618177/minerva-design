import type { HTMLAttributes, ReactNode, Ref } from "react";

/** Preset size of an Avatar, or a size in pixels */
export type AvatarSize =
  "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | number;

export interface AvatarProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children"
> {
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
   * Accessible label of the avatar (and default alt text of its image)
   * @default name, or "avatar" (localized)
   */
  ariaLabel?: string;
  /** Custom fallback content shown instead of the initials when there is no image */
  fallback?: ReactNode;
  /** Fallback content used when there is no name (e.g. an icon) */
  children?: ReactNode;
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
   * Additional class name
   * @default ""
   */
  className?: string;
  /**
   * Uses tighter margins for overlapping avatars
   * @default false
   */
  stacked?: boolean;
  /** Ref to the root <span> element */
  ref?: Ref<HTMLSpanElement>;
}

export interface AvatarGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Number of additional avatars, shown as a "+N" indicator */
  count?: number;
  /**
   * Maximum number of avatars to display; the others are counted in the
   * "+N" indicator (added to count)
   */
  max?: number;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Avatar elements */
  children?: ReactNode;
  /**
   * Accessible label of the group
   * @default "Avatar group" / "Avatar group with {count} more" (localized)
   */
  ariaLabel?: string;
  /** Ref to the root <div> element */
  ref?: Ref<HTMLDivElement>;
}
