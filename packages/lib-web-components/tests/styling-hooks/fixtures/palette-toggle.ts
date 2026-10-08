import type { WcHookScenario } from "../types";

export default [
  {
    name: "default",
    html: `<minerva-palette-toggle></minerva-palette-toggle>`,
  },
  {
    name: "the default look offered and active",
    html: `<minerva-palette-toggle show-default></minerva-palette-toggle>`,
  },
] satisfies WcHookScenario[];
