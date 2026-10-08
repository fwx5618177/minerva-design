import type { WcHookScenario } from "../types";

export default [
  {
    name: "current, disabled, icon, action, closable",
    html: `<minerva-page-tabs aria-label="Open pages" active-value="a">
      <minerva-page-tab value="a" label="A" closable>
        <svg slot="icon"></svg>
      </minerva-page-tab>
      <minerva-page-tab value="b" label="B" disabled>
        <button slot="action">x</button>
      </minerva-page-tab>
    </minerva-page-tabs>`,
  },
] satisfies WcHookScenario[];
