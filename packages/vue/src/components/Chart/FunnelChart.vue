<script setup lang="ts">
import type { PropType } from "vue";
import type {
  ShapeDatum,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { shapeCommonProps } from "./props";
import { shapeCommonOptions, useShapeChart } from "./shape";

/** Funnel chart of the stages of a process, with conversion rates */
defineOptions({ name: "FunnelChart" });
const props = defineProps({
  ...shapeCommonProps,
  /** Stages: a name, a value and an optional color */
  data: { type: Array as PropType<readonly ShapeDatum[]>, required: true },
  /** Order of the stages (default `none`: the data order) */
  sort: String as PropType<"descending" | "ascending" | "none">,
  /** Vertical gap between the stages, in pixels (default 4) */
  gap: Number,
  /** Shows the conversion rate from the previous stage (default `true`) */
  conversion: { type: Boolean, default: undefined },
  /** Shape of the stages: trapezoids narrowing to the next stage, or centered bars (default `trapezoid`) */
  shape: String as PropType<"trapezoid" | "bar">,
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) stage changed (`null`: none) */
  hover: [event: ShapeHoverEvent | null];
  /** A stage was clicked, tapped or activated with Enter */
  click: [event: ShapeHoverEvent];
  /** A legend item was clicked (or `toggle()` was called) */
  toggle: [event: ShapeToggleEvent];
}>();
const { setContainer, rootStyle, handle } = useShapeChart(
  props,
  () => ({
    ...shapeCommonOptions(props),
    type: "funnel",
    data: raw(props.data),
    sort: props.sort,
    gap: props.gap,
    conversion: props.conversion,
    shape: props.shape,
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
