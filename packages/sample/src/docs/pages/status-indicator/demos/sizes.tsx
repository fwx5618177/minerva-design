import { StatusIndicator } from "@minerva/lib-core";

export default function SizesDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <StatusIndicator size="small" status="info" ariaLabel="Small" />
      <StatusIndicator size="medium" status="info" ariaLabel="Medium" />
      <StatusIndicator size="large" status="info" ariaLabel="Large" />
    </div>
  );
}
