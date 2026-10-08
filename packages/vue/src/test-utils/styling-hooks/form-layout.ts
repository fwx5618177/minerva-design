import { h } from "vue";
import { FormLayout } from "../../components/FormLayout";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    render: () =>
      h(FormLayout, { columns: { base: 1, md: 2 } }, () =>
        h("input", { "aria-label": "Name" }),
      ),
  },
] satisfies HookScenario[];
