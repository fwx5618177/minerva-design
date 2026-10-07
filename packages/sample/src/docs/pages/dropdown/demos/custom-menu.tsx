import { Button, Dropdown } from "@minerva/lib-core";

const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

export default function CustomMenuDemo() {
  return (
    <Dropdown
      items={items}
      ariaLabel="Theme"
      menuBgColor="#1e1b4b"
      menuTextColor="#e0e7ff"
      menuBoxShadow="0 8px 24px rgba(30, 27, 75, 0.4)"
    >
      <Button size="small">Theme</Button>
    </Dropdown>
  );
}
