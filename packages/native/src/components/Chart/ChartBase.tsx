// The chart host of React Native: owns a platform-free chart controller
// (@minerva/charts/canvas: options, model, zoom, gestures, scene in pixels)
// and draws its scene with views (./scene). Touches go through the
// responder system; the drawing is `pointerEvents="none"`, so every touch
// lands on the surface and positions come from page coordinates.

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
  createChartController,
  type ChartController,
  type ChartDragEvent,
  type ChartHoverEvent,
  type ChartOptions,
  type ChartPlotClickEvent,
  type ChartRect,
  type ChartScene,
  type ChartThemeInput,
  type ChartTooltipOptions,
  type ChartView,
} from "@minerva/charts/canvas";
import { useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { measureChartText } from "./measure";
import { drawHover, drawStatic, tooltipCard } from "./scene";
import { chartThemeInput } from "./theme";
import type { ChartCommonProps, ChartHandle } from "./types";

interface Handlers {
  onHover?: (event: ChartHoverEvent | null) => void;
  onPointClick?: (event: ChartHoverEvent) => void;
  onPlotClick?: (event: ChartPlotClickEvent) => void;
  onZoom?: (view: ChartView) => void;
  onDrag?: (event: ChartDragEvent) => void;
  onDrop?: (event: ChartDragEvent) => void;
}

/** Engine options of the common props */
export const engineOptions = (
  props: Pick<
    ChartCommonProps,
    | "xAxis"
    | "yAxis"
    | "legend"
    | "tooltip"
    | "crosshair"
    | "annotations"
    | "interaction"
    | "padding"
    | "palette"
    | "ariaLabel"
  > &
    Pick<ChartOptions, "series">,
): ChartOptions => ({
  series: props.series,
  xAxis: props.xAxis,
  yAxis: props.yAxis,
  legend: props.legend,
  tooltip: props.tooltip,
  crosshair: props.crosshair,
  annotations: props.annotations,
  interaction: props.interaction,
  padding: props.padding,
  palette: props.palette,
  ariaLabel: props.ariaLabel,
});

type TooltipResult = Exclude<
  ReturnType<NonNullable<ChartTooltipOptions["render"]>>,
  string | null
>;
/** Non-string result of `tooltip.render`: the engine lays a tooltip out without drawing text */
const CUSTOM_TOOLTIP = {} as unknown as TooltipResult;

interface TouchPoint {
  identifier?: number | string;
  pageX: number;
  pageY: number;
  locationX?: number;
  locationY?: number;
}

const idOf = (t: TouchPoint, index: number) => {
  const id = Number(t.identifier);
  return Number.isFinite(id) ? id : index;
};

type Frame = { cancel: () => void };

const requestFrame = (callback: () => void): Frame => {
  if (typeof requestAnimationFrame === "function") {
    const id = requestAnimationFrame(callback);
    return { cancel: () => cancelAnimationFrame(id) };
  }
  const id = setTimeout(callback, 16);
  return { cancel: () => clearTimeout(id) };
};

/**
 * External store of a chart: the controller, a version bumped when its
 * scene must be drawn again (coalesced per frame), the touches being
 * tracked and the cache of the static layers.
 */
interface ChartStore {
  controller: ChartController;
  /** Options of the controller (`setOptions` of the controller) */
  setOptions: (options: ChartOptions) => void;
  subscribe: (listener: () => void) => () => void;
  version: () => number;
  /** Draws again now */
  commit: () => void;
  /** Static layers of a scene (cached while model / view / size are the same) */
  layers: (scene: ChartScene, family: string | undefined) => ReactNode;
  /** Last single-finger position (anchor of a custom tooltip) */
  anchor: { x: number; y: number } | null;
  /**
   * First finger (responder grant); returns whether the chart owns the
   * gesture, which keeps native scroll views from taking it (Android)
   */
  touchStart: (event: GestureResponderEvent) => boolean;
  /** Another finger touches the chart */
  touchAdd: (event: GestureResponderEvent) => void;
  /** Moves (drawn on the next frame) */
  touchMove: (event: GestureResponderEvent) => void;
  touchEnd: (event: GestureResponderEvent) => void;
  touchCancel: () => void;
  /** Whether the chart keeps the touches (pinch, point drag, pan when zoomed) */
  holdsGesture: () => boolean;
}

function createChartStore(
  options: ChartOptions,
  theme: ChartThemeInput,
  size: [number, number] | null,
): ChartStore {
  let version = 0;
  let frame: Frame | null = null;
  const listeners = new Set<() => void>();
  let cache: { key: unknown[]; node: ReactNode } | null = null;
  let origin = { x: 0, y: 0 };
  const touches = new Map<number, { x: number; y: number }>();
  const dragsPoints = (o: ChartOptions) =>
    typeof o.interaction === "object" && !!o.interaction.dragPoints;
  let draggable = dragsPoints(options);
  /** The current touch sequence started on the plot of a draggable chart */
  let claimed = false;

  const notify = () => {
    version++;
    listeners.forEach((listener) => listener());
  };
  const cancelFrame = () => {
    frame?.cancel();
    frame = null;
  };
  const schedule = () => {
    if (frame || !listeners.size) return;
    frame = requestFrame(() => {
      frame = null;
      notify();
    });
  };

  const controller = createChartController({
    options,
    theme,
    measureText: measureChartText,
    onInvalidate: schedule,
  });
  if (size) controller.setSize(size[0], size[1]);

  const local = (t: TouchPoint) => ({
    x: t.pageX - origin.x,
    y: t.pageY - origin.y,
  });

  /** Feeds the controller the fingers that appeared or moved */
  const sync = (event: GestureResponderEvent) => {
    const n = event.nativeEvent;
    const list: readonly TouchPoint[] = n.touches?.length
      ? n.touches
      : [n as unknown as TouchPoint];
    list.forEach((t, i) => {
      const id = idOf(t, i);
      const p = local(t);
      const previous = touches.get(id);
      if (!previous) {
        touches.set(id, p);
        controller.pointerDown(p.x, p.y, { id, touch: true });
      } else if (previous.x !== p.x || previous.y !== p.y) {
        touches.set(id, p);
        controller.pointerMove(p.x, p.y, { id, touch: true });
      }
    });
    if (touches.size === 1) store.anchor = [...touches.values()][0];
  };

  const store: ChartStore = {
    controller,
    setOptions(next) {
      draggable = dragsPoints(next);
      controller.setOptions(next);
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        if (!listeners.size) cancelFrame();
      };
    },
    version: () => version,
    commit() {
      cancelFrame();
      notify();
    },
    layers(scene, family) {
      const { plot } = scene.layout;
      const { view } = scene;
      const key = [
        scene.model,
        scene.annotations,
        scene.theme,
        scene.width,
        scene.height,
        view.x[0],
        view.x[1],
        view.y[0],
        view.y[1],
        plot.x,
        plot.y,
        plot.width,
        plot.height,
        family,
      ];
      if (!cache || cache.key.some((value, i) => value !== key[i]))
        cache = { key, node: drawStatic(scene, family) };
      return cache.node;
    },
    anchor: null,
    touchStart(event) {
      const n = event.nativeEvent as unknown as TouchPoint;
      // the drawing ignores touches: `location` is relative to the surface
      if (!touches.size && n.locationX !== undefined)
        origin = { x: n.pageX - n.locationX, y: n.pageY - (n.locationY ?? 0) };
      sync(event);
      store.commit();
      // draggable points: the drag only starts after the touch slop, too
      // late to keep a scroll view from stealing the touch: claim it now
      const plot = controller.getPlotRect();
      const p = touches.values().next().value;
      claimed =
        draggable &&
        !!plot &&
        !!p &&
        p.x >= plot.x &&
        p.x <= plot.x + plot.width &&
        p.y >= plot.y &&
        p.y <= plot.y + plot.height;
      return store.holdsGesture();
    },
    touchAdd(event) {
      sync(event);
      store.commit();
    },
    touchMove: sync,
    touchEnd(event) {
      const n = event.nativeEvent;
      const active = new Set(
        (n.touches ?? []).map((t, i) => idOf(t as TouchPoint, i)),
      );
      const changed: readonly TouchPoint[] = n.changedTouches?.length
        ? n.changedTouches
        : [n as unknown as TouchPoint];
      for (const [id, last] of [...touches]) {
        if (active.has(id)) continue;
        const touch = changed.find((t, i) => idOf(t, i) === id);
        const p = touch ? local(touch) : last;
        touches.delete(id);
        if (touches.size === 0) store.anchor = p;
        controller.pointerUp(p.x, p.y, { id, touch: true });
      }
      store.commit();
    },
    touchCancel() {
      for (const id of touches.keys()) controller.pointerCancel({ id });
      touches.clear();
      store.commit();
    },
    holdsGesture() {
      if (touches.size > 1 || (claimed && touches.size > 0)) return true;
      const scene = controller.getScene();
      if (!scene) return false;
      if (scene.dragging) return true;
      const { base } = scene.model;
      const view = controller.getView();
      return (
        view.x[0] !== base.x[0] ||
        view.x[1] !== base.x[1] ||
        view.y[0] !== base.y[0] ||
        view.y[1] !== base.y[1]
      );
    },
  };
  return store;
}

/** A `renderTooltip` node, placed next to the finger once measured */
function CustomTooltip({
  scene,
  anchor,
  children,
}: {
  scene: ChartScene;
  anchor: { x: number; y: number };
  children: ReactNode;
}) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const { width, height } = scene;
  let left = anchor.x + 14;
  let top = anchor.y;
  if (size) {
    if (left + size.width > width - 4) left = anchor.x - 14 - size.width;
    left = Math.max(4, Math.min(left, width - size.width - 4));
    top = Math.max(
      4,
      Math.min(anchor.y - size.height / 2, height - size.height - 4),
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
      style={[
        tooltipCard(scene),
        {
          // laid out at the origin (full width available), moved by a transform
          left: 0,
          top: 0,
          maxWidth: Math.max(0, width - 8),
          padding: 8,
          opacity: size ? 1 : 0,
          transform: [{ translateX: left }, { translateY: top }],
        },
      ]}
    >
      {children}
    </View>
  );
}

interface ChartBaseProps extends Handlers {
  options: ChartOptions;
  height?: DimensionValue;
  width?: DimensionValue;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  handleRef?: Ref<ChartHandle>;
  /** React content of the tooltip (replaces the engine's content) */
  renderTooltip?: (event: ChartHoverEvent) => ReactNode;
  /** React content placed over the plot area, given the plot rectangle */
  overlay?: (plot: ChartRect) => ReactNode;
}

/** Sizes the chart, forwards options / theme / touches to the controller and draws its scene */
export function ChartBase({
  options,
  height = 320,
  width = "100%",
  style,
  testID,
  handleRef,
  renderTooltip,
  overlay,
  ...handlers
}: ChartBaseProps) {
  const { tokens, fonts } = useTheme();
  const family = fonts.sans;
  const theme = useMemo(() => chartThemeInput(tokens), [tokens]);
  const customTooltip = !!renderTooltip && options.tooltip !== false;
  const resolved = useMemo((): ChartOptions => {
    if (!customTooltip) return options;
    const base = typeof options.tooltip === "object" ? options.tooltip : {};
    return { ...options, tooltip: { ...base, render: () => CUSTOM_TOOLTIP } };
  }, [options, customTooltip]);

  const [store] = useState(() =>
    createChartStore(
      resolved,
      theme,
      typeof width === "number" && typeof height === "number"
        ? [width, height]
        : null,
    ),
  );
  const { controller } = store;
  useSyncExternalStore(store.subscribe, store.version, store.version);

  const applied = useRef({ options: resolved, theme });
  useLayoutEffect(() => {
    const current = applied.current;
    if (current.theme === theme && current.options === resolved) return;
    if (current.theme !== theme) controller.setTheme(theme);
    if (current.options !== resolved) store.setOptions(resolved);
    applied.current = { options: resolved, theme };
    store.commit();
  }, [controller, store, resolved, theme]);

  useLayoutEffect(() => {
    if (typeof width !== "number" || typeof height !== "number") return;
    const scene = controller.getScene();
    if (scene && scene.width === width && scene.height === height) return;
    controller.setSize(width, height);
    store.commit();
  }, [controller, store, width, height]);

  const handlersRef = useRef<Handlers>(handlers);
  useLayoutEffect(() => {
    handlersRef.current = handlers;
  });
  useEffect(() => {
    const h = handlersRef;
    const offs = [
      controller.on("hover", (e) => h.current.onHover?.(e)),
      controller.on("click", (e) => h.current.onPointClick?.(e)),
      controller.on("plotClick", (e) => h.current.onPlotClick?.(e)),
      controller.on("zoom", (v) => h.current.onZoom?.(v)),
      controller.on("drag", (e) => h.current.onDrag?.(e)),
      controller.on("drop", (e) => h.current.onDrop?.(e)),
    ];
    return () => offs.forEach((off) => off());
  }, [controller]);

  useImperativeHandle(
    handleRef,
    () => ({
      resetZoom: () => controller.resetZoom(),
      getView: () => controller.getView(),
      setView: (view) => controller.setView(view),
      getPlotRect: () => controller.getPlotRect(),
      getController: () => controller,
    }),
    [controller],
  );

  const onLayout = (e: LayoutChangeEvent) => {
    const { width: w, height: h } = e.nativeEvent.layout;
    const scene = controller.getScene();
    if (scene && scene.width === w && scene.height === h) return;
    controller.setSize(w, h);
    store.commit();
  };

  const scene = controller.getScene();
  let tooltip: ReactNode = null;
  const event = scene?.hover?.tooltip ? scene.hover.event : null;
  if (scene && event && customTooltip && renderTooltip) {
    const content = renderTooltip(event);
    const anchor = store.anchor ?? scene.hover?.marks[0] ?? null;
    if (
      content !== null &&
      content !== undefined &&
      content !== false &&
      anchor
    )
      tooltip = (
        <CustomTooltip scene={scene} anchor={anchor}>
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
        accessibilityLabel={options.ariaLabel}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => !store.holdsGesture()}
        onResponderGrant={store.touchStart}
        onResponderStart={store.touchAdd}
        onResponderMove={store.touchMove}
        onResponderEnd={store.touchEnd}
        onResponderRelease={store.touchEnd}
        onResponderTerminate={store.touchCancel}
        {...part("chart", "surface")}
      >
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          {scene ? store.layers(scene, family) : null}
          {scene ? drawHover(scene, family, customTooltip) : null}
        </View>
      </View>
      {overlay && scene ? (
        <View
          pointerEvents="box-none"
          style={{
            position: "absolute",
            left: scene.layout.plot.x,
            top: scene.layout.plot.y,
            width: scene.layout.plot.width,
            height: scene.layout.plot.height,
          }}
          {...part("chart", "overlay")}
        >
          {overlay(scene.layout.plot)}
        </View>
      ) : null}
      {tooltip}
    </View>
  );
}
