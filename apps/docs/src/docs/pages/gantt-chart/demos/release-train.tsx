import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  GanttChart,
  type ChartAnnotation,
  type GanttTask,
} from "minerva-design/charts";

// A program increment of an agile release train: four two-week iterations
// and an innovation & planning (IP) iteration, one row per team
const PI_START = new Date(2026, 0, 5).getTime();
const DAY = 86_400_000;
const ITERATION = 14 * DAY;
const at = (iteration: number, day = 0) =>
  new Date(PI_START + iteration * ITERATION + day * DAY);

// [feature, team, kind, first iteration, last iteration, progress]
const FEATURES = [
  ["checkout", "atlas", "feature", 0, 1, 1],
  ["paymentRetries", "atlas", "enabler", 2, 2, 0.6],
  ["wallet", "atlas", "feature", 3, 3, 0],
  ["searchFilters", "borealis", "feature", 0, 0, 1],
  ["indexing", "borealis", "enabler", 1, 2, 0.5],
  ["recommendations", "borealis", "feature", 3, 3, 0],
  ["observability", "comet", "enabler", 0, 1, 1],
  ["push", "comet", "feature", 2, 3, 0.3],
] as const;

export default function ReleaseTrainDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });

  const tasks = useMemo(
    (): GanttTask[] => [
      ...FEATURES.map(([key, team, kind, first, last, progress]) => ({
        id: key,
        name: t(`train.features.${key}`),
        row: t(`train.teams.${team}`),
        group: t(`train.kinds.${kind}`),
        start: at(first),
        // features end on the Friday of their last iteration
        end: at(last, 11),
        progress,
      })),
      ...[1, 3].map((iteration) => ({
        id: `demo${iteration}`,
        name: t("train.demo", { n: (iteration + 1) / 2 }),
        row: t("train.events"),
        start: at(iteration, 11),
        milestone: true,
      })),
    ],
    [t],
  );

  // shaded iterations, the IP iteration tinted: background areas along
  // the time axis
  const annotations = useMemo(
    (): ChartAnnotation[] =>
      [0, 1, 2, 3, 4].map((i) => ({
        type: "rect",
        y0: at(i).getTime(),
        y1: at(i + 1).getTime(),
        color:
          i === 4
            ? "var(--warning-color, #f59e0b)"
            : "var(--text-secondary-color, #64748b)",
        opacity: i === 4 ? 0.12 : i % 2 ? 0 : 0.06,
        label: i === 4 ? t("train.ip") : t("train.iteration", { n: i + 1 }),
        labelPosition: "top-left",
      })),
    [t],
  );

  return (
    <GanttChart
      tasks={tasks}
      annotations={annotations}
      yAxis={{ min: at(0).getTime(), max: at(5).getTime() }}
      milestoneName={t("train.demos")}
      progressName={t("progress")}
      legend={{ position: "bottom" }}
      height={340}
      ariaLabel={t("train.aria")}
    />
  );
}
