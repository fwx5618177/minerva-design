import { View } from "react-native";
import { Button } from "minerva-design/native";

const variants = ["solid", "outline", "ghost", "link"] as const;

export default function VariantsDemo() {
  return (
    <View style={{ gap: 12 }}>
      {(["primary", "neutral", "danger"] as const).map((color) => (
        <View
          key={color}
          style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
        >
          {variants.map((variant) => (
            <Button key={variant} color={color} variant={variant}>
              {variant}
            </Button>
          ))}
        </View>
      ))}
    </View>
  );
}
