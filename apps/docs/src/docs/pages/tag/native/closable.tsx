import { useState } from "react";
import { Text, View } from "react-native";
import { Tag, Button, useTheme } from "minerva-design/native";
const initialTags = ["Tag 1", "Tag 2", "Tag 3"];
export default function Closable() {
  const [tags, setTags] = useState(initialTags);
  const [opened, setOpened] = useState<string>();
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 8,
      }}
    >
      {tags.map((tag, index) => (
        <Tag
          key={tag}
          closable
          closeLabel={(label) => `Remove ${label}`}
          closeIcon={index === 2 ? <Text>⊗</Text> : undefined}
          onClose={() => setTags((prev) => prev.filter((t) => t !== tag))}
          clickable={index === 0}
          onPress={() => setOpened(tag)}
        >
          {tag}
        </Tag>
      ))}
      {opened && (
        <Text style={{ color: colors["text-color"] }}>Opened: {opened}</Text>
      )}
      {tags.length === 0 && (
        <Button onPress={() => setTags(initialTags)}>Reset</Button>
      )}
    </View>
  );
}
