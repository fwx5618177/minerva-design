import { useState } from "react";
import { Text, View } from "react-native";
import { IconButton, NavBar, useTheme } from "minerva-design/native";

export default function Actions() {
  const { colors } = useTheme();
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(0);
  const icon = { fontSize: 20, color: colors["text-color"], padding: 8 };
  return (
    <View style={{ gap: 16 }}>
      <NavBar
        safeAreaInsetTop={false}
        leftArrow
        backLabel="Back to search"
        title={
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: colors["text-color"], fontWeight: "600" }}>
              Sunny Café
            </Text>
            <Text style={{ color: colors["text-muted-color"], fontSize: 12 }}>
              ★ 4.8 · 20–30 min
            </Text>
          </View>
        }
        right={
          <>
            <IconButton
              accessibilityRole="button"
              label={liked ? "Remove favorite" : "Add favorite"}
              onPress={() => setLiked((v) => !v)}
            >
              <Text style={[icon, liked && { color: colors["danger-color"] }]}>
                {liked ? "♥" : "♡"}
              </Text>
            </IconButton>
            <IconButton
              accessibilityRole="button"
              label="Share"
              onPress={() => setShared((n) => n + 1)}
            >
              <Text style={icon}>⇪</Text>
            </IconButton>
          </>
        }
      />
      <Text style={{ color: colors["text-secondary-color"] }}>
        {liked ? "Saved to favorites" : "Not in favorites"} · shared {shared}{" "}
        times
      </Text>
    </View>
  );
}
