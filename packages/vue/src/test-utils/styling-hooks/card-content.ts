import { h } from "vue";
import { Card, CardContent } from "../../components/Card";
import type { HookScenario } from "./types";

export default [
  {
    name: "in a card",
    render: () => h(Card, null, () => h(CardContent, null, () => "Text")),
  },
] satisfies HookScenario[];
