import { SegmentedControl } from "minerva-design";

const options = ["Daily", "Weekly", "Monthly"];

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      <SegmentedControl
        size="small"
        aria-label="Small"
        options={options}
        defaultValue="Daily"
      />
      <SegmentedControl
        aria-label="Medium"
        options={options}
        defaultValue="Weekly"
      />
      <SegmentedControl
        size="large"
        aria-label="Large"
        options={options}
        defaultValue="Monthly"
      />
    </div>
  );
}
