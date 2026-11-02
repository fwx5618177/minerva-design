import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IconButton } from "minerva-design";
import {
  QuadrantChart,
  quadrantCenter,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";
import { LuPlus } from "react-icons/lu";

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left
const geometry = { reverseX: true };

type Task = { key?: string; n?: number; x: number; y: number; minutes: number };
const initial: Task[] = [
  { key: "loginOutage", x: 9, y: 8, minutes: 30 },
  { key: "taxFiling", x: 7.2, y: 7, minutes: 45 },
  { key: "quarterlyPlanning", x: 3, y: 8.5, minutes: 90 },
  { key: "bookTravel", x: 8.5, y: 3, minutes: 15 },
  { key: "inboxZero", x: 2.5, y: 2, minutes: 25 },
];

const quadrants: QuadrantRegions = {
  topLeft: { badge: "Q1", color: "var(--danger-color, #ef4444)" },
  topRight: { badge: "Q2", color: "var(--primary-color, #4f46e5)" },
  bottomLeft: { badge: "Q3", color: "var(--warning-color, #f59e0b)" },
  bottomRight: { badge: "Q4", color: "var(--text-secondary-color, #64748b)" },
};

// translation keys of the titles and of the action hints
const keys: Record<QuadrantCorner, [string, string]> = {
  topLeft: ["doFirst", "triage.doNow"],
  topRight: ["schedule", "triage.plan"],
  bottomLeft: ["delegate", "triage.handOff"],
  bottomRight: ["eliminate", "triage.drop"],
};

// i18next plural key ("count_one" / "count_other")
const COUNT = "triage.count";

const duration = (minutes: number) =>
  minutes < 60
    ? `${minutes}m`
    : `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ""}`;

export default function QuadrantHeaderDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [tasks, setTasks] = useState(initial);
  const [selected, setSelected] = useState<number | null>(0);
  const [status, setStatus] = useState<string | null>(null);
  const name = (task: Task) =>
    task.key ? t(`tasks.${task.key}`) : t("newTask", { n: task.n });
  const title = (corner: QuadrantCorner) => t(keys[corner][0]);
  const points: QuadrantPoint[] = tasks.map((task) => ({
    label: name(task),
    x: task.x,
    y: task.y,
  }));

  const add = (corner: QuadrantCorner) => {
    const center = quadrantCenter(geometry, corner);
    const jitter = (tasks.length % 3) - 1;
    const task: Task = {
      n: tasks.length + 1,
      x: center.x + jitter,
      y: center.y + jitter / 2,
      minutes: 30,
    };
    setTasks((current) => [...current, task]);
    setSelected(tasks.length);
    setStatus(t("taskAdded", { task: name(task), quadrant: title(corner) }));
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={quadrants}
        reverseX
        showTicks={false}
        selectedIndex={selected}
        onPointClick={(point, index) => {
          setSelected(index);
          setStatus(t("triage.selected", { task: point.label }));
        }}
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index ? { ...task, x: target.x, y: target.y } : task,
            ),
          );
          setStatus(
            t("taskMoved", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
        // React header in the outer corner of each quadrant
        renderQuadrantHeader={(corner, { count, indices, region }) => {
          const right = corner.endsWith("Right");
          const minutes = indices.reduce((sum, i) => sum + tasks[i].minutes, 0);
          return (
            <div
              style={{
                display: "flex",
                flexDirection: right ? "row-reverse" : "row",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "var(--text-secondary-color)",
              }}
            >
              <span
                style={{
                  padding: "1px 6px",
                  borderRadius: 999,
                  fontWeight: 700,
                  color: region?.color,
                  background: `color-mix(in srgb, ${region?.color} 16%, transparent)`,
                }}
              >
                {region?.badge}
              </span>
              <strong style={{ color: region?.color }}>{title(corner)}</strong>
              <span>{t(keys[corner][1])}</span>
              <span>{t(COUNT, { count, time: duration(minutes) })}</span>
              <IconButton
                size="xsmall"
                variant="ghost"
                label={t("addTask", { quadrant: title(corner) })}
                icon={<LuPlus />}
                onClick={() => add(corner)}
              />
            </div>
          );
        }}
        // anchors on the dots for end-to-end tests: [data-testid="task-0"]
        getPointProps={(_point, index) => ({ "data-testid": `task-${index}` })}
        height={380}
        ariaLabel={t("boardAria")}
      />
      <p role="status">{status ?? t("triage.headerHint")}</p>
    </div>
  );
}
