import { View } from "react-native";
import { Switch } from "minerva-design/native";

export default function StatesDemo() {
  return (
    <View style={{ gap: 12 }}>
      <Switch label="Loading" loading defaultChecked />
      <Switch label="Disabled" disabled />
      <Switch label="Disabled (on)" disabled defaultChecked />
    </View>
  );
}
