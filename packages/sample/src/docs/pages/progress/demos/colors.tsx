import { ProgressIndicator } from "@minerva/lib-core";

export default function ColorsDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <ProgressIndicator aria-label="Loading" />
      <ProgressIndicator color="neutral" aria-label="Refreshing" />
      <span style={{ color: "var(--success-color)" }}>
        <ProgressIndicator color="current" aria-label="Saving" />
      </span>
    </div>
  );
}
