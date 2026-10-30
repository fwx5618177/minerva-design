import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  GraphChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Stage = "open" | "fulfilment" | "closed";

const STATES: [string, Stage][] = [
  ["cart", "open"],
  ["pending", "open"],
  ["paid", "fulfilment"],
  ["shipped", "fulfilment"],
  ["delivered", "closed"],
  ["refunded", "closed"],
  ["cancelled", "closed"],
];

// several events can join the same two states (parallel edges, either
// direction), and some events keep the state (self-loops)
const EVENTS: [string, string, string][] = [
  ["cart", "pending", "checkout"],
  ["pending", "cart", "edit"],
  ["pending", "paid", "pay"],
  ["pending", "pending", "retry"],
  ["pending", "cancelled", "timeout"],
  ["pending", "cancelled", "cancel"],
  ["paid", "pending", "reverse"],
  ["paid", "shipped", "ship"],
  ["paid", "refunded", "refund"],
  ["shipped", "shipped", "track"],
  ["shipped", "delivered", "deliver"],
  ["shipped", "paid", "bounce"],
  ["delivered", "refunded", "return"],
  ["delivered", "delivered", "review"],
];

const STAGES: Stage[] = ["open", "fulfilment", "closed"];

export default function TransitionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const [filled, setFilled] = useState(true);
  const nodes = useMemo(
    (): GraphNode[] =>
      STATES.map(([id, stage]) => ({
        id,
        label: t(`states.${id}`),
        group: stage,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      EVENTS.map(([source, target, event]) => ({
        source,
        target,
        label: t(`events.${event}`),
      })),
    [t],
  );
  const groups = useMemo(
    () => STAGES.map((id) => ({ id, name: t(`stages.${id}`) })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={filled} onChange={setFilled} label={t("filledArrows")} />
      <GraphChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        height={460}
        nodeSize={22}
        arrows
        arrowStyle={filled ? "filled" : "open"}
        edgeWidth={1.5}
        edgeLabels
        force={{ linkDistance: 110, charge: -900, seed: 3 }}
        ariaLabel={t("transitionsAria")}
      />
    </div>
  );
}
