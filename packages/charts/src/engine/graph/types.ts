// Public types of the relationship / dependency / hierarchy charts of
// minerva-design/charts/core (listed in apps/docs/scripts/generate-api.mjs).

import type { ChartRendererKind, ChartRendererPreference } from "../types";

/**
 * Placement of the nodes: a force-directed network, a layered DAG
 * (Sugiyama), a tidy tree, a radial tree, a two-sided mind map, an org
 * chart, nodes on a circle, an arc diagram, or the `x` / `y` of the nodes
 */
export type GraphLayoutType =
  | "force"
  | "dag"
  | "tree"
  | "radial"
  | "mindmap"
  | "org"
  | "circular"
  | "arc"
  | "none";

/** Flow direction of layered and tree layouts: top → bottom, left → right, bottom → top, right → left */
export type GraphDirection = "TB" | "LR" | "BT" | "RL";

/** Shape of a node: a circle or a rounded box sized to its label */
export type GraphNodeShape = "circle" | "box";

/** Shape of the edges */
export type GraphEdgeStyle = "straight" | "curve" | "spline" | "orthogonal";

/** A node (entity, person, package, task, tree item) */
export interface GraphNode {
  /** Unique identifier, referenced by the edges */
  id: string;
  /** Text shown next to / inside the node (the id when omitted) */
  label?: string;
  /** Second line of boxes and org chart cards (job title, version, status) */
  subtitle?: string;
  /** Group (category) id: color, legend entry */
  group?: string;
  /** Weight of the node: sizes circles (area) and ranks labels; the duration of a task for the critical path */
  value?: number;
  /** Color (any CSS color, `var(--x)` included); wins over the group color */
  color?: string;
  /** Diameter of a circle / height of a box in layout units (the zoom scales it) */
  size?: number;
  /** Shape; the `nodeShape` option when omitted */
  shape?: GraphNodeShape;
  /** Position (layout `none`, initial position of `force`) */
  x?: number;
  y?: number;
  /** The force layout does not move the node (pinned at `x` / `y`) */
  fixed?: boolean;
  /** Tree layouts: the children of the node start hidden */
  collapsed?: boolean;
  /** Any data, passed back in the events */
  data?: unknown;
}

/** A relationship / dependency between two nodes */
export interface GraphEdge {
  /** Id of the source node (the parent in tree layouts, the prerequisite in a DAG) */
  source: string;
  /** Id of the target node */
  target: string;
  /** Weight: line width (and the link strength of the force layout) */
  value?: number;
  /** Text drawn on the edge (relationship name) */
  label?: string;
  /** Draws an arrowhead at the target; the `arrows` option when omitted */
  directed?: boolean;
  /** Line color (any CSS color) */
  color?: string;
  /** Line width in CSS pixels; derived from `value` when omitted */
  width?: number;
  /** Dashed line (optional / weak relationship) */
  dashed?: boolean;
  /** Any data, passed back in the events */
  data?: unknown;
}

/** A group (category) of nodes: legend entry and color */
export interface GraphGroup {
  /** Id referenced by `GraphNode.group` */
  id: string;
  /** Name in the legend and the tooltip (the id when omitted) */
  name?: string;
  /** Color of the nodes of the group (any CSS color); the palette when omitted */
  color?: string;
  /** Starts hidden (the legend can show it) */
  hidden?: boolean;
}

/** Nodes, edges and groups (`setData`) */
export interface GraphData {
  nodes: readonly GraphNode[];
  edges: readonly GraphEdge[];
  groups?: readonly GraphGroup[];
}

/** Settings of the force-directed layout */
export interface GraphForceOptions {
  /**
   * Rest length of the edges, in layout units
   * @default 60
   */
  linkDistance?: number;
  /** Stiffness of the edges, 0-1; `1 / min(degree)` per edge when omitted (d3 semantics) */
  linkStrength?: number;
  /**
   * Many-body strength: negative values repel the nodes
   * @default -160
   */
  charge?: number;
  /**
   * Barnes–Hut accuracy: larger values are faster and less accurate
   * @default 0.9
   */
  theta?: number;
  /**
   * Pull of every node towards the center (keeps disconnected parts together)
   * @default 0.04
   */
  gravity?: number;
  /**
   * Prevents overlapping nodes; a number is the extra spacing in layout units
   * @default true
   */
  collide?: boolean | number;
  /**
   * Velocity damping per tick, 0-1
   * @default 0.4
   */
  velocityDecay?: number;
  /**
   * Number of ticks of a full cooling (alpha 1 → 0.001)
   * @default 300
   */
  iterations?: number;
  /**
   * Seed of the pseudo-random jitter: the same data always gives the same layout
   * @default 1
   */
  seed?: number;
  /**
   * Runs the simulation in a Web Worker (created from a Blob URL): `auto`
   * uses one above 2,000 nodes; falls back to time-sliced ticks on the main
   * thread when workers are unavailable
   * @default "auto"
   */
  worker?: "auto" | boolean;
  /**
   * Shows the simulation while it runs; `false` computes it first and shows the result
   * @default true
   */
  animate?: boolean;
  /**
   * Multilevel start of large graphs (400+ nodes without known positions):
   * the layout of a coarsened graph (merged neighbors) seeds a short
   * refinement, several times faster than a full cooling; `false` always runs
   * the full cooling
   * @default true
   */
  multilevel?: boolean;
}

/** Settings of the layered (Sugiyama) layout */
export interface GraphDagOptions {
  /**
   * Space between two layers, in layout units
   * @default 56
   */
  layerGap?: number;
  /**
   * Space between two nodes of a layer, in layout units
   * @default 24
   */
  nodeGap?: number;
  /**
   * Down / up sweeps of the crossing reduction
   * @default 8
   */
  sweeps?: number;
  /**
   * Highlights the longest path (node `value` = duration, 1 when omitted);
   * `true` computes it, a list of node ids sets it
   * @default false
   */
  criticalPath?: boolean | readonly string[];
  /**
   * Color of the critical path (any CSS color)
   * @default "var(--danger-color)"
   */
  criticalColor?: string;
}

/** Settings of the tree layouts (`tree`, `radial`, `mindmap`, `org`) */
export interface GraphTreeOptions {
  /** Id of the root; nodes without a parent are roots when omitted */
  root?: string;
  /** Space between two levels, in layout units; depends on the layout when omitted */
  levelGap?: number;
  /**
   * Space between two neighboring nodes, in layout units
   * @default 12
   */
  siblingGap?: number;
  /**
   * Clicking a node with children collapses / expands it
   * @default true
   */
  collapsible?: boolean;
  /**
   * Org charts: the cards of the leaf children of a node form a column
   * under it instead of a row
   * @default true
   */
  compact?: boolean;
  /**
   * Org chart cards: width and height in layout units
   * @default [168, 60]
   */
  cardSize?: readonly [number, number];
}

/** Settings of the `circular` and `arc` layouts */
export interface GraphCircularOptions {
  /**
   * Orders the nodes by group, then by degree (fewer crossings); `none` keeps the data order
   * @default "group"
   */
  order?: "group" | "degree" | "none";
  /**
   * Pull of the circular edges towards the center, 0 (straight chords) - 1
   * @default 0.8
   */
  tension?: number;
}

/** Pan / zoom / drag / keyboard options */
export interface GraphInteractionOptions {
  /**
   * Dragging the background pans the view
   * @default true
   */
  pan?: boolean;
  /**
   * Wheel and pinch zoom
   * @default true
   */
  zoom?: boolean;
  /**
   * Wheel zoom: only with Ctrl / ⌘ (and trackpad pinch, a hint explains it) or always
   * @default "modifier"
   */
  wheel?: "modifier" | "always";
  /** Nodes can be dragged; on by default for the force, circular and free layouts */
  drag?: boolean;
  /**
   * Clicking selects nodes (Ctrl / ⌘ + click adds to the selection); `multiple` without modifier
   * @default true
   */
  select?: boolean | "multiple";
  /**
   * Arrow keys move between nodes, Enter selects / expands, +/- zoom, 0 fits, Esc clears
   * @default true
   */
  keyboard?: boolean;
  /**
   * Zoom limits (scale of the layout units)
   * @default [0.02, 8]
   */
  zoomRange?: readonly [number, number];
}

/** Legend options */
export interface GraphLegendOptions {
  /**
   * Legend position
   * @default "top"
   */
  position?: "top" | "bottom";
  /**
   * Clicking an item shows / hides the nodes of the group
   * @default true
   */
  toggle?: boolean;
}

/** Tooltip options */
export interface GraphTooltipOptions {
  /** Renders the tooltip content (a string is set as text, `null` hides it) */
  render?: (event: GraphHoverEvent) => string | Node | null;
}

/** Options of `createGraphChart` */
export interface GraphChartOptions {
  /** The nodes */
  nodes: readonly GraphNode[];
  /** The edges (unknown node ids are ignored) */
  edges: readonly GraphEdge[];
  /** Groups: legend order, names and colors (groups of the nodes are added) */
  groups?: readonly GraphGroup[];
  /**
   * Placement of the nodes
   * @default "force"
   */
  layout?: GraphLayoutType;
  /** Direction of `dag` (default `TB`) and `tree` (default `LR`) */
  direction?: GraphDirection;
  /** Force layout settings */
  force?: GraphForceOptions;
  /** Layered layout settings */
  dag?: GraphDagOptions;
  /** Tree layout settings */
  tree?: GraphTreeOptions;
  /** Circular / arc layout settings */
  circular?: GraphCircularOptions;
  /** Shape of the nodes without `shape`; boxes for `dag`, `org` and `mindmap`, circles otherwise */
  nodeShape?: GraphNodeShape;
  /**
   * Circle diameter in layout units; `[min, max]` scales the area with the node `value`
   * @default 12, or [8, 36] when nodes have values
   */
  nodeSize?: number | readonly [number, number];
  /** Edge shape; depends on the layout when omitted */
  edgeStyle?: GraphEdgeStyle;
  /**
   * Edge width in CSS pixels; `[min, max]` scales it with the edge `value`
   * @default 1.25, or [1, 5] when edges have values
   */
  edgeWidth?: number | readonly [number, number];
  /**
   * Edge colors: neutral, or tinted with the color of the source / target node
   * @default "neutral"
   */
  edgeColor?: "neutral" | "source" | "target";
  /** Arrowheads on the edges without `directed`; on for `dag`, off otherwise */
  arrows?: boolean;
  /**
   * Shape of the arrowheads: `open` (a slim outlined head) or `filled` (a
   * solid head in the edge color, which follows the theme and the highlight)
   * @default "open"
   */
  arrowStyle?: "open" | "filled";
  /**
   * Node labels: `auto` hides minor labels when zoomed out and labels that would overlap.
   * Text inside boxes keeps a readable minimum size and is shortened with an ellipsis;
   * it is hidden only when the box is too small for any text, or with `false`
   * @default "auto"
   */
  nodeLabels?: boolean | "auto";
  /**
   * Edge labels: always, only for the highlighted edges, or never
   * @default "auto" (shown when zoomed in or highlighted)
   */
  edgeLabels?: boolean | "auto" | "hover";
  /** Hovering / focusing a node highlights its neighbors (`lineage`: all ancestors and descendants); `lineage` for `dag` */
  highlight?: "neighbors" | "lineage" | "none";
  /** Ids of the selected nodes (initial selection; `select()` changes it) */
  selected?: readonly string[];
  /**
   * Animates layout and data changes (expand / collapse, new data); a number is the duration in ms
   * @default true (450 ms)
   */
  animation?: boolean | number;
  /**
   * Padding around the graph when fitting it in the view, in CSS pixels
   * @default 24
   */
  fitPadding?: number;
  /**
   * Zoom buttons (zoom in, zoom out, fit) in a corner
   * @default true
   */
  controls?: boolean;
  /** Legend of the groups; shown by default when there are several groups */
  legend?: boolean | GraphLegendOptions;
  /** Tooltip; `false` disables it */
  tooltip?: boolean | GraphTooltipOptions;
  /** Pan / zoom / drag / select / keyboard; `false` makes the chart static */
  interaction?: boolean | GraphInteractionOptions;
  /**
   * Backend of the nodes and edges: `auto` tries WebGPU, then WebGL2, then
   * WebGL, then Canvas2D and skips GPUs running in software
   * @default "auto"
   */
  renderer?: ChartRendererPreference;
  /** Colors of the groups without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  palette?: readonly string[];
  /** Accessible name of the chart */
  ariaLabel?: string;
  /**
   * Language of the built-in texts (accessible summary, announcements,
   * tooltip, buttons) and of the number formatting. Built-in texts exist in
   * English, Chinese, Japanese and French; other languages fall back to English.
   * @default the page language (`<html lang>`), then the browser language
   */
  locale?: string;
  /** Overrides of the built-in texts of the `locale` */
  labels?: Partial<GraphChartLabels>;
}

/**
 * Built-in texts of the graph charts. Templates replace `{name}`-style
 * placeholders.
 */
export interface GraphChartLabels {
  /** Role description and accessible name of an unnamed chart @default "Network graph" */
  chart: string;
  /** Accessible name of a tree layout @default "Tree diagram" */
  tree: string;
  /** Accessible name of a layered layout @default "Dependency graph" */
  dag: string;
  /** Summary; `{nodes}`, `{edges}` @default "{nodes} nodes, {edges} links." */
  summary: string;
  /** Summary of the groups; `{groups}` @default "Groups: {groups}." */
  groupsSummary: string;
  /** Keyboard help in the summary @default "Use the arrow keys to move between nodes, Enter to select, + and - to zoom, 0 to fit." */
  keyboardHelp: string;
  /** Announcement of a focused node; `{name}`, `{degree}` @default "{name}, {degree} links" */
  nodeFocus: string;
  /** Announcement of a focused node in a group; `{name}`, `{group}`, `{degree}` @default "{name} ({group}), {degree} links" */
  nodeFocusGroup: string;
  /** Announcement of the selection; `{count}` @default "{count} selected" */
  selected: string;
  /** Announcement when the selection is cleared @default "Selection cleared" */
  selectionCleared: string;
  /** Announcement of an expanded node; `{name}` @default "{name} expanded" */
  expanded: string;
  /** Announcement of a collapsed node; `{name}`, `{count}` @default "{name} collapsed, {count} hidden" */
  collapsed: string;
  /** Announcement when the legend shows a group; `{name}` @default "{name}: shown" */
  shown: string;
  /** Announcement when the legend hides a group; `{name}` @default "{name}: hidden" */
  hidden: string;
  /** Tooltip row: number of links @default "Links" */
  degree: string;
  /** Tooltip row: incoming links @default "Incoming" */
  incoming: string;
  /** Tooltip row: outgoing links @default "Outgoing" */
  outgoing: string;
  /** Tooltip row: node / edge value @default "Value" */
  value: string;
  /** Tooltip row: group @default "Group" */
  group: string;
  /** Tooltip row: hidden descendants of a collapsed node @default "Hidden" */
  hiddenChildren: string;
  /** Tooltip of a node on the critical path @default "Critical path" */
  critical: string;
  /** Zoom in button @default "Zoom in" */
  zoomIn: string;
  /** Zoom out button @default "Zoom out" */
  zoomOut: string;
  /** Fit button @default "Fit to view" */
  fit: string;
  /** Hint of a plain wheel; `{key}` is Ctrl or ⌘ @default "Use {key} + scroll to zoom" */
  zoomHint: string;
  /** Separator of the lists @default ", " */
  listSeparator: string;
}

/** The node or edge under the pointer (or focused with the keyboard) */
export interface GraphHoverEvent {
  /** Kind of item */
  type: "node" | "edge";
  /** Node id, or `source→target` for an edge */
  id: string;
  /** The node (node events) */
  node?: GraphNode;
  /** The edge (edge events) */
  edge?: GraphEdge;
  /** Index of the node / edge in the data */
  index: number;
  /** Group id of the node */
  group?: string;
  /** Resolved color of the node / edge */
  color: string;
  /** Number of links of the node */
  degree?: number;
  /** Position in CSS pixels, relative to the chart's container */
  clientX: number;
  clientY: number;
}

/** Selection change */
export interface GraphSelectEvent {
  /** Ids of the selected nodes */
  ids: string[];
}

/** A tree node was collapsed or expanded */
export interface GraphToggleEvent {
  /** Node id */
  id: string;
  /** New state */
  collapsed: boolean;
}

/** The legend showed / hid a group */
export interface GraphGroupToggleEvent {
  /** Group id */
  group: string;
  /** New state */
  hidden: boolean;
}

/** The layout finished (the force simulation cooled down) */
export interface GraphLayoutEndEvent {
  /** Layout type */
  layout: GraphLayoutType;
}

/** Events of a graph chart instance */
export interface GraphChartEventMap {
  hover: GraphHoverEvent | null;
  click: GraphHoverEvent;
  select: GraphSelectEvent;
  toggle: GraphToggleEvent;
  groupToggle: GraphGroupToggleEvent;
  layoutEnd: GraphLayoutEndEvent;
  renderer: ChartRendererKind;
}

/** Position of a node in layout units */
export interface GraphPoint {
  x: number;
  y: number;
}

/** Chart created by `createGraphChart` */
export interface GraphChartInstance {
  /** Replaces the options (positions of the remaining nodes are kept and animated) */
  setOptions(options: GraphChartOptions): void;
  /** Replaces the nodes, edges and groups */
  setData(data: GraphData): void;
  /** Fits the visible nodes in the view (animated by default) */
  fit(animate?: boolean): void;
  /** Centers a node (and zooms to `zoom` when given); expands its collapsed ancestors */
  focusNode(id: string, options?: { zoom?: number; animate?: boolean }): void;
  /** Selects nodes (`null` / `[]` clears the selection) */
  select(ids: readonly string[] | string | null): void;
  /** Ids of the selected nodes */
  getSelection(): string[];
  /** Expands a node (all nodes without an id) */
  expand(id?: string): void;
  /** Collapses a node (all nodes with children without an id) */
  collapse(id?: string): void;
  /** Collapses an expanded node, expands a collapsed one */
  toggle(id: string): void;
  /** Current positions of the nodes in layout units */
  getPositions(): Record<string, GraphPoint>;
  /** Computes the layout again (restarts the force simulation) */
  relayout(): void;
  /** Measures the container again (a ResizeObserver does it automatically) */
  resize(): void;
  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null;
  /** Resolves with the backend once the first frame can be drawn (`null` without canvas support) */
  ready: Promise<ChartRendererKind | null>;
  /** Reads the CSS variables again (theme changes on `<html>` / `<body>` are detected automatically) */
  refreshTheme(): void;
  /** Subscribes to an event; returns the unsubscribe function */
  on<K extends keyof GraphChartEventMap>(
    type: K,
    listener: (event: GraphChartEventMap[K]) => void,
  ): () => void;
  /** Removes the DOM, stops the simulation and frees the GPU resources */
  destroy(): void;
}

// ------------------------------------------------------- pure layouts

/** Result of the pure layout functions: positions aligned with the input nodes */
export interface GraphLayoutResult {
  /** X of the node centers (index = node index) */
  x: Float64Array;
  /** Y of the node centers */
  y: Float64Array;
}

/** Options of `forceLayout` / `createForceSimulation` */
export interface GraphForceLayoutOptions extends GraphForceOptions {
  /** Radius of each node (collisions); 6 when omitted */
  radius?: (node: GraphNode, index: number) => number;
}

/** A force simulation stepped by the caller */
export interface GraphForceSimulation {
  /** Positions (updated in place) */
  readonly x: Float64Array;
  readonly y: Float64Array;
  /** Runs `count` ticks (1 by default); returns whether the simulation is still hot */
  tick(count?: number): boolean;
  /** Current alpha (temperature) */
  alpha(): number;
  /** Restarts the cooling from `alpha` (0.3 by default) */
  reheat(alpha?: number): void;
  /** Pins a node at a position (dragging) and keeps the simulation warm */
  drag(index: number, x: number, y: number): void;
  /** Releases a dragged node (`keep` leaves it pinned) */
  release(index: number, keep?: boolean): void;
  /** Whether the simulation has cooled down */
  done(): boolean;
  /** Pushes overlapping nodes apart (run after the last tick) */
  settle(): void;
}

/** Options of `dagLayout` */
export interface GraphDagLayoutOptions extends Omit<
  GraphDagOptions,
  "criticalPath" | "criticalColor"
> {
  /** @default "TB" */
  direction?: GraphDirection;
  /** Width and height of each node in layout units; 24 × 24 when omitted */
  size?: (node: GraphNode, index: number) => readonly [number, number];
}

/** Result of `dagLayout` */
export interface GraphDagLayoutResult extends GraphLayoutResult {
  /** Layer of each node (0 = first) */
  layer: Int32Array;
  /** Node indices of each layer, in drawing order (dummy nodes of long edges are negative: `-1 - dummy`) */
  order: number[][];
  /** Waypoints of each edge, `[x0, y0, x1, y1, …]` from the source to the target boundary (empty for ignored edges) */
  routes: number[][];
  /** Edges reversed to break cycles (indices) */
  reversed: number[];
  /** Edge crossings before / after the crossing reduction */
  crossings: { initial: number; final: number };
}

/** Options of `treeLayout` */
export interface GraphTreeLayoutOptions extends Omit<
  GraphTreeOptions,
  "collapsible"
> {
  /**
   * Kind of tree
   * @default "tree"
   */
  type?: "tree" | "radial" | "mindmap" | "org";
  /** Direction of `tree` @default "LR" */
  direction?: GraphDirection;
  /** Width and height of each node in layout units */
  size?: (node: GraphNode, index: number) => readonly [number, number];
  /** Indices of the collapsed nodes (their descendants are hidden) */
  collapsed?: ReadonlySet<number>;
}

/** Result of `treeLayout` */
export interface GraphTreeLayoutResult extends GraphLayoutResult {
  /** Parent index of each node (-1 for roots) */
  parent: Int32Array;
  /** Depth of each node (0 = root) */
  depth: Int32Array;
  /** 1 when the node is shown (not below a collapsed node) */
  visible: Uint8Array;
  /** Mind map: -1 on the left side, 1 on the right side; radial: angle in radians */
  side: Float64Array;
  /** Children of each node, in order */
  children: number[][];
  /** 1 when the node is a card of a compact column under its parent (org charts) */
  stacked: Uint8Array;
}

/** Options of `circularLayout` / `arcLayout` */
export interface GraphCircularLayoutOptions extends GraphCircularOptions {
  /** Space taken by each node along the circle / line, in layout units @default 18 */
  spacing?: number;
}

/** Result of `circularLayout` / `arcLayout` */
export interface GraphCircularLayoutResult extends GraphLayoutResult {
  /** Angle of each node in radians (circular), 0 for arcs */
  angle: Float64Array;
  /** Node indices in placement order */
  order: number[];
  /** Radius of the circle (circular), 0 for arcs */
  radius: number;
}

/** Longest path of a DAG weighted by the node values (durations, 1 when omitted) */
export interface GraphCriticalPath {
  /** Node ids from the start to the end of the path */
  nodes: string[];
  /** Indices of the edges of the path */
  edges: number[];
  /** Sum of the node values along the path */
  length: number;
}
