import { View } from "react-native";
import { Avatar } from "minerva-design/native";

const SIZES = ["xsmall", "small", "medium", "large", "xlarge"] as const;
const SHAPES = ["circle", "rounded", "square"] as const;
const PHOTO = "https://randomuser.me/api/portraits/men/32.jpg";

export default function SizesShapes() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        {SIZES.map((size) => (
          <Avatar key={size} size={size} name="Noah Kim" src={PHOTO} />
        ))}
      </View>
      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        {SHAPES.map((shape) => (
          <Avatar key={shape} shape={shape} size="large" name="Noah Kim" />
        ))}
        <Avatar size={56} shape="rounded" name="Noah Kim" src={PHOTO} />
      </View>
    </View>
  );
}
