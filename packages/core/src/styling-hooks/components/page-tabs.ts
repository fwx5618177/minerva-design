import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A horizontally scrolling strip of open application pages (route navigation)",
  react: ["PageTabs"],
  wc: "minerva-page-tabs",
  parts: {
    root: { description: "The <nav> landmark" },
    viewport: { description: "The scrolling viewport of the items" },
    list: { description: "The item list" },
    "scroll-button": {
      description:
        "The scroll left / right buttons (while the items overflow). Web components only: React renders IconButton components, which have their own hooks",
      only: "wc",
    },
    actions: { description: "The global actions after the list" },
  },
  states: {},
});
