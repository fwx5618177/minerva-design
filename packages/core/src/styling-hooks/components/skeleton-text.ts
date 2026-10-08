import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A decorative block of text-line placeholders (hidden from assistive technologies)",
  react: ["SkeletonText"],
  wc: "minerva-skeleton-text",
  parts: {
    root: { description: "The block of lines" },
    line: { description: "Each line placeholder" },
  },
  states: {},
});
