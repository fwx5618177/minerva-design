import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const START = new Date(2026, 1, 2).getTime();
const DAY = 86_400_000;

// Opening of a warehouse: durations in days and what each task waits for
const ACTIVITIES = [
  ["lease", 5, []],
  ["fitOut", 20, ["lease"]],
  ["racking", 8, ["fitOut"]],
  ["wms", 15, ["lease"]],
  ["hiring", 25, ["lease"]],
  ["training", 6, ["hiring", "wms"]],
  ["testRun", 4, ["racking", "training"]],
] as const;
type Key = (typeof ACTIVITIES)[number][0];

// Critical path method: earliest starts forward, latest starts backward;
// the tasks without slack form the critical path
const schedule = () => {
  const early = new Map<Key, number>();
  for (const [key, , after] of ACTIVITIES) {
    early.set(
      key,
      Math.max(
        0,
        ...after.map(
          (k) => early.get(k)! + ACTIVITIES.find(([a]) => a === k)![1],
        ),
      ),
    );
  }
  const finish = Math.max(
    ...ACTIVITIES.map(([key, days]) => early.get(key)! + days),
  );
  const late = new Map<Key, number>();
  for (const [key, days] of [...ACTIVITIES].reverse()) {
    const next = ACTIVITIES.filter(([, , after]) =>
      (after as readonly Key[]).includes(key),
    );
    late.set(key, Math.min(finish, ...next.map(([k]) => late.get(k)!)) - days);
  }
  return ACTIVITIES.map(([key, days, after]) => ({
    key,
    days,
    after: after as readonly Key[],
    start: early.get(key)!,
    slack: late.get(key)! - early.get(key)!,
  }));
};
const PLAN = schedule();
const FINISH = Math.max(...PLAN.map((a) => a.start + a.days));

export default function CriticalPathDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const locale = i18n.language;
  const [highlight, setHighlight] = useState(true);
  const [selected, setSelected] = useState<Key | null>(null);

  const days = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "day",
      unitDisplay: "long",
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const tasks = useMemo(
    (): GanttTask[] => [
      ...PLAN.map((a) => ({
        id: a.key,
        name: t(`cpm.tasks.${a.key}`),
        start: START + a.start * DAY,
        end: START + (a.start + a.days) * DAY,
        // the first task is critical: the critical group comes first
        ...(highlight
          ? { group: a.slack === 0 ? t("cpm.critical") : t("cpm.slack") }
          : {}),
        dependencies: [...a.after],
      })),
      {
        id: "goLive",
        name: t("cpm.tasks.goLive"),
        start: START + FINISH * DAY,
        milestone: true,
        dependencies: ["testRun"],
      },
    ],
    [t, highlight],
  );

  const path = new Intl.ListFormat(locale, { type: "unit" }).format(
    PLAN.filter((a) => a.slack === 0).map((a) => t(`cpm.tasks.${a.key}`)),
  );
  const chosen = PLAN.find((a) => a.key === selected);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={highlight}
        onChange={setHighlight}
        label={t("cpm.highlight")}
      />
      <GanttChart
        tasks={tasks}
        colors={
          highlight
            ? [
                "var(--danger-color, #dc2626)",
                "var(--text-secondary-color, #64748b)",
              ]
            : undefined
        }

        milestoneName={t("milestones")}
        onPointClick={(event) => {
          const task = PLAN.find(
            (a) => t(`cpm.tasks.${a.key}`) === event.xLabel,
          );
          setSelected(task?.key ?? null);
        }}
        height={340}
        ariaLabel={t("cpm.aria")}
      />
      <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
        {chosen
          ? chosen.slack === 0
            ? t("cpm.taskCritical", { task: t(`cpm.tasks.${chosen.key}`) })
            : t("cpm.taskSlack", {
                task: t(`cpm.tasks.${chosen.key}`),
                slack: days(chosen.slack),
              })
          : t("cpm.summary", { days: days(FINISH), path })}
      </output>
    </div>
  );
}
