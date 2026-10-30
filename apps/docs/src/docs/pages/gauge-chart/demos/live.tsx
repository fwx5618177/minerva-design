import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

/** Small seeded random generator: the same "traffic" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MAX = 1200;
const bands: GaugeBand[] = [
  { to: 800, color: "var(--primary-color)" },
  { to: 1000, color: "var(--warning-color)" },
  { to: MAX, color: "var(--danger-color)" },
];

export default function LiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const [value, setValue] = useState(640);
  const [running, setRunning] = useState(true);
  const random = useRef(mulberry32(42));

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      // random walk that drifts back toward ~650 requests / s
      setValue((current) => {
        const step = (random.current() - 0.5) * 360 + (650 - current) * 0.2;
        return Math.min(MAX, Math.max(0, current + step));
      });
    }, 1500);
    return () => window.clearInterval(timer);
  }, [running]);

  const number = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 0,
  });
  const rps = (requests: number) => number.format(requests);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <GaugeChart
        value={value}
        max={MAX}
        bands={bands}
        sweep={180}
        thickness={0.22}
        needle
        label={t("requestsPerSecond")}
        format={rps}
        renderTooltip={(event) => (
          <span>
            {t("requestsPerSecond")} · {rps(event.value)}
          </span>
        )}
        height={260}
        ariaLabel={t("liveAria")}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
      </div>
    </div>
  );
}
