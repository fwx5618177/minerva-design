import { Text, View } from "react-native";
import { Divider, useTheme } from "minerva-design/native";

export default function Demo() {
  const { colors } = useTheme();
  return (
    <View style={{ width: "100%" }}>
      <Text style={{ color: colors["text-color"] }}>
        Content above the divider.
      </Text>
      <Divider />
      <Text style={{ color: colors["text-color"] }}>
        Content below the divider.
      </Text>
    </View>
  );
}
