import type { Ref } from "react";

/** Status of an AnswerSheet question */
export type AnswerSheetStatus =
  "unanswered" | "answered" | "correct" | "wrong" | "skipped";

/** Density of an AnswerSheet */
export type AnswerSheetSize = "small" | "medium";

/**
 * Layout of an AnswerSheet: "wrap" wraps the pills on several rows, "scroll"
 * keeps a single horizontally scrolling row
 */
export type AnswerSheetLayout = "wrap" | "scroll";

/** A question of an AnswerSheet */
export interface AnswerSheetItem {
  /** Unique key of the question (the value of the sheet) */
  key: string;
  /**
   * Visible label of the pill
   * @default its number across all the groups (index + 1)
   */
  label?: string;
  /**
   * Status of the question
   * @default "unanswered"
   */
  status?: AnswerSheetStatus;
  /** Flags the question for review (a warning dot in a corner) */
  flagged?: boolean;
  /** The question can't be selected */
  disabled?: boolean;
  /**
   * Key of its group (see `groups`); items without a known group render
   * first, in an untitled section
   */
  group?: string;
}

/** A titled section of an AnswerSheet */
export interface AnswerSheetGroup {
  /** Key matched by `item.group` */
  key: string;
  /** Visible title of the section */
  title: string;
}

/**
 * Props of the AnswerSheet component: a grid of numbered pills to jump
 * between the questions of a practice or exam session, grouped by section,
 * each with a status
 */
export interface AnswerSheetProps {
  /** The questions, in order */
  items: readonly AnswerSheetItem[];
  /**
   * Titled sections, in display order; items render under the group whose
   * key matches `item.group`
   */
  groups?: readonly AnswerSheetGroup[];
  /** Key of the current question (controlled; pair with onChange) */
  value?: string;
  /** Key of the initially current question (uncontrolled) */
  defaultValue?: string;
  /** Called with the key of the selected question */
  onChange?: (key: string) => void;
  /**
   * Density of the pills
   * @default "medium"
   */
  size?: AnswerSheetSize;
  /**
   * "wrap" wraps the pills on several rows; "scroll" keeps a single
   * horizontally scrolling row
   * @default "wrap"
   */
  layout?: AnswerSheetLayout;
  /**
   * Fixed number of columns (a grid; ArrowUp / ArrowDown move by a row).
   * Ignored with layout="scroll".
   */
  columns?: number;
  /**
   * Shows a legend of the statuses present (and of the flag)
   * @default false
   */
  showLegend?: boolean;
  /**
   * Shows the number of answered questions ("12 / 20 answered")
   * @default false
   */
  showSummary?: boolean;
  /**
   * Accessible name of a pill; receives the item and its display index
   * @default "Question <n>, <status>" (translated)
   */
  getItemLabel?: (item: AnswerSheetItem, index: number) => string;
  /**
   * Disables the whole sheet
   * @default false
   */
  disabled?: boolean;
  /**
   * Accessible name of the navigation landmark
   * @default "Questions" (translated)
   */
  "aria-label"?: string;
  /** Additional class of the root element */
  className?: string;
  /** Ref to the root `nav` element */
  ref?: Ref<HTMLElement>;
}
