import { useState } from "react";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Review scores (0-100) of three phones
const indicators: RadarIndicator[] = [
  { name: "Performance", max: 100 },
  { name: "Battery", max: 100 },
  { name: "Camera", max: 100 },
  { name: "Display", max: 100 },
  { name: "Value", max: 100 },
  { name: "Build", max: 100 },
];

const series: RadarSeries[] = [
  { name: "Aurora X", values: [92, 68, 88, 90, 55, 86] },
  { name: "Nimbus 5", values: [74, 91, 70, 78, 88, 72] },
  { name: "Vertex Pro", values: [85, 80, 94, 84, 66, 93] },
];

export default function CompareDemo() {
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadarChart
        indicators={indicators}
        series={series}
        onHover={setHovered}
        height={380}
        ariaLabel="Review scores of three phones"
      />
      <p role="status">
        {hovered && hovered.indicator !== undefined
          ? `${hovered.name} · ${indicators[hovered.indicator].name}: ${hovered.value} / 100`
          : "Hover a polygon or use the arrow keys to compare the phones"}
      </p>
    </div>
  );
}
