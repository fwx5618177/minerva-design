import type { HTMLAttributes, Ref } from "react";

export type SkeletonVariant =
  "text" | "circular" | "rectangular" | "rounded" | "button" | "image" | "card";

export type SkeletonAnimation = "pulse" | "wave" | "false";

export interface SkeletonProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "title" | "style" | "className"
> {
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
  /** Additional class name */
  className?: string;
  /** Real content, rendered once loading is false */
  children?: React.ReactNode;
  /**
   * Shows the placeholder; set to false to render children
   * @default true
   */
  loading?: boolean;
  /** Custom corner radius of each line */
  borderRadius?: number | string;
  /** Inline styles applied to each line */
  style?: React.CSSProperties;
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
  /**
   * Accessible name of the loading placeholder (rendered as a busy status region)
   * @default "Loading" (localized)
   */
  ariaLabel?: string;
  /**
   * Ref to the root element (<div>, or the <span> when decorative); only
   * attached while loading (children are rendered as-is otherwise)
   */
  ref?: Ref<HTMLElement>;
}

export interface SkeletonTextProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
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
  /** Ref to the root <div> element */
  ref?: Ref<HTMLDivElement>;
}
