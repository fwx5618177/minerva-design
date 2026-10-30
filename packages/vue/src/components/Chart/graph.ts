import type { PropType } from "vue";
import {
  createGraphChart,
  type ChartRendererKind,
  type ChartRendererPreference,
  type GraphChartInstance,
  type GraphChartLabels,
  type GraphChartOptions,
  type GraphEdge,
  type GraphEdgeStyle,
  type GraphGroup,
  type GraphGroupToggleEvent,
  type GraphHoverEvent,
  type GraphInteractionOptions,
  type GraphLayoutEndEvent,
  type GraphLegendOptions,
  type GraphNode,
  type GraphNodeShape,
  type GraphToggleEvent,
  type GraphTooltipOptions,
} from "minerva-design/charts/core";
import { raw, useChartEngine, useRootStyle } from "./engine";
import { chartFrameProps } from "./props";
import type { GraphChartHandle } from "./types";

/** Props shared by GraphChart, DependencyGraph and TreeChart */
export const graphCommonProps = {
  ...chartFrameProps,
  /** The nodes (a new array re-runs the layout; an array rebuilt with the same node objects does not) */
  nodes: { type: Array as PropType<readonly GraphNode[]>, required: true },
  /** The edges (parent → child in trees, prerequisite → dependent in DAGs) */
  edges: { type: Array as PropType<readonly GraphEdge[]>, required: true },
  /** Groups: legend order, names and colors */
  groups: Array as PropType<readonly GraphGroup[]>,
  /** Shape of the nodes without `shape` (boxes for DAGs, org charts and mind maps, circles otherwise) */
  nodeShape: String as PropType<GraphNodeShape>,
  /** Circle diameter in layout units, or `[min, max]` scaled by the node `value` */
  nodeSize: [Number, Array] as PropType<number | readonly [number, number]>,
  /** Edge shape; depends on the layout when omitted */
  edgeStyle: String as PropType<GraphEdgeStyle>,
  /** Edge width in CSS pixels, or `[min, max]` scaled by the edge `value` */
  edgeWidth: [Number, Array] as PropType<number | readonly [number, number]>,
  /** Edge colors: neutral or tinted with the source / target node (default `neutral`) */
  edgeColor: String as PropType<"neutral" | "source" | "target">,
  /** Arrowheads on the edges without `directed` (on for DAGs) */
  arrows: { type: Boolean, default: undefined },
  /** Shape of the arrowheads: `open` (a slim outlined head) or `filled` (a solid head in the edge color; default `open`) */
  arrowStyle: String as PropType<"open" | "filled">,
  /** Node labels; `auto` hides minor and overlapping labels when zoomed out (default `auto`) */
  nodeLabels: {
    type: [Boolean, String] as PropType<boolean | "auto">,
    default: undefined,
  },
  /** Edge labels: always, `auto` (zoomed in or highlighted), only `hover`, or never (default `auto`) */
  edgeLabels: {
    type: [Boolean, String] as PropType<boolean | "auto" | "hover">,
    default: undefined,
  },
  /** What hovering / selecting a node highlights */
  highlight: String as PropType<"neighbors" | "lineage" | "none">,
  /** Ids of the selected nodes (changing it updates the selection) */
  selected: Array as PropType<readonly string[]>,
  /** Animates layout and data changes; a number is the duration in ms (default `true`) */
  animation: {
    type: [Boolean, Number] as PropType<boolean | number>,
    default: undefined,
  },
  /** Padding around the graph when fitting it, in CSS pixels (default 24) */
  fitPadding: Number,
  /** Zoom buttons (zoom in, zoom out, fit; default `true`) */
  controls: { type: Boolean, default: undefined },
  /** Legend of the groups; shown by default with several groups */
  legend: {
    type: [Boolean, Object] as PropType<boolean | GraphLegendOptions>,
    default: undefined,
  },
  /** Tooltip; `false` disables it */
  tooltip: {
    type: [Boolean, Object] as PropType<boolean | GraphTooltipOptions>,
    default: undefined,
  },
  /** Drag pans, Ctrl / ⌘ + wheel and pinch zoom, nodes can be dragged, click selects, arrow keys move; `false` makes the chart static (default `true`) */
  interaction: {
    type: [Boolean, Object] as PropType<boolean | GraphInteractionOptions>,
    default: undefined,
  },
  /** Backend of the nodes and edges: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`) */
  renderer: String as PropType<ChartRendererPreference>,
  /** Group colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  palette: Array as PropType<readonly string[]>,
  /** Accessible name of the chart */
  ariaLabel: String,
  /** Language of the built-in texts (summary, announcements, tooltip, buttons); the page language by default */
  locale: String,
  /** Overrides of the built-in texts of the `locale` */
  labels: Object as PropType<Partial<GraphChartLabels>>,
} as const;

/** Values of `graphCommonProps` */
export interface GraphCommonProps {
  nodes: readonly GraphNode[];
  edges: readonly GraphEdge[];
  groups?: readonly GraphGroup[];
  height?: number | string;
  width?: number | string;
  deep?: boolean;
  nodeShape?: GraphNodeShape;
  nodeSize?: number | readonly [number, number];
  edgeStyle?: GraphEdgeStyle;
  edgeWidth?: number | readonly [number, number];
  edgeColor?: "neutral" | "source" | "target";
  arrows?: boolean;
  arrowStyle?: "open" | "filled";
  nodeLabels?: boolean | "auto";
  edgeLabels?: boolean | "auto" | "hover";
  highlight?: "neighbors" | "lineage" | "none";
  selected?: readonly string[];
  animation?: boolean | number;
  fitPadding?: number;
  controls?: boolean;
  legend?: boolean | GraphLegendOptions;
  tooltip?: boolean | GraphTooltipOptions;
  interaction?: boolean | GraphInteractionOptions;
  renderer?: ChartRendererPreference;
  palette?: readonly string[];
  ariaLabel?: string;
  locale?: string;
  labels?: Partial<GraphChartLabels>;
}

/** Layout part of the options (what each component sets) */
export type GraphLayoutOptions = Pick<
  GraphChartOptions,
  "layout" | "direction" | "force" | "circular" | "dag" | "tree"
>;

/** Engine events re-emitted by the graph components */
export interface GraphHandlers {
  hover: (event: GraphHoverEvent | null) => void;
  itemClick: (event: GraphHoverEvent) => void;
  selectionChange: (ids: string[]) => void;
  toggle: (event: GraphToggleEvent) => void;
  groupToggle: (event: GraphGroupToggleEvent) => void;
  layoutEnd: (event: GraphLayoutEndEvent) => void;
  rendererChange: (renderer: ChartRendererKind) => void;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

const same = (a: unknown, b: unknown) => raw(a) === raw(b);

const shallowEqual = (
  a: Record<string, unknown>,
  b: Record<string, unknown>,
): boolean => {
  const keys = Object.keys(a);
  return (
    keys.length === Object.keys(b).length &&
    keys.every(
      (key) =>
        Object.prototype.hasOwnProperty.call(b, key) && same(a[key], b[key]),
    )
  );
};

const sameValue = (a: unknown, b: unknown): boolean => {
  if (same(a, b)) return true;
  if (Array.isArray(a) && Array.isArray(b))
    return a.length === b.length && a.every((v, i) => same(v, b[i]));
  return isPlainObject(a) && isPlainObject(b) && shallowEqual(a, b);
};

/**
 * Whether two option objects describe the same chart: top-level values by
 * identity, one level deep for inline arrays / objects (node and edge
 * arrays rebuilt with the same objects are the same data, so the layout is
 * not run again), like the React components
 */
export const sameGraphOptions = (
  a: GraphChartOptions,
  b: GraphChartOptions,
): boolean => {
  const keys = Object.keys(a) as (keyof GraphChartOptions)[];
  return (
    keys.length === Object.keys(b).length &&
    keys.every(
      (key) =>
        Object.prototype.hasOwnProperty.call(b, key) &&
        sameValue(a[key], b[key]),
    )
  );
};

/** Engine options of the common props and the layout of a component */
export const graphOptions = (
  props: GraphCommonProps,
  layout: GraphLayoutOptions,
): GraphChartOptions => ({
  nodes: raw(props.nodes),
  edges: raw(props.edges),
  groups: raw(props.groups),
  ...layout,
  nodeShape: props.nodeShape,
  nodeSize: raw(props.nodeSize),
  edgeStyle: props.edgeStyle,
  edgeWidth: raw(props.edgeWidth),
  edgeColor: props.edgeColor,
  arrows: props.arrows,
  arrowStyle: props.arrowStyle,
  nodeLabels: props.nodeLabels,
  edgeLabels: props.edgeLabels,
  highlight: props.highlight,
  selected: raw(props.selected),
  animation: props.animation,
  fitPadding: props.fitPadding,
  controls: props.controls,
  legend: raw(props.legend),
  tooltip: raw(props.tooltip),
  interaction: raw(props.interaction),
  renderer: props.renderer,
  palette: raw(props.palette),
  ariaLabel: props.ariaLabel,
  locale: props.locale,
  labels: raw(props.labels),
});

/**
 * Engine (`createGraphChart`), root style and template handle of a graph
 * component. New options are passed only when they describe another chart
 * (`sameGraphOptions`): `setOptions` re-runs the layout when the node, edge
 * or group arrays change. With `deep`, in-place mutations of the data are
 * followed by passing copies of the arrays (the layout runs again).
 */
export function useGraphChart(
  props: GraphCommonProps,
  layout: () => GraphLayoutOptions,
  emit: GraphHandlers,
) {
  let previous: GraphChartOptions | null = null;
  const build = (): GraphChartOptions | null => {
    const next = graphOptions(props, layout());
    if (previous && props.deep) {
      next.nodes = [...next.nodes];
      next.edges = [...next.edges];
      if (next.groups) next.groups = [...next.groups];
    } else if (previous && sameGraphOptions(previous, next)) return null;
    previous = next;
    return next;
  };
  const { setContainer, instance } = useChartEngine<
    GraphChartOptions,
    GraphChartInstance
  >(createGraphChart, props, build, (chart) => [
    chart.on("hover", (event) => emit.hover(event)),
    chart.on("click", (event) => emit.itemClick(event)),
    chart.on("select", (event) => emit.selectionChange(event.ids)),
    chart.on("toggle", (event) => emit.toggle(event)),
    chart.on("groupToggle", (event) => emit.groupToggle(event)),
    chart.on("layoutEnd", (event) => emit.layoutEnd(event)),
    chart.on("renderer", (renderer) => emit.rendererChange(renderer)),
  ]);
  const handle: GraphChartHandle = {
    fit: (animate) => instance.value?.fit(animate),
    focusNode: (id, options) => instance.value?.focusNode(id, options),
    setData: (data) => instance.value?.setData(data),
    select: (ids) => instance.value?.select(ids),
    getSelection: () => instance.value?.getSelection() ?? [],
    expand: (id) => instance.value?.expand(id),
    collapse: (id) => instance.value?.collapse(id),
    toggle: (id) => instance.value?.toggle(id),
    getPositions: () => instance.value?.getPositions() ?? {},
    relayout: () => instance.value?.relayout(),
    getRenderer: () => instance.value?.getRenderer() ?? null,
    getInstance: () => instance.value,
  };
  return { setContainer, rootStyle: useRootStyle(props, 480), handle };
}
