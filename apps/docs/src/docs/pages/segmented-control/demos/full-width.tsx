import { SegmentedControl } from "minerva-design";

export default function FullWidthDemo() {
  return (
    <form
      style={{ display: "grid", gap: 12, maxWidth: 420 }}
      onSubmit={(event) => event.preventDefault()}
    >
      <SegmentedControl
        fullWidth
        name="billing"
        aria-label="Billing period"
        defaultValue="yearly"
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly (−20%)" },
        ]}
      />
      <SegmentedControl
        fullWidth
        aria-label="Status filter"
        defaultValue="all"
        options={["all", "open", "closed", "archived"]}
      />
    </form>
  );
}
