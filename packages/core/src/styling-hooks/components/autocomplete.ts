import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A text input (combobox) suggesting filtered options in a dropdown listbox",
  react: ["AutoComplete"],
  wc: "minerva-autocomplete",
  parts: {
    root: {
      description: "The root wrapper (label, field and anchor of the dropdown)",
      states: ["state", "disabled", "readonly", "loading"],
    },
    label: { description: "The visible label" },
    field: {
      description:
        "The input box (web components only: React renders a nested Input, style its hooks)",
      only: "wc",
    },
    input: {
      description:
        "The native <input role=combobox> (web components only: React renders a nested Input, style its hooks)",
      only: "wc",
    },
    content: {
      description: "The positioned dropdown",
      states: ["state", "side", "align", "placement"],
    },
    list: { description: "The role=listbox list" },
    item: {
      description:
        "An option. Item states: highlighted (active option or hovered), disabled",
      itemStates: { highlighted: true, disabled: true },
    },
    "group-label": { description: "A group heading" },
    empty: { description: "The empty state (no matching option)" },
    loading: { description: "The loading state (while loading)" },
  },
  states: {
    state: ["open", "closed"],
    disabled: true,
    readonly: true,
    loading: true,
    side: ["top", "right", "bottom", "left"],
    align: ["start", "end"],
    placement: [
      "top-start",
      "top-end",
      "right-start",
      "right-end",
      "bottom-start",
      "bottom-end",
      "left-start",
      "left-end",
    ],
  },
});
