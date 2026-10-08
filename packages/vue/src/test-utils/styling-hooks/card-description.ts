import { h } from "vue";
import { Card, CardDescription } from "../../components/Card";
import type { HookScenario } from "./types";

export default [
  {
    name: "in a card",
    render: () => h(Card, null, () => h(CardDescription, null, () => "Text")),
  },
] satisfies HookScenario[];
