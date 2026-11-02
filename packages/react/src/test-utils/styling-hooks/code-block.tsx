import { CodeBlock } from "../../components/CodeBlock";
import type { HookScenario } from "./types";

export default [
  { name: "plain", element: <CodeBlock>{"const a = 1;"}</CodeBlock> },
  {
    name: "copyable",
    element: <CodeBlock copyable>{"const a = 1;"}</CodeBlock>,
  },
  {
    name: "highlighted, line numbers, language",
    element: (
      <CodeBlock
        language="js"
        showLineNumbers
        showLanguage
        marks={[{ start: 6, end: 7 }]}
      >
        {"const a = 1;"}
      </CodeBlock>
    ),
  },
] satisfies HookScenario[];
