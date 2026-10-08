import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A horizontal stack (row), centered on the cross axis by default",
  react: ["HStack"],
  wc: "minerva-hstack",
  parts: {
    root: { description: "The flex container" },
  },
  states: {},
});
