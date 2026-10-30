// Indicators of a chart: built from the declarative options, computed into
// columns as large as the bar store, and recomputed from the first changed
// bar only (a tick recomputes one value per output).

import {
  emaInto,
  kdjInto,
  rmaInto,
  rsiInto,
  smaInto,
  stdevInto,
  trueRangeInto,
  vwapInto,
  wmaInto,
} from "./indicators";
import type { BarStore } from "./store";
import type { TradingIndicator, TradingPriceSource } from "./types";

/** How an output is drawn */
export type StudyOutputKind = "line" | "histogram" | "volume";

export interface StudyOutput {
  /** Legend label (`"MA7"`, `"DIF"`) */
  label: string;
  values: Float64Array;
  /** CSS color (may be a `var()`) */
  color: string;
  kind: StudyOutputKind;
  width: number;
}

export interface Study {
  id: string;
  type: TradingIndicator["type"];
  config: TradingIndicator;
  /** Drawn over the price (else in its own pane) */
  overlay: boolean;
  /** Legend title (`"MACD 12 26 9"`) */
  title: string;
  outputs: StudyOutput[];
  /** Fixed value range of the pane (RSI) */
  range?: readonly [number, number];
  /** Horizontal reference lines (RSI 30 / 70, KDJ 20 / 80, MACD 0) */
  bands?: readonly number[];
  /** Output indices filled between (Bollinger bands) */
  fill?: readonly [number, number];
  /** Default height of its pane */
  height: number;
  /** Values formatted as volumes (compact) rather than prices */
  compact: boolean;
  /** Recomputes the outputs from bar `from` on */
  compute(store: BarStore, from: number): void;
}

/** Default line colors: vivid hues readable on light and dark backgrounds */
export const LINE_COLORS = [
  "#f59e0b",
  "#a855f7",
  "#0ea5e9",
  "#ec4899",
  "#14b8a6",
  "#6366f1",
  "#84cc16",
];

const VIOLET = "#a855f7";
const INFO = "#0ea5e9";
const WARNING = "#f59e0b";

/** Default id of an indicator: its type and parameters */
export const indicatorKey = (indicator: TradingIndicator): string => {
  switch (indicator.type) {
    case "ma":
    case "ema":
    case "wma":
      return `${indicator.type}:${indicator.period}${
        indicator.source && indicator.source !== "close"
          ? `:${indicator.source}`
          : ""
      }`;
    case "boll":
      return `boll:${indicator.period ?? 20}:${indicator.multiplier ?? 2}`;
    case "vwap":
      return `vwap:${indicator.reset ?? "day"}`;
    case "volume":
      return "volume";
    case "macd":
      return `macd:${indicator.fast ?? 12}:${indicator.slow ?? 26}:${indicator.signal ?? 9}`;
    case "rsi":
      return `rsi:${indicator.period ?? 14}`;
    case "kdj":
      return `kdj:${indicator.period ?? 9}:${indicator.kPeriod ?? 3}:${indicator.dPeriod ?? 3}`;
    default:
      return `atr:${indicator.period ?? 14}`;
  }
};

/** Writes the price `source` of bars `from..n` into `out` */
const sourceInto = (
  store: BarStore,
  source: TradingPriceSource,
  out: Float64Array,
  from: number,
) => {
  const { open, high, low, close } = store;
  for (let i = from; i < store.length; i++) {
    switch (source) {
      case "open":
        out[i] = open[i];
        break;
      case "high":
        out[i] = high[i];
        break;
      case "low":
        out[i] = low[i];
        break;
      case "hl2":
        out[i] = (high[i] + low[i]) / 2;
        break;
      case "hlc3":
        out[i] = (high[i] + low[i] + close[i]) / 3;
        break;
      case "ohlc4":
        out[i] = (open[i] + high[i] + low[i] + close[i]) / 4;
        break;
      default:
        out[i] = close[i];
    }
  }
};

/**
 * Column set that grows with the store: `get(name)` returns a column of at
 * least `capacity` values, keeping the computed ones
 */
const columnPool = () => {
  const columns = new Map<string, Float64Array>();
  return (name: string, capacity: number): Float64Array => {
    const current = columns.get(name);
    if (current && current.length >= capacity) return current;
    const next = new Float64Array(capacity).fill(NaN);
    if (current) next.set(current);
    columns.set(name, next);
    return next;
  };
};

const output = (
  label: string,
  color: string,
  kind: StudyOutputKind = "line",
  width = 1.5,
): StudyOutput => ({
  label,
  values: new Float64Array(0),
  color,
  kind,
  width,
});

/**
 * Builds the runtime of an indicator. `colorIndex` picks the default color
 * of moving averages (one per average).
 */
export const createStudy = (
  config: TradingIndicator,
  id: string,
  colorIndex: number,
  utcOffset: number,
): Study => {
  const column = columnPool();
  const paneHeight = "height" in config && config.height ? config.height : 110;
  const base = {
    id,
    type: config.type,
    config,
    height: paneHeight,
    compact: false,
  };
  /** Attaches the output columns (grown with the store) before computing */
  const bind = (study: Study, store: BarStore, names: string[]) => {
    study.outputs.forEach((o, i) => {
      o.values = column(names[i] ?? `out${i}`, store.capacity);
    });
  };

  switch (config.type) {
    case "ma":
    case "ema":
    case "wma": {
      const period = Math.max(1, Math.floor(config.period) || 1);
      const source = config.source ?? "close";
      const label = `${config.type.toUpperCase()}${period}`;
      const kernel =
        config.type === "ma"
          ? smaInto
          : config.type === "ema"
            ? emaInto
            : wmaInto;
      const study: Study = {
        ...base,
        overlay: true,
        title: label,
        outputs: [
          output(
            label,
            config.color ?? LINE_COLORS[colorIndex % LINE_COLORS.length],
            "line",
            config.lineWidth ?? 1.5,
          ),
        ],
        compute(store, from) {
          bind(study, store, ["value"]);
          let src: Float64Array = store.close;
          if (source !== "close") {
            src = column("src", store.capacity);
            sourceInto(store, source, src, from);
          }
          kernel(src, store.length, period, study.outputs[0].values, from);
        },
      };
      return study;
    }
    case "boll": {
      const period = config.period ?? 20;
      const k = config.multiplier ?? 2;
      const [mid, up, low] = config.colors ?? [WARNING, INFO, INFO];
      const study: Study = {
        ...base,
        overlay: true,
        title: `BOLL ${period} ${k}`,
        outputs: [
          output("MID", mid ?? WARNING, "line", 1.25),
          output("UB", up ?? INFO, "line", 1.25),
          output("LB", low ?? up ?? INFO, "line", 1.25),
        ],
        ...(config.fill === false ? {} : { fill: [1, 2] as const }),
        compute(store, from) {
          bind(study, store, ["mid", "up", "low"]);
          const dev = column("dev", store.capacity);
          const [m, u, l] = study.outputs.map((o) => o.values);
          smaInto(store.close, store.length, period, m, from);
          stdevInto(store.close, store.length, period, dev, from);
          for (let i = from; i < store.length; i++) {
            u[i] = m[i] + k * dev[i];
            l[i] = m[i] - k * dev[i];
          }
        },
      };
      return study;
    }
    case "vwap": {
      const reset = config.reset ?? "day";
      const study: Study = {
        ...base,
        overlay: true,
        title: "VWAP",
        outputs: [output("VWAP", config.color ?? "#ec4899", "line", 1.5)],
        compute(store, from) {
          bind(study, store, ["value"]);
          vwapInto(
            store.high,
            store.low,
            store.close,
            store.volume,
            store.time,
            store.length,
            reset,
            utcOffset,
            study.outputs[0].values,
            column("pv", store.capacity),
            column("vol", store.capacity),
            from,
          );
        },
      };
      return study;
    }
    case "volume": {
      const maPeriod = config.maPeriod;
      const outputs = [output("VOL", "", "volume")];
      if (maPeriod) outputs.push(output(`MA${maPeriod}`, INFO, "line", 1.25));
      const study: Study = {
        ...base,
        overlay: !!config.overlay,
        compact: true,
        title: "VOL",
        outputs,
        compute(store, from) {
          bind(study, store, ["vol", "ma"]);
          const v = study.outputs[0].values;
          v.set(store.volume.subarray(from, store.length), from);
          if (maPeriod)
            smaInto(v, store.length, maPeriod, study.outputs[1].values, from);
        },
      };
      return study;
    }
    case "macd": {
      const fast = config.fast ?? 12;
      const slow = config.slow ?? 26;
      const signal = config.signal ?? 9;
      const [lineColor, signalColor] = config.colors ?? [INFO, WARNING];
      const study: Study = {
        ...base,
        overlay: false,
        title: `MACD ${fast} ${slow} ${signal}`,
        bands: [0],
        outputs: [
          output("MACD", "", "histogram"),
          output("DIF", lineColor ?? INFO, "line", 1.25),
          output("DEA", signalColor ?? WARNING, "line", 1.25),
        ],
        compute(store, from) {
          bind(study, store, ["hist", "dif", "dea"]);
          const n = store.length;
          const f = column("fast", store.capacity);
          const s = column("slow", store.capacity);
          const [hist, dif, dea] = study.outputs.map((o) => o.values);
          emaInto(store.close, n, fast, f, from);
          emaInto(store.close, n, slow, s, from);
          for (let i = from; i < n; i++) dif[i] = f[i] - s[i];
          emaInto(dif, n, signal, dea, from);
          for (let i = from; i < n; i++) hist[i] = dif[i] - dea[i];
        },
      };
      return study;
    }
    case "rsi": {
      const period = config.period ?? 14;
      const study: Study = {
        ...base,
        overlay: false,
        title: `RSI ${period}`,
        range: [0, 100],
        bands: [config.oversold ?? 30, config.overbought ?? 70],
        outputs: [output(`RSI${period}`, config.color ?? VIOLET, "line", 1.5)],
        compute(store, from) {
          bind(study, store, ["value"]);
          rsiInto(
            store.close,
            store.length,
            period,
            study.outputs[0].values,
            column("gain", store.capacity),
            column("loss", store.capacity),
            from,
          );
        },
      };
      return study;
    }
    case "kdj": {
      const period = config.period ?? 9;
      const kp = config.kPeriod ?? 3;
      const dp = config.dPeriod ?? 3;
      const [kc, dc, jc] = config.colors ?? [WARNING, INFO, VIOLET];
      const study: Study = {
        ...base,
        overlay: false,
        title: `KDJ ${period} ${kp} ${dp}`,
        bands: [20, 80],
        outputs: [
          output("K", kc ?? WARNING, "line", 1.25),
          output("D", dc ?? INFO, "line", 1.25),
          output("J", jc ?? VIOLET, "line", 1.25),
        ],
        compute(store, from) {
          bind(study, store, ["k", "d", "j"]);
          const [k, d, j] = study.outputs.map((o) => o.values);
          kdjInto(
            store.high,
            store.low,
            store.close,
            store.length,
            period,
            kp,
            dp,
            k,
            d,
            j,
            from,
          );
        },
      };
      return study;
    }
    default: {
      const period = config.period ?? 14;
      const study: Study = {
        ...base,
        overlay: false,
        title: `ATR ${period}`,
        outputs: [output(`ATR${period}`, config.color ?? INFO, "line", 1.5)],
        compute(store, from) {
          bind(study, store, ["value"]);
          const tr = column("tr", store.capacity);
          trueRangeInto(
            store.high,
            store.low,
            store.close,
            store.length,
            tr,
            from,
          );
          rmaInto(tr, store.length, period, study.outputs[0].values, from);
        },
      };
      return study;
    }
  }
};

/**
 * Builds the studies of `indicators`, reusing the previous runtime of an
 * indicator whose config is unchanged (same id and same parameters)
 */
export const buildStudies = (
  indicators: readonly TradingIndicator[],
  previous: readonly Study[],
  utcOffset: number,
): { studies: Study[]; reused: Set<Study> } => {
  const used = new Set<string>();
  const reused = new Set<Study>();
  let averages = 0;
  const studies = indicators.map((config) => {
    let id = config.id ?? indicatorKey(config);
    for (let k = 2; used.has(id); k++)
      id = `${config.id ?? indicatorKey(config)}#${k}`;
    used.add(id);
    const colorIndex =
      config.type === "ma" || config.type === "ema" || config.type === "wma"
        ? averages++
        : 0;
    const old = previous.find((s) => s.id === id);
    if (old && sameConfig(old.config, config)) {
      // same parameters: keep the computed values (visibility may differ)
      old.config = config;
      reused.add(old);
      return old;
    }
    return createStudy(config, id, colorIndex, utcOffset);
  });
  return { studies, reused };
};

const sameConfig = (a: TradingIndicator, b: TradingIndicator) => {
  if (a === b) return true;
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  keys.delete("visible");
  for (const key of keys) {
    const va = (a as unknown as Record<string, unknown>)[key];
    const vb = (b as unknown as Record<string, unknown>)[key];
    if (va === vb) continue;
    if (Array.isArray(va) && Array.isArray(vb) && va.join() === vb.join())
      continue;
    return false;
  }
  return true;
};
