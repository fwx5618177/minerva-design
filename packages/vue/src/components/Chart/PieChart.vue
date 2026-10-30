<script setup lang="ts">
import type {
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { pieProps, shapeCommonProps } from "./props";
import { shapeCommonOptions, useShapeChart } from "./shape";

/**
 * Pie chart (or a donut with `innerRadius`, or a Nightingale rose with
 * `rose`): slices with gaps, outside labels with leader lines, legend toggles.
 */
defineOptions({ name: "PieChart" });
const props = defineProps({ ...shapeCommonProps, ...pieProps });
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) slice changed (`null`: none) */
  hover: [event: ShapeHoverEvent | null];
  /** A slice was clicked, tapped or activated with Enter */
  click: [event: ShapeHoverEvent];
  /** A legend item was clicked (or `toggle()` was called) */
  toggle: [event: ShapeToggleEvent];
}>();
const { setContainer, rootStyle, handle } = useShapeChart(
  props,
  () => ({
    ...shapeCommonOptions(props),
    type: "pie",
    data: raw(props.data),
    innerRadius: props.innerRadius ?? 0,
    startAngle: props.startAngle,
    padAngle: props.padAngle,
    cornerRadius: props.cornerRadius,
    rose: props.rose,
    labels: props.labels,
    labelContent: raw(props.labelContent),
    centerValue: props.centerValue,
    centerLabel: props.centerLabel,
  }),
  {
    hover: (event) => emit("hover", event),
    click: (event) => emit("click", event),
    toggle: (event) => emit("toggle", event),
  },
);
defineExpose(handle);
</script>

<template>
  <div class="mn-chart mn-shape-chart" data-minerva="chart" :style="rootStyle">
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
