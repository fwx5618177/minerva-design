export type SkeletonVariant =
  "text" | "circular" | "rectangular" | "rounded" | "button" | "image" | "card";

export type SkeletonAnimation = "pulse" | "wave" | "false";

/**
 * Props of `Skeleton` (same names and defaults as React). The `style`
 * attribute applies to each line (to the block when decorative), `class` and
 * the other attributes to the root; `aria-label` names the busy region
 * (default "Loading", localized).
 */
export interface SkeletonProps {
  /**
   * Shape of the placeholder
   * @default "text"
   */
  variant?: SkeletonVariant;
  /**
   * Loading animation; "false" disables it
   * @default "pulse"
   */
  animation?: SkeletonAnimation;
  /**
   * Renders one bare decorative placeholder (`<span aria-hidden>`) instead of
   * the announced loading region. Use it to compose your own skeleton layout
   * inside a container that already exposes the busy state
   * @default false
   */
  decorative?: boolean;
  /**
   * Edge length of a decorative circular placeholder (numbers are pixels);
   * wins over width/height
   * @default 32
   */
  size?: number | string;
  /** Width of each line (numbers are pixels) */
  width?: number | string;
  /** Height of each line (numbers are pixels) */
  height?: number | string;
  /**
   * Shows the placeholder; set to false to render the default slot
   * @default true
   */
  loading?: boolean;
  /** Custom corner radius of each line */
  borderRadius?: number | string;
  /**
   * Number of lines to render
   * @default 1
   */
  lines?: number;
  /**
   * Shows an avatar placeholder
   * @default false
   */
  avatar?: boolean;
  /**
   * Avatar size (numbers are pixels)
   * @default 40
   */
  avatarSize?: number | string;
  /**
   * Avatar shape
   * @default "circle"
   */
  avatarShape?: "circle" | "square";
  /**
   * Highlights the card variant as active
   * @default false
   */
  active?: boolean;
  /**
   * Shows a paragraph placeholder (replaces the lines)
   * @default false
   */
  paragraph?: boolean;
  /**
   * Shows a title placeholder (replaces the lines)
   * @default false
   */
  title?: boolean;
}

/** Props of `SkeletonText` (same names and defaults as React). */
export interface SkeletonTextProps {
  /**
   * Number of text lines
   * @default 3
   */
  lines?: number;
  /**
   * Height of each line (numbers are pixels)
   * @default "1em"
   */
  lineHeight?: number | string;
  /**
   * Space between lines: a spacing-scale step (2 -> var(--space-2)) or any CSS length
   * @default 2
   */
  gap?: number | string;
  /**
   * Shrinks the last line to 70% width so the block reads like real text
   * @default true
   */
  shrinkLast?: boolean;
  /**
   * Loading animation; "false" disables it
   * @default "pulse"
   */
  animation?: SkeletonAnimation;
}
