import { h } from "vue";
import { List, ListItem } from "../../components/List";
import type { HookScenario } from "./types";

export default [
  {
    name: "full",
    render: () =>
      h(List, null, () =>
        h(
          ListItem,
          { primary: "Primary", secondary: "Secondary" },
          { icon: () => h("svg"), actions: () => h("span", "Action") },
        ),
      ),
  },
  {
    name: "primary only",
    render: () => h(List, null, () => h(ListItem, { primary: "Primary" })),
  },
] satisfies HookScenario[];
