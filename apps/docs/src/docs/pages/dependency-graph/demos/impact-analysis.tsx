import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Select, SelectItem } from "minerva-design";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Status = "success" | "failed" | "blocked";

// nightly ETL run: extract → transform → load → publish
const TASKS = [
  "extract_orders",
  "extract_users",
  "extract_clicks",
  "validate_orders",
  "clean_users",
  "sessionize",
  "join_orders_users",
  "daily_revenue",
  "user_features",
  "churn_model",
  "load_warehouse",
  "refresh_dashboard",
  "email_report",
  "export_crm",
];

const UPSTREAM: [string, string][] = [
  ["extract_orders", "validate_orders"],
  ["extract_users", "clean_users"],
  ["extract_clicks", "sessionize"],
  ["validate_orders", "join_orders_users"],
  ["clean_users", "join_orders_users"],
  ["join_orders_users", "daily_revenue"],
  ["join_orders_users", "user_features"],
  ["sessionize", "user_features"],
  ["user_features", "churn_model"],
  ["daily_revenue", "load_warehouse"],
  ["user_features", "load_warehouse"],
  ["load_warehouse", "refresh_dashboard"],
  ["daily_revenue", "email_report"],
  ["churn_model", "export_crm"],
  ["clean_users", "export_crm"],
];

const STATUSES: Status[] = ["success", "failed", "blocked"];
const COLORS: Record<Status, string> = {
  success: "var(--success-color, #16a34a)",
  failed: "var(--danger-color, #dc2626)",
  blocked: "var(--warning-color, #d97706)",
};
const SINKS = TASKS.filter((id) => !UPSTREAM.some(([a]) => a === id));

/** Every task downstream of `id` */
const downstream = (id: string) => {
  const seen = new Set<string>();
  const queue = [id];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [a, b] of UPSTREAM) {
      if (a === current && !seen.has(b)) {
        seen.add(b);
        queue.push(b);
      }
    }
  }
  return seen;
};

export default function ImpactAnalysisDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [failed, setFailed] = useState("clean_users");
  const blocked = useMemo(() => downstream(failed), [failed]);

  const nodes = useMemo(
    (): GraphNode[] =>
      TASKS.map((id) => {
        const status: Status =
          id === failed ? "failed" : blocked.has(id) ? "blocked" : "success";
        return {
          id,
          label: id,
          group: status,
          subtitle: t(`runStatuses.${status}`),
        };
      }),
    [t, failed, blocked],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      UPSTREAM.map(([source, target]) => ({
        source,
        target,
        dashed: blocked.has(target),
      })),
    [blocked],
  );
  const groups = useMemo(
    () =>
      STATUSES.map((id) => ({
        id,
        name: t(`runStatuses.${id}`),
        color: COLORS[id],
      })),
    [t],
  );
  const sinks = SINKS.filter((id) => blocked.has(id));
  const list = new Intl.ListFormat(i18n.language);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} align="center">
        <span>{t("failingTask")}</span>
        <Select
          aria-label={t("failingTask")}
          size="small"
          value={failed}
          onChange={setFailed}
        >
          {TASKS.map((id) => (
            <SelectItem key={id} value={id}>
              {id}
            </SelectItem>
          ))}
        </Select>
      </HStack>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        highlight="lineage"
        selected={[failed]}
        interaction={{ select: false }}
        height={440}
        ariaLabel={t("impactAria")}
        onItemClick={(event) => {
          if (event.type === "node" && event.id) setFailed(event.id);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {sinks.length
          ? t("impactSummary", {
              task: failed,
              blocked: blocked.size,
              total: TASKS.length,
              sinks: list.format(sinks),
            })
          : t("impactNone", { task: failed })}
      </output>
    </div>
  );
}
