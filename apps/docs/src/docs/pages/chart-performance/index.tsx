import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";
import CodeBlock from "@layout/CodeBlock";
import DemoBlock from "@/docs/components/DemoBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";
import Benchmark from "./Benchmark";
import benchmarkSource from "./Benchmark.tsx?raw";

const rendererExample = `import { createChart } from "minerva-design/charts/core";

// "auto" (default): WebGPU, then WebGL2, then Canvas2D
const chart = createChart(container, { series, renderer: "auto" });
chart.ready.then((kind) => showRenderer(kind)); // "webgpu" | "webgl2" | "canvas2d" | null
// fired again when the GPU is lost and the chart falls back
chart.on("renderer", (kind) => showRenderer(kind));

// force a backend (also accepted on every React chart: renderer="canvas2d")
createChart(other, { series, renderer: "canvas2d" });`;

const dataExample = `const n = 1_000_000;
const x = new Float64Array(n); // timestamps or indexes, sorted
const y = new Float32Array(n);
// ...fill x and y once

// fastest: typed-array columns, copied in one go (no per-point conversion)
const fast = [{ id: "signal", name: "Signal", data: { x, y } }];

// slower: plain arrays in columns, then [x, y] tuples,
// then { x, y } objects (converted point by point)
const slow = [{ name: "Signal", data: points.map((p) => ({ x: p.t, y: p.v })) }];`;

const reactExample = `import { useMemo } from "react";
import { LineChart } from "minerva-design/charts";

function Telemetry({ samples }: { samples: Samples }) {
  // build the columns once per data set, not on every render
  const series = useMemo(
    () => [{ id: "cpu", name: "CPU", data: { x: samples.time, y: samples.cpu } }],
    [samples],
  );
  // inline props are fine: they are compared shallowly and skip setOptions
  return <LineChart series={series} yAxis={{ min: 0, max: 100 }} height={320} />;
}`;

const streamingExample = `let data: [number, number][] = [];
let queued: [number, number][] = [];

socket.onmessage = (event) => {
  queued.push(JSON.parse(event.data));
};

// one update per frame, however many samples arrived
function flush() {
  if (queued.length) {
    // a new array: arrays mutated in place are not read again
    data = [...data, ...queued].slice(-50_000);
    queued = [];
    chart.setOptions({ ...base, series: [{ id: "cpu", name: "CPU", data }] });
  }
  requestAnimationFrame(flush);
}
requestAnimationFrame(flush);`;

const primitivesExample = `import {
  createChartController,
  scenePrimitives,
} from "minerva-design/charts/core";

const controller = createChartController({
  options,
  measureText: (text, font) => measure(text, font),
  onInvalidate: () => draw(),
});
controller.setSize(360, 240);

function draw() {
  const scene = controller.getScene();
  if (!scene) return;
  // fewer, coarser shapes for a slow host (e.g. one native view per shape)
  const shapes = scenePrimitives(scene, {
    maxDots: 1500, // per series: then merged per cell
    maxBars: 600, // per series: then merged per pixel column
    columnWidth: 3, // lines: at most 4 points per 3 px column
  });
  paint(shapes);
}`;

export default function ChartPerformanceDoc() {
  const { t } = useTranslation();
  return (
    <DocPage id="chart-performance">
      <section className={styles.section} aria-labelledby="perf-intro">
        <h2 id="perf-intro">{t("docs.chart-performance.intro.title")}</h2>
        <p className={styles.prose}>{t("docs.chart-performance.intro.text")}</p>
        <p className={styles.prose}>
          <Trans
            i18nKey="docs.chart-performance.intro.pages"
            components={{
              charts: <Link to="/charts" />,
              engine: <Link to="/chart-engine" />,
            }}
          />
        </p>
      </section>

      <section className={styles.section} aria-labelledby="perf-renderers">
        <h2 id="perf-renderers">
          {t("docs.chart-performance.renderers.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.chart-performance.renderers.text")}
        </p>
        <ul className={styles.prose}>
          <li>{t("docs.chart-performance.renderers.auto")}</li>
          <li>{t("docs.chart-performance.renderers.software")}</li>
          <li>{t("docs.chart-performance.renderers.forced")}</li>
          <li>{t("docs.chart-performance.renderers.lost")}</li>
        </ul>
        <CodeBlock language="ts" code={rendererExample} />
      </section>

      <section className={styles.section} aria-labelledby="perf-data">
        <h2 id="perf-data">{t("docs.chart-performance.data.title")}</h2>
        <p className={styles.prose}>{t("docs.chart-performance.data.text")}</p>
        <ol className={styles.prose}>
          <li>{t("docs.chart-performance.data.typed")}</li>
          <li>{t("docs.chart-performance.data.columns")}</li>
          <li>{t("docs.chart-performance.data.tuples")}</li>
          <li>{t("docs.chart-performance.data.objects")}</li>
        </ol>
        <p className={styles.prose}>
          {t("docs.chart-performance.data.identity")}
        </p>
        <CodeBlock language="ts" code={dataExample} />
      </section>

      <section className={styles.section} aria-labelledby="perf-visible">
        <h2 id="perf-visible">{t("docs.chart-performance.visible.title")}</h2>
        <p className={styles.prose}>
          {t("docs.chart-performance.visible.text")}
        </p>
        <ul className={styles.prose}>
          <li>{t("docs.chart-performance.visible.sorted")}</li>
          <li>{t("docs.chart-performance.visible.unsorted")}</li>
          <li>{t("docs.chart-performance.visible.decimation")}</li>
          <li>{t("docs.chart-performance.visible.scatter")}</li>
          <li>{t("docs.chart-performance.visible.hit")}</li>
          <li>{t("docs.chart-performance.visible.dom")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="perf-zoom">
        <h2 id="perf-zoom">{t("docs.chart-performance.zoom.title")}</h2>
        <p className={styles.prose}>{t("docs.chart-performance.zoom.gpu")}</p>
        <p className={styles.prose}>
          {t("docs.chart-performance.zoom.canvas")}
        </p>
      </section>

      <section className={styles.section} aria-labelledby="perf-scale">
        <h2 id="perf-scale">{t("docs.chart-performance.scale.title")}</h2>
        <p className={styles.prose}>{t("docs.chart-performance.scale.text")}</p>
        <ul className={styles.prose}>
          <li>{t("docs.chart-performance.scale.line")}</li>
          <li>{t("docs.chart-performance.scale.scatter")}</li>
          <li>{t("docs.chart-performance.scale.update")}</li>
        </ul>
        <p className={styles.prose}>
          {t("docs.chart-performance.scale.guidance")}
        </p>
        <DemoBlock
          id="perf-benchmark"
          title={t("docs.chart-performance.benchmark.title")}
          description={t("docs.chart-performance.benchmark.description")}
          source={benchmarkSource}
        >
          <Benchmark />
        </DemoBlock>
      </section>

      <section className={styles.section} aria-labelledby="perf-react">
        <h2 id="perf-react">{t("docs.chart-performance.react.title")}</h2>
        <ul className={styles.prose}>
          <li>{t("docs.chart-performance.react.memo")}</li>
          <li>{t("docs.chart-performance.react.shallow")}</li>
          <li>{t("docs.chart-performance.react.typed")}</li>
          <li>{t("docs.chart-performance.react.shapes")}</li>
        </ul>
        <CodeBlock language="tsx" code={reactExample} />
      </section>

      <section className={styles.section} aria-labelledby="perf-streaming">
        <h2 id="perf-streaming">
          {t("docs.chart-performance.streaming.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.chart-performance.streaming.text")}
        </p>
        <p className={styles.prose}>
          {t("docs.chart-performance.streaming.batch")}
        </p>
        <CodeBlock language="ts" code={streamingExample} />
      </section>

      <section className={styles.section} aria-labelledby="perf-shapes">
        <h2 id="perf-shapes">{t("docs.chart-performance.shapes.title")}</h2>
        <p className={styles.prose}>
          {t("docs.chart-performance.shapes.text")}
        </p>
        <ul className={styles.prose}>
          <li>{t("docs.chart-performance.shapes.gpu")}</li>
          <li>{t("docs.chart-performance.shapes.canvas")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="perf-platforms">
        <h2 id="perf-platforms">
          {t("docs.chart-performance.platforms.title")}
        </h2>
        <p className={styles.prose}>
          <Trans
            i18nKey="docs.chart-performance.platforms.mini"
            components={{ mini: <Link to="/mini-program-charts" /> }}
          />
        </p>
        <p className={styles.prose}>
          <Trans
            i18nKey="docs.chart-performance.platforms.native"
            components={{ native: <Link to="/react-native" /> }}
          />
        </p>
        <p className={styles.prose}>
          {t("docs.chart-performance.platforms.primitives")}
        </p>
        <CodeBlock language="ts" code={primitivesExample} />
      </section>
    </DocPage>
  );
}
