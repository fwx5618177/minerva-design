import { defineHooks } from "../types";

export default defineHooks({
  description:
    "Several labelled ratings sharing one scale (one rating per row)",
  react: ["RatingScale"],
  wc: "minerva-rating-scale",
  parts: {
    root: { description: "The list of rows" },
    row: { description: "Each row (a label and a rating)" },
    label: { description: "The label of a row" },
  },
  states: {
    readonly: true,
    size: ["small", "medium", "large"],
  },
});
