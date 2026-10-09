import { useState } from "react";
import { Text, View } from "react-native";
import { NavBar, useTheme } from "minerva-design/native";

export default function Basic() {
  const { colors } = useTheme();
  const [last, setLast] = useState("Nothing pressed yet");
  return (
    <View style={{ gap: 16 }}>
      <NavBar title="Order details" safeAreaInsetTop={false} />
      <NavBar
        title="Checkout"
        leftArrow
        leftText="Cart"
        onBack={() => setLast("Back to cart")}
        rightText="Help"
        onPressRight={() => setLast("Opened help")}
        safeAreaInsetTop={false}
      />
      <NavBar
        title="Settings"
        leftArrow
        onBack={() => setLast("Back to profile")}
        border={false}
        safeAreaInsetTop={false}
      />
      <Text style={{ color: colors["text-secondary-color"] }}>{last}</Text>
    </View>
  );
}
