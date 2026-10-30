import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Key =
  | "solar"
  | "wind"
  | "hydro"
  | "nuclear"
  | "gas"
  | "coal"
  | "oil"
  | "electricity"
  | "heat"
  | "fuels"
  | "homes"
  | "industry"
  | "services"
  | "transport"
  | "losses";

// A national energy balance, in TWh per year (rounded): primary sources,
// carriers, then end uses. Every carrier gives out what it receives.
const NODES: { key: Key; color: string }[] = [
  { key: "solar", color: "#f59e0b" },
  { key: "wind", color: "#38bdf8" },
  { key: "hydro", color: "#0284c7" },
  { key: "nuclear", color: "#a855f7" },
  { key: "gas", color: "#f97316" },
  { key: "coal", color: "#64748b" },
  { key: "oil", color: "#92400e" },
  { key: "electricity", color: "#eab308" },
  { key: "heat", color: "#ef4444" },
  { key: "fuels", color: "#b45309" },
  { key: "homes", color: "#10b981" },
  { key: "industry", color: "#6366f1" },
  { key: "services", color: "#14b8a6" },
  { key: "transport", color: "#ec4899" },
  { key: "losses", color: "#94a3b8" },
];

const FLOWS: [Key, Key, number][] = [
  ["solar", "electricity", 62],
  ["wind", "electricity", 138],
  ["hydro", "electricity", 54],
  ["nuclear", "electricity", 182],
  ["gas", "electricity", 96],
  ["coal", "electricity", 48],
  ["gas", "heat", 58],
  ["gas", "homes", 142],
  ["gas", "industry", 104],
  ["coal", "industry", 36],
  ["oil", "fuels", 420],
  ["electricity", "homes", 168],
  ["electricity", "industry", 152],
  ["electricity", "services", 124],
  ["electricity", "transport", 22],
  ["electricity", "losses", 114],
  ["heat", "homes", 36],
  ["heat", "services", 22],
  ["fuels", "transport", 348],
  ["fuels", "industry", 42],
  ["fuels", "losses", 30],
];

const index = (key: Key) => NODES.findIndex((n) => n.key === key);

export default function EnergyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const locale = i18n.language;

  // translated names; the links refer to the nodes by index
  const nodes = useMemo(
    (): SankeyNode[] =>
      NODES.map(({ key, color }) => ({ name: t(`energy.${key}`), color })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      FLOWS.map(([source, target, value]) => ({
        source: index(source),
        target: index(target),
        value,
      })),
    [],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    return (value: number) => t("twh", { value: number.format(value) });
  }, [locale, t]);

  return (
    <SankeyChart
      nodes={nodes}
      links={links}
      format={format}
      height={420}
      ariaLabel={t("energyAria")}
    />
  );
}
