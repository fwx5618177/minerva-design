import type { WcHookScenario } from "../types";

export default [
  {
    name: "label, required indicator, helper text",
    html: `<minerva-form-control label="Email" helper-text="We never share it" required><input /></minerva-form-control>`,
  },
  {
    name: "invalid: error message",
    html: `<minerva-form-control label="Email" error-message="Invalid email" invalid><input /></minerva-form-control>`,
  },
  {
    name: "disabled, read-only",
    html: `<minerva-form-control label="Email" disabled readonly><input /></minerva-form-control>`,
  },
] satisfies WcHookScenario[];
