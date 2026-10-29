import { useState } from "react";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// x: urgency, y: importance (0-10)
const tasks: QuadrantPoint[] = [
  { label: "Fix login outage", x: 9, y: 7.2 },
  { label: "Tax filing", x: 7.5, y: 8.6 },
  { label: "Quarterly planning", x: 3, y: 8.5 },
  { label: "Mentoring", x: 2, y: 7 },
  { label: "Book travel", x: 8.5, y: 3 },
  { label: "Most meetings", x: 7, y: 2 },
  { label: "Inbox zero", x: 3, y: 2.5 },
  { label: "Social media", x: 1.5, y: 1 },
];

const quadrants: QuadrantRegions = {
  topLeft: { label: "Do first" },
  topRight: { label: "Schedule" },
  bottomLeft: { label: "Delegate" },
  bottomRight: { label: "Eliminate" },
};

export default function EisenhowerDemo() {
  const [selected, setSelected] = useState<QuadrantPoint | null>(null);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={tasks}
        quadrants={quadrants}
        reverseX
        xLabel="Urgency"
        yLabel="Importance"
        name="Task"
        onPointClick={(point) => setSelected(point)}
        height={320}
        ariaLabel="Eisenhower matrix of tasks"
      />
      <p role="status">
        {selected
          ? `${selected.label}: urgency ${selected.x}, importance ${selected.y}`
          : "Click a task"}
      </p>
    </div>
  );
}
