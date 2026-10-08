import { h } from "vue";
import { Card, CardHeader } from "../../components/Card";
import type { HookScenario } from "./types";

export default [
  {
    name: "in a card",
    render: () => h(Card, null, () => h(CardHeader, null, () => "Text")),
  },
] satisfies HookScenario[];
