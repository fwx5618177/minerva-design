import { defineHooks } from "../types";

export default defineHooks({
  description: "A multi-line text field sharing the input's look",
  react: ["Textarea"],
  wc: "minerva-textarea",
  parts: {
    root: { description: "The native <textarea>" },
  },
  states: {
    disabled: true,
    invalid: true,
    readonly: true,
    required: true,
    size: ["small", "medium", "large"],
    variant: ["outline", "filled", "unstyled"],
  },
});
