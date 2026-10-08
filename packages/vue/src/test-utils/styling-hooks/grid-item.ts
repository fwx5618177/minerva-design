import { h } from "vue";
import { GridItem } from "../../components/ResponsiveGrid";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    render: () => h(GridItem, { fullWidth: true }, () => "A"),
  },
  {
    name: "asChild",
    render: () => h(GridItem, { asChild: true }, () => h("section", "A")),
  },
] satisfies HookScenario[];
