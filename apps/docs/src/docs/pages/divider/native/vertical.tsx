import { Text, View } from "react-native";
import { Divider, useTheme } from "minerva-design/native";

export default function Demo() {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ color: colors["text-color"] }}>Home</Text>
      <Divider orientation="vertical" length={16} spacing={12} />
      <Text style={{ color: colors["text-color"] }}>Products</Text>
      <Divider orientation="vertical" length={16} spacing={12} />
      <Text style={{ color: colors["text-color"] }}>About</Text>
    </View>
  );
}
