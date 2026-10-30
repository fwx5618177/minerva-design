<script setup lang="ts">
import type { PropType } from "vue";
import type {
  ChordGroup,
  ChordLink,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "minerva-design/charts/core";
import { raw } from "./engine";
import { shapeCommonProps } from "./props";
import { shapeCommonOptions, useShapeChart } from "./shape";

/**
 * Chord diagram: flows between groups around a circle; hovering a group
 * highlights its ribbons, hovering a ribbon shows both directions
 */
defineOptions({ name: "ChordChart" });
const props = defineProps({
  ...shapeCommonProps,
  /** Groups (names or `{ name, color }`), in their order around the circle; groups only named by `links` are appended */
  groups: Array as PropType<readonly (string | ChordGroup)[]>,
  /** Square flow matrix: `matrix[i][j]` flows from group `i` to group `j` (used when `links` is absent) */
  matrix: Array as PropType<readonly (readonly number[])[]>,
  /** Flows as a list (by group name or index); takes precedence over `matrix` */
  links: Array as PropType<readonly ChordLink[]>,
  /** One ribbon per direction, arcs sized by the outgoing plus the incoming flows (default `false`) */
  directed: { type: Boolean, default: undefined },
  /** Arrowheads at the target end of the ribbons (default `true` when `directed`) */
  arrows: { type: Boolean, default: undefined },
  /** Gap between the groups, in degrees (default 2) */
  padAngle: Number,
  /** Angle of the first group, degrees clockwise from 12 o'clock (default 0) */
  startAngle: Number,
  /** Order of the groups around the circle (default `none`: data order) */
  sortGroups: String as PropType<"none" | "ascending" | "descending">,
  /** Order of the ribbon ends along an arc: `auto` minimizes the crossings (default `auto`) */
  sortSubgroups: String as PropType<
    "auto" | "none" | "ascending" | "descending"
  >,
  /** Color of the ribbons without `color` (default `gradient`) */
  ribbonColor: String as PropType<"gradient" | "source" | "target" | "neutral">,
  /** Opacity of the ribbons, 0-1 (default 0.65) */
  ribbonOpacity: Number,
  /** Thickness of the group arcs, in pixels (default 6% of the radius) */
  arcWidth: Number,
  /** Value ticks outside the arcs; a number sets the step between ticks (default `true` when large enough) */
  ticks: {
    type: [Boolean, Number] as PropType<boolean | number>,
    default: undefined,
  },
  /** Formats the tick labels (default: compact numbers of the `locale`) */
  tickFormat: Function as PropType<(value: number) => string>,
  /** Group labels along the arc (`tangential`) or the radius (`radial`); `auto` picks the one that fits (default `auto`) */
  labels: String as PropType<"auto" | "tangential" | "radial" | "none">,
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) group or ribbon changed (`null`: none); ribbons carry `source`, `target` and `reverseValue` */
  hover: [event: ShapeHoverEvent | null];
  /** A group or ribbon was clicked, tapped or activated with Enter */
  click: [event: ShapeHoverEvent];
  /** A legend item was clicked (or `toggle(index)` was called) */
  toggle: [event: ShapeToggleEvent];
}>();
const { setContainer, rootStyle, handle } = useShapeChart(
  props,
  () => ({
    ...shapeCommonOptions(props),
    type: "chord",
    groups: raw(props.groups),
    matrix: raw(props.matrix),
    links: raw(props.links),
    directed: props.directed,
    arrows: props.arrows,
    padAngle: props.padAngle,
    startAngle: props.startAngle,
    sortGroups: props.sortGroups,
    sortSubgroups: props.sortSubgroups,
    ribbonColor: props.ribbonColor,
    ribbonOpacity: props.ribbonOpacity,
    arcWidth: props.arcWidth,
    ticks: props.ticks,
    tickFormat: props.tickFormat,
    labels: props.labels,
  }),
  {
    hover: (event) => emit("hover", event),
    click: (event) => emit("click", event),
    toggle: (event) => emit("toggle", event),
  },
  420,
);
defineExpose(handle);
</script>

<template>
  <div class="mn-chart mn-shape-chart" data-minerva="chart" :style="rootStyle">
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
