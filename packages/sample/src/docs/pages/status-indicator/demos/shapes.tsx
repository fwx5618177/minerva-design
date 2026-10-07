import { StatusIndicator } from "@minerva/lib-core";

export default function ShapesDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <StatusIndicator shape="circle" ariaLabel="Circle" />
      <StatusIndicator shape="rounded" ariaLabel="Rounded" />
      <StatusIndicator shape="square" ariaLabel="Square" />
    </div>
  );
}
