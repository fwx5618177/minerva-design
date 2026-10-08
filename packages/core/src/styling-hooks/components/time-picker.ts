import { defineHooks } from "../types";

export default defineHooks({
  description: "A time field with a popup of hours / minutes / seconds columns",
  react: ["TimePicker"],
  wc: "minerva-time-picker",
  parts: {
    root: {
      description: "The field wrapper (anchor of the panel)",
      states: ["state", "disabled", "readonly", "invalid", "size"],
    },
    control: {
      description:
        "The input box (web components only: React renders a nested Input, style its hooks)",
      only: "wc",
    },
    input: {
      description:
        "The native <input> (web components only: React renders a nested Input, style its hooks)",
      only: "wc",
    },
    "clear-button": {
      description:
        "The clear button (web components only: React renders a nested IconButton, style its hooks)",
      only: "wc",
    },
    icon: {
      description: "The clock icon (shown when there is no clear button)",
    },
    content: {
      description: "The popup panel (role=dialog)",
      states: ["state", "side", "align", "placement"],
    },
    column: {
      description: "An hours / minutes / seconds / AM-PM column (role=listbox)",
    },
    item: { description: "A time unit (role=option)" },
  },
  states: {
    state: ["open", "closed"],
    disabled: true,
    readonly: true,
    invalid: true,
    size: ["small", "medium", "large"],
    side: ["top", "bottom"],
    align: ["start", "end"],
    placement: ["bottom-start", "bottom-end", "top-start", "top-end"],
  },
});
