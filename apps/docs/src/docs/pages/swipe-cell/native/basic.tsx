import { useState } from "react";
import { Text, View } from "react-native";
import { Cell, SwipeCell, useTheme } from "minerva-design/native";

const CHATS = ["Anna Lee", "Pizza Palace", "Mom"];

export default function Basic() {
  const { colors } = useTheme();
  const [chats, setChats] = useState(CHATS);
  const [last, setLast] = useState("Swipe a row left or right");
  return (
    <View style={{ gap: 12 }}>
      {chats.map((name) => (
        <SwipeCell
          key={name}
          leftActions={[
            {
              text: "Pin",
              color: "primary",
              onPress: () => setLast(`Pinned ${name}`),
            },
          ]}
          rightActions={[
            { text: "Mute", onPress: () => setLast(`Muted ${name}`) },
            {
              text: "Delete",
              onPress: () => setChats((list) => list.filter((c) => c !== name)),
            },
          ]}
        >
          <Cell title={name} label="Tap to open the chat" />
        </SwipeCell>
      ))}
      <Text style={{ color: colors["text-secondary-color"] }}>{last}</Text>
    </View>
  );
}
