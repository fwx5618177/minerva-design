import { Button, Dropdown } from "@minerva/lib-core";

const items = [
  { label: "Copy", value: "copy" },
  { label: "Paste (clipboard empty)", value: "paste", disabled: true },
  { label: "Delete", value: "delete" },
];

export default function DisabledDemo() {
  return (
    <>
      <Dropdown items={items} ariaLabel="Edit">
        <Button size="small">Disabled item</Button>
      </Dropdown>
      <Dropdown items={items} ariaLabel="Edit" disabled>
        <Button size="small" disabled>
          Disabled dropdown
        </Button>
      </Dropdown>
    </>
  );
}
