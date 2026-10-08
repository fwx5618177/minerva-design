import { h } from "vue";
import { Prose } from "../../components/Prose";
import type { HookScenario } from "./types";

export default [
  { name: "default", render: () => h(Prose, null, () => h("p", "Text")) },
  {
    name: "asChild",
    render: () => h(Prose, { asChild: true }, () => h("article", "Text")),
  },
] satisfies HookScenario[];
