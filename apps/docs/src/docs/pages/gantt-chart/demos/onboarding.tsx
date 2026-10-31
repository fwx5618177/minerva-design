import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

// Onboarding plan of a new hire who starts on Monday, April 6: days relative
// to the first day, one color per owner, and the check-ins as milestones
const FIRST_DAY = new Date(2026, 3, 6).getTime();
const DAY = 86_400_000;
const day = (offset: number) => FIRST_DAY + offset * DAY;
const TODAY = day(9);

const STEPS = [
  ["contract", "hr", -14, -10],
  ["laptop", "it", -7, -2],
  ["accounts", "it", -3, 0],
  ["welcome", "manager", 0, 1],
  ["orientation", "hr", 0, 3],
  ["buddyLunch", "buddy", 1, 2],
  ["codebase", "buddy", 1, 10],
  ["firstTicket", "manager", 3, 12],
  ["training", "hr", 7, 21],
  ["firstProject", "manager", 14, 45],
] as const;
const CHECK_INS = [
  ["firstDay", 0],
  ["checkIn30", 30],
  ["review60", 60],
] as const;

type Status = "done" | "inProgress" | "upcoming";
const STATUS_COLORS: Record<Status, string> = {
  done: "var(--success-color, #16a34a)",
  inProgress: "var(--primary-color, #4f46e5)",
  upcoming: "var(--text-muted-color, #64748b)",
};

export default function OnboardingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const locale = i18n.language;

  const tasks = useMemo(
    (): GanttTask[] => [
      ...STEPS.map(([key, owner, from, to]) => ({
        name: t(`onboard.tasks.${key}`),
        group: t(`onboard.owners.${owner}`),
        start: day(from),
        end: day(to),
      })),
      ...CHECK_INS.map(([key, offset]) => ({
        name: t(`onboard.tasks.${key}`),
        start: day(offset),
        milestone: true,
      })),
    ],
    [t],
  );
  const dates = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    [locale],
  );

  // the bars of a group are its tasks in order; the milestones are a series
  const taskOf = (seriesId: string, index: number) => {
    if (seriesId === "gantt:milestones")
      return tasks.filter((task) => task.milestone)[index];
    const group = seriesId.slice("gantt:".length);
    return tasks.filter((task) => !task.milestone && task.group === group)[
      index
    ];
  };

  return (
    <GanttChart
      tasks={tasks}
      today={TODAY}
      todayLabel={t("today")}
      milestoneName={t("onboard.checkIns")}
      legend={{ position: "bottom" }}
      renderTooltip={(event) => {
        const item = event.items[0];
        const task = item && taskOf(item.seriesId, item.index);
        if (!task) return null;
        const start = Number(task.start);
        const end = Number(task.end ?? task.start);
        const status: Status =
          end < TODAY ? "done" : start <= TODAY ? "inProgress" : "upcoming";
        return (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{task.name}</strong>
            {task.group && (
              <span>{t("onboard.owner", { owner: task.group })}</span>
            )}
            <span>
              {task.milestone
                ? dates.format(start)
                : dates.formatRange(start, end)}
            </span>
            <span style={{ color: STATUS_COLORS[status] }}>
              {t(`onboard.status.${status}`)}
            </span>
          </div>
        );
      }}
      height={380}
      ariaLabel={t("onboard.aria")}
    />
  );
}
