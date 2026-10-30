<script setup lang="ts">
import type { PropType } from "vue";
import {
  ganttSeries,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartPlotClickEvent,
  type ChartRendererKind,
  type ChartView,
  type GanttTask,
} from "minerva-design/charts/core";
import { engineOptions, useCartesianChart } from "./cartesian";
import { raw } from "./engine";
import { chartAxisProps, chartCommonProps } from "./props";

/**
 * Gantt chart: tasks as bars on a time axis with their progress, groups,
 * milestones and a today line; zooms and pans along the time
 */
defineOptions({ name: "GanttChart" });
const props = defineProps({
  ...chartCommonProps,
  ...chartAxisProps,
  /** Tasks and milestones, from top to bottom */
  tasks: { type: Array as PropType<readonly GanttTask[]>, required: true },
  /** Colors of the groups in order of appearance (any CSS colors); the chart palette by default */
  colors: Array as PropType<readonly string[]>,
  /** Name of the tasks without a group (default "Tasks") */
  taskName: String,
  /** Name of the progress bars (legend, tooltip; default "Progress") */
  progressName: String,
  /** Name of the milestones (legend, tooltip; default "Milestones") */
  milestoneName: String,
  /** Formats the progress shares (tooltip; default "60%") */
  formatProgress: Function as PropType<(share: number) => string>,
  /** Name of the dependencies row of the tooltip (default "Depends on", in the `locale`) */
  dependenciesName: String,
  /** Draws the `dependencies` of the tasks as elbow arrows from the end of every predecessor to the start of the task (default `true`) */
  dependencyArrows: { type: Boolean, default: undefined },
  /** Color of the dependency arrows (any CSS color); the secondary text color by default */
  dependencyColor: String,
  /** Draws a line at this date (`true`: now) */
  today: {
    type: [Boolean, Number, Date] as PropType<boolean | number | Date>,
    default: false,
  },
  /** Label of the today line */
  todayLabel: String,
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) task changed (`null`: none) */
  hover: [event: ChartHoverEvent | null];
  /** A task was clicked */
  pointClick: [event: ChartHoverEvent];
  /** The plot area was clicked where there is no task */
  plotClick: [event: ChartPlotClickEvent];
  /** The user zoomed or panned */
  zoom: [view: ChartView];
  /** The backend is ready (or fell back after a GPU loss) */
  rendererChange: [renderer: ChartRendererKind];
}>();
const mountedAt = Date.now();
const { setContainer, rootStyle, handle } = useCartesianChart(
  props,
  () => {
    const gantt = ganttSeries(raw(props.tasks), {
      colors: raw(props.colors),
      taskName: props.taskName,
      progressName: props.progressName,
      milestoneName: props.milestoneName,
      formatProgress: props.formatProgress,
      dependenciesName: props.dependenciesName,
      dependencyArrows: props.dependencyArrows,
      dependencyColor: props.dependencyColor,
      locale: props.locale,
    });
    const today = props.today;
    const now =
      today === false
        ? null
        : today === true
          ? mountedAt
          : today instanceof Date
            ? today.getTime()
            : today;
    const lines: ChartAnnotation[] =
      now === null
        ? []
        : [
            {
              type: "line",
              axis: "y",
              value: now,
              color: "var(--danger-color, #dc2626)",
              dash: [4, 3],
              label: props.todayLabel,
            },
          ];
    const options = engineOptions(
      { ...props, orientation: "horizontal" },
      gantt.series,
    );
    return {
      ...options,
      xAxis: {
        type: "category",
        categories: gantt.categories,
        ...options.xAxis,
      },
      yAxis: {
        type: "time",
        min: gantt.domain[0],
        max: gantt.domain[1],
        ...options.yAxis,
      },
      annotations: [...(options.annotations ?? []), ...lines],
      dependencies: gantt.dependencies,
      interaction: options.interaction ?? { zoom: "y" },
      legend: options.legend ?? gantt.series.length > 1,
    };
  },
  {
    hover: (event) => emit("hover", event),
    click: (event) => emit("pointClick", event),
    plotClick: (event) => emit("plotClick", event),
    zoom: (view) => emit("zoom", view),
    renderer: (renderer) => emit("rendererChange", renderer),
  },
);
defineExpose(handle);
</script>

<template>
  <div class="mn-chart" data-minerva="chart" :style="rootStyle">
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
