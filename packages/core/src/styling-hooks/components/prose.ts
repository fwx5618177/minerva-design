import { defineHooks } from "../types";

export default defineHooks({
  description: "Theme-aware typography for semantic HTML (articles, Markdown)",
  react: ["Prose"],
  wc: "minerva-prose",
  parts: {
    root: {
      description:
        "The typography container (or the `asChild` child). React only: the <minerva-prose> element itself is the container (style the element)",
      only: "react",
    },
  },
  states: {},
});
