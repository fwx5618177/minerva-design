import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TreeChart,
  type GraphChartHandle,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Status = "done" | "doing" | "todo";

// work item, parent, story points and status of the work packages
const ITEMS: [string, string | null, number?, Status?][] = [
  ["release", null],
  ["onboarding", "release"],
  ["signup", "onboarding"],
  ["emailVerify", "signup", 3, "done"],
  ["socialLogin", "signup", 5, "doing"],
  ["tour", "onboarding"],
  ["tourScreens", "tour", 3, "done"],
  ["tourSkip", "tour", 1, "done"],
  ["payments", "release"],
  ["checkout", "payments"],
  ["cardForm", "checkout", 5, "doing"],
  ["applePay", "checkout", 8, "todo"],
  ["billing", "payments"],
  ["invoices", "billing", 3, "todo"],
  ["refunds", "billing", 5, "todo"],
  ["platform", "release"],
  ["offline", "platform"],
  ["syncQueue", "offline", 8, "doing"],
  ["conflicts", "offline", 5, "todo"],
  ["quality", "platform"],
  ["crashReports", "quality", 2, "done"],
  ["perfBudget", "quality", 3, "todo"],
];

const STATUSES: Status[] = ["done", "doing", "todo"];
const LEVELS = ["deliverables", "features", "packages"];
const COLORS: Record<Status, string> = {
  done: "var(--success-color, #16a34a)",
  doing: "var(--primary-color, #4f46e5)",
  todo: "var(--text-secondary-color, #9ca3af)",
};

const PARENT = new Map(ITEMS.map(([id, parent]) => [id, parent]));

const depthOf = (id: string): number => {
  const parent = PARENT.get(id);
  return parent ? depthOf(parent) + 1 : 0;
};

/** Total and done story points of every item, rolled up from the packages */
const ROLLUP = (() => {
  const points = new Map<string, { total: number; done: number }>(
    ITEMS.map(([id]) => [id, { total: 0, done: 0 }]),
  );
  for (const [id, , value, status] of ITEMS) {
    if (!value) continue;
    for (let at = id as string | null | undefined; at; at = PARENT.get(at)) {
      const sum = points.get(at)!;
      sum.total += value;
      if (status === "done") sum.done += value;
    }
  }
  return points;
})();
const PARENTS = new Set(ITEMS.map(([, parent]) => parent));

export default function WbsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const ref = useRef<GraphChartHandle>(null);
  const [depth, setDepth] = useState("1");
  const [status, setStatus] = useState("");
  const percent = useMemo(
    () => new Intl.NumberFormat(i18n.language, { style: "percent" }),
    [i18n.language],
  );

  const nodes = useMemo(
    (): GraphNode[] =>
      ITEMS.map(([id, , points, state]) => {
        const sum = ROLLUP.get(id)!;
        return {
          id,
          label: t(`wbsItems.${id}`),
          subtitle: points
            ? t("wbsPoints", { points })
            : t("wbsRollup", {
                points: sum.total,
                done: percent.format(sum.done / sum.total),
              }),
          group: state ?? "summary",
          // the plan opens on its three deliverables
          collapsed: PARENTS.has(id) && depthOf(id) === 1,
        };
      }),
    [t, percent],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      ITEMS.filter(([, parent]) => parent).map(([id, parent]) => ({
        source: parent!,
        target: id,
      })),
    [],
  );
  const groups = useMemo(
    () => [
      { id: "summary", name: t("wbsStatuses.summary") },
      ...STATUSES.map((id) => ({
        id,
        name: t(`wbsStatuses.${id}`),
        color: COLORS[id],
      })),
    ],
    [t],
  );

  const showDepth = (value: string) => {
    setDepth(value);
    const level = Number(value);
    ref.current?.expand();
    for (const [id] of ITEMS) {
      if (PARENTS.has(id) && depthOf(id) === level) ref.current?.collapse(id);
    }
    setStatus(
      t("wbsDepthStatus", { level: t(`wbsLevels.${LEVELS[level - 1]}`) }),
    );
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("wbsDepth")}
        direction="horizontal"
        value={depth}
        onChange={(value) => showDepth(String(value))}
      >
        {LEVELS.map((id, i) => (
          <Radio key={id} value={String(i + 1)} label={t(`wbsLevels.${id}`)} />
        ))}
      </RadioGroup>
      <TreeChart
        ref={ref}
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="org"
        height={480}
        ariaLabel={t("wbsAria")}
        onToggle={(event) => {
          const sum = ROLLUP.get(event.id)!;
          setStatus(
            t(event.collapsed ? "wbsCollapsed" : "wbsExpanded", {
              name: t(`wbsItems.${event.id}`),
              points: sum.total,
              remaining: sum.total - sum.done,
            }),
          );
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {status ||
          t("wbsSummary", {
            points: ROLLUP.get("release")!.total,
            done: percent.format(
              ROLLUP.get("release")!.done / ROLLUP.get("release")!.total,
            ),
          })}
      </output>
    </div>
  );
}
