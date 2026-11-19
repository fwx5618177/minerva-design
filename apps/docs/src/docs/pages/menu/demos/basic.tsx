import { CopyIcon, EditIcon, TrashIcon } from "minerva-design/icons";
import { useState } from "react";
import { Button, HStack, Menu } from "minerva-design";

export default function BasicDemo() {
  const [selected, setSelected] = useState<string>();
  return (
    <HStack gap={4} wrap>
      <Menu
        items={[
          {
            key: "edit",
            label: "Edit",
            icon: <EditIcon size="1em" />,
            shortcut: "⌘E",
          },
          {
            key: "copy",
            label: "Duplicate",
            icon: <CopyIcon size="1em" />,
            shortcut: "⌘D",
          },
          { type: "separator", key: "sep" },
          { key: "delete", label: "Delete", icon: <TrashIcon size="1em" /> },
        ]}
        onSelect={(item) => setSelected(item.key)}
      >
        <Button color="neutral" variant="outline">
          Actions
        </Button>
      </Menu>
      <span role="status">Selected: {selected ?? "none"}</span>
    </HStack>
  );
}
