import { useState } from "react";
import { Text, View } from "react-native";
import { Button, useTheme } from "minerva-design/native";

export default function Basic() {
  const { colors } = useTheme();
  const [count, setCount] = useState(0);
  return (
    <View style={{ gap: 12 }}>
      <Button onPress={() => setCount((c) => c + 1)}>Add to cart</Button>
      <Text style={{ color: colors["text-secondary-color"] }}>
        Pressed {count} times
      </Text>
    </View>
  );
}
