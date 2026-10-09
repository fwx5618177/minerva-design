import { View } from "react-native";
import { Button } from "minerva-design/native";

export default function ShapesDemo() {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Button shape="square">Square</Button>
      <Button shape="rounded">Rounded</Button>
      <Button shape="circle" accessibilityLabel="Add">
        +
      </Button>
      <Button style={{ borderRadius: 0 }}>No radius</Button>
      <Button style={{ borderRadius: 12 }}>12px radius</Button>
    </View>
  );
}
