<script setup lang="ts">
import type { PropType } from "vue";
import type {
  RadarIndicator,
  RadarSeries,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { shapeCommonProps } from "./props";
import { shapeCommonOptions, useShapeChart } from "./shape";

/** Radar (spider) chart comparing series over several indicators */
defineOptions({ name: "RadarChart" });
const props = defineProps({
  ...shapeCommonProps,
  /** Axes of the chart `{ name, max }`, clockwise from 12 o'clock */
  indicators: {
    type: Array as PropType<readonly RadarIndicator[]>,
    required: true,
  },
  /** Polygons `{ name, values }`: one value per indicator */
  series: { type: Array as PropType<readonly RadarSeries[]>, required: true },
  /** Grid shape (default `polygon`) */
  shape: String as PropType<"polygon" | "circle">,
  /** Number of grid rings (default 4) */
  levels: Number,
  /** Dots on the vertices (default `true`) */
  dots: { type: Boolean, default: undefined },
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) series changed (`null`: none) */
  hover: [event: ShapeHoverEvent | null];
  /** A series was clicked, tapped or activated with Enter */
  click: [event: ShapeHoverEvent];
  /** A legend item was clicked (or `toggle()` was called) */
  toggle: [event: ShapeToggleEvent];
}>();
const { setContainer, rootStyle, handle } = useShapeChart(
  props,
  () => ({
    ...shapeCommonOptions(props),
    type: "radar",
    indicators: raw(props.indicators),
    series: raw(props.series),
    shape: props.shape,
    levels: props.levels,
    dots: props.dots,
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
