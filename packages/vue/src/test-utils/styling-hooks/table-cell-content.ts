import { h } from "vue";
import { TableCellContent } from "../../components/Table";
import type { HookScenario } from "./types";

export default [
  {
    name: "primary only",
    render: () => h(TableCellContent, { primary: "Ada" }),
  },
  {
    name: "monospace, secondary",
    render: () =>
      h(TableCellContent, {
        primary: "a1b2",
        secondary: "Commit",
        monospace: true,
      }),
  },
] satisfies HookScenario[];
