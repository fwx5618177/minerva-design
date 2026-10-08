import { View } from "react-native";
import { Button } from "minerva-design/native";

export default function Sizes() {
  return (
    <View style={{ gap: 12, alignItems: "flex-start" }}>
      <Button size="xsmall">Extra small</Button>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
      <Button size="xlarge">Extra large</Button>
    </View>
  );
}
