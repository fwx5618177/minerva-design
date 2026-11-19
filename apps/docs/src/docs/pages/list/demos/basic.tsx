import { SmartphoneIcon, TrashIcon } from "minerva-design/icons";
import { useState } from "react";
import { IconButton, List, ListItem } from "minerva-design";

const initialDevices = [
  { id: "phone", name: "iPhone 16", lastUsed: "Used 2 hours ago" },
  { id: "laptop", name: "MacBook Air", lastUsed: "Used yesterday" },
];

export default function BasicDemo() {
  const [devices, setDevices] = useState(initialDevices);
  return (
    <List aria-label="Registered devices" style={{ width: "100%" }}>
      {devices.map((device) => (
        <ListItem
          key={device.id}
          icon={<SmartphoneIcon size="1em" />}
          primary={<span id={`device-${device.id}`}>{device.name}</span>}
          secondary={device.lastUsed}
          actions={
            <IconButton
              aria-label={`Delete ${device.name}`}
              onClick={() =>
                setDevices((prev) => prev.filter((d) => d.id !== device.id))
              }
              aria-describedby={`device-${device.id}`}
            >
              <TrashIcon size="1em" />
            </IconButton>
          }
        />
      ))}
    </List>
  );
}
