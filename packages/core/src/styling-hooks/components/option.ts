import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A selectable option of a select (role=option); its states are the item states of the select's options: selected, highlighted, disabled",
  react: ["SelectItem"],
  wc: "minerva-option",
  parts: {
    root: { description: "The option row" },
    label: { description: "The content wrapper" },
    indicator: { description: "The check mark (while selected)" },
  },
  states: {
    selected: true,
    highlighted: true,
    disabled: true,
  },
});
