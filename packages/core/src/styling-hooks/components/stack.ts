import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A flex row / column with a token gap, optional separators and attached groups",
  react: ["Stack"],
  wc: "minerva-stack",
  parts: {
    root: { description: "The flex container" },
  },
  states: {
    orientation: ["horizontal", "vertical"],
  },
});
