import { CodeBlock } from "@minerva/lib-core";

const command = "pnpm add @minerva/lib-core @minerva/core";

export default function CopyableDemo() {
  return (
    <CodeBlock aria-label="Install command" copyable>
      {command}
    </CodeBlock>
  );
}
