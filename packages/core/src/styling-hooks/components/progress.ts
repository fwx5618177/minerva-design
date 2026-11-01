import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A loading indicator: spinner, circle, wave, bar or dotted bar; the bar and circle also show a determinate value",
  react: ["ProgressIndicator"],
  wc: "minerva-progress",
  parts: {
    root: {
      description:
        "The indicator (role=progressbar unless decorative); color current follows the text color",
    },
    icon: { description: "The icon before the indicator" },
    indicator: {
      description:
        "The indicator (ring, wave or bar; a filled bar or arc when determinate)",
    },
    value: { description: "The formatted value of a determinate indicator" },
    label: { description: "The visible label" },
  },
  states: {
    // the `dottedBar` variant is `dotted-bar` (kebab-case state values)
    variant: ["spinner", "bar", "wave", "circle", "dotted-bar"],
    size: ["xsmall", "small", "medium", "large", "xlarge"],
    color: [
      "primary",
      "neutral",
      "success",
      "warning",
      "danger",
      "info",
      "current",
    ],
  },
});
