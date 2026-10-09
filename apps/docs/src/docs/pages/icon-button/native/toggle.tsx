import { useState } from "react";
import { Text, View } from "react-native";
import { IconButton, useTheme } from "minerva-design/native";
export default function Toggle() {
  const [liked, setLiked] = useState(false);
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
        label="Like"
        color="danger"
        pressed={liked}
        onPressedChange={setLiked}
        icon={(color, size) => <Text style={{ color, fontSize: size }}>♥</Text>}
      />
      <Text style={{ color: colors["text-color"] }}>
        {liked ? "Liked" : "Not liked yet"}
      </Text>
      <IconButton
        label="Bookmark"
        defaultPressed
        icon={(color, size) => <Text style={{ color, fontSize: size }}>◆</Text>}
      />
      <IconButton
        label="Mute"
        shape="square"
        defaultPressed={false}
        icon={(color, size) => <Text style={{ color, fontSize: size }}>♩</Text>}
      />
    </View>
  );
}
