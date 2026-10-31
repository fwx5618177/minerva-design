import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  HorizontalBarChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Yearly base salary band of each job level, in dollars
const bands = [
  { key: "junior", min: 70000, max: 95000 },
  { key: "intermediate", min: 88000, max: 120000 },
  { key: "senior", min: 115000, max: 155000 },
  { key: "staff", min: 145000, max: 190000 },
  { key: "principal", min: 175000, max: 230000 },
  { key: "director", min: 190000, max: 260000 },
] as const;
const STEP = 5000;
const LOWEST = 60000;
const HIGHEST = 270000;

export default function SalaryBandsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const [offer, setOffer] = useState(150000);

  const formats = useMemo(
    () => ({
      usd: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
      compact: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
      list: new Intl.ListFormat(locale, { type: "conjunction" }),
    }),
    [locale],
  );

  const fits = useMemo(
    () => bands.filter((band) => offer >= band.min && offer <= band.max),
    [offer],
  );
  // floating bars: y0 is the bottom of the band and y its top; the bands the
  // offer falls into are highlighted through their datum color
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("salaryBand"),
        data: bands.map((band) => ({
          x: t(`levels.${band.key}`),
          y0: band.min,
          y: band.max,
          color: fits.includes(band)
            ? "var(--success-color)"
            : "var(--border-strong-color)",
        })),
      },
    ],
    [t, fits],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "y",
        value: offer,
        width: 2,
        color: "var(--primary-color)",
        label: t("offer"),
      },
    ],
    [t, offer],
  );

  const renderTooltip = (event: ChartHoverEvent) => {
    const band = bands[event.items[0]?.index ?? -1];
    if (!band) return null;
    const mid = (band.min + band.max) / 2;
    const rows = [
      [t("bandMin"), band.min],
      [t("bandMid"), mid],
      [t("bandMax"), band.max],
    ] as const;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2px 16px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{event.xLabel}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>
              {formats.usd.format(value)}
            </span>
          </span>
        ))}
        <span>{t("compaRatio")}</span>
        <strong style={{ textAlign: "end" }}>
          {formats.percent.format(offer / mid)}
        </strong>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Button
          size="small"
          variant="outline"
          disabled={offer <= LOWEST}
          onClick={() => setOffer((value) => value - STEP)}
        >
          {t("offerDown", { step: formats.compact.format(STEP) })}
        </Button>
        <Button
          size="small"
          variant="outline"
          disabled={offer >= HIGHEST}
          onClick={() => setOffer((value) => value + STEP)}
        >
          {t("offerUp", { step: formats.compact.format(STEP) })}
        </Button>
        <output aria-live="polite">
          {fits.length > 0
            ? t("offerFits", {
                offer: formats.usd.format(offer),
                levels: formats.list.format(
                  fits.map((band) => t(`levels.${band.key}`)),
                ),
              })
            : t("offerOutside", { offer: formats.usd.format(offer) })}
        </output>
      </div>
      <HorizontalBarChart
        series={series}
        annotations={annotations}
        renderTooltip={renderTooltip}
        legend={false}
        yAxis={{
          zero: false,
          min: 50000,
          max: 280000,
          format: (y) => formats.compact.format(y),
        }}
        height={300}
        ariaLabel={t("salaryAria")}
      />
    </div>
  );
}
