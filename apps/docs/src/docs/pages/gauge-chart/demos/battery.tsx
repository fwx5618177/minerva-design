import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Switch } from "minerva-design";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

// Electric car charging session: one tick is one simulated minute; the
// charger slows down above 80% to protect the battery
const START = 18;
const FAST = 0.8; // % per minute below 80%
const SLOW = 0.3; // % per minute above 80%
const RANGE = 420; // km on a full battery
const bands: GaugeBand[] = [
  { to: 20, color: "var(--danger-color)" },
  { to: 50, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

export default function BatteryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const locale = i18n.language;
  const [charge, setCharge] = useState(START);
  const [plugged, setPlugged] = useState(true);
  const charging = plugged && charge < 100;

  useEffect(() => {
    if (!charging) return;
    const timer = window.setInterval(() => {
      setCharge((current) =>
        Math.min(100, current + (current < 80 ? FAST : SLOW)),
      );
    }, 400);
    return () => window.clearInterval(timer);
  }, [charging]);

  const formats = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 0,
    });
    const km = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "kilometer",
      maximumFractionDigits: 0,
    });
    const minutes = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "long",
      maximumFractionDigits: 0,
    });
    return {
      percent: (value: number) => percent.format(value / 100),
      km: (value: number) => km.format(value),
      minutes: (value: number) => minutes.format(value),
    };
  }, [locale]);

  const level = Math.floor(charge);
  const phase =
    level >= 100
      ? "full"
      : !plugged
        ? "unplugged"
        : level < 80
          ? "charging"
          : "topping";

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <GaugeChart
        value={charge}
        bands={bands}
        sweep={180}
        thickness={0.22}
        label={t("battery.label")}
        format={formats.percent}
        renderTooltip={() => (
          <span>
            {t("battery.range", { range: formats.km((charge / 100) * RANGE) })}
          </span>
        )}
        height={240}
        ariaLabel={t("battery.aria")}
      />
      <HStack gap={12} wrap align="center" justify="center">
        <Switch
          checked={plugged}
          onChange={setPlugged}
          label={t("battery.plugged")}
        />
        <Button size="small" variant="ghost" onClick={() => setCharge(START)}>
          {t("battery.reset")}
        </Button>
      </HStack>
      <p style={{ margin: 0, textAlign: "center" }}>
        {/* only the phase is announced, not every simulated minute */}
        <output aria-live="polite">{t(`battery.phases.${phase}`)}</output>
        {" · "}
        {t("battery.range", { range: formats.km((level / 100) * RANGE) })}
        {phase === "charging" &&
          ` · ${t("battery.toEighty", {
            minutes: formats.minutes(Math.ceil((80 - charge) / FAST)),
          })}`}
      </p>
    </div>
  );
}
