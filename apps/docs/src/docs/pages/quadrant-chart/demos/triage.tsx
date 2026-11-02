import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// x: urgency, y: importance (0-10), with an estimate in minutes
const initial = [
  { key: "loginOutage", x: 9, y: 8, minutes: 30 },
  { key: "taxFiling", x: 7, y: 8.8, minutes: 45 },
  { key: "quarterlyPlanning", x: 3, y: 8.5, minutes: 90 },
  { key: "mentoring", x: 1.8, y: 6.5, minutes: 60 },
  { key: "bookTravel", x: 8.5, y: 3, minutes: 15 },
  { key: "meetings", x: 6.5, y: 1.8, minutes: 120 },
  { key: "socialMedia", x: 1.5, y: 1.2, minutes: 20 },
];

// i18next plural key ("count_one" / "count_other")
const COUNT = "triage.count";

const duration = (minutes: number) =>
  minutes < 60
    ? `${minutes}m`
    : `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ""}`;

export default function TriageDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [tasks, setTasks] = useState(initial);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const points = tasks.map(({ key, x, y }): QuadrantPoint => ({
    label: t(`tasks.${key}`),
    x,
    y,
  }));
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: {
        badge: "Q1",
        label: t("doFirst"),
        description: t("triage.doNow"),
      },
      topRight: {
        badge: "Q2",
        label: t("schedule"),
        description: t("triage.plan"),
      },
      bottomLeft: {
        badge: "Q3",
        label: t("delegate"),
        description: t("triage.handOff"),
      },
      bottomRight: {
        badge: "Q4",
        label: t("eliminate"),
        description: t("triage.drop"),
      },
    }),
    [t],
  );
  const title = (corner: QuadrantCorner) => quadrants[corner]?.label ?? "";
  const minutesOf = (point: QuadrantPoint) =>
    tasks[points.indexOf(point)]?.minutes ?? 0;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={quadrants}
        reverseX
        showTicks={false}
        axisLabels={{
          top: t("important"),
          bottom: t("notImportant"),
          left: t("urgent"),
          right: t("notUrgent"),
        }}
        // "3 tasks · 1h 15m" after each title
        showCounts={(count, inQuadrant) =>
          t(COUNT, {
            count,
            time: duration(
              inQuadrant.reduce((sum, point) => sum + minutesOf(point), 0),
            ),
          })
        }
        selectedIndex={selected}
        onPointClick={(point, index) => {
          setSelected(index);
          setStatus(t("triage.selected", { task: point.label }));
        }}
        // drag, or Shift + arrow keys on the focused task
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index ? { ...task, x: target.x, y: target.y } : task,
            ),
          );
          setSelected(index);
          setStatus(
            t("taskMoved", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
        height={380}
        ariaLabel={t("triage.aria")}
      />
      <p role="status">{status ?? t("triage.hint")}</p>
    </div>
  );
}
