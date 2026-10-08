import { h } from "vue";
import { List, ListItem } from "../../components/List";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    render: () =>
      h(List, { density: "compact" }, () => h(ListItem, { primary: "Row" })),
  },
] satisfies HookScenario[];
