import { Text, View } from "react-native";
import { IconButton } from "minerva-design/native";

const VARIANTS = ["ghost", "outline", "solid"] as const;
const SIZES = ["xsmall", "small", "medium", "large"] as const;

const star = (color: string, size: number) => (
  <Text style={{ color, fontSize: size }}>★</Text>
);

export default function VariantsSizes() {
  return (
    <View style={{ gap: 16 }}>
      {VARIANTS.map((variant) => (
        <View key={variant} style={{ flexDirection: "row", gap: 12 }}>
          <IconButton label="Rate" variant={variant} icon={star} />
          <IconButton
            label="Rate"
            variant={variant}
            color="primary"
            icon={star}
          />
          <IconButton
            label="Rate"
            variant={variant}
            color="warning"
            shape="square"
            icon={star}
          />
        </View>
      ))}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        {SIZES.map((size) => (
          <IconButton
            key={size}
            label={`Favorite (${size})`}
            size={size}
            variant="solid"
            color="primary"
            icon={star}
          />
        ))}
      </View>
    </View>
  );
}
