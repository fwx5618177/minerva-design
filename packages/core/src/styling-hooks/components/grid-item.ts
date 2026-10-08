import { defineHooks } from "../types";

export default defineHooks({
  description: "A cell of a responsive grid, optionally spanning the full row",
  react: ["GridItem"],
  wc: "minerva-grid-item",
  parts: {
    root: {
      description:
        "The grid cell (or the `asChild` child). React only: the <minerva-grid-item> element itself is the cell (style the element)",
      only: "react",
    },
  },
  states: {},
});
