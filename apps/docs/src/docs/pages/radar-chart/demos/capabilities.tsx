import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, HStack } from "minerva-design";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Analyst ratings (1-5) of a product against a competitor and the market
const capabilities = [
  "security",
  "integrations",
  "reporting",
  "mobile",
  "automation",
  "support",
  "pricing",
];
const products = [
  { key: "ours", values: [4.5, 3.8, 4.2, 3.1, 4.6, 4.4, 3.5] },
  { key: "competitor", values: [3.9, 4.7, 3.6, 4.4, 3.2, 3.5, 3.9] },
  { key: "market", values: [3.5, 3.6, 3.4, 3.5, 3.3, 3.6, 3.7] },
];

export default function CapabilitiesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  // controlled visibility: the checkboxes and the legend share one state
  const [hidden, setHidden] = useState<number[]>([]);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      capabilities.map((key) => ({
        name: t(`capabilities.${key}`),
        min: 0,
        max: 5,
      })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] =>
      products.map(({ key, values }) => ({
        name: t(`products.${key}`),
        values,
        opacity: key === "market" ? 0.05 : 0.2,
      })),
    [t],
  );
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
  });
  const toggle = (index: number, visible: boolean) =>
    setHidden((current) =>
      visible ? current.filter((i) => i !== index) : [...current, index],
    );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} role="group" aria-label={t("compareWith")}>
        {series.map((item, index) => (
          <Checkbox
            key={item.name}
            label={item.name}
            checked={!hidden.includes(index)}
            onChange={(checked) => toggle(index, checked)}
          />
        ))}
      </HStack>
      <RadarChart
        indicators={indicators}
        series={series}
        hidden={hidden}
        onToggle={(event) => setHidden([...event.hiddenIndexes])}
        format={(value) => decimal.format(value)}
        height={380}
        ariaLabel={t("capabilitiesAria")}
      />
    </div>
  );
}
