import { View } from "react-native";
import { Checkbox } from "minerva-design/native";
export default function Basic() {
  return (
    <View style={{ gap: 12, alignItems: "flex-start" }}>
      <Checkbox label="Remember me" />
      <Checkbox label="Checked by default" defaultChecked />
    </View>
  );
}
