import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A single-line text field with prefix / suffix, clear button, password toggle and character count",
  react: ["Input"],
  wc: "minerva-input",
  parts: {
    root: { description: "The field box (wraps the input and its addons)" },
    input: { description: "The native <input>" },
    prefix: { description: "The content before the text" },
    suffix: { description: "The content after the text" },
    "clear-button": {
      description: "The clear button (while there is a value)",
    },
    "password-toggle": {
      description: "The password visibility toggle (type=password)",
    },
    count: { description: "The character counter" },
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
