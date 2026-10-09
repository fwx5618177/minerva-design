import { Text, View } from "react-native";
import { Avatar, Badge, useTheme } from "minerva-design/native";

export default function DotMax() {
  const { colors } = useTheme();
  const bell = (
    <Text style={{ fontSize: 28, color: colors["text-color"] }}>🔔</Text>
  );
  return (
    <View style={{ flexDirection: "row", gap: 28, alignItems: "center" }}>
      <Badge dot color="danger" aria-label="New notifications">
        {bell}
      </Badge>
      <Badge content={128}>{bell}</Badge>
      <Badge content={1200} max={999} color="danger">
        {bell}
      </Badge>
      <Badge content={0} showZero color="neutral">
        {bell}
      </Badge>
      <Badge
        dot
        size="large"
        color="success"
        position="bottom-right"
        offset={[6, 6]}
        aria-label="Online"
      >
        <Avatar
          name="Lena Park"
          src="https://randomuser.me/api/portraits/women/68.jpg"
        />
      </Badge>
    </View>
  );
}
