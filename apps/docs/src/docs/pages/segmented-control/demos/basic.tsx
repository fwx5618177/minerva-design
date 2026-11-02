import { useState } from "react";
import { SegmentedControl } from "minerva-design";

type View = "day" | "week" | "month";

export default function BasicDemo() {
  const [view, setView] = useState<View>("week");
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <SegmentedControl<View>
        aria-label="Calendar view"
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
        value={view}
        onChange={setView}
      />
      <output>Showing the {view} view</output>
    </div>
  );
}
