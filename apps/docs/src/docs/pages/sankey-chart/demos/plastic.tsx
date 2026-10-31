import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Stage =
  | "pet"
  | "hdpe"
  | "pp"
  | "film"
  | "other"
  | "market"
  | "collected"
  | "incinerated"
  | "landfill"
  | "leaked"
  | "recycled"
  | "rejected"
  | "closedLoop"
  | "downcycled";

const STAGES: { key: Stage; color?: string }[] = [
  { key: "pet" },
  { key: "hdpe" },
  { key: "pp" },
  { key: "film" },
  { key: "other" },
  { key: "market", color: "var(--text-secondary-color)" },
  { key: "collected", color: "var(--chart-series-1)" },
  { key: "incinerated", color: "var(--warning-color)" },
  { key: "landfill", color: "var(--text-muted-color)" },
  { key: "leaked", color: "var(--danger-color)" },
  { key: "recycled", color: "var(--success-color)" },
  { key: "rejected", color: "var(--text-muted-color)" },
  { key: "closedLoop", color: "var(--success-color)" },
  { key: "downcycled", color: "var(--chart-series-3)" },
];

// Plastic packaging of a region over a year, in megatonnes
const FLOWS: [Stage, Stage, number][] = [
  ["pet", "market", 4.1],
  ["hdpe", "market", 2.6],
  ["pp", "market", 3.4],
  ["film", "market", 5.2],
  ["other", "market", 1.7],
  ["market", "collected", 6.8],
  ["market", "incinerated", 5.1],
  ["market", "landfill", 4.4],
  ["market", "leaked", 0.7],
  ["collected", "recycled", 4.6],
  ["collected", "rejected", 2.2],
  ["rejected", "incinerated", 2.2],
  ["recycled", "closedLoop", 1.3],
  ["recycled", "downcycled", 3.3],
];

const keys = STAGES.map((stage) => stage.key);

export default function PlasticDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const number = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => t("plastic.mt", { value: number.format(value) }),
    [number, t],
  );

  const nodes = useMemo(
    (): SankeyNode[] =>
      STAGES.map(({ key, color }) => ({
        name: t(`plastic.${key}`),
        ...(color ? { color } : {}),
      })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      FLOWS.map(([from, to, value]) => ({
        source: keys.indexOf(from),
        target: keys.indexOf(to),
        value,
      })),
    [],
  );

  // links: percent is the share of the source node; nodes: of all the
  // packaging entering the diagram
  const tooltip = (event: ShapeHoverEvent) => (
    <div style={{ display: "grid", gap: 2, maxWidth: 240 }}>
      <strong>
        {event.source && event.target
          ? `${event.source} → ${event.target}`
          : event.name}
      </strong>
      <span>{format(event.value)}</span>
      <span style={{ color: "var(--text-secondary-color)" }}>
        {event.source
          ? t("plastic.shareOfSource", {
              share: percent.format(event.percent),
              source: event.source,
            })
          : t("plastic.shareOfTotal", { share: percent.format(event.percent) })}
      </span>
    </div>
  );

  return (
    <SankeyChart
      nodes={nodes}
      links={links}
      format={format}
      renderTooltip={tooltip}
      linkColor="target"
      nodePadding={16}
      height={420}
      ariaLabel={t("plastic.aria")}
    />
  );
}
