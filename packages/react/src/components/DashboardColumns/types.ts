import type { CSSProperties, ReactNode, Ref } from "react";
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
 * Props of the DashboardColumns component: a horizontally scrolling row of
 * DashboardColumn
 */
export interface DashboardColumnsProps {
  /** The columns (DashboardColumn) */
  children?: ReactNode;
  /**
   * Width of every column (a number is pixels). With `fill` it is the
   * minimum width: columns stretch equally when they fit
   * @default "18rem"
   */
  columnWidth?: DashboardLength;
  /**
   * Stretches the columns equally to fill the board when they fit (they
   * keep `columnWidth` as their minimum width and scroll otherwise)
   * @default false
   */
  fill?: boolean;
  /**
   * Space between the columns (a number is pixels)
   * @default "0.75rem"
   */
  gap?: DashboardLength;
  /**
   * Height of the board: the column bodies scroll vertically within it
   * (a number is pixels)
   */
  height?: DashboardLength;
  /**
   * Maximum height of the board: the column bodies scroll vertically within
   * it (a number is pixels)
   */
  maxHeight?: DashboardLength;
  /**
   * Lets the DashboardCard children of keyed columns (`value`) be dragged
   * between and within columns: with the mouse, a long press on touch
   * screens, or the keyboard (Space / Enter picks a focused card up, the
   * arrows move it, Space / Enter drops it, Escape cancels). The board is
   * controlled: it reports the move (`onCardMove`) and the app moves the
   * card in its data.
   * @default false
   */
  draggable?: boolean;
  /**
   * Called when a card is dropped at a new position (not when it is put back
   * where it was): move the card in your data (`moveDashboardCard` from
   * `minerva-design/core` does it for plain lists)
   */
  onCardMove?: (move: DashboardCardMove) => void;
  /**
   * Whether a card may be dropped at a position: refused positions show no
   * drop indicator and the keyboard skips them (its original position is
   * always allowed)
   */
  canDrop?: (move: DashboardCardMove) => boolean;
  /**
   * Accessible name of the board region
   * @default "Board" (translated)
   */
  "aria-label"?: string;
  /** Id of an element naming the board (instead of aria-label) */
  "aria-labelledby"?: string;
  /** Additional class name */
  className?: string;
  /** Inline style of the board */
  style?: CSSProperties;
  /** Id of the board */
  id?: string;
  /** Ref to the root <div> */
  ref?: Ref<HTMLDivElement>;
}

/** Props of the DashboardColumn component: a status column of a DashboardColumns */
export interface DashboardColumnProps {
  /** Title of the column (also its accessible name) */
  title: ReactNode;
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
  /**
   * Accent of the column (a dot before the title): a theme color or any CSS
   * color
   */
  color?: DashboardColumnColor;
  /** Supporting text under the header */
  description?: ReactNode;
  /** Header controls on the end side (e.g. an add button) */
  actions?: ReactNode;
  /**
   * Content shown when the column has no cards
   * @default "No items" (translated)
   */
  empty?: ReactNode;
  /** Footer below the cards (e.g. an "Add card" button) */
  footer?: ReactNode;
  /** The cards: each child is wrapped in a role="listitem" */
  children?: ReactNode;
  /**
   * Accessible name of the column
   * @default the title with the count ("To do, 3 items", translated)
   */
  "aria-label"?: string;
  /** Additional class name */
  className?: string;
  /** Inline style of the column */
  style?: CSSProperties;
  /** Id of the column */
  id?: string;
  /** Ref to the root <section> */
  ref?: Ref<HTMLElement>;
}

/**
 * Props of the DashboardCard component: a card of a DashboardColumn that a
 * draggable board can move
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
  /** Content of the card */
  children?: ReactNode;
  /** Additional class name */
  className?: string;
  /** Inline style of the card */
  style?: CSSProperties;
  /** Id of the card */
  id?: string;
  /** Ref to the root <div> */
  ref?: Ref<HTMLDivElement>;
}
