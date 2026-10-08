import type { WcHookScenario } from "../types";

export default [
  {
    name: "full",
    html: `<minerva-page-section heading="Title" description="Description">
      <svg slot="icon"></svg>
      <span slot="actions">Action</span>
      Content
    </minerva-page-section>`,
  },
] satisfies WcHookScenario[];
