import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BubbleChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Risk register of a data-center migration: likelihood and impact (1-5) and
// the cost exposure (k€) of each risk, by owning team
const risks = {
  infrastructure: [
    ["powerOutage", 1.9, 4.6, 420],
    ["hardwareDelay", 3.7, 3.2, 180],
    ["networkCutover", 3.1, 4.1, 260],
  ],
  security: [
    ["dataLeak", 1.6, 4.9, 650],
    ["accessReview", 3.9, 2.2, 45],
  ],
  people: [
    ["keyPerson", 2.6, 3.4, 120],
    ["vendorSkills", 4.2, 2.8, 90],
    ["trainingGap", 4.4, 1.6, 30],
  ],
  budget: [
    ["licenseCost", 3.4, 2.6, 140],
    ["exchangeRate", 2.2, 1.8, 60],
  ],
} as const;
type Team = keyof typeof risks;

export default function RiskMatrixDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const decimal = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
    [locale],
  );

  const series = useMemo(
    (): ChartSeries[] =>
      (Object.keys(risks) as Team[]).map((team) => ({
        name: t(`teams.${team}`),
        valueName: t("exposure"),
        format: euros,
        data: risks[team].map(([key, likelihood, impact, exposure]) => ({
          x: likelihood,
          y: impact,
          value: exposure,
          label: t(`risks.${key}`),
        })),
      })),
    [t, euros],
  );
  // green, amber and red zones of the classic 5 × 5 matrix
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        x1: 2.5,
        y1: 2.5,
        color: "var(--success-color)",
        opacity: 0.1,
        label: t("zones.low"),
        labelPosition: "bottom-left",
      },
      {
        type: "rect",
        x0: 3.5,
        y0: 3.5,
        color: "var(--danger-color)",
        opacity: 0.12,
        label: t("zones.high"),
        labelPosition: "top-right",
      },
    ],
    [t],
  );

  // bubbles are drawn largest first: read the hovered risk from the item
  // itself (label, x, y, value) rather than from its index
  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return null;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{item.label}</strong>
        <span>{item.seriesName}</span>
        <span>
          {t("riskScore", {
            likelihood: decimal.format(item.x),
            impact: decimal.format(item.y),
            score: decimal.format(item.x * item.y),
          })}
        </span>
        <span>{t("exposureRow", { value: euros(item.value ?? 0) })}</span>
      </div>
    );
  };

  return (
    <BubbleChart
      series={series}
      minSize={10}
      maxSize={60}
      annotations={annotations}
      xAxis={{ title: t("likelihood"), min: 1, max: 5, tickCount: 5 }}
      yAxis={{ title: t("impact"), min: 1, max: 5, tickCount: 5 }}
      renderTooltip={tooltip}
      height={380}
      ariaLabel={t("riskAria")}
    />
  );
}
