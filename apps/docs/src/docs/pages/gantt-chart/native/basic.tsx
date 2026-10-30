import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/native";

const day = (month: number, date: number) => new Date(2026, month - 1, date);

// Relaunch of a website: tasks by phase with their progress, and the launch
const plan = [
  ["research", "discovery", day(3, 2), day(3, 13), 1],
  ["wireframes", "design", day(3, 23), day(4, 7), 1],
  ["visualDesign", "design", day(4, 1), day(4, 24), 0.7],
  ["frontend", "build", day(4, 20), day(5, 29), 0.2],
  ["qa", "launch", day(5, 25), day(6, 12), 0],
] as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const tasks = useMemo(
    (): GanttTask[] => [
      ...plan.map(([key, phase, start, end, progress]) => ({
        name: t(`tasks.${key}`),
        group: t(`phases.${phase}`),
        start,
        end,
        progress,
      })),
      { name: t("tasks.launch"), start: day(6, 15), milestone: true },
    ],
    [t],
  );
  return (
    <GanttChart
      height={300}
      locale={i18n.language}
      tasks={tasks}
      progressName={t("progress")}
      milestoneName={t("milestones")}
      legend={{ position: "bottom" }}
      ariaLabel={t("projectAria")}
    />
  );
}
