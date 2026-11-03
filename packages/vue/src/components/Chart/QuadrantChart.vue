<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  shallowRef,
  useSlots,
  watch,
  type CSSProperties,
} from "vue";
import {
  QUADRANT_CORNERS,
  createQuadrantPointCard,
  createQuadrantPointLayer,
  quadrantChartOptions,
  quadrantGroups,
  quadrantOf,
  withQuadrantCard,
  type ChartDragEvent,
  type ChartHoverEvent,
  type ChartRect,
  type ChartRendererKind,
  type ChartView,
  type QuadrantAccessibleConfig,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantPointCard,
  type QuadrantPointCardOptions,
  type QuadrantPointLayer,
  type QuadrantPointLayerOptions,
} from "minerva-design/charts/core";
import { engineOptions, useCartesianChart } from "./cartesian";
import { raw } from "./engine";
import { quadrantChartProps } from "./props";
import type { QuadrantDropTarget, QuadrantHeaderInfo } from "./types";

/**
 * Four-quadrant matrix (priority matrix, Eisenhower, BCG, ...): tinted
 * quadrants with titles, dividers, and labelled dots placed without
 * overlapping labels. Dots can be dragged to another quadrant.
 */
defineOptions({ name: "QuadrantChart" });
const props = defineProps(quadrantChartProps);
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) point changed (`null`: none) */
  hover: [event: ChartHoverEvent | null];
  /** A point was clicked */
  pointClick: [point: QuadrantPoint, index: number];
  /** The same point was clicked twice in quick succession */
  pointDoubleClick: [point: QuadrantPoint, index: number];
  /** A point is being dragged (on every move, with the quadrant under the pointer) */
  pointDrag: [point: QuadrantPoint, index: number, target: QuadrantDropTarget];
  /** The empty area of a quadrant was clicked */
  quadrantClick: [quadrant: QuadrantCorner, position: { x: number; y: number }];
  /** A dragged point was released (the chart does not move it: update `points`) */
  pointDrop: [point: QuadrantPoint, index: number, target: QuadrantDropTarget];
  /** The user zoomed or panned */
  zoom: [view: ChartView];
  /** The backend is ready (or fell back after a GPU loss) */
  rendererChange: [renderer: ChartRendererKind];
}>();
defineSlots<{
  /**
   * Actions of a point (e.g. compact edit / delete buttons), shown in the
   * point card of the hovered or focused point, else of the `selectedIndex`
   * point (with this slot, the selected point keeps its card); they receive
   * pointer events
   */
  "point-actions"?: (props: { point: QuadrantPoint; index: number }) => unknown;
  /**
   * Header of each quadrant, in its outer corner (top edge for the top
   * quadrants, bottom edge for the bottom ones, aligned to the outer side);
   * replaces the drawn title, badge, description and count. The header
   * receives pointer events (e.g. an add button)
   */
  "quadrant-header"?: (props: {
    corner: QuadrantCorner;
    info: QuadrantHeaderInfo;
  }) => unknown;
}>();
const slots = useSlots();
const vnode = getCurrentInstance()?.vnode;
/** Two clicks on the same point within this delay count as a double click */
const DOUBLE_CLICK_MS = 400;
let lastClick: { index: number; time: number } | null = null;
const geometry = () => ({
  xDomain: raw(props.xDomain),
  yDomain: raw(props.yDomain),
  xSplit: props.xSplit,
  ySplit: props.ySplit,
  reverseX: props.reverseX,
});
const dropAt = (event: ChartDragEvent): QuadrantDropTarget => ({
  x: event.x,
  y: event.y,
  quadrant: quadrantOf(geometry(), event.x, event.y),
});
// keyboard-focused point of the accessible layer (drawn with a focus ring)
const focusedIndex = ref<number | null>(null);
const root = ref<HTMLElement | null>(null);
// plot area (overlay of the slots and of the point card)
const plot = ref<ChartRect | null>(null);
// the point card is DOM of its own (shared with the other renderers): hover,
// focus and drag moves render nothing here; only the `point-actions` slot is
// rendered again (teleported into the card) when another point shows it
const cardHost = ref<HTMLElement | null>(null);
const card = shallowRef<QuadrantPointCard | null>(null);
const cardIndex = ref<number | null>(null);
// before the engine is destroyed: the card gives the drawn label back to it
onBeforeUnmount(() => {
  card.value?.destroy();
  card.value = null;
});
const build = () => {
  const headers = !!slots["quadrant-header"];
  // the point card names the hovered, focused, selected or dragged point: no
  // tooltip, no label chip and no drag pill of the engine beside it
  const options = withQuadrantCard(
    quadrantChartOptions(
      {
        ...geometry(),
        points: raw(props.points).map(raw),
        quadrants: raw(props.quadrants),
        xLabel: props.xLabel,
        yLabel: props.yLabel,
        axisLabels: raw(props.axisLabels),
        showTicks: props.showTicks,
        showLabels: props.showLabels,
        pointSize: props.pointSize,
        name: props.name,
        draggable:
          props.draggable ??
          !!(vnode?.props?.onPointDrop || vnode?.props?.onPointDrag),
        showCounts: headers ? undefined : props.showCounts,
        selectedIndex: props.selectedIndex,
        selectedIndices: raw(props.selectedIndices),
      },
      (({ series: _series, ...rest }) => rest)(engineOptions(props, [])),
      { focusedIndex: props.accessiblePoints ? focusedIndex.value : null },
    ),
  );
  if (headers)
    // the slot headers replace the drawn titles (the first four areas)
    options.annotations = options.annotations?.map((a, i) =>
      i < 4 && a.type === "rect"
        ? {
            ...a,
            label: undefined,
            badge: undefined,
            description: undefined,
            detail: undefined,
          }
        : a,
    );
  return options;
};
// a click on a dot or on the name in its card; two quick ones in a row
// count as a double click
const clickPoint = (index: number) => {
  const point = props.points[index];
  if (!point) return;
  const now = Date.now();
  const double =
    lastClick?.index === index && now - lastClick.time < DOUBLE_CLICK_MS;
  lastClick = double ? null : { index, time: now };
  emit("pointClick", point, index);
  if (double) emit("pointDoubleClick", point, index);
};
const { setContainer, rootStyle, handle } = useCartesianChart(props, build, {
  hover: (event) => {
    card.value?.hover(event?.items?.[0]?.index ?? null);
    emit("hover", event);
  },
  click: (event) => {
    const index = event.items[0]?.index;
    if (index !== undefined) clickPoint(index);
  },
  plotClick: (at) =>
    emit("quadrantClick", quadrantOf(geometry(), at.x, at.y), {
      x: at.x,
      y: at.y,
    }),
  dragStart: (event) =>
    card.value?.drag(event.item.index, { x: event.x, y: event.y }),
  drag: (event) => {
    card.value?.move({ x: event.x, y: event.y });
    const point = props.points[event.item.index];
    if (point) emit("pointDrag", point, event.item.index, dropAt(event));
  },
  dragEnd: () => card.value?.drag(null),
  drop: (event) => {
    const point = props.points[event.item.index];
    if (point) emit("pointDrop", point, event.item.index, dropAt(event));
  },
  zoom: (view) => emit("zoom", view),
  renderer: (renderer) => emit("rendererChange", renderer),
  layout: (rect) => {
    plot.value = rect;
  },
});

// the slots and the point card, over the plot area (same DOM as the React
// renderer)
const px = (value: number) => `${value}px`;
const fraction = (v: number, a: number, b: number) => (v - a) / (b - a || 1);
const domains = () => ({
  x: props.xDomain ?? [0, 10],
  y: props.yDomain ?? [0, 10],
});
/** Position of a data point in the plot, in fractions of its size */
const visual = (x: number, y: number) => {
  const d = domains();
  const fx = fraction(x, d.x[0], d.x[1]);
  return {
    x: props.reverseX ? 1 - fx : fx,
    y: 1 - fraction(y, d.y[0], d.y[1]),
  };
};
const overlayStyle = computed<CSSProperties>(() => {
  const rect = plot.value;
  return rect
    ? {
        position: "absolute",
        left: px(rect.x),
        top: px(rect.y),
        width: px(rect.width),
        height: px(rect.height),
        pointerEvents: "none",
      }
    : { display: "none" };
});
/** The box of the point card: the plot, in pixels (the card reads its size) */
const cardHostStyle = computed<CSSProperties>(() => ({
  position: "absolute",
  left: 0,
  top: 0,
  width: px(plot.value?.width ?? 0),
  height: px(plot.value?.height ?? 0),
  pointerEvents: "none",
}));
const cornerStyle = (corner: QuadrantCorner): CSSProperties => {
  const rect = plot.value ?? { width: 0, height: 0 };
  const d = domains();
  const split = visual(
    props.xSplit ?? (d.x[0] + d.x[1]) / 2,
    props.ySplit ?? (d.y[0] + d.y[1]) / 2,
  );
  const sx = rect.width * split.x;
  const sy = rect.height * split.y;
  const left = corner.endsWith("Left");
  const top = corner.startsWith("top");
  return {
    position: "absolute",
    left: px(left ? 0 : sx),
    top: px(top ? 0 : sy),
    width: px(left ? sx : rect.width - sx),
    height: px(top ? sy : rect.height - sy),
    pointerEvents: "none",
  };
};
const headerStyle = (corner: QuadrantCorner): CSSProperties => {
  const top = corner.startsWith("top");
  const left = corner.endsWith("Left");
  return {
    position: "absolute",
    [top ? "top" : "bottom"]: 0,
    [left ? "left" : "right"]: 0,
    maxWidth: "100%",
    boxSizing: "border-box",
    padding: "8px",
    display: "flex",
    justifyContent: left ? "flex-start" : "flex-end",
    pointerEvents: "auto",
  };
};
const groups = computed(() =>
  quadrantGroups({ ...geometry(), points: raw(props.points).map(raw) }),
);
const headerInfo = (corner: QuadrantCorner): QuadrantHeaderInfo => ({
  count: groups.value[corner].points.length,
  points: groups.value[corner].points,
  indices: groups.value[corner].indices,
  region: props.quadrants?.[corner],
});
/** Point of the card whose actions the `point-actions` slot renders */
const cardPoint = computed(() => {
  const index = cardIndex.value;
  const point = index === null ? undefined : props.points[index];
  return point && index !== null ? { index, point } : null;
});

/** The points and the geometry, for the accessible layer and the card */
const pointConfig = (): QuadrantAccessibleConfig => ({
  ...geometry(),
  points: raw(props.points).map(raw),
  quadrants: raw(props.quadrants),
  xLabel: props.xLabel,
  yLabel: props.yLabel,
  name: props.name,
});

const cardOptions = (): QuadrantPointCardOptions => ({
  config: pointConfig(),
  locale: props.locale,
  pointSize: props.pointSize,
  // the hovered point shows its card unless the tooltip is off
  hover: props.tooltip !== false,
  selectedIndex: props.selectedIndex,
  // a plain chart rings its selected point; a board keeps its card (the
  // actions of the point stay at hand)
  showSelected: !!slots["point-actions"],
  hasActions: () => !!slots["point-actions"],
  chart: handle.getInstance(),
  onClick: clickPoint,
  onChange: (index) => {
    cardIndex.value = index;
  },
});
// the box of the card is rendered once the plot is laid out
watch(
  [cardHost, () => handle.getInstance()],
  ([host, chart]) => {
    card.value?.destroy();
    card.value = null;
    cardIndex.value = null;
    if (host && chart)
      card.value = createQuadrantPointCard(host, cardOptions());
  },
  { flush: "post" },
);
const syncCard = () => card.value?.update(cardOptions());
// new slots (re-rendered by the parent), and the actions rendered in the
// card: its size and place follow
onUpdated(syncCard);
// the focused point button, named again by the new points
watch(
  [card, focusedIndex, () => props.points, () => props.accessiblePoints],
  () => card.value?.focus(props.accessiblePoints ? focusedIndex.value : null),
  { flush: "post" },
);

// the accessible point layer (shared with the other DOM renderers)
let layer: QuadrantPointLayer | null = null;
const layerOptions = (): QuadrantPointLayerOptions => ({
  config: pointConfig(),
  locale: props.locale,
  movable: !!vnode?.props?.onPointDrop && props.draggable !== false,
  selected: [
    ...(props.selectedIndices ?? []),
    ...(props.selectedIndex !== undefined && props.selectedIndex !== null
      ? [props.selectedIndex]
      : []),
  ],
  onFocusChange: (index, hover) => {
    focusedIndex.value = index;
    emit("hover", hover);
  },
  onClick: (index) => {
    const point = props.points[index];
    if (point) emit("pointClick", point, index);
  },
  onMove: (index, target) => {
    const point = props.points[index];
    if (point) emit("pointDrop", point, index, target);
  },
});
const syncLayer = () => {
  if (!props.accessiblePoints) {
    layer?.destroy();
    layer = null;
    focusedIndex.value = null;
  } else if (layer) layer.update(layerOptions());
  else if (root.value)
    layer = createQuadrantPointLayer(root.value, layerOptions());
};
onMounted(syncLayer);
watch(
  () => ({ ...props }),
  () => {
    syncLayer();
    syncCard();
  },
  { flush: "post" },
);
// the focus ring is not a prop: redraw on its own
watch(focusedIndex, () => handle.getInstance()?.setOptions(build()));
onBeforeUnmount(() => {
  layer?.destroy();
  layer = null;
});
defineExpose(handle);
</script>

<template>
  <div
    ref="root"
    class="mn-chart mn-quadrant-chart"
    data-minerva="chart"
    :style="rootStyle"
  >
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
    <div v-if="plot" class="minerva-chart-overlay" :style="overlayStyle">
      <template v-if="slots['quadrant-header']">
        <div
          v-for="corner in QUADRANT_CORNERS"
          :key="corner"
          :style="cornerStyle(corner)"
        >
          <div
            :class="`minerva-chart-quadrant-header minerva-chart-quadrant-header-${corner}`"
            :style="headerStyle(corner)"
          >
            <slot
              name="quadrant-header"
              :corner="corner"
              :info="headerInfo(corner)"
            />
          </div>
        </div>
      </template>
      <!-- the box of the point card (DOM of its own, filled by the card) -->
      <div ref="cardHost" :style="cardHostStyle"></div>
    </div>
    <Teleport v-if="card && cardPoint" :to="card.actions">
      <slot
        name="point-actions"
        :point="cardPoint.point"
        :index="cardPoint.index"
      />
    </Teleport>
  </div>
</template>
