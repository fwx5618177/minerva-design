<script setup lang="ts">
import type { PropType } from "vue";
import type {
  ShapeHoverEvent,
  ShapeToggleEvent,
  TreemapNode,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { shapeCommonProps } from "./props";
import { shapeCommonOptions, useShapeChart } from "./shape";

/** Treemap: nested rectangles of areas proportional to the values */
defineOptions({ name: "TreemapChart" });
const props = defineProps({
  ...shapeCommonProps,
  /** Nodes `{ name, value, children }`: leaves carry a value, parents sum their children */
  data: { type: Array as PropType<readonly TreemapNode[]>, required: true },
  /** Gap between the cells, in pixels (default 2) */
  gap: Number,
  /** Draws the names of the parents above their children (default `true`) */
  headers: { type: Boolean, default: undefined },
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) cell changed (`null`: none) */
  hover: [event: ShapeHoverEvent | null];
  /** A cell was clicked, tapped or activated with Enter */
  click: [event: ShapeHoverEvent];
  /** A top-level node was hidden / shown (legend or `toggle()`) */
  toggle: [event: ShapeToggleEvent];
}>();
const { setContainer, rootStyle, handle } = useShapeChart(
  props,
  () => ({
    ...shapeCommonOptions(props),
    type: "treemap",
    data: raw(props.data),
    gap: props.gap,
    headers: props.headers,
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
