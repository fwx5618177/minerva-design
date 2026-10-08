import { h } from "vue";
import { Card, CardTitle } from "../../components/Card";
import type { HookScenario } from "./types";

export default [
  {
    name: "in a card",
    render: () => h(Card, null, () => h(CardTitle, null, () => "Text")),
  },
] satisfies HookScenario[];
