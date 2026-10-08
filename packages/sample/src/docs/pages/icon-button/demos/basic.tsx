import { useState } from "react";
import { HStack, IconButton } from "@minerva/lib-core";
import { IoAdd, IoSettingsOutline, IoTrashOutline } from "react-icons/io5";

export default function BasicDemo() {
  const [count, setCount] = useState(0);
  return (
    <HStack gap={3} align="center" wrap>
      <IconButton
        icon={<IoAdd />}
        aria-label="Add"
        onClick={() => setCount((n) => n + 1)}
      />
      <IconButton icon={<IoSettingsOutline />} aria-label="Settings" />
      <IconButton icon={<IoTrashOutline />} aria-label="Delete" />
      <output aria-live="polite">
        {count === 0 ? "Nothing added yet" : `Added ${count} item(s)`}
      </output>
    </HStack>
  );
}
