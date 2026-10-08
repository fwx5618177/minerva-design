import type { WcHookScenario } from "../types";

export default [
  {
    name: "default",
    html: `<minerva-responsive-grid columns="1 2 3"><minerva-grid-item>A</minerva-grid-item></minerva-responsive-grid>`,
  },
] satisfies WcHookScenario[];
