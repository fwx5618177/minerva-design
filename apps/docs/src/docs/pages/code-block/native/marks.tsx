import { useState } from "react";
import { Text } from "react-native";
import { CodeBlock, type CodeMark } from "minerva-design/native";

const payload = JSON.stringify(
  { id: 42, title: "The Three-Body Problem", tags: ["sci-fi", "classic"] },
  null,
  2,
);

// offsets are UTF-16 offsets into `payload`
const initial: CodeMark[] = [
  { id: "title", start: 16, end: 49, title: "Title" },
  { id: "tags", start: 53, end: 94, color: "info", title: "Tags" },
];

export default function Marks() {
  const [pressed, setPressed] = useState("Tap a highlight");
  return (
    <>
      <CodeBlock
        language="json"
        showLineNumbers
        marks={initial}
        onMarkClick={(mark) => setPressed(`Pressed: ${mark.title}`)}
        children={payload}
      />
      <Text>{pressed}</Text>
    </>
  );
}
