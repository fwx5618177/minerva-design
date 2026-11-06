import type { TradingBar, TradingBarsInput } from "../trading/types";
import {
  barAt,
  createPyramid,
  createStore,
  inputLength,
  invalidatePyramid,
  lowerBoundTime,
  pyramidLevel,
  readBar,
  setBars,
  updateBar,
} from "../trading/store";

/** Reject invalid OHLC rather than fabricating exchange data. */
const valid = (bar: TradingBar) =>
  [bar.time, bar.open, bar.high, bar.low, bar.close].every(Number.isFinite) &&
  bar.high >= Math.max(bar.open, bar.close, bar.low) &&
  bar.low <= Math.min(bar.open, bar.close);

/** Bounded typed-column candle history and cached OHLC levels of detail. */
export const createHeatmapCandles = () => {
  const store = createStore();
  let pyramid = createPyramid();
  let duration = 1000;
  // A bounded lower median avoids treating an isolated missing-data gap as
  // candle duration. A single supplied bar has a 1 s display interval.
  const refreshDuration = () => {
    const samples: number[] = [];
    for (let i = Math.max(1, store.length - 256); i < store.length; i++) {
      const delta = store.time[i]! - store.time[i - 1]!;
      if (Number.isFinite(delta) && delta > 0) samples.push(delta);
    }
    samples.sort((a, b) => a - b);
    duration = samples.length
      ? samples[Math.floor((samples.length - 1) / 2)]!
      : 1000;
  };
  const endAt = (index: number) =>
    Math.min(
      store.time[index]! + duration,
      index + 1 < store.length ? store.time[index + 1]! : Infinity,
    );
  const lower = (time: number) =>
    lowerBoundTime(store.time, store.length, time);
  const trim = (cap: number) => {
    if (store.length <= cap) return;
    const start = store.length - cap;
    const input = {
      time: store.time.slice(start, store.length),
      open: store.open.slice(start, store.length),
      high: store.high.slice(start, store.length),
      low: store.low.slice(start, store.length),
      close: store.close.slice(start, store.length),
      volume: store.volume.slice(start, store.length),
    };
    setBars(store, input);
    pyramid = createPyramid();
    refreshDuration();
  };
  return {
    set(input: TradingBarsInput, cap: number) {
      const next: TradingBar[] = [];
      const n = inputLength(input);
      for (let i = Math.max(0, n - cap); i < n; i++) {
        const bar = barAt(input, i);
        if (!valid(bar)) continue;
        const previous = next[next.length - 1];
        if (previous && bar.time < previous.time) continue;
        if (previous?.time === bar.time) next[next.length - 1] = { ...bar };
        else next.push({ ...bar });
      }
      setBars(store, next);
      pyramid = createPyramid();
      refreshDuration();
    },
    update(bar: TradingBar, cap: number) {
      if (
        !valid(bar) ||
        (store.length && bar.time < store.time[store.length - 1]!)
      )
        return;
      const previousLength = store.length;
      const changed = updateBar(store, bar);
      invalidatePyramid(pyramid, changed);
      trim(cap);
      if (store.length !== previousLength) refreshDuration();
    },
    trim,
    clear() {
      setBars(store, []);
      pyramid = createPyramid();
      duration = 1000;
    },
    last: () => (store.length ? readBar(store, store.length - 1) : undefined),
    at(time: number) {
      const i = lower(time);
      const index = store.time[i] === time && i < store.length ? i : i - 1;
      return index >= 0 && time < endAt(index)
        ? readBar(store, index)
        : undefined;
    },
    /** Cached OHLC envelopes; only visible screen-resolution groups are drawn. */
    visible(from: number, to: number, width: number) {
      if (!store.length) return [];
      const start = Math.max(0, lower(from) - 1),
        end = Math.min(store.length, lower(to) + 1);
      const pixels = Math.max(1, Math.floor(width / 3));
      const k = Math.max(
        0,
        Math.ceil(Math.log2(Math.max(1, (end - start) / pixels))),
      );
      const source = k ? pyramidLevel(pyramid, store, store.length, k) : store;
      const size = 2 ** k,
        count = Math.ceil(store.length / size);
      const result: (TradingBar & { end: number })[] = [];
      for (
        let i = Math.floor(start / size);
        i < Math.min(count, Math.ceil(end / size));
        i++
      ) {
        result.push({
          ...readBar(source, i),
          end: endAt(Math.min(store.length, (i + 1) * size) - 1),
        });
      }
      return result;
    },
  };
};
