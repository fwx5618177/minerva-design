import { useState } from "react";
import { Text, View } from "react-native";
import { AnswerSheet, type AnswerSheetItem } from "minerva-design/native";

const groups = [
  { key: "single", title: "Single choice" },
  { key: "short", title: "Short answer" },
];
const items: AnswerSheetItem[] = [
  { key: "s1", group: "single", status: "correct" },
  { key: "s2", group: "single", status: "wrong", flagged: true },
  { key: "s3", group: "single", status: "correct" },
  { key: "s4", group: "single", status: "skipped" },
  { key: "s5", group: "single", status: "answered" },
  { key: "a1", group: "short", status: "answered" },
  { key: "a2", group: "short" },
  { key: "a3", group: "short" },
];

export default function Basic() {
  const [value, setValue] = useState("s2");
  return (
    <View style={{ gap: 12 }}>
      <AnswerSheet
        items={items}
        groups={groups}
        value={value}
        onChange={setValue}
        showSummary
        showLegend
      />
      <Text>Current: {value}</Text>
    </View>
  );
}
