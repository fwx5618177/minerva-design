import { Text, View } from "react-native";
import { Badge, useTheme } from "minerva-design/native";
export default function Basic() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        gap: 16,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Badge content={5} aria-label="5 unread notifications">
        <Text aria-label="Notifications" style={{ fontSize: 24 }}>
          ♧
        </Text>
      </Badge>
      <Badge content="99+" aria-label="More than 99 messages">
        <Text aria-label="Messages" style={{ fontSize: 24 }}>
          ✉
        </Text>
      </Badge>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Text style={{ color: colors["text-color"] }}>Inbox</Text>
        <Badge content={12} color="info" aria-label="12 unread" />
        <Text style={{ color: colors["text-color"] }}>and changelog</Text>
        <Badge color="success">New</Badge>
      </View>
    </View>
  );
}
