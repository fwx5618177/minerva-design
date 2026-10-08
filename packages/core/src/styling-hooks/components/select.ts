import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A single-choice dropdown: a combobox trigger and a listbox popup of options",
  react: ["Select"],
  wc: "minerva-select",
  parts: {
    root: {
      description: "The trigger (<button role=combobox>)",
      states: ["state", "disabled", "invalid", "required", "size"],
    },
    value: { description: "The selected label / placeholder" },
    icon: { description: "The chevron" },
    content: {
      description: "The listbox popup (role=listbox)",
      states: ["state", "side", "align", "placement"],
    },
    item: {
      description:
        "An option rendered from the `options` property (web components only: React options are SelectItem elements, see option). Item states: selected, highlighted, disabled",
      only: "wc",
      itemStates: { selected: true, highlighted: true, disabled: true },
    },
    "group-label": {
      description:
        "A group heading rendered from the `options` property (web components only: React uses SelectLabel, see select-label)",
      only: "wc",
    },
  },
  states: {
    state: ["open", "closed"],
    disabled: true,
    invalid: true,
    required: true,
    size: ["small", "medium", "large"],
    side: ["top", "bottom"],
    align: ["start", "end"],
    placement: ["bottom-start", "bottom-end", "top-start", "top-end"],
  },
});
