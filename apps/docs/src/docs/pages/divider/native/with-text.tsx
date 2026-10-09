import { View } from "react-native";
import { Divider } from "minerva-design/native";

export default function Demo() {
  return (
    <View style={{ width: "100%" }}>
      <Divider textAlign="left">Left</Divider>
      <Divider>Center</Divider>
      <Divider textAlign="right" variant="dashed" thickness={3}>
        Right
      </Divider>
    </View>
  );
}
