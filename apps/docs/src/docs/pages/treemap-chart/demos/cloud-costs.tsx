import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

// Cloud costs of one month (USD): services, then the resources (named as
// in the console) that make up each bill
const COSTS: [service: string, [string, number][]][] = [
  [
    "compute",
    [
      ["api-prod", 6200],
      ["workers", 3400],
      ["batch-jobs", 1800],
      ["staging", 900],
    ],
  ],
  [
    "databases",
    [
      ["analytics-warehouse", 4600],
      ["orders-db", 3800],
      ["session-cache", 650],
    ],
  ],
  [
    "storage",
    [
      ["media-bucket", 2100],
      ["backups", 1300],
      ["logs-archive", 700],
    ],
  ],
  [
    "network",
    [
      ["egress", 2400],
      ["cdn", 1250],
      ["nat-gateway", 420],
    ],
  ],
  [
    "observability",
    [
      ["logs", 1640],
      ["metrics", 1150],
      ["traces", 820],
    ],
  ],
];
const totals = COSTS.map(([, resources]) =>
  resources.reduce((sum, [, cost]) => sum + cost, 0),
);
const TOTAL = totals.reduce((sum, cost) => sum + cost, 0);

const legend = { position: "top" } as const;

export default function CloudCostsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  // controlled: the legend proposes, this state decides
  const [hidden, setHidden] = useState<number[]>([]);

  const data = useMemo(
    (): TreemapNode[] =>
      COSTS.map(([service, resources]) => ({
        name: t(`cloud.services.${service}`),
        children: resources.map(([name, value]) => ({ name, value })),
      })),
    [t],
  );
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return (value: number) => money.format(value);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const visible = totals.reduce(
    (sum, cost, i) => (hidden.includes(i) ? sum : sum + cost),
    0,
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TreemapChart
        data={data}
        legend={legend}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        format={format}
        renderTooltip={(cell) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{(cell.path ?? [cell.name]).join(" › ")}</strong>
            <span>{format(cell.value)}</span>
            <span>
              {t("cloud.ofBill", { share: percent.format(cell.value / TOTAL) })}
            </span>
          </div>
        )}
        height={400}
        ariaLabel={t("cloud.aria")}
      />
      <HStack gap={8} wrap align="center">
        <output aria-live="polite">
          {hidden.length
            ? t("cloud.filtered", {
                visible: format(visible),
                share: percent.format(visible / TOTAL),
                total: format(TOTAL),
              })
            : t("cloud.total", { total: format(TOTAL) })}
        </output>
        <Button
          size="small"
          variant="ghost"
          disabled={hidden.length === 0}
          onClick={() => setHidden([])}
        >
          {t("cloud.showAll")}
        </Button>
      </HStack>
    </div>
  );
}
