import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import {
  BarChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

// Day-ahead electricity price per hour of tomorrow, in euros per MWh: low at
// night, a morning and an evening peak, and a dip at noon when solar floods in
const prices = Array.from({ length: 24 }, (_, hour) => {
  const morning = 38 * Math.exp(-((hour - 8) ** 2) / 4);
  const evening = 62 * Math.exp(-((hour - 19) ** 2) / 5);
  const solar = -46 * Math.exp(-((hour - 13) ** 2) / 6);
  return (
    Math.round((72 + morning + evening + solar + 6 * Math.sin(hour)) * 10) / 10
  );
});
const sorted = [...prices].sort((a, b) => a - b);
const CHEAP = sorted[5] ?? 0; // the 6 cheapest hours
const PEAK = sorted[18] ?? 0; // the 6 most expensive hours
const AVERAGE = prices.reduce((sum, p) => sum + p, 0) / prices.length;
const POWER = 11; // kW, a home wallbox
const PLUG_IN = 18; // the car is plugged in when coming home

const windowCost = (start: number, hours: number) =>
  prices
    .slice(start, start + hours)
    .reduce((sum, price) => sum + (price / 1000) * POWER, 0);

export default function EvChargingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;
  const [hours, setHours] = useState(3);

  // the cheapest run of `hours` consecutive hours
  const best = useMemo(() => {
    let start = 0;
    for (let s = 1; s + hours <= prices.length; s++) {
      if (windowCost(s, hours) < windowCost(start, hours)) start = s;
    }
    return start;
  }, [hours]);

  const formats = useMemo(() => {
    const hour = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return {
      hour: (h: number) => hour.format(new Date(2026, 10, 1, h)),
      price: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
      cost: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
      }),
    };
  }, [locale]);

  // one series per price tier, stacked so that each hour shows a single bar
  const series = useMemo((): ChartSeries[] => {
    const tiers = [
      {
        name: t("offPeak"),
        color: "var(--success-color)",
        test: (p: number) => p <= CHEAP,
      },
      {
        name: t("standard"),
        color: "var(--primary-color)",
        test: (p: number) => p > CHEAP && p < PEAK,
      },
      {
        name: t("peak"),
        color: "var(--danger-color)",
        test: (p: number) => p >= PEAK,
      },
    ];
    return tiers.map((tier) => ({
      name: tier.name,
      color: tier.color,
      data: prices.map(
        (price, h) => [formats.hour(h), tier.test(price) ? price : 0] as const,
      ),
    }));
  }, [t, formats]);
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        // category axes place the bars at their index
        x0: best - 0.5,
        x1: best + hours - 0.5,
        color: "var(--success-color)",
        opacity: 0.12,
        label: t("chargeHere"),
        labelPosition: "top-left",
      },
      {
        type: "line",
        axis: "y",
        value: AVERAGE,
        dash: [4, 4],
        color: "var(--text-secondary-color)",
        label: t("dailyAverage"),
      },
    ],
    [t, best, hours],
  );

  const cost = windowCost(best, hours);
  const onArrival = windowCost(PLUG_IN, hours);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Select
          size="small"
          style={{ width: 200 }}
          aria-label={t("chargingTime")}
          value={String(hours)}
          onChange={(value) => setHours(Number(value))}
        >
          {[2, 3, 4, 5].map((h) => (
            <SelectItem key={h} value={String(h)}>
              {t("chargeFor", {
                energy: new Intl.NumberFormat(locale).format(h * POWER),
                duration: new Intl.NumberFormat(locale, {
                  style: "unit",
                  unit: "hour",
                  unitDisplay: "long",
                }).format(h),
              })}
            </SelectItem>
          ))}
        </Select>
        <output aria-live="polite">
          {t("chargeAdvice", {
            start: formats.hour(best),
            end: formats.hour((best + hours) % 24),
            cost: formats.cost.format(cost),
            saving: formats.cost.format(onArrival - cost),
            plugIn: formats.hour(PLUG_IN),
          })}
        </output>
      </div>
      <BarChart
        series={series}
        stacked
        annotations={annotations}
        tooltip={{ mode: "item" }}
        yAxis={{
          title: t("pricePerMwh"),
          format: (y) => formats.price.format(y),
        }}
        height={300}
        ariaLabel={t("pricesAria")}
      />
    </div>
  );
}
