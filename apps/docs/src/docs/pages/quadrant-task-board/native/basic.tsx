// Eisenhower task board: the + of a quadrant (or a tap on its empty area)
// adds a task, the buttons above the active task edit or delete it, and
// tasks move by drag and drop or the "Move to" accessibility actions.
// `onPointsChange` keeps the list; the built-in buttons and dialogs follow
// the language of the app.
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { QuadrantTaskBoard, type QuadrantPoint } from "minerva-design/native";

// the sample tasks keep a translation key so that their names follow the
// language until the user renames them
type Task = QuadrantPoint & { key?: string; customLabel?: string };

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left
const initial: Task[] = [
  { key: "loginOutage", x: 9, y: 8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8, y: 3 },
  { key: "inboxZero", x: 2.5, y: 2 },
];

export default function Basic() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-task-board.data",
  });
  const [tasks, setTasks] = useState(initial);
  const keyName = (task: Task) =>
    task.key ? t(`tasks.${task.key}`) : undefined;
  const points: QuadrantPoint[] = tasks.map((task) => ({
    ...task,
    label: task.customLabel ?? keyName(task) ?? task.label,
  }));

  return (
    <View style={{ width: "100%" }}>
      <QuadrantTaskBoard
        points={points}
        onPointsChange={(next) =>
          setTasks(
            next.map((point) => {
              const task = point as Task;
              const named = task.key && task.label === keyName(task);
              return { ...task, customLabel: named ? undefined : task.label };
            }),
          )
        }
        quadrants={{
          topLeft: {
            label: t("doFirst"),
            color: "var(--danger-color, #ef4444)",
          },
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
        axisLabels={{
          top: t("important"),
          bottom: t("notImportant"),
          left: t("urgent"),
          right: t("notUrgent"),
        }}
        reverseX
        showTicks={false}
        height={360}
        ariaLabel={t("boardAria")}
      />
    </View>
  );
}
