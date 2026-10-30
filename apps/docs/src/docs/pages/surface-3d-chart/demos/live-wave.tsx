import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  Surface3DChart,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";

// Ripples spreading from the center, recomputed ~30 times per second
const SIZE = 100;
const axis = Float64Array.from(
  { length: SIZE },
  (_, i) => -6 + (12 * i) / (SIZE - 1),
);
const radius = new Float32Array(SIZE * SIZE);
for (let r = 0; r < SIZE; r++) {
  for (let c = 0; c < SIZE; c++)
    radius[r * SIZE + c] = Math.hypot(axis[c]!, axis[r]!);
}
const wave = (time: number): Surface3DData => {
  const z = new Float32Array(SIZE * SIZE);
  for (let i = 0; i < z.length; i++) {
    const d = radius[i]!;
    z[i] = Math.sin(d * 2.2 - time * 3) * Math.exp(-d * 0.22);
  }
  // a new object every frame: the chart only re-processes changed data
  return { rows: SIZE, cols: SIZE, x: axis, y: axis, z };
};

export default function LiveWaveDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [playing, setPlaying] = useState(true);
  const [data, setData] = useState(() => wave(0));
  const host = useRef<HTMLDivElement>(null);

  // the animation runs only while playing, on-screen and in a visible tab
  useEffect(() => {
    const element = host.current;
    if (!playing || !element) return;
    let frame = 0;
    let visible = false;
    let last = 0;
    let time = 0;
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      if (now - last >= 33) {
        time += last ? Math.min(0.1, (now - last) / 1000) : 0;
        last = now;
        setData(wave(time));
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame && visible && !document.hidden) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      start();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", start);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", start);
      cancelAnimationFrame(frame);
    };
  }, [playing]);

  const series = useMemo(
    (): Surface3DSeries[] => [{ name: t("wave"), data }],
    [t, data],
  );

  return (
    <div ref={host} style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        size="small"
        checked={playing}
        label={t("play")}
        onChange={setPlaying}
      />
      <Surface3DChart
        series={series}
        zAxis={{ min: -1, max: 1, title: t("amplitude") }}
        valueRange={[-1, 1]}
        colorScale="coolwarm"
        colorBar={false}
        aspect={[1, 1, 0.45]}
        camera={{ elevation: 32 }}
        height={420}
        ariaLabel={t("waveAria")}
      />
    </div>
  );
}
