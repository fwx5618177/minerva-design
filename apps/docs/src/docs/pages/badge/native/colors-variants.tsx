import { View } from "react-native";
import { Badge } from "minerva-design/native";

const COLORS = [
  "primary",
  "neutral",
  "success",
  "warning",
  "danger",
  "info",
] as const;
const VARIANTS = ["solid", "subtle", "outline"] as const;

export default function ColorsVariants() {
  return (
    <View style={{ gap: 12 }}>
      {VARIANTS.map((variant) => (
        <View
          key={variant}
          style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
        >
          {COLORS.map((color) => (
            <Badge key={color} color={color} variant={variant}>
              {color}
            </Badge>
          ))}
        </View>
      ))}
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Badge size="small">Small</Badge>
        <Badge size="medium">Medium</Badge>
        <Badge size="large" icon="⚡" color="warning">
          Flash sale
        </Badge>
      </View>
    </View>
  );
}
