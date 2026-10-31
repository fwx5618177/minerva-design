import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Switch } from "minerva-design";
import {
  Surface3DChart,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";

// A 40 × 40 cm metal plate whose edges are kept at room temperature;
// heat sources hold their cell at 100 °C and the heat spreads by diffusion.
const SIZE = 41;
const AMBIENT = 20;
const SOURCE = 100;
const RATE = 0.2; // diffusion number of the explicit scheme (stable below 0.25)
const AXIS = Float64Array.from({ length: SIZE }, (_, i) => i);
const INITIAL_SOURCES = [[12, 14]];

const sourceKey = (row: number, col: number) => row * SIZE + col;

const ambient = () => new Float32Array(SIZE * SIZE).fill(AMBIENT);

/** Runs `steps` explicit finite-difference steps of the heat equation */
const diffuse = (grid: Float32Array, sources: Set<number>, steps: number) => {
  let current = grid;
  for (let step = 0; step < steps; step++) {
    const next = new Float32Array(current);
    for (let r = 1; r < SIZE - 1; r++) {
      for (let c = 1; c < SIZE - 1; c++) {
        const i = r * SIZE + c;
        next[i] =
          current[i]! +
          RATE *
            (current[i - 1]! +
              current[i + 1]! +
              current[i - SIZE]! +
              current[i + SIZE]! -
              4 * current[i]!);
      }
    }
    for (const i of sources) next[i] = SOURCE;
    current = next;
  }
  return current;
};

const toData = (z: Float32Array): Surface3DData => ({
  rows: SIZE,
  cols: SIZE,
  x: AXIS,
  y: AXIS,
  z,
});

export default function HeatDiffusionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [playing, setPlaying] = useState(true);
  const [sourceCount, setSourceCount] = useState(INITIAL_SOURCES.length);
  const [data, setData] = useState(() => toData(ambient()));
  const sources = useRef(
    new Set(INITIAL_SOURCES.map(([r, c]) => sourceKey(r!, c!))),
  );

  // 8 diffusion steps every 80 ms, only while playing
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setData((previous) =>
        toData(diffuse(previous.z as Float32Array, sources.current, 8)),
      );
    }, 80);
    return () => window.clearInterval(timer);
  }, [playing]);

  const series = useMemo(
    (): Surface3DSeries[] => [{ name: t("plate"), data }],
    [t, data],
  );
  const stats = useMemo(() => {
    let max = -Infinity;
    let sum = 0;
    for (let i = 0; i < data.z.length; i++) {
      max = Math.max(max, data.z[i]!);
      sum += data.z[i]!;
    }
    return { max, mean: sum / data.z.length };
  }, [data]);
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );

  const reset = () => {
    sources.current = new Set(
      INITIAL_SOURCES.map(([r, c]) => sourceKey(r!, c!)),
    );
    setSourceCount(sources.current.size);
    setData(toData(ambient()));
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center">
        <Switch
          size="small"
          checked={playing}
          label={t("play")}
          onChange={setPlaying}
        />
        <Button size="small" variant="outline" color="neutral" onClick={reset}>
          {t("reset")}
        </Button>
      </HStack>
      <Surface3DChart
        series={series}
        xAxis={{ title: t("cm") }}
        yAxis={{ title: t("cm") }}
        zAxis={{
          min: AMBIENT,
          max: SOURCE,
          title: t("temperature"),
          format: (value) => celsius.format(value),
        }}
        valueRange={[AMBIENT, SOURCE]}
        colorScale="inferno"
        colorBar={{
          title: t("temperature"),
          format: (value) => celsius.format(value),
        }}
        aspect={[1, 1, 0.5]}
        camera={{ azimuth: 30, elevation: 38 }}
        height={440}
        ariaLabel={t("heatAria")}
        onPointClick={(event) => {
          if (event.row === undefined || event.col === undefined) return;
          // clicking near a source removes it, clicking elsewhere adds one
          const row = Math.min(SIZE - 2, Math.max(1, event.row));
          const col = Math.min(SIZE - 2, Math.max(1, event.col));
          const near = [...sources.current].find(
            (key) =>
              Math.abs(Math.floor(key / SIZE) - row) <= 2 &&
              Math.abs((key % SIZE) - col) <= 2,
          );
          if (near === undefined) sources.current.add(sourceKey(row, col));
          else sources.current.delete(near);
          setSourceCount(sources.current.size);
          setPlaying(true);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("heatStatus", {
          sources: sourceCount,
          max: celsius.format(stats.max),
          mean: celsius.format(stats.mean),
        })}
      </output>
    </div>
  );
}
