import { Button, Dropdown, IconButton } from "@minerva/lib-core";
import { IoEllipsisVertical } from "react-icons/io5";

const items = [
  { label: "Profile", value: "profile" },
  { label: "Settings", value: "settings" },
  { label: "Sign out", value: "sign-out" },
];

export default function CustomTriggerDemo() {
  return (
    <>
      <Dropdown items={items} ariaLabel="Account">
        <Button variant="secondary">Account ▾</Button>
      </Dropdown>
      <Dropdown items={items} ariaLabel="More actions">
        <IconButton icon={<IoEllipsisVertical />} ariaLabel="More actions" />
      </Dropdown>
      <Dropdown items={items} ariaLabel="Account">
        <span style={{ textDecoration: "underline", cursor: "pointer" }}>
          Text trigger
        </span>
      </Dropdown>
    </>
  );
}
