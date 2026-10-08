import type { WcHookScenario } from "../types";

export default [
  {
    name: "toolbar, invalid JSON, required",
    html: `<minerva-json-field aria-label="Config" value="{" required></minerva-json-field>`,
  },
  {
    name: "disabled, read-only",
    html: `<minerva-json-field aria-label="Config" value="{}" disabled readonly></minerva-json-field>`,
  },
] satisfies WcHookScenario[];
