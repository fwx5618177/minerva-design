import { View } from "react-native";
import { Input } from "minerva-design/native";
import { useState } from "react";

export default function BasicDemo() {
  const [value, setValue] = useState("");
  return (
    <View style={{ gap: 12 }}>
      <Input accessibilityLabel="Name" placeholder="Uncontrolled" />
      <Input
        accessibilityLabel="Controlled"
        placeholder="Controlled"
        value={value}
        onChange={setValue}
      />
    </View>
  );
}
