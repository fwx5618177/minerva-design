import { h } from "vue";
import { ResponsiveGrid } from "../../components/ResponsiveGrid";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    render: () => h(ResponsiveGrid, { columns: { base: 1, md: 3 } }, () => "A"),
  },
] satisfies HookScenario[];
