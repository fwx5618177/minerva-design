import type { WcHookScenario } from "../types";

export default [
  {
    name: "rows",
    html: `<minerva-key-value-editor aria-label="Headers" value='{"Accept":"*/*"}'></minerva-key-value-editor>`,
  },
  {
    name: "disabled",
    html: `<minerva-key-value-editor aria-label="Headers" disabled></minerva-key-value-editor>`,
  },
] satisfies WcHookScenario[];
