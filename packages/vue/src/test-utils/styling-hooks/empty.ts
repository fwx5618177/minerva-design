import { h } from "vue";
import { Empty } from "../../components/Empty";
import type { HookScenario } from "./types";

export default [
  {
    name: "every part, sized",
    render: () =>
      h(
        Empty,
        {
          size: "small",
          title: "No orders",
          description: "Create one to start",
        },
        {
          default: () => "Footer",
          action: () => h("a", { href: "/new" }, "New"),
        },
      ),
  },
] satisfies HookScenario[];
