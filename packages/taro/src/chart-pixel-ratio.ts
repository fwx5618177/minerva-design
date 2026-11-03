import Taro from "@tarojs/taro";

type PixelRatioApi = {
  getWindowInfo?: () => { pixelRatio?: number } | undefined;
  getSystemInfoSync?: () => { pixelRatio?: number } | undefined;
};

const positive = (value: unknown): number | undefined =>
  typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : undefined;

/**
 * Device pixel ratio the chart canvases render at.
 *
 * Mini programs answer through `getWindowInfo` / `getSystemInfoSync`. On
 * Taro H5 the default export of `@tarojs/taro` has no such methods (they are
 * named exports, rewritten by Taro's babel plugin in app code only, never in
 * a library), so the page's `devicePixelRatio` is the answer there: without
 * it the canvas backing store stays at 1x and the chart is blurry.
 */
export function chartPixelRatio(): number {
  try {
    const api = Taro as unknown as PixelRatioApi;
    const ratio =
      positive(api.getWindowInfo?.()?.pixelRatio) ??
      positive(api.getSystemInfoSync?.()?.pixelRatio);
    if (ratio) return ratio;
  } catch {
    // a host without these APIs: the DOM below, else 1x
  }
  return (
    positive((globalThis as { devicePixelRatio?: unknown }).devicePixelRatio) ??
    1
  );
}
