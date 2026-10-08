import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A strict-JSON text field with a format button and syntax feedback",
  react: ["JsonField"],
  wc: "minerva-json-field",
  parts: {
    root: { description: "The wrapper" },
    toolbar: { description: "The toolbar above the text (format button)" },
    "format-button": {
      description:
        "The format button (web components only: React renders an IconButton, styled with its own hooks)",
      only: "wc",
    },
    input: {
      description:
        "The native <textarea> (web components only: React renders a Textarea, styled with its own hooks)",
      only: "wc",
    },
    status: { description: "The validation status line (role=status)" },
  },
  states: {
    disabled: true,
    invalid: true,
    readonly: true,
    required: true,
  },
});
