import type { ComputedRef, InjectionKey } from "vue";

/** What the cards of a board need to know about dragging */
export interface KanbanDragContext {
  draggable: ComputedRef<boolean>;
  /** Id of the keyboard instructions describing the draggable cards */
  hintId: string;
}

// Each board provides its own context, so nested boards never mix cards.
export const KANBAN_DRAG_KEY: InjectionKey<KanbanDragContext> =
  Symbol("MinervaKanbanDrag");
