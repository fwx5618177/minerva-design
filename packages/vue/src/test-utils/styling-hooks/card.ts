import { h } from "vue";
import { Card } from "../../components/Card";
import type { HookScenario } from "./types";

export default [
  { name: "default", render: () => h(Card, null, () => "Content") },
  {
    name: "disabled button card",
    render: () =>
      h(
        Card,
        { as: "button", variant: "elevated", disabled: true },
        () => "Content",
      ),
  },
] satisfies HookScenario[];
