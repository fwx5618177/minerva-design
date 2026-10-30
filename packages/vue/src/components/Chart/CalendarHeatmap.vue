<script setup lang="ts">
import type { PropType } from "vue";
import type {
  CalendarDate,
  CalendarDatum,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { shapeCommonProps } from "./props";
import { calendarStrips, shapeCommonOptions, useShapeChart } from "./shape";

/**
 * Calendar heatmap: daily values on a calendar, contributions-style
 */
defineOptions({ name: "CalendarHeatmap" });
const props = defineProps({
  ...shapeCommonProps,
  /** Daily values (several entries of the same day add up) */
  data: { type: Array as PropType<readonly CalendarDatum[]>, required: true },
  /** Days shown: a year (`2026`) or an inclusive `[start, end]` range (default: the 53 weeks ending on the last day of the data) */
  range: [Number, Array] as PropType<
    number | readonly [CalendarDate, CalendarDate]
  >,
  /** `weeks`: a column per week and a row per weekday; `months`: a small calendar per month (default `weeks`) */
  layout: String as PropType<"weeks" | "months">,
  /** First day of the week, 0 = Sunday … 6 = Saturday (default: from `locale`) */
  weekStart: Number,
  /** Color of the highest level (lower levels are lighter; default: the first palette color) */
  color: String,
  /** Colors of the levels, lowest first (replaces `color` and sets the number of levels) */
  colors: Array as PropType<readonly string[]>,
  /** Number of color levels above the empty days (default 4) */
  levels: Number,
  /** Upper bounds of the levels but the last, ascending; an even split of the largest value by default */
  thresholds: Array as PropType<readonly number[]>,
  /** Gap between the cells, in pixels (default 3) */
  gap: Number,
  /** Corner radius of the cells, in pixels (default 2) */
  radius: Number,
  /** Largest cell size, in pixels (default 16 weeks, 28 months) */
  maxCellSize: Number,
  /** Month names (and years) around the cells (default `true`) */
  monthLabels: { type: Boolean, default: undefined },
  /** Weekday names beside (weeks) or above (months) the cells (default `true`) */
  weekdayLabels: { type: Boolean, default: undefined },
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) day changed (`null`: none) */
  hover: [event: ShapeHoverEvent | null];
  /** A day was clicked, tapped or activated with Enter */
  click: [event: ShapeHoverEvent];
  /** A legend item was clicked (or `toggle()` was called) */
  toggle: [event: ShapeToggleEvent];
}>();
const { setContainer, rootStyle, handle } = useShapeChart(
  props,
  () => ({
    ...shapeCommonOptions(props),
    type: "calendarHeatmap",
    data: raw(props.data),
    range: raw(props.range),
    layout: props.layout,
    weekStart: props.weekStart,
    color: props.color,
    colors: raw(props.colors),
    levels: props.levels,
    thresholds: raw(props.thresholds),
    gap: props.gap,
    radius: props.radius,
    maxCellSize: props.maxCellSize,
    monthLabels: props.monthLabels,
    weekdayLabels: props.weekdayLabels,
  }),
  {
    hover: (event) => emit("hover", event),
    click: (event) => emit("click", event),
    toggle: (event) => emit("toggle", event),
  },
  () =>
    props.layout === "months"
      ? 560
      : calendarStrips(props.range) * 120 +
        (props.legend === false ? 0 : 34) +
        16,
);
defineExpose(handle);
</script>

<template>
  <div class="mn-chart mn-shape-chart" data-minerva="chart" :style="rootStyle">
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
