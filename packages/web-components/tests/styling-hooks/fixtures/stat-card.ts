import type { WcHookScenario } from "../types";

export default [
  {
    name: "full",
    html: `<minerva-stat-card label="Users" value="42" description="Last 30 days">
      <svg slot="icon"></svg>
    </minerva-stat-card>`,
  },
] satisfies WcHookScenario[];
