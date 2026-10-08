import { defineHooks } from "../types";

export default defineHooks({
  description:
    "An equal-width column grid whose column count follows its own width (container queries)",
  react: ["ResponsiveGrid"],
  wc: "minerva-responsive-grid",
  parts: {
    root: { description: "The query container" },
    layout: { description: "The grid (its children are the grid items)" },
  },
  states: {},
});
