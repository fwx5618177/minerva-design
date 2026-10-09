import { Text, View } from "react-native";
import { useTheme, useTokens } from "minerva-design/native";

const STATS = [
  { label: "Orders", value: "12", color: "primary-color" },
  { label: "Coupons", value: "3", color: "success-color" },
  { label: "Unpaid", value: "1", color: "danger-color" },
];

export default function UseTheme() {
  const { colors, mode } = useTheme();
  const { space, radius, fontSize, shadows } = useTokens();
  return (
    <View
      style={{
        gap: space["3"],
        padding: space["4"],
        borderRadius: radius.xl,
        borderWidth: 1,
        borderColor: colors["border-color"],
        backgroundColor: colors["surface-color"],
        shadowColor: shadows.md?.color,
        shadowOpacity: 0.12,
        shadowRadius: 8,
      }}
    >
      <Text style={{ color: colors["text-color"], fontSize: fontSize.lg }}>
        My account
      </Text>
      <View style={{ flexDirection: "row", gap: space["2"] }}>
        {STATS.map((stat) => (
          <View
            key={stat.label}
            style={{
              flex: 1,
              alignItems: "center",
              paddingVertical: space["3"],
              borderRadius: radius.md,
              backgroundColor: colors["surface-muted-color"],
            }}
          >
            <Text style={{ color: colors[stat.color], fontSize: fontSize.xl }}>
              {stat.value}
            </Text>
            <Text style={{ color: colors["text-muted-color"] }}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>
      <Text
        style={{ color: colors["text-secondary-color"], fontSize: fontSize.sm }}
      >
        {mode} mode · radius.xl {radius.xl}px · space 4 = {space["4"]}px
      </Text>
    </View>
  );
}
