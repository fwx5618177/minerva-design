import { ProgressIndicator } from "@minerva/lib-core";

export default function WidthDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      <ProgressIndicator type="bar" width="160px" ariaLabel="Loading" />
      <ProgressIndicator type="bar" full ariaLabel="Loading" />
      <ProgressIndicator type="dottedBar" full ariaLabel="Loading" />
    </div>
  );
}
