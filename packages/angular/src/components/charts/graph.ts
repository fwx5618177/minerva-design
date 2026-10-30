import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  input,
  output,
} from "@angular/core";
import {
  createGraphChart,
  type ChartRendererKind,
  type ChartRendererPreference,
  type GraphChartInstance,
  type GraphChartLabels,
  type GraphChartOptions,
  type GraphCircularOptions,
  type GraphDagOptions,
  type GraphData,
  type GraphDirection,
  type GraphEdge,
  type GraphEdgeStyle,
  type GraphForceOptions,
  type GraphGroup,
  type GraphGroupToggleEvent,
  type GraphHoverEvent,
  type GraphInteractionOptions,
  type GraphLayoutEndEvent,
  type GraphLayoutType,
  type GraphLegendOptions,
  type GraphNode,
  type GraphNodeShape,
  type GraphPoint,
  type GraphToggleEvent,
  type GraphTooltipOptions,
  type GraphTreeOptions,
} from "minerva-design/charts/core";
import { CHART_SURFACE, MnChartEngine, optionalBoolean } from "./engine";

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
 * arrays rebuilt with the same objects are the same data), like the React
 * components
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

/** Layout part of the options (what each component sets) */
type GraphLayoutOptions = Pick<
  GraphChartOptions,
  "layout" | "direction" | "force" | "circular" | "dag" | "tree"
>;

/**
 * Base of the graph components (engine `createGraphChart`): the common
 * inputs, the outputs and the handle methods. New options are passed only
 * when they describe another chart: `setOptions` re-runs the layout when
 * the node, edge or group arrays change, so arrays rebuilt with the same
 * objects keep the layout.
 */
@Directive()
export abstract class MnGraphChartBase extends MnChartEngine<
  GraphChartOptions,
  GraphChartInstance
> {
  /** The nodes */
  readonly nodes = input.required<readonly GraphNode[]>();
  /** The edges (parent → child in trees, prerequisite → dependent in DAGs) */
  readonly edges = input.required<readonly GraphEdge[]>();
  /** Groups: legend order, names and colors */
  readonly groups = input<readonly GraphGroup[] | undefined>(undefined);
  /** Shape of the nodes without `shape` (boxes for DAGs, org charts and mind maps, circles otherwise) */
  readonly nodeShape = input<GraphNodeShape | undefined>(undefined);
  /** Circle diameter in layout units, or `[min, max]` scaled by the node `value` */
  readonly nodeSize = input<number | readonly [number, number] | undefined>(
    undefined,
  );
  /** Edge shape; depends on the layout when omitted */
  readonly edgeStyle = input<GraphEdgeStyle | undefined>(undefined);
  /** Edge width in CSS pixels, or `[min, max]` scaled by the edge `value` */
  readonly edgeWidth = input<number | readonly [number, number] | undefined>(
    undefined,
  );
  /** Edge colors: neutral or tinted with the source / target node (default `neutral`) */
  readonly edgeColor = input<"neutral" | "source" | "target" | undefined>(
    undefined,
  );
  /** Arrowheads on the edges without `directed` (on for DAGs) */
  readonly arrows = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Node labels; `auto` hides minor and overlapping labels when zoomed out (default `auto`) */
  readonly nodeLabels = input<boolean | "auto" | undefined>(undefined);
  /** Edge labels: always, `auto` (zoomed in or highlighted), only `hover`, or never (default `auto`) */
  readonly edgeLabels = input<boolean | "auto" | "hover" | undefined>(
    undefined,
  );
  /** What hovering / selecting a node highlights */
  readonly highlight = input<"neighbors" | "lineage" | "none" | undefined>(
    undefined,
  );
  /** Ids of the selected nodes (changing it updates the selection) */
  readonly selected = input<readonly string[] | undefined>(undefined);
  /** Animates layout and data changes; a number is the duration in ms (default `true`) */
  readonly animation = input<boolean | number | undefined>(undefined);
  /** Padding around the graph when fitting it, in CSS pixels (default 24) */
  readonly fitPadding = input<number | undefined>(undefined);
  /** Zoom buttons: zoom in, zoom out, fit (default `true`) */
  readonly controls = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Legend of the groups; shown by default with several groups */
  readonly legend = input<boolean | GraphLegendOptions | undefined>(undefined);
  /** Tooltip; `false` disables it */
  readonly tooltip = input<boolean | GraphTooltipOptions | undefined>(
    undefined,
  );
  /** Drag pans, Ctrl / ⌘ + wheel and pinch zoom, nodes can be dragged, click selects, arrow keys move; `false` makes the chart static (default `true`) */
  readonly interaction = input<boolean | GraphInteractionOptions | undefined>(
    undefined,
  );
  /** Backend of the nodes and edges: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`) */
  readonly renderer = input<ChartRendererPreference | undefined>(undefined);
  /** Group colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  readonly palette = input<readonly string[] | undefined>(undefined);
  /** Accessible name of the chart */
  readonly ariaLabel = input<string | undefined>(undefined);
  /** Language of the built-in texts (summary, announcements, tooltip, buttons); the page language by default */
  readonly locale = input<string | undefined>(undefined);
  /** Overrides of the built-in texts of the `locale` */
  readonly labels = input<Partial<GraphChartLabels> | undefined>(undefined);

  /** The hovered (or keyboard-focused) node / edge changed (`null`: none) */
  readonly hover = output<GraphHoverEvent | null>();
  /** A node or an edge was clicked (or a node activated with Enter) */
  readonly itemClick = output<GraphHoverEvent>();
  /** The selection changed: ids of the selected nodes */
  readonly selectionChange = output<string[]>();
  /** A tree node was collapsed or expanded */
  readonly nodeToggle = output<GraphToggleEvent>();
  /** The legend showed / hid a group */
  readonly groupToggle = output<GraphGroupToggleEvent>();
  /** The layout is done (the force simulation cooled down) */
  readonly layoutEnd = output<GraphLayoutEndEvent>();
  /** The backend in use (again after a fallback) */
  readonly rendererChange = output<ChartRendererKind>();

  private previous: GraphChartOptions | null = null;

  /** Layout options of the component */
  protected abstract layoutOptions(): GraphLayoutOptions;

  protected override defaultHeight(): number {
    return 480;
  }

  protected createEngine(
    container: HTMLElement,
    options: GraphChartOptions,
  ): GraphChartInstance {
    return createGraphChart(container, options);
  }

  protected engineOptions(): GraphChartOptions | null {
    const next: GraphChartOptions = {
      nodes: this.nodes(),
      edges: this.edges(),
      groups: this.groups(),
      ...this.layoutOptions(),
      nodeShape: this.nodeShape(),
      nodeSize: this.nodeSize(),
      edgeStyle: this.edgeStyle(),
      edgeWidth: this.edgeWidth(),
      edgeColor: this.edgeColor(),
      arrows: this.arrows(),
      nodeLabels: this.nodeLabels(),
      edgeLabels: this.edgeLabels(),
      highlight: this.highlight(),
      selected: this.selected(),
      animation: this.animation(),
      fitPadding: this.fitPadding(),
      controls: this.controls(),
      legend: this.legend(),
      tooltip: this.tooltip(),
      interaction: this.interaction(),
      renderer: this.renderer(),
      palette: this.palette(),
      ariaLabel: this.ariaLabel(),
      locale: this.locale(),
      labels: this.labels(),
    };
    // the same chart: no setOptions (it would not re-run the layout, but
    // still refresh the colors and the legend)
    if (this.previous && sameGraphOptions(this.previous, next)) return null;
    this.previous = next;
    return next;
  }

  protected override bindEngine(chart: GraphChartInstance) {
    return [
      chart.on("hover", (e) => this.hover.emit(e)),
      chart.on("click", (e) => this.itemClick.emit(e)),
      chart.on("select", (e) => this.selectionChange.emit(e.ids)),
      chart.on("toggle", (e) => this.nodeToggle.emit(e)),
      chart.on("groupToggle", (e) => this.groupToggle.emit(e)),
      chart.on("layoutEnd", (e) => this.layoutEnd.emit(e)),
      chart.on("renderer", (e) => this.rendererChange.emit(e)),
    ];
  }

  /** Fits the visible nodes in the view */
  fit(animate?: boolean): void {
    this.instance()?.fit(animate);
  }

  /** Centers a node (expanding its collapsed ancestors), optionally zooming */
  focusNode(id: string, options?: { zoom?: number; animate?: boolean }): void {
    this.instance()?.focusNode(id, options);
  }

  /** Replaces the data until the inputs change again */
  setData(data: GraphData): void {
    this.instance()?.setData(data);
  }

  /** Selects nodes (`null` clears the selection) */
  select(ids: readonly string[] | string | null): void {
    this.instance()?.select(ids);
  }

  /** Ids of the selected nodes */
  getSelection(): string[] {
    return this.instance()?.getSelection() ?? [];
  }

  /** Expands a node (all nodes without an id) */
  expand(id?: string): void {
    this.instance()?.expand(id);
  }

  /** Collapses a node (all nodes with children without an id) */
  collapse(id?: string): void {
    this.instance()?.collapse(id);
  }

  /** Collapses / expands a node */
  toggle(id: string): void {
    this.instance()?.toggle(id);
  }

  /** Current positions of the nodes in layout units */
  getPositions(): Record<string, GraphPoint> {
    return this.instance()?.getPositions() ?? {};
  }

  /** Computes the layout again */
  relayout(): void {
    this.instance()?.relayout();
  }

  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null {
    return this.instance()?.getRenderer() ?? null;
  }
}

/**
 * Relationship network: force-directed by default (Barnes–Hut, a Web
 * Worker for large graphs), or circular, arc diagram, layered or tree
 * layouts; GPU rendering, pan / zoom, drag, neighbor highlight, legend
 * toggles and keyboard navigation (engine `createGraphChart`)
 */
@Component({
  selector: "mn-graph-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnGraphChart extends MnGraphChartBase {
  /** Placement of the nodes (default `force`) */
  readonly layout = input<GraphLayoutType>("force");
  /** Direction of the `dag` and `tree` layouts */
  readonly direction = input<GraphDirection | undefined>(undefined);
  /** Force layout settings (Barnes–Hut, worker for large graphs) */
  readonly force = input<GraphForceOptions | undefined>(undefined);
  /** Circular / arc layout settings */
  readonly circular = input<GraphCircularOptions | undefined>(undefined);
  /** Layered layout settings (`layout="dag"`) */
  readonly dag = input<GraphDagOptions | undefined>(undefined);
  /** Tree layout settings (tree layouts) */
  readonly tree = input<GraphTreeOptions | undefined>(undefined);

  protected layoutOptions(): GraphLayoutOptions {
    return {
      layout: this.layout(),
      direction: this.direction(),
      force: this.force(),
      circular: this.circular(),
      dag: this.dag(),
      tree: this.tree(),
    };
  }
}

/**
 * Dependency graph: layered (Sugiyama) layout of a DAG with crossing
 * reduction, spline or orthogonal edges with arrowheads, upstream /
 * downstream highlight and the critical path (engine `createGraphChart`)
 */
@Component({
  selector: "mn-dependency-graph",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnDependencyGraph extends MnGraphChartBase {
  /** Flow direction (default `TB`) */
  readonly direction = input<GraphDirection>("TB");
  /** Layer / node spacing, crossing reduction sweeps */
  readonly dag = input<GraphDagOptions | undefined>(undefined);
  /** Highlights the longest path (node `value` = duration); `true` computes it, a list of ids sets it (default `false`) */
  readonly criticalPath = input<boolean | readonly string[] | undefined>(
    undefined,
  );

  protected layoutOptions(): GraphLayoutOptions {
    const dag = this.dag();
    const criticalPath = this.criticalPath();
    return {
      layout: "dag",
      direction: this.direction(),
      dag: criticalPath === undefined ? dag : { ...dag, criticalPath },
    };
  }
}

/**
 * Tree chart: tidy tree, radial tree, mind map or org chart, with animated
 * collapse / expand of the subtrees (engine `createGraphChart`)
 */
@Component({
  selector: "mn-tree-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnTreeChart extends MnGraphChartBase {
  /** Kind of tree: tidy tree, radial tree, two-sided mind map or org chart (default `tree`) */
  readonly layout = input<"tree" | "radial" | "mindmap" | "org">("tree");
  /** Direction of `layout="tree"` (default `LR`) */
  readonly direction = input<GraphDirection | undefined>(undefined);
  /** Root, spacing, collapsing, card size */
  readonly tree = input<GraphTreeOptions | undefined>(undefined);

  protected layoutOptions(): GraphLayoutOptions {
    return {
      layout: this.layout(),
      direction: this.direction(),
      tree: this.tree(),
    };
  }
}
