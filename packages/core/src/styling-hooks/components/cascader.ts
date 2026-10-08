import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A field picking a path in a tree of options through cascading columns (optionally searchable)",
  react: ["Cascader"],
  wc: "minerva-cascader",
  parts: {
    root: {
      description: "The root wrapper (anchor of the dropdown)",
      states: ["state", "disabled", "readonly", "invalid"],
    },
    control: { description: "The field box (input, clear button, chevron)" },
    input: {
      description:
        "The native <input role=combobox> (web components only: React renders a nested Input, style its hooks)",
      only: "wc",
    },
    "clear-button": {
      description: "The clear button (while there is a value)",
    },
    icon: { description: "The chevron" },
    content: {
      description: "The positioned dropdown",
      states: ["state", "side", "align", "placement"],
    },
    column: { description: "A column of options (role=listbox)" },
    item: { description: "An option (column option or search result)" },
  },
  states: {
    state: ["open", "closed"],
    disabled: true,
    readonly: true,
    invalid: true,
    side: ["top", "bottom"],
    align: ["start", "end"],
    placement: ["bottom-start", "bottom-end", "top-start", "top-end"],
  },
});
