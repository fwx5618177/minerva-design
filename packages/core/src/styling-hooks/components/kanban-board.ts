import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A horizontally scrolling board of status columns (KanbanColumn), equal-width by default",
  react: ["KanbanBoard"],
  wc: "minerva-kanban-board",
  parts: {
    root: {
      description:
        "The role=region scroll container holding the columns (keyboard scrollable)",
    },
  },
  states: {},
});
