<script setup lang="ts">
import type { PropType } from "vue";
import type {
  Bar3DSeries,
  Chart3DCameraState,
  Chart3DHoverEvent,
  ChartRendererKind,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { chart3DCommonProps, useChart3D } from "./three-d";

/**
 * 3D bars over an x × y category grid, lit, stacked across series (engine
 * `createChart3D`).
 */
defineOptions({ name: "Bar3DChart" });
const props = defineProps({
  ...chart3DCommonProps,
  /** Bars over the x × y category grid (bars of the same cell are stacked) */
  series: { type: Array as PropType<readonly Bar3DSeries[]>, required: true },
  /** Width of the bars of the series that do not set one, as a fraction of a cell */
  barWidth: { type: Number, default: 0.7 },
});
const emit = defineEmits<{
  /** The hovered bar changed (`null`: none) */
  hover: [event: Chart3DHoverEvent | null];
  /** A bar was clicked */
  pointClick: [event: Chart3DHoverEvent];
  /** The user rotated, zoomed, panned or reset the camera */
  cameraChange: [camera: Chart3DCameraState];
  /** The backend is ready (or fell back after a GPU loss) */
  rendererChange: [renderer: ChartRendererKind];
}>();
const { setContainer, rootStyle, handle } = useChart3D(
  props,
  () =>
    raw(props.series).map((item) => {
      const s = raw(item);
      return {
        ...s,
        type: "bar" as const,
        barWidth: s.barWidth ?? props.barWidth,
      };
    }),
  {
    hover: (event) => emit("hover", event),
    click: (event) => emit("pointClick", event),
    camera: (camera) => emit("cameraChange", camera),
    renderer: (renderer) => emit("rendererChange", renderer),
  },
);
defineExpose(handle);
</script>

<template>
  <div class="mn-chart mn-chart-3d" data-minerva="chart" :style="rootStyle">
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
