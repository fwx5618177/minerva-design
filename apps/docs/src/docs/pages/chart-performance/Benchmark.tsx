import { useEffect, useRef, useState } from "react";
import { Button } from "minerva-design";
import {
  createChart,
  type ChartInstance,
  type ChartOptions,
} from "minerva-design/charts/core";

type Dataset = "line100k" | "line1m" | "scatter100k";

const DATASETS: Record<Dataset, { label: string; count: number }> = {
  line100k: { label: "Line · 100k", count: 100_000 },
  line1m: { label: "Line · 1M", count: 1_000_000 },
  scatter100k: { label: "Scatter · 100k", count: 100_000 },
};

/** Typed-array columns: the fastest input of the engine */
function generate(dataset: Dataset): ChartOptions {
  const { count, label } = DATASETS[dataset];
  const scatter = dataset === "scatter100k";
  const x = new Float64Array(count);
  const y = new Float64Array(count);
  let seed = 1;
  let value = 0;
  for (let i = 0; i < count; i++) {
    seed = (seed * 16807) % 2147483647;
    const r = seed / 2147483647;
    if (scatter) {
      x[i] = r * 100;
      y[i] = Math.sin(x[i] / 8) * 30 + ((seed >> 8) % 1000) / 25;
    } else {
      value += r - 0.5;
      x[i] = i;
      y[i] = value;
    }
  }
  return {
    series: [
      {
        id: dataset,
        name: label,
        type: scatter ? "scatter" : "line",
        data: { x, y },
        pointSize: scatter ? 2 : undefined,
        lineWidth: scatter ? undefined : 1,
      },
    ],
    legend: false,
    ariaLabel: `Benchmark: ${label} points`,
  };
}

/** Resolves once the next frame has been painted */
const nextFrame = () =>
  new Promise<number>((resolve) =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => resolve(performance.now())),
    ),
  );

/** Duration of setOptions, and time until the result is on screen */
async function measure(chart: ChartInstance, options: ChartOptions) {
  const start = performance.now();
  chart.setOptions(options);
  const update = performance.now() - start;
  const frame = (await nextFrame()) - start;
  return { update, frame };
}

export default function Benchmark() {
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartInstance | null>(null);
  const [options, setOptions] = useState<ChartOptions | null>(null);
  const [renderer, setRenderer] = useState("…");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("Pick a data set");

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const chart = createChart(container, {
      series: [],
      ariaLabel: "Benchmark chart",
    });
    chartRef.current = chart;
    let active = true;
    void chart.ready.then((kind) => {
      if (active) setRenderer(kind ?? "unsupported");
    });
    const off = chart.on("renderer", setRenderer);
    return () => {
      active = false;
      off();
      chart.destroy();
      chartRef.current = null;
    };
  }, []);

  const run = async (dataset: Dataset) => {
    const chart = chartRef.current;
    if (!chart) return;
    setBusy(true);
    setResult(`Generating ${DATASETS[dataset].label} points…`);
    await nextFrame();
    const next = generate(dataset);
    const { update, frame } = await measure(chart, next);
    setOptions(next);
    setResult(
      `${DATASETS[dataset].label}: setOptions ${update.toFixed(1)} ms · on screen after ${frame.toFixed(0)} ms`,
    );
    setBusy(false);
  };

  const repeat = async () => {
    const chart = chartRef.current;
    if (!chart || !options) return;
    // a new options object with the same data reference: nothing is reprocessed
    const { update } = await measure(chart, { ...options });
    setResult(`Identical setOptions: ${update.toFixed(2)} ms`);
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(Object.keys(DATASETS) as Dataset[]).map((dataset) => (
          <Button
            key={dataset}
            size="small"
            variant="outline"
            disabled={busy}
            onClick={() => void run(dataset)}
          >
            {DATASETS[dataset].label}
          </Button>
        ))}
        <Button
          size="small"
          variant="ghost"
          disabled={busy || !options}
          onClick={() => void repeat()}
        >
          Same options again
        </Button>
      </div>
      <div ref={ref} style={{ height: 280 }} />
      <p role="status">
        Renderer: {renderer} · {result}
      </p>
    </div>
  );
}
