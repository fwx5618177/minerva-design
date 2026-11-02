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
