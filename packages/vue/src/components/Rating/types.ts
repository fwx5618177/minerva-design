/** Size of the Rating stars */
export type RatingSize = "small" | "medium" | "large";

/**
 * Props of `Rating` (same names and defaults as the React `RatingProps`; the
 * score is `v-model`). Other attributes go to the root `<span>`.
 */
export interface RatingProps {
  /** Current score, from 0 to max (`v-model`) */
  modelValue: number;
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
   * Forces display mode even with a `change` / `update:modelValue` listener
   * (which makes the rating interactive: hover previews, half-star clicks,
   * a keyboard slider)
   * @default false
   */
  readOnly?: boolean;
}

/** One dimension of a RatingScale */
export interface RatingDimension {
  /** Stable key, passed back to `change` */
  key: string;
  /** Displayed label */
  label: string;
  /** Current score of the dimension */
  value: number;
  /** Optional description (shown as the row's title tooltip) */
  hint?: string;
}

/** Props of `RatingScale` (several labelled ratings sharing one scale) */
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
  /**
   * Forces display mode even with a `change` listener (which makes the rows
   * interactive)
   * @default false
   */
  readOnly?: boolean;
  /**
   * Shows the score at the end of each row
   * @default true
   */
  showValue?: boolean;
}
