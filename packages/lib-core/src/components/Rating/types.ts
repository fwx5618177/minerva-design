import type { Ref } from "react";

/** Size of the Rating stars */
export type RatingSize = "small" | "medium" | "large";

/**
 * Props of the Rating component. Other HTML attributes (data-*, title, ...)
 * are forwarded to the root <span>.
 */
export interface RatingProps {
  /** Current score, from 0 to max */
  value: number;
  /**
   * Highest score; the score is always drawn on 5 stars (half stars for
   * fractions between 0.25 and 0.75 of a star)
   * @default 10
   */
  max?: number;
  /**
   * Star size: 12px, 16px or 20px
   * @default "medium"
   */
  size?: RatingSize;
  /**
   * Shows the score (one decimal) after the stars
   * @default false
   */
  showValue?: boolean;
  /** Number of ratings, shown after the score when showValue is set */
  ratingCount?: number;
  /**
   * Makes the rating interactive: hover previews, clicking the left / right
   * half of a star picks a half / full star, and the root becomes a slider
   * (arrow keys step by max / 10, Home / End jump to 0 / max)
   */
  onChange?: (value: number) => void;
  /**
   * Forces display mode even when onChange is set
   * @default false
   */
  readOnly?: boolean;
  /**
   * Accessible label of the rating
   * @default "<value> / <max>"
   */
  "aria-label"?: string;
  /** Called on key down (interactive mode) before the built-in stepping; call preventDefault() to take over a key */
  onKeyDown?: (event: React.KeyboardEvent<HTMLSpanElement>) => void;
  /** Additional class name */
  className?: string;
  /** Inline styles of the root element */
  style?: React.CSSProperties;
  /** Ref to the root <span> */
  ref?: Ref<HTMLSpanElement>;
}

/** One dimension of a RatingScale */
export interface RatingDimension {
  /** Stable key, passed back to onChange */
  key: string;
  /** Displayed label */
  label: string;
  /** Current score of the dimension */
  value: number;
  /** Optional description (a string is shown as the row's title tooltip) */
  hint?: React.ReactNode;
}

/** Props of the RatingScale component (several labelled ratings) */
export interface RatingScaleProps {
  /** Dimensions to rate, one row each */
  dimensions: readonly RatingDimension[];
  /**
   * Highest score shared by every dimension
   * @default 10
   */
  max?: number;
  /**
   * Star size
   * @default "medium"
   */
  size?: RatingSize;
  /** Makes the rows interactive; called with the dimension key and its new score */
  onChange?: (key: string, value: number) => void;
  /**
   * Forces display mode even when onChange is set
   * @default false
   */
  readOnly?: boolean;
  /**
   * Shows the score at the end of each row
   * @default true
   */
  showValue?: boolean;
  /** Additional class name */
  className?: string;
  /** Ref to the root element */
  ref?: Ref<HTMLDivElement>;
}
