import { defineHooks } from "../types";

export default defineHooks({
  description:
    "Bounded, wrapping content inside a table cell, with an optional muted secondary line",
  react: ["TableCellContent"],
  wc: "minerva-table-cell-content",
  parts: {
    root: { description: "The wrapper (bounded width)" },
    primary: { description: "The primary line (<code> when monospace)" },
    secondary: { description: "The muted secondary line" },
  },
  states: {},
});
