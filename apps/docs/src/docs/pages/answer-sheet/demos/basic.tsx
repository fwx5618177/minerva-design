import { useState } from "react";
import { AnswerSheet, type AnswerSheetItem } from "minerva-design";

const items: AnswerSheetItem[] = Array.from({ length: 12 }, (_, i) => ({
  key: `q${i + 1}`,
  status: i < 5 ? "answered" : "unanswered",
}));

export default function BasicDemo() {
  const [value, setValue] = useState("q6");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <AnswerSheet items={items} value={value} onChange={setValue} />
      <p style={{ margin: 0 }}>Current question: {value.slice(1)}</p>
    </div>
  );
}
