import { View } from "react-native";
import { Input } from "minerva-design/native";

export default function SizesVariantsDemo() {
  return (
    <View style={{ gap: 12 }}>
      <Input accessibilityLabel="Small" size="small" placeholder="small" />
      <Input accessibilityLabel="Medium" placeholder="medium (outline)" />
      <Input accessibilityLabel="Large" size="large" placeholder="large" />
      <Input
        accessibilityLabel="Filled"
        variant="filled"
        placeholder="filled"
      />
      <Input
        accessibilityLabel="Unstyled"
        variant="unstyled"
        placeholder="unstyled"
      />
    </View>
  );
}
