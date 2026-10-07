import { useState } from "react";
import { Button, Menu } from "@minerva/lib-core";

export default function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Menu
        open={open}
        onOpenChange={setOpen}
        items={[
          { key: "a", label: "Archive" },
          { key: "b", label: "Move…" },
        ]}
      >
        <Button variant="secondary">Menu</Button>
      </Menu>
      <span>{open ? "Open" : "Closed"}</span>
    </div>
  );
}
