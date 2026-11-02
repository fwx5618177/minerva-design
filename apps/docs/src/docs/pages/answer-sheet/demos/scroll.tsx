import { useState } from "react";
import { AnswerSheet, type AnswerSheetItem } from "minerva-design";

const items: AnswerSheetItem[] = Array.from({ length: 40 }, (_, i) => ({
  key: `q${i + 1}`,
  status: i < 14 ? "answered" : i === 14 ? "skipped" : "unanswered",
  flagged: i === 8,
}));

export default function ScrollDemo() {
  const [value, setValue] = useState("q16");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 360 }}>
      <AnswerSheet
        items={items}
        value={value}
        onChange={setValue}
        layout="scroll"
        size="small"
      />
      <p style={{ margin: 0 }}>Current question: {value.slice(1)}</p>
    </div>
  );
}
