import { h } from "vue";
import { Box } from "../../components/Box";
import type { HookScenario } from "./types";

export default [
  { name: "default", render: () => h(Box, { p: 2 }, () => "Content") },
  { name: "as", render: () => h(Box, { as: "section" }, () => "Content") },
] satisfies HookScenario[];
