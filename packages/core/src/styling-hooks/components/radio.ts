import { defineHooks } from "../types";

export default defineHooks({
  description: "A radio button with a label and a helper / error text",
  react: ["Radio"],
  wc: "minerva-radio",
  parts: {
    root: {
      description: "The wrapper (the clickable row and the helper text)",
    },
    input: {
      description:
        'The native <input type="radio"> (React only: the web component host is the radio itself)',
      only: "react",
    },
    control: { description: "The visual radio mark" },
    label: { description: "The label text" },
    "helper-text": { description: "The helper / error text" },
  },
  states: {
    state: ["checked", "unchecked"],
    disabled: true,
    invalid: true,
    size: ["small", "medium", "large"],
    color: ["primary", "success", "warning", "danger"],
  },
});
