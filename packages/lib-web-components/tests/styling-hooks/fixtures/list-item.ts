import type { WcHookScenario } from "../types";

export default [
  {
    name: "full",
    html: `<minerva-list>
      <minerva-list-item primary="Primary" secondary="Secondary">
        <svg slot="icon"></svg>
        <span slot="actions">Action</span>
      </minerva-list-item>
    </minerva-list>`,
  },
] satisfies WcHookScenario[];
