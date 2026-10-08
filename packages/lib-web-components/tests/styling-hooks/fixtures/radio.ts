import type { WcHookScenario } from "../types";

export default [
  {
    name: "label, helper text, checked, every key",
    html: `<minerva-radio label="Card" helper-text="Visa, Mastercard" checked size="small" color="success"></minerva-radio>`,
  },
  {
    name: "unchecked, invalid",
    html: `<minerva-radio aria-label="Cash" error error-message="Pick one"></minerva-radio>`,
  },
  {
    name: "disabled",
    html: `<minerva-radio aria-label="Cash" disabled></minerva-radio>`,
  },
] satisfies WcHookScenario[];
