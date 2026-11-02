import { useState } from "react";
import {
  AnswerSheet,
  type AnswerSheetGroup,
  type AnswerSheetItem,
} from "minerva-design";

const groups: AnswerSheetGroup[] = [
  { key: "single", title: "Single choice" },
  { key: "multiple", title: "Multiple choice" },
  { key: "short", title: "Short answer" },
];

const items: AnswerSheetItem[] = [
  { key: "s1", group: "single", status: "correct" },
  { key: "s2", group: "single", status: "correct" },
  { key: "s3", group: "single", status: "wrong", flagged: true },
  { key: "s4", group: "single", status: "correct" },
  { key: "s5", group: "single", status: "skipped" },
  { key: "s6", group: "single", status: "correct" },
  { key: "m1", group: "multiple", status: "wrong" },
  { key: "m2", group: "multiple", status: "correct" },
  { key: "m3", group: "multiple", status: "answered", flagged: true },
  { key: "a1", group: "short", status: "answered" },
  { key: "a2", group: "short" },
  { key: "a3", group: "short", disabled: true },
];

export default function GroupsDemo() {
  const [value, setValue] = useState("s3");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <AnswerSheet
        items={items}
        groups={groups}
        value={value}
        onChange={setValue}
        showSummary
        showLegend
        aria-label="Review questions"
      />
      <p style={{ margin: 0 }}>Reviewing: {value}</p>
    </div>
  );
}
