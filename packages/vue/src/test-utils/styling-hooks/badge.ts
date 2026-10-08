import { h } from "vue";
import { Badge } from "../../components/Badge";
import type { HookScenario } from "./types";

export default [
  {
    name: "standalone",
    render: () => h(Badge, null, { default: () => "5", icon: () => h("svg") }),
  },
  {
    name: "attached, every key",
    render: () =>
      h(
        Badge,
        { content: "3", size: "small", variant: "outline", color: "danger" },
        () => h("button", { type: "button" }, "Inbox"),
      ),
  },
] satisfies HookScenario[];
