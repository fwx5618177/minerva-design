import { View } from "react-native";
import { Button } from "minerva-design/native";

const COLORS = [
  "primary",
  "neutral",
  "success",
  "warning",
  "danger",
  "info",
] as const;
const VARIANTS = ["solid", "outline", "ghost", "link"] as const;

export default function ColorsVariants() {
  return (
    <View style={{ gap: 12 }}>
      {VARIANTS.map((variant) => (
        <View
          key={variant}
          style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
        >
          {COLORS.map((color) => (
            <Button key={color} color={color} variant={variant} size="small">
              {color}
            </Button>
          ))}
        </View>
      ))}
    </View>
  );
}
