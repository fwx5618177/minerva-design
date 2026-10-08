import { useState } from "react";
import { CodeBlock } from "@minerva/lib-core";

const command = "pnpm add @minerva/lib-core @minerva/core";

export default function CopyableDemo() {
  const [copied, setCopied] = useState("");
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <CodeBlock
        aria-label="Install command"
        copyable
        onCopied={(text) => setCopied(`Copied ${text.length} characters`)}
      >
        {command}
      </CodeBlock>
      <output>{copied}</output>
    </div>
  );
}
