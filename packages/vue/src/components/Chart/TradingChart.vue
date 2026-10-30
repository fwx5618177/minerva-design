<script setup lang="ts">
import {
  createTradingChart,
  type ChartRendererKind,
  type TradingChartInstance,
  type TradingChartOptions,
  type TradingClickEvent,
  type TradingCrosshairEvent,
  type TradingDrawing,
  type TradingDrawingTool,
  type TradingHistoryRequestEvent,
  type TradingIndicatorToggleEvent,
  type TradingOrderCancelEvent,
  type TradingOrderCreateEvent,
  type TradingOrderMoveEvent,
  type TradingReplayState,
  type TradingUndoState,
  type TradingVisibleRange,
} from "minerva-design/charts/core";
import { useChartEngine, useRootStyle } from "./engine";
import { definedOptions, tradingChartProps } from "./trading";
import type { TradingChartHandle } from "./types";

/**
 * Professional trading chart: candles (hollow, Heikin-Ashi, bars, line,
 * area, baseline) over a gap-free time axis, indicator panes, drawing
 * tools, order lines and real-time streaming, drawn on the GPU (engine
 * `createTradingChart`). Stream ticks through the template ref's `update`;
 * keep several charts in step with `syncCharts` of
 * `minerva-design/charts/core` and their `getInstance()`.
 */
defineOptions({ name: "TradingChart" });
const props = defineProps(tradingChartProps);
const emit = defineEmits<{
  /** The crosshair moved (`null` when it left the chart) */
  crosshairMove: [event: TradingCrosshairEvent | null];
  /** A pane was clicked */
  click: [event: TradingClickEvent];
  /** The visible bars changed */
  visibleRangeChange: [range: TradingVisibleRange];
  /** A draggable price line was dropped at a new price */
  orderMove: [event: TradingOrderMoveEvent];
  /** The "+" order entry button was clicked (see `orderEntry`) */
  orderCreate: [event: TradingOrderCreateEvent];
  /** The close button of a `cancellable` price line was clicked */
  orderCancel: [event: TradingOrderCancelEvent];
  /** The user added, moved or deleted drawings (pass them back as `drawings`) */
  drawingsChange: [drawings: readonly TradingDrawing[]];
  /** The selected drawing changed */
  drawingSelect: [id: string | null];
  /** The drawing tool changed (back to `cursor` after a drawing) */
  drawingToolChange: [tool: TradingDrawingTool];
  /** Undo / redo of the drawings became possible or impossible */
  undoChange: [state: TradingUndoState];
  /** The bar replay started, stepped, played, paused or stopped */
  replayChange: [state: TradingReplayState];
  /** The chart entered (`true`) or left full screen */
  fullscreenChange: [fullscreen: boolean];
  /** An indicator was shown or hidden from its legend */
  indicatorToggle: [event: TradingIndicatorToggleEvent];
  /** The oldest bar came into view: load older bars (`prependBars`) */
  historyRequest: [event: TradingHistoryRequestEvent];
  /** The backend in use (again after a fallback) */
  rendererChange: [renderer: ChartRendererKind];
}>();
const { setContainer, instance } = useChartEngine<
  TradingChartOptions,
  TradingChartInstance
>(
  createTradingChart,
  props,
  () => definedOptions<TradingChartOptions>(props),
  (chart) => [
    chart.on("crosshairMove", (e) => emit("crosshairMove", e)),
    chart.on("click", (e) => emit("click", e)),
    chart.on("visibleRangeChange", (e) => emit("visibleRangeChange", e)),
    chart.on("orderMove", (e) => emit("orderMove", e)),
    chart.on("orderCreate", (e) => emit("orderCreate", e)),
    chart.on("orderCancel", (e) => emit("orderCancel", e)),
    chart.on("drawingsChange", (e) => emit("drawingsChange", e)),
    chart.on("drawingSelect", (e) => emit("drawingSelect", e)),
    chart.on("drawingToolChange", (e) => emit("drawingToolChange", e)),
    chart.on("undoChange", (e) => emit("undoChange", e)),
    chart.on("replayChange", (e) => emit("replayChange", e)),
    chart.on("fullscreenChange", (e) => emit("fullscreenChange", e)),
    chart.on("indicatorToggle", (e) => emit("indicatorToggle", e)),
    chart.on("historyRequest", (e) => emit("historyRequest", e)),
    chart.on("renderer", (e) => emit("rendererChange", e)),
  ],
);
const rootStyle = useRootStyle(props, 480);
const handle: TradingChartHandle = {
  update: (bar) => instance.value?.update(bar),
  appendBars: (bars) => instance.value?.appendBars(bars),
  prependBars: (bars) => instance.value?.prependBars(bars),
  setBars: (bars) => instance.value?.setBars(bars),
  getBarCount: () => instance.value?.getBarCount() ?? 0,
  getBar: (index) => instance.value?.getBar(index) ?? null,
  scrollToRealtime: (animate) => instance.value?.scrollToRealtime(animate),
  fitContent: () => instance.value?.fitContent(),
  getVisibleRange: () => instance.value?.getVisibleRange() ?? null,
  setVisibleRange: (range) => instance.value?.setVisibleRange(range),
  getVisibleTimeRange: () => instance.value?.getVisibleTimeRange() ?? null,
  setVisibleTimeRange: (range) => instance.value?.setVisibleTimeRange(range),
  setCrosshair: (time, price) => instance.value?.setCrosshair(time, price),
  setScaleMode: (mode) => instance.value?.setScaleMode(mode),
  resetPriceScales: () => instance.value?.resetPriceScales(),
  setDrawingTool: (tool) => instance.value?.setDrawingTool(tool),
  getDrawings: () => instance.value?.getDrawings() ?? [],
  removeDrawing: (id) => instance.value?.removeDrawing(id),
  updateDrawing: (id, patch) => instance.value?.updateDrawing(id, patch),
  selectDrawing: (id) => instance.value?.selectDrawing(id),
  undo: () => instance.value?.undo(),
  redo: () => instance.value?.redo(),
  getUndoState: () =>
    instance.value?.getUndoState() ?? { canUndo: false, canRedo: false },
  startReplay: (time) => instance.value?.startReplay(time),
  replayStep: (count) => instance.value?.replayStep(count),
  replayPlay: (speed) => instance.value?.replayPlay(speed),
  replayPause: () => instance.value?.replayPause(),
  stopReplay: () => instance.value?.stopReplay(),
  getReplayState: () => instance.value?.getReplayState() ?? null,
  toDataURL: (type, quality) => instance.value?.toDataURL(type, quality) ?? "",
  toBlob: (type, quality) =>
    instance.value?.toBlob(type, quality) ?? Promise.resolve(null),
  requestFullscreen: () =>
    instance.value?.requestFullscreen() ?? Promise.resolve(),
  exitFullscreen: () => instance.value?.exitFullscreen() ?? Promise.resolve(),
  setIndicatorVisible: (id, visible) =>
    instance.value?.setIndicatorVisible(id, visible),
  getRenderer: () => instance.value?.getRenderer() ?? null,
  getInstance: () => instance.value,
};
defineExpose(handle);
</script>

<template>
  <div
    class="mn-chart mn-trading-chart"
    data-minerva="chart"
    :style="rootStyle"
  >
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
