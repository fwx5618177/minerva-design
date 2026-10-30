<script setup lang="ts">
import { watch } from "vue";
import {
  createOrderBook,
  type OrderBookInstance,
  type OrderBookLevelEvent,
  type OrderBookOptions,
} from "minerva-design/charts/core";
import { useRootStyle } from "./engine";
import { orderBookProps, useBookWidget } from "./orderbook";
import type { OrderBookHandle } from "./types";

/**
 * Order book ladder: asks above the spread row, bids below, with depth
 * bars, price grouping, change flashes and large order highlight (engine
 * `createOrderBook`).
 */
defineOptions({ name: "OrderBook" });
const props = defineProps(orderBookProps);
const emit = defineEmits<{
  /** Hovered row (`null` when the pointer leaves) */
  hover: [level: OrderBookLevelEvent | null];
  /** Click / tap / Enter on a row (e.g. to fill a price in an order form) */
  levelClick: [level: OrderBookLevelEvent];
}>();
const { setContainer, instance } = useBookWidget<
  OrderBookOptions,
  OrderBookInstance
>(createOrderBook, props, (book) => {
  if (props.lastPrice !== undefined) book.setLastPrice(props.lastPrice);
  return [
    book.on("hover", (e) => emit("hover", e)),
    book.on("levelClick", (e) => emit("levelClick", e)),
  ];
});
watch(
  () => props.lastPrice,
  (price) => {
    if (price !== undefined) instance.value?.setLastPrice(price);
  },
);
const rootStyle = useRootStyle(props, 420);
const handle: OrderBookHandle = {
  setBook: (snapshot) => instance.value?.setBook(snapshot),
  applyDeltas: (deltas) => instance.value?.applyDeltas(deltas),
  setLastPrice: (price) => instance.value?.setLastPrice(price),
  getInstance: () => instance.value,
};
defineExpose(handle);
</script>

<template>
  <div class="mn-chart mn-order-book" data-minerva="chart" :style="rootStyle">
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
