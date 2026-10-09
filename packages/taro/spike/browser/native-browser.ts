/** Browser API bridge for Taro's real H5 React hosts. Geometry is measured from
 * rendered elements; this fixture does not emulate a mini-program device. */
type SizeHandler = (event: {
  size: { windowWidth: number; windowHeight: number };
}) => void;
const resize = new Map<SizeHandler, () => void>();
Reflect.set(
  window,
  "nativeMeasurements",
  Reflect.get(window, "nativeMeasurements") ?? 0,
);
export const getSystemInfoSync = () => ({
  windowWidth: innerWidth,
  windowHeight: innerHeight,
  pixelRatio: devicePixelRatio,
  theme: matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light",
});
export const createSelectorQuery = () => {
  let selector = "";
  const jobs: (() => unknown)[] = [];
  const query = {
    select: (value: string) => {
      selector = value;
      return query;
    },
    boundingClientRect: (callback: (rect: DOMRect | null) => void) => {
      const target = selector;
      jobs.push(() => {
        Reflect.set(
          window,
          "nativeMeasurements",
          Reflect.get(window, "nativeMeasurements") + 1,
        );
        const bySelector =
          Reflect.get(window, "nativeMeasurementsBySelector") ?? {};
        bySelector[target] = (bySelector[target] ?? 0) + 1;
        Reflect.set(window, "nativeMeasurementsBySelector", bySelector);
        const rect =
          document.querySelector(target)?.getBoundingClientRect() ?? null;
        callback(rect);
        return rect;
      });
      return query;
    },
    exec: (callback?: (results: unknown[]) => void) => {
      const results = jobs.map((job) => job());
      callback?.(results);
    },
  };
  return query;
};
export const onWindowResize = (handler: SizeHandler) => {
  const listener = () =>
    handler({ size: { windowWidth: innerWidth, windowHeight: innerHeight } });
  resize.set(handler, listener);
  window.addEventListener("resize", listener);
};
export const offWindowResize = (handler: SizeHandler) => {
  const listener = resize.get(handler);
  if (listener) window.removeEventListener("resize", listener);
  resize.delete(handler);
};
const Taro = {
  getSystemInfoSync,
  createSelectorQuery,
  onWindowResize,
  offWindowResize,
  nextTick: (callback: () => void) => Promise.resolve().then(callback),
  getStorageSync: (key: string) => {
    const value = localStorage.getItem(key);
    return value === null ? undefined : JSON.parse(value);
  },
  setStorageSync: (key: string, value: unknown) =>
    localStorage.setItem(key, JSON.stringify(value)),
  onThemeChange: () => {},
  offThemeChange: () => {},
  getEnv: () => "WEB",
  setClipboardData: ({ data }: { data: string }) =>
    navigator.clipboard.writeText(data),
  navigateTo: ({ url }: { url: string }) => history.pushState({}, "", url),
  pxTransform: (value: number) => `${value}px`,
  useResize: () => {},
  ENV_TYPE: { WEB: "WEB" },
};

export default Taro;
