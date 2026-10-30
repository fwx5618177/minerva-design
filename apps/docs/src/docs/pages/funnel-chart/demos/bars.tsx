import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

type Sort = "descending" | "ascending" | "none";
const SORTS: Sort[] = ["descending", "ascending", "none"];

// Weekly active users of each feature (not a sequential process)
const features = [
  { key: "alerts", value: 3900 },
  { key: "dashboards", value: 8400 },
  { key: "integrations", value: 1600 },
  { key: "reports", value: 5200 },
  { key: "api", value: 2100 },
];

export default function BarsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const [sort, setSort] = useState<Sort>("descending");

  const data = useMemo(
    (): ShapeDatum[] =>
      features.map(({ key, value }) => ({ name: t(`features.${key}`), value })),
    [t],
  );
  const number = new Intl.NumberFormat(i18n.language);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("sortOrder")}
        direction="horizontal"
        value={sort}
        onChange={(value) => setSort(value as Sort)}
      >
        {SORTS.map((value) => (
          <Radio key={value} value={value} label={t(`sorts.${value}`)} />
        ))}
      </RadioGroup>
      <FunnelChart
        data={data}
        shape="bar"
        sort={sort}
        conversion={false}
        gap={6}
        legend={false}
        format={(value) => number.format(value)}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{event.name}</strong>
            <span>
              {t("weeklyUsers", { users: number.format(event.value) })}
            </span>
          </div>
        )}
        height={300}
        ariaLabel={t("featuresAria")}
      />
    </div>
  );
}
