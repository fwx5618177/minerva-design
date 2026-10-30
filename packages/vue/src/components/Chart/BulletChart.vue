<script setup lang="ts">
import type { PropType } from "vue";
import type {
  BulletDatum,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { shapeCommonProps } from "./props";
import { shapeCommonOptions, useShapeChart } from "./shape";

/**
 * Bullet chart: KPI bars against qualitative ranges and a target marker
 */
defineOptions({ name: "BulletChart" });
const props = defineProps({
  ...shapeCommonProps,
  /** Rows (columns when vertical): name, value, target, ranges and scale */
  data: { type: Array as PropType<readonly BulletDatum[]>, required: true },
  /** Horizontal rows or vertical columns (default `horizontal`) */
  orientation: String as PropType<"horizontal" | "vertical">,
  /** Qualitative ranges of the rows without `ranges`: upper bounds, ascending */
  ranges: Array as PropType<readonly number[]>,
  /** Names of the qualitative ranges, lowest first (tooltip) */
  rangeLabels: Array as PropType<readonly string[]>,
  /** Colors of the qualitative ranges, lowest first; shades of gray by default */
  rangeColors: Array as PropType<readonly string[]>,
  /** Thickness of the value bar as a fraction of the ranges' thickness (default 0.4) */
  barSize: Number,
  /** Color of the target markers (default: the text color) */
  targetColor: String,
  /** Tick labels of the scales, when there is room (default `true`) */
  ticks: { type: Boolean, default: undefined },
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) bar changed (`null`: none) */
  hover: [event: ShapeHoverEvent | null];
  /** A bar was clicked, tapped or activated with Enter */
  click: [event: ShapeHoverEvent];
  /** A legend item was clicked (or `toggle()` was called) */
  toggle: [event: ShapeToggleEvent];
}>();
const { setContainer, rootStyle, handle } = useShapeChart(
  props,
  () => ({
    ...shapeCommonOptions(props),
    type: "bullet",
    data: raw(props.data),
    orientation: props.orientation,
    ranges: raw(props.ranges),
    rangeLabels: raw(props.rangeLabels),
    rangeColors: raw(props.rangeColors),
    barSize: props.barSize,
    targetColor: props.targetColor,
    ticks: props.ticks,
  }),
  {
    hover: (event) => emit("hover", event),
    click: (event) => emit("click", event),
    toggle: (event) => emit("toggle", event),
  },
  () =>
    props.orientation === "vertical"
      ? 320
      : Math.max(96, props.data.length * 64 + 16) + (props.legend ? 34 : 0),
);
defineExpose(handle);
</script>

<template>
  <div class="mn-chart mn-shape-chart" data-minerva="chart" :style="rootStyle">
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
