import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const day = (month: number, date: number) => new Date(2026, month - 1, date);

// Release of a mobile app: every task waits for the ones listed after it;
// the arrows go from the end of a task to the start of the next, and turn
// around when a task starts before the end of what it waits for
const plan = [
  ["spec", "product", day(9, 4), day(9, 14), ["kickoff"]],
  ["api", "backend", day(9, 11), day(10, 2), ["spec"]],
  ["ui", "mobile", day(9, 16), day(10, 9), ["spec"]],
  ["integration", "mobile", day(10, 5), day(10, 20), ["api", "ui"]],
  ["security", "backend", day(10, 5), day(10, 16), ["api"]],
  ["storeAssets", "product", day(10, 12), day(10, 23), ["ui"]],
  ["beta", "mobile", day(10, 21), day(11, 4), ["integration", "security"]],
] as const;

export default function DependenciesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const [arrows, setArrows] = useState(true);

  const tasks = useMemo(
    (): GanttTask[] => [
      { name: t("pipeline.kickoff"), start: day(9, 1), milestone: true },
      ...plan.map(([key, team, start, end, after]) => ({
        name: t(`pipeline.${key}`),
        group: t(`streams.${team}`),
        start,
        end,
        dependencies: after.map((task) => t(`pipeline.${task}`)),
      })),
      {
        name: t("pipeline.release"),
        start: day(11, 9),
        milestone: true,
        dependencies: [t("pipeline.beta"), t("pipeline.storeAssets")],
      },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={arrows}
        onChange={setArrows}
        label={t("showDependencies")}
      />
      <GanttChart
        tasks={tasks}
        dependencyArrows={arrows}
        milestoneName={t("milestones")}
        height={380}
        ariaLabel={t("pipelineAria")}
      />
    </div>
  );
}
