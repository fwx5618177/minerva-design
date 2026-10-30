// Numeric ticks and ranges.

const E10 = Math.sqrt(50);
const E5 = Math.sqrt(10);
const E2 = Math.sqrt(2);

/** Tick step close to `(max - min) / count`, of the form 1, 2 or 5 × 10^k */
export const tickStep = (min: number, max: number, count: number): number => {
  const span = Math.abs(max - min);
  if (!(span > 0) || !Number.isFinite(span)) return 0;
  const raw = span / Math.max(1, count);
  const power = Math.floor(Math.log10(raw));
  const base = 10 ** power;
  const error = raw / base;
  const factor = error >= E10 ? 10 : error >= E5 ? 5 : error >= E2 ? 2 : 1;
  return factor * base;
};

/** Rounds a value computed from a step (avoids 0.30000000000000004) */
const roundTo = (value: number, step: number): number => {
  const decimals = Math.max(0, -Math.floor(Math.log10(step)) + 1);
  return decimals > 0 && decimals < 20 ? +value.toFixed(decimals) : value;
};

/** Tick values inside [min, max] */
export const linearTicks = (
  min: number,
  max: number,
  count: number,
): number[] => {
  if (min > max) [min, max] = [max, min];
  const step = tickStep(min, max, count);
  if (!step) return Number.isFinite(min) ? [min] : [];
  const start = Math.ceil(min / step - 1e-9);
  const end = Math.floor(max / step + 1e-9);
  const ticks: number[] = [];
  // Guard against pathological ranges
  for (let i = start; i <= end && ticks.length < 1000; i++) {
    // `|| 0`: no -0 for the formatters (Intl writes "-0")
    ticks.push(roundTo(i * step, step) || 0);
  }
  return ticks;
};

/** Extends [min, max] to tick boundaries */
export const niceDomain = (
  min: number,
  max: number,
  count: number,
): [number, number] => {
  if (min > max) [min, max] = [max, min];
  let step = tickStep(min, max, count);
  for (let i = 0; i < 3 && step; i++) {
    const nextMin = Math.floor(min / step) * step;
    const nextMax = Math.ceil(max / step) * step;
    min = roundTo(nextMin, step);
    max = roundTo(nextMax, step);
    const next = tickStep(min, max, count);
    if (next === step) break;
    step = next;
  }
  return [min, max];
};

/**
 * Range covering [min, max] with a usable span: a single value (or no data)
 * becomes a small range around it.
 */
export const ensureSpan = (
  min: number,
  max: number,
  fallback: [number, number] = [0, 1],
): [number, number] => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return fallback;
  if (min > max) [min, max] = [max, min];
  if (max - min > 0) return [min, max];
  const pad = min === 0 ? 1 : Math.abs(min) * 0.1;
  return [min - pad, max + pad];
};

/** Number of decimals that keeps ticks distinct for a step */
export const stepDecimals = (step: number): number =>
  step > 0 && Number.isFinite(step)
    ? Math.min(12, Math.max(0, -Math.floor(Math.log10(step) + 1e-9)))
    : 0;
