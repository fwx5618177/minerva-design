import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A field container: a label with a required indicator, one control, a helper text and an error message",
  react: [
    "FormControl",
    "FormLabel",
    "FormHelperText",
    "FormErrorMessage",
    "FormField",
  ],
  wc: "minerva-form-control",
  parts: {
    root: { description: "The field container" },
    label: { description: "The <label>" },
    "required-indicator": { description: "The required marker of the label" },
    "helper-text": { description: "The helper text (hidden while invalid)" },
    "error-message": {
      description: 'The error message (role="alert", while invalid)',
    },
  },
  states: {
    disabled: true,
    invalid: true,
    readonly: true,
    required: true,
  },
});
