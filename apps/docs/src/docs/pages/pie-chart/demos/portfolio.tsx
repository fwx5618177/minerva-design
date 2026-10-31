import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Tag } from "minerva-design";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

// Investment portfolio by asset class, market value in US dollars
const HOLDINGS = [
  { key: "usEquities", value: 182_400 },
  { key: "intlEquities", value: 96_300 },
  { key: "bonds", value: 121_500 },
  { key: "realEstate", value: 48_200 },
  { key: "commodities", value: 21_700 },
  { key: "cash", value: 30_900 },
];
const TOTAL = HOLDINGS.reduce((sum, holding) => sum + holding.value, 0);

export default function PortfolioDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  // controlled visibility: the filter chips and the legend share one state
  const [hidden, setHidden] = useState<number[]>([]);

  const data = useMemo(
    (): ShapeDatum[] =>
      HOLDINGS.map(({ key, value }) => ({
        name: t(`portfolio.assets.${key}`),
        value,
      })),
    [t],
  );
  const format = useMemo(() => {
    const currency = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => currency.format(value);
  }, [locale]);
  const percentFormat = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (share: number) => percent.format(share);
  }, [locale]);

  const visible = HOLDINGS.reduce(
    (sum, holding, i) => (hidden.includes(i) ? sum : sum + holding.value),
    0,
  );
  const toggle = (index: number) =>
    setHidden((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index].sort((a, b) => a - b),
    );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap align="center">
        <HStack gap={8} wrap role="group" aria-label={t("portfolio.filter")}>
          {data.map((slice, index) => (
            <Tag
              key={slice.name}
              clickable
              pressed={!hidden.includes(index)}
              onClick={() => toggle(index)}
            >
              {slice.name}
            </Tag>
          ))}
        </HStack>
        <Button
          size="small"
          variant="ghost"
          disabled={hidden.length === 0}
          onClick={() => setHidden([])}
        >
          {t("portfolio.showAll")}
        </Button>
      </HStack>
      <DonutChart
        data={data}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        format={format}
        percentFormat={percentFormat}
        centerValue={format(visible)}
        centerLabel={
          hidden.length ? t("portfolio.selection") : t("portfolio.total")
        }
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>{format(slice.value)}</span>
            <span>
              {t("portfolio.ofPortfolio", {
                share: percentFormat(slice.value / TOTAL),
              })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("portfolio.aria")}
      />
      <output aria-live="polite">
        {t("portfolio.summary", {
          shown: HOLDINGS.length - hidden.length,
          total: HOLDINGS.length,
          value: format(visible),
          share: percentFormat(visible / TOTAL),
        })}
      </output>
    </div>
  );
}
