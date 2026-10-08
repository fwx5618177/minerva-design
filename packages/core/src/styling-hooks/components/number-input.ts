import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A numeric field (spinbutton) with min / max / step and stepper buttons",
  react: ["NumberInput"],
  wc: "minerva-number-input",
  parts: {
    root: { description: "The field box (wraps the input and the stepper)" },
    input: { description: 'The native <input> (role="spinbutton")' },
    stepper: { description: "The increment / decrement column" },
    increment: { description: "The increment button" },
    decrement: { description: "The decrement button" },
  },
  states: {
    disabled: true,
    invalid: true,
    readonly: true,
    required: true,
    size: ["small", "medium", "large"],
  },
});
