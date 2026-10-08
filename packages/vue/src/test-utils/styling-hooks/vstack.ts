import { h } from "vue";
import { VStack } from "../../components/Stack";
import type { HookScenario } from "./types";

export default [
  { name: "default", render: () => h(VStack, { gap: 2 }, () => "A") },
] satisfies HookScenario[];
