import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

// Share of sessions by device, per region
const devices = ["mobile", "desktop", "tablet"] as const;
const colors = ["var(--primary-color)", "#14b8a6", "#f59e0b"];
const regions: [string, number[]][] = [
  ["asiaPacific", [71, 24, 5]],
  ["europe", [52, 41, 7]],
  ["northAmerica", [48, 44, 8]],
  ["latinAmerica", [66, 29, 5]],
];

export default function SmallMultiplesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });

  // the same colors and order in every chart, so one legend serves them all
  const charts = useMemo(
    () =>
      regions.map(([region, values]) => ({
        region: t(`regions.${region}`),
        mobile: values[0] / 100,
        data: devices.map((device, i): ShapeDatum => ({
          name: t(`devices.${device}`),
          value: values[i],
          color: colors[i],
        })),
      })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {devices.map((device, i) => (
          <span
            key={device}
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: colors[i],
              }}
            />
            {t(`devices.${device}`)}
          </span>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 16,
        }}
      >
        {charts.map((chart) => (
          <DonutChart
            key={chart.region}
            data={chart.data}
            labels="none"
            legend={false}
            centerValue={percent.format(chart.mobile)}
            centerLabel={chart.region}
            percentFormat={(share) => percent.format(share)}
            renderTooltip={(slice) => (
              <div style={{ display: "grid", gap: 2 }}>
                <strong>{slice.name}</strong>
                <span>{percent.format(slice.percent)}</span>
              </div>
            )}
            height={170}
            ariaLabel={t("devicesAria", { region: chart.region })}
          />
        ))}
      </div>
    </div>
  );
}
