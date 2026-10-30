<script setup lang="ts">
import {
  createTimeAndSales,
  type TimeAndSalesInstance,
  type TimeAndSalesOptions,
  type TimeAndSalesRowEvent,
} from "minerva-design/charts/core";
import { useRootStyle } from "./engine";
import { timeAndSalesProps, useBookWidget } from "./orderbook";
import type { TimeAndSalesHandle } from "./types";

/**
 * Time and sales tape: newest trades on top, virtualized (hundreds of
 * thousands of rows), large trades highlighted, paused while hovered
 * (engine `createTimeAndSales`).
 */
defineOptions({ name: "TimeAndSales" });
const props = defineProps(timeAndSalesProps);
const emit = defineEmits<{
  /** Hovered row (`null` when the pointer leaves) */
  hover: [row: TimeAndSalesRowEvent | null];
  /** Click / tap / Enter on a row */
  tradeClick: [row: TimeAndSalesRowEvent];
  /** The tape paused (pointer over it, scrolled down) or resumed */
  pause: [paused: boolean];
}>();
const { setContainer, instance } = useBookWidget<
  TimeAndSalesOptions,
  TimeAndSalesInstance
>(
  createTimeAndSales,
  props,
  (tape) => [
    tape.on("hover", (e) => emit("hover", e)),
    tape.on("tradeClick", (e) => emit("tradeClick", e)),
    tape.on("pause", (p) => emit("pause", p)),
  ],
  {
    add: (tape, trades) => tape.addTrades(trades),
    replace: (tape, trades) => tape.setTrades(trades),
  },
);
const rootStyle = useRootStyle(props, 360);
const handle: TimeAndSalesHandle = {
  addTrades: (trades) => instance.value?.addTrades(trades),
  setTrades: (trades) => instance.value?.setTrades(trades),
  clear: () => instance.value?.clear(),
  scrollToLatest: () => instance.value?.scrollToLatest(),
  getInstance: () => instance.value,
};
defineExpose(handle);
</script>

<template>
  <div
    class="mn-chart mn-time-and-sales"
    data-minerva="chart"
    :style="rootStyle"
  >
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
