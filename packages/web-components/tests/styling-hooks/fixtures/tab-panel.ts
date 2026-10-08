import type { WcHookScenario } from "../types";

export default [
  {
    name: "active and inactive",
    html: `<minerva-tabs value="a">
      <minerva-tab value="a">A</minerva-tab>
      <minerva-tab value="b">B</minerva-tab>
      <minerva-tab-panel value="a">Panel A</minerva-tab-panel>
      <minerva-tab-panel value="b">Panel B</minerva-tab-panel>
    </minerva-tabs>`,
  },
] satisfies WcHookScenario[];
