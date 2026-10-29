import { useEffect, useRef, useState } from "react";
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

const rps = (value: number) => Math.round(value).toLocaleString("en-US");

export default function LiveDemo() {
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

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <GaugeChart
        value={value}
        max={MAX}
        bands={bands}
        sweep={180}
        thickness={0.22}
        needle
        label="Requests / s"
        format={rps}
        height={260}
        ariaLabel="Requests per second, updated live"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? "Pause updates" : "Resume updates"}
        </Button>
      </div>
    </div>
  );
}
