import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Radio, RadioGroup } from "minerva-design";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

type Unit = "celsius" | "fahrenheit";
const UNITS: Unit[] = ["celsius", "fahrenheit"];

// Smart thermostat: the settings are stored in °C and shown in either unit
const MIN = 10;
const MAX = 30;
const STEP = 0.5;
const ROOM = 19.5;
const BANDS_C = [
  { to: 18, color: "#3b82f6" },
  { to: 23, color: "var(--success-color)" },
  { to: MAX, color: "#f97316" },
];

const convert = (celsius: number, unit: Unit) =>
  unit === "celsius" ? celsius : (celsius * 9) / 5 + 32;

export default function ThermostatDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const [target, setTarget] = useState(21);
  const [unit, setUnit] = useState<Unit>("celsius");

  // "21 °C", "69.8 °F"... in the reader's conventions
  const format = useMemo(() => {
    const temperature = new Intl.NumberFormat(i18n.language, {
      style: "unit",
      unit,
      maximumFractionDigits: 1,
    });
    return (value: number) => temperature.format(value);
  }, [i18n.language, unit]);
  const bands = useMemo(
    (): GaugeBand[] =>
      BANDS_C.map((band) => ({ ...band, to: convert(band.to, unit) })),
    [unit],
  );

  const mode =
    target > ROOM + 0.25
      ? "heating"
      : target < ROOM - 0.25
        ? "cooling"
        : "holding";
  const change = (delta: number) =>
    setTarget((current) => Math.min(MAX, Math.max(MIN, current + delta)));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("thermostat.unit")}
        direction="horizontal"
        value={unit}
        onChange={(value) => setUnit(value as Unit)}
      >
        {UNITS.map((u) => (
          <Radio key={u} value={u} label={t(`thermostat.units.${u}`)} />
        ))}
      </RadioGroup>
      <GaugeChart
        value={convert(target, unit)}
        min={convert(MIN, unit)}
        max={convert(MAX, unit)}
        bands={bands}
        sweep={270}
        thickness={0.12}
        label={t("thermostat.target")}
        format={format}
        renderTooltip={() => (
          <span>
            {t("thermostat.room", { value: format(convert(ROOM, unit)) })}
          </span>
        )}
        height={260}
        ariaLabel={t("thermostat.aria")}
      />
      <HStack gap={8} justify="center" align="center">
        <Button
          variant="outline"
          shape="circle"
          aria-label={t("thermostat.lower")}
          disabled={target <= MIN}
          onClick={() => change(-STEP)}
        >
          −
        </Button>
        <output
          aria-live="polite"
          style={{ minWidth: 220, textAlign: "center" }}
        >
          {t(`thermostat.modes.${mode}`, {
            room: format(convert(ROOM, unit)),
            target: format(convert(target, unit)),
          })}
        </output>
        <Button
          variant="outline"
          shape="circle"
          aria-label={t("thermostat.raise")}
          disabled={target >= MAX}
          onClick={() => change(STEP)}
        >
          +
        </Button>
      </HStack>
    </div>
  );
}
