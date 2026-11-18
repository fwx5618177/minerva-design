import { defineHooks } from "../types";

export default defineHooks({
  description:
    "Page navigation with page buttons, an optional total, quick jumper and page size selector",
  react: ["Pagination"],
  wc: "minerva-pagination",
  parts: {
    root: { description: "The <nav> landmark" },
    item: {
      description:
        "A page / previous / next / jump button (the current page has aria-current=page). Item states: current (the current page), disabled",
      itemStates: { current: true, disabled: true },
    },
    total: { description: "The total text" },
    jumper: { description: "The quick jumper label (wraps its input)" },
    "size-changer": { description: "The page size Select wrapper" },
    "size-changer-trigger": {
      description:
        "The nested Select combobox trigger through the web component shadow root",
      only: "wc",
    },
    "size-changer-value": {
      description:
        "The nested Select value through the web component shadow root",
      only: "wc",
    },
    "size-changer-icon": {
      description:
        "The nested Select chevron through the web component shadow root",
      only: "wc",
    },
    "size-changer-content": {
      description:
        "The nested Select listbox through the web component shadow root",
      only: "wc",
    },
    "simple-input": { description: "The page input of the simple mode" },
  },
  states: {
    disabled: true,
    size: ["small", "medium", "large"],
    shape: ["circle", "rounded", "square"],
    variant: ["solid", "outline", "ghost"],
  },
});
