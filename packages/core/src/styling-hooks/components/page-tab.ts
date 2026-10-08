import { defineHooks } from "../types";

export default defineHooks({
  description: "One open page of a page tabs strip",
  react: ["PageTab"],
  wc: "minerva-page-tab",
  parts: {
    root: { description: "The item wrapper" },
    trigger: { description: "The label <button> (selects the page)" },
    icon: { description: "The icon before the label" },
    label: { description: "The (truncated) label" },
    action: {
      description: "The wrapper of the separate control next to the label",
    },
    "close-button": {
      description:
        "The built-in close button (`closable`; React passes its own control as `action`)",
      only: "wc",
    },
  },
  states: {
    current: true,
    disabled: true,
  },
});
