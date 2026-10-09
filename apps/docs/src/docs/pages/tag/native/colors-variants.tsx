import { Text, View } from "react-native";
import { Tag } from "minerva-design/native";

const COLORS = [
  "neutral",
  "primary",
  "success",
  "warning",
  "danger",
  "info",
] as const;
const VARIANTS = ["subtle", "outline", "solid"] as const;

export default function ColorsVariants() {
  return (
    <View style={{ gap: 12 }}>
      {VARIANTS.map((variant) => (
        <View
          key={variant}
          style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
        >
          {COLORS.map((color) => (
            <Tag key={color} color={color} variant={variant}>
              {color}
            </Tag>
          ))}
        </View>
      ))}
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Tag size="small" shape="square" color="danger" variant="solid">
          -30%
        </Tag>
        <Tag shape="circle" color="success" icon={<Text>🚚</Text>}>
          Free delivery
        </Tag>
        <Tag size="large" color="primary" elevation>
          Bestseller
        </Tag>
      </View>
    </View>
  );
}
