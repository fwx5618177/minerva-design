// Indicators of a chart: built from the declarative options, computed into
// columns as large as the bar store, and recomputed from the first changed
// bar only (a tick recomputes one value per output).

import {
  cciInto,
  dmiInto,
  donchianInto,
  emaInto,
  ichimokuInto,
  kdjInto,
  keltnerInto,
  mfiInto,
  obvInto,
  psarInto,
  rmaInto,
  rsiInto,
  smaInto,
  stdevInto,
  stochRsiInto,
  supertrendInto,
  trueRangeInto,
  vwapInto,
  williamsRInto,
  wmaInto,
} from "./indicators";
import type { UtcOffset } from "./format";
import type { BarStore } from "./store";
import type { TradingIndicator, TradingPriceSource } from "./types";

/**
 * How an output is drawn: a line, a histogram around zero (colored by
 * sign and slope), the volume bars, or dots (colored by their side of the
 * close, like the parabolic SAR)
 */
export type StudyOutputKind = "line" | "histogram" | "volume" | "dots";

export interface StudyOutput {
  /** Legend label (`"MA7"`, `"DIF"`) */
  label: string;
  values: Float64Array;
  /**
   * CSS color (may be a `var()`); `"up"` / `"down"` stand for the colors
   * of rising / falling bars
   */
  color: string;
  kind: StudyOutputKind;
  width: number;
  /** Drawn this many bars later (Ichimoku spans ahead, lagging span back) */
  shift: number;
  /** Opacity of the line (1: opaque) */
  alpha: number;
}

/** Area filled between two outputs */
export interface StudyFill {
  /** Output indices */
  a: number;
  b: number;
  /** Color while `a` is above `b` */
  color: string;
  /** Color while `a` is below `b` (the same color by default) */
  colorBelow?: string;
  opacity: number;
}

export interface Study {
  id: string;
  type: TradingIndicator["type"];
  config: TradingIndicator;
  /** Drawn over the price (else in its own pane) */
  overlay: boolean;
  /** Legend title (`"MACD 12 26 9"`); the parameters when `titleKey` is set */
  title: string;
  /** Localized name before the parameters in the legend */
  titleKey?: "ichimoku" | "supertrend";
  outputs: StudyOutput[];
  /** Fixed value range of the pane (RSI) */
  range?: readonly [number, number];
  /** Horizontal reference lines (RSI 30 / 70, KDJ 20 / 80, MACD 0) */
  bands?: readonly number[];
  /** Shades the space between the first two bands (RSI, MFI, CCI...) */
  bandFill?: boolean;
  /** Areas filled between outputs (channels, Ichimoku cloud) */
  fills: StudyFill[];
  /** Legend values without their labels (channels: the colors say it) */
  plainLegend?: boolean;
  /** A single legend value: the first finite output (SuperTrend) */
  mergeLegend?: boolean;
  /** The pane keeps 0 in view (MACD, OBV) */
  zero?: boolean;
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
const TEAL = "#14b8a6";
const INDIGO = "#6366f1";
const PINK = "#ec4899";
const BLUE = "#2962ff";

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
    case "psar":
      return `psar:${indicator.start ?? 0.02}:${indicator.increment ?? indicator.start ?? 0.02}:${indicator.maximum ?? 0.2}`;
    case "ichimoku":
      return `ichimoku:${indicator.conversionPeriod ?? 9}:${indicator.basePeriod ?? 26}:${indicator.spanBPeriod ?? 52}:${indicator.displacement ?? 26}`;
    case "supertrend":
      return `supertrend:${indicator.period ?? 10}:${indicator.multiplier ?? 3}`;
    case "keltner":
      return `keltner:${indicator.period ?? 20}:${indicator.multiplier ?? 2}:${indicator.atrPeriod ?? 10}`;
    case "donchian":
      return `donchian:${indicator.period ?? 20}`;
    case "obv":
      return "obv";
    case "cci":
      return `cci:${indicator.period ?? 20}`;
    case "stochRsi":
      return `stochRsi:${indicator.rsiPeriod ?? 14}:${indicator.stochPeriod ?? 14}:${indicator.kPeriod ?? 3}:${indicator.dPeriod ?? 3}`;
    case "dmi":
      return `dmi:${indicator.period ?? 14}:${indicator.adxPeriod ?? 14}`;
    case "williamsR":
      return `williamsR:${indicator.period ?? 14}`;
    case "mfi":
      return `mfi:${indicator.period ?? 14}`;
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
  shift = 0,
  alpha = 1,
): StudyOutput => ({
  label,
  values: new Float64Array(0),
  color,
  kind,
  width,
  shift,
  alpha,
});

/**
 * Builds the runtime of an indicator. `colorIndex` picks the default color
 * of moving averages (one per average).
 */
export const createStudy = (
  config: TradingIndicator,
  id: string,
  colorIndex: number,
  utcOffset: UtcOffset,
): Study => {
  const column = columnPool();
  const paneHeight = "height" in config && config.height ? config.height : 110;
  const base = {
    id,
    type: config.type,
    config,
    height: paneHeight,
    compact: false,
    fills: [] as StudyFill[],
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
        plainLegend: true,
        outputs: [
          output("MID", mid ?? WARNING, "line", 1.25),
          output("UB", up ?? INFO, "line", 1.25),
          output("LB", low ?? up ?? INFO, "line", 1.25),
        ],
        fills:
          config.fill === false
            ? []
            : [{ a: 1, b: 2, color: up ?? INFO, opacity: 0.07 }],
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
        zero: true,
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
        bandFill: true,
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
    case "psar": {
      const start = config.start ?? 0.02;
      const increment = config.increment ?? start;
      const maximum = config.maximum ?? 0.2;
      const study: Study = {
        ...base,
        overlay: true,
        title: `SAR ${start} ${increment} ${maximum}`,
        outputs: [output("SAR", config.color ?? "", "dots", 1.5)],
        compute(store, from) {
          bind(study, store, ["value"]);
          psarInto(
            store.high,
            store.low,
            store.length,
            start,
            increment,
            maximum,
            study.outputs[0].values,
            {
              ep: column("ep", store.capacity),
              af: column("af", store.capacity),
              trend: column("trend", store.capacity),
            },
            from,
          );
        },
      };
      return study;
    }
    case "ichimoku": {
      const cp = config.conversionPeriod ?? 9;
      const bp = config.basePeriod ?? 26;
      const sp = config.spanBPeriod ?? 52;
      const shift = Math.max(1, Math.floor(config.displacement ?? 26)) - 1;
      const [cc, bc, lc, ac, sc] = config.colors ?? [];
      const study: Study = {
        ...base,
        overlay: true,
        title: `${cp} ${bp} ${sp} ${shift + 1}`,
        titleKey: "ichimoku",
        plainLegend: true,
        outputs: [
          output("CONV", cc ?? BLUE, "line", 1.25),
          output("BASE", bc ?? "#e65100", "line", 1.25),
          output("LAG", lc ?? "#43a047", "line", 1.25, -shift),
          output("A", ac ?? "up", "line", 1, shift, 0.55),
          output("B", sc ?? "down", "line", 1, shift, 0.55),
        ],
        fills:
          config.cloud === false
            ? []
            : [
                {
                  a: 3,
                  b: 4,
                  color: ac ?? "up",
                  colorBelow: sc ?? "down",
                  opacity: 0.12,
                },
              ],
        compute(store, from) {
          bind(study, store, ["conv", "base", "lag", "a", "b"]);
          const [conv, kijun, lag, a, b] = study.outputs.map((o) => o.values);
          ichimokuInto(
            store.high,
            store.low,
            store.length,
            cp,
            bp,
            sp,
            conv,
            kijun,
            a,
            b,
            {
              highest: column("highest", store.capacity),
              lowest: column("lowest", store.capacity),
            },
            from,
          );
          lag.set(store.close.subarray(from, store.length), from);
        },
      };
      return study;
    }
    case "supertrend": {
      const period = config.period ?? 10;
      const k = config.multiplier ?? 3;
      const study: Study = {
        ...base,
        overlay: true,
        title: `${period} ${k}`,
        titleKey: "supertrend",
        mergeLegend: true,
        outputs: [
          output("UP", config.upColor ?? "up", "line", 2),
          output("DOWN", config.downColor ?? "down", "line", 2),
        ],
        compute(store, from) {
          bind(study, store, ["up", "down"]);
          const value = column("value", store.capacity);
          const direction = column("direction", store.capacity);
          supertrendInto(
            store.high,
            store.low,
            store.close,
            store.length,
            period,
            k,
            value,
            direction,
            {
              tr: column("tr", store.capacity),
              atr: column("atr", store.capacity),
              upper: column("upper", store.capacity),
              lower: column("lower", store.capacity),
            },
            from,
          );
          const [up, down] = study.outputs.map((o) => o.values);
          for (let i = from; i < store.length; i++) {
            up[i] = direction[i] === 1 ? value[i] : NaN;
            down[i] = direction[i] === -1 ? value[i] : NaN;
          }
        },
      };
      return study;
    }
    case "keltner":
    case "donchian": {
      const keltner = config.type === "keltner";
      const period = config.period ?? 20;
      const k = keltner ? (config.multiplier ?? 2) : 0;
      const atrPeriod = keltner ? (config.atrPeriod ?? 10) : 0;
      const band = keltner ? TEAL : INDIGO;
      const [mid, up, low] = config.colors ?? [WARNING, band, band];
      const study: Study = {
        ...base,
        overlay: true,
        title: keltner ? `KC ${period} ${k} ${atrPeriod}` : `DC ${period}`,
        plainLegend: true,
        outputs: [
          output("MID", mid ?? WARNING, "line", 1.25),
          output("UB", up ?? band, "line", 1.25),
          output("LB", low ?? up ?? band, "line", 1.25),
        ],
        fills:
          config.fill === false
            ? []
            : [{ a: 1, b: 2, color: up ?? band, opacity: 0.07 }],
        compute(store, from) {
          bind(study, store, ["mid", "up", "low"]);
          const [m, u, l] = study.outputs.map((o) => o.values);
          if (keltner) {
            keltnerInto(
              store.high,
              store.low,
              store.close,
              store.length,
              period,
              k,
              atrPeriod,
              m,
              u,
              l,
              {
                tr: column("tr", store.capacity),
                atr: column("atr", store.capacity),
              },
              from,
            );
          } else {
            donchianInto(
              store.high,
              store.low,
              store.length,
              period,
              u,
              l,
              m,
              from,
            );
          }
        },
      };
      return study;
    }
    case "obv": {
      const maPeriod = config.maPeriod;
      const outputs = [output("OBV", config.color ?? INFO, "line", 1.5)];
      if (maPeriod)
        outputs.push(output(`MA${maPeriod}`, WARNING, "line", 1.25));
      const study: Study = {
        ...base,
        overlay: false,
        compact: true,
        title: "OBV",
        outputs,
        compute(store, from) {
          bind(study, store, ["obv", "ma"]);
          const v = study.outputs[0].values;
          obvInto(store.close, store.volume, store.length, v, from);
          if (maPeriod)
            smaInto(v, store.length, maPeriod, study.outputs[1].values, from);
        },
      };
      return study;
    }
    case "cci": {
      const period = config.period ?? 20;
      const study: Study = {
        ...base,
        overlay: false,
        title: `CCI ${period}`,
        bands: [-100, 100],
        bandFill: true,
        outputs: [output(`CCI${period}`, config.color ?? TEAL, "line", 1.5)],
        compute(store, from) {
          bind(study, store, ["value"]);
          cciInto(
            store.high,
            store.low,
            store.close,
            store.length,
            period,
            study.outputs[0].values,
            column("typical", store.capacity),
            column("mean", store.capacity),
            from,
          );
        },
      };
      return study;
    }
    case "stochRsi": {
      const rp = config.rsiPeriod ?? 14;
      const sp = config.stochPeriod ?? 14;
      const kp = config.kPeriod ?? 3;
      const dp = config.dPeriod ?? 3;
      const [kc, dc] = config.colors ?? [INFO, WARNING];
      const study: Study = {
        ...base,
        overlay: false,
        title: `Stoch RSI ${rp} ${sp} ${kp} ${dp}`,
        range: [0, 100],
        bands: [20, 80],
        bandFill: true,
        outputs: [
          output("K", kc ?? INFO, "line", 1.25),
          output("D", dc ?? WARNING, "line", 1.25),
        ],
        compute(store, from) {
          bind(study, store, ["k", "d"]);
          const [k, d] = study.outputs.map((o) => o.values);
          stochRsiInto(
            store.close,
            store.length,
            rp,
            sp,
            kp,
            dp,
            k,
            d,
            {
              rsi: column("rsi", store.capacity),
              gain: column("gain", store.capacity),
              loss: column("loss", store.capacity),
              highest: column("highest", store.capacity),
              lowest: column("lowest", store.capacity),
              raw: column("raw", store.capacity),
            },
            from,
          );
        },
      };
      return study;
    }
    case "dmi": {
      const period = config.period ?? 14;
      const adxPeriod = config.adxPeriod ?? 14;
      const [pc, mc, ac] = config.colors ?? ["up", "down", WARNING];
      const study: Study = {
        ...base,
        overlay: false,
        title: `DMI ${period} ${adxPeriod}`,
        bands: [25],
        outputs: [
          output("+DI", pc ?? "up", "line", 1.25),
          output("−DI", mc ?? "down", "line", 1.25),
          output("ADX", ac ?? WARNING, "line", 1.75),
        ],
        compute(store, from) {
          bind(study, store, ["plus", "minus", "adx"]);
          const [plus, minus, adx] = study.outputs.map((o) => o.values);
          dmiInto(
            store.high,
            store.low,
            store.close,
            store.length,
            period,
            adxPeriod,
            plus,
            minus,
            adx,
            {
              tr: column("tr", store.capacity),
              plusDm: column("plusDm", store.capacity),
              minusDm: column("minusDm", store.capacity),
              smoothTr: column("smoothTr", store.capacity),
              smoothPlus: column("smoothPlus", store.capacity),
              smoothMinus: column("smoothMinus", store.capacity),
              dx: column("dx", store.capacity),
            },
            from,
          );
        },
      };
      return study;
    }
    case "williamsR": {
      const period = config.period ?? 14;
      const study: Study = {
        ...base,
        overlay: false,
        title: `%R ${period}`,
        range: [-100, 0],
        bands: [-80, -20],
        bandFill: true,
        outputs: [output(`%R${period}`, config.color ?? VIOLET, "line", 1.5)],
        compute(store, from) {
          bind(study, store, ["value"]);
          williamsRInto(
            store.high,
            store.low,
            store.close,
            store.length,
            period,
            study.outputs[0].values,
            column("highest", store.capacity),
            column("lowest", store.capacity),
            from,
          );
        },
      };
      return study;
    }
    case "mfi": {
      const period = config.period ?? 14;
      const study: Study = {
        ...base,
        overlay: false,
        title: `MFI ${period}`,
        range: [0, 100],
        bands: [20, 80],
        bandFill: true,
        outputs: [output(`MFI${period}`, config.color ?? PINK, "line", 1.5)],
        compute(store, from) {
          bind(study, store, ["value"]);
          mfiInto(
            store.high,
            store.low,
            store.close,
            store.volume,
            store.length,
            period,
            study.outputs[0].values,
            column("typical", store.capacity),
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
  utcOffset: UtcOffset,
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
