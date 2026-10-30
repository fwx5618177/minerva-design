import { useEffect, useState, type KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

const MAX = 240; // km/h
const bands: GaugeBand[] = [
  { to: 130, color: "var(--primary-color)" },
  { to: 180, color: "var(--warning-color)" },
  { to: MAX, color: "var(--danger-color)" },
];

export default function SpeedometerDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const [speed, setSpeed] = useState(0);
  const [pedal, setPedal] = useState<"accelerate" | "brake" | null>(null);

  // while a pedal is held, the speed changes every 50 ms
  useEffect(() => {
    if (!pedal) return;
    const timer = window.setInterval(() => {
      setSpeed((current) =>
        pedal === "accelerate"
          ? Math.min(MAX, current + Math.max(1, (MAX - current) / 40))
          : Math.max(0, current - 6),
      );
    }, 50);
    return () => window.clearInterval(timer);
  }, [pedal]);

  // "120 km/h" with the reader's conventions
  const kmh = new Intl.NumberFormat(i18n.language, {
    style: "unit",
    unit: "kilometer-per-hour",
    maximumFractionDigits: 0,
  });
  // press and hold, with the pointer or with Space / Enter
  const hold = (next: "accelerate" | "brake") => ({
    onPointerDown: () => setPedal(next),
    onPointerUp: () => setPedal(null),
    onPointerLeave: () => setPedal(null),
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "Enter") setPedal(next);
    },
    onKeyUp: () => setPedal(null),
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <GaugeChart
        value={speed}
        max={MAX}
        bands={bands}
        thickness={0.1}
        needle
        label={t("speed")}
        format={(value) => kmh.format(value)}
        // the needle follows the state: no entry animation on every change
        animation={false}
        tooltip={false}
        height={300}
        ariaLabel={t("speedAria", { speed: kmh.format(speed) })}
      />
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <Button variant="outline" {...hold("brake")}>
          {t("brake")}
        </Button>
        <Button {...hold("accelerate")}>{t("accelerate")}</Button>
      </div>
    </div>
  );
}
