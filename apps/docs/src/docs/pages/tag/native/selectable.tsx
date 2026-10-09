import { useState } from "react";
import { Text, View } from "react-native";
import { Tag, useTheme } from "minerva-design/native";

const FILTERS = ["Vegan", "Spicy", "Under $10", "Free delivery", "Top rated"];

export default function Selectable() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<string[]>(["Spicy"]);
  const toggle = (name: string, on: boolean) =>
    setSelected((s) => (on ? [...s, name] : s.filter((x) => x !== name)));
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {FILTERS.map((name) => (
          <Tag
            key={name}
            shape="circle"
            variant="outline"
            pressed={selected.includes(name)}
            onPressedChange={(on) => toggle(name, on)}
          >
            {name}
          </Tag>
        ))}
        <Tag shape="circle" variant="outline" clickable disabled>
          Open now
        </Tag>
      </View>
      <Text style={{ color: colors["text-secondary-color"] }}>
        Filters: {selected.length ? selected.join(", ") : "none"}
      </Text>
    </View>
  );
}
