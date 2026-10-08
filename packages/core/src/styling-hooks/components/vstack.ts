import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A vertical stack (column), stretched on the cross axis by default",
  react: ["VStack"],
  wc: "minerva-vstack",
  parts: {
    root: { description: "The flex container" },
  },
  states: {},
});
