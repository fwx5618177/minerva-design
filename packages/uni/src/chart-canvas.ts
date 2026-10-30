// Shared runtime of the uni-app chart components: finds the `<canvas
// type="2d">` (the inner HTMLCanvasElement on H5, the SelectorQuery node in
// mini-programs), draws the chart with the DOM-free engine and forwards
// touches / pointers. Only `@minerva/charts/canvas` is imported so bundles
// never include the WebGPU / WebGL2 renderers.
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  toRaw,
  watch,
  type ComputedRef,
} from "vue";
import {
  githubDark,
  resolveTokens,
  type ComponentTheme,
  type DesignOptions,
  type Palette,
} from "@minerva/core";
import {
  createCanvasChart,
  type CanvasChartInstance,
  type ChartAnnotation,
  type ChartAxisOptions,
  type ChartCanvas,
  type ChartControllerEventMap,
  type ChartInteractionOptions,
  type ChartLegendOptions,
  type ChartOptions,
  type ChartPadding,
  type ChartRect,
  type ChartSeries,
  type ChartTooltipOptions,
  type ChartTouch,
} from "@minerva/charts/canvas";
import { useNativeId } from "./native-id";
import { describeCartesianChart } from "./chart-a11y";
import type { ChartHandle } from "./chart-types";

interface ChartConfiguration {
  mode?: string;
  theme?: unknown;
  palette?: Palette | null;
  design?: DesignOptions;
  locale?: string;
}

const themeCache = new Map<string, Readonly<Record<string, string>>>();

/** Minerva token values (`--name` keys) of the provider configuration */
export function chartThemeVariables(
  config?: ChartConfiguration | null,
): Readonly<Record<string, string>> {
  const mode = config?.mode === "dark" ? "dark" : "light";
  const theme = config?.theme;
  const overrides =
    theme === "github-dark"
      ? githubDark
      : theme && typeof theme === "object"
        ? (theme as Partial<ComponentTheme>)
        : undefined;
  const key = JSON.stringify([
    mode,
    config?.palette ?? null,
    config?.design ?? null,
    overrides ?? null,
  ]);
  let variables = themeCache.get(key);
  if (!variables) {
    const { css } = resolveTokens({
      mode,
      palette: config?.palette,
      design: config?.design,
      overrides,
    });
    variables = Object.fromEntries(
      Object.entries(css).map(([name, value]) => [`--${name}`, value]),
    );
    if (themeCache.size >= 16) themeCache.clear();
    themeCache.set(key, variables);
  }
  return variables;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (!value || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(toRaw(value));
  return proto === Object.prototype || proto === null;
};

/**
 * Raw copy of a small option value: reading it through the props tracks
 * nested changes, and the engine receives plain objects (functions and
 * typed arrays are kept as is).
 */
export function plain<T>(value: T): T {
  if (Array.isArray(value)) return value.map(plain) as T;
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value)) out[key] = plain(value[key]);
    return out as T;
  }
  return value;
}

/**
 * Series with their `data` untouched (never traversed: large data sets stay
 * cheap, and the engine keeps its cache while the array is the same).
 */
export function plainSeries(
  series: readonly ChartSeries[] | undefined,
): ChartSeries[] {
  return (series ?? []).map((item) => {
    const { data, ...rest } = item;
    return { ...plain(rest), data: toRaw(data) } as ChartSeries;
  });
}

/** Option props shared by the chart components */
export interface ChartOptionProps {
  xAxis?: ChartAxisOptions;
  yAxis?: ChartAxisOptions;
  legend?: boolean | ChartLegendOptions;
  tooltip?: boolean | ChartTooltipOptions;
  crosshair?: boolean;
  annotations?: readonly ChartAnnotation[];
  interaction?: boolean | ChartInteractionOptions;
  padding?: ChartPadding;
  palette?: readonly string[];
  ariaLabel?: string;
  locale?: string;
  /** Built-in texts (objects only: bar charts use a boolean `labels`) */
  labels?: unknown;
}

/** Engine options of the props (like `engineOptions` of the web charts) */
export function chartEngineOptions(
  props: ChartOptionProps,
  series: readonly ChartSeries[],
): ChartOptions {
  return {
    series,
    xAxis: plain(props.xAxis),
    yAxis: plain(props.yAxis),
    legend: plain(props.legend),
    tooltip: plain(props.tooltip),
    crosshair: props.crosshair,
    annotations: plain(props.annotations),
    interaction: plain(props.interaction),
    padding: plain(props.padding),
    palette: plain(props.palette),
    ariaLabel: props.ariaLabel,
    locale: props.locale || undefined,
    labels:
      props.labels && typeof props.labels === "object"
        ? (plain(props.labels) as ChartOptions["labels"])
        : undefined,
  };
}

/**
 * Options with the provider's language when they have no locale (mini-programs
 * have no `<html lang>`)
 */
export function withProviderLocale<T extends { locale?: string }>(
  options: T,
  locale: string | undefined,
): T {
  return options.locale || !locale ? options : { ...options, locale };
}

export interface CanvasChartFrame {
  width?: number | string;
  height?: number | string;
}

export type CanvasChartListeners = {
  [K in "hover" | "click" | "plotClick" | "zoom" | "drop"]?: (
    event: ChartControllerEventMap[K],
  ) => void;
};

interface TouchLike {
  x?: number;
  y?: number;
  clientX?: number;
  clientY?: number;
  identifier?: number;
}

interface TouchEventLike {
  touches?: ArrayLike<TouchLike>;
  changedTouches?: ArrayLike<TouchLike>;
}

interface NodeInfo {
  node?: ChartCanvas;
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}

const cssSize = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : value;

function pixelRatio(): number {
  try {
    const ratio = uni.getWindowInfo?.().pixelRatio;
    if (ratio) return ratio;
  } catch {
    /* not available on every host */
  }
  try {
    const ratio = uni.getSystemInfoSync?.().pixelRatio;
    if (ratio) return ratio;
  } catch {
    /* not available on every host */
  }
  return (typeof window !== "undefined" && window.devicePixelRatio) || 1;
}

const noop = () => {};

export function useCanvasChart(
  frame: () => CanvasChartFrame,
  options: () => ChartOptions,
  listeners: CanvasChartListeners,
) {
  const instance = getCurrentInstance();
  const id = `mn-chart-${useNativeId().replace(/[^a-z0-9]/gi, "")}`;
  const root = ref<unknown>();
  const plot = shallowRef<ChartRect | null>(null);
  const config = inject<ComputedRef<ChartConfiguration> | null>(
    "minerva:config",
    null,
  );
  const variables = computed(() => chartThemeVariables(config?.value));
  const engineOptions = computed(() =>
    withProviderLocale(options(), config?.value?.locale),
  );
  const ariaLabel = computed(() => describeCartesianChart(engineOptions.value));
  const rootStyle = computed(() =>
    [
      "position: relative",
      `width: ${cssSize(frame().width) ?? "100%"}`,
      `height: ${cssSize(frame().height) ?? "320px"}`,
    ].join("; "),
  );

  let chart: CanvasChartInstance | null = null;
  let element: HTMLCanvasElement | null = null;
  let observer: ResizeObserver | undefined;
  let retry: ReturnType<typeof setTimeout> | undefined;
  let disposed = false;
  let size = { width: -1, height: -1, ratio: -1 };
  let offset = { left: 0, top: 0 };
  const offs: (() => void)[] = [];

  function create(canvas: ChartCanvas, width: number, height: number) {
    if (disposed || chart) return;
    const ratio = pixelRatio();
    size = { width, height, ratio };
    const created = createCanvasChart({
      canvas,
      width,
      height,
      pixelRatio: ratio,
      options: engineOptions.value,
      theme: { variables: variables.value },
    });
    chart = created;
    offs.push(
      created.on("hover", (event) => listeners.hover?.(event)),
      created.on("click", (event) => listeners.click?.(event)),
      created.on("plotClick", (event) => listeners.plotClick?.(event)),
      created.on("zoom", (event) => listeners.zoom?.(event)),
      created.on("drop", (event) => listeners.drop?.(event)),
      created.on("layout", (rect) => (plot.value = { ...rect })),
    );
    const rect = created.getPlotRect();
    plot.value = rect ? { ...rect } : null;
  }

  function apply(width: number, height: number) {
    const ratio = pixelRatio();
    if (
      !chart ||
      (width === size.width && height === size.height && ratio === size.ratio)
    )
      return;
    size = { width, height, ratio };
    chart.resize(width, height, ratio);
  }

  function query(
    fields: { node?: boolean; size: true; rect: true },
    done: (info: NodeInfo | null) => void,
  ) {
    try {
      uni
        .createSelectorQuery()
        .in(instance?.proxy)
        .select(`#${id}`)
        .fields(fields, noop)
        .exec((result: unknown) =>
          done((Array.isArray(result) ? result[0] : null) as NodeInfo | null),
        );
    } catch {
      done(null);
    }
  }

  function remember(info: NodeInfo) {
    offset = { left: info.left ?? 0, top: info.top ?? 0 };
  }

  /** Measures the canvas again and resizes the chart */
  function measure() {
    if (!chart || disposed) return;
    if (element) {
      const rect = element.getBoundingClientRect();
      apply(rect.width, rect.height);
      return;
    }
    query({ size: true, rect: true }, (info) => {
      if (!info || disposed) return;
      remember(info);
      apply(info.width ?? 0, info.height ?? 0);
    });
  }

  function attachNode(attempt = 0) {
    retry = undefined;
    query({ node: true, size: true, rect: true }, (info) => {
      if (disposed || chart) return;
      if (!info?.node) {
        // uni-mp renders <canvas> after the first setData (`r0`): the node
        // may only be queryable a little after mount
        if (attempt < 5) retry = setTimeout(() => attachNode(attempt + 1), 50);
        return;
      }
      remember(info);
      create(info.node, info.width ?? 0, info.height ?? 0);
    });
  }

  /** H5: uni's `<canvas>` wraps a real canvas element */
  function innerCanvas(): HTMLCanvasElement | null {
    const value = root.value as { $el?: unknown } | null | undefined;
    const host =
      value && typeof value === "object" && "$el" in value ? value.$el : value;
    const found =
      host && typeof (host as Element).querySelector === "function"
        ? (host as Element).querySelector("canvas")
        : null;
    return found && typeof found.getContext === "function" ? found : null;
  }

  const pointerAt = (event: PointerEvent | WheelEvent) => {
    const rect = element!.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top] as const;
  };
  // Mouse / pen on H5 (touches arrive through the touch events)
  const pointer = {
    pointerdown(event: PointerEvent) {
      if (event.pointerType === "touch" || !chart) return;
      try {
        element?.setPointerCapture?.(event.pointerId);
      } catch {
        /* capture is optional */
      }
      chart.pointerDown(...pointerAt(event), { id: event.pointerId });
    },
    pointermove(event: PointerEvent) {
      if (event.pointerType === "touch" || !chart) return;
      chart.pointerMove(...pointerAt(event), { id: event.pointerId });
    },
    pointerup(event: PointerEvent) {
      if (event.pointerType === "touch" || !chart) return;
      chart.pointerUp(...pointerAt(event), { id: event.pointerId });
    },
    pointercancel(event: PointerEvent) {
      if (event.pointerType === "touch" || !chart) return;
      chart.getController().pointerCancel({ id: event.pointerId });
    },
    pointerleave(event: PointerEvent) {
      if (event.pointerType === "touch" || !chart || event.buttons) return;
      chart.pointerLeave();
    },
    // Ctrl / ⌘ + wheel (or any wheel with `interaction.wheel: "always"`)
    // zooms, like the web charts
    wheel(event: WheelEvent) {
      const interaction = engineOptions.value.interaction;
      const always =
        typeof interaction === "object" && interaction.wheel === "always";
      if (
        !chart ||
        interaction === false ||
        !(always || event.ctrlKey || event.metaKey)
      )
        return;
      event.preventDefault();
      const factor = Math.min(2, Math.max(0.5, Math.exp(event.deltaY * 0.002)));
      chart.zoomAt(...pointerAt(event), factor);
    },
  };

  function attachElement(canvas: HTMLCanvasElement) {
    element = canvas;
    const rect = canvas.getBoundingClientRect();
    create(canvas, rect.width, rect.height);
    for (const [type, listener] of Object.entries(pointer))
      canvas.addEventListener(type, listener as EventListener, {
        passive: type !== "wheel",
      });
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => measure());
      observer.observe(canvas);
    }
  }

  function touches(list: ArrayLike<TouchLike> | undefined): ChartTouch[] {
    if (!list) return [];
    const rect = element?.getBoundingClientRect();
    return Array.from(list, (touch, index) => {
      const client =
        typeof touch.clientX === "number" && typeof touch.clientY === "number";
      return {
        x:
          rect && client
            ? touch.clientX! - rect.left
            : typeof touch.x === "number"
              ? touch.x
              : (touch.clientX ?? 0) - offset.left,
        y:
          rect && client
            ? touch.clientY! - rect.top
            : typeof touch.y === "number"
              ? touch.y
              : (touch.clientY ?? 0) - offset.top,
        identifier: touch.identifier ?? index,
      };
    });
  }

  function onTouchStart(event: TouchEventLike) {
    chart?.touchStart(touches(event.changedTouches ?? event.touches));
  }
  function onTouchMove(event: TouchEventLike) {
    chart?.touchMove(touches(event.touches ?? event.changedTouches));
  }
  function onTouchEnd(event: TouchEventLike) {
    chart?.touchEnd(touches(event.changedTouches ?? event.touches));
  }
  function onTouchCancel(event: TouchEventLike) {
    const list = touches(event.changedTouches ?? event.touches);
    chart?.touchCancel(list.length ? list : undefined);
  }

  watch(engineOptions, (next) => chart?.setOptions(next));
  watch(variables, (next) => chart?.setTheme({ variables: next }));
  watch(
    () => [frame().width, frame().height],
    () => nextTick(measure),
  );

  onMounted(() => {
    nextTick(() => {
      if (disposed) return;
      const canvas = innerCanvas();
      if (canvas) attachElement(canvas);
      else attachNode();
    });
    uni.onWindowResize?.(measure);
  });

  onBeforeUnmount(() => {
    disposed = true;
    if (retry !== undefined) clearTimeout(retry);
    observer?.disconnect();
    uni.offWindowResize?.(measure);
    if (element)
      for (const [type, listener] of Object.entries(pointer))
        element.removeEventListener(type, listener as EventListener);
    offs.splice(0).forEach((off) => off());
    chart?.destroy();
    chart = null;
    element = null;
  });

  const handle: ChartHandle = {
    resetZoom: () => chart?.resetZoom(),
    getView: () => chart?.getView() ?? null,
    setView: (view) => chart?.setView(view),
    getRenderer: () => (chart ? "canvas2d" : null),
    getInstance: () => chart,
    resize: () => {
      size = { width: -1, height: -1, ratio: -1 };
      measure();
    },
  };

  return {
    id,
    root,
    plot,
    rootStyle,
    ariaLabel,
    handle,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
  };
}
