import type { ColorScheme, DashboardCardMove } from "@minerva/core";

export type { DashboardCardMove };

/** A length: a number of pixels or any CSS length ("18rem", "40vh") */
export type DashboardLength = number | string;

/**
 * Accent of a DashboardColumn: a theme color or any CSS color
 * ("#7c3aed", "rgb(...)", "var(--my-color)")
 */
export type DashboardColumnColor = ColorScheme | (string & {});

/**
 * Props of `DashboardColumns` (same names and defaults as the React
 * `DashboardColumnsProps`). The default slot holds the DashboardColumn components;
 * attributes fall through to the root `<div>`.
 */
export interface DashboardColumnsProps {
  /**
   * Width of every column (a number is pixels). With `fill` it is the
   * minimum width: columns stretch equally when they fit
   * @default "18rem"
   */
  columnWidth?: DashboardLength;
  /**
   * Stretches the columns equally to fill the board when they fit
   * @default false
   */
  fill?: boolean;
  /**
   * Space between the columns (a number is pixels)
   * @default "0.75rem"
   */
  gap?: DashboardLength;
  /** Height of the board: the column bodies scroll vertically within it */
  height?: DashboardLength;
  /** Maximum height of the board: the column bodies scroll vertically within it */
  maxHeight?: DashboardLength;
  /**
   * Lets the DashboardCard children of keyed columns (`value`) be dragged
   * between and within columns (mouse, touch long press, keyboard); the
   * board emits `card-move` and the app moves the card in its data
   * @default false
   */
  draggable?: boolean;
  /**
   * Whether a card may be dropped at a position: refused positions show no
   * drop indicator and the keyboard skips them
   */
  canDrop?: (move: DashboardCardMove) => boolean;
  /**
   * Accessible name of the board region
   * @default "Board" (translated)
   */
  "aria-label"?: string;
  /** Id of an element naming the board (instead of aria-label) */
  "aria-labelledby"?: string;
}

/**
 * Props of `DashboardColumn` (same names as the React `DashboardColumnProps`).
 * Slots: default (the cards, each wrapped in a `role="listitem"`), `title`
 * (rich title), `actions`, `description`, `empty`, `footer`. Attributes
 * fall through to the root `<section>`.
 */
export interface DashboardColumnProps {
  /** Title of the column (also its accessible name; or the `title` slot) */
  title?: string;
  /**
   * Key of the column, reported as `fromColumn` / `toColumn` by a draggable
   * board (columns without one take no cards)
   */
  value?: string;
  /**
   * Number of items shown as a badge next to the title (and announced with
   * the title); omit to hide the badge
   */
  count?: number;
  /** Accent of the column (a dot before the title): a theme color or any CSS color */
  color?: DashboardColumnColor;
  /** Supporting text under the header (or the `description` slot) */
  description?: string;
  /**
   * Text shown when the column has no cards (or the `empty` slot)
   * @default "No items" (translated)
   */
  empty?: string;
  /**
   * Accessible name of the column
   * @default the title with the count ("To do, 3 items", translated)
   */
  "aria-label"?: string;
}

/**
 * Props of `DashboardCard` (same names as the React `DashboardCardProps`): a card
 * of a DashboardColumn that a draggable board can move. The default slot is
 * its content; attributes fall through to the root `<div>`.
 */
export interface DashboardCardProps {
  /** Key of the card, reported as `cardKey` by a draggable board */
  value: string;
  /**
   * Name of the card in the drag announcements and, when draggable, its
   * accessible name
   * @default its text content
   */
  label?: string;
}
