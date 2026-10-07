import { useState } from "react";
import { Button, Dropdown, type DropdownOption } from "@minerva/lib-core";

const items: DropdownOption[] = [
  { label: "Profile", value: "profile" },
  { label: "Settings", value: "settings" },
  { label: "Sign out", value: "sign-out" },
];

export default function ControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dropdown
        items={items}
        ariaLabel="Account"
        open={open}
        onOpenChange={setOpen}
      >
        <Button size="small" variant="secondary">
          Account
        </Button>
      </Dropdown>
      <Button size="small" onClick={() => setOpen((prev) => !prev)}>
        {open ? "Close menu" : "Open menu"}
      </Button>
      <span>Menu is {open ? "open" : "closed"}</span>
    </>
  );
}
