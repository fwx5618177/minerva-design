import { h } from "vue";
import { LoadingState } from "../../components/LoadingState";
import type { HookScenario } from "./types";

export default [
  { name: "default", render: () => h(LoadingState) },
  {
    name: "small",
    render: () => h(LoadingState, { size: "small", label: "Loading" }),
  },
] satisfies HookScenario[];
