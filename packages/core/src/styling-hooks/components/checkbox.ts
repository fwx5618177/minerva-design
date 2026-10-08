import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A native checkbox with a label, a helper text and an indeterminate state",
  react: ["Checkbox"],
  wc: "minerva-checkbox",
  parts: {
    root: {
      description: "The wrapper (the clickable row and the helper text)",
    },
    input: { description: 'The native <input type="checkbox">' },
    control: { description: "The visual box (draws the checkmark)" },
    label: { description: "The label text" },
    "helper-text": { description: "The helper / error text" },
  },
  states: {
    state: ["checked", "unchecked", "indeterminate"],
    disabled: true,
    invalid: true,
    readonly: true,
    required: true,
    size: ["small", "medium", "large"],
    color: ["primary", "success", "info", "warning", "danger"],
    shape: ["square", "circle", "rounded"],
  },
});
