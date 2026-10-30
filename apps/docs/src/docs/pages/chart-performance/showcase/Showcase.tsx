import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type RefObject,
} from "react";
import { useTranslation } from "react-i18next";
import { LoadingState, Radio, RadioGroup, Switch } from "minerva-design";
import type {
  ChartHandle,
  ChartRendererKind,
  ChartRendererPreference,
  ChartView,
} from "minerva-design/charts";
import type { Range } from "./data";
import {
  afterNextPaint,
  prefersReducedMotion,
  useFrameLoop,
  useInView,
} from "./meter";
import { RENDERERS, fpsClass, useShowcaseFormat } from "./text";
import styles from "./showcase.module.scss";

/** Stops the tour when a frame takes longer than this (ms of main thread) */
const SLOW_FRAME = 250;

/** Props a showcase gives to its chart component */
export interface ShowcaseChartProps<T> {
  /** The generated data set */
  data: T;
  /** Chart handle (the camera tour moves the view through it) */
  chartRef: RefObject<ChartHandle | null>;
  /** Backend picked in the selector */
  renderer: ChartRendererPreference;
  /** Reports the backend that actually started */
  onRendererChange: (kind: ChartRendererKind) => void;
  /** Fits the y axis to the zoomed x range */
  onZoom: (view: ChartView) => void;
  /** On screen and not paused (streaming demos run while true) */
  running: boolean;
}

export interface ShowcaseProps<T> {
  /** Loads the data set (generated once, when the showcase nears the screen) */
  load: () => Promise<T>;
  /** Draws the data set */
  chart: ComponentType<ShowcaseChartProps<T>>;
  /** Number of marks drawn */
  count: number;
  /** What `count` counts ("Points", "Cells", ...) */
  countLabel: string;
  /** Height of the chart in px */
  height: number;
  /** Label of the motion switch (camera tour, stream) */
  motionLabel: string;
  /** Interaction hint under the chart */
  hint: string;
  /** Camera path: the view at `time` seconds into the tour */
  tour?: (data: T, time: number, base: ChartView) => Partial<ChartView>;
  /** The y range to show for an x range (zoomable x only) */
  fit?: (data: T, x: Range) => Range | null;
  /** One more statistic */
  extra?: { label: string; value: string };
}

/**
 * A chart under test: renderer selector, live statistics (frame rate,
 * frame time, main-thread time, marks, time to first frame), a camera tour
 * and the backend that actually started. The data is generated when the
 * showcase nears the screen; the loop only runs while it is visible.
 */
export function Showcase<T>({
  load,
  chart: Plot,
  count,
  countLabel,
  height,
  motionLabel,
  hint,
  tour,
  fit,
  extra,
}: ShowcaseProps<T>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const text = useShowcaseFormat();
  const rootRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartHandle>(null);
  const near = useInView(rootRef, "300px");
  const visible = useInView(rootRef);
  const [data, setData] = useState<{ value: T } | null>(null);
  const [renderer, setRenderer] = useState<ChartRendererPreference>("auto");
  const [actual, setActual] = useState<ChartRendererKind | null>(null);
  const [motion, setMotion] = useState(() => !prefersReducedMotion());
  const [slow, setSlow] = useState<number | null>(null);
  const [startup, setStartup] = useState<number | null>(null);
  /** When the data was handed to the chart or the backend was switched */
  const startRef = useRef(0);
  const tourRef = useRef<{ start: number; base: ChartView } | null>(null);
  /** Consecutive slow frames of the tour */
  const slowFramesRef = useRef(0);

  useEffect(() => {
    if (!near || data) return;
    let cancelled = false;
    void load().then((value) => {
      if (cancelled) return;
      startRef.current = performance.now();
      setData({ value });
    });
    return () => {
      cancelled = true;
    };
  }, [near, data, load]);

  // the tour stops as soon as the user zooms, pans or uses the keyboard
  useEffect(() => {
    const plot = plotRef.current;
    if (!plot) return;
    const stop = () => setMotion(false);
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) stop();
    };
    const onKey = (event: KeyboardEvent) => {
      if (/^(Arrow|\+|-|=|0|Home|End)/.test(event.key)) stop();
    };
    plot.addEventListener("pointerdown", stop);
    plot.addEventListener("wheel", onWheel, { passive: true });
    plot.addEventListener("keydown", onKey);
    return () => {
      plot.removeEventListener("pointerdown", stop);
      plot.removeEventListener("wheel", onWheel);
      plot.removeEventListener("keydown", onKey);
    };
  }, []);

  const animating = motion && slow === null;
  const running = visible && !!data;

  const stats = useFrameLoop(running, {
    onFrame: (time) => {
      const instance = chartRef.current?.getInstance();
      // starts once the first frame (the costly one: buffers) is painted
      if (!tour || !animating || !data || startup === null || !instance) {
        tourRef.current = null;
        return;
      }
      let state = tourRef.current;
      if (!state) {
        instance.resetZoom();
        state = { start: time, base: instance.getView() };
        tourRef.current = state;
        slowFramesRef.current = 0;
      }
      const view = tour(data.value, (time - state.start) / 1000, state.base);
      if (fit && view.x && !view.y) {
        const y = fit(data.value, view.x);
        if (y) view.y = y;
      }
      instance.setView(view);
    },
    onWork: (ms) => {
      if (!tourRef.current) return;
      // two slow frames in a row (or a very slow one): this backend cannot
      // animate the data set here
      slowFramesRef.current = ms > SLOW_FRAME ? slowFramesRef.current + 1 : 0;
      if (slowFramesRef.current >= 2 || ms > SLOW_FRAME * 4) {
        tourRef.current = null;
        setSlow(ms);
      }
    },
  });

  const onRendererChange = (kind: ChartRendererKind) => {
    setActual(kind);
    afterNextPaint(() => setStartup(performance.now() - startRef.current));
  };
  const onZoom = (view: ChartView) => {
    if (!fit || !data) return;
    const y = fit(data.value, view.x);
    if (y) chartRef.current?.setView({ y });
  };

  let status: ReactNode = t("status.starting");
  if (slow !== null) {
    status = (
      <span className={styles.fallback}>
        {t("status.slow", { ms: text.ms(slow) })}
      </span>
    );
  } else if (actual && renderer === "auto") {
    status =
      actual === "canvas2d"
        ? t("status.autoCanvas", { backend: text.renderer(actual) })
        : t("status.auto", { backend: text.renderer(actual) });
  } else if (actual && actual === renderer) {
    status = t("status.forced", { backend: text.renderer(actual) });
  } else if (actual) {
    status = (
      <span className={styles.fallback}>
        {t("status.fallback", {
          requested: text.renderer(renderer),
          backend: text.renderer(actual),
        })}
      </span>
    );
  }

  return (
    <div ref={rootRef} className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("renderer")}
          direction="horizontal"
          size="small"
          value={renderer}
          onChange={(value) => {
            startRef.current = performance.now();
            setRenderer(value as ChartRendererPreference);
            setActual(null);
            setStartup(null);
            setSlow(null);
          }}
        >
          {RENDERERS.map((kind) => (
            <Radio key={kind} value={kind} label={text.renderer(kind)} />
          ))}
        </RadioGroup>
        <Switch
          size="small"
          checked={motion}
          label={motionLabel}
          onChange={(checked) => {
            setMotion(checked);
            setSlow(null);
          }}
        />
      </div>

      <dl className={styles.hud}>
        <div className={styles.stat}>
          <dt>{t("stats.renderer")}</dt>
          <dd>{actual ? text.renderer(actual) : "…"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.fps")}</dt>
          <dd className={stats ? fpsClass(stats.fps) : undefined}>
            {stats ? text.count(stats.fps) : "–"}
          </dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.frame")}</dt>
          <dd>{stats ? text.ms(stats.frame) : "–"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.work")}</dt>
          <dd>{stats ? text.ms(stats.work) : "–"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{countLabel}</dt>
          <dd title={text.count(count)}>{text.compact(count)}</dd>
        </div>
        {extra && (
          <div className={styles.stat}>
            <dt>{extra.label}</dt>
            <dd>{extra.value}</dd>
          </div>
        )}
        <div className={styles.stat}>
          <dt>{t("stats.startup")}</dt>
          <dd>{startup !== null ? text.ms(startup) : "–"}</dd>
        </div>
      </dl>

      <div ref={plotRef} className={styles.chart}>
        {data ? (
          <Plot
            data={data.value}
            chartRef={chartRef}
            renderer={renderer}
            onRendererChange={onRendererChange}
            onZoom={onZoom}
            running={running && motion}
          />
        ) : (
          <LoadingState
            className={styles.loading}
            style={{ height }}
            size="small"
            label={t("loading", { value: text.count(count) })}
          />
        )}
      </div>

      <div className={styles.footer}>
        <p role="status">{status}</p>
        <p className={styles.hint}>{hint}</p>
      </div>
    </div>
  );
}
