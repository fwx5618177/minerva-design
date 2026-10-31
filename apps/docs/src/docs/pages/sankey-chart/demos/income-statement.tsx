import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Line =
  | "cloud"
  | "licenses"
  | "hardware"
  | "services"
  | "revenue"
  | "cogs"
  | "gross"
  | "rnd"
  | "sales"
  | "admin"
  | "operating"
  | "tax"
  | "net";

const PROFIT = "var(--success-color)";
const COST = "var(--danger-color)";

// Quarterly income statement, in millions of dollars
const LINES: { key: Line; color?: string }[] = [
  { key: "cloud", color: "var(--chart-series-1)" },
  { key: "licenses", color: "var(--chart-series-2)" },
  { key: "hardware", color: "var(--chart-series-3)" },
  { key: "services", color: "var(--chart-series-4)" },
  { key: "revenue", color: "var(--text-secondary-color)" },
  { key: "cogs", color: COST },
  { key: "gross", color: PROFIT },
  { key: "rnd", color: COST },
  { key: "sales", color: COST },
  { key: "admin", color: COST },
  { key: "operating", color: PROFIT },
  { key: "tax", color: COST },
  { key: "net", color: PROFIT },
];

const SEGMENTS: [Line, number][] = [
  ["cloud", 412],
  ["licenses", 186],
  ["hardware", 94],
  ["services", 58],
];
const COGS = 268;
const OPEX: [Line, number][] = [
  ["rnd", 141],
  ["sales", 98],
  ["admin", 47],
];
const TAX_RATE = 0.21;

const keys = LINES.map((line) => line.key);

function statement() {
  const revenue = SEGMENTS.reduce((sum, [, value]) => sum + value, 0);
  const gross = revenue - COGS;
  const operating = gross - OPEX.reduce((sum, [, value]) => sum + value, 0);
  const tax = Math.round(operating * TAX_RATE);
  const flows: [Line, Line, number, "profit" | "cost" | "in"][] = [
    ...SEGMENTS.map(
      ([key, value]) =>
        [key, "revenue", value, "in"] as [Line, Line, number, "in"],
    ),
    ["revenue", "cogs", COGS, "cost"],
    ["revenue", "gross", gross, "profit"],
    ...OPEX.map(
      ([key, value]) =>
        ["gross", key, value, "cost"] as [Line, Line, number, "cost"],
    ),
    ["gross", "operating", operating, "profit"],
    ["operating", "tax", tax, "cost"],
    ["operating", "net", operating - tax, "profit"],
  ];
  return { revenue, gross, operating, net: operating - tax, flows };
}
const STATEMENT = statement();

export default function IncomeStatementDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const locale = i18n.language;
  const { revenue, gross, operating, net, flows } = STATEMENT;

  const nodes = useMemo(
    (): SankeyNode[] =>
      LINES.map(({ key, color }) => ({ name: t(`pnl.${key}`), color })),
    [t],
  );
  // profits are green and costs red; revenue streams keep their own color
  const links = useMemo(
    (): SankeyLink[] =>
      flows.map(([from, to, value, kind]) => ({
        source: keys.indexOf(from),
        target: keys.indexOf(to),
        value,
        ...(kind === "profit" ? { color: PROFIT } : {}),
        ...(kind === "cost" ? { color: COST } : {}),
      })),
    [flows],
  );
  const money = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const format = useMemo(
    () => (value: number) => money.format(value * 1e6),
    [money],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <SankeyChart
        nodes={nodes}
        links={links}
        format={format}
        linkColor="source"
        linkOpacity={0.4}
        nodeWidth={14}
        height={420}
        ariaLabel={t("pnl.aria")}
      />
      <p
        style={{
          margin: 0,
          color: "var(--text-secondary-color)",
          fontSize: 14,
        }}
      >
        {t("pnl.margins", {
          gross: percent.format(gross / revenue),
          operating: percent.format(operating / revenue),
          net: percent.format(net / revenue),
        })}
      </p>
    </div>
  );
}
