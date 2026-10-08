import { h } from "vue";
import { StatCard } from "../../components/Page";
import type { HookScenario } from "./types";

export default [
  {
    name: "full",
    render: () =>
      h(
        StatCard,
        { label: "Users", value: 42, description: "Active" },
        { icon: () => h("svg") },
      ),
  },
] satisfies HookScenario[];
