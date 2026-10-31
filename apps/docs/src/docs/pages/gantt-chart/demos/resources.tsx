import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const START = new Date(2026, 2, 2).getTime();
const DAY = 86_400_000;
const WEEKS = 6;

type Person = "ana" | "ben" | "chen" | "dara" | "eli";
type Project = "apollo" | "borealis" | "cassini" | "vacation";
const PEOPLE: Person[] = ["ana", "ben", "chen", "dara", "eli"];
const PROJECTS: Project[] = ["apollo", "borealis", "cassini", "vacation"];
const COLORS: Record<Project, string> = {
  apollo: "var(--chart-series-1, #4f46e5)",
  borealis: "var(--chart-series-2, #10b981)",
  cassini: "var(--chart-series-5, #0ea5e9)",
  vacation: "var(--text-secondary-color, #64748b)",
};

// Resource plan of six weeks: [person, project, first day, last day + 1]
const BOOKINGS: [Person, Project, number, number][] = [
  ["ana", "apollo", 0, 19],
  ["ana", "borealis", 21, 42],
  ["ben", "apollo", 0, 26],
  ["ben", "cassini", 14, 33],
  ["ben", "vacation", 35, 42],
  ["chen", "borealis", 0, 12],
  ["chen", "vacation", 14, 21],
  ["chen", "cassini", 21, 42],
  ["dara", "cassini", 3, 17],
  ["dara", "apollo", 28, 40],
  ["eli", "borealis", 7, 35],
];

// booked days over the window, overlapping bookings counted twice
const load = (person: Person) =>
  BOOKINGS.filter(
    ([p, project]) => p === person && project !== "vacation",
  ).reduce((sum, [, , from, to]) => sum + (to - from), 0) /
  (WEEKS * 7);

export default function ResourcesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const locale = i18n.language;
  const [project, setProject] = useState<"all" | Project>("all");
  const [hovered, setHovered] = useState<Person | null>(null);

  const visible = useMemo(
    () =>
      BOOKINGS.filter(
        ([, p]) => project === "all" || p === project || p === "vacation",
      ),
    [project],
  );
  const tasks = useMemo(
    (): GanttTask[] =>
      visible.map(([person, p, from, to]) => ({
        name: t(`res.projects.${p}`),
        row: t(`res.people.${person}`),
        group: t(`res.projects.${p}`),
        start: START + from * DAY,
        end: START + to * DAY,
      })),
    [t, visible],
  );
  // group colors in order of appearance, so that a project keeps its color
  const colors = useMemo(
    () => [...new Set(visible.map(([, p]) => p))].map((p) => COLORS[p]),
    [visible],
  );
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        aria-label={t("res.projectLabel")}
        value={project}
        onChange={(value) => setProject(value as "all" | Project)}
        style={{ maxWidth: 240 }}
      >
        <SelectItem value="all">{t("res.all")}</SelectItem>
        {PROJECTS.filter((p) => p !== "vacation").map((p) => (
          <SelectItem key={p} value={p}>
            {t(`res.projects.${p}`)}
          </SelectItem>
        ))}
      </Select>
      <GanttChart
        tasks={tasks}
        colors={colors}
        yAxis={{ min: START, max: START + WEEKS * 7 * DAY }}
        legend={{ position: "bottom" }}
        onHover={(event) => {
          const person = PEOPLE.find(
            (p) => t(`res.people.${p}`) === event?.xLabel,
          );
          if (person) setHovered(person);
        }}
        height={320}
        ariaLabel={t("res.aria")}
      />
      <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
        {hovered
          ? t(load(hovered) > 1 ? "res.overbooked" : "res.load", {
              person: t(`res.people.${hovered}`),
              share: percent.format(load(hovered)),
              weeks: WEEKS,
            })
          : t("res.hint")}
      </output>
    </div>
  );
}
