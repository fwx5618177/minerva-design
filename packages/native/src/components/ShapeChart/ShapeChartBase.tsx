// The shape chart host of React Native. The platform-free engine
// (`createCanvasShapeChart` of @minerva/charts/canvas: layouts, animations,
// legend, tooltip, hover dimming, toggles, events) draws every frame on a
// recording canvas (./recorder); the recorded operations become views
// (./geometry, ./draw). No canvas, SVG or native drawing module is needed,
// and every shape type of the engine is drawn the same way.

import {
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type Ref,
} from "react";
import {
  StyleSheet,
  View,
  type DimensionValue,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import {
  createCanvasShapeChart,
  type CanvasShapeChartInstance,
  type ChartCanvas,
  type ChartThemeInput,
  type ShapeChartOptions,
  type ShapeDrillEvent,
  type ShapeHoverEvent,
  type ShapeToggleEvent,
} from "@minerva/charts/canvas";
import { useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { chartThemeInput } from "../Chart/theme";
import { renderPrims } from "./draw";
import { framePrims, type Prim } from "./geometry";
import { createRecorder, type DrawOp } from "./recorder";
import type { ShapeChartHandle } from "./types";

interface Handlers {
  onHover?: (event: ShapeHoverEvent | null) => void;
  onClick?: (event: ShapeHoverEvent) => void;
  onToggle?: (event: ShapeToggleEvent) => void;
  onDrill?: (event: ShapeDrillEvent) => void;
}

/** Fingers moving less than this (px) tap */
const TAP_SLOP = 8;

type Frame = { cancel: () => void };

const requestFrame = (callback: () => void): Frame => {
  if (typeof requestAnimationFrame === "function") {
    const id = requestAnimationFrame(callback);
    return { cancel: () => cancelAnimationFrame(id) };
  }
  const id = setTimeout(callback, 16);
  return { cancel: () => clearTimeout(id) };
};

interface TouchPoint {
  pageX: number;
  pageY: number;
  locationX?: number;
  locationY?: number;
}

/** Default accessible name of a chart (like the web charts) */
export const describeShapeChart = (o: ShapeChartOptions): string => {
  switch (o.type) {
    case "pie":
      return o.rose
        ? "Rose chart"
        : (o.innerRadius ?? 0) > 0
          ? "Donut chart"
          : "Pie chart";
    case "radar":
      return "Radar chart";
    case "gauge":
      return o.label ? `Gauge: ${o.label}` : "Gauge";
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
    default:
      return "Chart";
  }
};

interface ShapeStore {
  subscribe(listener: () => void): () => void;
  version(): number;
  /** Views of the last frame */
  prims(): Prim[];
  /** Creates the engine (in an effect); returns its teardown */
  mount(handlers: () => Handlers): () => void;
  instance(): CanvasShapeChartInstance | null;
  setOptions(options: ShapeChartOptions): void;
  setTheme(theme: ChartThemeInput): void;
  setSize(width: number, height: number): void;
  size(): [number, number] | null;
  /** Hovered mark and finger, for `renderTooltip` */
  tip(): { event: ShapeHoverEvent; x: number; y: number } | null;
  touchStart(event: GestureResponderEvent): void;
  touchMove(event: GestureResponderEvent): void;
  touchEnd(event: GestureResponderEvent): void;
  touchCancel(): void;
}

function createShapeStore(
  initialOptions: ShapeChartOptions,
  initialTheme: ChartThemeInput,
  initialSize: [number, number] | null,
): ShapeStore {
  const recorder = createRecorder();
  let options = initialOptions;
  let theme = initialTheme;
  let size = initialSize;
  let instance: CanvasShapeChartInstance | null = null;
  let version = 0;
  const listeners = new Set<() => void>();
  let committed: DrawOp[] | null = null;
  let cache: { ops: DrawOp[]; prims: Prim[] } | null = null;
  let hover: ShapeHoverEvent | null = null;
  let finger = { x: 0, y: 0 };
  let origin = { x: 0, y: 0 };
  let press: { x: number; y: number; moved: boolean } | null = null;
  const frames = new Map<number, Frame>();
  let nextFrame = 1;

  const notify = () => {
    version++;
    listeners.forEach((listener) => listener());
  };
  /** Draws the views of a new frame */
  const commit = () => {
    const ops = recorder.ops();
    if (ops === committed) return;
    committed = ops;
    notify();
  };

  const canvas: ChartCanvas = {
    width: 0,
    height: 0,
    getContext: () => recorder.context,
    requestAnimationFrame(callback) {
      const id = nextFrame++;
      frames.set(
        id,
        requestFrame(() => {
          frames.delete(id);
          callback();
          commit();
        }),
      );
      return id;
    },
    cancelAnimationFrame(id) {
      frames.get(id)?.cancel();
      frames.delete(id);
    },
  };

  const local = (t: TouchPoint) => ({
    x: t.pageX - origin.x,
    y: t.pageY - origin.y,
  });
  const pointOf = (event: GestureResponderEvent) => {
    const n = event.nativeEvent;
    const t: TouchPoint =
      (n.changedTouches?.[0] as TouchPoint | undefined) ??
      (n.touches?.[0] as TouchPoint | undefined) ??
      (n as unknown as TouchPoint);
    return local(t);
  };
  /** Renders now (sizes, options) instead of on the next frame */
  const renderNow = () => {
    if (!instance) return;
    instance.render();
    commit();
  };

  const store: ShapeStore = {
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    version: () => version,
    prims() {
      const ops = committed ?? [];
      if (!cache || cache.ops !== ops) cache = { ops, prims: framePrims(ops) };
      return cache.prims;
    },
    mount(handlers) {
      const chart = createCanvasShapeChart({
        canvas,
        width: size?.[0] ?? 0,
        height: size?.[1] ?? 0,
        pixelRatio: 1,
        options,
        theme,
      });
      instance = chart;
      const offs = [
        chart.on("hover", (e) => {
          hover = e;
          handlers().onHover?.(e);
        }),
        chart.on("click", (e) => handlers().onClick?.(e)),
        chart.on("toggle", (e) => handlers().onToggle?.(e)),
        chart.on("drill", (e) => handlers().onDrill?.(e)),
      ];
      commit();
      return () => {
        offs.forEach((off) => off());
        chart.destroy();
        frames.forEach((frame) => frame.cancel());
        frames.clear();
        if (instance === chart) instance = null;
        hover = null;
      };
    },
    instance: () => instance,
    setOptions(next) {
      if (next === options) return;
      options = next;
      instance?.setOptions(next);
      renderNow();
    },
    setTheme(next) {
      if (next === theme) return;
      theme = next;
      instance?.setTheme(next);
      renderNow();
    },
    setSize(width, height) {
      if (size && size[0] === width && size[1] === height) return;
      size = [width, height];
      instance?.resize(width, height, 1);
      renderNow();
    },
    size: () => size,
    tip: () => (hover ? { event: hover, x: finger.x, y: finger.y } : null),
    touchStart(event) {
      const n = event.nativeEvent as unknown as TouchPoint;
      // the drawing ignores touches: `location` is relative to the surface
      if (n.locationX !== undefined)
        origin = { x: n.pageX - n.locationX, y: n.pageY - (n.locationY ?? 0) };
      const p = local(n);
      finger = p;
      press = { x: p.x, y: p.y, moved: false };
      // pressing highlights the mark under the finger (and shows its tooltip)
      instance?.pointerMove(p.x, p.y);
    },
    touchMove(event) {
      const p = pointOf(event);
      finger = p;
      if (press && Math.hypot(p.x - press.x, p.y - press.y) > TAP_SLOP)
        press.moved = true;
      instance?.pointerMove(p.x, p.y);
    },
    touchEnd(event) {
      const p = pointOf(event);
      const tap = press && !press.moved;
      press = null;
      // a tap toggles a legend item or clicks a mark
      if (tap && instance) {
        finger = p;
        instance.pointerDown(p.x, p.y);
        instance.pointerUp(p.x, p.y);
      }
    },
    touchCancel() {
      press = null;
      instance?.pointerLeave();
    },
  };
  return store;
}

/** A `renderTooltip` node, placed next to the finger once measured */
function CustomTooltip({
  anchor,
  width,
  height,
  children,
}: {
  anchor: { x: number; y: number };
  width: number;
  height: number;
  children: ReactNode;
}) {
  const { colors } = useTheme();
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  let left = anchor.x + 14;
  let top = anchor.y;
  if (size) {
    if (left + size.width > width - 4) left = anchor.x - 14 - size.width;
    left = Math.max(4, Math.min(left, width - size.width - 4));
    top = Math.max(
      4,
      Math.min(anchor.y - size.height - 12, height - size.height - 4),
    );
  }
  return (
    <View
      pointerEvents="none"
      {...part("chart", "tooltip", { custom: true })}
      onLayout={(e: LayoutChangeEvent) => {
        const { width: w, height: h } = e.nativeEvent.layout;
        setSize((previous) =>
          previous && previous.width === w && previous.height === h
            ? previous
            : { width: w, height: h },
        );
      }}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        maxWidth: Math.max(0, width - 8),
        padding: 8,
        backgroundColor: colors["surface-color"],
        borderColor: colors["border-color"],
        borderWidth: 1,
        borderRadius: 8,
        shadowColor: "#0f172a",
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
        opacity: size ? 1 : 0,
        transform: [{ translateX: left }, { translateY: top }],
      }}
    >
      {children}
    </View>
  );
}

export interface ShapeChartBaseProps extends Handlers {
  options: ShapeChartOptions;
  height?: DimensionValue;
  width?: DimensionValue;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  handleRef?: Ref<ShapeChartHandle>;
  renderTooltip?: (event: ShapeHoverEvent) => ReactNode;
}

/** Sizes the chart, forwards options / theme / touches to the engine and draws its frames */
export function ShapeChartBase({
  options,
  height = 320,
  width = "100%",
  style,
  testID,
  handleRef,
  renderTooltip,
  ...handlers
}: ShapeChartBaseProps) {
  const { tokens, fonts, reducedMotion } = useTheme();
  const family = fonts.sans;
  const theme = useMemo(() => chartThemeInput(tokens), [tokens]);
  const customTooltip = !!renderTooltip && options.tooltip !== false;
  const resolved = useMemo((): ShapeChartOptions => {
    let next = options;
    if (reducedMotion && next.animation !== false)
      next = { ...next, animation: false };
    if (customTooltip) {
      const base = typeof next.tooltip === "object" ? next.tooltip : {};
      // an empty text: the engine draws no tooltip, the React one shows
      next = { ...next, tooltip: { ...base, render: () => "" } };
    }
    return next;
  }, [options, customTooltip, reducedMotion]);

  const [store] = useState(() =>
    createShapeStore(
      resolved,
      theme,
      typeof width === "number" && typeof height === "number"
        ? [width, height]
        : null,
    ),
  );
  useSyncExternalStore(store.subscribe, store.version, store.version);

  useLayoutEffect(() => {
    store.setTheme(theme);
    store.setOptions(resolved);
  }, [store, resolved, theme]);

  useLayoutEffect(() => {
    if (typeof width === "number" && typeof height === "number")
      store.setSize(width, height);
  }, [store, width, height]);

  const handlersRef = useRef<Handlers>(handlers);
  useLayoutEffect(() => {
    handlersRef.current = handlers;
  });
  useEffect(() => {
    const h = handlersRef;
    return store.mount(() => h.current);
  }, [store]);

  useImperativeHandle(
    handleRef,
    () => ({ getInstance: () => store.instance() }),
    [store],
  );

  const onLayout = (e: LayoutChangeEvent) => {
    const { width: w, height: h } = e.nativeEvent.layout;
    if (w > 0 && h > 0) store.setSize(w, h);
  };

  const prims = store.prims();
  const frame = store.size();
  const tip = customTooltip ? store.tip() : null;
  let tooltip: ReactNode = null;
  if (tip && frame && renderTooltip) {
    const content = renderTooltip(tip.event);
    if (content !== null && content !== undefined && content !== false)
      tooltip = (
        <CustomTooltip
          anchor={{ x: tip.x, y: tip.y }}
          width={frame[0]}
          height={frame[1]}
        >
          {content}
        </CustomTooltip>
      );
  }

  return (
    <View
      testID={testID}
      onLayout={onLayout}
      style={[{ width, height }, style]}
      {...part("chart", "root")}
    >
      <View
        style={StyleSheet.absoluteFill}
        accessible
        accessibilityRole="image"
        accessibilityLabel={options.ariaLabel ?? describeShapeChart(options)}
        onStartShouldSetResponder={() => true}
        onResponderGrant={store.touchStart}
        onResponderMove={store.touchMove}
        onResponderRelease={store.touchEnd}
        onResponderTerminate={store.touchCancel}
        {...part("chart", "surface")}
      >
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          {renderPrims(prims, family)}
        </View>
      </View>
      {tooltip}
    </View>
  );
}
