import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A text field that collects a list of tags, with optional suggestions",
  react: ["TagInput"],
  wc: "minerva-tag-input",
  parts: {
    root: { description: "The wrapper" },
    tags: { description: "The list of tags" },
    tag: {
      description:
        "A tag (web components only: React renders a Tag, styled with its own hooks)",
      only: "wc",
    },
    "remove-button": {
      description: "The remove button of a tag (web components only, see tag)",
      only: "wc",
    },
    control: {
      description:
        "The text field box (web components only: React renders an Input, styled with its own hooks)",
      only: "wc",
    },
    input: {
      description:
        'The native text <input> (role="combobox"; web components only, see control)',
      only: "wc",
    },
    list: { description: "The suggestion list (role=listbox, while open)" },
    option: {
      description:
        'A suggestion (role=option; the highlighted one has aria-selected="true. Item state: highlighted")',
      itemStates: { highlighted: true },
    },
    empty: { description: "The text shown when no suggestion matches" },
    "add-button": {
      description:
        "The add button (web components only: React renders an IconButton, styled with its own hooks)",
      only: "wc",
    },
    "clear-button": {
      description:
        "The clear button (web components only: React renders an IconButton, styled with its own hooks)",
      only: "wc",
    },
  },
  states: {
    state: ["open", "closed"],
    disabled: true,
    invalid: true,
    readonly: true,
    required: true,
    size: ["small", "medium", "large"],
  },
});
