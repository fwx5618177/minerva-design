// createGraphChart: relationship networks, dependency DAGs and trees. Nodes
// and edges are drawn by a GPU backend (WebGPU -> WebGL2 -> WebGL) or by
// Canvas2D through the shared renderer contract (edges = polylines, nodes =
// discs and rounded boxes); labels, badges and the focus ring are a 2D
// canvas above them. Layouts: force (Barnes–Hut, optional worker), layered
// DAG, tidy / radial / mind map / org trees, circular and arc diagrams.

import {
  luminance,
  mix,
  packColor,
  parseColor,
  toCss,
  type Rgba,
} from "../color";
import { resolveLocale, watchLocale } from "../locale";
import { createRenderer } from "../renderers/detect";
import { followDefaultRenderer } from "../renderers/follow";
import {
  AREA_STRIDE,
  BAR_STRIDE,
  GAP,
  SCATTER_STRIDE,
  type AreaItem,
  type BarItem,
  type ChartRenderer,
  type LineItem,
  type RenderItem,
  type ScatterItem,
} from "../renderers/types";
import {
  readTheme,
  themeColorsChanged,
  watchTheme,
  type ChartTheme,
} from "../theme";
import type { ChartRendererKind } from "../types";
import { arcPositions, circularPositions } from "./circular";
import { layeredLayout, longestPath } from "./dag";
import { createGraphDom, sizeCanvas, style, swatch } from "./dom";
import { forceInit, forceKernel } from "./force";
import {
  arcPath,
  arrowHead,
  boundaryDistance,
  cubicPoints,
  dashPath,
  distanceToPath,
  endDirection,
  filledArrow,
  loopPath,
  orthogonalPath,
  pathLength,
  pointAt,
  quadraticPath,
  roundCorners,
  splinePath,
  trimPath,
} from "./geometry";
import { fill, graphLocale, type GraphLocale } from "./labels";
import { buildModel, lineage, neighborhood, type GraphModel } from "./model";
import {
  LABEL_FONT_SIZE,
  NodeKind,
  computeSizing,
  labelOf,
  type NodeSizing,
} from "./sizing";
import { TREE_LEVEL_GAP, tidyTreeLayout, type TreeType } from "./tree";
import type {
  GraphCircularLayoutResult,
  GraphDagLayoutResult,
  GraphChartEventMap,
  GraphChartInstance,
  GraphChartOptions,
  GraphDirection,
  GraphEdgeStyle,
  GraphHoverEvent,
  GraphInteractionOptions,
  GraphLayoutType,
  GraphPoint,
  GraphTreeLayoutResult,
} from "./types";
import {
  WORKER_THRESHOLD,
  createForceRunner,
  type ForceRunner,
} from "./worker";

const LAYOUTS: readonly GraphLayoutType[] = [
  "force",
  "dag",
  "tree",
  "radial",
  "mindmap",
  "org",
  "circular",
  "arc",
  "none",
];

const TREE_TYPES = new Set<GraphLayoutType>([
  "tree",
  "radial",
  "mindmap",
  "org",
]);

/** Node halos are skipped above this number of nodes */
const HALO_LIMIT = 5000;
/** Sideways bow of parallel edges per slot, relative to their length */
const PARALLEL_BOW = 0.4;
/** Edge picking uses a spatial index from this number of edges */
const EDGE_INDEX_MIN = 2000;
const TWEEN_MS = 450;
const VIEW_TWEEN_MS = 320;
/** Smallest font (px) of the text inside boxes when zoomed out */
const BOX_FONT_MIN = 9;
const KEY_ZOOM = 1.25;
const BUTTON_ZOOM = 1.4;

const wheelFactor = (deltaY: number, deltaMode: number, pinch: boolean) => {
  const pixels =
    deltaMode === 1 ? deltaY * 16 : deltaMode === 2 ? deltaY * 400 : deltaY;
  const speed = pinch ? 0.01 : 0.0025;
  return Math.exp(Math.max(-1, Math.min(1, pixels * speed)));
};

const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Grows a Float32Array of interleaved points */
const pointBuffer = () => {
  let data = new Float32Array(1024);
  let length = 0;
  const ensure = (extra: number) => {
    if (length + extra <= data.length) return;
    const next = new Float32Array(Math.max(data.length * 2, length + extra));
    next.set(data.subarray(0, length));
    data = next;
  };
  return {
    push(x: number, y: number) {
      ensure(2);
      data[length++] = x;
      data[length++] = y;
    },
    pushAll(points: readonly number[]) {
      ensure(points.length);
      for (let i = 0; i < points.length; i++) data[length++] = points[i];
    },
    count: () => length / 2,
    points: () => data.subarray(0, length),
  };
};

type PointBuffer = ReturnType<typeof pointBuffer>;

interface Hit {
  type: "node" | "edge";
  index: number;
}

interface Snapshot {
  x: number;
  y: number;
  visible: boolean;
}

export const resolveLayout = (
  layout: GraphLayoutType | undefined,
): GraphLayoutType => (layout && LAYOUTS.includes(layout) ? layout : "force");

const layoutSignature = (o: GraphChartOptions): string =>
  JSON.stringify([
    resolveLayout(o.layout),
    o.direction ?? "",
    o.force ?? null,
    o.dag
      ? { ...o.dag, criticalPath: undefined, criticalColor: undefined }
      : null,
    o.tree ?? null,
    o.circular ?? null,
    o.nodeSize ?? null,
    o.nodeShape ?? null,
    o.nodeLabels === false,
  ]);

export const createGraphChart = (
  container: HTMLElement,
  initialOptions: GraphChartOptions,
): GraphChartInstance => {
  const doc = container.ownerDocument;
  const win = doc.defaultView;
  const dom = createGraphDom(container);
  const stage = dom.stage;
  let options = initialOptions;
  let theme: ChartTheme = readTheme(dom.root, options.palette);
  let dark = isDark(theme);
  let loc: GraphLocale = graphLocale(options.locale, options.labels);
  let destroyed = false;

  const listeners = new Map<
    keyof GraphChartEventMap,
    Set<(e: never) => void>
  >();
  const emit = <K extends keyof GraphChartEventMap>(
    type: K,
    event: GraphChartEventMap[K],
  ) => {
    listeners
      .get(type)
      ?.forEach((fn) => (fn as (e: GraphChartEventMap[K]) => void)(event));
  };
  const listening = (type: keyof GraphChartEventMap) =>
    !!listeners.get(type)?.size;

  const reducedMotion =
    typeof win?.matchMedia === "function"
      ? win.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
  const now = () => win?.performance?.now() ?? Date.now();

  // --------------------------------------------------------------- state

  let model: GraphModel = buildModel(
    options.nodes ?? [],
    options.edges ?? [],
    options.groups,
  );
  let layoutType: GraphLayoutType = resolveLayout(options.layout);
  let direction: GraphDirection = "TB";
  let layoutSig = layoutSignature(options);
  let sizing: NodeSizing;
  let X: Float64Array = new Float64Array(0);
  let Y: Float64Array = new Float64Array(0);
  let TX: Float64Array = new Float64Array(0);
  let TY: Float64Array = new Float64Array(0);
  let FX: Float64Array = new Float64Array(0);
  let FY: Float64Array = new Float64Array(0);
  let visible = new Uint8Array(0);
  let prevVisible: Uint8Array | null = null;
  let tween: { start: number; duration: number } | null = null;
  let tweenT = 1;
  let tree: GraphTreeLayoutResult | null = null;
  let dag: GraphDagLayoutResult | null = null;
  let circ: GraphCircularLayoutResult | null = null;
  let runner: ForceRunner | null = null;
  let forcePending = false;
  const collapsedIds = new Set<string>();
  const hiddenGroups = new Set<string>();
  let critical: { nodes: Uint8Array; edges: Uint8Array } | null = null;
  let descendants = new Int32Array(0);
  let paths: (number[] | null)[] = [];
  let pathsDirty = true;
  /** Changes with the edge geometry (see the edge index) */
  let geometryVersion = 0;
  let sceneDirty = true;
  let items: RenderItem[] = [];
  let version = 0;

  // colors
  let nodeColor: Rgba[] = [];
  let edgeColor: Rgba[] = [];
  let edgeWidth = new Float64Array(0);
  let edgeArrow = new Uint8Array(0);
  let edgeDashed = new Uint8Array(0);
  let groupColor: Rgba[] = [];
  let criticalColor: Rgba = [0.94, 0.27, 0.27, 1];
  let edgeLabelWidth = new Float64Array(0);

  // view: screen = world * k + t (CSS pixels)
  let k = 1;
  let tx = 0;
  let ty = 0;
  let viewTween: {
    from: [number, number, number];
    to: [number, number, number];
    start: number;
  } | null = null;
  let userMoved = false;
  let needsFit = true;
  /** The next fit animates (layout changes after the first frame) */
  let fitAnimate = false;
  let drawnOnce = false;
  /** The view follows the running force layout (unless the user moved it) */
  let followLayout = false;
  let width = 0;
  let height = 0;

  // interaction
  let hover: Hit | null = null;
  let focusIndex = -1;
  let focusVisible = false;
  const selection = new Set<number>();
  let highlight: { nodes: Uint8Array; edges: Uint8Array; accent: Rgba } | null =
    null;
  let highlightKey = "";

  let renderer: ChartRenderer | null = null;
  let rendererToken = 0;
  let resolveReady: (kind: ChartRendererKind | null) => void = () => {};
  const ready = new Promise<ChartRendererKind | null>((resolve) => {
    resolveReady = resolve;
  });
  let frameId = 0;

  // ------------------------------------------------------------ options

  const interaction = (): Required<GraphInteractionOptions> | null => {
    const o = options.interaction;
    if (o === false) return null;
    const c = typeof o === "object" ? o : {};
    return {
      pan: c.pan ?? true,
      zoom: c.zoom ?? true,
      wheel: c.wheel ?? "modifier",
      drag:
        c.drag ??
        (layoutType === "force" ||
          layoutType === "none" ||
          layoutType === "circular"),
      select: c.select ?? true,
      keyboard: c.keyboard ?? true,
      zoomRange: c.zoomRange ?? [0.02, 8],
    };
  };

  const isTree = () => TREE_TYPES.has(layoutType);
  const collapsible = () => isTree() && options.tree?.collapsible !== false;
  const animationMs = () => {
    const a = options.animation;
    if (a === false || reducedMotion?.matches) return 0;
    return typeof a === "number" && a >= 0 ? a : TWEEN_MS;
  };
  const highlightMode = () =>
    options.highlight ?? (layoutType === "dag" ? "lineage" : "neighbors");

  const edgeStyle = (): GraphEdgeStyle => {
    const s = options.edgeStyle;
    const flow = layoutType === "dag" || isTree();
    if (s === "straight" || s === "curve") return s;
    if ((s === "spline" || s === "orthogonal") && flow) return s;
    if (s) return "curve";
    switch (layoutType) {
      case "dag":
      case "tree":
      case "radial":
      case "mindmap":
        return "spline";
      case "org":
        return "orthogonal";
      case "circular":
      case "arc":
        return "curve";
      default:
        return "straight";
    }
  };

  const resolveColor = (value: string, fallback: Rgba): Rgba => {
    const c = theme.resolve
      ? theme.resolve(value, fallback)
      : (parseColor(value) ?? fallback);
    return c[3] < 1 ? mix(theme.background, [c[0], c[1], c[2], 1], c[3]) : c;
  };

  // ----------------------------------------------------------- measure

  const measureCtx = dom.foreground.getContext("2d");
  const measure = (text: string, font: string) => {
    if (!measureCtx) return text.length * 7;
    measureCtx.font = font;
    return measureCtx.measureText(text).width;
  };

  // ------------------------------------------------------------- layout

  const snapshot = (): Map<string, Snapshot> => {
    const map = new Map<string, Snapshot>();
    if (X.length !== model.n) return map;
    for (let i = 0; i < model.n; i++) {
      if (!Number.isFinite(X[i])) continue;
      map.set(model.nodes[i].id, {
        x: X[i],
        y: Y[i],
        visible: !!visible[i] && !forcePending,
      });
    }
    return map;
  };

  const stopRunner = () => {
    runner?.destroy();
    runner = null;
    forcePending = false;
  };

  const collapsedSet = () => {
    const set = new Set<number>();
    for (const id of collapsedIds) {
      const i = model.index.get(id);
      if (i !== undefined) set.add(i);
    }
    return set;
  };

  const treeInput = (
    type: TreeType,
    w: ArrayLike<number>,
    h: ArrayLike<number>,
    levelGap: number,
  ) => {
    const t = options.tree ?? {};
    return {
      n: model.n,
      source: model.source,
      target: model.target,
      width: w,
      height: h,
      type,
      direction,
      root: t.root !== undefined ? (model.index.get(t.root) ?? -1) : -1,
      levelGap,
      siblingGap:
        t.siblingGap ?? (type === "org" ? 20 : type === "mindmap" ? 10 : 12),
      collapsed: collapsedSet(),
      compact: t.compact,
    };
  };

  const startForce = (prev: Map<string, Snapshot>, follow = true) => {
    followLayout = follow;
    const n = model.n;
    const x = new Float64Array(n).fill(NaN);
    const y = new Float64Array(n).fill(NaN);
    const fixed = new Uint8Array(n);
    let known = 0;
    for (let i = 0; i < n; i++) {
      const node = model.nodes[i];
      const p = prev.get(node.id);
      if (p) {
        x[i] = p.x;
        y[i] = p.y;
        known++;
      } else if (Number.isFinite(node.x) && Number.isFinite(node.y)) {
        x[i] = node.x!;
        y[i] = node.y!;
        known++;
      }
      if (node.fixed && Number.isFinite(node.x) && Number.isFinite(node.y)) {
        x[i] = node.x!;
        y[i] = node.y!;
        fixed[i] = 1;
      }
    }
    // new nodes start next to a known neighbor
    if (known && known < n) {
      for (let i = 0; i < n; i++) {
        if (Number.isFinite(x[i])) continue;
        for (let a = model.adjStart[i]; a < model.adjStart[i + 1]; a++) {
          const e = model.adjEdge[a];
          const j = model.source[e] === i ? model.target[e] : model.source[e];
          if (Number.isFinite(x[j])) {
            x[i] = x[j] + ((i * 7919) % 17) - 8;
            y[i] = y[j] + ((i * 104729) % 17) - 8;
            break;
          }
        }
      }
    }
    const radius = new Float64Array(n);
    for (let i = 0; i < n; i++)
      radius[i] = Math.max(sizing.width[i], sizing.height[i]) / 2;
    const range = model.edgeValueRange;
    const weight = new Float64Array(model.m).fill(1);
    if (range) {
      const mean = (range[0] + range[1]) / 2 || 1;
      model.edges.forEach((edge, e) => {
        const v = edge.value;
        if (Number.isFinite(v) && v! > 0)
          weight[e] = Math.max(0.5, Math.min(2, Math.sqrt(v! / mean)));
      });
    }
    const alpha = known === 0 ? 1 : known === n ? 0.3 : 0.6;
    const sw = stage.clientWidth;
    const sh = stage.clientHeight;
    const init = forceInit(n, model.source, model.target, options.force, {
      x,
      y,
      radius,
      fixed,
      weight,
      alpha,
      aspect: sw > 0 && sh > 0 ? sw / sh : 1,
    });
    const f = options.force ?? {};
    const animate = f.animate !== false;
    const workerOption = f.worker ?? "auto";
    const useWorker =
      workerOption === true ||
      (workerOption === "auto" && n >= WORKER_THRESHOLD);
    X = x;
    Y = y;
    TX = x;
    TY = y;
    if (!animate && !useWorker) {
      const sim = forceKernel()(init);
      while (sim.tick(50));
      sim.settle();
      emitLayoutEnd();
      return;
    }
    forcePending = !animate;
    runner = createForceRunner(init, {
      worker: useWorker,
      stream: animate,
      now,
      onTick: () => {
        pathsDirty = true;
        invalidate();
      },
      onEnd: () => {
        const wasPending = forcePending;
        forcePending = false;
        pathsDirty = true;
        if (!userMoved && followLayout) {
          needsFit = true;
          // nothing was shown yet: appear fitted, otherwise glide to the fit
          fitAnimate = !wasPending;
        }
        followLayout = false;
        emitLayoutEnd();
        invalidate();
      },
    });
  };

  const emitLayoutEnd = () => {
    // after the current call stack (listeners may call the instance)
    void Promise.resolve().then(() => {
      if (!destroyed) emit("layoutEnd", { layout: layoutType });
    });
  };

  const runLayout = (prev: Map<string, Snapshot>, animate: boolean) => {
    stopRunner();
    const previousType = layoutType;
    layoutType = resolveLayout(options.layout);
    direction = options.direction ?? (layoutType === "tree" ? "LR" : "TB");
    if (previousType !== layoutType) needsFit = true;
    const n = model.n;
    tree = null;
    dag = null;
    circ = null;

    let depth: Int32Array | null = null;
    if (layoutType === "mindmap") {
      const ones = new Float64Array(n).fill(1);
      depth = tidyTreeLayout(treeInput("mindmap", ones, ones, 1)).depth;
    }
    sizing = computeSizing(
      model,
      layoutType,
      options,
      depth,
      measure,
      theme.fontFamily,
    );
    const nextVisible = new Uint8Array(n).fill(1);
    let tx2: Float64Array = new Float64Array(n);
    let ty2: Float64Array = new Float64Array(n);

    switch (layoutType) {
      case "dag": {
        const d = options.dag ?? {};
        dag = layeredLayout({
          n,
          source: model.source,
          target: model.target,
          width: sizing.width,
          height: sizing.height,
          direction,
          layerGap: d.layerGap ?? 56,
          nodeGap: d.nodeGap ?? 24,
          sweeps: d.sweeps ?? 8,
        });
        tx2 = dag.x;
        ty2 = dag.y;
        break;
      }
      case "tree":
      case "radial":
      case "mindmap":
      case "org": {
        const type = layoutType as TreeType;
        const levelGap =
          options.tree?.levelGap ??
          Math.max(TREE_LEVEL_GAP[type], sizing.levelGap);
        tree = tidyTreeLayout(
          treeInput(type, sizing.layoutWidth, sizing.layoutHeight, levelGap),
        );
        tx2 = tree.x;
        ty2 = tree.y;
        nextVisible.set(tree.visible);
        break;
      }
      case "circular":
      case "arc": {
        let spacing = 0;
        for (let i = 0; i < n; i++)
          spacing = Math.max(
            spacing,
            sizing.layoutWidth[i] + (layoutType === "arc" ? 8 : 10),
          );
        const input = {
          n,
          source: model.source,
          target: model.target,
          group: model.groupOf,
          order: options.circular?.order ?? "group",
          spacing: Math.max(layoutType === "arc" ? 16 : 18, spacing),
        };
        circ =
          layoutType === "arc" ? arcPositions(input) : circularPositions(input);
        tx2 = circ.x;
        ty2 = circ.y;
        break;
      }
      case "none": {
        model.nodes.forEach((node, i) => {
          const p = prev.get(node.id);
          tx2[i] = Number.isFinite(node.x) ? node.x! : (p?.x ?? 0);
          ty2[i] = Number.isFinite(node.y) ? node.y! : (p?.y ?? 0);
        });
        break;
      }
      default:
        break;
    }

    const oldVisible = new Uint8Array(n);
    for (let i = 0; i < n; i++)
      oldVisible[i] = prev.get(model.nodes[i].id)?.visible ? 1 : 0;
    visible = nextVisible;
    descendants = countDescendants();

    if (layoutType === "force") {
      startForce(prev);
      tween = null;
      prevVisible = null;
    } else {
      TX = tx2;
      TY = ty2;
      X = new Float64Array(n);
      Y = new Float64Array(n);
      const ms = animate && prev.size ? animationMs() : 0;
      if (ms > 0) {
        FX = new Float64Array(n);
        FY = new Float64Array(n);
        for (let i = 0; i < n; i++) {
          const p = prev.get(model.nodes[i].id);
          if (p && p.visible) {
            FX[i] = p.x;
            FY[i] = p.y;
            continue;
          }
          // entering nodes grow out of their closest previously shown ancestor
          let a = tree ? tree.parent[i] : -1;
          let from: Snapshot | undefined;
          while (a >= 0 && !(from = prev.get(model.nodes[a].id))?.visible)
            a = tree!.parent[a];
          FX[i] = from?.visible ? from.x : TX[i];
          FY[i] = from?.visible ? from.y : TY[i];
        }
        X.set(FX);
        Y.set(FY);
        prevVisible = oldVisible;
        tween = { start: now(), duration: ms };
        tweenT = 0;
      } else {
        X.set(TX);
        Y.set(TY);
        tween = null;
        prevVisible = null;
      }
    }
    if (!userMoved) {
      needsFit = true;
      fitAnimate = prev.size > 0 && animate && layoutType !== "force";
    }
    refreshCritical();
    refreshColors();
    edgeLabelWidth = new Float64Array(model.m).fill(NaN);
    edgeGrid = null;
    pathsDirty = true;
    sceneDirty = true;
    highlightKey = "";
    updateAccessibility();
    renderLegend();
    invalidate();
    if (layoutType !== "force") emitLayoutEnd();
  };

  const countDescendants = () => {
    const counts = new Int32Array(model.n);
    if (!tree) return counts;
    const order: number[] = [];
    tree.parent.forEach((p, i) => {
      if (p < 0) order.push(i);
    });
    for (let q = 0; q < order.length; q++)
      order.push(...tree.children[order[q]]);
    for (let q = order.length - 1; q >= 0; q--) {
      const v = order[q];
      const p = tree.parent[v];
      if (p >= 0) counts[p] += counts[v] + 1;
    }
    return counts;
  };

  const refreshCritical = () => {
    critical = null;
    const option = options.dag?.criticalPath;
    if (!option || layoutType !== "dag") return;
    const nodes = new Uint8Array(model.n);
    const edges = new Uint8Array(model.m);
    if (option === true) {
      const path = longestPath(model.n, model.source, model.target, (i) => {
        const v = model.nodes[i].value;
        return Number.isFinite(v) && v! >= 0 ? v! : 1;
      });
      path.nodes.forEach((i) => (nodes[i] = 1));
      path.edges.forEach((e) => (edges[e] = 1));
    } else {
      const ids = option.map((id) => model.index.get(id) ?? -1);
      ids.forEach((i) => {
        if (i >= 0) nodes[i] = 1;
      });
      for (let e = 0; e < model.m; e++) {
        const s = ids.indexOf(model.source[e]);
        if (s >= 0 && ids[s + 1] === model.target[e]) edges[e] = 1;
      }
    }
    critical = { nodes, edges };
  };

  // ------------------------------------------------------------- colors

  const refreshColors = () => {
    const bg = theme.background;
    dark = isDark(theme);
    const palette = theme.palette.length ? theme.palette : [theme.primary];
    groupColor = model.groups.map((g, i) =>
      g.color
        ? resolveColor(g.color, palette[i % palette.length])
        : palette[i % palette.length],
    );
    criticalColor = resolveColor(
      options.dag?.criticalColor ?? "var(--danger-color, #ef4444)",
      [0.94, 0.27, 0.27, 1],
    );
    // mind maps color each branch
    const branch = new Int32Array(model.n).fill(-1);
    if (layoutType === "mindmap" && tree) {
      const roots: number[] = [];
      tree.parent.forEach((p, i) => p < 0 && roots.push(i));
      const firstLevel = roots.length
        ? [...tree.children[roots[0]], ...roots.slice(1)]
        : [];
      firstLevel.forEach((c, b) => {
        const stack = [c];
        while (stack.length) {
          const v = stack.pop()!;
          branch[v] = b;
          stack.push(...tree!.children[v]);
        }
      });
    }
    nodeColor = model.nodes.map((node, i) => {
      if (node.color) return resolveColor(node.color, theme.primary);
      const g = model.groupOf[i];
      if (g >= 0) return groupColor[g];
      if (branch[i] >= 0) return palette[(branch[i] + 1) % palette.length];
      return theme.primary;
    });
    const neutral = mix(bg, theme.textMuted, dark ? 0.42 : 0.36);
    const mode = options.edgeColor ?? "neutral";
    const wOption = options.edgeWidth;
    const eRange = model.edgeValueRange;
    const [wMin, wMax] = Array.isArray(wOption)
      ? (wOption as readonly [number, number])
      : typeof wOption === "number"
        ? [wOption, wOption]
        : eRange && eRange[1] > eRange[0]
          ? [1, 5]
          : [1.25, 1.25];
    edgeColor = [];
    edgeWidth = new Float64Array(model.m);
    edgeArrow = new Uint8Array(model.m);
    edgeDashed = new Uint8Array(model.m);
    const arrows = options.arrows ?? layoutType === "dag";
    model.edges.forEach((edge, e) => {
      const s = model.source[e];
      const t = model.target[e];
      let c = neutral;
      if (edge.color) c = resolveColor(edge.color, neutral);
      else if (mode === "source") c = mix(bg, nodeColor[s], 0.55);
      else if (mode === "target") c = mix(bg, nodeColor[t], 0.55);
      else if (layoutType === "mindmap") c = mix(bg, nodeColor[t], 0.7);
      edgeColor.push(c);
      let w = wMin;
      if (Number.isFinite(edge.width) && edge.width! > 0) w = edge.width!;
      else if (eRange && eRange[1] > eRange[0] && Number.isFinite(edge.value))
        w =
          wMin +
          (wMax - wMin) *
            Math.sqrt((edge.value! - eRange[0]) / (eRange[1] - eRange[0]));
      else if (layoutType === "mindmap" && tree && wOption === undefined)
        w = Math.max(1.25, 3.4 - tree.depth[t] * 0.75);
      edgeWidth[e] = w;
      edgeArrow[e] = (edge.directed ?? arrows) ? 1 : 0;
      edgeDashed[e] = edge.dashed ? 1 : 0;
    });
    sceneDirty = true;
  };

  // --------------------------------------------------------------- paths

  const fade = (i: number): number => {
    if (forcePending) return 0;
    const g = model.groupOf[i];
    if (g >= 0 && hiddenGroups.has(model.groups[g].id)) return 0;
    const v = visible[i];
    const p = prevVisible ? prevVisible[i] : v;
    if (tween) {
      if (v && p) return 1;
      if (v) return tweenT;
      if (p) return 1 - tweenT;
      return 0;
    }
    return v;
  };

  const isBox = (i: number) => sizing.kind[i] !== NodeKind.Circle;

  /** Port of a node on the flow axis (sign +1 = outgoing side) */
  const port = (
    i: number,
    vertical: boolean,
    sign: number,
  ): [number, number] =>
    vertical
      ? [X[i], Y[i] + (sign * sizing.height[i]) / 2]
      : [X[i] + (sign * sizing.width[i]) / 2, Y[i]];

  const flow = (): { vertical: boolean; sign: number } => {
    const d = layoutType === "org" ? "TB" : direction;
    return {
      vertical: layoutType !== "mindmap" && (d === "TB" || d === "BT"),
      sign: d === "BT" || d === "RL" ? -1 : 1,
    };
  };

  const trimmed = (
    points: number[],
    s: number,
    t: number,
    arrow: boolean,
  ): number[] => {
    if (points.length < 4) return points;
    const [ux, uy] = [points[2] - points[0], points[3] - points[1]];
    const l0 = Math.hypot(ux, uy) || 1;
    const [ex, ey] = endDirection(points);
    const a = boundaryDistance(
      isBox(s),
      sizing.width[s],
      sizing.height[s],
      ux / l0,
      uy / l0,
    );
    const b =
      boundaryDistance(isBox(t), sizing.width[t], sizing.height[t], ex, ey) +
      (arrow ? 1 : 0);
    return trimPath(points, a, b);
  };

  /** Direction of the self-loops of a node: the middle of its widest free angle */
  const loopAngle = (i: number): number => {
    const angles: number[] = [];
    // the label of a circle sits below it: keep that side free too
    if (sizing.kind[i] === NodeKind.Circle && options.nodeLabels !== false)
      angles.push(Math.PI / 2);
    for (let a = model.adjStart[i]; a < model.adjStart[i + 1]; a++) {
      const e = model.adjEdge[a];
      const j = model.source[e] === i ? model.target[e] : model.source[e];
      if (j === i || fade(j) <= 0) continue;
      const dx = X[j] - X[i];
      const dy = Y[j] - Y[i];
      if (dx * dx + dy * dy > 1e-12) angles.push(Math.atan2(dy, dx));
    }
    if (!angles.length) return -Math.PI / 2;
    angles.sort((a, b) => a - b);
    const end = angles[angles.length - 1];
    let best = angles[0] + Math.PI * 2 - end;
    let angle = end + best / 2;
    for (let k = 1; k < angles.length; k++) {
      const gap = angles[k] - angles[k - 1];
      if (gap > best + 1e-9) {
        best = gap;
        angle = angles[k - 1] + gap / 2;
      }
    }
    return angle;
  };

  /** Reach of the self-loops of a node beyond its boundary */
  const loopSize = (i: number) =>
    Math.max(
      12,
      Math.min(40, Math.min(sizing.width[i], sizing.height[i]) * 0.9),
    );

  /** Self-loop of an edge whose ends are the same node */
  const loopOf = (e: number): number[] => {
    const i = model.source[e];
    const angle = loopAngle(i);
    const w = sizing.width[i];
    const h = sizing.height[i];
    const box = isBox(i);
    const at = (a: number) =>
      boundaryDistance(box, w, h, Math.cos(a), Math.sin(a));
    return loopPath(
      X[i],
      Y[i],
      angle,
      at(angle - 0.42),
      at(angle + 0.42) + (edgeArrow[e] ? 1 : 0),
      loopSize(i) * (1 + 0.6 * model.bend[e]),
    );
  };

  /** Polyline of a curved edge (straight edges are built on the fly) */
  const edgePath = (e: number, style: GraphEdgeStyle): number[] | null => {
    const s = model.source[e];
    const t = model.target[e];
    const arrow = !!edgeArrow[e];
    if (s === t) return loopOf(e);
    // parallel edges: their own offsets (NaN: a single edge)
    const bend = model.bend[e];
    const parallel = Number.isFinite(bend);
    if (layoutType === "arc") {
      // higher and lower arcs, by slot from the lower to the higher index
      const rise = parallel ? 1 + 0.25 * (s < t ? bend : -bend) : 1;
      return trimmed(arcPath(X[s], X[t], Y[s], rise), s, t, arrow);
    }
    const dx = X[t] - X[s];
    const dy = Y[t] - Y[s];
    const bow = parallel ? bend * PARALLEL_BOW : 0;
    if (style === "straight") {
      if (!bow) return null;
      const mx = (X[s] + X[t]) / 2;
      const my = (Y[s] + Y[t]) / 2;
      return trimmed(
        quadraticPath(X[s], Y[s], mx - dy * bow, my + dx * bow, X[t], Y[t]),
        s,
        t,
        arrow,
      );
    }
    if (layoutType === "circular" && style === "curve") {
      const tension = Math.max(
        0,
        Math.min(1, options.circular?.tension ?? 0.8),
      );
      const cx = ((X[s] + X[t]) / 2) * (1 - tension) - dy * bow;
      const cy = ((Y[s] + Y[t]) / 2) * (1 - tension) + dx * bow;
      return trimmed(
        quadraticPath(X[s], Y[s], cx, cy, X[t], Y[t]),
        s,
        t,
        arrow,
      );
    }
    if (layoutType === "radial" && style === "spline") {
      const rs = Math.hypot(X[s], Y[s]);
      const rt = Math.hypot(X[t], Y[t]);
      const as = Math.atan2(Y[s], X[s]);
      const at = Math.atan2(Y[t], X[t]);
      const rm = (rs + rt) / 2;
      const out = [X[s], Y[s]];
      cubicPoints(
        out,
        X[s],
        Y[s],
        rs < 1e-6 ? X[s] : rm * Math.cos(as),
        rs < 1e-6 ? Y[s] : rm * Math.sin(as),
        rm * Math.cos(at),
        rm * Math.sin(at),
        X[t],
        Y[t],
      );
      return trimmed(out, s, t, arrow);
    }
    if (style === "spline" || style === "orthogonal") {
      const f = flow();
      let sign = f.sign;
      if (layoutType === "mindmap") sign = X[t] >= X[s] ? 1 : -1;
      const route = dag && !tween ? dag.routes[e] : null;
      let pts: number[];
      if (route && route.length >= 4) pts = route;
      else {
        const along = f.vertical ? Y[t] - Y[s] : X[t] - X[s];
        const dir =
          layoutType === "mindmap" ? sign : along * sign >= 0 ? sign : -sign;
        pts = [...port(s, f.vertical, dir), ...port(t, f.vertical, -dir)];
      }
      if (style === "orthogonal") {
        if (layoutType === "org" && tree?.stacked[t] && tree.parent[t] === s) {
          // compact column: down from the parent, along a bus on the left
          const bottom = Y[s] + sizing.height[s] / 2;
          const left = X[t] - sizing.width[t] / 2;
          const bus = left - 10;
          const mid = bottom + 14;
          return roundCorners(
            [X[s], bottom, X[s], mid, bus, mid, bus, Y[t], left, Y[t]],
            6,
          );
        }
        if (layoutType === "org" && pts.length === 4) {
          const mid = (pts[1] + pts[3]) / 2;
          return roundCorners(
            [pts[0], pts[1], pts[0], mid, pts[2], mid, pts[2], pts[3]],
            6,
          );
        }
        return orthogonalPath(pts, f.vertical, 8);
      }
      return splinePath(pts, f.vertical);
    }
    // curve
    const mx = (X[s] + X[t]) / 2;
    const my = (Y[s] + Y[t]) / 2;
    const c = parallel ? bow : 0.18;
    return trimmed(
      quadraticPath(X[s], Y[s], mx - dy * c, my + dx * c, X[t], Y[t]),
      s,
      t,
      arrow,
    );
  };

  const refreshPaths = () => {
    const style = edgeStyle();
    paths = new Array(model.m);
    for (let e = 0; e < model.m; e++) {
      paths[e] =
        fade(model.source[e]) > 0 && fade(model.target[e]) > 0
          ? edgePath(e, style)
          : null;
    }
    pathsDirty = false;
    geometryVersion++;
  };

  /** Ends of a straight edge, trimmed at the node boundaries */
  const straightEnds = (e: number): [number, number, number, number] | null => {
    const s = model.source[e];
    const t = model.target[e];
    const dx = X[t] - X[s];
    const dy = Y[t] - Y[s];
    const len = Math.hypot(dx, dy);
    if (len < 1e-9) return null;
    const ux = dx / len;
    const uy = dy / len;
    const a = boundaryDistance(
      isBox(s),
      sizing.width[s],
      sizing.height[s],
      ux,
      uy,
    );
    const b =
      boundaryDistance(isBox(t), sizing.width[t], sizing.height[t], ux, uy) +
      (edgeArrow[e] ? 1 : 0);
    if (a + b >= len) return null;
    return [X[s] + ux * a, Y[s] + uy * a, X[t] - ux * b, Y[t] - uy * b];
  };

  // ------------------------------------------------------------ highlight

  const updateHighlight = () => {
    const sources =
      hover?.type === "node"
        ? [hover.index]
        : focusIndex >= 0
          ? [focusIndex]
          : [...selection];
    const mode = highlightMode();
    const edgeHover = hover?.type === "edge" ? hover.index : -1;
    const key = `${mode}|${sources.join(",")}|${edgeHover}`;
    if (key === highlightKey) return;
    highlightKey = key;
    sceneDirty = true;
    if ((mode === "none" || !sources.length) && edgeHover < 0) {
      highlight = null;
      return;
    }
    const nodes = new Uint8Array(model.n);
    const edges = new Uint8Array(model.m);
    if (mode !== "none") {
      for (const s of sources) {
        if (mode === "lineage") lineage(model, s, nodes, edges);
        else neighborhood(model, s, nodes, edges);
      }
    }
    if (edgeHover >= 0) {
      edges[edgeHover] = 1;
      nodes[model.source[edgeHover]] = 1;
      nodes[model.target[edgeHover]] = 1;
    }
    const accent =
      mode === "lineage" || sources.length !== 1
        ? theme.primary
        : nodeColor[sources[0]];
    highlight = { nodes, edges, accent: accent ?? theme.primary };
  };

  // --------------------------------------------------------------- scene

  const buildScene = (): RenderItem[] => {
    version++;
    const bg = theme.background;
    const out: RenderItem[] = [];
    const style = edgeStyle();
    const minPx = model.n > 2000 ? 2 : 3;
    const hl = highlight;

    // ----- edges: three layers (dimmed, normal, highlighted)
    const layers = [
      new Map<string, { color: Rgba; width: number; buf: PointBuffer }>(),
      new Map(),
      new Map(),
    ] as Map<string, { color: Rgba; width: number; buf: PointBuffer }>[];
    const bucket = (layer: number, color: Rgba, w: number) => {
      const key = `${packColor(color)}|${Math.round(w * 4)}`;
      let b = layers[layer].get(key);
      if (!b) {
        b = { color, width: w, buf: pointBuffer() };
        layers[layer].set(key, b);
      }
      return b.buf;
    };
    const arrowLen = (w: number) => (6 + w * 1.6) / k;
    const filledLen = (w: number) => (8 + w * 2.2) / k;
    const filled = options.arrowStyle === "filled";
    // filled heads: flat area triangles per layer and color, outlined by a
    // thin line (anti-aliased edges on every backend)
    const heads = [new Map(), new Map(), new Map()] as Map<
      number,
      { color: Rgba; points: number[] }
    >[];
    const tmp: number[] = [];
    const head = (
      buf: PointBuffer,
      layer: number,
      color: Rgba,
      w: number,
      x: number,
      y: number,
      ux: number,
      uy: number,
    ) => {
      tmp.length = 0;
      if (!filled) {
        arrowHead(tmp, x, y, ux, uy, arrowLen(w), GAP);
        buf.pushAll(tmp);
        return;
      }
      const key = packColor(color);
      let h = heads[layer].get(key);
      if (!h) {
        h = { color, points: [] };
        heads[layer].set(key, h);
      }
      filledArrow(h.points, tmp, x, y, ux, uy, filledLen(w), GAP);
      bucket(layer, color, Math.min(w, 1)).pushAll(tmp);
    };
    for (let e = 0; e < model.m; e++) {
      const s = model.source[e];
      const t = model.target[e];
      const f = Math.min(fade(s), fade(t));
      if (f <= 0) continue;
      let color = edgeColor[e];
      let w = edgeWidth[e];
      let layer = 1;
      if (critical?.edges[e]) {
        color = criticalColor;
        w += 1;
      }
      if (hl) {
        if (hl.edges[e]) {
          layer = 2;
          if (!critical?.edges[e]) color = mix(bg, hl.accent, 0.9);
          w += 0.75;
        } else {
          layer = 0;
          color = mix(bg, color, 0.22);
        }
      }
      if (f < 1) color = mix(bg, color, f);
      const buf = bucket(layer, color, w);
      let points: number[] | null = paths[e] ?? null;
      if (!points) {
        if (style !== "straight" || layoutType === "arc") continue;
        const ends = straightEnds(e);
        if (!ends) continue;
        if (!edgeDashed[e] && !(filled && edgeArrow[e])) {
          buf.push(ends[0], ends[1]);
          buf.push(ends[2], ends[3]);
          buf.push(GAP, GAP);
          if (edgeArrow[e]) {
            const l = Math.hypot(ends[2] - ends[0], ends[3] - ends[1]) || 1;
            head(
              buf,
              layer,
              color,
              w,
              ends[2],
              ends[3],
              (ends[2] - ends[0]) / l,
              (ends[3] - ends[1]) / l,
            );
          }
          continue;
        }
        points = [ends[0], ends[1], ends[2], ends[3]];
      }
      if (points.length < 4) continue;
      let line = points;
      // a filled head covers the end: the line stops at its notch
      if (filled && edgeArrow[e])
        line = trimPath(points.slice(), 0, filledLen(w) * 0.72);
      if (edgeDashed[e]) buf.pushAll(dashPath(line, 5 / k, 4 / k, GAP));
      else {
        buf.pushAll(line);
        buf.push(GAP, GAP);
      }
      if (edgeArrow[e]) {
        const [ux, uy] = endDirection(points);
        head(
          buf,
          layer,
          color,
          w,
          points[points.length - 2],
          points[points.length - 1],
          ux,
          uy,
        );
      }
    }
    layers.forEach((map, layer) => {
      for (const [key, b] of map) {
        if (b.buf.count() < 2) continue;
        const item: LineItem = {
          kind: "line",
          key: `edges:${layer}:${key}`,
          version,
          color: b.color,
          points: b.buf.points(),
          count: b.buf.count(),
          width: b.width,
          sorted: false,
        };
        out.push(item);
      }
      for (const [key, h] of heads[layer]) {
        const item: AreaItem = {
          kind: "area",
          key: `heads:${layer}:${key}`,
          version,
          color: h.color,
          points: Float32Array.from(h.points),
          count: h.points.length / AREA_STRIDE,
          opacity: 1,
          sorted: false,
          flat: true,
        };
        out.push(item);
      }
    });

    // ----- nodes
    const nodeFill = (i: number, f: number): Rgba => {
      let c = nodeColor[i];
      if (hl && !hl.nodes[i]) c = mix(bg, c, 0.2);
      return f < 1 ? mix(bg, c, f) : c;
    };
    const halo: number[] = [];
    const fills: number[] = [];
    const rings: number[] = [];
    const collapsedFill: number[] = [];
    const selRings: number[] = [];
    const avatars: number[] = [];
    const boxBuckets = new Map<
      string,
      { half: number; inset: number; border: number[]; fill: number[] }
    >();
    const outlines = new Map<string, number[]>();
    const radiusPx =
      layoutType === "mindmap"
        ? 999
        : Math.max(
            1,
            Math.min(
              layoutType === "org" ? 10 : 8,
              (layoutType === "org" ? 10 : 7) * k,
            ),
          );
    const showHalo = model.n <= HALO_LIMIT;
    for (const i of drawOrder()) {
      const f = fade(i);
      if (f <= 0) continue;
      const x = X[i];
      const y = Y[i];
      const color = nodeFill(i, f);
      const selected = selection.has(i);
      const hovered = hover?.type === "node" && hover.index === i;
      if (sizing.kind[i] === NodeKind.Circle) {
        const d = Math.max(minPx, sizing.width[i] * k);
        if (showHalo) halo.push(x, y, d + 3, packColor(bg));
        const isCollapsed =
          collapsible() && tree && descendants[i] > 0 && !hasVisibleChild(i);
        if (isCollapsed) {
          collapsedFill.push(x, y, d, packColor(color));
        } else fills.push(x, y, d, packColor(color));
        if (selected) selRings.push(x, y, d + 7, packColor(theme.primary));
        else if (hovered)
          rings.push(x, y, d + 6, packColor(mix(bg, nodeColor[i], 0.7)));
        continue;
      }
      // boxes
      const w = sizing.width[i];
      const h = sizing.height[i];
      const solid = sizing.kind[i] === NodeKind.Solid;
      const crit = !!critical?.nodes[i];
      let border = solid ? color : mix(bg, color, crit ? 1 : dark ? 0.62 : 0.5);
      let body = solid ? color : mix(bg, color, dark ? 0.2 : 0.09);
      if (crit) border = mix(bg, criticalColor, f);
      if (hl && !hl.nodes[i]) {
        body = mix(bg, body, 0.5);
        if (!solid) border = mix(bg, border, 0.4);
      }
      const key = `${Math.round(w * 2) / 2}|${crit ? 2 : 1.25}`;
      let b = boxBuckets.get(key);
      if (!b) {
        b = { half: w / 2, inset: crit ? 2 : 1.25, border: [], fill: [] };
        boxBuckets.set(key, b);
      }
      b.border.push(x, y - h / 2, y + h / 2, packColor(border));
      b.fill.push(x, y - h / 2, y + h / 2, packColor(body));
      if (selected || hovered) {
        const pad = (selected ? 3 : 2.5) / k;
        const okey = `${Math.round((w / 2 + pad) * 64)}`;
        let list = outlines.get(okey);
        if (!list) outlines.set(okey, (list = []));
        list.push(
          w / 2 + pad,
          x,
          y - h / 2 - pad,
          y + h / 2 + pad,
          packColor(selected ? theme.primary : mix(bg, nodeColor[i], 0.55)),
        );
      }
      if (sizing.kind[i] === NodeKind.Card && w * k >= 96) {
        avatars.push(
          x - w / 2 + 26,
          y,
          Math.min(32, h - 16) * k,
          packColor(color),
        );
      }
    }
    const scatter = (
      key: string,
      data: number[],
      opacity: number,
      stroke: number,
    ) => {
      if (!data.length) return;
      const count = data.length / 4;
      const buffer = new ArrayBuffer(count * SCATTER_STRIDE);
      const f32 = new Float32Array(buffer);
      const u32 = new Uint32Array(buffer);
      for (let j = 0; j < count; j++) {
        f32[j * 4] = data[j * 4];
        f32[j * 4 + 1] = data[j * 4 + 1];
        f32[j * 4 + 2] = data[j * 4 + 2];
        u32[j * 4 + 3] = data[j * 4 + 3];
      }
      const item: ScatterItem = {
        kind: "scatter",
        key,
        version,
        color: theme.primary,
        instances: buffer,
        count,
        opacity,
        stroke,
      };
      out.push(item);
    };
    const bars = (
      key: string,
      data: number[],
      half: number,
      inset: number,
      radius: number,
    ) => {
      if (!data.length) return;
      const count = data.length / 4;
      const buffer = new ArrayBuffer(count * BAR_STRIDE);
      const f32 = new Float32Array(buffer);
      const u32 = new Uint32Array(buffer);
      for (let j = 0; j < count; j++) {
        f32[j * 4] = data[j * 4];
        f32[j * 4 + 1] = data[j * 4 + 1];
        f32[j * 4 + 2] = data[j * 4 + 2];
        u32[j * 4 + 3] = data[j * 4 + 3];
      }
      const item: BarItem = {
        kind: "bar",
        key,
        version,
        color: theme.primary,
        instances: buffer,
        count,
        halfWidth: half,
        radius,
        inset,
        minHalf: 0,
        sorted: false,
      };
      out.push(item);
    };
    scatter("halo", halo, 1, 0);
    scatter("nodes", fills, 1, 0);
    scatter("collapsed", collapsedFill, 0.28, 2);
    scatter("hover-rings", rings, 0, 2);
    scatter("selection", selRings, 0, 2.25);
    for (const [key, list] of outlines) {
      const data: number[] = [];
      for (let j = 0; j < list.length; j += 5)
        data.push(list[j + 1], list[j + 2], list[j + 3], list[j + 4]);
      bars(
        `outline:${key}`,
        data,
        list[0],
        0,
        radiusPx === 999 ? 999 : radiusPx + 3,
      );
    }
    for (const [key, b] of boxBuckets) {
      bars(`border:${key}`, b.border, b.half, 0, radiusPx);
      bars(
        `fill:${key}`,
        b.fill,
        b.half,
        b.inset,
        radiusPx === 999 ? 999 : Math.max(0, radiusPx - 1),
      );
    }
    scatter("avatars", avatars, 1, 0);
    return out;
  };

  /** Hovered / selected nodes last (on top) */
  const drawOrder = (): number[] => {
    const order: number[] = [];
    const late: number[] = [];
    for (let i = 0; i < model.n; i++) {
      if (
        selection.has(i) ||
        (hover?.type === "node" && hover.index === i) ||
        i === focusIndex
      )
        late.push(i);
      else order.push(i);
    }
    return order.concat(late);
  };

  const hasVisibleChild = (i: number) =>
    !!tree && tree.children[i].some((c) => visible[c]);

  // -------------------------------------------------------------- frame

  function invalidate() {
    if (destroyed || frameId || !win) return;
    frameId = win.requestAnimationFrame(frame);
  }

  const transform = () => ({
    xScale: (2 * k) / width,
    xOffset: (2 * tx) / width - 1,
    yScale: (-2 * k) / height,
    yOffset: 1 - (2 * ty) / height,
  });

  function frame() {
    frameId = 0;
    if (destroyed) return;
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (w <= 0 || h <= 0) return;
    if (w !== width || h !== height) {
      width = w;
      height = h;
      if (!userMoved) needsFit = true;
      sceneDirty = true;
    }
    const dpr = win?.devicePixelRatio || 1;
    let animating = false;

    let follow = false;
    if (runner?.running()) {
      runner.step(8);
      pathsDirty = true;
      animating = runner.running() && !runner.threaded();
      follow = runner.running() && followLayout && !userMoved && !forcePending;
    }
    if (tween) {
      const t = Math.min(
        1,
        (now() - tween.start) / Math.max(1, tween.duration),
      );
      tweenT = ease(t);
      for (let i = 0; i < model.n; i++) {
        X[i] = FX[i] + (TX[i] - FX[i]) * tweenT;
        Y[i] = FY[i] + (TY[i] - FY[i]) * tweenT;
      }
      if (t >= 1) {
        tween = null;
        prevVisible = null;
        tweenT = 1;
      }
      pathsDirty = true;
      animating = true;
    }
    if (needsFit) {
      needsFit = false;
      const target = fitView();
      if (target && fitAnimate && drawnOnce && !reducedMotion?.matches) {
        viewTween = { from: [k, tx, ty], to: target, start: now() };
      } else if (target) [k, tx, ty] = target;
      fitAnimate = false;
      sceneDirty = true;
    } else if (follow) {
      // glide toward the fit of the expanding layout (the final fit animates
      // once it has settled)
      const target = fitView();
      if (target) {
        viewTween = null;
        if (!drawnOnce || reducedMotion?.matches) [k, tx, ty] = target;
        else if (approachView(target, 0.25)) animating = true;
        sceneDirty = true;
      }
    }
    if (viewTween) {
      const t = Math.min(1, (now() - viewTween.start) / VIEW_TWEEN_MS);
      const e = ease(t);
      const [k0, x0, y0] = viewTween.from;
      const [k1, x1, y1] = viewTween.to;
      const kk = k0 * Math.pow(k1 / k0, e);
      // keep the zoom geometric and the screen center consistent
      const c0x = (width / 2 - x0) / k0;
      const c0y = (height / 2 - y0) / k0;
      const c1x = (width / 2 - x1) / k1;
      const c1y = (height / 2 - y1) / k1;
      const cx = c0x + (c1x - c0x) * e;
      const cy = c0y + (c1y - c0y) * e;
      k = kk;
      tx = width / 2 - cx * kk;
      ty = height / 2 - cy * kk;
      if (t >= 1) {
        [k, tx, ty] = viewTween.to;
        viewTween = null;
      }
      sceneDirty = true;
      animating = true;
    }
    if (pathsDirty) {
      refreshPaths();
      sceneDirty = true;
    }
    updateHighlight();
    if (renderer) {
      if (sceneDirty) {
        items = forcePending ? [] : buildScene();
        sceneDirty = false;
      }
      const bw = Math.max(1, Math.round(w * dpr));
      const bh = Math.max(1, Math.round(h * dpr));
      if (renderer.canvas.width !== bw || renderer.canvas.height !== bh)
        renderer.resize(bw, bh);
      renderer.canvas.style.width = `${w}px`;
      renderer.canvas.style.height = `${h}px`;
      renderer.render(items, {
        transform: transform(),
        width: bw,
        height: bh,
        dpr,
      });
      drawnOnce = true;
    }
    sizeCanvas(dom.foreground, w, h, dpr);
    drawOverlay(dpr);
    if (hover) positionTooltip();
    if (animating) invalidate();
  }

  // ------------------------------------------------------------ overlay

  const screenX = (i: number) => X[i] * k + tx;
  const screenY = (i: number) => Y[i] * k + ty;

  const ellipsize = (
    ctx: CanvasRenderingContext2D,
    text: string,
    max: number,
  ) => {
    if (max <= 8) return "";
    if (ctx.measureText(text).width <= max) return text;
    let lo = 0;
    let hi = text.length;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (ctx.measureText(`${text.slice(0, mid)}…`).width <= max) lo = mid;
      else hi = mid - 1;
    }
    return lo ? `${text.slice(0, lo)}…` : "";
  };

  const textColorOn = (c: Rgba): string =>
    luminance(c) > 0.6 ? "#111827" : "#ffffff";

  const drawOverlay = (dpr: number) => {
    const ctx = dom.foreground.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    if (forcePending || !model.n) return;
    const family = theme.fontFamily;
    const text = toCss(theme.text);
    const muted = toCss(theme.textMuted);
    const bgCss = toCss(theme.background);
    const hl = highlight;
    const cell = 8;
    const cols = Math.ceil(width / cell) + 1;
    const rows = Math.ceil(height / cell) + 1;
    const grid = new Uint8Array(cols * rows);
    const free = (
      x0: number,
      y0: number,
      x1: number,
      y1: number,
      mark: boolean,
    ) => {
      const c0 = Math.max(0, Math.floor(x0 / cell));
      const c1 = Math.min(cols - 1, Math.floor(x1 / cell));
      const r0 = Math.max(0, Math.floor(y0 / cell));
      const r1 = Math.min(rows - 1, Math.floor(y1 / cell));
      if (c0 > c1 || r0 > r1) return false;
      if (!mark) {
        for (let r = r0; r <= r1; r++)
          for (let c = c0; c <= c1; c++) if (grid[r * cols + c]) return false;
        return true;
      }
      for (let r = r0; r <= r1; r++)
        for (let c = c0; c <= c1; c++) grid[r * cols + c] = 1;
      return true;
    };
    const onScreen = (sx: number, sy: number, margin: number) =>
      sx > -margin &&
      sy > -margin &&
      sx < width + margin &&
      sy < height + margin;

    // ----- text inside boxes: a readable minimum size, shortened with an
    // ellipsis; hidden only when the box cannot hold any text
    const showBoxText = options.nodeLabels !== false;
    for (let i = 0; i < model.n; i++) {
      if (sizing.kind[i] === NodeKind.Circle) continue;
      const f = fade(i);
      if (f <= 0) continue;
      const sx = screenX(i);
      const sy = screenY(i);
      const bw = sizing.width[i] * k;
      const bh = sizing.height[i] * k;
      if (!onScreen(sx, sy, Math.max(bw, bh))) continue;
      free(sx - bw / 2, sy - bh / 2, sx + bw / 2, sy + bh / 2, true);
      const natural = sizing.font[i] * k;
      const size = Math.max(BOX_FONT_MIN, natural);
      const node = model.nodes[i];
      const dim = hl && !hl.nodes[i];
      ctx.globalAlpha = f * (dim ? 0.45 : 1);
      const solid = sizing.kind[i] === NodeKind.Solid;
      const card = sizing.kind[i] === NodeKind.Card;
      const avatar = card && bw >= 96;
      if (showBoxText && bh >= size + 1) {
        const left = avatar ? sx - bw / 2 + 48 * k : sx;
        const maxWidth = avatar ? bw - 56 * k : bw - Math.max(4, 12 * k);
        ctx.textAlign = avatar ? "left" : "center";
        ctx.textBaseline = "middle";
        // the subtitle needs room for both lines
        const subSize = Math.max(BOX_FONT_MIN - 0.5, natural * 0.88);
        const gap = Math.max(2, natural * 0.6);
        const block = size + gap + subSize;
        const subtitle = node.subtitle && block <= bh - 4 ? node.subtitle : "";
        const titleY = subtitle ? sy - block / 2 + size / 2 : sy;
        ctx.font = `${sizing.weight[i]} ${size}px ${family}`;
        ctx.fillStyle = solid ? textColorOn(nodeColor[i]) : text;
        const label = ellipsize(ctx, labelOf(model, i), maxWidth);
        if (label) ctx.fillText(label, left, titleY);
        if (subtitle && label) {
          ctx.font = `${subSize}px ${family}`;
          ctx.fillStyle = solid ? textColorOn(nodeColor[i]) : muted;
          const sub = ellipsize(ctx, subtitle, maxWidth);
          if (sub) ctx.fillText(sub, left, sy + block / 2 - subSize / 2);
        }
      }
      if (avatar) {
        const initial = Array.from(labelOf(model, i).trim())[0] ?? "";
        ctx.textAlign = "center";
        ctx.font = `600 ${Math.max(8, 13 * k)}px ${family}`;
        ctx.fillStyle = textColorOn(nodeColor[i]);
        ctx.fillText(initial.toUpperCase(), sx - bw / 2 + 26 * k, sy);
      }
      // collapse badge of boxes
      if (collapsible() && tree && tree.children[i].length) {
        const collapsed = !hasVisibleChild(i);
        const active =
          (hover?.type === "node" && hover.index === i) || focusIndex === i;
        if (collapsed || active) {
          const vertical = layoutType === "org";
          const out =
            layoutType === "mindmap" ? (tree.side[i] < 0 ? -1 : 1) : 1;
          const bx = vertical ? sx : sx + out * (bw / 2 + 9);
          const by = vertical ? sy + bh / 2 + 9 : sy;
          const label2 = collapsed ? String(descendants[i]) : "−";
          ctx.font = `600 10px ${family}`;
          const r = Math.max(8, ctx.measureText(label2).width / 2 + 5);
          ctx.globalAlpha = f;
          ctx.beginPath();
          ctx.fillStyle = bgCss;
          ctx.strokeStyle = toCss(mix(theme.background, nodeColor[i], 0.75));
          ctx.lineWidth = 1.25;
          if (typeof ctx.roundRect === "function")
            ctx.roundRect(bx - r, by - 8, r * 2, 16, 8);
          else ctx.rect(bx - r, by - 8, r * 2, 16);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = text;
          ctx.textAlign = "center";
          ctx.fillText(label2, bx, by + 0.5);
        }
      }
    }
    ctx.globalAlpha = 1;

    // ----- labels of circles
    const mode = options.nodeLabels ?? "auto";
    const priority = (i: number) =>
      selection.has(i) ||
      i === focusIndex ||
      (hover?.type === "node" && hover.index === i) ||
      (!!hl && !!hl.nodes[i]);
    const drawn = new Uint8Array(model.n);
    let budget = 700;
    const drawLabel = (i: number, force: boolean) => {
      if (drawn[i] || sizing.kind[i] !== NodeKind.Circle || mode === false)
        return;
      const f = fade(i);
      if (f <= 0) return;
      const sx = screenX(i);
      const sy = screenY(i);
      if (!onScreen(sx, sy, 160)) return;
      const r = Math.max(model.n > 2000 ? 1 : 1.5, (sizing.width[i] * k) / 2);
      // tiny nodes of networks lose their label first (other layouts rely on the collisions)
      const network = layoutType === "force" || layoutType === "none";
      if (!force && mode === "auto" && network && r * 2 < 5) return;
      const strong = priority(i);
      const dim = hl && !hl.nodes[i];
      const raw = labelOf(model, i);
      const tw = Math.min(180, sizing.labelWidth[i] * (strong ? 1.06 : 1));
      const place = placement(i, sx, sy, r);
      // collision box: the whole label, or its start for rotated labels
      let bx0: number;
      let by0: number;
      let bx1: number;
      let by1: number;
      if (place.angle !== 0) {
        const cx =
          place.x + Math.cos(place.angle) * (place.align === "left" ? 7 : -7);
        const cy =
          place.y + Math.sin(place.angle) * (place.align === "left" ? 7 : -7);
        bx0 = cx - 6;
        bx1 = cx + 6;
        by0 = cy - 6;
        by1 = cy + 6;
      } else {
        bx0 =
          place.align === "left"
            ? place.x
            : place.align === "right"
              ? place.x - tw
              : place.x - tw / 2;
        bx1 = bx0 + tw;
        by0 =
          place.baseline === "top"
            ? place.y
            : place.baseline === "bottom"
              ? place.y - 14
              : place.y - 7;
        by1 = by0 + 14;
      }
      if (!force && !free(bx0 - 2, by0, bx1 + 2, by1, false)) return;
      free(bx0 - 2, by0, bx1 + 2, by1, true);
      drawn[i] = 1;
      budget--;
      ctx.save();
      ctx.globalAlpha = f * (dim ? 0.35 : 1);
      ctx.font = `${strong ? 600 : 400} ${LABEL_FONT_SIZE}px ${family}`;
      ctx.textAlign = place.align;
      ctx.textBaseline = place.baseline;
      ctx.translate(place.x, place.y);
      if (place.angle) ctx.rotate(place.angle);
      const label = sizing.labelWidth[i] > 180 ? ellipsize(ctx, raw, 180) : raw;
      ctx.lineJoin = "round";
      ctx.lineWidth = 3;
      ctx.strokeStyle = bgCss;
      ctx.strokeText(label, 0, 0);
      ctx.fillStyle = strong ? text : dim ? muted : text;
      ctx.fillText(label, 0, 0);
      ctx.restore();
    };
    for (let i = 0; i < model.n; i++) if (priority(i)) drawLabel(i, true);

    // ----- edge labels
    const edgeMode = options.edgeLabels ?? "auto";
    if (edgeMode !== false) {
      ctx.font = `11px ${family}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let shownEdges = 0;
      for (let e = 0; e < model.m && shownEdges < 400; e++) {
        const label = model.edges[e].label;
        if (!label) continue;
        const s = model.source[e];
        const t = model.target[e];
        const f = Math.min(fade(s), fade(t));
        if (f <= 0) continue;
        const lit = !!hl?.edges[e];
        if (edgeMode === "hover" && !lit) continue;
        if (edgeMode === "auto" && !lit && (k < 0.75 || (hl && !lit))) continue;
        let mx: number;
        let my: number;
        const path = paths[e];
        if (path) {
          const p = pointAt(path, pathLength(path) / 2);
          mx = p[0] * k + tx;
          my = p[1] * k + ty;
          if (s === t) {
            // beyond the far end of a loop (the pill would hide it)
            const dx = mx - (X[s] * k + tx);
            const dy = my - (Y[s] * k + ty);
            const l = Math.hypot(dx, dy) || 1;
            mx += (dx / l) * 10;
            my += (dy / l) * 10;
          }
        } else {
          mx = ((X[s] + X[t]) / 2) * k + tx;
          my = ((Y[s] + Y[t]) / 2) * k + ty;
        }
        if (!onScreen(mx, my, 40)) continue;
        if (Number.isNaN(edgeLabelWidth[e]))
          edgeLabelWidth[e] = ctx.measureText(label).width;
        const lw = edgeLabelWidth[e] + 10;
        if (!lit && !free(mx - lw / 2, my - 8, mx + lw / 2, my + 8, false))
          continue;
        free(mx - lw / 2, my - 8, mx + lw / 2, my + 8, true);
        shownEdges++;
        ctx.globalAlpha = f;
        ctx.fillStyle = bgCss;
        ctx.beginPath();
        if (typeof ctx.roundRect === "function")
          ctx.roundRect(mx - lw / 2, my - 8, lw, 16, 8);
        else ctx.rect(mx - lw / 2, my - 8, lw, 16);
        ctx.fill();
        if (lit) {
          ctx.strokeStyle = toCss(
            mix(theme.background, highlight?.accent ?? theme.primary, 0.6),
          );
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.fillStyle = lit ? text : muted;
        ctx.fillText(label, mx, my + 0.5);
      }
      ctx.globalAlpha = 1;
    }

    // ----- other labels, most important first
    if (mode !== false) {
      const all = mode === true;
      for (let r = 0; r < model.rank.length && budget > 0; r++) {
        const i = model.rank[r];
        drawLabel(i, false);
        if (!all && r > 4000) break;
      }
    }

    // ----- keyboard focus ring
    if (focusVisible && focusIndex >= 0 && fade(focusIndex) > 0) {
      const sx = screenX(focusIndex);
      const sy = screenY(focusIndex);
      ctx.save();
      ctx.strokeStyle = toCss(theme.primary);
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      if (sizing.kind[focusIndex] === NodeKind.Circle) {
        const r = Math.max(3, (sizing.width[focusIndex] * k) / 2) + 6;
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
      } else {
        const bw = sizing.width[focusIndex] * k + 10;
        const bh = sizing.height[focusIndex] * k + 10;
        ctx.rect(sx - bw / 2, sy - bh / 2, bw, bh);
      }
      ctx.stroke();
      ctx.restore();
    }
  };

  /** Where the label of a circle goes */
  const placement = (
    i: number,
    sx: number,
    sy: number,
    r: number,
  ): {
    x: number;
    y: number;
    align: CanvasTextAlign;
    baseline: CanvasTextBaseline;
    angle: number;
  } => {
    const below = {
      x: sx,
      y: sy + r + 3,
      align: "center" as const,
      baseline: "top" as const,
      angle: 0,
    };
    const radial = (a: number) => {
      const flip = Math.cos(a) < 0;
      return {
        x: sx + Math.cos(a) * (r + 4),
        y: sy + Math.sin(a) * (r + 4),
        align: (flip ? "right" : "left") as CanvasTextAlign,
        baseline: "middle" as const,
        angle: flip ? a + Math.PI : a,
      };
    };
    switch (layoutType) {
      case "tree": {
        const inner = hasVisibleChild(i);
        if (direction === "LR" || direction === "RL") {
          const right = (direction === "LR") !== inner;
          return {
            x: sx + (right ? r + 5 : -r - 5),
            y: sy,
            align: right ? "left" : "right",
            baseline: "middle",
            angle: 0,
          };
        }
        if (direction === "BT")
          return {
            x: sx,
            y: sy - r - 3,
            align: "center",
            baseline: "bottom",
            angle: 0,
          };
        return below;
      }
      case "radial":
        // inner nodes: horizontal label below (their children fan out around them)
        if (
          tree &&
          (hasVisibleChild(i) ||
            (tree.depth[i] === 0 && Math.hypot(X[i], Y[i]) < 1e-6))
        )
          return below;
        return radial(tree ? tree.side[i] : 0);
      case "circular":
        return radial(circ ? circ.angle[i] : 0);
      case "arc":
        return {
          x: sx,
          y: sy + r + 4,
          align: "left",
          baseline: "middle",
          angle: Math.PI / 2,
        };
      default:
        return below;
    }
  };

  // ----------------------------------------------------------------- fit

  const fitView = (): [number, number, number] | null => {
    if (width <= 0 || height <= 0) return null;
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    let maxLabel = 0;
    for (let i = 0; i < model.n; i++) {
      if (!visible[i] || !Number.isFinite(TX[i])) continue;
      const g = model.groupOf[i];
      if (g >= 0 && hiddenGroups.has(model.groups[g].id)) continue;
      const hw = sizing.width[i] / 2;
      const hh = sizing.height[i] / 2;
      x0 = Math.min(x0, TX[i] - hw);
      x1 = Math.max(x1, TX[i] + hw);
      y0 = Math.min(y0, TY[i] - hh);
      y1 = Math.max(y1, TY[i] + hh);
      if (sizing.kind[i] === NodeKind.Circle)
        maxLabel = Math.max(maxLabel, sizing.labelWidth[i]);
    }
    if (!(x0 <= x1)) return null;
    // arcs rise above the line by half their span
    if (layoutType === "arc") {
      for (let e = 0; e < model.m; e++) {
        const s = model.source[e];
        const t = model.target[e];
        if (!visible[s] || !visible[t]) continue;
        const b = model.bend[e];
        const rise = s !== t && Number.isFinite(b) ? 1 + 0.25 * Math.abs(b) : 1;
        y0 = Math.min(y0, TY[s] - (Math.abs(TX[t] - TX[s]) / 2) * rise);
      }
    }
    // self-loops stick out of their node
    if (model.hasLoops) {
      for (let e = 0; e < model.m; e++) {
        const i = model.source[e];
        if (i !== model.target[e] || !visible[i]) continue;
        const a = loopAngle(i);
        const size = loopSize(i);
        const reach =
          Math.max(sizing.width[i], sizing.height[i]) / 2 +
          size * (1 + 0.6 * model.bend[e]);
        const lx = TX[i] + Math.cos(a) * reach;
        const ly = TY[i] + Math.sin(a) * reach;
        x0 = Math.min(x0, lx - size / 2);
        x1 = Math.max(x1, lx + size / 2);
        y0 = Math.min(y0, ly - size / 2);
        y1 = Math.max(y1, ly + size / 2);
      }
    }
    const pad = options.fitPadding ?? 24;
    let [pl, pr, pt, pb] = [pad, pad, pad, pad];
    const label =
      options.nodeLabels === false ? 0 : Math.min(140, maxLabel) + 8;
    const circles = sizing.kind.some((c) => c === NodeKind.Circle);
    if (circles && label > 8) {
      if (layoutType === "tree" && (direction === "LR" || direction === "RL")) {
        // leaves are labeled outside, inner nodes (the roots first) inside
        let inner = 0;
        for (let i = 0; i < model.n; i++) {
          if (tree && tree.parent[i] < 0 && visible[i] && hasVisibleChild(i))
            inner = Math.max(inner, Math.min(140, sizing.labelWidth[i]) + 8);
        }
        if (direction === "LR") {
          pr += label;
          pl += inner;
        } else {
          pl += label;
          pr += inner;
        }
      } else if (layoutType === "radial" || layoutType === "circular") {
        pl += label;
        pr += label;
        pt += label * 0.6;
        pb += label * 0.6;
      } else if (layoutType === "arc") pb += label;
      else pb += 16;
    }
    if (layoutType === "org" || layoutType === "mindmap") pb += 10;
    const aw = Math.max(10, width - pl - pr);
    const ah = Math.max(10, height - pt - pb);
    const bw = Math.max(1e-6, x1 - x0);
    const bh = Math.max(1e-6, y1 - y0);
    const range = interaction()?.zoomRange ?? [0.02, 8];
    let kk = Math.min(aw / bw, ah / bh, 1.6, range[1]);
    kk = Math.max(kk, 1e-4);
    const ox = pl + (aw - bw * kk) / 2 - x0 * kk;
    const oy = pt + (ah - bh * kk) / 2 - y0 * kk;
    return [kk, ox, oy];
  };

  const zoomLimits = (): [number, number] => {
    const range = interaction()?.zoomRange ?? [0.02, 8];
    const fit = fitView();
    return [Math.min(range[0], fit ? fit[0] * 0.5 : range[0]), range[1]];
  };

  /**
   * Moves the view a `rate` of the way to `to` (geometric zoom, consistent
   * center); `true` while it has not arrived yet
   */
  const approachView = (to: [number, number, number], rate: number) => {
    const [k1, x1, y1] = to;
    const c0x = (width / 2 - tx) / k;
    const c0y = (height / 2 - ty) / k;
    const c1x = (width / 2 - x1) / k1;
    const c1y = (height / 2 - y1) / k1;
    const far =
      Math.abs(Math.log(k1 / k)) > 0.002 ||
      Math.hypot(c1x - c0x, c1y - c0y) * k1 > 0.5;
    if (!far) {
      [k, tx, ty] = to;
      return false;
    }
    const kk = k * Math.pow(k1 / k, rate);
    const cx = c0x + (c1x - c0x) * rate;
    const cy = c0y + (c1y - c0y) * rate;
    k = kk;
    tx = width / 2 - cx * kk;
    ty = height / 2 - cy * kk;
    return true;
  };

  const setView = (next: [number, number, number], animate: boolean) => {
    viewTween = null;
    if (animate && !reducedMotion?.matches && width > 0) {
      viewTween = { from: [k, tx, ty], to: next, start: now() };
    } else {
      [k, tx, ty] = next;
    }
    sceneDirty = true;
    invalidate();
  };

  const zoomAround = (
    factor: number,
    cx: number,
    cy: number,
    animate = false,
  ) => {
    const [lo, hi] = zoomLimits();
    const nk = Math.max(lo, Math.min(hi, k * factor));
    const ratio = nk / k;
    setView([nk, cx - (cx - tx) * ratio, cy - (cy - ty) * ratio], animate);
    userMoved = true;
  };

  // ------------------------------------------------------------- legend

  let legendKey = "";
  const renderLegend = () => {
    const o = options.legend;
    const named = model.groups.filter((g) => g.count > 0);
    const show = o === undefined ? named.length > 1 : !!o && named.length > 0;
    const config = typeof o === "object" ? o : {};
    const toggle = config.toggle ?? true;
    const bottom = config.position === "bottom";
    let key = `${show}|${bottom}|${toggle}`;
    if (show) {
      for (const g of named) {
        const i = model.groups.indexOf(g);
        key += `\n${g.id}\u0001${g.name}\u0001${toCss(groupColor[i] ?? theme.primary)}\u0001${hiddenGroups.has(g.id)}`;
      }
    }
    if (key === legendKey) return;
    legendKey = key;
    const focused = [...dom.legend.children].indexOf(
      doc.activeElement as Element,
    );
    dom.legend.replaceChildren();
    dom.legend.style.display = show ? "flex" : "none";
    if (!show) return;
    dom.legend.style.order = bottom ? "1" : "0";
    dom.legend.style.padding = bottom ? "8px 4px 0" : "0 4px 8px";
    for (const g of named) {
      const i = model.groups.indexOf(g);
      const hidden = hiddenGroups.has(g.id);
      const item = doc.createElement(toggle ? "button" : "span");
      if (item instanceof HTMLButtonElement) {
        item.type = "button";
        item.setAttribute("aria-pressed", String(!hidden));
        item.addEventListener("click", () => toggleGroup(g.id));
      }
      style(item, {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "2px 4px",
        margin: "0",
        border: "0",
        borderRadius: "4px",
        background: "none",
        font: "inherit",
        color: "var(--text-secondary-color, #6b7280)",
        cursor: toggle ? "pointer" : "default",
        opacity: hidden ? "0.45" : "1",
        textDecoration: hidden ? "line-through" : "none",
      });
      item.append(
        swatch(doc, toCss(groupColor[i] ?? theme.primary)),
        doc.createTextNode(g.name),
      );
      dom.legend.appendChild(item);
    }
    if (focused >= 0)
      (dom.legend.children[focused] as HTMLElement | undefined)?.focus();
  };

  const toggleGroup = (id: string) => {
    const g = model.groups.find((group) => group.id === id);
    if (!g) return;
    const hidden = !hiddenGroups.has(id);
    if (hidden) hiddenGroups.add(id);
    else hiddenGroups.delete(id);
    dom.live.textContent = fill(hidden ? loc.labels.hidden : loc.labels.shown, {
      name: g.name,
    });
    // hidden nodes leave the selection and the focus
    for (const i of [...selection])
      if (
        fade(i) <= 0 &&
        model.groupOf[i] >= 0 &&
        hiddenGroups.has(model.groups[model.groupOf[i]].id)
      )
        selection.delete(i);
    if (
      focusIndex >= 0 &&
      model.groupOf[focusIndex] >= 0 &&
      hiddenGroups.has(model.groups[model.groupOf[focusIndex]].id)
    )
      focusIndex = -1;
    if (hover) setHover(null);
    pathsDirty = true;
    sceneDirty = true;
    highlightKey = "";
    renderLegend();
    invalidate();
    emit("groupToggle", { group: id, hidden });
  };

  // ------------------------------------------------------ accessibility

  const updateAccessibility = () => {
    const { labels, count } = loc;
    const role =
      layoutType === "dag" ? labels.dag : isTree() ? labels.tree : labels.chart;
    stage.setAttribute("aria-roledescription", role);
    stage.setAttribute("aria-label", options.ariaLabel ?? role);
    const keyboard = interaction()?.keyboard;
    if (keyboard) stage.tabIndex = 0;
    else stage.removeAttribute("tabindex");
    const ia = interaction();
    stage.style.cursor = ia?.pan ? "grab" : "default";
    const lines = [
      fill(labels.summary, { nodes: count(model.n), edges: count(model.m) }),
    ];
    const names = model.groups.filter((g) => g.count > 0).map((g) => g.name);
    if (names.length)
      lines.push(
        fill(labels.groupsSummary, {
          groups: names.join(labels.listSeparator),
        }),
      );
    if (keyboard) lines.push(labels.keyboardHelp);
    dom.summary.textContent = lines.join(" ");
    const controls = options.controls !== false && !!ia?.zoom;
    dom.controls.style.display = controls ? "flex" : "none";
    dom.zoomIn.setAttribute("aria-label", labels.zoomIn);
    dom.zoomIn.title = labels.zoomIn;
    dom.zoomOut.setAttribute("aria-label", labels.zoomOut);
    dom.zoomOut.title = labels.zoomOut;
    dom.fit.setAttribute("aria-label", labels.fit);
    dom.fit.title = labels.fit;
  };

  // ------------------------------------------------------------- picking

  let pickGrid: Map<number, number[]> | null = null;
  let pickCell = 32;
  let maxExtent = 0;
  const pickKey = (cx: number, cy: number) =>
    (cx + 2097152) * 4194304 + (cy + 2097152);

  const buildPickGrid = () => {
    maxExtent = 0;
    for (let i = 0; i < model.n; i++)
      maxExtent = Math.max(maxExtent, sizing.width[i], sizing.height[i]);
    pickCell = Math.max(16, maxExtent);
    const grid = new Map<number, number[]>();
    for (let i = 0; i < model.n; i++) {
      if (fade(i) <= 0) continue;
      const key = pickKey(
        Math.floor(X[i] / pickCell),
        Math.floor(Y[i] / pickCell),
      );
      let list = grid.get(key);
      if (!list) grid.set(key, (list = []));
      list.push(i);
    }
    pickGrid = grid;
  };

  const pickNode = (px: number, py: number): number => {
    if (forcePending || !model.n) return -1;
    buildPickGrid();
    const wx = (px - tx) / k;
    const wy = (py - ty) / k;
    const tol = 3 / k;
    const minR = (model.n > 2000 ? 1 : 1.5) / k;
    const reach = Math.ceil((maxExtent / 2 + tol + minR) / pickCell);
    const cx = Math.floor(wx / pickCell);
    const cy = Math.floor(wy / pickCell);
    let best = -1;
    let bestD = Infinity;
    for (let oy = -reach; oy <= reach; oy++) {
      for (let ox = -reach; ox <= reach; ox++) {
        const list = pickGrid!.get(pickKey(cx + ox, cy + oy));
        if (!list) continue;
        for (const i of list) {
          const dx = wx - X[i];
          const dy = wy - Y[i];
          if (sizing.kind[i] === NodeKind.Circle) {
            const r = Math.max(sizing.width[i] / 2, minR) + tol;
            const d = dx * dx + dy * dy;
            if (d <= r * r && d <= bestD) {
              best = i;
              bestD = d;
            }
          } else if (
            Math.abs(dx) <= sizing.width[i] / 2 + tol &&
            Math.abs(dy) <= sizing.height[i] / 2 + tol
          ) {
            const d = dx * dx + dy * dy;
            if (d <= bestD) {
              best = i;
              bestD = d;
            }
          }
        }
      }
    }
    return best;
  };

  const pickEdge = (px: number, py: number): number => {
    if (forcePending) return -1;
    const wx = (px - tx) / k;
    const wy = (py - ty) / k;
    const tol = 4 / k;
    let best = -1;
    let bestD = tol * tol;
    const test = (e: number) => {
      if (Math.min(fade(model.source[e]), fade(model.target[e])) <= 0) return;
      let points: readonly number[] | null = paths[e] ?? null;
      if (!points) {
        const ends = straightEnds(e);
        if (!ends) return;
        points = ends;
      }
      const d = distanceToPath(points, wx, wy);
      if (d <= bestD) {
        best = e;
        bestD = d;
      }
    };
    if (model.m < EDGE_INDEX_MIN) {
      for (let e = 0; e < model.m; e++) test(e);
      return best;
    }
    const index = edgeIndex();
    if (!index) return -1;
    // candidates from the buckets around the pointer, exact distances
    const { cell, x0, y0, cols, rows, start, items, stamp } = index;
    const c0 = Math.max(0, Math.floor((wx - tol - x0) / cell));
    const c1 = Math.min(cols - 1, Math.floor((wx + tol - x0) / cell));
    const r0 = Math.max(0, Math.floor((wy - tol - y0) / cell));
    const r1 = Math.min(rows - 1, Math.floor((wy + tol - y0) / cell));
    const visit = ++index.visit;
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const b = r * cols + c;
        for (let q = start[b]; q < start[b + 1]; q++) {
          const e = items[q];
          if (stamp[e] === visit) continue;
          stamp[e] = visit;
          test(e);
        }
      }
    }
    return best;
  };

  // ---- spatial index of the edges (large graphs): every segment is
  // registered in the grid cells it crosses (CSR typed arrays)
  interface EdgeIndex {
    cell: number;
    x0: number;
    y0: number;
    cols: number;
    rows: number;
    start: Int32Array;
    items: Int32Array;
    stamp: Int32Array;
    visit: number;
    geometry: number;
    built: number;
  }
  let edgeGrid: EdgeIndex | null = null;

  const edgeIndex = (): EdgeIndex | null => {
    const current = edgeGrid;
    if (current && current.geometry === geometryVersion) return current;
    // a layout still moving: the last index stays good enough for the
    // candidates for a moment (the distances are always exact)
    if (current && runner?.running() && now() - current.built < 250)
      return current;
    const m = model.m;
    const segment = (e: number): readonly number[] | null =>
      Math.min(fade(model.source[e]), fade(model.target[e])) <= 0
        ? null
        : (paths[e] ?? straightEnds(e));
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    let length = 0;
    let segments = 0;
    for (let e = 0; e < m; e++) {
      const p = segment(e);
      if (!p) continue;
      for (let i = 0; i < p.length; i += 2) {
        x0 = Math.min(x0, p[i]);
        x1 = Math.max(x1, p[i]);
        y0 = Math.min(y0, p[i + 1]);
        y1 = Math.max(y1, p[i + 1]);
        if (i) length += Math.hypot(p[i] - p[i - 2], p[i + 1] - p[i - 1]);
      }
      segments += p.length / 2 - 1;
    }
    if (!(x0 <= x1 && y0 <= y1)) return null;
    // about two cells per segment on average, at most 512 x 512 cells
    const span = Math.max(x1 - x0, y1 - y0, 1e-6);
    const cell = Math.max(
      span / 512,
      (length / Math.max(1, segments)) * 0.5,
      1e-6,
    );
    const cols = Math.min(512, Math.floor((x1 - x0) / cell) + 1);
    const rows = Math.min(512, Math.floor((y1 - y0) / cell) + 1);
    const counts = new Int32Array(cols * rows + 1);
    const register = (pass: (b: number, e: number) => void) => {
      for (let e = 0; e < m; e++) {
        const p = segment(e);
        if (!p) continue;
        for (let i = 2; i < p.length; i += 2) {
          // long segments are walked in steps of one cell
          const ax = p[i - 2];
          const ay = p[i - 1];
          const steps = Math.max(
            1,
            Math.ceil(Math.hypot(p[i] - ax, p[i + 1] - ay) / cell),
          );
          let prev = -1;
          for (let s = 0; s < steps; s++) {
            const bx0 = ax + ((p[i] - ax) * s) / steps;
            const by0 = ay + ((p[i + 1] - ay) * s) / steps;
            const bx1 = ax + ((p[i] - ax) * (s + 1)) / steps;
            const by1 = ay + ((p[i + 1] - ay) * (s + 1)) / steps;
            const c0 = Math.floor((Math.min(bx0, bx1) - x0) / cell);
            const c1 = Math.floor((Math.max(bx0, bx1) - x0) / cell);
            const r0 = Math.floor((Math.min(by0, by1) - y0) / cell);
            const r1 = Math.floor((Math.max(by0, by1) - y0) / cell);
            for (let r = Math.max(0, r0); r <= Math.min(rows - 1, r1); r++) {
              for (let c = Math.max(0, c0); c <= Math.min(cols - 1, c1); c++) {
                const b = r * cols + c;
                // consecutive pieces mostly share their cell
                if (b === prev) continue;
                prev = b;
                pass(b, e);
              }
            }
          }
        }
      }
    };
    register((b) => counts[b + 1]++);
    for (let b = 0; b < cols * rows; b++) counts[b + 1] += counts[b];
    const items = new Int32Array(counts[cols * rows]);
    const cursor = counts.slice(0, cols * rows);
    register((b, e) => {
      items[cursor[b]++] = e;
    });
    edgeGrid = {
      cell,
      x0,
      y0,
      cols,
      rows,
      start: counts,
      items,
      stamp: new Int32Array(m),
      visit: 0,
      geometry: geometryVersion,
      built: now(),
    };
    return edgeGrid;
  };

  const pickAt = (px: number, py: number): Hit | null => {
    const i = pickNode(px, py);
    if (i >= 0) return { type: "node", index: i };
    const wantsEdges =
      tooltipEnabled() || listening("hover") || listening("click");
    const e = wantsEdges ? pickEdge(px, py) : -1;
    return e >= 0 ? { type: "edge", index: e } : null;
  };

  // -------------------------------------------------------------- events

  const tooltipEnabled = () => options.tooltip !== false;

  const hoverEvent = (hit: Hit): GraphHoverEvent => {
    const offsetX = stage.offsetLeft;
    const offsetY = stage.offsetTop;
    if (hit.type === "node") {
      const i = hit.index;
      const node = model.nodes[i];
      const g = model.groupOf[i];
      return {
        type: "node",
        id: node.id,
        node,
        index: model.nodeInput[i],
        group: g >= 0 ? model.groups[g].id : undefined,
        color: toCss(nodeColor[i]),
        degree: model.inDegree[i] + model.outDegree[i],
        clientX: screenX(i) + offsetX,
        clientY: screenY(i) + offsetY,
      };
    }
    const e = hit.index;
    const edge = model.edges[e];
    const s = model.source[e];
    const t = model.target[e];
    const path = paths[e];
    let mx = (X[s] + X[t]) / 2;
    let my = (Y[s] + Y[t]) / 2;
    if (path) {
      const p = pointAt(path, pathLength(path) / 2);
      mx = p[0];
      my = p[1];
    }
    return {
      type: "edge",
      id: `${edge.source}→${edge.target}`,
      edge,
      index: model.edgeInput[e],
      color: toCss(edgeColor[e]),
      clientX: mx * k + tx + offsetX,
      clientY: my * k + ty + offsetY,
    };
  };

  const sameHit = (a: Hit | null, b: Hit | null) =>
    a === b || (!!a && !!b && a.type === b.type && a.index === b.index);

  const setHover = (hit: Hit | null) => {
    if (sameHit(hit, hover)) {
      if (hit) positionTooltip();
      return;
    }
    hover = hit;
    renderTooltip();
    sceneDirty = true;
    invalidate();
    emit("hover", hit ? hoverEvent(hit) : null);
  };

  const tooltipTarget = (): Hit | null =>
    hover ??
    (focusVisible && focusIndex >= 0
      ? { type: "node", index: focusIndex }
      : null);

  const renderTooltip = () => {
    const tip = dom.tooltip;
    const hit = tooltipTarget();
    if (!hit || !tooltipEnabled()) {
      tip.style.display = "none";
      return;
    }
    const event = hoverEvent(hit);
    const custom =
      typeof options.tooltip === "object" ? options.tooltip.render : undefined;
    const content = custom ? custom(event) : defaultTooltip(hit);
    if (content === null) {
      tip.style.display = "none";
      return;
    }
    if (typeof content === "string") tip.textContent = content;
    else tip.replaceChildren(content);
    tip.style.display = "block";
    positionTooltip();
  };

  const positionTooltip = () => {
    const tip = dom.tooltip;
    const hit = tooltipTarget();
    if (!hit || tip.style.display === "none") return;
    let ax: number;
    let ay: number;
    let gap = 14;
    if (hit.type === "node") {
      ax = screenX(hit.index);
      ay = screenY(hit.index);
      gap += (Math.max(sizing.width[hit.index], 0) * k) / 2;
    } else {
      const ev = hoverEvent(hit);
      ax = ev.clientX - stage.offsetLeft;
      ay = ev.clientY - stage.offsetTop;
    }
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;
    let x = ax + gap;
    if (x + tw > width - 4) x = ax - gap - tw;
    x = Math.max(4, Math.min(width - tw - 4, x));
    const y = Math.max(4, Math.min(height - th - 4, ay - th / 2));
    tip.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
  };

  const row = (name: string, value: string) => {
    const el = style(doc.createElement("div"), {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    });
    const n = style(doc.createElement("span"), {
      flex: "1 1 auto",
      color: "var(--text-secondary-color, #6b7280)",
    });
    n.textContent = name;
    const v = style(doc.createElement("span"), {
      fontWeight: "600",
      fontVariantNumeric: "tabular-nums",
      marginLeft: "12px",
    });
    v.textContent = value;
    el.append(n, v);
    return el;
  };

  const header = (color: string, title: string) => {
    const el = style(doc.createElement("div"), {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontWeight: "600",
      marginBottom: "2px",
      color: "var(--text-color, #1f2937)",
    });
    el.append(swatch(doc, color), doc.createTextNode(title));
    return el;
  };

  const defaultTooltip = (hit: Hit): Node => {
    const { labels } = loc;
    const fragment = doc.createDocumentFragment();
    if (hit.type === "node") {
      const i = hit.index;
      const node = model.nodes[i];
      fragment.append(header(toCss(nodeColor[i]), labelOf(model, i)));
      if (node.subtitle) {
        const sub = style(doc.createElement("div"), {
          color: "var(--text-secondary-color, #6b7280)",
          marginBottom: "2px",
        });
        sub.textContent = node.subtitle;
        fragment.append(sub);
      }
      const g = model.groupOf[i];
      if (g >= 0) fragment.append(row(labels.group, model.groups[g].name));
      if (Number.isFinite(node.value))
        fragment.append(row(labels.value, loc.value(node.value!)));
      const directed =
        layoutType === "dag" ||
        options.arrows ||
        model.edges.some((e) => e.directed);
      if (directed && !isTree()) {
        fragment.append(row(labels.incoming, loc.count(model.inDegree[i])));
        fragment.append(row(labels.outgoing, loc.count(model.outDegree[i])));
      } else if (!isTree()) {
        fragment.append(
          row(labels.degree, loc.count(model.inDegree[i] + model.outDegree[i])),
        );
      }
      if (isTree() && descendants[i] > 0 && !hasVisibleChild(i))
        fragment.append(row(labels.hiddenChildren, loc.count(descendants[i])));
      if (critical?.nodes[i]) {
        // a badge: full subtle border, tinted fill and a colored dot
        const color = toCss(criticalColor);
        const tag = style(doc.createElement("div"), {
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          marginTop: "4px",
          padding: "0 8px",
          borderRadius: "999px",
          border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
          background: `color-mix(in srgb, ${color} 10%, transparent)`,
          color: "var(--text-color, #1f2937)",
          fontWeight: "500",
          lineHeight: "18px",
        });
        tag.className = "minerva-chart-badge";
        const dot = swatch(doc, color);
        style(dot, { width: "7px", height: "7px" });
        tag.append(dot, doc.createTextNode(labels.critical));
        fragment.append(tag);
      }
      return fragment;
    }
    const e = hit.index;
    const edge = model.edges[e];
    const s = model.source[e];
    const t = model.target[e];
    const arrow = edgeArrow[e] ? " → " : " — ";
    fragment.append(
      header(
        toCss(edgeColor[e]),
        `${labelOf(model, s)}${arrow}${labelOf(model, t)}`,
      ),
    );
    if (edge.label) {
      const el = doc.createElement("div");
      el.textContent = edge.label;
      fragment.append(el);
    }
    if (Number.isFinite(edge.value))
      fragment.append(row(labels.value, loc.value(edge.value!)));
    return fragment;
  };

  let hoverFrame = 0;
  let pendingHover: { x: number; y: number } | null = null;
  const scheduleHover = (x: number, y: number) => {
    pendingHover = { x, y };
    if (hoverFrame || !win) return;
    hoverFrame = win.requestAnimationFrame(() => {
      hoverFrame = 0;
      const p = pendingHover;
      pendingHover = null;
      if (!p || destroyed || drag) return;
      const hit = pickAt(p.x, p.y);
      setHover(hit);
      stage.style.cursor =
        hit?.type === "node"
          ? "pointer"
          : interaction()?.pan
            ? "grab"
            : "default";
    });
  };

  // --------------------------------------------------------- selection

  const setSelection = (next: Set<number>, notify: boolean) => {
    const same =
      next.size === selection.size && [...next].every((i) => selection.has(i));
    if (same) return;
    selection.clear();
    next.forEach((i) => selection.add(i));
    sceneDirty = true;
    invalidate();
    dom.live.textContent = selection.size
      ? fill(loc.labels.selected, { count: loc.count(selection.size) })
      : loc.labels.selectionCleared;
    if (notify)
      emit("select", { ids: [...selection].map((i) => model.nodes[i].id) });
  };

  const selectNode = (i: number, additive: boolean) => {
    const ia = interaction();
    if (!ia?.select) return;
    const multi = ia.select === "multiple" || additive;
    const next = new Set(multi ? selection : []);
    if (multi && next.has(i)) next.delete(i);
    else next.add(i);
    setSelection(next, true);
  };

  // ------------------------------------------------------ collapse

  const setCollapsed = (i: number, collapse: boolean, notify: boolean) => {
    if (!tree || !tree.children[i]?.length) return false;
    const id = model.nodes[i].id;
    if (collapse === collapsedIds.has(id)) return false;
    if (collapse) collapsedIds.add(id);
    else collapsedIds.delete(id);
    const prev = snapshot();
    runLayout(prev, true);
    // hidden nodes leave the selection
    const kept = new Set([...selection].filter((j) => visible[j]));
    if (kept.size !== selection.size) setSelection(kept, true);
    if (focusIndex >= 0 && !visible[focusIndex]) focusIndex = i;
    dom.live.textContent = collapse
      ? fill(loc.labels.collapsed, {
          name: labelOf(model, i),
          count: loc.count(descendants[i]),
        })
      : fill(loc.labels.expanded, { name: labelOf(model, i) });
    if (notify) emit("toggle", { id, collapsed: collapse });
    return true;
  };

  // -------------------------------------------------------- interaction

  interface DragState {
    mode: "node" | "pan" | "pinch";
    index: number;
    origin: { x: number; y: number };
    view: [number, number, number];
    offset: [number, number];
    distance: number;
    moved: boolean;
    button: number;
  }
  let drag: DragState | null = null;
  const pointers = new Map<number, { x: number; y: number }>();

  const local = (e: { clientX: number; clientY: number }) => {
    const r = stage.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const pinchInfo = () => {
    const pts = [...pointers.values()];
    const a = pts[0] ?? { x: 0, y: 0 };
    const b = pts[1] ?? a;
    return {
      distance: Math.hypot(a.x - b.x, a.y - b.y),
      center: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
    };
  };

  const onPointerDown = (e: PointerEvent) => {
    const ia = interaction();
    if (!ia) return;
    if ((e.target as Element | null)?.closest?.("button")) return;
    const p = local(e);
    pointers.set(e.pointerId, p);
    stage.setPointerCapture?.(e.pointerId);
    viewTween = null;
    if (pointers.size === 2 && (ia.zoom || ia.pan)) {
      const { distance, center } = pinchInfo();
      drag = {
        mode: "pinch",
        index: -1,
        origin: center,
        view: [k, tx, ty],
        offset: [0, 0],
        distance,
        moved: true,
        button: 0,
      };
      return;
    }
    if (pointers.size > 1) return;
    const i = e.button === 0 ? pickNode(p.x, p.y) : -1;
    const base = {
      origin: p,
      view: [k, tx, ty] as [number, number, number],
      distance: 0,
      moved: false,
      button: e.button,
    };
    if (i >= 0 && ia.drag) {
      drag = {
        ...base,
        mode: "node",
        index: i,
        offset: [(p.x - tx) / k - X[i], (p.y - ty) / k - Y[i]],
      };
    } else {
      drag = { ...base, mode: "pan", index: i, offset: [0, 0] };
    }
    if (e.button === 1) e.preventDefault();
  };

  const onPointerMove = (e: PointerEvent) => {
    const p = local(e);
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, p);
    if (!drag) {
      if (e.pointerType === "touch" && pointers.size) return;
      scheduleHover(p.x, p.y);
      return;
    }
    const ia = interaction();
    if (!ia) return;
    if (drag.mode === "pinch") {
      const { distance, center } = pinchInfo();
      const [k0, x0, y0] = drag.view;
      const [lo, hi] = zoomLimits();
      const scale = ia.zoom && drag.distance > 0 ? distance / drag.distance : 1;
      const nk = Math.max(lo, Math.min(hi, k0 * scale));
      const ratio = nk / k0;
      const ox = drag.origin.x;
      const oy = drag.origin.y;
      const nx = ia.pan ? center.x : ox;
      const ny = ia.pan ? center.y : oy;
      k = nk;
      tx = nx - (ox - x0) * ratio;
      ty = ny - (oy - y0) * ratio;
      userMoved = true;
      sceneDirty = true;
      invalidate();
      return;
    }
    const dx = p.x - drag.origin.x;
    const dy = p.y - drag.origin.y;
    if (!drag.moved && Math.hypot(dx, dy) < 3) return;
    if (!drag.moved) {
      drag.moved = true;
      if (hover) setHover(null);
      stage.style.cursor = drag.mode === "node" ? "grabbing" : "grabbing";
    }
    if (drag.mode === "node") {
      const i = drag.index;
      // the node stays under the pointer: stop following the layout
      followLayout = false;
      const wx = (p.x - tx) / k - drag.offset[0];
      const wy = (p.y - ty) / k - drag.offset[1];
      if (runner) runner.drag(i, wx, wy);
      else if (layoutType === "force") {
        // the simulation has finished: warm it up again from the current positions
        const prev = snapshot();
        startForceFrom(prev);
        (runner as ForceRunner | null)?.drag(i, wx, wy);
      }
      X[i] = TX[i] = wx;
      Y[i] = TY[i] = wy;
      pathsDirty = true;
      invalidate();
      return;
    }
    if (!ia.pan) return;
    const [k0, x0, y0] = drag.view;
    k = k0;
    tx = x0 + dx;
    ty = y0 + dy;
    userMoved = true;
    sceneDirty = true;
    invalidate();
  };

  const startForceFrom = (prev: Map<string, Snapshot>) => {
    stopRunner();
    // a drag warms the layout up again: the view stays where it is
    startForce(prev, false);
  };

  const onPointerUp = (e: PointerEvent) => {
    const was = drag;
    pointers.delete(e.pointerId);
    if (stage.hasPointerCapture?.(e.pointerId))
      stage.releasePointerCapture(e.pointerId);
    if (pointers.size) {
      if (was?.mode === "pinch") drag = null;
      return;
    }
    drag = null;
    stage.style.cursor = interaction()?.pan ? "grab" : "default";
    if (!was) return;
    if (was.mode === "node" && was.moved) {
      runner?.release(was.index, !!model.nodes[was.index].fixed);
      return;
    }
    if (was.moved || was.button !== 0) return;
    const p = local(e);
    const hit = pickAt(p.x, p.y);
    handleClick(hit, e.ctrlKey || e.metaKey || e.shiftKey);
  };

  const handleClick = (hit: Hit | null, additive: boolean) => {
    if (!hit) {
      if (selection.size && interaction()?.select)
        setSelection(new Set(), true);
      return;
    }
    const event = hoverEvent(hit);
    emit("click", event);
    if (hit.type !== "node") return;
    const i = hit.index;
    if (collapsible() && tree?.children[i]?.length)
      setCollapsed(i, hasVisibleChild(i), true);
    selectNode(i, additive);
  };

  const onPointerCancel = (e: PointerEvent) => {
    pointers.delete(e.pointerId);
    if (!pointers.size) {
      if (drag?.mode === "node")
        runner?.release(drag.index, !!model.nodes[drag.index].fixed);
      drag = null;
    }
  };

  const onPointerLeave = () => {
    pendingHover = null;
    if (!drag && hover) setHover(null);
  };

  let hintTimer: ReturnType<typeof setTimeout> | 0 = 0;
  const showHint = () => {
    const mac = /Mac|iPhone|iPad/.test(win?.navigator?.platform ?? "");
    dom.hint.textContent = fill(loc.labels.zoomHint, {
      key: mac ? "⌘" : "Ctrl",
    });
    dom.hint.style.opacity = "1";
    if (hintTimer) clearTimeout(hintTimer);
    hintTimer = setTimeout(() => {
      hintTimer = 0;
      dom.hint.style.opacity = "0";
    }, 1200);
  };

  const onWheel = (e: WheelEvent) => {
    const ia = interaction();
    if (!ia?.zoom) return;
    const pinch = e.ctrlKey && !e.metaKey;
    if (ia.wheel === "modifier" && !e.ctrlKey && !e.metaKey) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) showHint();
      return;
    }
    e.preventDefault();
    const p = local(e);
    viewTween = null;
    zoomAround(1 / wheelFactor(e.deltaY, e.deltaMode, pinch), p.x, p.y);
    if (hover) setHover(null);
  };

  const onDoubleClick = (e: MouseEvent) => {
    if (!interaction()) return;
    const p = local(e);
    if (pickNode(p.x, p.y) >= 0) return;
    e.preventDefault();
    instance.fit(true);
  };

  const onFocus = () => {
    let keyboard: boolean;
    try {
      keyboard = stage.matches(":focus-visible");
    } catch {
      keyboard = true;
    }
    focusVisible = keyboard;
    if (keyboard)
      stage.style.boxShadow = "0 0 0 2px var(--primary-color, #4f46e5)";
  };

  const onBlur = () => {
    stage.style.boxShadow = "";
    focusVisible = false;
    if (focusIndex >= 0) {
      focusIndex = -1;
      renderTooltip();
      sceneDirty = true;
      invalidate();
    }
  };

  const drawnNodes = () => {
    const list: number[] = [];
    for (let i = 0; i < model.n; i++)
      if (fade(i) > 0 && !(tween && !visible[i])) list.push(i);
    return list;
  };

  const setFocus = (i: number) => {
    if (i === focusIndex) return;
    focusIndex = i;
    focusVisible = true;
    sceneDirty = true;
    // keep it in view
    const sx = screenX(i);
    const sy = screenY(i);
    const margin = 40;
    if (
      sx < margin ||
      sy < margin ||
      sx > width - margin ||
      sy > height - margin
    ) {
      setView([k, tx + width / 2 - sx, ty + height / 2 - sy], true);
    }
    const g = model.groupOf[i];
    const degree = model.inDegree[i] + model.outDegree[i];
    dom.live.textContent =
      g >= 0
        ? fill(loc.labels.nodeFocusGroup, {
            name: labelOf(model, i),
            group: model.groups[g].name,
            degree: loc.count(degree),
          })
        : fill(loc.labels.nodeFocus, {
            name: labelOf(model, i),
            degree: loc.count(degree),
          });
    renderTooltip();
    invalidate();
    emit("hover", hoverEvent({ type: "node", index: i }));
  };

  /** Closest node in a direction (screen space) */
  const neighborInDirection = (
    from: number,
    dx: number,
    dy: number,
  ): number => {
    const sx = screenX(from);
    const sy = screenY(from);
    let best = -1;
    let bestScore = Infinity;
    for (const i of drawnNodes()) {
      if (i === from) continue;
      const vx = screenX(i) - sx;
      const vy = screenY(i) - sy;
      const along = vx * dx + vy * dy;
      if (along <= 0.5) continue;
      const across = Math.abs(vx * dy - vy * dx);
      if (across > along * 2.5) continue;
      const score = along + across * 2;
      if (score < bestScore) {
        bestScore = score;
        best = i;
      }
    }
    return best;
  };

  const startingNode = () => {
    const first = [...selection].find((i) => fade(i) > 0);
    if (first !== undefined) return first;
    for (const i of model.rank) if (fade(i) > 0) return i;
    return -1;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const ia = interaction();
    if (!ia?.keyboard) return;
    const dirs: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    };
    const dir = dirs[e.key];
    if (dir) {
      e.preventDefault();
      if (focusIndex < 0 || fade(focusIndex) <= 0) {
        const start = startingNode();
        if (start >= 0) setFocus(start);
        return;
      }
      const next = neighborInDirection(focusIndex, dir[0], dir[1]);
      if (next >= 0) setFocus(next);
      return;
    }
    switch (e.key) {
      case "Enter":
      case " ":
        if (focusIndex < 0) return;
        e.preventDefault();
        if (
          e.key === "Enter" &&
          collapsible() &&
          tree?.children[focusIndex]?.length
        )
          setCollapsed(focusIndex, hasVisibleChild(focusIndex), true);
        emit("click", hoverEvent({ type: "node", index: focusIndex }));
        selectNode(focusIndex, e.ctrlKey || e.metaKey || e.key === " ");
        return;
      case "+":
      case "=":
        if (!ia.zoom) return;
        e.preventDefault();
        zoomAround(KEY_ZOOM, width / 2, height / 2, true);
        return;
      case "-":
      case "_":
        if (!ia.zoom) return;
        e.preventDefault();
        zoomAround(1 / KEY_ZOOM, width / 2, height / 2, true);
        return;
      case "0":
      case "Home":
        e.preventDefault();
        instance.fit(true);
        return;
      case "Escape": {
        const had = focusIndex >= 0 || selection.size > 0 || !!hover;
        if (!had) return;
        e.preventDefault();
        focusIndex = -1;
        if (hover) setHover(null);
        setSelection(new Set(), true);
        renderTooltip();
        sceneDirty = true;
        invalidate();
        return;
      }
      default:
    }
  };

  const onZoomIn = () => zoomAround(BUTTON_ZOOM, width / 2, height / 2, true);
  const onZoomOut = () =>
    zoomAround(1 / BUTTON_ZOOM, width / 2, height / 2, true);
  const onFit = () => instance.fit(true);

  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerup", onPointerUp);
  stage.addEventListener("pointercancel", onPointerCancel);
  stage.addEventListener("pointerleave", onPointerLeave);
  stage.addEventListener("wheel", onWheel, { passive: false });
  stage.addEventListener("dblclick", onDoubleClick);
  stage.addEventListener("keydown", onKeyDown);
  stage.addEventListener("focus", onFocus);
  stage.addEventListener("blur", onBlur);
  dom.zoomIn.addEventListener("click", onZoomIn);
  dom.zoomOut.addEventListener("click", onZoomOut);
  dom.fit.addEventListener("click", onFit);

  // ----------------------------------------------------------- watchers

  const resizeObserver =
    typeof ResizeObserver === "function"
      ? new ResizeObserver(() => invalidate())
      : null;
  resizeObserver?.observe(stage);

  const refreshTheme = () => {
    if (destroyed) return;
    const next = readTheme(dom.root, options.palette);
    const fontChanged = next.fontFamily !== theme.fontFamily;
    if (!themeColorsChanged(theme, next) && !fontChanged) return;
    theme = next;
    if (fontChanged) {
      runLayout(snapshot(), false);
      return;
    }
    refreshColors();
    legendKey = "";
    renderLegend();
    highlightKey = "";
    invalidate();
  };
  const unwatchTheme = watchTheme(refreshTheme);

  const unwatchLocale = watchLocale(() => {
    if (destroyed || resolveLocale(options.locale) === loc.locale) return;
    loc = graphLocale(options.locale, options.labels);
    updateAccessibility();
    if (hover || focusIndex >= 0) renderTooltip();
  });

  // ----------------------------------------------------------- renderer

  const initRenderer = async (exclude: Set<ChartRendererKind> = new Set()) => {
    const token = ++rendererToken;
    const next = await createRenderer(
      options.renderer ?? "auto",
      () => {
        const canvas = style(doc.createElement("canvas"), {
          position: "absolute",
          left: "0",
          top: "0",
          pointerEvents: "none",
        });
        canvas.setAttribute("aria-hidden", "true");
        canvas.className = "minerva-chart-data";
        return canvas;
      },
      (kind) => {
        if (destroyed || renderer?.kind !== kind) return;
        renderer.destroy();
        renderer.canvas.remove();
        renderer = null;
        void initRenderer(new Set([...exclude, kind]));
      },
      exclude,
    );
    if (destroyed || token !== rendererToken) {
      next?.destroy();
      return;
    }
    if (renderer) {
      renderer.destroy();
      renderer.canvas.remove();
    }
    renderer = next;
    sceneDirty = true;
    if (next) {
      dom.root.dataset.renderer = next.kind;
      stage.insertBefore(next.canvas, dom.foreground);
      emit("renderer", next.kind);
    } else {
      delete dom.root.dataset.renderer;
    }
    resolveReady(next?.kind ?? null);
    invalidate();
  };

  // ---------------------------------------------------------- startup

  const initialState = (o: GraphChartOptions) => {
    collapsedIds.clear();
    for (const node of o.nodes ?? [])
      if (node?.collapsed) collapsedIds.add(node.id);
    hiddenGroups.clear();
    for (const g of o.groups ?? []) if (g?.hidden) hiddenGroups.add(g.id);
  };

  const applySelectedOption = () => {
    if (!options.selected) return;
    const next = new Set<number>();
    for (const id of options.selected) {
      const i = model.index.get(id);
      if (i !== undefined) next.add(i);
    }
    selection.clear();
    next.forEach((i) => selection.add(i));
    highlightKey = "";
    sceneDirty = true;
  };

  initialState(options);
  runLayout(new Map(), false);
  applySelectedOption();
  void initRenderer();
  const unfollowDefault = followDefaultRenderer(
    () => options.renderer,
    () => void initRenderer(),
  );

  // ---------------------------------------------------------------- api

  const replaceData = (next: GraphChartOptions, dataChanged: boolean) => {
    const prev = snapshot();
    const ids = [...selection].map((i) => model.nodes[i].id);
    const focusId = focusIndex >= 0 ? model.nodes[focusIndex].id : null;
    if (dataChanged) {
      // collapsed / hidden flags of the new data
      for (const node of next.nodes ?? [])
        if (node?.collapsed) collapsedIds.add(node.id);
      model = buildModel(next.nodes ?? [], next.edges ?? [], next.groups);
      for (const g of next.groups ?? []) if (g?.hidden) hiddenGroups.add(g.id);
      selection.clear();
      for (const id of ids) {
        const i = model.index.get(id);
        if (i !== undefined) selection.add(i);
      }
      focusIndex = focusId !== null ? (model.index.get(focusId) ?? -1) : -1;
      hover = null;
      dom.tooltip.style.display = "none";
    }
    runLayout(prev, true);
  };

  const instance: GraphChartInstance = {
    setOptions(next) {
      if (destroyed) return;
      const previous = options;
      options = next;
      if ((next.palette ?? []).join() !== (previous.palette ?? []).join()) {
        theme = readTheme(dom.root, next.palette);
      }
      if (next.locale !== previous.locale || next.labels !== previous.labels) {
        loc = graphLocale(next.locale, next.labels);
      }
      const dataChanged =
        next.nodes !== previous.nodes ||
        next.edges !== previous.edges ||
        next.groups !== previous.groups;
      const sig = layoutSignature(next);
      if (dataChanged || sig !== layoutSig) {
        layoutSig = sig;
        replaceData(next, dataChanged);
      } else {
        refreshCritical();
        refreshColors();
        pathsDirty = true;
        highlightKey = "";
        legendKey = "";
        renderLegend();
        updateAccessibility();
        invalidate();
      }
      if (
        (next.selected ?? []).join("\u0001") !==
        (previous.selected ?? []).join("\u0001")
      )
        applySelectedOption();
      if ((next.renderer ?? "auto") !== (previous.renderer ?? "auto"))
        void initRenderer();
    },
    setData(data) {
      if (destroyed) return;
      instance.setOptions({
        ...options,
        nodes: data.nodes,
        edges: data.edges,
        groups: data.groups ?? options.groups,
      });
    },
    fit(animate = true) {
      if (destroyed) return;
      userMoved = false;
      // keep the view fitted while the layout still moves
      if (runner?.running()) followLayout = true;
      const target = fitView();
      if (target) setView(target, animate);
      else needsFit = true;
      invalidate();
    },
    focusNode(id, opts = {}) {
      if (destroyed) return;
      let i = model.index.get(id);
      if (i === undefined) return;
      // expand the collapsed ancestors first
      if (tree && !visible[i]) {
        let changed = false;
        for (let a = tree.parent[i]; a >= 0; a = tree.parent[a]) {
          if (collapsedIds.delete(model.nodes[a].id)) changed = true;
        }
        if (changed) runLayout(snapshot(), opts.animate !== false);
        i = model.index.get(id)!;
      }
      const kk = opts.zoom ?? Math.max(k, 1);
      const [lo, hi] = zoomLimits();
      const nk = Math.max(lo, Math.min(hi, kk));
      userMoved = true;
      const w = width || stage.clientWidth;
      const h = height || stage.clientHeight;
      setView(
        [nk, w / 2 - TX[i] * nk, h / 2 - TY[i] * nk],
        opts.animate !== false,
      );
      focusIndex = i;
      highlightKey = "";
      sceneDirty = true;
      invalidate();
    },
    select(ids) {
      if (destroyed) return;
      const list = ids === null ? [] : typeof ids === "string" ? [ids] : ids;
      const next = new Set<number>();
      for (const id of list) {
        const i = model.index.get(id);
        if (i !== undefined) next.add(i);
      }
      setSelection(next, true);
    },
    getSelection: () => [...selection].map((i) => model.nodes[i].id),
    expand(id) {
      if (destroyed) return;
      if (id === undefined) {
        if (!collapsedIds.size) return;
        const ids = [...collapsedIds];
        collapsedIds.clear();
        runLayout(snapshot(), true);
        for (const c of ids) {
          if (model.index.has(c)) emit("toggle", { id: c, collapsed: false });
        }
        return;
      }
      const i = model.index.get(id);
      if (i !== undefined) setCollapsed(i, false, true);
      else collapsedIds.delete(id);
    },
    collapse(id) {
      if (destroyed) return;
      if (id === undefined) {
        if (!tree) return;
        const changed: string[] = [];
        tree.children.forEach((list, i) => {
          const nodeId = model.nodes[i].id;
          if (
            list.length &&
            tree!.parent[i] >= 0 &&
            !collapsedIds.has(nodeId)
          ) {
            collapsedIds.add(nodeId);
            changed.push(nodeId);
          }
        });
        if (!changed.length) return;
        runLayout(snapshot(), true);
        for (const c of changed) emit("toggle", { id: c, collapsed: true });
        return;
      }
      const i = model.index.get(id);
      if (i !== undefined) setCollapsed(i, true, true);
    },
    toggle(id) {
      const i = model.index.get(id);
      if (i === undefined || destroyed) return;
      setCollapsed(i, hasVisibleChild(i), true);
    },
    getPositions() {
      const out: Record<string, GraphPoint> = {};
      for (let i = 0; i < model.n; i++) {
        out[model.nodes[i].id] = { x: TX[i], y: TY[i] };
      }
      return out;
    },
    relayout() {
      if (destroyed) return;
      runLayout(layoutType === "force" ? new Map() : snapshot(), true);
    },
    resize() {
      invalidate();
    },
    getRenderer: () => renderer?.kind ?? null,
    ready,
    refreshTheme,
    on(type, listener) {
      let set = listeners.get(type);
      if (!set) {
        set = new Set();
        listeners.set(type, set);
      }
      set.add(listener as (e: never) => void);
      return () => {
        set.delete(listener as (e: never) => void);
      };
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      rendererToken++;
      if (frameId) win?.cancelAnimationFrame(frameId);
      if (hoverFrame) win?.cancelAnimationFrame(hoverFrame);
      if (hintTimer) clearTimeout(hintTimer);
      frameId = 0;
      hoverFrame = 0;
      stopRunner();
      resizeObserver?.disconnect();
      unfollowDefault();
      unwatchTheme();
      unwatchLocale();
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerCancel);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("dblclick", onDoubleClick);
      stage.removeEventListener("keydown", onKeyDown);
      stage.removeEventListener("focus", onFocus);
      stage.removeEventListener("blur", onBlur);
      dom.zoomIn.removeEventListener("click", onZoomIn);
      dom.zoomOut.removeEventListener("click", onZoomOut);
      dom.fit.removeEventListener("click", onFit);
      renderer?.destroy();
      renderer = null;
      listeners.clear();
      resolveReady(null);
      dom.root.remove();
    },
  };
  return instance;
};

function isDark(theme: ChartTheme): boolean {
  return luminance(theme.background) < 0.4 || luminance(theme.text) > 0.6;
}
