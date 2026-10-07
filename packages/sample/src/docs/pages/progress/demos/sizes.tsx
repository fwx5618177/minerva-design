import { ProgressIndicator } from "@minerva/lib-core";

export default function SizesDemo() {
  return (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      <ProgressIndicator size="small" ariaLabel="Loading" />
      <ProgressIndicator size="medium" ariaLabel="Loading" />
      <ProgressIndicator size="large" ariaLabel="Loading" />
    </div>
  );
}
