import { StatusIndicator } from "@minerva/lib-core";

export default function StatusesDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <StatusIndicator status="success" ariaLabel="Success" />
      <StatusIndicator status="info" ariaLabel="Info" />
      <StatusIndicator status="warning" ariaLabel="Warning" />
      <StatusIndicator status="error" ariaLabel="Error" />
    </div>
  );
}
