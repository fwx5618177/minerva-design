import { ProgressIndicator } from "@minerva/lib-core";

export default function WidthDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      <ProgressIndicator variant="bar" width="160px" ariaLabel="Loading" />
      <ProgressIndicator variant="bar" full ariaLabel="Loading" />
      <ProgressIndicator variant="dottedBar" full ariaLabel="Loading" />
    </div>
  );
}
