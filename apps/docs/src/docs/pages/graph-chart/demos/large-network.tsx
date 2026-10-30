import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GraphChart, type GraphNode } from "minerva-design/charts";
import { communityGraph } from "../data";

// 40 communities of 250 people: 10,000 nodes and about 20,000 links
const NETWORK = communityGraph(40, 250);

export default function LargeNetworkDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const [renderer, setRenderer] = useState<string>("…");
  const [done, setDone] = useState(false);
  const [started] = useState(() => performance.now());
  const [seconds, setSeconds] = useState(0);

  const nodes = useMemo(
    (): GraphNode[] =>
      NETWORK.nodes.map((node) => ({
        ...node,
        label: t("member", { id: node.id }),
      })),
    [t],
  );
  const groups = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: `c${i}`,
        name: t("community", { n: i + 1 }),
      })),
    [t],
  );
  const format = new Intl.NumberFormat(i18n.language);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <GraphChart
        nodes={nodes}
        edges={NETWORK.edges}
        groups={groups}
        height={540}
        nodeSize={6}
        edgeWidth={0.6}
        legend={false}
        force={{ linkDistance: 14, charge: -40, gravity: 0.06, worker: "auto" }}
        ariaLabel={t("largeAria")}
        onRendererChange={setRenderer}
        onLayoutEnd={() => {
          setDone(true);
          setSeconds((performance.now() - started) / 1000);
        }}
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {t("largeStatus", {
          nodes: format.format(NETWORK.nodes.length),
          edges: format.format(NETWORK.edges.length),
          renderer,
        })}{" "}
        {done
          ? t("largeDone", {
              seconds: new Intl.NumberFormat(i18n.language, {
                maximumFractionDigits: 1,
              }).format(seconds),
            })
          : t("largeRunning")}
      </span>
    </div>
  );
}
