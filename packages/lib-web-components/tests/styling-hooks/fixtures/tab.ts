import type { WcHookScenario } from "../types";

export default [
  {
    name: "active, inactive, disabled, colored",
    html: `<minerva-tabs value="a" variant="soft" orientation="vertical">
      <minerva-tab value="a">A</minerva-tab>
      <minerva-tab value="b" color="success">B</minerva-tab>
      <minerva-tab value="c" disabled>C</minerva-tab>
    </minerva-tabs>`,
  },
] satisfies WcHookScenario[];
