import { View } from "react-native";
import { Switch } from "minerva-design/native";

export default function BasicDemo() {
  return (
    <View style={{ gap: 12 }}>
      <Switch label="Wi-Fi" defaultChecked />
      <Switch label="Bluetooth" />
    </View>
  );
}
