<script setup lang="ts">
import {
  createDepthChart,
  type DepthChartHoverEvent,
  type DepthChartInstance,
  type DepthChartOptions,
} from "minerva-design/charts/core";
import { useRootStyle } from "./engine";
import { depthChartProps, useBookWidget } from "./orderbook";
import type { DepthChartHandle } from "./types";

/**
 * Cumulative depth of an order book: stepped bid / ask areas around the mid
 * price, mirrored hover readout, zoom around the mid, eased updates (engine
 * `createDepthChart`).
 */
defineOptions({ name: "DepthChart" });
const props = defineProps(depthChartProps);
const emit = defineEmits<{
  /** Pointer over the curves (`null` when it leaves) */
  hover: [event: DepthChartHoverEvent | null];
  /** Click / tap on the curves */
  click: [event: DepthChartHoverEvent];
  /** The visible range changed by zooming (fraction of the mid) */
  rangeChange: [range: number];
}>();
const { setContainer, instance } = useBookWidget<
  DepthChartOptions,
  DepthChartInstance
>(createDepthChart, props, (chart) => [
  chart.on("hover", (e) => emit("hover", e)),
  chart.on("click", (e) => emit("click", e)),
  chart.on("range", (r) => emit("rangeChange", r)),
]);
const rootStyle = useRootStyle(props, 320);
const handle: DepthChartHandle = {
  setBook: (snapshot) => instance.value?.setBook(snapshot),
  applyDeltas: (deltas) => instance.value?.applyDeltas(deltas),
  setRange: (range) => instance.value?.setRange(range),
  getInstance: () => instance.value,
};
defineExpose(handle);
</script>

<template>
  <div class="mn-chart mn-depth-chart" data-minerva="chart" :style="rootStyle">
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
