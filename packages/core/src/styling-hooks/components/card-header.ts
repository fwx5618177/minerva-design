import { defineHooks } from "../types";

export default defineHooks({
  description:
    "The top section of a card, usually holding its title and description",
  react: ["CardHeader"],
  wc: "minerva-card-header",
  parts: {
    root: { description: "The section box" },
  },
  states: {},
});
