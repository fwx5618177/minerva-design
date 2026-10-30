<script setup lang="ts">
import type { PropType } from "vue";
import type {
  ShapeDrillEvent,
  TreemapNode,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { shapeCommonProps } from "./props";
import { shapeCommonOptions, useShapeChart } from "./shape";

/**
 * Sunburst chart: a hierarchy as concentric rings; clicking a parent zooms
 * into it, clicking the center goes back up
 */
defineOptions({ name: "SunburstChart" });
const props = defineProps({
  ...shapeCommonProps,
  /** Nodes: leaves carry a value, parents sum their children */
  data: { type: Array as PropType<readonly TreemapNode[]>, required: true },
  /** Radius of the center circle as a fraction of the outer radius (default 0.26) */
  innerRadius: Number,
  /** Rings shown at once below the focused node (default: every level) */
  levels: Number,
  /** Angle of the first node, degrees clockwise from 12 o'clock (default 0) */
  startAngle: Number,
  /** Gap between the sectors, in pixels (default 1) */
  padAngle: Number,
  /** Corner radius of the sectors, in pixels (default 2) */
  cornerRadius: Number,
  /** Sector labels along the arc or the radius, whichever fits best (`auto`), or none (default `auto`) */
  labels: String as PropType<"auto" | "tangential" | "radial" | "none">,
  /** Clicking (or Enter on) a parent zooms into it; clicking the center goes back up (default `true`) */
  drill: { type: Boolean, default: undefined },
  /** Names from the root to the focused node (`[]` = the root); makes the drill-down controlled (clicks only emit `drill`) */
  drillPath: Array as PropType<readonly string[]>,
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) sector changed (`null`: none) */
  hover: [event: ShapeHoverEvent | null];
  /** A sector was clicked, tapped or activated with Enter */
  click: [event: ShapeHoverEvent];
  /** A legend item was clicked (or `toggle()` was called) */
  toggle: [event: ShapeToggleEvent];
  /** A parent or the center was clicked (or the handle's `drill()` was called) */
  drill: [event: ShapeDrillEvent];
}>();
const { setContainer, rootStyle, handle } = useShapeChart(
  props,
  () => ({
    ...shapeCommonOptions(props),
    type: "sunburst",
    data: raw(props.data),
    innerRadius: props.innerRadius,
    levels: props.levels,
    startAngle: props.startAngle,
    padAngle: props.padAngle,
    cornerRadius: props.cornerRadius,
    labels: props.labels,
    drill: props.drill,
    drillPath: props.drillPath ? [...props.drillPath] : undefined,
  }),
  {
    hover: (event) => emit("hover", event),
    click: (event) => emit("click", event),
    toggle: (event) => emit("toggle", event),
    drill: (event) => emit("drill", event),
  },
  360,
);
defineExpose(handle);
</script>

<template>
  <div class="mn-chart mn-shape-chart" data-minerva="chart" :style="rootStyle">
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
