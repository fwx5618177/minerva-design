import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  createChart,
  type ChartInstance,
  type ChartOptions,
  type ChartRendererPreference,
} from "minerva-design/charts/core";
import { Showcase, type ShowcaseChartProps } from "../showcase/Showcase";
import { useShowcaseFormat } from "../showcase/text";

const CHANNELS = 12;
/** Samples per channel and per second */
const RATE = 2_000;
/** Samples per channel on screen: a 10 s sliding window */
const WINDOW = 20_000;
/** Preallocated: the window slides inside, then is copied back to the start */
const CAPACITY = WINDOW * 4;
const STEP = 1000 / RATE;

interface Stream {
  x: Float64Array;
  y: Float64Array[];
  /** End of the filled part */
  end: number;
  /** Samples written so far */
  samples: number;
  start: number;
  random: () => number;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Appends `count` samples to every channel */
function append(stream: Stream, count: number) {
  const { x, y, random } = stream;
  if (stream.end + count > CAPACITY) {
    // slide: keep the last window, reuse the same memory
    const from = stream.end - WINDOW;
    x.copyWithin(0, from, stream.end);
    for (const column of y) column.copyWithin(0, from, stream.end);
    stream.end = WINDOW;
  }
  for (let i = 0; i < count; i++) {
    x[stream.end + i] = stream.start + (stream.samples + i) * STEP;
  }
  y.forEach((column, c) => {
    for (let i = 0; i < count; i++) {
      const t = (stream.samples + i) / RATE;
      const burst = Math.sin(t * 0.7 + c) > 0.85 ? 2.4 : 0;
      column[stream.end + i] =
        (CHANNELS - 1 - c) * 10 +
        Math.sin(2 * Math.PI * (1.5 + c * 0.6) * t) * 2.2 +
        Math.sin(2 * Math.PI * 0.25 * t + c) * 1.2 +
        Math.sin(2 * Math.PI * 23 * t) * burst +
        (random() - 0.5) * 1.6;
    }
  });
  stream.end += count;
  stream.samples += count;
}

function createStream(): Stream {
  const stream: Stream = {
    x: new Float64Array(CAPACITY),
    y: Array.from({ length: CHANNELS }, () => new Float64Array(CAPACITY)),
    end: 0,
    samples: 0,
    start: Date.now() - WINDOW * STEP,
    random: mulberry32(12),
  };
  append(stream, WINDOW);
  return stream;
}

interface Labels {
  channel: (index: number) => string;
  aria: string;
}

/** New subarray views of the filled part: a new identity, the same memory */
function optionsOf(
  stream: Stream,
  renderer: ChartRendererPreference,
  labels: Labels,
): ChartOptions {
  const from = Math.max(0, stream.end - WINDOW);
  const x = stream.x.subarray(from, stream.end);
  return {
    series: stream.y.map((column, c) => ({
      id: `channel-${c}`,
      name: labels.channel(c + 1),
      data: { x, y: column.subarray(from, stream.end) },
      lineWidth: 1,
    })),
    renderer,
    xAxis: { type: "time" },
    yAxis: { min: -6, max: CHANNELS * 10 - 4, visible: false },
    legend: false,
    tooltip: { mode: "nearest" },
    interaction: false,
    ariaLabel: labels.aria,
  };
}

function Channels({
  renderer,
  running,
  onRendererChange,
}: ShowcaseChartProps<boolean>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<ChartInstance | null>(null);
  const streamRef = useRef<Stream | null>(null);
  const labels: Labels = {
    channel: (index) => t("channel", { index }),
    aria: t("streamAria", { value: CHANNELS }),
  };
  const latest = useRef({ labels, renderer, onRendererChange });
  useEffect(() => {
    latest.current = { labels, renderer, onRendererChange };
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const stream = createStream();
    streamRef.current = stream;
    const { renderer: initial, labels: initialLabels } = latest.current;
    const instance = createChart(
      container,
      optionsOf(stream, initial, initialLabels),
    );
    instanceRef.current = instance;
    const off = instance.on("renderer", (kind) =>
      latest.current.onRendererChange(kind),
    );
    return () => {
      off();
      instance.destroy();
      instanceRef.current = null;
      streamRef.current = null;
    };
  }, []);

  // a new backend: the chart starts it and redraws
  useEffect(() => {
    const stream = streamRef.current;
    if (stream)
      instanceRef.current?.setOptions(
        optionsOf(stream, renderer, latest.current.labels),
      );
  }, [renderer]);

  // one setOptions per frame, however many samples arrived
  useEffect(() => {
    if (!running) return;
    let id = 0;
    let last = 0;
    let pending = 0;
    const tick = (time: number) => {
      id = requestAnimationFrame(tick);
      const stream = streamRef.current;
      const instance = instanceRef.current;
      if (!stream || !instance) return;
      pending += (Math.min(100, last ? time - last : 16) * RATE) / 1000;
      last = time;
      const count = Math.floor(pending);
      if (!count) return;
      pending -= count;
      append(stream, count);
      const { renderer: current, labels: names } = latest.current;
      instance.setOptions(optionsOf(stream, current, names));
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [running]);

  return <div ref={containerRef} style={{ height: 400, width: "100%" }} />;
}

const ready = () => Promise.resolve(true);

export default function StreamingDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const { compact } = useShowcaseFormat();
  return (
    <Showcase
      load={ready}
      chart={Channels}
      count={CHANNELS * WINDOW}
      countLabel={t("stats.points")}
      height={400}
      motionLabel={t("stream")}
      hint={t("hintStream")}
      extra={{
        label: t("stats.ingest"),
        value: t("perSecond", { value: compact(CHANNELS * RATE) }),
      }}
    />
  );
}
