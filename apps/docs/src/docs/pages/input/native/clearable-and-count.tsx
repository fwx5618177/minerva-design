import { View } from "react-native";
import { Input } from "minerva-design/native";

export default function ClearableAndCountDemo() {
  return (
    <View style={{ gap: 12 }}>
      <Input accessibilityLabel="Search" placeholder="Search" clearable />
      <Input
        accessibilityLabel="Short bio"
        defaultValue="Frontend developer"
        clearable
        showCharCount
        maxLength={40}
      />
    </View>
  );
}
