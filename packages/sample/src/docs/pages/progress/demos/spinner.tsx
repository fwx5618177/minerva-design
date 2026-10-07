import { Spinner } from "@minerva/lib-core";

export default function SpinnerDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Spinner />
      <Spinner color="neutral" label="Refreshing" />
      <span style={{ color: "var(--success-color)" }}>
        <Spinner color="current" label="Saving" />
      </span>
    </div>
  );
}
