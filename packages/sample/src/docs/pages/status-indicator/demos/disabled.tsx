import { StatusIndicator } from "@minerva/lib-core";

export default function DisabledDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <StatusIndicator status="success" ariaLabel="Click me" />
      <StatusIndicator status="success" disabled ariaLabel="Disabled" />
    </div>
  );
}
