import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";
import { collectDemos } from "@/docs/demos";

const demos = collectDemos(
  import.meta.glob<React.ComponentType>("./demos/*.tsx", {
    eager: true,
    import: "default",
  }),
  import.meta.glob<string>("./demos/*.tsx", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);

const importCode = `import { Chart } from "minerva-design/charts";
import {
  setDefaultChartRenderer,
  type ChartRendererKind,
} from "minerva-design/charts/core";`;

const chainExample = `// default: the first backend that starts, best first
<LineChart series={series} />                     // renderer="auto"

// a forced backend; if it cannot start, the next one in the chain
<LineChart series={series} renderer="webgl2" />

// which backend is drawing (again after a fallback)
<LineChart
  series={series}
  onRendererChange={(kind: ChartRendererKind) => setBackend(kind)}
/>

// every chart whose renderer is unset or "auto", in every framework
setDefaultChartRenderer("canvas2d");`;

const scoreExample = `const budget = 1000 / refreshRate; // ms per frame: 16.7 at 60 Hz

const smooth = clamp(fps / refreshRate); // keeps up with the display
const stability = clamp(budget / p95FrameTime); // no long frames
const headroom = clamp(1 - mainThreadPerFrame / budget); // CPU left for the app
const startup = clamp(1 - timeToFirstFrame / 1000); // chart on screen quickly

const score = Math.round(
  100 * (0.4 * smooth + 0.2 * stability + 0.25 * headroom + 0.15 * startup),
); // clamp: between 0 and 1`;

const BACKENDS = ["webgpu", "webgl2", "webgl", "canvas2d"] as const;

const MATRIX = [
  "api",
  "shaders",
  "draw",
  "zoom",
  "lines",
  "scatter",
  "antialias",
  "contexts",
  "loss",
  "start",
  "fit",
] as const;

const BROWSERS = [
  "chrome",
  "firefox",
  "safari",
  "ios",
  "android",
  "linux",
] as const;

type Kind = (typeof BACKENDS)[number];

/**
 * One run of the benchmark demo on the machine described in
 * `sample.text`: [score, main-thread ms per frame, fps] per backend
 */
const SAMPLE: readonly {
  workload: "line" | "scatter" | "bars";
  count: number;
  results: Record<Kind, readonly [number, number, number]>;
}[] = [
  {
    workload: "line",
    count: 1_000_000,
    results: {
      webgpu: [96, 2.0, 60],
      webgl2: [96, 2.0, 60],
      webgl: [96, 2.0, 60],
      canvas2d: [96, 2.3, 60],
    },
  },
  {
    workload: "line",
    count: 2_000_000,
    results: {
      webgpu: [96, 2.0, 60],
      webgl2: [97, 0.9, 60],
      webgl: [97, 1.1, 60],
      canvas2d: [96, 1.7, 60],
    },
  },
  {
    workload: "scatter",
    count: 100_000,
    results: {
      webgpu: [98, 1.1, 60],
      webgl2: [92, 3.4, 60],
      webgl: [94, 3.4, 60],
      canvas2d: [87, 8.2, 60],
    },
  },
  {
    workload: "scatter",
    count: 1_000_000,
    results: {
      webgpu: [96, 2.1, 60],
      webgl2: [96, 2.2, 60],
      webgl: [96, 2.1, 60],
      canvas2d: [69, 11.7, 57],
    },
  },
  {
    workload: "scatter",
    count: 2_000_000,
    results: {
      webgpu: [95, 2.3, 60],
      webgl2: [96, 1.5, 60],
      webgl: [97, 0.8, 60],
      canvas2d: [55, 20.6, 49],
    },
  },
  {
    workload: "bars",
    count: 200_000,
    results: {
      webgpu: [96, 2.1, 60],
      webgl2: [98, 1.1, 60],
      webgl: [98, 0.6, 60],
      canvas2d: [96, 1.8, 60],
    },
  },
];

function SampleResults() {
  const { t, i18n } = useTranslation();
  const compact = new Intl.NumberFormat(i18n.language, {
    notation: "compact",
  });
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return (
    <div
      className={styles.tableWrapper}
      tabIndex={0}
      role="region"
      aria-label={t("docs.chart-renderers.sample.title")}
    >
      <table className={styles.propsTable}>
        <thead>
          <tr>
            <th scope="col">{t("docs.chart-renderers.sample.corner")}</th>
            {BACKENDS.map((kind) => (
              <th scope="col" key={kind}>
                {t(`docs.chart-renderers.data.renderers.${kind}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SAMPLE.map(({ workload, count, results }) => (
            <tr key={`${workload}-${count}`}>
              <th scope="row" className={styles.propName}>
                {t("docs.chart-renderers.sample.workload", {
                  workload: t(
                    `docs.chart-renderers.data.workloads.${workload}`,
                  ),
                  count: compact.format(count),
                })}
              </th>
              {BACKENDS.map((kind) => {
                const [score, work, fps] = results[kind];
                return (
                  <td key={kind}>
                    <strong>{score}</strong>
                    {" · "}
                    {t("docs.chart-renderers.data.ms", {
                      value: decimal.format(work),
                    })}
                    {fps < 59 &&
                      ` · ${t("docs.chart-renderers.data.fps", { value: fps })}`}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Rows (aspects or browsers) × the four backends */
function Grid({
  prefix,
  rows,
  label,
}: {
  prefix: string;
  rows: readonly string[];
  label: string;
}) {
  const { t } = useTranslation();
  return (
    <div
      className={styles.tableWrapper}
      tabIndex={0}
      role="region"
      aria-label={label}
    >
      <table className={styles.propsTable}>
        <thead>
          <tr>
            <th scope="col">{t(`${prefix}.corner`)}</th>
            {BACKENDS.map((kind) => (
              <th scope="col" key={kind}>
                {t(`docs.chart-renderers.data.renderers.${kind}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              <th scope="row" className={styles.propName}>
                {t(`${prefix}.rows.${row}.label`)}
              </th>
              {BACKENDS.map((kind) => (
                <td key={kind}>{t(`${prefix}.rows.${row}.${kind}`)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ChartRenderersDoc() {
  const { t } = useTranslation();

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="renderers-chain">
        <h2 id="renderers-chain">{t("docs.chart-renderers.chain.title")}</h2>
        <p className={styles.prose}>{t("docs.chart-renderers.chain.text")}</p>
        <ul className={styles.prose}>
          <li>{t("docs.chart-renderers.chain.auto")}</li>
          <li>{t("docs.chart-renderers.chain.software")}</li>
          <li>{t("docs.chart-renderers.chain.forced")}</li>
          <li>{t("docs.chart-renderers.chain.lost")}</li>
          <li>{t("docs.chart-renderers.chain.global")}</li>
        </ul>
        <CodeBlock language="tsx" code={chainExample} />
      </section>

      <section className={styles.section} aria-labelledby="renderers-matrix">
        <h2 id="renderers-matrix">{t("docs.chart-renderers.matrix.title")}</h2>
        <p className={styles.prose}>{t("docs.chart-renderers.matrix.text")}</p>
        <Grid
          prefix="docs.chart-renderers.matrix"
          rows={MATRIX}
          label={t("docs.chart-renderers.matrix.title")}
        />
      </section>

      <section className={styles.section} aria-labelledby="renderers-expect">
        <h2 id="renderers-expect">{t("docs.chart-renderers.expect.title")}</h2>
        <p className={styles.prose}>{t("docs.chart-renderers.expect.text")}</p>
        <ul className={styles.prose}>
          <li>{t("docs.chart-renderers.expect.small")}</li>
          <li>{t("docs.chart-renderers.expect.medium")}</li>
          <li>{t("docs.chart-renderers.expect.large")}</li>
          <li>{t("docs.chart-renderers.expect.bars")}</li>
          <li>{t("docs.chart-renderers.expect.gpus")}</li>
          <li>{t("docs.chart-renderers.expect.startup")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="renderers-sample">
        <h2 id="renderers-sample">{t("docs.chart-renderers.sample.title")}</h2>
        <p className={styles.prose}>{t("docs.chart-renderers.sample.text")}</p>
        <SampleResults />
        <p className={styles.prose}>{t("docs.chart-renderers.sample.note")}</p>
      </section>
    </>
  );

  return (
    <DocPage
      id="chart-renderers"
      demos={demos}
      intro={intro}
      importCode={importCode}
    >
      <section className={styles.section} aria-labelledby="renderers-score">
        <h2 id="renderers-score">{t("docs.chart-renderers.score.title")}</h2>
        <p className={styles.prose}>{t("docs.chart-renderers.score.text")}</p>
        <ul className={styles.prose}>
          <li>{t("docs.chart-renderers.score.smooth")}</li>
          <li>{t("docs.chart-renderers.score.stability")}</li>
          <li>{t("docs.chart-renderers.score.headroom")}</li>
          <li>{t("docs.chart-renderers.score.startup")}</li>
        </ul>
        <CodeBlock language="ts" code={scoreExample} />
        <p className={styles.prose}>{t("docs.chart-renderers.score.grades")}</p>
      </section>

      <section className={styles.section} aria-labelledby="renderers-method">
        <h2 id="renderers-method">{t("docs.chart-renderers.method.title")}</h2>
        <p className={styles.prose}>{t("docs.chart-renderers.method.text")}</p>
        <ul className={styles.prose}>
          <li>{t("docs.chart-renderers.method.same")}</li>
          <li>{t("docs.chart-renderers.method.work")}</li>
          <li>{t("docs.chart-renderers.method.vsync")}</li>
          <li>{t("docs.chart-renderers.method.gpu")}</li>
          <li>{t("docs.chart-renderers.method.noise")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="renderers-browsers">
        <h2 id="renderers-browsers">
          {t("docs.chart-renderers.browsers.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.chart-renderers.browsers.text")}
        </p>
        <Grid
          prefix="docs.chart-renderers.browsers"
          rows={BROWSERS}
          label={t("docs.chart-renderers.browsers.title")}
        />
        <p className={styles.prose}>
          {t("docs.chart-renderers.browsers.note")}
        </p>
      </section>

      <section className={styles.section} aria-labelledby="renderers-choose">
        <h2 id="renderers-choose">{t("docs.chart-renderers.choose.title")}</h2>
        <ul className={styles.prose}>
          <li>{t("docs.chart-renderers.choose.auto")}</li>
          <li>{t("docs.chart-renderers.choose.webgpu")}</li>
          <li>{t("docs.chart-renderers.choose.webgl2")}</li>
          <li>{t("docs.chart-renderers.choose.webgl")}</li>
          <li>{t("docs.chart-renderers.choose.canvas2d")}</li>
          <li>{t("docs.chart-renderers.choose.many")}</li>
        </ul>
        <p className={styles.prose}>
          <Trans
            i18nKey="docs.chart-renderers.choose.more"
            components={{
              performance: <Link to="/chart-performance" />,
              engine: <Link to="/chart-engine" />,
            }}
          />
        </p>
      </section>
    </DocPage>
  );
}
