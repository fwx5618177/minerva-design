<script setup lang="ts">
import type { PropType } from "vue";
import type {
  ChartRendererKind,
  GraphCircularOptions,
  GraphDagOptions,
  GraphDirection,
  GraphForceOptions,
  GraphGroupToggleEvent,
  GraphHoverEvent,
  GraphLayoutEndEvent,
  GraphLayoutType,
  GraphToggleEvent,
  GraphTreeOptions,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { graphCommonProps, useGraphChart } from "./graph";

/**
 * Relationship network: force-directed by default (Barnes–Hut, a Web
 * Worker for large graphs), or circular, arc diagram, layered or tree
 * layouts; GPU rendering, pan / zoom, drag, neighbor highlight, legend
 * toggles and keyboard navigation (engine `createGraphChart`)
 */
defineOptions({ name: "GraphChart" });
const props = defineProps({
  ...graphCommonProps,
  /** Placement of the nodes (default `force`) */
  layout: { type: String as PropType<GraphLayoutType>, default: "force" },
  /** Direction of the `dag` and `tree` layouts */
  direction: String as PropType<GraphDirection>,
  /** Force layout settings (Barnes–Hut, worker for large graphs) */
  force: Object as PropType<GraphForceOptions>,
  /** Circular / arc layout settings */
  circular: Object as PropType<GraphCircularOptions>,
  /** Layered layout settings (`layout="dag"`) */
  dag: Object as PropType<GraphDagOptions>,
  /** Tree layout settings (tree layouts) */
  tree: Object as PropType<GraphTreeOptions>,
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) node / edge changed (`null`: none) */
  hover: [event: GraphHoverEvent | null];
  /** A node or an edge was clicked (or a node activated with Enter) */
  itemClick: [event: GraphHoverEvent];
  /** The selection changed: ids of the selected nodes */
  selectionChange: [ids: string[]];
  /** A tree node was collapsed or expanded */
  toggle: [event: GraphToggleEvent];
  /** The legend showed / hid a group */
  groupToggle: [event: GraphGroupToggleEvent];
  /** The layout is done (the force simulation cooled down) */
  layoutEnd: [event: GraphLayoutEndEvent];
  /** The backend in use (again after a fallback) */
  rendererChange: [renderer: ChartRendererKind];
}>();
const { setContainer, rootStyle, handle } = useGraphChart(
  props,
  () => ({
    layout: props.layout,
    direction: props.direction,
    force: raw(props.force),
    circular: raw(props.circular),
    dag: raw(props.dag),
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
