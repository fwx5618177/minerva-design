export type DividerVariant = "solid" | "dashed" | "dotted";
export type DividerOrientation = "horizontal" | "vertical";
export type DividerTextAlign = "left" | "center" | "right";

/**
 * Props of `Divider` (same names and defaults as React). The line color
 * comes from the `--divider-color` CSS custom property (default
 * `var(--border-color)`); set it through `class` or `style`. The text of a
 * horizontal divider is the default slot.
 */
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
  /**
   * Vertical divider inside a flex container: stretches to the container
   * height (align-self: stretch) instead of the 1em inline height
   * @default false
   */
  flexItem?: boolean;
}
