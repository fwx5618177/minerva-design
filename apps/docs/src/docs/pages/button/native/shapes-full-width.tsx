import { Text, View } from "react-native";
import { Button } from "minerva-design/native";

export default function ShapesFullWidth() {
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button shape="rounded">Rounded</Button>
        <Button shape="circle">Pill</Button>
        <Button shape="square">Square</Button>
      </View>
      <Button
        fullWidth
        size="large"
        startIcon={<Text style={{ color: "white", fontSize: 18 }}>+</Text>}
      >
        Create order
      </Button>
      <Button fullWidth size="large" variant="outline" color="neutral">
        Continue as guest
      </Button>
    </View>
  );
}
