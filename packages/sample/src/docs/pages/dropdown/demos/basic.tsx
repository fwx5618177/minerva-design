import { useState } from "react";
import { Dropdown, type DropdownOption } from "@minerva/lib-core";

const items: DropdownOption[] = [
  { label: "Edit", value: "edit" },
  { label: "Duplicate", value: "duplicate" },
  { label: "Archive", value: "archive" },
];

export default function BasicDemo() {
  const [selected, setSelected] = useState<DropdownOption>();

  return (
    <>
      <Dropdown items={items} ariaLabel="Actions" onSelect={setSelected} />
      <span>Selected: {selected?.label ?? "none"}</span>
    </>
  );
}
