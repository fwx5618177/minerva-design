import { h } from "vue";
import { HStack } from "../../components/Stack";
import type { HookScenario } from "./types";

export default [
  { name: "default", render: () => h(HStack, { gap: 2 }, () => "A") },
] satisfies HookScenario[];
