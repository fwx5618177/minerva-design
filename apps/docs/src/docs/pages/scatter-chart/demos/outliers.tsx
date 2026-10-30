import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Expected response time (ms) for a payload size (KB)
const expected = (size: number) => 40 + size * 0.6;
const TOLERANCE = 2; // slower than 2× the expected time = outlier

const random = mulberry32(17);
const requests = Array.from({ length: 300 }, (_, i) => {
  const size = Math.round(5 + random() * 495);
  const slow = i % 37 === 0 ? 2.4 + random() * 2 : 1;
  const time = expected(size) * (0.75 + random() * 0.5) * slow;
  return { size, time: Math.round(time) };
});
const isOutlier = ({ size, time }: { size: number; time: number }) =>
  time > expected(size) * TOLERANCE;
const outlierCount = requests.filter(isOutlier).length;

export default function OutliersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("requests"),
        // outliers are bigger and red
        data: requests.map((request) =>
          isOutlier(request)
            ? {
                x: request.size,
                y: request.time,
                color: "var(--danger-color)",
                size: 11,
                label: t("outlier"),
              }
            : { x: request.size, y: request.time },
        ),
        opacity: 0.6,
        pointSize: 6,
      },
      {
        name: t("expected"),
        type: "line",
        lineWidth: 1.5,
        color: "var(--text-secondary-color)",
        data: [
          [0, expected(0)],
          [500, expected(500)],
        ],
      },
    ],
    [t],
  );
  const kb = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "kilobyte" }),
    [locale],
  );
  const ms = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millisecond" }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ScatterChart
        series={series}
        xAxis={{ title: t("payload"), format: (value) => kb.format(value) }}
        yAxis={{
          title: t("responseTime"),
          format: (value) => ms.format(value),
        }}
        height={320}
        ariaLabel={t("outliersAria")}
      />
      <p>
        {t("outliersSummary", { slow: outlierCount, total: requests.length })}
      </p>
    </div>
  );
}
