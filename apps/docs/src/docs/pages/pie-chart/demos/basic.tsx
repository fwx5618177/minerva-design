import { useState } from "react";
import {
  PieChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Website sessions over the last 30 days, by traffic source
const sessions: ShapeDatum[] = [
  { name: "Organic search", value: 48200 },
  { name: "Direct", value: 23100 },
  { name: "Social", value: 16400 },
  { name: "Paid ads", value: 12700 },
  { name: "Referral", value: 9800 },
  { name: "Email", value: 6100 },
];

const format = (value: number) => value.toLocaleString("en-US");

export default function BasicDemo() {
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <PieChart
        data={sessions}
        format={format}
        onClick={setSelected}
        height={320}
        ariaLabel="Website sessions by traffic source, last 30 days"
      />
      <p role="status">
        {selected
          ? `${selected.name}: ${format(selected.value)} sessions (${(
              selected.percent * 100
            ).toFixed(1)}% of the traffic)`
          : "Click a slice (or focus the chart and press Enter) to select a source"}
      </p>
    </div>
  );
}
