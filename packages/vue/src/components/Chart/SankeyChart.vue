<script setup lang="ts">
import type { PropType } from "vue";
import type {
  SankeyLink,
  SankeyNode,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { shapeCommonProps } from "./props";
import { shapeCommonOptions, useShapeChart } from "./shape";

/**
 * Sankey diagram: flows between nodes in columns, link thickness
 * proportional to the flow; hovering a node or a link highlights its flows
 */
defineOptions({ name: "SankeyChart" });
const props = defineProps({
  ...shapeCommonProps,
  /** Nodes, in their initial order; nodes only named by a link are appended */
  nodes: Array as PropType<readonly SankeyNode[]>,
  /** Flows between the nodes (by name or index); links closing a cycle are ignored */
  links: { type: Array as PropType<readonly SankeyLink[]>, required: true },
  /** Width of the node bars, in pixels (default 12) */
  nodeWidth: Number,
  /** Vertical gap between the nodes of a column, in pixels (default 12) */
  nodePadding: Number,
  /** Column of the nodes without a `column` (default `justify`) */
  align: String as PropType<"justify" | "left" | "right" | "center">,
  /** Relaxation passes that straighten the flows and reduce crossings (default 32) */
  iterations: Number,
  /** Color of the links without `color` (default `gradient`) */
  linkColor: String as PropType<"gradient" | "source" | "target" | "neutral">,
  /** Opacity of the links, 0-1 (default 0.4) */
  linkOpacity: Number,
  /** Node labels (name and value; default `true`) */
  labels: { type: Boolean, default: undefined },
  /** Shows the value after the name in the labels (default `true`) */
  labelValues: { type: Boolean, default: undefined },
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) node or link changed (`null`: none) */
  hover: [event: ShapeHoverEvent | null];
  /** A node or link was clicked, tapped or activated with Enter */
  click: [event: ShapeHoverEvent];
  /** A legend item was clicked (or `toggle()` was called) */
  toggle: [event: ShapeToggleEvent];
}>();
const { setContainer, rootStyle, handle } = useShapeChart(
  props,
  () => ({
    ...shapeCommonOptions(props),
    type: "sankey",
    nodes: raw(props.nodes),
    links: raw(props.links),
    nodeWidth: props.nodeWidth,
    nodePadding: props.nodePadding,
    align: props.align,
    iterations: props.iterations,
    linkColor: props.linkColor,
    linkOpacity: props.linkOpacity,
    labels: props.labels,
    labelValues: props.labelValues,
  }),
  {
    hover: (event) => emit("hover", event),
    click: (event) => emit("click", event),
    toggle: (event) => emit("toggle", event),
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
