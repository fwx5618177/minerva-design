import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ConfigProvider, Switch } from "minerva-design";
import {
  GraphChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "account" | "flagged" | "device" | "card";
type Risk = "low" | "medium" | "high";

// accounts and the devices / cards they used; two rings share them
const FLAGGED = new Set(["2101", "2102", "2103", "2104", "2105", "3301"]);
const USES: [string, string][] = [
  // ring 1: five accounts on two phones, three of them on the same card
  ["2101", "d:9F3C"],
  ["2102", "d:9F3C"],
  ["2103", "d:9F3C"],
  ["2104", "d:51AE"],
  ["2105", "d:51AE"],
  ["2103", "d:51AE"],
  ["2101", "c:4417"],
  ["2102", "c:4417"],
  ["2104", "c:4417"],
  // ring 2: four accounts paying with one card
  ["3301", "c:0932"],
  ["3302", "c:0932"],
  ["3303", "c:0932"],
  ["3304", "c:0932"],
  ["3301", "d:C7D0"],
  ["3302", "d:C7D0"],
  // regular customers; a couple shares a tablet
  ["1001", "d:0A11"],
  ["1001", "c:1188"],
  ["1002", "d:0B22"],
  ["1002", "c:2290"],
  ["1003", "d:0C33"],
  ["1004", "d:0C33"],
  ["1003", "c:3315"],
  ["1004", "c:3342"],
  ["1005", "d:0D44"],
  ["1005", "c:5561"],
  ["1006", "d:0E55"],
  ["1006", "c:6604"],
  ["1007", "d:0F66"],
  ["1007", "c:7719"],
  ["1008", "d:1A77"],
  ["1008", "c:8823"],
];

const KINDS: Kind[] = ["account", "flagged", "device", "card"];
const KIND_COLORS: Partial<Record<Kind, string>> = {
  flagged: "var(--danger-color, #ef4444)",
};

const kindOf = (id: string): Kind =>
  id.startsWith("d:")
    ? "device"
    : id.startsWith("c:")
      ? "card"
      : FLAGGED.has(id)
        ? "flagged"
        : "account";

/** Every node connected to `id` (accounts, devices and cards of its cluster) */
const clusterOf = (id: string) => {
  const seen = new Set([id]);
  const queue = [id];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [a, b] of USES) {
      const next = a === current ? b : b === current ? a : null;
      if (next && !seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
  }
  return [...seen];
};

export default function FraudRingDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const [dark, setDark] = useState(true);
  const [cluster, setCluster] = useState<string[]>([]);

  const nodes = useMemo((): GraphNode[] => {
    const ids = [...new Set(USES.flat())];
    return ids.map((id): GraphNode => {
      const kind = kindOf(id);
      const code = id.slice(2);
      return {
        id,
        group: kind,
        shape: kind === "device" || kind === "card" ? "box" : "circle",
        label:
          kind === "device"
            ? t("deviceLabel", { id: code })
            : kind === "card"
              ? t("cardLabel", { last4: code })
              : t("accountLabel", { id }),
      };
    });
  }, [t]);
  const edges = useMemo(
    (): GraphEdge[] =>
      USES.map(([source, target]) => ({
        source,
        target,
        label: t(target.startsWith("d:") ? "loggedInFrom" : "paidWith"),
      })),
    [t],
  );
  const groups = useMemo(
    () =>
      KINDS.map((id) => ({
        id,
        name: t(`fraudKinds.${id}`),
        color: KIND_COLORS[id],
      })),
    [t],
  );

  const accounts = cluster.filter((id) => /^\d/.test(id)).length;
  const risk: Risk = accounts >= 4 ? "high" : accounts >= 2 ? "medium" : "low";

  return (
    <ConfigProvider theme={dark ? "dark" : "light"}>
      <div
        style={{
          display: "grid",
          gap: 12,
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid var(--border-color)",
          background: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <Switch checked={dark} onChange={setDark} label={t("darkTheme")} />
        <GraphChart
          // the chart reads the theme of its scope when it is created
          key={dark ? "dark" : "light"}
          nodes={nodes}
          edges={edges}
          groups={groups}
          selected={cluster}
          interaction={{ select: false }}
          nodeSize={16}
          edgeLabels="hover"
          force={{ linkDistance: 40, charge: -220, seed: 11 }}
          height={460}
          ariaLabel={t("fraudAria")}
          onItemClick={(event) => {
            if (event.type === "node") setCluster(clusterOf(event.id));
          }}
        />
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {cluster.length
            ? t("clusterReadout", {
                accounts,
                devices: cluster.filter((id) => id.startsWith("d:")).length,
                cards: cluster.filter((id) => id.startsWith("c:")).length,
                risk: t(`risk.${risk}`),
              })
            : t("fraudHint")}
        </output>
      </div>
    </ConfigProvider>
  );
}
