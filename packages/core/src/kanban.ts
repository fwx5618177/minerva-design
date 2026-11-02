// Shared logic of KanbanBoard / KanbanColumn (every renderer).
import { resolveSize } from "./spacing";
import type { ColorScheme } from "./theme/types";

/** Theme colors a KanbanColumn accent can name (`data-color` / classes) */
export const KANBAN_COLORS: readonly ColorScheme[] = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "neutral",
];

/** Default width of a kanban column */
export const KANBAN_COLUMN_WIDTH = "18rem";

/** Default space between kanban columns */
export const KANBAN_GAP = "0.75rem";

/**
 * The accent of a column: `scheme` for a theme color, `custom` for any other
 * CSS color (set as `--kanban-column-color`), neither when unset / blank.
 */
export function kanbanAccent(color: string | null | undefined): {
  scheme?: ColorScheme;
  custom?: string;
} {
  const value = typeof color === "string" ? color.trim() : "";
  if (!value) return {};
  if ((KANBAN_COLORS as readonly string[]).includes(value))
    return { scheme: value as ColorScheme };
  return { custom: value };
}

/** CSS value of the theme color of an accent (`var(--success-color)`) */
export function kanbanAccentValue(color: string | null | undefined): string {
  const { scheme, custom } = kanbanAccent(color);
  if (custom) return custom;
  if (scheme === "neutral") return "var(--text-muted-color)";
  return scheme ? `var(--${scheme}-color)` : "";
}

/**
 * The count badge of a column: a non-negative integer, `undefined` (hidden)
 * for a missing, negative or non-finite count.
 */
export function kanbanCount(count: unknown): number | undefined {
  const value = typeof count === "string" && count.trim() ? +count : count;
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.floor(value)
    : undefined;
}

/** A board length (number: pixels) as CSS, `undefined` when unset / blank */
export function kanbanLength(
  value: string | number | null | undefined,
): string | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "number" && !Number.isFinite(value)) return undefined;
  const text = resolveSize(value);
  return text ? text : undefined;
}

// ---------------------------------------------------------------------------
// Drag and drop of cards (every renderer). The board is controlled: it never
// reorders anything, it reports a `KanbanCardMove` and the app updates its
// data (`moveKanbanCard` applies a move to plain lists).

/**
 * A card move reported by a draggable KanbanBoard (`onCardMove`,
 * `card-move`, `minerva-card-move`, `cardMove`).
 */
export interface KanbanCardMove {
  /** `value` of the moved KanbanCard */
  cardKey: string;
  /** `value` of the column the card comes from */
  fromColumn: string;
  /** Index of the card in its column before the move */
  fromIndex: number;
  /** `value` of the column the card goes to (may be `fromColumn`) */
  toColumn: string;
  /**
   * Index of the card in `toColumn` after the move, i.e. counted without
   * the card itself (remove it from `fromColumn`, then insert it at
   * `toIndex`)
   */
  toIndex: number;
}

/** A column of a board as the drag logic sees it: its key and its cards */
export interface KanbanLayoutColumn {
  /** `value` of the column */
  key: string;
  /** `value` of its cards, in order */
  cards: readonly string[];
}

/** Where a card is, or would land: a column key and an index in it */
export interface KanbanPosition {
  column: string;
  /** Index in the column, the dragged card excluded */
  index: number;
}

/** A keyboard (or accessibility action) move of a picked-up card */
export type KanbanDirection = "up" | "down" | "left" | "right";

/** Where `cardKey` is in `layout` (`undefined` when it is not there) */
export function kanbanFind(
  layout: readonly KanbanLayoutColumn[],
  cardKey: string,
): KanbanPosition | undefined {
  for (const column of layout) {
    const index = column.cards.indexOf(cardKey);
    if (index >= 0) return { column: column.key, index };
  }
  return undefined;
}

/**
 * Number of positions a dragged card can take in `columnKey`: its cards
 * without the dragged one, plus one (0 for an unknown column)
 */
export function kanbanSlots(
  layout: readonly KanbanLayoutColumn[],
  cardKey: string,
  columnKey: string,
): number {
  const column = layout.find((entry) => entry.key === columnKey);
  if (!column) return 0;
  return column.cards.filter((key) => key !== cardKey).length + 1;
}

/**
 * The move of `cardKey` to `to` (the index is clamped to the column), or
 * `undefined` when the card or the column is unknown
 */
export function kanbanCardMove(
  layout: readonly KanbanLayoutColumn[],
  cardKey: string,
  to: KanbanPosition,
): KanbanCardMove | undefined {
  const from = kanbanFind(layout, cardKey);
  const slots = kanbanSlots(layout, cardKey, to.column);
  if (!from || slots === 0) return undefined;
  return {
    cardKey,
    fromColumn: from.column,
    fromIndex: from.index,
    toColumn: to.column,
    toIndex: Math.min(Math.max(0, Math.floor(to.index)), slots - 1),
  };
}

/** Whether a move leaves the card where it was */
export function isKanbanNoop(move: KanbanCardMove): boolean {
  return move.fromColumn === move.toColumn && move.fromIndex === move.toIndex;
}

/**
 * Insertion index of a dragged card from the pointer position along the
 * column (`position`) and the midpoints of the other cards of the column
 * (same axis, in order, the dragged card excluded): the number of cards
 * whose midpoint is before the pointer.
 */
export function kanbanInsertIndex(
  midpoints: readonly number[],
  position: number,
): number {
  let index = 0;
  while (index < midpoints.length && midpoints[index]! < position) index++;
  return index;
}

/**
 * The next position of a picked-up card for a keyboard arrow (or an
 * accessibility action): `up` / `down` within the column, `left` / `right`
 * to the adjacent column at the same index (clamped). Positions `accept`
 * rejects are skipped (the original position is always accepted); returns
 * `undefined` at the edges.
 */
export function kanbanKeyboardTarget(
  layout: readonly KanbanLayoutColumn[],
  cardKey: string,
  current: KanbanPosition,
  direction: KanbanDirection,
  accept?: (move: KanbanCardMove) => boolean,
): KanbanPosition | undefined {
  const ok = (position: KanbanPosition) => {
    const move = kanbanCardMove(layout, cardKey, position);
    if (!move) return false;
    return isKanbanNoop(move) || !accept || accept(move);
  };
  if (direction === "up" || direction === "down") {
    const step = direction === "up" ? -1 : 1;
    const slots = kanbanSlots(layout, cardKey, current.column);
    for (
      let index = current.index + step;
      index >= 0 && index < slots;
      index += step
    ) {
      const position = { column: current.column, index };
      if (ok(position)) return position;
    }
    return undefined;
  }
  const step = direction === "left" ? -1 : 1;
  const start = layout.findIndex((column) => column.key === current.column);
  if (start < 0) return undefined;
  for (
    let index = start + step;
    index >= 0 && index < layout.length;
    index += step
  ) {
    const column = layout[index]!.key;
    const slots = kanbanSlots(layout, cardKey, column);
    const position = { column, index: Math.min(current.index, slots - 1) };
    if (ok(position)) return position;
  }
  return undefined;
}

/**
 * Keyboard action of a key on a card of a draggable board: `toggle` picks
 * up / drops (Space, Enter), `cancel` (Escape), or an arrow direction
 * (Left / Right swapped in right-to-left boards)
 */
export function kanbanKeyAction(
  key: string,
  rtl = false,
): KanbanDirection | "toggle" | "cancel" | undefined {
  switch (key) {
    case " ":
    case "Spacebar":
    case "Enter":
      return "toggle";
    case "Escape":
    case "Esc":
      return "cancel";
    case "ArrowUp":
      return "up";
    case "ArrowDown":
      return "down";
    case "ArrowLeft":
      return rtl ? "right" : "left";
    case "ArrowRight":
      return rtl ? "left" : "right";
    default:
      return undefined;
  }
}

/**
 * Applies a move to the lists of a board (column key -> items): returns new
 * lists (the input is not mutated); `keyOf` reads the card key of an item.
 * Lists without the card are returned unchanged.
 */
export function moveKanbanCard<T>(
  lists: Readonly<Record<string, readonly T[]>>,
  move: KanbanCardMove,
  keyOf: (item: T) => string | number,
): Record<string, T[]> {
  const next: Record<string, T[]> = {};
  for (const [key, items] of Object.entries(lists)) next[key] = [...items];
  const source = next[move.fromColumn];
  const target = next[move.toColumn];
  if (!source || !target) return next;
  const index = source.findIndex(
    (item) => String(keyOf(item)) === move.cardKey,
  );
  if (index < 0) return next;
  const [card] = source.splice(index, 1);
  target.splice(Math.min(Math.max(0, move.toIndex), target.length), 0, card!);
  return next;
}
