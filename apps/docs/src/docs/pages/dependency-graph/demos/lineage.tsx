import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Layer = "source" | "staging" | "mart" | "dashboard";

const TABLES: [string, Layer][] = [
  ["raw.orders", "source"],
  ["raw.payments", "source"],
  ["raw.customers", "source"],
  ["raw.events", "source"],
  ["stg_orders", "staging"],
  ["stg_payments", "staging"],
  ["stg_customers", "staging"],
  ["stg_sessions", "staging"],
  ["fct_orders", "mart"],
  ["dim_customers", "mart"],
  ["fct_revenue", "mart"],
  ["fct_engagement", "mart"],
  ["revenue", "dashboard"],
  ["retention", "dashboard"],
  ["growth", "dashboard"],
];

const FEEDS: [string, string][] = [
  ["raw.orders", "stg_orders"],
  ["raw.payments", "stg_payments"],
  ["raw.customers", "stg_customers"],
  ["raw.events", "stg_sessions"],
  ["stg_orders", "fct_orders"],
  ["stg_payments", "fct_orders"],
  ["stg_customers", "dim_customers"],
  ["stg_orders", "dim_customers"],
  ["fct_orders", "fct_revenue"],
  ["stg_payments", "fct_revenue"],
  ["stg_sessions", "fct_engagement"],
  ["dim_customers", "fct_engagement"],
  ["fct_revenue", "revenue"],
  ["dim_customers", "retention"],
  ["fct_engagement", "retention"],
  ["fct_revenue", "growth"],
  ["fct_engagement", "growth"],
];

const LAYERS: Layer[] = ["source", "staging", "mart", "dashboard"];

/** Nodes reachable from `id` following the edges forward or backward */
const reach = (id: string, forward: boolean): number => {
  const seen = new Set([id]);
  const queue = [id];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [a, b] of FEEDS) {
      const [from, to] = forward ? [a, b] : [b, a];
      if (from === current && !seen.has(to)) {
        seen.add(to);
        queue.push(to);
      }
    }
  }
  return seen.size - 1;
};

export default function LineageDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [selected, setSelected] = useState<string[]>(["fct_orders"]);
  const nodes = useMemo(
    (): GraphNode[] =>
      TABLES.map(([id, layer]) => ({
        id,
        label: layer === "dashboard" ? t(`dashboards.${id}`) : id,
        group: layer,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] => FEEDS.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () => LAYERS.map((id) => ({ id, name: t(`layers.${id}`) })),
    [t],
  );
  const current = selected[0];
  const label = nodes.find((node) => node.id === current)?.label;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        selected={selected}
        highlight="lineage"
        height={420}
        ariaLabel={t("lineageAria")}
        onSelectionChange={setSelected}
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {current
          ? t("lineageSummary", {
              name: label,
              upstream: reach(current, false),
              downstream: reach(current, true),
            })
          : t("lineageHint")}
      </span>
    </div>
  );
}
