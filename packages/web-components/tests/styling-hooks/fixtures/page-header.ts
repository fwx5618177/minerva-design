import type { WcHookScenario } from "../types";

export default [
  {
    name: "full",
    html: `<minerva-page-header heading="Title" description="Description">
      <span slot="actions">Action</span>
    </minerva-page-header>`,
  },
  {
    name: "title only",
    html: `<minerva-page-header heading="Title"></minerva-page-header>`,
  },
] satisfies WcHookScenario[];
