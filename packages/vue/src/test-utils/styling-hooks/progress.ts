import { h } from "vue";
import { ProgressIndicator } from "../../components/ProgressIndicator";
import type { HookScenario } from "./types";

export default [
  { name: "default", render: () => h(ProgressIndicator) },
  {
    name: "icon, label, every key",
    render: () =>
      h(
        ProgressIndicator,
        { variant: "bar", size: "small", color: "neutral", label: "Uploading" },
        { icon: () => h("svg") },
      ),
  },
  {
    name: "determinate value",
    render: () =>
      h(ProgressIndicator, {
        variant: "circle",
        color: "success",
        value: 40,
        showValue: true,
      }),
  },
] satisfies HookScenario[];
