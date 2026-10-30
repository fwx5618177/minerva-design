<script setup lang="ts">
import type { PropType } from "vue";
import type {
  ShapeChartOptions,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { chartFrameProps } from "./props";
import { useShapeChart } from "./shape";

/**
 * Any shape chart of the engine (pie, donut, radar, gauge, funnel, treemap,
 * sankey, sunburst...), chosen by the `type` of its engine options
 * (`ShapeChartOptions` of `minerva-design/charts/core`)
 */
defineOptions({ name: "ShapeChart" });
const props = defineProps({
  ...chartFrameProps,
  /** Engine options, `type` included (replace the object to update the chart: it animates from the previous values) */
  options: { type: Object as PropType<ShapeChartOptions>, required: true },
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) mark changed (`null`: none) */
  hover: [event: ShapeHoverEvent | null];
  /** A mark was clicked, tapped or activated with Enter */
  click: [event: ShapeHoverEvent];
  /** A legend item was clicked (or `toggle()` was called) */
  toggle: [event: ShapeToggleEvent];
}>();
const { setContainer, rootStyle, handle } = useShapeChart(
  props,
  () => raw(props.options),
  {
    hover: (event) => emit("hover", event),
    click: (event) => emit("click", event),
    toggle: (event) => emit("toggle", event),
  },
  () => (props.options?.type === "gauge" ? 240 : 320),
);
defineExpose(handle);
</script>

<template>
  <div class="mn-chart mn-shape-chart" data-minerva="chart" :style="rootStyle">
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
