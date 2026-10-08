import type { WcHookScenario } from "../types";

export default [
  {
    name: "label, helper text, checked, every key",
    html: `<minerva-checkbox label="Accept" helper-text="Required" checked required size="small" color="success" shape="rounded"></minerva-checkbox>`,
  },
  {
    name: "indeterminate, invalid",
    html: `<minerva-checkbox aria-label="All" indeterminate error></minerva-checkbox>`,
  },
  {
    name: "unchecked, read-only",
    html: `<minerva-checkbox aria-label="Accept" readonly></minerva-checkbox>`,
  },
  {
    name: "disabled",
    html: `<minerva-checkbox aria-label="Accept" disabled></minerva-checkbox>`,
  },
] satisfies WcHookScenario[];
