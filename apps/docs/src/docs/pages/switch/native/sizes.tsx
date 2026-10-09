import { View } from "react-native";
import { Switch } from "minerva-design/native";

export default function SizesDemo() {
  return (
    <View style={{ gap: 12 }}>
      <Switch size="small" label="Small" defaultChecked />
      <Switch size="medium" label="Medium" defaultChecked />
      <Switch size="large" label="Large" defaultChecked />
    </View>
  );
}
