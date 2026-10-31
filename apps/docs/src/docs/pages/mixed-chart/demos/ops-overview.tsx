import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "minerva-design";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SLOT = 30 * 60 * 1000;
const START = new Date(2026, 9, 29).getTime(); // local midnight
const SLOTS = 48;
// releases of the day (slot index and version); the first one was rolled back
const DEPLOYS = [
  { slot: 20, version: "v2.14.0" },
  { slot: 22, version: "v2.13.2" },
  { slot: 31, version: "v2.14.1" },
];

// Requests (thousands per half hour) and share of 5xx answers of a web API
const random = mulberry32(503);
const slots = Array.from({ length: SLOTS }, (_, i) => {
  const hour = i / 2;
  const daily = Math.max(0, Math.sin(((hour - 6) / 24) * 2 * Math.PI));
  const requests = 40 + 260 * daily + random() * 25;
  // the faulty release (slots 20 and 21) makes the error rate jump
  const incident = i === 20 ? 0.048 : i === 21 ? 0.031 : 0;
  const errors = 0.002 + random() * 0.0015 + incident;
  return { time: START + i * SLOT, requests, errors };
});

type SeriesKey = "requests" | "errors" | "deploys";

export default function OpsOverviewDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const [visible, setVisible] = useState<Record<SeriesKey, boolean>>({
    requests: true,
    errors: true,
    deploys: true,
  });

  const formats = useMemo(
    () => ({
      requests: new Intl.NumberFormat(locale, { notation: "compact" }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
      time: new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }),
    [locale],
  );

  const series = useMemo((): ChartSeries[] => {
    const requests = (y: number) => formats.requests.format(y * 1000);
    const percent = (y: number) => formats.percent.format(y);
    return [
      {
        id: "requests",
        name: t("requests"),
        type: "bar",
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.6,
        hidden: !visible.requests,
        format: requests,
        data: slots.map((s) => [s.time, s.requests] as const),
      },
      {
        id: "errors",
        name: t("errorRate"),
        type: "line",
        yAxis: "right",
        color: "var(--danger-color)",
        lineWidth: 2,
        hidden: !visible.errors,
        format: percent,
        data: slots.map((s) => [s.time, s.errors] as const),
      },
      {
        // one dot per release on the error rate, its version written next to it
        id: "deploys",
        name: t("releases"),
        type: "scatter",
        yAxis: "right",
        color: "var(--text-color, #1f2937)",
        pointSize: 9,
        showLabels: true,
        hidden: !visible.deploys,
        format: percent,
        data: DEPLOYS.map((d) => ({
          x: slots[d.slot]?.time ?? START,
          y: slots[d.slot]?.errors ?? 0,
          label: d.version,
        })),
      },
    ];
  }, [t, formats, visible]);

  const peak = slots.reduce((max, s) => (s.errors > max.errors ? s : max));
  const toggle = (key: SeriesKey) => (checked: boolean) =>
    setVisible((current) => ({ ...current, [key]: checked }));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <Checkbox
          checked={visible.requests}
          onChange={toggle("requests")}
          label={t("requests")}
        />
        <Checkbox
          checked={visible.errors}
          onChange={toggle("errors")}
          label={t("errorRate")}
        />
        <Checkbox
          checked={visible.deploys}
          onChange={toggle("deploys")}
          label={t("releases")}
        />
      </div>
      <MixedChart
        series={series}
        legend={false}
        tooltip={{ mode: "axis" }}
        xAxis={{ type: "time", format: (x) => formats.time.format(x) }}
        yAxis={{
          title: t("requestsPerHalfHour"),
          format: (y) => formats.requests.format(y * 1000),
        }}
        yAxis2={{
          title: t("errorRate"),
          min: 0,
          format: (y) => formats.percent.format(y),
        }}
        height={320}
        ariaLabel={t("opsAria")}
      />
      <p style={{ margin: 0, color: "var(--text-secondary-color)" }}>
        {t("incidentSummary", {
          peak: formats.percent.format(peak.errors),
          time: formats.time.format(peak.time),
          version: DEPLOYS[0]?.version ?? "",
          rollback: DEPLOYS[1]?.version ?? "",
        })}
      </p>
    </div>
  );
}
