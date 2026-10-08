import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A set of radios of which one can be selected, with a label and a helper text",
  react: ["RadioGroup"],
  wc: "minerva-radio-group",
  parts: {
    root: { description: "The wrapper" },
    label: { description: "The visible group label" },
    list: { description: 'The element with role="radiogroup" (the radios)' },
    "helper-text": { description: "The helper text" },
  },
  states: {
    disabled: true,
    invalid: true,
    required: true,
    orientation: ["horizontal", "vertical"],
    size: ["small", "medium", "large"],
    color: ["primary", "success", "warning", "danger"],
  },
});
