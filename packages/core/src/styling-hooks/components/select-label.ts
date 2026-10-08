import { defineHooks } from "../types";

export default defineHooks({
  description: "The (non-selectable) heading of a group of select options",
  react: ["SelectLabel"],
  wc: "minerva-select-label",
  parts: {
    root: { description: "The label" },
  },
  states: {},
});
