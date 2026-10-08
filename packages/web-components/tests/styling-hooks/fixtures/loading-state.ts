import type { WcHookScenario } from "../types";

export default [
  { name: "default", html: `<minerva-loading-state></minerva-loading-state>` },
  {
    name: "small",
    html: `<minerva-loading-state size="small" label="Loading"></minerva-loading-state>`,
  },
] satisfies WcHookScenario[];
