import { useState } from "react";
import { IconButton } from "minerva-design";
import {
  QuadrantChart,
  quadrantCenter,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/charts";
import { LuPlus } from "react-icons/lu";

type Corner = QuadrantCorner;

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left
const geometry = { reverseX: true };

const titles: Record<Corner, string> = {
  topLeft: "Do first",
  topRight: "Schedule",
  bottomLeft: "Delegate",
  bottomRight: "Eliminate",
};

// Same tints as the default quadrant colors
const colors: Record<Corner, string> = {
  topLeft: "var(--danger-color, #ef4444)",
  topRight: "var(--primary-color, #4f46e5)",
  bottomLeft: "var(--warning-color, #f59e0b)",
  bottomRight: "var(--text-secondary-color, #64748b)",
};

const initial: QuadrantPoint[] = [
  { label: "Fix login outage", x: 9, y: 8 },
  { label: "Quarterly planning", x: 3, y: 8.5 },
  { label: "Book travel", x: 8, y: 3 },
  { label: "Inbox zero", x: 2.5, y: 2 },
];

const clamp = (value: number) => Math.min(9.5, Math.max(0.5, value));

export default function DraggableDemo() {
  const [tasks, setTasks] = useState(initial);
  const [status, setStatus] = useState(
    "Drag a task to another quadrant, or click an empty area to add one",
  );

  const add = (corner: Corner, at?: { x: number; y: number }) => {
    const center = quadrantCenter(geometry, corner);
    // Offset new tasks a little so they do not stack on the same spot
    const jitter = (tasks.length % 3) - 1;
    const label = `Task ${tasks.length + 1}`;
    setTasks((current) => [
      ...current,
      {
        label,
        x: clamp(at?.x ?? center.x + jitter),
        y: clamp(at?.y ?? center.y + jitter),
      },
    ]);
    setStatus(`${label} added to "${titles[corner]}"`);
  };

  // Title + add button drawn over each quadrant, in its outer corner
  const header = (corner: Corner) => {
    const right = corner.endsWith("Right");
    const top = corner.startsWith("top");
    return (
      <div
        style={{
          position: "absolute",
          [top ? "top" : "bottom"]: 6,
          [right ? "right" : "left"]: 8,
          display: "flex",
          flexDirection: right ? "row-reverse" : "row",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 600,
          color: colors[corner],
        }}
      >
        <span>{titles[corner]}</span>
        <IconButton
          size="xsmall"
          variant="ghost"
          label={`Add a task to "${titles[corner]}"`}
          icon={<LuPlus />}
          onClick={() => add(corner)}
          style={{ pointerEvents: "auto" }}
        />
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={tasks}
        quadrants={{
          topLeft: { color: colors.topLeft },
          topRight: { color: colors.topRight },
          bottomLeft: { color: colors.bottomLeft },
          bottomRight: { color: colors.bottomRight },
        }}
        reverseX
        showTicks={false}
        axisLabels={{
          top: "Important",
          bottom: "Not important",
          left: "Urgent",
          right: "Not urgent",
        }}
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index
                ? { ...task, x: clamp(target.x), y: clamp(target.y) }
                : task,
            ),
          );
          setStatus(`${point.label} moved to "${titles[target.quadrant]}"`);
        }}
        onQuadrantClick={(corner, at) => add(corner, at)}
        quadrantContent={{
          topLeft: header("topLeft"),
          topRight: header("topRight"),
          bottomLeft: header("bottomLeft"),
          bottomRight: header("bottomRight"),
        }}
        renderTooltip={(point) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{point.label}</strong>
            <span>
              Urgency {point.x.toFixed(1)} · Importance {point.y.toFixed(1)}
            </span>
          </div>
        )}
        height={360}
        ariaLabel="Task matrix: drag tasks between quadrants"
      />
      <p role="status">{status}</p>
    </div>
  );
}
