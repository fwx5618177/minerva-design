import { useState } from "react";
import { Text } from "react-native";
import { Cell, CellGroup, IconButton } from "minerva-design/native";
const initialDevices = [
  { id: "phone", name: "iPhone 16", lastUsed: "Used 2 hours ago" },
  { id: "laptop", name: "MacBook Air", lastUsed: "Used yesterday" },
];
export default function Basic() {
  const [devices, setDevices] = useState(initialDevices);
  return (
    <CellGroup aria-label="Registered devices">
      {devices.map((device) => (
        <Cell
          key={device.id}
          title={device.name}
          label={device.lastUsed}
          icon={<Text>▣</Text>}
          rightIcon={
            <IconButton
              label={`Delete ${device.name}`}
              onPress={() =>
                setDevices((prev) => prev.filter((d) => d.id !== device.id))
              }
              icon={(color, size) => (
                <Text style={{ color, fontSize: size }}>⌫</Text>
              )}
            />
          }
        />
      ))}
    </CellGroup>
  );
}
