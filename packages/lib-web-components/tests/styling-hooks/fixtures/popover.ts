import type { WcHookScenario } from "../types";

export default [
  {
    name: "open, with arrow",
    html: `<minerva-popover open arrow side="top" align="start" label="Details">
      <button slot="trigger">Open</button>
      Content
    </minerva-popover>`,
  },
  {
    name: "closed",
    html: `<minerva-popover label="Details">
      <button slot="trigger">Open</button>
      Content
    </minerva-popover>`,
  },
] satisfies WcHookScenario[];
