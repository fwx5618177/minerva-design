import { defineHooks } from "../types";

export default defineHooks({
  description: "A selectable option of a select (role=option)",
  react: ["SelectItem"],
  wc: "minerva-option",
  parts: {
    root: { description: "The option row" },
    label: { description: "The content wrapper" },
    indicator: { description: "The check mark (while selected)" },
  },
  states: {
    state: ["checked", "unchecked"],
    highlighted: true,
    disabled: true,
  },
});
