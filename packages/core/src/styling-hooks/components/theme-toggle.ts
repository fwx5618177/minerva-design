import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A light / dark / system theme switch (a group of toggle buttons)",
  react: ["ThemeToggle"],
  wc: "minerva-theme-toggle",
  parts: {
    root: { description: "The role=group wrapper" },
    item: {
      description: "Every option button (aria-pressed on the selected one)",
    },
  },
  states: {},
});
