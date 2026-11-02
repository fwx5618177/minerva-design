// Value helpers of the sliders (every renderer): clamping, snapping to the
// step or to the marks, keyboard stepping, two-thumb ranges.

/** A slider value: one number, or `[start, end]` for a range slider */
export type SliderValue = number | [number, number];

/** A mark of the slider scale */
export interface SliderMark {
  /** Position of the mark (between min and max) */
  value: number;
  /** Text shown under the mark */
  label?: string;
}

/** Scale of a slider */
export interface SliderScale {
  min: number;
  max: number;
  /** Step between two values; `null` snaps to the marks only */
  step: number | null;
  /** Marks of the scale (already resolved, see `getSliderMarks`) */
  marks?: readonly SliderMark[];
  /** Snap to the closest mark (instead of the step) */
  snapToMarks?: boolean;
}

/** Most step ticks drawn by `marks: true` (denser scales draw none). */
export const SLIDER_MAX_STEP_MARKS = 101;

/** Decimal places of a step (`0.05` -> 2). */
export function sliderPrecision(step?: number | null): number {
  if (!step || !Number.isFinite(step)) return 0;
  const s = String(step);
  const exp = s.match(/e-(\d+)$/);
  if (exp) return Number(exp[1]);
  const dot = s.indexOf(".");
  return dot === -1 ? 0 : s.length - dot - 1;
}

/** `v` limited to `[min, max]`. */
export function clampSliderValue(v: number, min: number, max: number): number {
  if (Number.isNaN(v)) return min;
  return Math.min(max, Math.max(min, v));
}

/**
 * Marks of a slider: `true` draws one tick per step (none when there would
 * be more than `SLIDER_MAX_STEP_MARKS`), an array keeps the marks within
 * `[min, max]`, sorted.
 */
export function getSliderMarks(
  marks: readonly SliderMark[] | boolean | undefined | null,
  min: number,
  max: number,
  step: number | null = 1,
): SliderMark[] {
  if (!marks || max <= min) return [];
  if (marks === true) {
    if (!step || step <= 0) return [];
    const count = Math.floor((max - min) / step + 1e-9) + 1;
    if (count > SLIDER_MAX_STEP_MARKS) return [];
    const precision = sliderPrecision(step);
    return Array.from({ length: count }, (_, i) => ({
      value: Number((min + i * step).toFixed(precision)),
    }));
  }
  return marks
    .filter((m) => Number.isFinite(m.value) && m.value >= min && m.value <= max)
    .slice()
    .sort((a, b) => a.value - b.value);
}

/** The mark closest to `v` (`undefined` without marks). */
function closestMark(
  v: number,
  marks: readonly SliderMark[] | undefined,
): number | undefined {
  if (!marks?.length) return undefined;
  let best = marks[0].value;
  for (const m of marks) {
    if (Math.abs(m.value - v) < Math.abs(best - v)) best = m.value;
  }
  return best;
}

/**
 * `v` snapped to the scale: to the closest mark with `snapToMarks` (or a
 * `null` step), otherwise to the closest step from `min`; always clamped.
 */
export function snapSliderValue(v: number, scale: SliderScale): number {
  const { min, max, step, marks, snapToMarks } = scale;
  const clamped = clampSliderValue(v, min, max);
  if (snapToMarks || step === null) {
    return closestMark(clamped, marks) ?? clamped;
  }
  if (!step || step <= 0) return clamped;
  const snapped = min + Math.round((clamped - min) / step) * step;
  const precision = Math.max(sliderPrecision(step), sliderPrecision(min));
  // A last step shorter than `step` can overshoot `max`: clamp again.
  return clampSliderValue(Number(snapped.toFixed(precision)), min, max);
}

/** Position of `v` on the scale, in percent (0..100). */
export function sliderPercent(v: number, min: number, max: number): number {
  if (max <= min) return 0;
  return ((clampSliderValue(v, min, max) - min) / (max - min)) * 100;
}

/**
 * Ratio (0..1 from the min end, unclamped) of a pointer `position` on a
 * track whose measured axis starts at `start` and is `length` long.
 * `reversed` tracks have their min at the far end of the axis: vertical
 * sliders (min at the bottom, the y axis grows downwards) and horizontal RTL
 * sliders. `0` while the track is not measured.
 */
export function sliderRatioAt(
  position: number,
  start: number,
  length: number,
  reversed = false,
): number {
  if (!length) return 0;
  const ratio = (position - start) / length;
  return reversed ? 1 - ratio : ratio;
}

/**
 * The snapped value at `ratio` (0..1, from the start of the track) of the
 * track. Renderers flip the ratio for RTL / vertical sliders (see
 * `sliderRatioAt`).
 */
export function sliderValueFromRatio(
  ratio: number,
  scale: SliderScale,
): number {
  const r = Math.min(1, Math.max(0, Number.isFinite(ratio) ? ratio : 0));
  return snapSliderValue(scale.min + r * (scale.max - scale.min), scale);
}

/**
 * The value after a key press: ArrowRight / ArrowUp add one step, ArrowLeft
 * / ArrowDown remove one, PageUp / PageDown move by 10% of the scale (at
 * least one step), Home / End jump to the bounds. Marks-only sliders move
 * to the next / previous mark. `null` for other keys. Keys are logical:
 * renderers swap the horizontal arrows in RTL.
 */
export function getSliderKeyValue(
  key: string,
  value: number,
  scale: SliderScale,
): number | null {
  const { min, max, step, marks, snapToMarks } = scale;
  if (key === "Home") return snapSliderValue(min, scale);
  if (key === "End") return snapSliderValue(max, scale);
  const up = key === "ArrowRight" || key === "ArrowUp";
  const down = key === "ArrowLeft" || key === "ArrowDown";
  const pageUp = key === "PageUp";
  const pageDown = key === "PageDown";
  if (!up && !down && !pageUp && !pageDown) return null;
  const direction = up || pageUp ? 1 : -1;
  if ((snapToMarks || step === null) && marks?.length) {
    const values = marks.map((m) => m.value);
    if (pageUp || pageDown) {
      const jump = Math.max(1, Math.round(values.length / 10));
      const index = values.indexOf(closestMark(value, marks) as number);
      const next = Math.min(
        values.length - 1,
        Math.max(0, index + direction * jump),
      );
      return values[next];
    }
    const next =
      direction > 0
        ? values.find((v) => v > value)
        : [...values].reverse().find((v) => v < value);
    return next ?? value;
  }
  const unit = step && step > 0 ? step : (max - min) / 100;
  const delta = pageUp || pageDown ? Math.max(unit, (max - min) / 10) : unit;
  return snapSliderValue(value + direction * delta, scale);
}

/**
 * A value made valid for the slider: a clamped (and snapped) number, or for
 * a range two clamped values in order. Missing values fall back to the
 * bounds.
 */
export function normalizeSliderValue(
  value: SliderValue | null | undefined,
  range: boolean,
  scale: SliderScale,
): SliderValue {
  const fix = (v: unknown, fallback: number) =>
    typeof v === "number" && Number.isFinite(v)
      ? snapSliderValue(v, scale)
      : fallback;
  if (range) {
    const pair = Array.isArray(value)
      ? value
      : typeof value === "number"
        ? [scale.min, value]
        : [scale.min, scale.max];
    const a = fix(pair[0], scale.min);
    const b = fix(pair[1], scale.max);
    return a <= b ? [a, b] : [b, a];
  }
  return fix(Array.isArray(value) ? value[0] : value, scale.min);
}

/** The values of a slider value as a list (one or two thumbs). */
export function sliderValues(value: SliderValue): number[] {
  return Array.isArray(value) ? [value[0], value[1]] : [value];
}

/**
 * The value with thumb `index` moved to `next`. Range thumbs cannot cross:
 * the start stops at the end and the end at the start.
 */
export function setSliderThumb(
  value: SliderValue,
  index: number,
  next: number,
): SliderValue {
  if (!Array.isArray(value)) return next;
  if (index === 0) return [Math.min(next, value[1]), value[1]];
  return [value[0], Math.max(next, value[0])];
}

/** Index of the thumb closest to `v` (ties go to the end thumb when past it). */
export function closestSliderThumb(value: SliderValue, v: number): number {
  if (!Array.isArray(value)) return 0;
  const [a, b] = value;
  if (a === b) return v > b ? 1 : 0;
  return Math.abs(v - a) <= Math.abs(v - b) ? 0 : 1;
}

/** Whether two slider values are equal. */
export function sliderValuesEqual(a: SliderValue, b: SliderValue): boolean {
  if (Array.isArray(a) && Array.isArray(b))
    return a[0] === b[0] && a[1] === b[1];
  return a === b;
}

/** Whether a mark lies inside the filled part of the track. */
export function isSliderMarkActive(mark: number, value: SliderValue): boolean {
  if (Array.isArray(value)) return mark >= value[0] && mark <= value[1];
  return mark <= value;
}
