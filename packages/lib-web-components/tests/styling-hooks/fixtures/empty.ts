import type { WcHookScenario } from "../types";

export default [
  {
    name: "every part, sized",
    html: `<minerva-empty size="small" heading="No orders" description="Create one to start">
      <a slot="action" href="/new">New</a>
      Footer
    </minerva-empty>`,
  },
] satisfies WcHookScenario[];
