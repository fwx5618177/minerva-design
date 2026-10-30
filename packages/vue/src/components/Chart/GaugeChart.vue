<script setup lang="ts">
import type { PropType } from "vue";
import type {
  GaugeBand,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { shapeCommonProps } from "./props";
import { shapeCommonOptions, useShapeChart } from "./shape";

/** Gauge (speedometer) showing one value on an arc, with colored bands */
defineOptions({ name: "GaugeChart" });
const props = defineProps({
  ...shapeCommonProps,
  /** Value shown by the arc (clamped to `min` - `max` for the drawing) */
  value: { type: Number, required: true },
  /** Value at the start of the arc (default 0) */
  min: Number,
  /** Value at the end of the arc (default 100) */
  max: Number,
  /** Caption under the value */
  label: String,
  /** Total angle of the arc, degrees (default 240) */
  sweep: Number,
  /** Thickness of the arc as a fraction of the radius (default 0.16) */
  thickness: Number,
  /** Colored ranges of the track; the value arc takes the color of its band */
  bands: Array as PropType<readonly GaugeBand[]>,
  /** Color of the value arc when there are no bands (default: the first palette color) */
  color: String,
  /** Draws a needle in addition to the value arc */
  needle: { type: Boolean, default: undefined },
  /** Tick labels at the ends and at the band bounds (default `true`) */
  ticks: { type: Boolean, default: undefined },
});
const emit = defineEmits<{
  /** The gauge is hovered (or focused) or left (`null`) */
  hover: [event: ShapeHoverEvent | null];
  /** The gauge was clicked, tapped or activated with Enter */
  click: [event: ShapeHoverEvent];
  /** Emitted by `toggle()` */
  toggle: [event: ShapeToggleEvent];
}>();
const { setContainer, rootStyle, handle } = useShapeChart(
  props,
  () => ({
    ...shapeCommonOptions(props),
    type: "gauge",
    value: props.value,
    min: props.min,
    max: props.max,
    label: props.label,
    sweep: props.sweep,
    thickness: props.thickness,
    bands: raw(props.bands),
    color: props.color,
    needle: props.needle,
    ticks: props.ticks,
  }),
  {
    hover: (event) => emit("hover", event),
    click: (event) => emit("click", event),
    toggle: (event) => emit("toggle", event),
  },
  240,
);
defineExpose(handle);
</script>

<template>
  <div class="mn-chart mn-shape-chart" data-minerva="chart" :style="rootStyle">
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
