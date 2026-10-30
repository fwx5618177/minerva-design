<script setup lang="ts">
import type { PropType } from "vue";
import type {
  Chart3DCameraState,
  Chart3DHoverEvent,
  ChartRendererKind,
  Surface3DContourOptions,
  Surface3DSeries,
  Surface3DWireframeOptions,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { chart3DCommonProps, useChart3D } from "./three-d";

/**
 * 3D surface `z = f(x, y)` over a regular grid: lit, colored by a color
 * map, with an optional wireframe, contour lines and transparency (engine
 * `createChart3D`).
 */
defineOptions({ name: "Surface3DChart" });
const props = defineProps({
  ...chart3DCommonProps,
  /** Surfaces over regular grids */
  series: {
    type: Array as PropType<readonly Surface3DSeries[]>,
    required: true,
  },
  /** Wireframe of the series that do not set one */
  wireframe: {
    type: [Boolean, Object] as PropType<boolean | Surface3DWireframeOptions>,
    default: undefined,
  },
  /** Contour lines of the series that do not set them */
  contours: {
    type: [Boolean, Object] as PropType<boolean | Surface3DContourOptions>,
    default: undefined,
  },
});
const emit = defineEmits<{
  /** The hovered cell changed (`null`: none) */
  hover: [event: Chart3DHoverEvent | null];
  /** A cell was clicked */
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
        type: "surface" as const,
        wireframe: s.wireframe ?? raw(props.wireframe),
        contours: s.contours ?? raw(props.contours),
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
