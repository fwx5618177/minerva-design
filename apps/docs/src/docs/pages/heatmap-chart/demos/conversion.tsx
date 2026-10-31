import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HeatmapChart,
  type ChartHoverEvent,
  type HeatmapCell,
} from "minerva-design/charts";

const sources = ["organic", "paid", "social", "email", "referral", "direct"];
const devices = ["desktop", "mobile", "tablet"];
// sessions and orders of last month, per source (rows) and device (columns)
const sessions = [
  [42_000, 61_000, 6_100],
  [18_500, 33_000, 2_400],
  [7_200, 39_000, 1_900],
  [9_800, 12_400, 1_300],
  [5_600, 4_100, 700],
  [21_000, 15_500, 2_800],
];
const orders = [
  [1_390, 1_160, 150],
  [520, 560, 41],
  [101, 470, 21],
  [560, 430, 52],
  [230, 92, 19],
  [880, 420, 84],
];
const cells = sources.flatMap((source, s) =>
  devices.map((device, d) => ({
    source,
    device,
    sessions: sessions[s]?.[d] ?? 0,
    orders: orders[s]?.[d] ?? 0,
  })),
);
const average =
  orders.flat().reduce((a, b) => a + b, 0) /
  sessions.flat().reduce((a, b) => a + b, 0);

export default function ConversionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const data = useMemo(
    (): HeatmapCell[] =>
      cells.map((cell) => ({
        x: t(`devices.${cell.device}`),
        y: t(`sources.${cell.source}`),
        value: cell.orders / cell.sessions,
      })),
    [t],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  // item.index is the index of the cell in `data` (and in `cells`)
  const click = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (item) setSelected(item.index);
  };
  const cell = selected === null ? undefined : cells[selected];
  const rate = cell ? cell.orders / cell.sessions : 0;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {cell ? (
          <>
            {t("cellStatus", {
              source: t(`sources.${cell.source}`),
              device: t(`devices.${cell.device}`),
              orders: number.format(cell.orders),
              sessions: number.format(cell.sessions),
              rate: percent.format(rate),
            })}{" "}
            <strong
              style={{
                color:
                  rate >= average
                    ? "var(--success-color)"
                    : "var(--danger-color)",
              }}
            >
              {rate >= average
                ? t("aboveAverage", { value: percent.format(average) })
                : t("belowAverage", { value: percent.format(average) })}
            </strong>
          </>
        ) : (
          t("clickCell")
        )}
      </output>
      <HeatmapChart
        data={data}
        xCategories={devices.map((key) => t(`devices.${key}`))}
        // first source at the top
        yCategories={[...sources].reverse().map((key) => t(`sources.${key}`))}
        name={t("conversionRate")}
        format={(value) => percent.format(value)}
        radius={4}
        onPointClick={click}
        onPlotClick={() => setSelected(null)}
        height={340}
        ariaLabel={t("conversionAria")}
      />
    </div>
  );
}
