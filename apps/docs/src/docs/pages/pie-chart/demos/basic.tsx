import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  PieChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Website sessions over the last 30 days, by traffic source
const sessions = [
  { key: "organic", value: 48200 },
  { key: "direct", value: 23100 },
  { key: "social", value: 16400 },
  { key: "paid", value: 12700 },
  { key: "referral", value: 9800 },
  { key: "email", value: 6100 },
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo(
    (): ShapeDatum[] =>
      sessions.map(({ key, value }) => ({ name: t(`sources.${key}`), value })),
    [t],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <PieChart
        data={data}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {t("sessionsShare", {
                sessions: number.format(slice.value),
                share: percent.format(slice.percent),
              })}
            </span>
          </div>
        )}
        onClick={setSelected}
        height={320}
        ariaLabel={t("sessionsAria")}
      />
      <p role="status">
        {selected
          ? t("selectedSource", {
              source: selected.name,
              sessions: number.format(selected.value),
              share: percent.format(selected.percent),
            })
          : t("clickSlice")}
      </p>
    </div>
  );
}
