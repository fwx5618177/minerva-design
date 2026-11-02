import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { QuadrantTaskBoard } from "minerva-design";
import type { QuadrantPoint } from "minerva-design/charts";

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left.
// Sample tasks keep a translation key until they are renamed.
type Task = QuadrantPoint & { key?: string };
const initial: Task[] = [
  { key: "loginOutage", x: 9, y: 8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8, y: 3 },
  { key: "inboxZero", x: 2.5, y: 2 },
];

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-task-board.data",
  });
  const [tasks, setTasks] = useState(initial);
  const points = useMemo(
    () =>
      tasks.map((task) =>
        task.key ? { ...task, label: t(`tasks.${task.key}`) } : task,
      ),
    [tasks, t],
  );
  return (
    <QuadrantTaskBoard
      points={points}
      // a renamed sample task drops its translation key
      onPointsChange={(next) =>
        setTasks(
          next.map((point) => {
            const task = point as Task;
            return task.key && task.label !== t(`tasks.${task.key}`)
              ? { ...task, key: undefined }
              : task;
          }),
        )
      }
      quadrants={{
        topLeft: { label: t("doFirst"), color: "var(--danger-color, #ef4444)" },
        topRight: {
          label: t("schedule"),
          color: "var(--primary-color, #4f46e5)",
        },
        bottomLeft: {
          label: t("delegate"),
          color: "var(--warning-color, #f59e0b)",
        },
        bottomRight: {
          label: t("eliminate"),
          color: "var(--text-secondary-color, #64748b)",
        },
      }}
      reverseX
      showTicks={false}
      axisLabels={{
        top: t("important"),
        bottom: t("notImportant"),
        left: t("urgent"),
        right: t("notUrgent"),
      }}
      height={380}
      ariaLabel={t("boardAria")}
    />
  );
}
