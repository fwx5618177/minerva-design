import type { WcHookScenario } from "../types";

export default [
  {
    name: "primary only",
    html: `<minerva-table-cell-content primary="Ada"></minerva-table-cell-content>`,
  },
  {
    name: "monospace, secondary",
    html: `<minerva-table-cell-content primary="a1b2" secondary="Commit" monospace></minerva-table-cell-content>`,
  },
] satisfies WcHookScenario[];
