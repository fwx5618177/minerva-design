import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Radio, RadioGroup } from "minerva-design";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type State = "done" | "running" | "queued";

// monorepo tasks and their duration in seconds
const TASKS: [string, number][] = [
  ["tokens#build", 2],
  ["utils#build", 3],
  ["icons#build", 4],
  ["core#build", 6],
  ["charts#build", 8],
  ["react#build", 5],
  ["vue#build", 5],
  ["core#test", 7],
  ["charts#test", 9],
  ["react#test", 6],
  ["docs#build", 7],
  ["docs#deploy", 2],
];

// prerequisite → dependent
const NEEDS: [string, string][] = [
  ["tokens#build", "core#build"],
  ["utils#build", "core#build"],
  ["utils#build", "charts#build"],
  ["core#build", "charts#build"],
  ["core#build", "react#build"],
  ["core#build", "vue#build"],
  ["icons#build", "react#build"],
  ["icons#build", "vue#build"],
  ["core#build", "core#test"],
  ["charts#build", "charts#test"],
  ["react#build", "react#test"],
  ["charts#build", "docs#build"],
  ["react#build", "docs#build"],
  ["vue#build", "docs#build"],
  ["docs#build", "docs#deploy"],
  ["core#test", "docs#deploy"],
  ["charts#test", "docs#deploy"],
  ["react#test", "docs#deploy"],
];

const DURATION = new Map(TASKS);
const STATES: State[] = ["done", "running", "queued"];
const STATE_COLORS: Record<State, string> = {
  done: "var(--success-color, #16a34a)",
  running: "var(--primary-color, #4f46e5)",
  queued: "var(--text-secondary-color, #9ca3af)",
};

/** Longest remaining chain from each task: the scheduling priority */
const tail = (() => {
  const memo = new Map<string, number>();
  const visit = (id: string): number => {
    if (memo.has(id)) return memo.get(id)!;
    const next = NEEDS.filter(([a]) => a === id).map(([, b]) => visit(b));
    const value = DURATION.get(id)! + Math.max(0, ...next);
    memo.set(id, value);
    return value;
  };
  for (const [id] of TASKS) visit(id);
  return memo;
})();

/** List scheduling on `workers` slots: start time of every task, longest chain first */
const schedule = (workers: number) => {
  const start = new Map<string, number>();
  const finish = new Map<string, number>();
  for (let time = 0; start.size < TASKS.length; time++) {
    const busy = [...start].filter(
      ([id, s]) => s <= time && time < s + DURATION.get(id)!,
    ).length;
    const ready = TASKS.map(([id]) => id)
      .filter(
        (id) =>
          !start.has(id) &&
          NEEDS.every(
            ([a, b]) => b !== id || (finish.has(a) && finish.get(a)! <= time),
          ),
      )
      .sort((a, b) => tail.get(b)! - tail.get(a)!);
    for (const id of ready.slice(0, Math.max(0, workers - busy))) {
      start.set(id, time);
      finish.set(id, time + DURATION.get(id)!);
    }
  }
  return { start, makespan: Math.max(...finish.values()) };
};

export default function BuildSchedulerDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [workers, setWorkers] = useState(2);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const plan = useMemo(() => schedule(workers), [workers]);
  const finished = elapsed >= plan.makespan;

  // one simulated second every 250 ms while playing
  useEffect(() => {
    if (!playing || finished) return;
    const timer = window.setInterval(
      () => setElapsed((value) => value + 1),
      250,
    );
    return () => window.clearInterval(timer);
  }, [playing, finished]);

  const stateOf = (id: string): State => {
    const start = plan.start.get(id)!;
    if (elapsed >= start + DURATION.get(id)!) return "done";
    return elapsed >= start ? "running" : "queued";
  };
  const percent = useMemo(
    () => new Intl.NumberFormat(i18n.language, { style: "percent" }),
    [i18n.language],
  );

  const nodes = TASKS.map(([id, seconds]): GraphNode => {
    const state = stateOf(id);
    const done = (elapsed - plan.start.get(id)!) / seconds;
    return {
      id,
      label: id,
      value: seconds,
      group: state,
      subtitle:
        state === "running"
          ? t("taskProgress", { percent: percent.format(done) })
          : t("taskSeconds", { seconds }),
    };
  });
  const edges = useMemo(
    (): GraphEdge[] => NEEDS.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () =>
      STATES.map((id) => ({
        id,
        name: t(`runStates.${id}`),
        color: STATE_COLORS[id],
      })),
    [t],
  );
  const running = TASKS.filter(([id]) => stateOf(id) === "running").map(
    ([id]) => id,
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center">
        <RadioGroup
          aria-label={t("workers")}
          direction="horizontal"
          value={String(workers)}
          onChange={(value) => {
            setWorkers(Number(value));
            setElapsed(0);
          }}
        >
          {[1, 2, 4].map((n) => (
            <Radio key={n} value={String(n)} label={t("workerCount", { n })} />
          ))}
        </RadioGroup>
        <Button
          size="small"
          onClick={() => {
            if (finished) setElapsed(0);
            setPlaying(!playing || finished);
          }}
        >
          {playing && !finished ? t("pause") : t("run")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => {
            setPlaying(false);
            setElapsed(0);
          }}
        >
          {t("reset")}
        </Button>
      </HStack>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        criticalPath
        animation={false}
        height={400}
        ariaLabel={t("schedulerAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {finished
          ? t("schedulerDone", { seconds: plan.makespan, workers })
          : t("schedulerStatus", {
              elapsed,
              seconds: plan.makespan,
              running: running.length
                ? new Intl.ListFormat(i18n.language).format(running)
                : t("idle"),
            })}{" "}
        {t("schedulerBound", { seconds: Math.max(...tail.values()) })}
      </output>
    </div>
  );
}
