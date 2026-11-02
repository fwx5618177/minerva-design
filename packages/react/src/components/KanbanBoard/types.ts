import type { CSSProperties, ReactNode, Ref } from "react";
import type { ColorScheme, KanbanCardMove } from "@minerva/core";

export type { KanbanCardMove };

/** A length: a number of pixels or any CSS length ("18rem", "40vh") */
export type KanbanLength = number | string;

/**
 * Accent of a KanbanColumn: a theme color or any CSS color
 * ("#7c3aed", "rgb(...)", "var(--my-color)")
 */
export type KanbanColumnColor = ColorScheme | (string & {});

/**
 * Props of the KanbanBoard component: a horizontally scrolling row of
 * KanbanColumn
 */
export interface KanbanBoardProps {
  /** The columns (KanbanColumn) */
  children?: ReactNode;
  /**
   * Width of every column (a number is pixels). With `fill` it is the
   * minimum width: columns stretch equally when they fit
   * @default "18rem"
   */
  columnWidth?: KanbanLength;
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
  gap?: KanbanLength;
  /**
   * Height of the board: the column bodies scroll vertically within it
   * (a number is pixels)
   */
  height?: KanbanLength;
  /**
   * Maximum height of the board: the column bodies scroll vertically within
   * it (a number is pixels)
   */
  maxHeight?: KanbanLength;
  /**
   * Lets the KanbanCard children of keyed columns (`value`) be dragged
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
   * where it was): move the card in your data (`moveKanbanCard` from
   * `minerva-design/core` does it for plain lists)
   */
  onCardMove?: (move: KanbanCardMove) => void;
  /**
   * Whether a card may be dropped at a position: refused positions show no
   * drop indicator and the keyboard skips them (its original position is
   * always allowed)
   */
  canDrop?: (move: KanbanCardMove) => boolean;
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

/** Props of the KanbanColumn component: a status column of a KanbanBoard */
export interface KanbanColumnProps {
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
  color?: KanbanColumnColor;
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
 * Props of the KanbanCard component: a card of a KanbanColumn that a
 * draggable board can move
 */
export interface KanbanCardProps {
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
