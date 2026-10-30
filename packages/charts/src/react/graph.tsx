import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
  type Ref,
} from "react";
import { createGraphChart } from "../engine/graph/chart";
import type {
  GraphChartInstance,
  GraphChartLabels,
  GraphChartOptions,
  GraphCircularOptions,
  GraphDagOptions,
  GraphData,
  GraphDirection,
  GraphEdge,
  GraphEdgeStyle,
  GraphForceOptions,
  GraphGroup,
  GraphGroupToggleEvent,
  GraphHoverEvent,
  GraphInteractionOptions,
  GraphLayoutEndEvent,
  GraphLayoutType,
  GraphLegendOptions,
  GraphNode,
  GraphNodeShape,
  GraphPoint,
  GraphToggleEvent,
  GraphTooltipOptions,
  GraphTreeOptions,
} from "../engine/graph/types";
import type {
  ChartRendererKind,
  ChartRendererPreference,
} from "../engine/types";

/** Imperative handle of the graph components (`ref`) */
export interface GraphChartHandle {
  /** Fits the visible nodes in the view */
  fit(animate?: boolean): void;
  /** Centers a node (expanding its collapsed ancestors), optionally zooming */
  focusNode(id: string, options?: { zoom?: number; animate?: boolean }): void;
  /** Replaces the data until the next render with new props */
  setData(data: GraphData): void;
  /** Selects nodes (`null` clears the selection) */
  select(ids: readonly string[] | string | null): void;
  /** Ids of the selected nodes */
  getSelection(): string[];
  /** Expands a node (all nodes without an id) */
  expand(id?: string): void;
  /** Collapses a node (all nodes with children without an id) */
  collapse(id?: string): void;
  /** Collapses / expands a node */
  toggle(id: string): void;
  /** Current positions of the nodes in layout units */
  getPositions(): Record<string, GraphPoint>;
  /** Computes the layout again */
  relayout(): void;
  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null;
  /** The underlying engine instance (minerva-design/charts/core) */
  getInstance(): GraphChartInstance | null;
}

/** Props shared by `GraphChart`, `DependencyGraph` and `TreeChart` */
export interface GraphCommonProps {
  /** The nodes */
  nodes: readonly GraphNode[];
  /** The edges (parent → child in trees, prerequisite → dependent in DAGs) */
  edges: readonly GraphEdge[];
  /** Groups: legend order, names and colors */
  groups?: readonly GraphGroup[];
  /**
   * Height of the chart (the legend included); numbers are pixels
   * @default 480
   */
  height?: number | string;
  /**
   * Width of the chart; numbers are pixels
   * @default "100%"
   */
  width?: number | string;
  /** Shape of the nodes without `shape` (boxes for DAGs, org charts and mind maps, circles otherwise) */
  nodeShape?: GraphNodeShape;
  /** Circle diameter in layout units, or `[min, max]` scaled by the node `value` */
  nodeSize?: number | readonly [number, number];
  /** Edge shape; depends on the layout when omitted */
  edgeStyle?: GraphEdgeStyle;
  /** Edge width in CSS pixels, or `[min, max]` scaled by the edge `value` */
  edgeWidth?: number | readonly [number, number];
  /**
   * Edge colors: neutral or tinted with the source / target node
   * @default "neutral"
   */
  edgeColor?: "neutral" | "source" | "target";
  /** Arrowheads on the edges without `directed` */
  arrows?: boolean;
  /**
   * Shape of the arrowheads: `open` (a slim outlined head) or `filled` (a
   * solid head in the edge color, which follows the theme and the highlight)
   * @default "open"
   */
  arrowStyle?: "open" | "filled";
  /**
   * Node labels; `auto` hides minor and overlapping labels when zoomed out.
   * Text inside boxes keeps a readable minimum size and is shortened with an ellipsis;
   * it is hidden only when the box is too small for any text, or with `false`
   * @default "auto"
   */
  nodeLabels?: boolean | "auto";
  /**
   * Edge labels: always, `auto` (zoomed in or highlighted), only `hover`, or never
   * @default "auto"
   */
  edgeLabels?: boolean | "auto" | "hover";
  /** What hovering / selecting a node highlights */
  highlight?: "neighbors" | "lineage" | "none";
  /** Ids of the selected nodes (changing it updates the selection) */
  selected?: readonly string[];
  /**
   * Animates layout and data changes; a number is the duration in ms
   * @default true
   */
  animation?: boolean | number;
  /**
   * Padding around the graph when fitting it, in CSS pixels
   * @default 24
   */
  fitPadding?: number;
  /**
   * Zoom buttons (zoom in, zoom out, fit)
   * @default true
   */
  controls?: boolean;
  /** Legend of the groups; shown by default with several groups */
  legend?: boolean | GraphLegendOptions;
  /** Tooltip; `false` disables it */
  tooltip?: boolean | GraphTooltipOptions;
  /**
   * Drag pans, Ctrl / ⌘ + wheel and pinch zoom, nodes can be dragged
   * (force, circular), click selects, arrow keys move between nodes;
   * `false` makes the chart static
   * @default true
   */
  interaction?: boolean | GraphInteractionOptions;
  /**
   * Backend of the nodes and edges: `auto` tries WebGPU, then WebGL2, then
   * WebGL, then Canvas2D, skipping GPUs running in software
   * @default "auto"
   */
  renderer?: ChartRendererPreference;
  /** Group colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  palette?: readonly string[];
  /** Accessible name of the chart */
  ariaLabel?: string;
  /**
   * Language of the built-in texts (summary, announcements, tooltip,
   * buttons); built-in texts in English, Chinese, Japanese and French
   * @default the page language (`<html lang>`), then the browser language
   */
  locale?: string;
  /** Overrides of the built-in texts of the `locale` */
  labels?: Partial<GraphChartLabels>;
  /** Called when the hovered (or keyboard-focused) node / edge changes */
  onHover?: (event: GraphHoverEvent | null) => void;
  /** Called when a node or an edge is clicked (or a node activated with Enter) */
  onItemClick?: (event: GraphHoverEvent) => void;
  /** Called with the ids of the selected nodes when the selection changes */
  onSelectionChange?: (ids: string[]) => void;
  /** Called when a tree node is collapsed or expanded */
  onToggle?: (event: GraphToggleEvent) => void;
  /** Called when the legend shows / hides a group */
  onGroupToggle?: (event: GraphGroupToggleEvent) => void;
  /** Called when the layout is done (the force simulation cooled down) */
  onLayoutEnd?: (event: GraphLayoutEndEvent) => void;
  /** Called with the backend once it is ready (and after a fallback) */
  onRendererChange?: (renderer: ChartRendererKind) => void;
  /** Class of the outer element */
  className?: string;
  /** Style of the outer element */
  style?: CSSProperties;
  /** Imperative handle */
  ref?: Ref<GraphChartHandle>;
}

/** Props of `GraphChart` */
export interface GraphChartProps extends GraphCommonProps {
  /**
   * Placement of the nodes
   * @default "force"
   */
  layout?: GraphLayoutType;
  /** Direction of the `dag` and `tree` layouts */
  direction?: GraphDirection;
  /** Force layout settings (Barnes–Hut, worker for large graphs) */
  force?: GraphForceOptions;
  /** Circular / arc layout settings */
  circular?: GraphCircularOptions;
  /** Layered layout settings (`layout="dag"`) */
  dag?: GraphDagOptions;
  /** Tree layout settings (tree layouts) */
  tree?: GraphTreeOptions;
}

/** Props of `DependencyGraph` */
export interface DependencyGraphProps extends GraphCommonProps {
  /**
   * Flow direction
   * @default "TB"
   */
  direction?: GraphDirection;
  /** Layer / node spacing, crossing reduction sweeps */
  dag?: GraphDagOptions;
  /**
   * Highlights the longest path (node `value` = duration); `true` computes it, a list of ids sets it
   * @default false
   */
  criticalPath?: boolean | readonly string[];
}

/** Props of `TreeChart` */
export interface TreeChartProps extends GraphCommonProps {
  /**
   * Kind of tree: tidy tree, radial tree, two-sided mind map or org chart
   * @default "tree"
   */
  layout?: "tree" | "radial" | "mindmap" | "org";
  /**
   * Direction of `layout="tree"`
   * @default "LR"
   */
  direction?: GraphDirection;
  /** Root, spacing, collapsing, card size */
  tree?: GraphTreeOptions;
}

// ----------------------------------------------------------------- base

interface Handlers {
  onHover?: (event: GraphHoverEvent | null) => void;
  onItemClick?: (event: GraphHoverEvent) => void;
  onSelectionChange?: (ids: string[]) => void;
  onToggle?: (event: GraphToggleEvent) => void;
  onGroupToggle?: (event: GraphGroupToggleEvent) => void;
  onLayoutEnd?: (event: GraphLayoutEndEvent) => void;
  onRendererChange?: (renderer: ChartRendererKind) => void;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

const shallowEqual = (
  a: Record<string, unknown>,
  b: Record<string, unknown>,
): boolean => {
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(
    (key) => a[key] === b[key] && Object.prototype.hasOwnProperty.call(b, key),
  );
};

const sameValue = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b))
    return a.length === b.length && a.every((v, i) => v === b[i]);
  return isPlainObject(a) && isPlainObject(b) && shallowEqual(a, b);
};

/**
 * Whether two option objects describe the same chart: top-level values by
 * identity, one level deep for inline arrays / objects (node and edge
 * arrays rebuilt with the same objects are the same data)
 */
const sameGraphOptions = (
  a: GraphChartOptions,
  b: GraphChartOptions,
): boolean => {
  if (a === b) return true;
  const keys = Object.keys(a) as (keyof GraphChartOptions)[];
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(b, key) && sameValue(a[key], b[key]),
  );
};

const cssSize = (value: number | string | undefined, fallback: string) =>
  value === undefined
    ? fallback
    : typeof value === "number"
      ? `${value}px`
      : value;

interface GraphBaseProps extends Handlers {
  options: GraphChartOptions;
  height?: number | string;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  handleRef?: Ref<GraphChartHandle>;
}

function GraphBase({
  options,
  height,
  width,
  className,
  style,
  handleRef,
  ...handlers
}: GraphBaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<GraphChartInstance | null>(null);
  const handlersRef = useRef<Handlers>(handlers);
  // keep the previous options while they describe the same chart
  const [stable, setStable] = useState(options);
  if (stable !== options && !sameGraphOptions(stable, options))
    setStable(options);
  const optionsRef = useRef(stable);

  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const chart = createGraphChart(container, optionsRef.current);
    chartRef.current = chart;
    const offs = [
      chart.on("hover", (e) => handlersRef.current.onHover?.(e)),
      chart.on("click", (e) => handlersRef.current.onItemClick?.(e)),
      chart.on("select", (e) => handlersRef.current.onSelectionChange?.(e.ids)),
      chart.on("toggle", (e) => handlersRef.current.onToggle?.(e)),
      chart.on("groupToggle", (e) => handlersRef.current.onGroupToggle?.(e)),
      chart.on("layoutEnd", (e) => handlersRef.current.onLayoutEnd?.(e)),
      chart.on("renderer", (r) => handlersRef.current.onRendererChange?.(r)),
    ];
    return () => {
      offs.forEach((off) => off());
      chart.destroy();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (optionsRef.current === stable) return;
    optionsRef.current = stable;
    chartRef.current?.setOptions(stable);
  }, [stable]);

  useImperativeHandle(
    handleRef,
    () => ({
      fit: (animate) => chartRef.current?.fit(animate),
      focusNode: (id, opts) => chartRef.current?.focusNode(id, opts),
      setData: (data) => chartRef.current?.setData(data),
      select: (ids) => chartRef.current?.select(ids),
      getSelection: () => chartRef.current?.getSelection() ?? [],
      expand: (id) => chartRef.current?.expand(id),
      collapse: (id) => chartRef.current?.collapse(id),
      toggle: (id) => chartRef.current?.toggle(id),
      getPositions: () => chartRef.current?.getPositions() ?? {},
      relayout: () => chartRef.current?.relayout(),
      getRenderer: () => chartRef.current?.getRenderer() ?? null,
      getInstance: () => chartRef.current,
    }),
    [],
  );

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: cssSize(width, "100%"),
        height: cssSize(height, "480px"),
        ...style,
      }}
    >
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}

/** Renders a chart from the common props and the layout options */
function GraphFrame({
  props,
  layout,
}: {
  props: GraphCommonProps;
  layout: Pick<
    GraphChartOptions,
    "layout" | "direction" | "force" | "circular" | "dag" | "tree"
  >;
}) {
  const {
    nodes,
    edges,
    groups,
    height,
    width,
    nodeShape,
    nodeSize,
    edgeStyle,
    edgeWidth,
    edgeColor,
    arrows,
    arrowStyle,
    nodeLabels,
    edgeLabels,
    highlight,
    selected,
    animation,
    fitPadding,
    controls,
    legend,
    tooltip,
    interaction,
    renderer,
    palette,
    ariaLabel,
    locale,
    labels,
    onHover,
    onItemClick,
    onSelectionChange,
    onToggle,
    onGroupToggle,
    onLayoutEnd,
    onRendererChange,
    className,
    style,
    ref,
  } = props;
  const options: GraphChartOptions = {
    nodes,
    edges,
    groups,
    ...layout,
    nodeShape,
    nodeSize,
    edgeStyle,
    edgeWidth,
    edgeColor,
    arrows,
    arrowStyle,
    nodeLabels,
    edgeLabels,
    highlight,
    selected,
    animation,
    fitPadding,
    controls,
    legend,
    tooltip,
    interaction,
    renderer,
    palette,
    ariaLabel,
    locale,
    labels,
  };
  return (
    <GraphBase
      options={options}
      height={height}
      width={width}
      className={className}
      style={style}
      handleRef={ref}
      onHover={onHover}
      onItemClick={onItemClick}
      onSelectionChange={onSelectionChange}
      onToggle={onToggle}
      onGroupToggle={onGroupToggle}
      onLayoutEnd={onLayoutEnd}
      onRendererChange={onRendererChange}
    />
  );
}

// ----------------------------------------------------------- components

/**
 * Relationship network (关系图): force-directed by default (Barnes–Hut,
 * a Web Worker for large graphs), or circular, arc diagram, layered or
 * tree layouts; GPU rendering, pan / zoom, drag, neighbor highlight,
 * legend toggles and keyboard navigation.
 */
export function GraphChart(props: GraphChartProps) {
  const { layout, direction, force, circular, dag, tree } = props;
  return (
    <GraphFrame
      props={props}
      layout={{
        layout: layout ?? "force",
        direction,
        force,
        circular,
        dag,
        tree,
      }}
    />
  );
}

/**
 * Dependency graph (依赖图): layered (Sugiyama) layout of a DAG with
 * crossing reduction, spline or orthogonal edges with arrowheads,
 * upstream / downstream highlight and the critical path.
 */
export function DependencyGraph(props: DependencyGraphProps) {
  const { direction, dag, criticalPath } = props;
  return (
    <GraphFrame
      props={props}
      layout={{
        layout: "dag",
        direction: direction ?? "TB",
        dag: criticalPath === undefined ? dag : { ...dag, criticalPath },
      }}
    />
  );
}

/**
 * Tree chart (树图): tidy tree, radial tree, mind map or org chart, with
 * animated collapse / expand of the subtrees.
 */
export function TreeChart(props: TreeChartProps) {
  const { layout, direction, tree } = props;
  return (
    <GraphFrame
      props={props}
      layout={{ layout: layout ?? "tree", direction, tree }}
    />
  );
}
