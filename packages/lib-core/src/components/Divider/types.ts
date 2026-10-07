import type { Ref } from "react";

export type DividerVariant = "solid" | "dashed" | "dotted";
export type DividerOrientation = "horizontal" | "vertical";
export type DividerTextAlign = "left" | "center" | "right";

export interface DividerProps {
  /**
   * Line style
   * @default "solid"
   */
  variant?: DividerVariant;
  /**
   * Divider direction
   * @default "horizontal"
   */
  orientation?: DividerOrientation;
  /** Line color */
  color?: string;
  /**
   * Line thickness in pixels
   * @default 1
   */
  thickness?: number;
  /** Length of the line (width when horizontal, height when vertical) */
  length?: number | string;
  /**
   * Margin around the divider in pixels (top/bottom when horizontal, left/right when vertical)
   * @default 16
   */
  spacing?: number;
  /** Optional text rendered inside a horizontal divider */
  children?: React.ReactNode;
  /**
   * Position of the text
   * @default "center"
   */
  textAlign?: DividerTextAlign;
  /**
   * Adds a subtle shadow
   * @default false
   */
  elevation?: boolean;
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Ref to the root <div> element */
  ref?: Ref<HTMLDivElement>;
}
