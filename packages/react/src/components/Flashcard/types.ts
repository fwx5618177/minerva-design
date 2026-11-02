import type { ReactNode, Ref } from "react";

/** Rotation axis of a Flashcard flip */
export type FlashcardAxis = "y" | "x";

/** Surface style of a Flashcard (matches Card) */
export type FlashcardVariant = "elevated" | "outline" | "filled";

/** Padding and typography scale of a Flashcard */
export type FlashcardSize = "small" | "medium" | "large";

/**
 * Props of the Flashcard component: a two-sided study card that flips
 * between a front (the prompt) and a back (the answer), e.g. for spaced
 * repetition review
 */
export interface FlashcardProps {
  /** Content of the front face (the prompt) */
  front?: ReactNode;
  /** Content of the back face (the answer) */
  back?: ReactNode;
  /**
   * Content below the card, not flipped (e.g. rating buttons)
   */
  footer?: ReactNode;
  /**
   * Small caption of the front face; `null`, `false` or `""` hides it
   * @default "Question" (translated)
   */
  frontLabel?: ReactNode;
  /**
   * Small caption of the back face; `null`, `false` or `""` hides it
   * @default "Answer" (translated)
   */
  backLabel?: ReactNode;
  /**
   * Hint on the front face (shown with showHint while the card flips on click)
   * @default "Click or press Space to flip" (translated)
   */
  hint?: ReactNode;
  /**
   * Shows the hint on the front face
   * @default false
   */
  showHint?: boolean;
  /** Whether the back is shown (controlled; pair with onFlippedChange) */
  flipped?: boolean;
  /**
   * Whether the back is initially shown (uncontrolled)
   * @default false
   */
  defaultFlipped?: boolean;
  /** Called with the next flipped state */
  onFlippedChange?: (flipped: boolean) => void;
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
  /** Additional class name */
  className?: string;
  /** Ref to the root <div> */
  ref?: Ref<HTMLDivElement>;
}
