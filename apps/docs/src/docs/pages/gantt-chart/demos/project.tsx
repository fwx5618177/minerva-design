import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const day = (month: number, date: number) => new Date(2026, month - 1, date);

// Relaunch of a website: phases, tasks with their progress and milestones
const plan = [
  ["research", "discovery", day(3, 2), day(3, 13), 1],
  ["interviews", "discovery", day(3, 9), day(3, 20), 1],
  ["kickoff", null, day(3, 23), null, 0],
  ["wireframes", "design", day(3, 23), day(4, 7), 1],
  ["visualDesign", "design", day(4, 1), day(4, 24), 0.7],
  ["designSystem", "design", day(4, 13), day(5, 8), 0.35],
  ["frontend", "build", day(4, 20), day(5, 29), 0.2],
  ["backend", "build", day(4, 13), day(5, 22), 0.3],
  ["contentMigration", "build", day(5, 11), day(6, 5), 0],
  ["qa", "launch", day(5, 25), day(6, 12), 0],
  ["launch", null, day(6, 15), null, 0],
] as const;

export default function ProjectDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });

  const tasks = useMemo(
    (): GanttTask[] =>
      plan.map(([key, phase, start, end, progress]) =>
        phase === null
          ? { name: t(`tasks.${key}`), start, milestone: true }
          : {
              name: t(`tasks.${key}`),
              group: t(`phases.${phase}`),
              start,
              end: end ?? start,
              progress,
            },
      ),
    [t],
  );

  return (
    <GanttChart
      tasks={tasks}
      today={day(4, 22)}
      todayLabel={t("today")}
      progressName={t("progress")}
      milestoneName={t("milestones")}
      height={420}
      ariaLabel={t("projectAria")}
    />
  );
}
