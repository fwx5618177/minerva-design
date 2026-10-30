<script setup lang="ts">
import type { PropType } from "vue";
import type {
  RadialBarDatum,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { shapeCommonProps } from "./props";
import { shapeCommonOptions, useShapeChart } from "./shape";

/**
 * Radial bar chart: concentric progress rings (activity rings, KPI completion)
 */
defineOptions({ name: "RadialBarChart" });
const props = defineProps({
  ...shapeCommonProps,
  /** Bars, from the outermost ring inward: a name, a value, an optional `max` and color */
  data: { type: Array as PropType<readonly RadialBarDatum[]>, required: true },
  /** Value of a full bar for the data without `max` (default: the largest value) */
  max: Number,
  /** Radius of the innermost ring's inner edge, as a fraction of the outer radius (default 0.3) */
  innerRadius: Number,
  /** Angle where the bars start, degrees clockwise from 12 o'clock (default 0) */
  startAngle: Number,
  /** Angle of a full bar, degrees; 360 = full rings (default 270) */
  sweep: Number,
  /** Gap between the rings, as a fraction of a ring's slot (default 0.28) */
  gap: Number,
  /** Background tracks behind the bars (default `true`) */
  track: { type: Boolean, default: undefined },
  /** Rounded bar ends (default `true`) */
  rounded: { type: Boolean, default: undefined },
  /** Labels before the start of the bars (default: when `sweep` leaves room for them) */
  labels: { type: Boolean, default: undefined },
  /** What a label shows: name, value, percent of the bar's max (default `["name", "value"]`) */
  labelContent: Array as PropType<readonly ("name" | "value" | "percent")[]>,
  /** Big text in the center (e.g. the overall completion) */
  centerValue: String,
  /** Small text under `centerValue` */
  centerLabel: String,
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
    type: "radialBar",
    data: raw(props.data),
    max: props.max,
    innerRadius: props.innerRadius,
    startAngle: props.startAngle,
    sweep: props.sweep,
    gap: props.gap,
    track: props.track,
    rounded: props.rounded,
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
  300,
);
defineExpose(handle);
</script>

<template>
  <div class="mn-chart mn-shape-chart" data-minerva="chart" :style="rootStyle">
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
