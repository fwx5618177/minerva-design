import { defineHooks } from "../types";

export default defineHooks({
  description: "The heading of a card (h3 by default)",
  react: ["CardTitle"],
  wc: "minerva-card-title",
  parts: {
    root: { description: "The heading element" },
  },
  states: {},
});
