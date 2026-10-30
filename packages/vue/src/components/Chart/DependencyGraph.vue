<script setup lang="ts">
import type { PropType } from "vue";
import type {
  ChartRendererKind,
  GraphDagOptions,
  GraphDirection,
  GraphGroupToggleEvent,
  GraphHoverEvent,
  GraphLayoutEndEvent,
  GraphToggleEvent,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { graphCommonProps, useGraphChart } from "./graph";

/**
 * Dependency graph: layered (Sugiyama) layout of a DAG with crossing
 * reduction, spline or orthogonal edges with arrowheads, upstream /
 * downstream highlight and the critical path (engine `createGraphChart`)
 */
defineOptions({ name: "DependencyGraph" });
const props = defineProps({
  ...graphCommonProps,
  /** Flow direction (default `TB`) */
  direction: { type: String as PropType<GraphDirection>, default: "TB" },
  /** Layer / node spacing, crossing reduction sweeps */
  dag: Object as PropType<GraphDagOptions>,
  /** Highlights the longest path (node `value` = duration); `true` computes it, a list of ids sets it (default `false`) */
  criticalPath: {
    type: [Boolean, Array] as PropType<boolean | readonly string[]>,
    default: undefined,
  },
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
  /** The layout is done */
  layoutEnd: [event: GraphLayoutEndEvent];
  /** The backend in use (again after a fallback) */
  rendererChange: [renderer: ChartRendererKind];
}>();
const { setContainer, rootStyle, handle } = useGraphChart(
  props,
  () => {
    const dag = raw(props.dag);
    const criticalPath = raw(props.criticalPath);
    return {
      layout: "dag",
      direction: props.direction,
      dag: criticalPath === undefined ? dag : { ...dag, criticalPath },
    };
  },
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
