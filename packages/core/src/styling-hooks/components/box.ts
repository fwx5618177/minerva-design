import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A polymorphic container with padding, margin, size, background, radius and shadow shorthands",
  react: ["Box"],
  wc: "minerva-box",
  parts: {
    root: {
      description:
        "The rendered element (`as`). React only: the <minerva-box> element itself is the box (style the element)",
      only: "react",
    },
  },
  states: {},
});
