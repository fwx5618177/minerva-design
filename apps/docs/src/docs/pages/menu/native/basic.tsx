import { useState } from "react";
import { Text, View } from "react-native";
import {
  Menu,
  ContextMenu,
  Button,
  type MenuEntry,
} from "minerva-design/native";
export default function Basic() {
  const [selected, setSelected] = useState("");
  const items: MenuEntry[] = [
    { key: "save", label: "Save" },
    {
      key: "more",
      label: "More",
      children: [{ key: "archive", label: "Archive" }],
    },
    { type: "separator", key: "separator" },
    {
      type: "group",
      key: "view",
      label: "View",
      items: [
        {
          type: "checkbox",
          key: "grid",
          label: "Show grid",
          defaultChecked: true,
        },
        {
          type: "radio-group",
          key: "density",
          label: "Density",
          defaultValue: "comfortable",
          items: [
            { value: "compact", label: "Compact" },
            { value: "comfortable", label: "Comfortable" },
          ],
        },
      ],
    },
  ];
  return (
    <View style={{ gap: 12 }}>
      <Menu items={items} onSelect={(item) => setSelected(item.key)}>
        <Button>Actions</Button>
      </Menu>
      <ContextMenu items={items} onSelect={(item) => setSelected(item.key)}>
        <Button variant="outline">Long press</Button>
      </ContextMenu>
      <Text>{selected}</Text>
    </View>
  );
}
