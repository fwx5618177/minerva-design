import { View } from "react-native";
import { useState } from "react";
import {
  Button,
  ToastProvider,
  toast,
  type ToastPosition,
} from "minerva-design/native";

const positions: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export default function BasicDemo() {
  const [position, setPosition] = useState<ToastPosition>("top-right");
  return (
    // Mount one ToastProvider near the root of the app; max={3} closes the
    // oldest toast when a fourth one appears
    <ToastProvider position={position} max={3}>
      <View style={{ gap: 16, alignItems: "flex-start" }}>
        <View style={{ gap: 8, flexDirection: "row", flexWrap: "wrap" }}>
          <Button color="success" onPress={() => toast.success("Saved")}>
            Success
          </Button>
          <Button color="danger" onPress={() => toast.danger("Request failed")}>
            Danger
          </Button>
          <Button
            color="warning"
            onPress={() => toast.warning("Unsaved changes")}
          >
            Warning
          </Button>
          <Button
            color="neutral"
            variant="outline"
            onPress={() => toast.info("New version")}
          >
            Info
          </Button>
        </View>
        <View
          aria-label="Position"
          style={{ gap: 4, flexDirection: "row", flexWrap: "wrap" }}
        >
          {positions.map((name) => (
            <Button
              key={name}
              size="small"
              color={name === position ? "primary" : "neutral"}
              variant={name === position ? "solid" : "outline"}
              aria-pressed={name === position}
              onPress={() => setPosition(name)}
            >
              {name}
            </Button>
          ))}
        </View>
      </View>
    </ToastProvider>
  );
}
