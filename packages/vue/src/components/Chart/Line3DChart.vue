<script setup lang="ts">
import type { PropType } from "vue";
import type {
  Chart3DCameraState,
  Chart3DHoverEvent,
  ChartRendererKind,
  Line3DSeries,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { chart3DCommonProps, useChart3D } from "./three-d";

/**
 * 3D polylines (trajectories, paths), optionally colored along the line
 * (engine `createChart3D`).
 */
defineOptions({ name: "Line3DChart" });
const props = defineProps({
  ...chart3DCommonProps,
  /** 3D polylines (trajectories) */
  series: { type: Array as PropType<readonly Line3DSeries[]>, required: true },
});
const emit = defineEmits<{
  /** The hovered point changed (`null`: none) */
  hover: [event: Chart3DHoverEvent | null];
  /** A point was clicked */
  pointClick: [event: Chart3DHoverEvent];
  /** The user rotated, zoomed, panned or reset the camera */
  cameraChange: [camera: Chart3DCameraState];
  /** The backend is ready (or fell back after a GPU loss) */
  rendererChange: [renderer: ChartRendererKind];
}>();
const { setContainer, rootStyle, handle } = useChart3D(
  props,
  () => raw(props.series).map((s) => ({ ...raw(s), type: "line" as const })),
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
