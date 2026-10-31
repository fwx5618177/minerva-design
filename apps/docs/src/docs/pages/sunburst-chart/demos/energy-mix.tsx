import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

type Source = [key: string, color: string, value: number | [string, number][]];

// Yearly electricity generation of a country, in TWh
const MIX: Source[] = [
  [
    "renewables",
    "#16a34a",
    [
      ["wind", 136],
      ["solar", 62],
      ["hydro", 19],
      ["biomass", 44],
    ],
  ],
  ["nuclear", "#7c3aed", 34],
  [
    "fossil",
    "#78716c",
    [
      ["gas", 79],
      ["coal", 128],
      ["oil", 4],
    ],
  ],
];
const FOSSIL = MIX.findIndex(([key]) => key === "fossil");
const RENEWABLES = MIX.findIndex(([key]) => key === "renewables");

const sum = (value: Source[2]) =>
  typeof value === "number"
    ? value
    : value.reduce((total, [, twh]) => total + twh, 0);

export default function EnergyMixDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const locale = i18n.language;
  // controlled: the legend and the switch edit the same hidden list
  const [hidden, setHidden] = useState<number[]>([]);

  const data = useMemo(
    (): TreemapNode[] =>
      MIX.map(([key, color, value]) =>
        typeof value === "number"
          ? { name: t(`energy.sources.${key}`), color, value }
          : {
              name: t(`energy.sources.${key}`),
              color,
              children: value.map(([fuel, twh]) => ({
                name: t(`energy.fuels.${fuel}`),
                value: twh,
              })),
            },
      ),
    [t],
  );
  const number = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const format = (value: number) =>
    t("energy.twh", { value: number.format(value) });

  const shown = MIX.reduce(
    (total, [, , value], i) =>
      hidden.includes(i) ? total : total + sum(value),
    0,
  );
  const renewables = sum(MIX[RENEWABLES][2]);
  const fossilHidden = hidden.includes(FOSSIL);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={fossilHidden}
        onChange={(checked) =>
          setHidden((current) =>
            checked
              ? [...current, FOSSIL]
              : current.filter((index) => index !== FOSSIL),
          )
        }
        label={t("energy.hideFossil")}
      />
      <SunburstChart
        data={data}
        legend
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        innerRadius={0.3}
        format={format}
        height={420}
        ariaLabel={t("energy.aria")}
      />
      <output aria-live="polite">
        {hidden.includes(RENEWABLES)
          ? t("energy.shownOnly", { total: format(shown) })
          : t("energy.share", {
              share: percent.format(shown ? renewables / shown : 0),
              total: format(shown),
            })}
      </output>
    </div>
  );
}
