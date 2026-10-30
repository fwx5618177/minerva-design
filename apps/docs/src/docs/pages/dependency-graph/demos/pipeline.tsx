import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  DependencyGraph,
  criticalPath,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Status = "success" | "running" | "failed" | "pending";

// task, status, duration in minutes
const TASKS: [string, Status, number][] = [
  ["install", "success", 3],
  ["lint", "success", 2],
  ["typecheck", "success", 3],
  ["unit", "success", 6],
  ["security", "success", 3],
  ["buildWeb", "success", 5],
  ["buildDocs", "success", 4],
  ["e2e", "running", 9],
  ["visual", "failed", 5],
  ["package", "pending", 2],
  ["staging", "pending", 3],
  ["production", "pending", 4],
];

const NEEDS: [string, string][] = [
  ["install", "lint"],
  ["install", "typecheck"],
  ["install", "unit"],
  ["install", "security"],
  ["typecheck", "buildWeb"],
  ["install", "buildDocs"],
  ["buildWeb", "e2e"],
  ["buildWeb", "visual"],
  ["buildDocs", "visual"],
  ["unit", "package"],
  ["buildWeb", "package"],
  ["lint", "package"],
  ["package", "staging"],
  ["e2e", "staging"],
  ["security", "staging"],
  ["visual", "staging"],
  ["staging", "production"],
];

const STATUS_COLORS: Record<Status, string> = {
  success: "var(--success-color, #16a34a)",
  running: "var(--info-color, #0ea5e9)",
  failed: "var(--danger-color, #ef4444)",
  pending: "var(--text-secondary-color, #9ca3af)",
};

const STATUSES: Status[] = ["success", "running", "failed", "pending"];

export default function PipelineDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [showCritical, setShowCritical] = useState(true);
  const nodes = useMemo(
    (): GraphNode[] =>
      TASKS.map(([id, status, minutes]) => ({
        id,
        label: t(`tasks.${id}`),
        subtitle: t("taskSubtitle", {
          status: t(`statuses.${status}`),
          minutes,
        }),
        group: status,
        value: minutes,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] => NEEDS.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () =>
      STATUSES.map((id) => ({
        id,
        name: t(`statuses.${id}`),
        color: STATUS_COLORS[id],
      })),
    [t],
  );
  // the same longest path the chart highlights, for the summary below
  const path = useMemo(() => criticalPath(nodes, edges), [nodes, edges]);
  const separator = t("pathSeparator");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={showCritical}
        onChange={setShowCritical}
        label={t("showCritical")}
      />
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        edgeStyle="orthogonal"
        criticalPath={showCritical}
        dag={{ criticalColor: "var(--primary-color, #4f46e5)", layerGap: 48 }}
        height={420}
        ariaLabel={t("pipelineAria")}
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {t("criticalSummary", {
          minutes: new Intl.NumberFormat(i18n.language).format(path.length),
          path: path.nodes.map((id) => t(`tasks.${id}`)).join(separator),
        })}
      </span>
    </div>
  );
}
