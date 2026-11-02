import { SegmentedControl } from "minerva-design";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System", disabled: true },
];

export default function ColorsDemo() {
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      <SegmentedControl
        aria-label="Theme (neutral)"
        options={options}
        defaultValue="light"
      />
      <SegmentedControl
        color="primary"
        aria-label="Theme (primary)"
        options={options}
        defaultValue="dark"
      />
      <SegmentedControl
        disabled
        aria-label="Theme (disabled)"
        options={options}
        defaultValue="light"
      />
    </div>
  );
}
