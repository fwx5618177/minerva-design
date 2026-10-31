import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  MixedChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

const HOUR = 60 * 60 * 1000;
const START = new Date(2026, 5, 20).getTime(); // local midnight
const HOURS = 48;
const CAPACITY = 10; // kWh of the home battery
const MAX_RATE = 4; // kW of charge or discharge
const SUNRISE = 5.5;
const SUNSET = 21.5;

// A house with 6 kWp of solar panels over two days, the second one cloudy:
// production and consumption in kWh per hour
const hours = Array.from({ length: HOURS }, (_, i) => {
  const hour = i % 24;
  const day = Math.floor(i / 24);
  const sun = Math.max(
    0,
    Math.sin(((hour - SUNRISE) / (SUNSET - SUNRISE)) * Math.PI),
  );
  const clouds = day === 1 ? 0.4 + 0.15 * Math.sin(i * 1.7) : 1;
  const solar = 5.2 * sun ** 1.3 * clouds;
  // base load, breakfast, cooking and evening peaks
  const load =
    0.35 +
    0.9 * Math.exp(-((hour - 7.5) ** 2) / 1.5) +
    1.6 * Math.exp(-((hour - 19) ** 2) / 3) +
    0.5 * Math.exp(-((hour - 12.5) ** 2) / 2);
  return { time: START + i * HOUR, solar, load };
});

// state of charge hour by hour: surplus charges the battery, deficit drains it
const simulate = (battery: boolean) => {
  let charge = CAPACITY * 0.3;
  let imported = 0;
  const soc = hours.map((h) => {
    const balance = h.solar - h.load;
    if (!battery) {
      imported += Math.max(0, -balance);
      return 0;
    }
    if (balance > 0) {
      charge += Math.min(balance, MAX_RATE, CAPACITY - charge);
    } else {
      const drawn = Math.min(-balance, MAX_RATE, charge);
      charge -= drawn;
      imported += -balance - drawn;
    }
    return (charge / CAPACITY) * 100;
  });
  return { soc, imported };
};
const consumed = hours.reduce((sum, h) => sum + h.load, 0);

export default function SolarBatteryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const [battery, setBattery] = useState(true);

  const result = useMemo(() => simulate(battery), [battery]);
  const formats = useMemo(() => {
    const kwh = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return {
      kwh: (value: number) => t("kwh", { value: kwh.format(value) }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
    };
  }, [locale, t]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("solarProduction"),
        type: "bar",
        color: "var(--warning-color)",
        format: formats.kwh,
        data: hours.map((h) => [h.time, h.solar] as const),
      },
      {
        name: t("consumption"),
        type: "line",
        color: "var(--text-color, #1f2937)",
        format: formats.kwh,
        data: hours.map((h) => [h.time, h.load] as const),
      },
      {
        name: t("batteryCharge"),
        type: "area",
        yAxis: "right",
        color: "var(--success-color)",
        opacity: 0.15,
        // without a battery the series stays in the legend, greyed out
        hidden: !battery,
        format: (y) => formats.percent.format(y / 100),
        data: hours.map((h, i) => [h.time, result.soc[i] ?? 0] as const),
      },
    ],
    [t, formats, battery, result],
  );
  // the nights, from sunset to the next sunrise, cut to the data range
  const annotations = useMemo((): ChartAnnotation[] => {
    const first = START - HOUR / 2;
    const last = START + (HOURS - 0.5) * HOUR;
    return [-1, 0, 1].map((day) => ({
      type: "rect" as const,
      x0: Math.max(first, START + (day * 24 + SUNSET) * HOUR),
      x1: Math.min(last, START + ((day + 1) * 24 + SUNRISE) * HOUR),
      color: "var(--text-secondary-color)",
      opacity: 0.08,
      ...(day === 0 ? { label: t("night") } : {}),
    }));
  }, [t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Switch
          checked={battery}
          onChange={setBattery}
          label={t("withBattery", { value: formats.kwh(CAPACITY) })}
        />
        <output aria-live="polite">
          {t("selfSufficiency", {
            share: formats.percent.format(1 - result.imported / consumed),
            imported: formats.kwh(result.imported),
          })}
        </output>
      </div>
      <MixedChart
        series={series}
        annotations={annotations}
        tooltip={{ mode: "axis" }}
        xAxis={{ type: "time" }}
        yAxis={{ title: t("energyPerHour"), format: formats.kwh }}
        yAxis2={{
          title: t("batteryCharge"),
          min: 0,
          max: 100,
          nice: false,
          format: (y) => formats.percent.format(y / 100),
        }}
        locale={locale}
        height={340}
        ariaLabel={t("solarAria")}
      />
    </div>
  );
}
