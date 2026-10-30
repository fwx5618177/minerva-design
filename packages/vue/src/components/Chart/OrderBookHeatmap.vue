<script setup lang="ts">
import {
  createOrderBookHeatmap,
  type ChartRendererKind,
  type OrderBookHeatmapHoverEvent,
  type OrderBookHeatmapInstance,
  type OrderBookHeatmapOptions,
} from "minerva-design/charts/core";
import { useRootStyle } from "./engine";
import { orderBookHeatmapProps, useBookWidget } from "./orderbook";
import type { OrderBookHeatmapHandle } from "./types";

/**
 * Liquidity heatmap: resting size over time and price drawn by the GPU,
 * best bid / ask lines and trades as bubbles sized by volume (engine
 * `createOrderBookHeatmap`).
 */
defineOptions({ name: "OrderBookHeatmap" });
const props = defineProps(orderBookHeatmapProps);
const emit = defineEmits<{
  /** Hovered cell (`null` when the pointer leaves) */
  hover: [event: OrderBookHeatmapHoverEvent | null];
  /** Backend in use (also after a GPU loss) */
  rendererChange: [renderer: ChartRendererKind];
  /** `true` while the view follows the market, `false` after a zoom / pan */
  followChange: [follow: boolean];
}>();
const { setContainer, instance } = useBookWidget<
  OrderBookHeatmapOptions,
  OrderBookHeatmapInstance
>(
  createOrderBookHeatmap,
  props,
  (heatmap) => [
    heatmap.on("hover", (e) => emit("hover", e)),
    heatmap.on("renderer", (r) => emit("rendererChange", r)),
    heatmap.on("follow", (f) => emit("followChange", f)),
  ],
  {
    add: (heatmap, trades) => heatmap.addTrades(trades),
    replace: (heatmap, trades) => heatmap.addTrades(trades),
  },
);
const rootStyle = useRootStyle(props, 360);
const handle: OrderBookHeatmapHandle = {
  setBook: (snapshot) => instance.value?.setBook(snapshot),
  applyDeltas: (deltas) => instance.value?.applyDeltas(deltas),
  addTrades: (trades) => instance.value?.addTrades(trades),
  resetView: () => instance.value?.resetView(),
  getInstance: () => instance.value,
};
defineExpose(handle);
</script>

<template>
  <div
    class="mn-chart mn-order-book-heatmap"
    data-minerva="chart"
    :style="rootStyle"
  >
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
