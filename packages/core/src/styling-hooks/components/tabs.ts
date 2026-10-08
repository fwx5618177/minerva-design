import { defineHooks } from "../types";

export default defineHooks({
  description:
    "Accessible tabs: a tab list and the panels of its tabs, with a variant, a color and an orientation",
  react: ["Tabs", "TabList"],
  wc: "minerva-tabs",
  parts: {
    root: { description: "The root wrapper of the tab list and the panels" },
    list: {
      description: "The role=tablist container of the tabs",
      states: ["orientation", "variant"],
    },
  },
  states: {
    orientation: ["horizontal", "vertical"],
    variant: ["line", "enclosed", "soft", "pills"],
    color: ["primary", "neutral", "success", "warning", "danger", "info"],
  },
});
