import { defineHooks } from "../types";

export default defineHooks({
  description:
    "An indeterminate loading indicator: spinner, circle, wave, bar or dotted bar",
  react: ["ProgressIndicator"],
  wc: "minerva-progress",
  parts: {
    root: {
      description:
        "The indicator (role=progressbar unless decorative); color current follows the text color",
    },
    icon: { description: "The icon before the indicator" },
    indicator: { description: "The animated indicator (ring, wave or bar)" },
    label: { description: "The visible label" },
  },
  states: {
    // the `dottedBar` variant is `dotted-bar` (kebab-case state values)
    variant: ["spinner", "bar", "wave", "circle", "dotted-bar"],
    size: ["xsmall", "small", "medium", "large", "xlarge"],
    color: ["primary", "neutral", "current"],
  },
});
