import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { CalendarHeatmap, type CalendarDatum } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;
// kWh: up to 8, 8-14, 14-20, more than 20
const THRESHOLDS = [8, 14, 20];
const COLORS = [
  "var(--success-color)",
  "var(--primary-color)",
  "var(--warning-color)",
  "var(--danger-color)",
];

// Electricity used by a home each day of 2025 (kWh): heating in winter, air
// conditioning in the summer heat waves, more at weekends
const random = mulberry32(55);
const START = Date.UTC(2025, 0, 1);
const USAGE: CalendarDatum[] = Array.from({ length: 365 }, (_, i) => {
  const time = START + i * DAY;
  const weekday = new Date(time).getUTCDay();
  const winter = 9 * Math.max(0, Math.cos((2 * Math.PI * (i - 15)) / 365));
  const heatWave = (i > 180 && i < 196) || (i > 216 && i < 226) ? 9 : 0;
  const weekend = weekday === 0 || weekday === 6 ? 2.5 : 0;
  const value = 5 + winter + heatWave + weekend + random() * 4;
  return {
    date: new Date(time).toISOString().slice(0, 10),
    value: Math.round(value * 10) / 10,
  };
});

/** Level of a value, as the chart computes it from THRESHOLDS */
const levelOf = (value: number) => {
  const k = THRESHOLDS.findIndex((bound) => value <= bound);
  return k < 0 ? THRESHOLDS.length : k;
};

export default function EnergyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const locale = i18n.language;
  // controlled legend: the hidden levels live in the state
  const [hidden, setHidden] = useState<number[]>([]);

  const kwh = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("kwh", { value: format.format(value) });
  }, [locale, t]);
  const visible = useMemo(
    () => USAGE.filter((d) => !hidden.includes(levelOf(d.value))),
    [hidden],
  );
  const used = visible.reduce((sum, d) => sum + d.value, 0);
  const total = USAGE.reduce((sum, d) => sum + d.value, 0);
  const number = new Intl.NumberFormat(locale);
  const percent = new Intl.NumberFormat(locale, { style: "percent" });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setHidden([0, 1])}
        >
          {t("highUseOnly")}
        </Button>
        <Button
          size="small"
          variant="ghost"
          disabled={!hidden.length}
          onClick={() => setHidden([])}
        >
          {t("showAll")}
        </Button>
      </div>
      <CalendarHeatmap
        data={USAGE}
        range={2025}
        colors={COLORS}
        thresholds={THRESHOLDS}
        format={kwh}
        locale={locale}
        legend={{ position: "top" }}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        ariaLabel={t("energyAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("visibleDays", {
          days: number.format(visible.length),
          value: kwh(used),
          share: percent.format(used / total),
        })}
      </output>
    </div>
  );
}
