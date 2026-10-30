import { property } from "lit/decorators.js";
import {
  createGraphChart,
  type ChartRendererKind,
  type GraphChartInstance,
  type GraphChartOptions,
  type GraphData,
  type GraphDirection,
  type GraphEdge,
  type GraphEdgeStyle,
  type GraphGroup,
  type GraphLayoutType,
  type GraphNode,
  type GraphNodeShape,
  type GraphPoint,
} from "minerva-design/charts/core";
import { MinervaEngineElement } from "../chart/engine-element";

/** Engine options other than the data and the layout type (layout settings, node / edge styles, legend, tooltip, interaction, labels...) */
export type GraphBaseOptions = Partial<
  Omit<GraphChartOptions, "nodes" | "edges" | "groups" | "layout">
>;

type GraphLayoutOptions = Pick<
  GraphChartOptions,
  "layout" | "direction" | "force" | "circular" | "dag" | "tree"
>;

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
  return (
    keys.length === Object.keys(b).length &&
    keys.every(
      (key) =>
        Object.prototype.hasOwnProperty.call(b, key) && a[key] === b[key],
    )
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

/**
 * Base of the graph elements (engine `createGraphChart` of
 * `minerva-design/charts/core`): forwards the engine events as `minerva-*`
 * events and exposes the view, selection and collapse methods. New options
 * are passed only when they describe another chart (the layout runs again
 * when the node, edge or group arrays change: arrays rebuilt with the same
 * objects keep it).
 *
 * @fires minerva-hover - The hovered (or keyboard-focused) node / edge changed; detail: { type, id, node, edge, index, group, color, degree, clientX, clientY }, `null` when nothing is hovered
 * @fires minerva-item-click - A node or an edge was clicked (or a node activated with Enter); detail: { type, id, node, edge, index, group, color, degree, clientX, clientY }
 * @fires minerva-selection-change - The selection changed; detail: { ids }
 * @fires minerva-toggle - A tree node was collapsed or expanded; detail: { id, collapsed }
 * @fires minerva-group-toggle - The legend showed / hid a group; detail: { group, hidden }
 * @fires minerva-layout-end - The layout is done (the force simulation cooled down); detail: { layout }
 * @fires minerva-renderer-change - The backend is ready (or fell back after a GPU loss); detail: { renderer }
 */
export abstract class MinervaGraphElement extends MinervaEngineElement<
  GraphChartOptions,
  GraphChartInstance
> {
  /** Height of the chart, the legend included: pixels or any CSS length */
  @property()
  override height?: string | number = 480;

  /** Nodes `{ id, label, group, value, ... }`; property only */
  @property({ attribute: false })
  nodes?: readonly GraphNode[];

  /** Edges `{ source, target, value, label, ... }`; property only */
  @property({ attribute: false })
  edges?: readonly GraphEdge[];

  /** Groups `{ id, name, color }`: legend order, names and colors; property only */
  @property({ attribute: false })
  groups?: readonly GraphGroup[];

  /** Shape of the nodes without `shape` (boxes for DAGs, org charts and mind maps, circles otherwise) */
  @property({ attribute: "node-shape" })
  nodeShape?: GraphNodeShape;

  /** Edge shape; depends on the layout when omitted */
  @property({ attribute: "edge-style" })
  edgeStyle?: GraphEdgeStyle;

  /** Edge colors: neutral or tinted with the source / target node */
  @property({ attribute: "edge-color" })
  edgeColor: "neutral" | "source" | "target" = "neutral";

  /** Shape of the arrowheads: `open` (a slim outlined head) or `filled` (a solid head in the edge color, following the theme and the highlight) */
  @property({ attribute: "arrow-style" })
  arrowStyle: "open" | "filled" = "open";

  /** What hovering / selecting a node highlights */
  @property()
  highlight?: "neighbors" | "lineage" | "none";

  /** Language of the built-in texts (summary, announcements, tooltip, buttons); the page language by default */
  @property()
  locale?: string;

  /** Ids of the selected nodes (changing it updates the selection); property only */
  @property({ attribute: false })
  selected?: readonly string[];

  /** Other engine options (`GraphChartOptions`: force, circular, dag, tree, nodeSize, edgeWidth, arrows, nodeLabels, edgeLabels, animation, legend, tooltip, interaction, renderer, palette, ariaLabel, labels...); property only */
  @property({ attribute: false })
  options?: GraphBaseOptions;

  private previous: GraphChartOptions | null = null;

  /** Layout options of the element */
  protected abstract layoutOptions(): GraphLayoutOptions;

  protected createEngine(
    container: HTMLElement,
    options: GraphChartOptions,
  ): GraphChartInstance {
    this.previous = options;
    return createGraphChart(container, options);
  }

  protected engineOptions(): GraphChartOptions | null {
    if (!this.nodes || !this.edges) return null;
    return {
      ...this.options,
      nodes: this.nodes,
      edges: this.edges,
      groups: this.groups,
      ...this.layoutOptions(),
      nodeShape: this.nodeShape ?? this.options?.nodeShape,
      edgeStyle: this.edgeStyle ?? this.options?.edgeStyle,
      edgeColor: this.edgeColor,
      arrowStyle: this.arrowStyle,
      highlight: this.highlight ?? this.options?.highlight,
      locale: this.locale ?? this.options?.locale,
      selected: this.selected ?? this.options?.selected,
    };
  }

  protected override syncEngine(engine: GraphChartInstance): void {
    const next = this.engineOptions();
    if (!next || (this.previous && sameGraphOptions(this.previous, next)))
      return;
    this.previous = next;
    engine.setOptions(next);
  }

  protected override bindEngine(chart: GraphChartInstance): Array<() => void> {
    return [
      chart.on("hover", (e) => this.emit("minerva-hover", e)),
      chart.on("click", (e) => this.emit("minerva-item-click", e)),
      chart.on("select", (e) =>
        this.emit("minerva-selection-change", { ids: e.ids }),
      ),
      chart.on("toggle", (e) => this.emit("minerva-toggle", e)),
      chart.on("groupToggle", (e) => this.emit("minerva-group-toggle", e)),
      chart.on("layoutEnd", (e) => this.emit("minerva-layout-end", e)),
      chart.on("renderer", (renderer) =>
        this.emit("minerva-renderer-change", { renderer }),
      ),
    ];
  }

  /** Fits the visible nodes in the view */
  fit(animate?: boolean): void {
    this.instance?.fit(animate);
  }

  /** Centers a node (expanding its collapsed ancestors), optionally zooming */
  focusNode(id: string, options?: { zoom?: number; animate?: boolean }): void {
    this.instance?.focusNode(id, options);
  }

  /** Replaces the data until the properties change again */
  setData(data: GraphData): void {
    this.instance?.setData(data);
  }

  /** Selects nodes (`null` clears the selection) */
  select(ids: readonly string[] | string | null): void {
    this.instance?.select(ids);
  }

  /** Ids of the selected nodes */
  getSelection(): string[] {
    return this.instance?.getSelection() ?? [];
  }

  /** Expands a node (all nodes without an id) */
  expand(id?: string): void {
    this.instance?.expand(id);
  }

  /** Collapses a node (all nodes with children without an id) */
  collapse(id?: string): void {
    this.instance?.collapse(id);
  }

  /** Collapses / expands a node */
  toggle(id: string): void {
    this.instance?.toggle(id);
  }

  /** Current positions of the nodes in layout units */
  getPositions(): Record<string, GraphPoint> {
    return this.instance?.getPositions() ?? {};
  }

  /** Computes the layout again */
  relayout(): void {
    this.instance?.relayout();
  }

  /** Backend in use (`webgpu`, `webgl2`, `webgl`, `canvas2d`), `null` until ready */
  getRenderer(): ChartRendererKind | null {
    return this.instance?.getRenderer() ?? null;
  }
}

/**
 * Relationship network of `minerva-design/charts/core` (the
 * `<GraphChart>` of React): force-directed by default (Barnes–Hut, a Web
 * Worker for large graphs), or circular, arc diagram, layered or tree
 * layouts; GPU rendering, pan / zoom, drag, neighbor highlight, legend
 * toggles and keyboard navigation.
 *
 * Published as the optional entry `minerva-design/web-components/graph`.
 *
 * @summary GPU relationship network with force, circular and layered layouts.
 * @tag minerva-graph-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaGraphChart extends MinervaGraphElement {
  static override tagName = "minerva-graph-chart";

  /** Placement of the nodes */
  @property()
  layout: GraphLayoutType = "force";

  /** Direction of the `dag` and `tree` layouts */
  @property()
  direction?: GraphDirection;

  protected layoutOptions(): GraphLayoutOptions {
    return {
      layout: this.layout,
      direction: this.direction ?? this.options?.direction,
      force: this.options?.force,
      circular: this.options?.circular,
      dag: this.options?.dag,
      tree: this.options?.tree,
    };
  }
}

/**
 * Dependency graph of `minerva-design/charts/core` (the
 * `<DependencyGraph>` of React): layered (Sugiyama) layout of a DAG with
 * crossing reduction, spline or orthogonal edges with arrowheads, upstream
 * / downstream highlight and the critical path.
 *
 * Published as the optional entry `minerva-design/web-components/graph`.
 *
 * @summary Layered DAG with the critical path.
 * @tag minerva-dependency-graph
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaDependencyGraph extends MinervaGraphElement {
  static override tagName = "minerva-dependency-graph";

  /** Flow direction */
  @property()
  direction: GraphDirection = "TB";

  /** Highlights the longest path (node `value` = duration); a list of node ids (property) sets it */
  @property({ type: Boolean, attribute: "critical-path" })
  criticalPath?: boolean | readonly string[];

  protected layoutOptions(): GraphLayoutOptions {
    const dag = this.options?.dag;
    const criticalPath = this.criticalPath;
    return {
      layout: "dag",
      direction: this.direction,
      dag: criticalPath === undefined ? dag : { ...dag, criticalPath },
    };
  }
}

/**
 * Tree chart of `minerva-design/charts/core` (the `<TreeChart>` of
 * React): tidy tree, radial tree, mind map or org chart, with animated
 * collapse / expand of the subtrees.
 *
 * Published as the optional entry `minerva-design/web-components/graph`.
 *
 * @summary Tidy tree, radial tree, mind map or org chart.
 * @tag minerva-tree-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaTreeChart extends MinervaGraphElement {
  static override tagName = "minerva-tree-chart";

  /** Kind of tree: tidy tree, radial tree, two-sided mind map or org chart */
  @property()
  layout: "tree" | "radial" | "mindmap" | "org" = "tree";

  /** Direction of `layout="tree"` */
  @property()
  direction: GraphDirection = "LR";

  protected layoutOptions(): GraphLayoutOptions {
    return {
      layout: this.layout,
      // the other tree layouts have no direction (org charts grow downward)
      direction: this.layout === "tree" ? this.direction : undefined,
      tree: this.options?.tree,
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-graph-chart": MinervaGraphChart;
    "minerva-dependency-graph": MinervaDependencyGraph;
    "minerva-tree-chart": MinervaTreeChart;
  }
}
