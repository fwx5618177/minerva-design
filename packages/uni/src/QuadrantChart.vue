<script setup lang="ts">
import { computed, getCurrentInstance, useSlots } from "vue";
import {
  quadrantChartOptions,
  quadrantOf,
  type ChartHoverEvent,
  type ChartRect,
  type ChartView,
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
      @touchcancel="onTouchCancel" /><view
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
  ></view>
</template>
