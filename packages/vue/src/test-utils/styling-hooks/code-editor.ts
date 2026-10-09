import { h } from "vue";
import { MonacoCodeEditor } from "../../monaco";
import type { HookScenario } from "./types";

export default [
  {
    name: "loading",
    render: () => h(MonacoCodeEditor, { label: "Source", modelValue: "text" }),
  },
  {
    name: "disabled fallback",
    render: () =>
      h(MonacoCodeEditor, {
        label: "Source",
        modelValue: "text",
        disabled: true,
        loadTimeout: 1,
      }),
    setup: async () => {
      await new Promise((resolve) => setTimeout(resolve, 5));
    },
  },
] satisfies HookScenario[];
