import { AnswerSheet, type AnswerSheetItem } from "minerva-design";

const items: AnswerSheetItem[] = Array.from({ length: 10 }, (_, i) => ({
  key: `q${i + 1}`,
  status: i < 4 ? "answered" : "unanswered",
}));

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 420 }}>
      <AnswerSheet
        items={items}
        size="small"
        defaultValue="q5"
        aria-label="Small sheet"
      />
      <AnswerSheet
        items={items}
        columns={5}
        defaultValue="q5"
        aria-label="Five columns"
      />
      <AnswerSheet items={items} disabled aria-label="Disabled sheet" />
    </div>
  );
}
