<script setup lang="ts">
import type { PropType } from "vue";
import type {
  ChartRendererKind,
  GraphDirection,
  GraphGroupToggleEvent,
  GraphHoverEvent,
  GraphLayoutEndEvent,
  GraphToggleEvent,
  GraphTreeOptions,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { graphCommonProps, useGraphChart } from "./graph";

/**
 * Tree chart: tidy tree, radial tree, mind map or org chart, with animated
 * collapse / expand of the subtrees (engine `createGraphChart`)
 */
defineOptions({ name: "TreeChart" });
const props = defineProps({
  ...graphCommonProps,
  /** Kind of tree: tidy tree, radial tree, two-sided mind map or org chart (default `tree`) */
  layout: {
    type: String as PropType<"tree" | "radial" | "mindmap" | "org">,
    default: "tree",
  },
  /** Direction of `layout="tree"` (default `LR`) */
  direction: String as PropType<GraphDirection>,
  /** Root, spacing, collapsing, card size */
  tree: Object as PropType<GraphTreeOptions>,
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) node / edge changed (`null`: none) */
  hover: [event: GraphHoverEvent | null];
  /** A node or an edge was clicked (or a node activated with Enter) */
  itemClick: [event: GraphHoverEvent];
  /** The selection changed: ids of the selected nodes */
  selectionChange: [ids: string[]];
  /** A node was collapsed or expanded */
  toggle: [event: GraphToggleEvent];
  /** The legend showed / hid a group */
  groupToggle: [event: GraphGroupToggleEvent];
  /** The layout is done */
  layoutEnd: [event: GraphLayoutEndEvent];
  /** The backend in use (again after a fallback) */
  rendererChange: [renderer: ChartRendererKind];
}>();
const { setContainer, rootStyle, handle } = useGraphChart(
  props,
  () => ({
    layout: props.layout,
    direction: props.direction,
    tree: raw(props.tree),
  }),
  {
    hover: (event) => emit("hover", event),
    itemClick: (event) => emit("itemClick", event),
    selectionChange: (ids) => emit("selectionChange", ids),
    toggle: (event) => emit("toggle", event),
    groupToggle: (event) => emit("groupToggle", event),
    layoutEnd: (event) => emit("layoutEnd", event),
    rendererChange: (renderer) => emit("rendererChange", renderer),
  },
);
defineExpose(handle);
</script>

<template>
  <div class="mn-chart mn-graph-chart" data-minerva="chart" :style="rootStyle">
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
