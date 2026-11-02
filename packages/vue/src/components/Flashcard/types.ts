/** Rotation axis of a Flashcard flip */
export type FlashcardAxis = "y" | "x";

/** Surface style of a Flashcard (matches Card) */
export type FlashcardVariant = "elevated" | "outline" | "filled";

/** Padding and typography scale of a Flashcard */
export type FlashcardSize = "small" | "medium" | "large";

/**
 * Props of `Flashcard` (same names and defaults as the React
 * `FlashcardProps`; the flipped state is `v-model:flipped`). The `front`,
 * `back` and `footer` slots take rich content (the `front` / `back` props
 * are plain-text fallbacks). Attributes fall through to the root `<div>`.
 */
export interface FlashcardProps {
  /** Text of the front face (the prompt); the `front` slot wins */
  front?: string;
  /** Text of the back face (the answer); the `back` slot wins */
  back?: string;
  /**
   * Small caption of the front face; `""` or `null` hides it
   * @default "Question" (translated)
   */
  frontLabel?: string | null;
  /**
   * Small caption of the back face; `""` or `null` hides it
   * @default "Answer" (translated)
   */
  backLabel?: string | null;
  /**
   * Hint on the front face (shown with showHint while the card flips on click)
   * @default "Click or press Space to flip" (translated)
   */
  hint?: string;
  /**
   * Shows the hint on the front face
   * @default false
   */
  showHint?: boolean;
  /** Whether the back is shown (controlled, `v-model:flipped`) */
  flipped?: boolean;
  /**
   * Whether the back is initially shown (uncontrolled)
   * @default false
   */
  defaultFlipped?: boolean;
  /**
   * Clicking the card (or Enter / Space on it) flips it. When false the card
   * is not a button and only `flipped` flips it.
   * @default true
   */
  flipOnClick?: boolean;
  /**
   * Blocks flipping and dims the card
   * @default false
   */
  disabled?: boolean;
  /**
   * Rotation axis: "y" flips horizontally, "x" vertically
   * @default "y"
   */
  axis?: FlashcardAxis;
  /**
   * Surface style
   * @default "elevated"
   */
  variant?: FlashcardVariant;
  /**
   * Padding and typography scale
   * @default "medium"
   */
  size?: FlashcardSize;
  /**
   * Minimum height of the card (a number is in px); the card grows to fit
   * the taller face
   * @default "12rem"
   */
  minHeight?: number | string;
  /**
   * Accessible label of the card
   * @default "Flashcard, showing <face label>" (translated)
   */
  "aria-label"?: string;
}
