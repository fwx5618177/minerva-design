import type { WcHookScenario } from "../types";

export default [
  {
    name: "with aside",
    html: `<minerva-split-layout>Main<div slot="aside">Aside</div></minerva-split-layout>`,
  },
  {
    name: "without aside",
    html: `<minerva-split-layout>Main</minerva-split-layout>`,
  },
] satisfies WcHookScenario[];
