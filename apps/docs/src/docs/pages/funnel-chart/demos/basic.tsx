import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  FunnelChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Sign-up funnel of a SaaS product over one month
const stages = [
  { key: "pricing", value: 24000 },
  { key: "started", value: 9600 },
  { key: "verified", value: 6850 },
  { key: "project", value: 4100 },
  { key: "invited", value: 1720 },
  { key: "upgraded", value: 640 },
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo(
    (): ShapeDatum[] =>
      stages.map(({ key, value }) => ({ name: t(`signup.${key}`), value })),
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

  // The data is not sorted by the chart (sort="none"), so the event index
  // is also the index in `data`
  const tooltip = (event: ShapeHoverEvent) => {
    const previous = event.index > 0 ? data[event.index - 1] : null;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{event.name}</strong>
        <span>{t("users", { users: number.format(event.value) })}</span>
        <span>{t("ofVisitors", { share: percent.format(event.percent) })}</span>
        {previous && (
          <span>
            {t("droppedSince", {
              users: number.format(previous.value - event.value),
              stage: previous.name,
            })}
          </span>
        )}
      </div>
    );
  };

  return (
    <FunnelChart
      data={data}
      format={(value) => number.format(value)}
      percentFormat={(share) => percent.format(share)}
      renderTooltip={tooltip}
      height={360}
      ariaLabel={t("signupAria")}
    />
  );
}
