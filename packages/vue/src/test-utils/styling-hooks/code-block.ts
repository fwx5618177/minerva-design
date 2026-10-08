import { h } from "vue";
import { CodeBlock } from "../../components/CodeBlock";
import type { HookScenario } from "./types";

export default [
  { name: "plain", render: () => h(CodeBlock, { code: "const a = 1;" }) },
  {
    name: "copyable",
    render: () => h(CodeBlock, { code: "const a = 1;", copyable: true }),
  },
] satisfies HookScenario[];
