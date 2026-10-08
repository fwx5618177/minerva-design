import type { WcHookScenario } from "../types";

export default [
  {
    name: "stepper, every key, required",
    html: `<minerva-number-input aria-label="Qty" value="1" show-stepper size="small" required></minerva-number-input>`,
  },
  {
    name: "invalid, read-only",
    html: `<minerva-number-input aria-label="Qty" invalid readonly></minerva-number-input>`,
  },
  {
    name: "disabled",
    html: `<minerva-number-input aria-label="Qty" disabled></minerva-number-input>`,
  },
] satisfies WcHookScenario[];
