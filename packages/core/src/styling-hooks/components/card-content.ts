import { defineHooks } from "../types";

export default defineHooks({
  description: "The main body of a card",
  react: ["CardContent"],
  wc: "minerva-card-content",
  parts: {
    root: { description: "The section box" },
  },
  states: {},
});
