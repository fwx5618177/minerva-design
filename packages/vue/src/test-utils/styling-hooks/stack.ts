import { h } from "vue";
import { Stack } from "../../components/Stack";
import type { HookScenario } from "./types";

export default [
  { name: "column", render: () => h(Stack, { gap: 2 }, () => "A") },
  {
    name: "row, separator",
    render: () =>
      h(Stack, { direction: "row-reverse", separator: "·" }, () => [
        h("span", "A"),
        h("span", "B"),
      ]),
  },
] satisfies HookScenario[];
