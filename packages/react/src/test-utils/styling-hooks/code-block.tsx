import { CodeBlock } from "../../components/CodeBlock";
import type { HookScenario } from "./types";

export default [
  { name: "plain", element: <CodeBlock>{"const a = 1;"}</CodeBlock> },
  {
    name: "copyable",
    element: <CodeBlock copyable>{"const a = 1;"}</CodeBlock>,
  },
] satisfies HookScenario[];
