// Value helpers of the number inputs (React NumberInput and
// <minerva-number-input>).

/** Decimal places of `step` (`0.05` -> 2); `0` for whole or missing steps. */
export function inferStepPrecision(step?: number): number {
  if (!step || step >= 1) return 0;
  const s = String(step);
  const dot = s.indexOf(".");
  return dot === -1 ? 0 : s.length - dot - 1;
}

/** `n` limited to `[min, max]`; a missing bound does not limit. */
export function clampNumber(n: number, min?: number, max?: number): number {
  let v = n;
  if (min !== undefined) v = Math.max(min, v);
  if (max !== undefined) v = Math.min(max, v);
  return v;
}

/** Display text of a value with `precision` decimals; `""` for empty / NaN. */
export function formatNumberValue(
  v: number | null | undefined,
  precision: number,
): string {
  if (v === null || v === undefined || Number.isNaN(v)) return "";
  return v.toFixed(precision);
}

/**
 * Parses the text typed into a number input: digits with an optional
 * leading "-" and one "." (no exponent, a typing trap). `null` otherwise.
 */
export function parseNumberDraft(input: string): number | null {
  const trimmed = input.trim();
  if (!trimmed || !/^-?\d*(\.\d*)?$/.test(trimmed)) return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}
