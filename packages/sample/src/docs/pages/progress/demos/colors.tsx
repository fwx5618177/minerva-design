import { ProgressIndicator } from "@minerva/lib-core";

export default function ColorsDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <ProgressIndicator ariaLabel="Loading" />
      <ProgressIndicator color="neutral" ariaLabel="Refreshing" />
      <span style={{ color: "var(--success-color)" }}>
        <ProgressIndicator color="current" ariaLabel="Saving" />
      </span>
    </div>
  );
}
