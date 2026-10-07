import { Button, Menu, message } from "@minerva/lib-core";
import { LuCopy, LuPencil, LuTrash2 } from "react-icons/lu";

export default function BasicDemo() {
  return (
    <Menu
      items={[
        { key: "edit", label: "Edit", icon: <LuPencil />, shortcut: "⌘E" },
        { key: "copy", label: "Duplicate", icon: <LuCopy />, shortcut: "⌘D" },
        { type: "separator", key: "sep" },
        { key: "delete", label: "Delete", icon: <LuTrash2 /> },
      ]}
      onSelect={(item) => message.info(`Selected: ${item.key}`)}
    >
      <Button variant="secondary">Actions</Button>
    </Menu>
  );
}
