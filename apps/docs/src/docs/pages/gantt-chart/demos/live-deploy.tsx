import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { GanttChart, type GanttTask } from "minerva-design/charts";

// A deployment pipeline run: stages in minutes from the start of the run;
// the simulated clock moves one minute every 0.6 s
const RUN_START = new Date(2026, 9, 30, 14, 0).getTime();
const MINUTE = 60_000;
const STAGES = [
  ["checkout", "build", 0, 1, []],
  ["compile", "build", 1, 7, ["checkout"]],
  ["unit", "test", 7, 15, ["compile"]],
  ["lint", "test", 7, 10, ["compile"]],
  ["integration", "test", 15, 24, ["unit", "lint"]],
  ["staging", "release", 24, 28, ["integration"]],
  ["smoke", "test", 28, 31, ["staging"]],
  ["canary", "release", 31, 37, ["smoke"]],
  ["production", "release", 37, 41, ["canary"]],
] as const;
const END = 41;

export default function LiveDeployDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const locale = i18n.language;
  const [minute, setMinute] = useState(0);
  const [running, setRunning] = useState(true);

  const done = minute >= END;

  useEffect(() => {
    if (!running || done) return;
    const timer = window.setInterval(() => {
      setMinute((m) => Math.min(END, m + 1));
    }, 600);
    return () => window.clearInterval(timer);
  }, [running, done]);

  // the progress of every stage follows the clock
  const tasks = useMemo(
    (): GanttTask[] =>
      STAGES.map(([key, group, from, to, after]) => ({
        id: key,
        name: t(`deploy.stages.${key}`),
        group: t(`deploy.groups.${group}`),
        start: RUN_START + from * MINUTE,
        end: RUN_START + to * MINUTE,
        progress: Math.min(1, Math.max(0, (minute - from) / (to - from))),
        dependencies: [...after],
      })),
    [t, minute],
  );

  const elapsed = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "minute",
    unitDisplay: "long",
  }).format(minute);
  const current = STAGES.filter(
    ([, , from, to]) => from <= minute && minute < to,
  ).map(([key]) => t(`deploy.stages.${key}`));

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <GanttChart
        tasks={tasks}
        today={RUN_START + minute * MINUTE}
        todayLabel={t("deploy.now")}
        progressName={t("progress")}
        dependencyArrows={false}
        yAxis={{ min: RUN_START, max: RUN_START + END * MINUTE }}
        interaction={false}
        legend={{ position: "bottom" }}
        height={340}
        ariaLabel={t("deploy.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
          {done
            ? t("deploy.done", { elapsed })
            : t("deploy.running", {
                stages: new Intl.ListFormat(locale).format(current),
                elapsed,
              })}
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => {
            if (done) {
              setMinute(0);
              setRunning(true);
            } else setRunning((r) => !r);
          }}
        >
          {done
            ? t("deploy.restart")
            : running
              ? t("deploy.pause")
              : t("deploy.resume")}
        </Button>
      </HStack>
    </div>
  );
}
