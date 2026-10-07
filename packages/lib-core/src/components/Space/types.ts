import type { Ref } from "react";

export type SpaceSize = "small" | "medium" | "large";
export type SpaceAlign = "start" | "end" | "center" | "baseline" | "stretch";
export type SpaceDirection = "horizontal" | "vertical";
export type SpaceJustify =
  | "start"
  | "end"
  | "center"
  | "space-around"
  | "space-between"
  | "space-evenly";

export interface SpaceProps {
  /** Alignment of the items on the cross axis */
  align?: SpaceAlign;
  /** Alignment of the items on the main axis */
  justify?: SpaceJustify;
  /**
   * Layout direction
   * @default "horizontal"
   */
  direction?: SpaceDirection;
  /**
   * Gap between items: a preset (small = 8px, medium = 16px, large = 24px) or a number of pixels
   * @default "medium"
   */
  size?: SpaceSize | number;
  /**
   * Wraps items onto multiple lines (horizontal only)
   * @default false
   */
  wrap?: boolean;
  /** Separator rendered between items */
  split?: React.ReactNode;
  /**
   * Compact mode: halves the preset gap
   * @default false
   */
  compact?: boolean;
  /**
   * Stretches the container to the full width of its parent
   * @default false
   */
  block?: boolean;
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Items to space out */
  children?: React.ReactNode;
  /** Ref to the root <div> element */
  ref?: Ref<HTMLDivElement>;
}
