import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A card of a KanbanColumn, keyed by its value; a focusable button that a draggable KanbanBoard can move",
  react: ["KanbanCard"],
  wc: "minerva-kanban-card",
  parts: {
    root: {
      description:
        "The card wrapper (a focusable role=button described by the drag instructions in a draggable board)",
    },
  },
  states: {},
});
