import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Item =
  | "licenses"
  | "subscriptions"
  | "services"
  | "grants"
  | "budget"
  | "rnd"
  | "sales"
  | "operations"
  | "admin"
  | "platform"
  | "mobile"
  | "ai"
  | "campaigns"
  | "salesTeam"
  | "infrastructure"
  | "support"
  | "finance"
  | "offices";

// Yearly budget of a software company, in millions of dollars: where the
// money comes from, then how it is split between departments and programs
const ITEMS: { key: Item; color?: string }[] = [
  { key: "licenses" },
  { key: "subscriptions" },
  { key: "services" },
  { key: "grants" },
  { key: "budget", color: "#64748b" },
  { key: "rnd", color: "#6366f1" },
  { key: "sales", color: "#f59e0b" },
  { key: "operations", color: "#10b981" },
  { key: "admin", color: "#ec4899" },
  { key: "platform", color: "#818cf8" },
  { key: "mobile", color: "#818cf8" },
  { key: "ai", color: "#818cf8" },
  { key: "campaigns", color: "#fbbf24" },
  { key: "salesTeam", color: "#fbbf24" },
  { key: "infrastructure", color: "#34d399" },
  { key: "support", color: "#34d399" },
  { key: "finance", color: "#f472b6" },
  { key: "offices", color: "#f472b6" },
];

const ALLOCATIONS: [Item, Item, number][] = [
  ["licenses", "budget", 18.4],
  ["subscriptions", "budget", 42.6],
  ["services", "budget", 9.2],
  ["grants", "budget", 2.8],
  ["budget", "rnd", 29.5],
  ["budget", "sales", 21.3],
  ["budget", "operations", 13.7],
  ["budget", "admin", 8.5],
  ["rnd", "platform", 12.8],
  ["rnd", "mobile", 7.9],
  ["rnd", "ai", 8.8],
  ["sales", "campaigns", 9.6],
  ["sales", "salesTeam", 11.7],
  ["operations", "infrastructure", 8.1],
  ["operations", "support", 5.6],
  ["admin", "finance", 4.4],
  ["admin", "offices", 4.1],
];

const keys = ITEMS.map((item) => item.key);

export default function BudgetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const locale = i18n.language;

  const nodes = useMemo(
    (): SankeyNode[] =>
      ITEMS.map(({ key, color }) => ({
        name: t(`budget.${key}`),
        ...(color ? { color } : {}),
      })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      ALLOCATIONS.map(([from, to, value]) => ({
        source: keys.indexOf(from),
        target: keys.indexOf(to),
        value,
      })),
    [],
  );
  // millions of dollars, in the reader's number format
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => money.format(value * 1e6);
  }, [locale]);

  return (
    <SankeyChart
      nodes={nodes}
      links={links}
      format={format}
      linkColor="target"
      linkOpacity={0.35}
      nodeWidth={10}
      height={440}
      ariaLabel={t("budgetAria")}
    />
  );
}
