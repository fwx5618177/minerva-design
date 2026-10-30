// Shared runtime of the uni-app shape chart components (PieChart, DonutChart,
// RadarChart, GaugeChart, FunnelChart, TreemapChart, SankeyChart,
// SunburstChart, RadialBarChart, CalendarHeatmap, BulletChart, ChordChart, ShapeChart): finds the
// `<canvas type="2d">` (the inner HTMLCanvasElement on H5, the SelectorQuery
// node in mini-programs), draws with the DOM-free `createCanvasShapeChart`
// (legend, tooltip and animations on the canvas) and forwards touches /
// pointers. Only `@minerva/charts/canvas` is imported.
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type ComputedRef,
} from "vue";
import {
  calendarStrips,
  createCanvasShapeChart,
  type CanvasShapeChartInstance,
  type ChartCanvas,
  type ChartPadding,
  type ChartTouch,
  type ShapeChartCommonOptions,
  type ShapeChartEventMap,
  type ShapeChartLabels,
  type ShapeChartOptions,
  type ShapeLegendOptions,
  type ShapeTooltipOptions,
} from "@minerva/charts/canvas";
import { chartThemeVariables, plain } from "./chart-canvas";
import { useNativeId } from "./native-id";
import type { ShapeChartHandle } from "./shape-chart-types";

type ChartConfiguration = Parameters<typeof chartThemeVariables>[0];

/** Option props shared by the shape charts */
export interface ShapeOptionProps {
  palette?: readonly string[];
  legend?: boolean | ShapeLegendOptions;
  tooltip?: boolean | ShapeTooltipOptions;
  format?: (value: number) => string;
  percentFormat?: (share: number) => string;
  hidden?: readonly number[];
  animation?: boolean;
  padding?: ChartPadding;
  ariaLabel?: string;
  locale?: string;
  texts?: Partial<ShapeChartLabels>;
}

/** Engine options shared by every shape type, from the props */
export function shapeCommonOptions(
  props: ShapeOptionProps,
): ShapeChartCommonOptions {
  return {
    palette: plain(props.palette),
    legend: plain(props.legend),
    tooltip: plain(props.tooltip),
    format: props.format,
    percentFormat: props.percentFormat,
    hidden: plain(props.hidden),
    animation: props.animation,
    padding: plain(props.padding),
    ariaLabel: props.ariaLabel,
    locale: props.locale || undefined,
    texts: plain(props.texts),
  };
}

/** Default accessible name of a chart (like the web charts) */
export function describeShapeChart(options: ShapeChartOptions): string {
  switch (options.type) {
    case "pie":
      return options.rose
        ? "Rose chart"
        : (options.innerRadius ?? 0) > 0
          ? "Donut chart"
          : "Pie chart";
    case "radar":
      return "Radar chart";
    case "gauge":
      return options.label ? `Gauge: ${options.label}` : "Gauge";
    case "funnel":
      return "Funnel chart";
    case "treemap":
      return "Treemap";
    case "sankey":
      return "Sankey diagram";
    case "sunburst":
      return "Sunburst chart";
    case "radialBar":
      return "Radial bar chart";
    case "calendarHeatmap":
      return "Calendar heatmap";
    case "bullet":
      return "Bullet chart";
    case "chord":
      return "Chord diagram";
    default:
      return "Chart";
  }
}

/** Default height of a shape chart (like the web components): by type, or from the data */
export function shapeDefaultHeight(options: ShapeChartOptions): number {
  switch (options.type) {
    case "gauge":
      return 240;
    case "radialBar":
      return 300;
    case "sankey":
    case "sunburst":
      return 360;
    case "chord":
      return 420;
    case "calendarHeatmap":
      // one strip of weeks per year when the range spans more than 53 weeks
      return options.layout === "months"
        ? 560
        : calendarStrips(options) * 120 +
            (options.legend === false ? 0 : 34) +
            16;
    case "bullet":
      return options.orientation === "vertical"
        ? 320
        : Math.max(96, (options.data?.length ?? 0) * 64 + 16) +
            (options.legend ? 34 : 0);
    default:
      return 320;
  }
}

export interface ShapeChartFrame {
  width?: number | string;
  height?: number | string;
}

export type ShapeChartListeners = {
  [K in "hover" | "click" | "toggle" | "drill"]?: (
    event: ShapeChartEventMap[K],
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

export function useCanvasShapeChart(
  frame: () => ShapeChartFrame,
  options: () => ShapeChartOptions,
  listeners: ShapeChartListeners,
) {
  const instance = getCurrentInstance();
  const id = `mn-shape-chart-${useNativeId().replace(/[^a-z0-9]/gi, "")}`;
  const root = ref<unknown>();
  const config = inject<ComputedRef<ChartConfiguration> | null>(
    "minerva:config",
    null,
  );
  const variables = computed(() => chartThemeVariables(config?.value));
  const engineOptions = computed(options);
  const ariaLabel = computed(
    () =>
      engineOptions.value.ariaLabel ?? describeShapeChart(engineOptions.value),
  );
  const rootStyle = computed(() =>
    [
      "position: relative",
      `width: ${cssSize(frame().width) ?? "100%"}`,
      `height: ${cssSize(frame().height) ?? "320px"}`,
    ].join("; "),
  );

  let chart: CanvasShapeChartInstance | null = null;
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
    const created = createCanvasShapeChart({
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
      created.on("toggle", (event) => listeners.toggle?.(event)),
      created.on("drill", (event) => listeners.drill?.(event)),
    );
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
        // uni-mp renders <canvas> after the first setData: the node may
        // only be queryable a little after mount
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

  const pointerAt = (event: PointerEvent) => {
    const rect = element!.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top] as const;
  };
  // Mouse / pen on H5 (touches arrive through the touch events)
  const pointer = {
    pointerdown(event: PointerEvent) {
      if (event.pointerType === "touch" || !chart) return;
      chart.pointerDown(...pointerAt(event));
    },
    pointermove(event: PointerEvent) {
      if (event.pointerType === "touch" || !chart) return;
      chart.pointerMove(...pointerAt(event));
    },
    pointerup(event: PointerEvent) {
      if (event.pointerType === "touch" || !chart) return;
      chart.pointerUp(...pointerAt(event));
    },
    pointerleave(event: PointerEvent) {
      if (event.pointerType === "touch" || !chart) return;
      chart.pointerLeave();
    },
  };

  function attachElement(canvas: HTMLCanvasElement) {
    element = canvas;
    const rect = canvas.getBoundingClientRect();
    create(canvas, rect.width, rect.height);
    for (const [type, listener] of Object.entries(pointer))
      canvas.addEventListener(type, listener as EventListener, {
        passive: true,
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
            ? (touch.clientX ?? 0) - rect.left
            : typeof touch.x === "number"
              ? touch.x
              : (touch.clientX ?? 0) - offset.left,
        y:
          rect && client
            ? (touch.clientY ?? 0) - rect.top
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

  const handle: ShapeChartHandle = {
    getInstance: () => chart,
    resize: () => {
      size = { width: -1, height: -1, ratio: -1 };
      measure();
    },
  };

  return {
    id,
    root,
    rootStyle,
    ariaLabel,
    handle,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
  };
}
