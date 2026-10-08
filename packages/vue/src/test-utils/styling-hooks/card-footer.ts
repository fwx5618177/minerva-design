import { h } from "vue";
import { Card, CardFooter } from "../../components/Card";
import type { HookScenario } from "./types";

export default [
  {
    name: "in a card",
    render: () => h(Card, null, () => h(CardFooter, null, () => "Text")),
  },
] satisfies HookScenario[];
