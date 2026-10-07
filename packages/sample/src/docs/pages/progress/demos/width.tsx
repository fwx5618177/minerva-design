import { ProgressIndicator } from "@minerva/lib-core";

export default function WidthDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      <ProgressIndicator variant="bar" width="160px" aria-label="Loading" />
      <ProgressIndicator variant="bar" full aria-label="Loading" />
      <ProgressIndicator variant="dottedBar" full aria-label="Loading" />
    </div>
  );
}
