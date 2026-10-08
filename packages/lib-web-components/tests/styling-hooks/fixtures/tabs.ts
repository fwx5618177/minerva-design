import type { WcHookScenario } from "../types";

export default [
  {
    name: "default",
    html: `<minerva-tabs value="a">
      <minerva-tab value="a">A</minerva-tab>
      <minerva-tab-panel value="a">Panel A</minerva-tab-panel>
    </minerva-tabs>`,
  },
  {
    name: "vertical pills, colored",
    html: `<minerva-tabs value="a" orientation="vertical" variant="pills" color="danger">
      <minerva-tab value="a">A</minerva-tab>
    </minerva-tabs>`,
  },
] satisfies WcHookScenario[];
