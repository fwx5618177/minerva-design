import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A page / route / section loading presentation: a spinner next to a label in a polite status region",
  react: ["LoadingState"],
  wc: "minerva-loading-state",
  parts: {
    root: { description: "The status region" },
    spinner: {
      description:
        "The decorative spinner (wraps a ProgressIndicator in React; the <minerva-progress> element in the web components)",
    },
    label: { description: "The label" },
  },
  states: {
    size: ["small", "medium", "large"],
  },
});
