import { h } from "vue";
import { SplitLayout } from "../../components/SplitLayout";
import type { HookScenario } from "./types";

export default [
  {
    name: "with aside",
    render: () => h(SplitLayout, { aside: "Aside" }, () => "Main"),
  },
  {
    name: "without aside",
    render: () => h(SplitLayout, { aside: null }, () => "Main"),
  },
] satisfies HookScenario[];
