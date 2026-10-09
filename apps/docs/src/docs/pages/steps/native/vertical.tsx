import { useState } from "react";
import { View } from "react-native";
import { Button, Steps } from "minerva-design/native";

const ITEMS = [
  { title: "Order placed", description: "Today, 12:04" },
  { title: "Restaurant confirmed", description: "Burger House, 12:06" },
  { title: "Courier on the way", description: "Alex picked up your order" },
  { title: "Delivered", description: "Estimated 12:40" },
];

export default function Vertical() {
  const [failed, setFailed] = useState(false);
  return (
    <View style={{ gap: 16 }}>
      <Steps
        direction="vertical"
        items={ITEMS}
        defaultValue="2"
        status={failed ? "error" : "process"}
        aria-label="Order tracking"
      />
      <Button
        variant="outline"
        color={failed ? "neutral" : "danger"}
        onPress={() => setFailed((f) => !f)}
      >
        {failed ? "Courier back on track" : "Report a delivery problem"}
      </Button>
    </View>
  );
}
