import { CodeBlock } from "minerva-design";

const source = `import { useState } from "react";
import { Button } from "minerva-design";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <Button onClick={() => setCount((n) => n + 1)}>
      Clicked {count} times
    </Button>
  );
}`;

export default function LineNumbersDemo() {
  return (
    <CodeBlock
      aria-label="Counter component"
      language="tsx"
      showLineNumbers
      showLanguage
      copyable
    >
      {source}
    </CodeBlock>
  );
}
