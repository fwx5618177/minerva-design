import { defineHooks } from "../types";

export default defineHooks({
  description: "A presentational divider between select options or groups",
  react: ["SelectSeparator"],
  wc: "minerva-select-separator",
  parts: {
    root: { description: "The line" },
  },
  states: {},
});
