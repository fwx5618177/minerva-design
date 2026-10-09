import { Text, View } from "react-native";
import { Card, useTheme } from "minerva-design/native";
const variants = ["default", "outline", "elevated", "filled", "ghost"] as const;
export default function Variants() {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 16 }}>
      {variants.map((variant) => (
        <Card key={variant} variant={variant} title={variant}>
          <Text style={{ color: colors["text-color"] }}>
            variant="{variant}"
          </Text>
        </Card>
      ))}
    </View>
  );
}
