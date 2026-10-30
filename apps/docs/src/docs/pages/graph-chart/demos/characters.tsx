import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GraphChart, type GraphHoverEvent } from "minerva-design/charts";
import { characterGraph } from "../data";

export default function CharactersDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const data = useMemo(() => characterGraph(t), [t]);
  const [selected, setSelected] = useState<string[]>([]);
  const [hovered, setHovered] = useState<GraphHoverEvent | null>(null);

  const name = (id: string) =>
    data.nodes.find((node) => node.id === id)?.label ?? id;
  const status = hovered?.edge
    ? t("relationHint", {
        source: name(hovered.edge.source),
        target: name(hovered.edge.target),
        relation: hovered.edge.label,
      })
    : selected.length
      ? t("selectedHint", { name: selected.map(name).join(t("separator")) })
      : t("charactersHint");

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <GraphChart
        nodes={data.nodes}
        edges={data.edges}
        groups={data.groups}
        height={520}
        nodeSize={[10, 34]}
        edgeColor="source"
        force={{ linkDistance: 80, charge: -420 }}
        ariaLabel={t("charactersAria")}
        onSelectionChange={setSelected}
        onHover={setHovered}
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {status}
      </span>
    </div>
  );
}
