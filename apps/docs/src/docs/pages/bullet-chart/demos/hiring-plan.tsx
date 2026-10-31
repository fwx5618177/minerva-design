import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

type Order = "plan" | "behind" | "ahead";

// Hires made so far this year by each team, against the yearly headcount
// plan; the marker is where the team should be by October (75 %)
const TEAMS: [key: string, hired: number, plan: number][] = [
  ["engineering", 31, 48],
  ["sales", 19, 22],
  ["support", 14, 16],
  ["marketing", 4, 9],
  ["product", 7, 8],
  ["finance", 2, 4],
];
const ON_TRACK = 0.75;
const ORDERS: Order[] = ["plan", "behind", "ahead"];
const pace = ([, hired, plan]: (typeof TEAMS)[number]) =>
  hired / (plan * ON_TRACK);

export default function HiringPlanDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });
  const locale = i18n.language;
  const [order, setOrder] = useState<Order>("plan");
  // hidden teams are kept by key: the row indexes change with the order
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);

  const rows = useMemo(() => {
    if (order === "plan") return TEAMS;
    const sign = order === "behind" ? 1 : -1;
    return [...TEAMS].sort((a, b) => sign * (pace(a) - pace(b)));
  }, [order]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const data = useMemo(
    (): BulletDatum[] =>
      rows.map(([key, hired, plan]) => ({
        name: t(`hiring.teams.${key}`),
        subtitle: t("hiring.planned", { plan: number.format(plan) }),
        value: hired,
        target: plan * ON_TRACK,
        ranges: [plan * 0.5, plan * ON_TRACK, plan],
        max: plan,
      })),
    [number, rows, t],
  );
  const hidden = rows
    .map(([key], index) => (hiddenKeys.includes(key) ? index : -1))
    .filter((index) => index >= 0);
  const rangeLabels = useMemo(
    () => [
      t("hiring.ranges.behind"),
      t("hiring.ranges.catchingUp"),
      t("hiring.ranges.onTrack"),
    ],
    [t],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  const visible = TEAMS.filter(([key]) => !hiddenKeys.includes(key));
  const hired = visible.reduce((sum, [, value]) => sum + value, 0);
  const planned = visible.reduce((sum, [, , value]) => sum + value, 0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 220 }}
        aria-label={t("hiring.order")}
        value={order}
        onChange={(value) => setOrder(value as Order)}
      >
        {ORDERS.map((key) => (
          <SelectItem key={key} value={key}>
            {t(`hiring.orders.${key}`)}
          </SelectItem>
        ))}
      </Select>
      <BulletChart
        data={data}
        legend
        hidden={hidden}
        onToggle={(event) =>
          setHiddenKeys(event.hiddenIndexes.map((index) => rows[index][0]))
        }
        rangeLabels={rangeLabels}
        format={(value) => number.format(value)}
        height={380}
        ariaLabel={t("hiring.aria")}
      />
      <output aria-live="polite">
        {visible.length
          ? t("hiring.summary", {
              hired: number.format(hired),
              planned: number.format(planned),
              share: percent.format(hired / planned),
              teams: number.format(visible.length),
            })
          : t("hiring.none")}
      </output>
    </div>
  );
}
