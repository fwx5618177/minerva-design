import { useRef, useState } from "react";
import { Button, CodeBlock, type CodeMark } from "minerva-design";
import { getCodeSelectionRange } from "minerva-design/core";

const source = `export async function fetchUser(id: string) {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) throw new Error("Request failed");
  return response.json();
}`;

// offsets are UTF-16 offsets into `source` (e.g. from getCodeSelectionRange)
const initial: CodeMark[] = [
  { id: "n1", start: 71, end: 96, title: "Template literal URL" },
  {
    id: "n2",
    start: 104,
    end: 116,
    color: "danger",
    title: "Check the status",
  },
];

export default function MarksDemo() {
  const ref = useRef<HTMLPreElement>(null);
  const [marks, setMarks] = useState(initial);
  const [status, setStatus] = useState("");

  const highlightSelection = () => {
    const range = ref.current && getCodeSelectionRange(ref.current);
    if (!range) return setStatus("Select some code first");
    const id = `n${Date.now()}`;
    setMarks((list) => [
      ...list,
      { id, start: range.start, end: range.end, color: "success" },
    ]);
    setStatus(`Highlighted “${range.text}” (${range.start}–${range.end})`);
  };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <CodeBlock
        ref={ref}
        aria-label="Annotated function"
        language="ts"
        showLineNumbers
        copyable
        marks={marks}
        onMarkClick={(mark) => {
          setMarks((list) => list.filter((m) => m.id !== mark.id));
          setStatus(`Removed ${mark.title ?? "highlight"}`);
        }}
      >
        {source}
      </CodeBlock>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Button
          size="small"
          variant="outline"
          // keep the selection: do not move the focus on press
          onMouseDown={(event) => event.preventDefault()}
          onClick={highlightSelection}
        >
          Highlight selection
        </Button>
        <Button size="small" variant="ghost" onClick={() => setMarks([])}>
          Clear
        </Button>
        <output>{status}</output>
      </div>
    </div>
  );
}
