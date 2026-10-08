import { h } from "vue";
import { Toolbar } from "../../components/Page";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    render: () =>
      h(Toolbar, { "aria-label": "Filters", density: "compact" }, () =>
        h("span", "Control"),
      ),
  },
] satisfies HookScenario[];
