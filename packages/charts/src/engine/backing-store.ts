// A canvas host can resize or clear the backing store of the canvas behind
// the chart's back: Taro H5's <taro-canvas-core> writes its cached CSS size
// to the width / height of its inner <canvas> on every render of its own,
// and uni-app H5's <canvas> resizes it to the CSS size (x1). Both clear the
// pixels and drop the device pixel ratio, so the chart turns blank or blurry
// until its next frame. On a DOM canvas the writes reflect into the `width`
// and `height` attributes: watch them and draw again.

type Watched = { nodeType?: unknown };

/** The part of the DOM MutationObserver used (no DOM types: React Native) */
type AttributeObserver = {
  observe(
    target: unknown,
    options: { attributes: boolean; attributeFilter: string[] },
  ): void;
  disconnect(): void;
};
type AttributeObserverClass = new (
  callback: (records: readonly unknown[]) => void,
) => AttributeObserver;

/**
 * Calls `redraw` when something other than the chart wrote the `width` /
 * `height` of a DOM canvas (or left them at another size than `stale` expects).
 * The chart reports its own writes with the returned `own(count)`, so they do
 * not trigger a redraw. No-op (and free) on mini-program canvases and
 * OffscreenCanvas, which are not DOM nodes.
 */
export function watchBackingStore(
  canvas: unknown,
  stale: () => boolean,
  redraw: () => void,
): { own(count?: number): void; disconnect(): void } {
  const Observer = (globalThis as { MutationObserver?: AttributeObserverClass })
    .MutationObserver;
  if (
    typeof Observer !== "function" ||
    typeof (canvas as Watched | null)?.nodeType !== "number"
  )
    return { own() {}, disconnect() {} };
  // writes of the chart itself not delivered to the observer yet
  let pending = 0;
  const observer = new Observer((records) => {
    const foreign = records.length > pending;
    pending = 0;
    if (foreign || stale()) redraw();
  });
  observer.observe(canvas, {
    attributes: true,
    attributeFilter: ["width", "height"],
  });
  return {
    own(count = 1) {
      pending += count;
    },
    disconnect() {
      observer.disconnect();
      pending = 0;
    },
  };
}
