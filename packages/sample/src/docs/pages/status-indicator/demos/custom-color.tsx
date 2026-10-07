import { StatusIndicator } from "@minerva/lib-core";

export default function CustomColorDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <StatusIndicator type="custom" color="#8b5cf6" ariaLabel="Purple" />
      <StatusIndicator type="custom" color="#ec4899" ariaLabel="Pink" />
      <StatusIndicator type="custom" color="#14b8a6" ariaLabel="Teal" />
    </div>
  );
}
