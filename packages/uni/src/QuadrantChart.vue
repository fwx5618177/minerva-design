<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  inject,
  ref,
  useSlots,
  type ComputedRef,
} from "vue";
import {
  quadrantAccessibleGroups,
  quadrantChartOptions,
  quadrantLabels,
  quadrantMoveDrop,
  quadrantMovedText,
  quadrantName,
  quadrantOf,
  type ChartHoverEvent,
  type ChartRect,
  type ChartView,
  type QuadrantAccessiblePoint,
  type QuadrantCorner,
  type QuadrantPoint,
} from "@minerva/charts/canvas";
import {
  chartCommonProps,
  quadrantChartProps,
  type QuadrantDropTarget,
} from "./chart-types";
import { chartEngineOptions, plain, useCanvasChart } from "./chart-canvas";
const props = defineProps({ ...chartCommonProps, ...quadrantChartProps });
const emit = defineEmits<{
  hover: [event: ChartHoverEvent | null];
  pointClick: [point: QuadrantPoint, index: number];
  quadrantClick: [quadrant: QuadrantCorner, position: { x: number; y: number }];
  pointDrop: [point: QuadrantPoint, index: number, target: QuadrantDropTarget];
  zoom: [view: ChartView];
}>();
defineSlots<{
  topLeft?: () => unknown;
  topRight?: () => unknown;
  bottomLeft?: () => unknown;
  bottomRight?: () => unknown;
}>();
const slots = useSlots();
const instance = getCurrentInstance();
// Dots are draggable by default as soon as a pointDrop listener is set
const draggable = () => props.draggable ?? !!instance?.vnode.props?.onPointDrop;
const geometry = () => ({
  xDomain: props.xDomain,
  yDomain: props.yDomain,
  xSplit: props.xSplit,
  ySplit: props.ySplit,
  reverseX: props.reverseX,
});
const {
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
} = useCanvasChart(
  () => props,
  () =>
    quadrantChartOptions(
      {
        points: plain(props.points),
        xDomain: plain(props.xDomain),
        yDomain: plain(props.yDomain),
        xSplit: props.xSplit,
        ySplit: props.ySplit,
        quadrants: plain(props.quadrants),
        xLabel: props.xLabel,
        yLabel: props.yLabel,
        axisLabels: plain(props.axisLabels),
        showTicks: props.showTicks,
        reverseX: props.reverseX,
        showLabels: props.showLabels,
        pointSize: props.pointSize,
        name: props.name,
        draggable: draggable(),
        showCounts: props.showCounts,
        selectedIndex: props.selectedIndex,
        selectedIndices: plain(props.selectedIndices),
      },
      chartEngineOptions(props, []),
    ),
  {
    hover: (event) => emit("hover", event),
    click: (event) => {
      const index = event.items[0]?.index;
      if (index !== undefined && props.points[index])
        emit("pointClick", props.points[index], index);
    },
    plotClick: (at) =>
      emit("quadrantClick", quadrantOf(geometry(), at.x, at.y), at),
    drop: (event) => {
      const index = event.item.index;
      if (!props.points[index]) return;
      emit("pointDrop", props.points[index], index, {
        x: event.x,
        y: event.y,
        quadrant: quadrantOf(geometry(), event.x, event.y),
      });
    },
    zoom: (view) => emit("zoom", view),
  },
);
const scrollLocked = computed(() => props.disableScroll ?? draggable());

const px = (value: number) => `${value}px`;
const cornerStyle = (
  corner: QuadrantCorner,
  rect: ChartRect,
  split: { x: number; y: number },
) => {
  const left = corner.endsWith("Left");
  const top = corner.startsWith("top");
  return [
    "position: absolute",
    `left: ${px(left ? rect.x : split.x)}`,
    `top: ${px(top ? rect.y : split.y)}`,
    `width: ${px(left ? split.x - rect.x : rect.x + rect.width - split.x)}`,
    `height: ${px(top ? split.y - rect.y : rect.y + rect.height - split.y)}`,
    "pointer-events: none",
  ].join("; ");
};
// Areas of the quadrant slots, over the canvas
const corners = computed(() => {
  const rect = plot.value;
  if (
    !rect ||
    !(slots.topLeft || slots.topRight || slots.bottomLeft || slots.bottomRight)
  )
    return null;
  const [x0, x1] = props.xDomain ?? [0, 10];
  const [y0, y1] = props.yDomain ?? [0, 10];
  const fx = ((props.xSplit ?? (x0 + x1) / 2) - x0) / (x1 - x0 || 1);
  const fy = ((props.ySplit ?? (y0 + y1) / 2) - y0) / (y1 - y0 || 1);
  const split = {
    x: rect.x + rect.width * (props.reverseX ? 1 - fx : fx),
    y: rect.y + rect.height * (1 - fy),
  };
  return {
    topLeft: cornerStyle("topLeft", rect, split),
    topRight: cornerStyle("topRight", rect, split),
    bottomLeft: cornerStyle("bottomLeft", rect, split),
    bottomRight: cornerStyle("bottomRight", rect, split),
  };
});

// Accessible list of the points (the canvas is an image for the screen
// readers); mini-programs read `aria-role` / `aria-label`, H5 `role`
const config = inject<ComputedRef<{ locale?: string }> | null>(
  "minerva:config",
  null,
);
const locale = () => props.locale || config?.value?.locale || undefined;
const movable = computed(
  () => !!instance?.vnode.props?.onPointDrop && props.draggable !== false,
);
const a11yGroups = computed(() =>
  props.accessiblePoints
    ? quadrantAccessibleGroups(
        {
          ...geometry(),
          points: plain(props.points),
          quadrants: plain(props.quadrants),
          xLabel: props.xLabel,
          yLabel: props.yLabel,
          name: props.name,
        },
        locale(),
      )
    : [],
);
const selected = computed(
  () =>
    new Set([
      ...(props.selectedIndices ?? []),
      ...(props.selectedIndex !== undefined && props.selectedIndex !== null
        ? [props.selectedIndex]
        : []),
    ]),
);
const announcement = ref("");
const a11yClick = (p: QuadrantAccessiblePoint) => {
  const point = props.points[p.index];
  if (point) emit("pointClick", point, p.index);
};
const a11yMove = (p: QuadrantAccessiblePoint, target: QuadrantCorner) => {
  const point = props.points[p.index];
  if (!point || !movable.value) return;
  emit("pointDrop", point, p.index, quadrantMoveDrop(geometry(), target));
  const texts = quadrantLabels(locale());
  announcement.value = quadrantMovedText(
    texts,
    p.name,
    quadrantName(target, { quadrants: props.quadrants }, texts),
  );
};
const VISUALLY_HIDDEN =
  "position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; " +
  "border: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap";
defineExpose(handle);
</script>
<template>
  <view
    ref="root"
    class="mn-chart mn-uni-chart mn-uni-quadrant-chart"
    :style="rootStyle"
    ><canvas
      :id="id"
      type="2d"
      :canvas-id="id"
      class="mn-chart-canvas"
      :hidpi="false"
      :disable-scroll="scrollLocked"
      role="img"
      :aria-label="ariaLabel"
      style="display: block; width: 100%; height: 100%"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchCancel"
    /><view
      v-if="corners && slots.topLeft"
      class="mn-chart-quadrant mn-chart-quadrant-topLeft"
      :style="corners.topLeft"
      ><view class="mn-chart-quadrant-content" style="pointer-events: auto"
        ><slot name="topLeft" /></view></view
    ><view
      v-if="corners && slots.topRight"
      class="mn-chart-quadrant mn-chart-quadrant-topRight"
      :style="corners.topRight"
      ><view class="mn-chart-quadrant-content" style="pointer-events: auto"
        ><slot name="topRight" /></view></view
    ><view
      v-if="corners && slots.bottomLeft"
      class="mn-chart-quadrant mn-chart-quadrant-bottomLeft"
      :style="corners.bottomLeft"
      ><view class="mn-chart-quadrant-content" style="pointer-events: auto"
        ><slot name="bottomLeft" /></view></view
    ><view
      v-if="corners && slots.bottomRight"
      class="mn-chart-quadrant mn-chart-quadrant-bottomRight"
      :style="corners.bottomRight"
      ><view class="mn-chart-quadrant-content" style="pointer-events: auto"
        ><slot name="bottomRight" /></view></view
    ><view
      v-if="a11yGroups.length"
      class="mn-chart-quadrant-points"
      :style="VISUALLY_HIDDEN"
      ><view
        v-for="group in a11yGroups"
        :key="group.quadrant"
        role="list"
        aria-role="list"
        :aria-label="group.name"
        :data-quadrant="group.quadrant"
        ><view
          v-for="p in group.points"
          :key="p.index"
          role="listitem"
          aria-role="listitem"
          ><view
            role="button"
            aria-role="button"
            :aria-label="p.description"
            :aria-selected="selected.has(p.index) ? 'true' : undefined"
            :data-point-index="p.index"
            @tap="a11yClick(p)"
            >{{ p.name }}</view
          ><template v-if="movable"
            ><view
              v-for="m in p.moves"
              :key="m.quadrant"
              role="button"
              aria-role="button"
              :aria-label="`${p.name}, ${m.label}`"
              :data-point-index="p.index"
              :data-move="m.quadrant"
              @tap="a11yMove(p, m.quadrant)"
              >{{ m.label }}</view
            ></template
          ></view
        ></view
      ><view role="status" aria-live="polite">{{ announcement }}</view></view
    ></view
  >
</template>
