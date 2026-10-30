import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  GraphChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Domain = "edge" | "commerce" | "identity" | "data";

const SERVICES: [string, Domain][] = [
  ["gateway", "edge"],
  ["web-bff", "edge"],
  ["mobile-bff", "edge"],
  ["cdn-purge", "edge"],
  ["catalog", "commerce"],
  ["cart", "commerce"],
  ["checkout", "commerce"],
  ["pricing", "commerce"],
  ["inventory", "commerce"],
  ["shipping", "commerce"],
  ["auth", "identity"],
  ["users", "identity"],
  ["sessions", "identity"],
  ["permissions", "identity"],
  ["search", "data"],
  ["recommend", "data"],
  ["events", "data"],
  ["analytics", "data"],
  ["billing", "commerce"],
  ["notify", "data"],
];

// calls per minute between services (thousands)
const CALLS: [string, string, number][] = [
  ["gateway", "web-bff", 42],
  ["gateway", "mobile-bff", 31],
  ["gateway", "auth", 55],
  ["web-bff", "catalog", 24],
  ["web-bff", "cart", 12],
  ["web-bff", "search", 18],
  ["web-bff", "recommend", 9],
  ["mobile-bff", "catalog", 16],
  ["mobile-bff", "cart", 8],
  ["mobile-bff", "users", 6],
  ["cart", "pricing", 14],
  ["cart", "inventory", 9],
  ["checkout", "cart", 5],
  ["checkout", "billing", 4],
  ["checkout", "shipping", 3],
  ["checkout", "notify", 3],
  ["catalog", "pricing", 20],
  ["catalog", "inventory", 11],
  ["catalog", "cdn-purge", 1],
  ["auth", "users", 22],
  ["auth", "sessions", 38],
  ["auth", "permissions", 19],
  ["search", "catalog", 7],
  ["recommend", "analytics", 4],
  ["recommend", "catalog", 6],
  ["events", "analytics", 26],
  ["checkout", "events", 3],
  ["cart", "events", 6],
  ["billing", "users", 2],
  ["billing", "notify", 2],
  ["shipping", "notify", 2],
  ["users", "events", 3],
];

const DOMAINS: Domain[] = ["edge", "commerce", "identity", "data"];

export default function CircularDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const [bundled, setBundled] = useState(true);
  const nodes = useMemo(
    (): GraphNode[] =>
      SERVICES.map(([id, domain]) => ({
        id,
        group: domain,
        value: CALLS.filter(([a, b]) => a === id || b === id).reduce(
          (sum, [, , v]) => sum + v,
          0,
        ),
      })),
    [],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      CALLS.map(([source, target, value]) => ({
        source,
        target,
        value,
        directed: true,
      })),
    [],
  );
  const groups = useMemo(
    () => DOMAINS.map((id) => ({ id, name: t(`domains.${id}`) })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={bundled}
        onChange={setBundled}
        label={t("bundleEdges")}
      />
      <GraphChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="circular"
        circular={{ tension: bundled ? 0.85 : 0 }}
        edgeColor="source"
        edgeWidth={[1, 6]}
        height={480}
        ariaLabel={t("circularAria")}
      />
    </div>
  );
}
