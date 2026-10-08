import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A score drawn as 5 stars, display-only or an interactive slider, optionally followed by the value and the number of ratings",
  react: ["Rating"],
  wc: "minerva-rating",
  parts: {
    root: {
      description: 'The root (role="slider", or role="img" when display-only)',
    },
    stars: { description: "The star row" },
    star: { description: "Each star" },
    value: { description: "The score and the count" },
    count: { description: "The number of ratings" },
  },
  states: {
    readonly: true,
    size: ["small", "medium", "large"],
  },
});
