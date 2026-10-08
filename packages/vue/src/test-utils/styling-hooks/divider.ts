import { h } from "vue";
import { Divider } from "../../components/Divider";
import type { HookScenario } from "./types";

export default [
  { name: "default", render: () => h(Divider) },
  {
    name: "with text, every key",
    render: () =>
      h(Divider, { variant: "dashed", textAlign: "left" }, () => "Or"),
  },
  { name: "vertical", render: () => h(Divider, { orientation: "vertical" }) },
] satisfies HookScenario[];
