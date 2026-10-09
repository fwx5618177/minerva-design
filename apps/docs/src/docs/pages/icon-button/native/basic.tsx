import { useState } from "react";
import { Text, View } from "react-native";
import { IconButton, useTheme } from "minerva-design/native";
export default function Basic() {
  const [count, setCount] = useState(0);
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <IconButton
        label="Add"
        onPress={() => setCount((n) => n + 1)}
        icon={(color, size) => <Text style={{ color, fontSize: size }}>+</Text>}
      />
      <IconButton
        label="Settings"
        icon={(color, size) => <Text style={{ color, fontSize: size }}>⚙</Text>}
      />
      <IconButton
        label="Delete"
        icon={(color, size) => <Text style={{ color, fontSize: size }}>⌫</Text>}
      />
      <Text role="status" style={{ color: colors["text-color"] }}>
        {count === 0 ? "Nothing added yet" : `Added ${count} item(s)`}
      </Text>
    </View>
  );
}
