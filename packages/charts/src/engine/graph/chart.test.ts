import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createGraphChart } from "./chart";
import { forceInit } from "./force";
import type {
  GraphChartInstance,
  GraphChartOptions,
  GraphEdge,
  GraphHoverEvent,
  GraphNode,
} from "./types";
import { createForceRunner, forceWorkerSource } from "./worker";

const WIDTH = 800;
const HEIGHT = 400;

let container: HTMLDivElement;
let chart: GraphChartInstance | null = null;
let calls: Record<string, number>;
let texts: string[];
/** Circles (x, y, r) of each 2D context since its last clear */
let arcLists: [number, number, number][][];
/** Width of the circles of every finished frame (recorded when cleared) */
let frameWidths: number[];

const widthOf = (arcs: readonly [number, number, number][]) => {
  let x0 = Infinity;
  let x1 = -Infinity;
  for (const [x, , r] of arcs) {
    x0 = Math.min(x0, x - r);
    x1 = Math.max(x1, x + r);
  }
  return x1 - x0;
};

/** A 2D context recording its calls (happy-dom has no canvas) */
const fakeContext = () => {
  let arcs: [number, number, number][] = [];
  arcLists.push(arcs);
  return new Proxy({} as Record<string | symbol, unknown>, {
    get(target, key) {
      if (key in target) return target[key];
      if (key === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      if (key === "createLinearGradient") return () => ({ addColorStop() {} });
      if (key === "fillText")
        return (text: string) => {
          texts.push(text);
          calls.fillText = (calls.fillText ?? 0) + 1;
        };
      if (key === "clearRect")
        return () => {
          if (arcs.length) frameWidths.push(widthOf(arcs));
          arcLists.splice(arcLists.indexOf(arcs), 1, (arcs = []));
        };
      if (key === "arc")
        return (x: number, y: number, r: number) => {
          arcs.push([x, y, r]);
          calls.arc = (calls.arc ?? 0) + 1;
        };
      return () => {
        calls[String(key)] = (calls[String(key)] ?? 0) + 1;
      };
    },
    set(target, key, value) {
      target[key] = value;
      return true;
    },
  }) as unknown as CanvasRenderingContext2D;
};

/** Screen box of the circles drawn in the last frame (the data layer) */
const drawnBox = () => {
  const arcs = arcLists.reduce((a, b) => (b.length > a.length ? b : a), []);
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const [x, y, r] of arcs) {
    x0 = Math.min(x0, x - r);
    y0 = Math.min(y0, y - r);
    x1 = Math.max(x1, x + r);
    y1 = Math.max(y1, y + r);
  }
  return { w: x1 - x0, h: y1 - y0, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 };
};

const nextFrame = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => setTimeout(resolve, 0)),
  );

const flush = async (frames = 2) => {
  for (let i = 0; i < frames; i++) await nextFrame();
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const last = <T>(list: readonly T[]): T | undefined => list[list.length - 1];

const mount = async (options: GraphChartOptions) => {
  chart = createGraphChart(container, options);
  await chart.ready;
  await flush(2);
  return chart;
};

const stage = () =>
  container.querySelector<HTMLDivElement>(".minerva-chart-stage")!;

const pointer = (
  type: string,
  x: number,
  y: number,
  init: PointerEventInit = {},
) =>
  stage().dispatchEvent(
    new PointerEvent(type, {
      clientX: x,
      clientY: y,
      bubbles: true,
      pointerId: 1,
      button: 0,
      pointerType: "mouse",
      ...init,
    }),
  );

const key = (k: string, init: KeyboardEventInit = {}) =>
  stage().dispatchEvent(
    new KeyboardEvent("keydown", { key: k, bubbles: true, ...init }),
  );

/**
 * Free layout fitted in 800 × 400 without labels and padding: nodes span
 * (0, 0)–(400, 200), circles of 12 → zoom 1.6, offset (80, 40)
 */
const freeNodes: GraphNode[] = [
  { id: "a", x: 0, y: 0, group: "g1", label: "Alpha", value: 3 },
  { id: "b", x: 400, y: 0, group: "g1", label: "Beta" },
  { id: "c", x: 400, y: 200, group: "g2", label: "Gamma", subtitle: "third" },
  { id: "d", x: 0, y: 200, group: "g2" },
];
const freeEdges: GraphEdge[] = [
  { source: "a", target: "b", label: "knows", value: 2 },
  { source: "b", target: "c", directed: true },
  { source: "c", target: "d", dashed: true, value: 4 },
];
const screen = (x: number, y: number): [number, number] => [
  x * 1.6 + 80,
  y * 1.6 + 40,
];

const freeOptions = (
  extra: Partial<GraphChartOptions> = {},
): GraphChartOptions => ({
  nodes: freeNodes,
  edges: freeEdges,
  layout: "none",
  nodeLabels: false,
  fitPadding: 0,
  nodeSize: 12,
  animation: false,
  ...extra,
});

const treeData = () => {
  const nodes: GraphNode[] = [
    { id: "root", label: "Root", subtitle: "CEO" },
    { id: "a", label: "A", subtitle: "VP" },
    { id: "b", label: "B" },
    { id: "a1", label: "A1" },
    { id: "a2", label: "A2", collapsed: true },
    { id: "a2x", label: "A2x" },
    { id: "b1", label: "B1" },
  ];
  const edges: GraphEdge[] = [
    { source: "root", target: "a" },
    { source: "root", target: "b" },
    { source: "a", target: "a1" },
    { source: "a", target: "a2" },
    { source: "a2", target: "a2x" },
    { source: "b", target: "b1" },
  ];
  return { nodes, edges };
};

beforeEach(() => {
  calls = {};
  texts = [];
  arcLists = [];
  frameWidths = [];
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(WIDTH);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(
    HEIGHT,
  );
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(((
    kind: string,
  ) =>
    kind === "2d"
      ? fakeContext()
      : null) as unknown as HTMLCanvasElement["getContext"]);
  container = document.createElement("div");
  document.body.appendChild(container);
  document.documentElement.lang = "en";
});

afterEach(() => {
  chart?.destroy();
  chart = null;
  container.remove();
  document.documentElement.lang = "";
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("createGraphChart", () => {
  it("mounts an accessible chart drawn with the fallback backend", async () => {
    const renderers: string[] = [];
    chart = createGraphChart(container, freeOptions());
    chart.on("renderer", (r) => renderers.push(r));
    expect(await chart.ready).toBe("canvas2d");
    await flush();
    expect(renderers).toEqual(["canvas2d"]);
    expect(chart.getRenderer()).toBe("canvas2d");
    const root = container.querySelector<HTMLDivElement>(
      ".minerva-chart-graph",
    )!;
    expect(root.dataset.renderer).toBe("canvas2d");
    expect(stage().getAttribute("aria-roledescription")).toBe("Network graph");
    expect(stage().tabIndex).toBe(0);
    const summary = document.getElementById(
      stage().getAttribute("aria-describedby")!,
    )!;
    expect(summary.textContent).toContain("4 nodes, 3 links.");
    expect(summary.textContent).toContain("Groups: g1, g2.");
    // nodes (arc) and edges (lineTo) were drawn
    expect(calls.arc ?? 0).toBeGreaterThan(3);
    expect(calls.lineTo ?? 0).toBeGreaterThan(2);
    // legend with the two groups
    const buttons = root.querySelectorAll<HTMLButtonElement>(
      ".minerva-chart-legend button",
    );
    expect(buttons.length).toBe(2);
    // zoom controls are labeled
    const controls = root.querySelectorAll(".minerva-chart-controls button");
    expect(controls[2].getAttribute("aria-label")).toBe("Fit to view");
  });

  it("reports positions, hovers nodes and edges, and shows tooltips", async () => {
    const c = await mount(freeOptions({ edgeLabels: true }));
    expect(c.getPositions().c).toEqual({ x: 400, y: 200 });
    const hovers: (GraphHoverEvent | null)[] = [];
    c.on("hover", (e) => hovers.push(e));
    pointer("pointermove", ...screen(400, 200));
    await flush();
    expect(last(hovers)?.id).toBe("c");
    expect(last(hovers)?.clientX).toBeCloseTo(720);
    const tooltip = container.querySelector<HTMLDivElement>(
      ".minerva-chart-tooltip",
    )!;
    expect(tooltip.style.display).toBe("block");
    expect(tooltip.textContent).toContain("Gamma");
    expect(tooltip.textContent).toContain("third");
    expect(tooltip.textContent).toContain("g2");
    // edge between a and b
    pointer("pointermove", ...screen(200, 0));
    await flush();
    expect(last(hovers)?.type).toBe("edge");
    expect(last(hovers)?.id).toBe("a→b");
    expect(tooltip.textContent).toContain("knows");
    expect(tooltip.textContent).toContain("Alpha — Beta");
    // background
    pointer("pointermove", ...screen(200, 100));
    await flush();
    expect(last(hovers)).toBeNull();
    expect(tooltip.style.display).toBe("none");
    pointer("pointermove", ...screen(0, 0));
    await flush();
    stage().dispatchEvent(new PointerEvent("pointerleave"));
    expect(last(hovers)).toBeNull();
    // edge labels are drawn
    expect(texts).toContain("knows");
  });

  it("selects with clicks, ctrl + click and the background", async () => {
    const c = await mount(freeOptions());
    const selections: string[][] = [];
    const clicks: string[] = [];
    c.on("select", (e) => selections.push(e.ids));
    c.on("click", (e) => clicks.push(e.id));
    const click = (x: number, y: number, init: PointerEventInit = {}) => {
      pointer("pointerdown", x, y, init);
      pointer("pointerup", x, y, init);
    };
    click(...screen(0, 0));
    expect(last(selections)).toEqual(["a"]);
    click(...screen(400, 0), { ctrlKey: true });
    expect(last(selections)).toEqual(["a", "b"]);
    click(...screen(400, 0), { ctrlKey: true });
    expect(last(selections)).toEqual(["a"]);
    expect(c.getSelection()).toEqual(["a"]);
    click(...screen(200, 0));
    expect(clicks).toEqual(["a", "b", "b", "a→b"]);
    click(...screen(200, 100));
    expect(last(selections)).toEqual([]);
    c.select("d");
    expect(c.getSelection()).toEqual(["d"]);
    c.select(["a", "nope"]);
    expect(c.getSelection()).toEqual(["a"]);
    c.select(null);
    expect(c.getSelection()).toEqual([]);
    await flush();
  });

  it("pans, zooms with the wheel, pinches, and fits again", async () => {
    const c = await mount(freeOptions({ interaction: { wheel: "always" } }));
    const before = c.getPositions();
    // drag the background
    pointer("pointerdown", 400, 200);
    pointer("pointermove", 450, 220);
    pointer("pointerup", 450, 220);
    await flush();
    const hovers: (GraphHoverEvent | null)[] = [];
    c.on("hover", (e) => hovers.push(e));
    // node a moved by (50, 20) on screen
    pointer(
      "pointermove",
      ...(screen(0, 0).map((v, i) => v + (i ? 20 : 50)) as [number, number]),
    );
    await flush();
    expect(last(hovers)?.id).toBe("a");
    // wheel zoom keeps the point under the pointer
    stage().dispatchEvent(
      new WheelEvent("wheel", {
        deltaY: -100,
        clientX: 130,
        clientY: 60,
        cancelable: true,
      }),
    );
    stage().dispatchEvent(
      new WheelEvent("wheel", {
        deltaY: 3,
        deltaMode: 1,
        clientX: 130,
        clientY: 60,
        ctrlKey: true,
        cancelable: true,
      }),
    );
    stage().dispatchEvent(
      new WheelEvent("wheel", {
        deltaY: 1,
        deltaMode: 2,
        clientX: 130,
        clientY: 60,
        cancelable: true,
      }),
    );
    await flush();
    // pinch with two touch pointers
    pointer("pointerdown", 300, 200, { pointerId: 1, pointerType: "touch" });
    pointer("pointerdown", 500, 200, { pointerId: 2, pointerType: "touch" });
    pointer("pointermove", 550, 200, { pointerId: 2, pointerType: "touch" });
    pointer("pointerup", 550, 200, { pointerId: 2, pointerType: "touch" });
    pointer("pointercancel", 300, 200, { pointerId: 1, pointerType: "touch" });
    await flush();
    // fit restores the initial view
    c.fit(false);
    await flush();
    hovers.length = 0;
    pointer("pointermove", ...screen(400, 200));
    await flush();
    expect(last(hovers)?.id).toBe("c");
    expect(c.getPositions()).toEqual(before);
    // double click on the background fits (animated)
    stage().dispatchEvent(
      new MouseEvent("dblclick", { clientX: 10, clientY: 10, bubbles: true }),
    );
    await flush(3);
  });

  it("shows a hint for plain wheel events and zooms with the buttons", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    try {
      chart = createGraphChart(container, freeOptions());
      const hint = container.querySelector<HTMLDivElement>(
        ".minerva-chart-hint",
      )!;
      stage().dispatchEvent(
        new WheelEvent("wheel", { deltaY: 50, cancelable: true }),
      );
      expect(hint.style.opacity).toBe("1");
      expect(hint.textContent).toMatch(/(Ctrl|⌘) \+ scroll to zoom/);
      stage().dispatchEvent(
        new WheelEvent("wheel", { deltaY: 50, cancelable: true }),
      );
      vi.advanceTimersByTime(1300);
      expect(hint.style.opacity).toBe("0");
    } finally {
      vi.useRealTimers();
    }
    await chart.ready;
    await flush();
    const buttons = container.querySelectorAll<HTMLButtonElement>(
      ".minerva-chart-controls button",
    );
    buttons[0].click();
    buttons[1].click();
    buttons[2].click();
    // pointer down on a button does not start a pan
    buttons[0].dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        clientX: 1,
        clientY: 1,
      }),
    );
    await flush(3);
  });

  it("drags nodes of the free layout", async () => {
    const c = await mount(freeOptions());
    pointer("pointerdown", ...screen(0, 0));
    pointer("pointermove", ...screen(50, 50));
    pointer("pointermove", ...screen(100, 100));
    pointer("pointerup", ...screen(100, 100));
    await flush();
    const p = c.getPositions().a;
    expect(p.x).toBeCloseTo(100);
    expect(p.y).toBeCloseTo(100);
  });

  it("toggles groups from the legend", async () => {
    const c = await mount(freeOptions());
    const toggles: { group: string; hidden: boolean }[] = [];
    c.on("groupToggle", (e) => toggles.push(e));
    c.select("c");
    const buttons = container.querySelectorAll<HTMLButtonElement>(
      ".minerva-chart-legend button",
    );
    buttons[1].click();
    expect(toggles).toEqual([{ group: "g2", hidden: true }]);
    expect(c.getSelection()).toEqual([]);
    const live = container.querySelector<HTMLDivElement>("[aria-live]")!;
    expect(live.textContent).toBe("g2: hidden");
    await flush();
    // hidden nodes cannot be hovered
    const hovers: (GraphHoverEvent | null)[] = [];
    c.on("hover", (e) => hovers.push(e));
    pointer("pointermove", ...screen(400, 200));
    await flush();
    expect(last(hovers)?.id ?? null).not.toBe("c");
    const again = container.querySelectorAll<HTMLButtonElement>(
      ".minerva-chart-legend button",
    );
    expect(again[1].getAttribute("aria-pressed")).toBe("false");
    again[1].click();
    expect(last(toggles)).toEqual({ group: "g2", hidden: false });
    await flush();
  });

  it("navigates with the keyboard", async () => {
    const c = await mount(freeOptions());
    const hovers: (GraphHoverEvent | null)[] = [];
    const selections: string[][] = [];
    c.on("hover", (e) => hovers.push(e));
    c.on("select", (e) => selections.push(e.ids));
    stage().dispatchEvent(new FocusEvent("focus"));
    key("ArrowRight");
    // starts at the most important node (value)
    expect(last(hovers)?.id).toBe("a");
    key("ArrowRight");
    expect(last(hovers)?.id).toBe("b");
    key("ArrowDown");
    expect(last(hovers)?.id).toBe("c");
    key("ArrowLeft");
    expect(last(hovers)?.id).toBe("d");
    key("ArrowUp");
    expect(last(hovers)?.id).toBe("a");
    key("ArrowUp");
    expect(last(hovers)?.id).toBe("a");
    const live = container.querySelector<HTMLDivElement>("[aria-live]")!;
    expect(live.textContent).toBe("Alpha (g1), 1 links");
    const tooltip = container.querySelector<HTMLDivElement>(
      ".minerva-chart-tooltip",
    )!;
    expect(tooltip.style.display).toBe("block");
    key("Enter");
    expect(last(selections)).toEqual(["a"]);
    key(" ");
    expect(last(selections)).toEqual([]);
    key("+");
    key("-");
    key("0");
    key("x");
    await flush();
    key("Escape");
    key("Escape");
    stage().dispatchEvent(new FocusEvent("blur"));
    await flush();
  });

  it("follows the locale and its overrides", async () => {
    const c = await mount(
      freeOptions({ locale: "zh-CN", labels: { fit: "适配" } }),
    );
    expect(stage().getAttribute("aria-roledescription")).toBe("关系图");
    expect(
      container
        .querySelector(".minerva-chart-controls button:last-child")!
        .getAttribute("aria-label"),
    ).toBe("适配");
    c.setOptions(freeOptions({ locale: undefined }));
    expect(stage().getAttribute("aria-roledescription")).toBe("Network graph");
    document.documentElement.lang = "fr";
    await flush();
    expect(stage().getAttribute("aria-roledescription")).toBe(
      "Graphe de relations",
    );
  });

  it("runs the force layout to the end and drags a node", async () => {
    const nodes: GraphNode[] = Array.from({ length: 30 }, (_, i) => ({
      id: `n${i}`,
      group: i < 15 ? "x" : "y",
      value: i,
    }));
    nodes[0] = { ...nodes[0], x: 0, y: 0, fixed: true };
    const edges: GraphEdge[] = Array.from({ length: 29 }, (_, i) => ({
      source: `n${Math.floor(i / 3)}`,
      target: `n${i + 1}`,
      label: i < 3 ? "rel" : undefined,
    }));
    const ends: string[] = [];
    chart = createGraphChart(container, {
      nodes,
      edges,
      force: { iterations: 20 },
      edgeColor: "source",
      legend: { position: "bottom", toggle: false },
    });
    chart.on("layoutEnd", (e) => ends.push(e.layout));
    await chart.ready;
    for (let i = 0; i < 40 && !ends.length; i++) await flush(1);
    expect(ends).toEqual(["force"]);
    expect(chart.getPositions().n0).toEqual({ x: 0, y: 0 });
    expect(
      container.querySelector(".minerva-chart-legend span"),
    ).not.toBeNull();
    // labels were drawn after the simulation
    expect(texts.length).toBeGreaterThan(0);
    // drag a node: the simulation warms up again
    const hovers: (GraphHoverEvent | null)[] = [];
    chart.on("hover", (e) => hovers.push(e));
    const p = chart.getPositions().n5;
    // find the screen position through a keyboard focus (hover event)
    chart.focusNode("n5", { animate: false, zoom: 1 });
    await flush();
    pointer("pointerdown", WIDTH / 2, HEIGHT / 2);
    pointer("pointermove", WIDTH / 2 + 30, HEIGHT / 2);
    pointer("pointermove", WIDTH / 2 + 60, HEIGHT / 2);
    pointer("pointerup", WIDTH / 2 + 60, HEIGHT / 2);
    await flush(3);
    const moved = chart.getPositions().n5;
    expect(moved.x).not.toBeCloseTo(p.x);
    for (let i = 0; i < 60 && ends.length < 2; i++) await flush(1);
    expect(ends.length).toBe(2);
    // relayout restarts it
    chart.relayout();
    for (let i = 0; i < 60 && ends.length < 3; i++) await flush(1);
    expect(ends.length).toBe(3);
  });

  it("computes the force layout before showing it", async () => {
    const nodes: GraphNode[] = Array.from({ length: 12 }, (_, i) => ({
      id: `n${i}`,
    }));
    const edges: GraphEdge[] = nodes
      .slice(1)
      .map((n, i) => ({ source: `n${i}`, target: n.id }));
    const c = await mount({
      nodes,
      edges,
      force: { animate: false, iterations: 30 },
      nodeShape: "box",
    });
    const p = c.getPositions();
    expect(Number.isFinite(p.n11.x)).toBe(true);
    // a drag restarts a simulation (none was running)
    c.focusNode("n3", { animate: false, zoom: 1 });
    await flush();
    pointer("pointerdown", WIDTH / 2, HEIGHT / 2);
    pointer("pointermove", WIDTH / 2 + 40, HEIGHT / 2);
    pointer("pointercancel", WIDTH / 2 + 40, HEIGHT / 2);
    await flush(3);
    // new data keeps the known positions and adds nodes next to their neighbors
    c.setData({
      nodes: [...nodes, { id: "new" }],
      edges: [...edges, { source: "n11", target: "new" }],
    });
    await flush(2);
    expect(Object.keys(c.getPositions())).toContain("new");
  });

  it("draws a layered dependency graph with the critical path and lineage", async () => {
    const nodes: GraphNode[] = [
      { id: "lint", value: 1, label: "Lint" },
      {
        id: "build",
        value: 5,
        label: "Build",
        subtitle: "5 min",
        color: "#22c55e",
      },
      { id: "test", value: 3, label: "Test" },
      { id: "e2e", value: 8, label: "E2E" },
      { id: "deploy", value: 1, label: "Deploy" },
    ];
    const edges: GraphEdge[] = [
      { source: "lint", target: "test" },
      { source: "build", target: "test" },
      { source: "build", target: "e2e" },
      { source: "test", target: "deploy" },
      { source: "e2e", target: "deploy" },
      { source: "lint", target: "deploy" },
    ];
    const c = await mount({
      nodes,
      edges,
      layout: "dag",
      direction: "LR",
      dag: { criticalPath: true },
    });
    expect(stage().getAttribute("aria-roledescription")).toBe(
      "Dependency graph",
    );
    // boxes (bars) and their text
    expect(texts).toContain("Build");
    expect(texts).toContain("5 min");
    const pos = c.getPositions();
    expect(pos.deploy.x).toBeGreaterThan(pos.test.x);
    // tooltip with in / out degrees and the critical path
    c.focusNode("e2e", { animate: false, zoom: 1 });
    await flush();
    const hovers: (GraphHoverEvent | null)[] = [];
    c.on("hover", (e) => hovers.push(e));
    pointer("pointermove", WIDTH / 2, HEIGHT / 2);
    await flush();
    expect(last(hovers)?.id).toBe("e2e");
    const tooltip = container.querySelector<HTMLDivElement>(
      ".minerva-chart-tooltip",
    )!;
    expect(tooltip.textContent).toContain("Incoming");
    expect(tooltip.textContent).toContain("Critical path");
    // a badge with a dot, no single-side accent border
    const badge = tooltip.querySelector<HTMLElement>(".minerva-chart-badge")!;
    expect(badge.querySelector("span")).not.toBeNull();
    expect(badge.style.borderLeft).toBe(badge.style.borderRight);
    // explicit path, orthogonal edges, other directions
    c.setOptions({
      nodes,
      edges,
      layout: "dag",
      edgeStyle: "orthogonal",
      dag: { criticalPath: ["lint", "test", "deploy"] },
    });
    await flush();
    c.setOptions({
      nodes,
      edges,
      layout: "dag",
      direction: "BT",
      edgeStyle: "straight",
      arrows: false,
    });
    await flush();
    c.setOptions({
      nodes,
      edges,
      layout: "dag",
      direction: "RL",
      highlight: "none",
      animation: 50,
    });
    await wait(80);
    await flush(2);
  });

  it("collapses and expands tree nodes with clicks, keys and the API", async () => {
    const { nodes, edges } = treeData();
    const toggles: { id: string; collapsed: boolean }[] = [];
    const c = await mount({ nodes, edges, layout: "org", animation: false });
    c.on("toggle", (e) => toggles.push(e));
    expect(stage().getAttribute("aria-roledescription")).toBe("Tree diagram");
    // a2 starts collapsed: its child sits on it
    let pos = c.getPositions();
    expect(pos.a2x).toEqual(pos.a2);
    // the collapsed badge shows the hidden count
    expect(texts).toContain("1");
    c.expand("a2");
    expect(last(toggles)).toEqual({ id: "a2", collapsed: false });
    pos = c.getPositions();
    expect(pos.a2x.y).toBeGreaterThan(pos.a2.y);
    c.toggle("a");
    expect(last(toggles)).toEqual({ id: "a", collapsed: true });
    c.collapse("a");
    c.expand("a");
    c.collapse();
    expect(toggles.filter((t) => t.collapsed).length).toBeGreaterThan(2);
    c.expand();
    expect(last(toggles)?.collapsed).toBe(false);
    c.expand("missing");
    c.collapse("missing");
    c.toggle("missing");
    // click on a node with children toggles it
    c.focusNode("b", { animate: false, zoom: 1 });
    await flush();
    pointer("pointerdown", WIDTH / 2, HEIGHT / 2);
    pointer("pointerup", WIDTH / 2, HEIGHT / 2);
    expect(last(toggles)).toEqual({ id: "b", collapsed: true });
    expect(c.getSelection()).toEqual(["b"]);
    // Enter on the focused node expands it again
    stage().dispatchEvent(new FocusEvent("focus"));
    key("ArrowDown");
    key("Enter");
    await flush();
    // focusNode expands collapsed ancestors
    c.collapse("root");
    c.focusNode("b1", { animate: false });
    expect(c.getPositions().b1.y).toBeGreaterThan(c.getPositions().b.y);
    await flush();
  });

  it("lays out tidy, radial and mind map trees with animations", async () => {
    const { nodes, edges } = treeData();
    const ends: string[] = [];
    const c = await mount({ nodes, edges, layout: "tree", animation: 30 });
    c.on("layoutEnd", (e) => ends.push(e.layout));
    const lr = c.getPositions();
    expect(lr.a.x).toBeGreaterThan(lr.root.x);
    c.toggle("a");
    await wait(50);
    await flush(2);
    for (const [layout, direction] of [
      ["tree", "TB"],
      ["tree", "BT"],
      ["tree", "RL"],
      ["radial", undefined],
      ["mindmap", undefined],
    ] as const) {
      c.setOptions({
        nodes,
        edges,
        layout,
        direction,
        animation: 30,
        tree: { root: "root" },
      });
      await wait(50);
      await flush(2);
    }
    expect(ends).toEqual(["tree", "tree", "tree", "tree", "radial", "mindmap"]);
    const mind = c.getPositions();
    expect(mind.root).toEqual({ x: 0, y: 0 });
    expect(Math.sign(mind.a.x)).not.toBe(Math.sign(mind.b.x));
    // the same layout with new styles only redraws
    c.setOptions({
      nodes,
      edges,
      layout: "mindmap",
      animation: 30,
      tree: { root: "root" },
      edgeWidth: 2,
    });
    await flush(2);
    expect(ends.length).toBe(6);
  });

  it("draws circular and arc diagrams", async () => {
    const nodes: GraphNode[] = Array.from({ length: 10 }, (_, i) => ({
      id: `n${i}`,
      group: i % 2 ? "odd" : "even",
      value: i + 1,
    }));
    const edges: GraphEdge[] = Array.from({ length: 9 }, (_, i) => ({
      source: `n${i}`,
      target: `n${(i * 3 + 1) % 10}`,
      value: i,
    }));
    const c = await mount({
      nodes,
      edges,
      layout: "circular",
      circular: { tension: 0.5 },
    });
    const p = c.getPositions();
    const r0 = Math.hypot(p.n0.x, p.n0.y);
    expect(Math.hypot(p.n5.x, p.n5.y)).toBeCloseTo(r0);
    // labels are rotated around the circle
    expect(calls.rotate ?? 0).toBeGreaterThan(0);
    c.setOptions({
      nodes,
      edges,
      layout: "arc",
      circular: { order: "degree" },
    });
    await flush(2);
    expect(c.getPositions().n3.y).toBe(0);
    c.setOptions({
      nodes,
      edges,
      layout: "force",
      edgeStyle: "curve",
      force: { animate: false },
    });
    await flush(2);
    c.setOptions({ nodes, edges, layout: "tree", edgeStyle: "curve" });
    await flush(2);
    c.setOptions({
      nodes,
      edges,
      layout: "bogus" as "force",
      force: { animate: false },
    });
    await flush(2);
  });

  it("supports static charts, custom tooltips and disabled features", async () => {
    const render = vi.fn((e: GraphHoverEvent) =>
      e.type === "node" ? `custom ${e.id}` : null,
    );
    const c = await mount(
      freeOptions({
        interaction: false,
        tooltip: { render },
        legend: false,
        controls: false,
        ariaLabel: "My graph",
      }),
    );
    expect(stage().getAttribute("aria-label")).toBe("My graph");
    expect(stage().hasAttribute("tabindex")).toBe(false);
    expect(
      container.querySelector<HTMLDivElement>(".minerva-chart-controls")!.style
        .display,
    ).toBe("none");
    expect(
      container.querySelector<HTMLDivElement>(".minerva-chart-legend")!.style
        .display,
    ).toBe("none");
    pointer("pointerdown", ...screen(0, 0));
    pointer("pointermove", ...screen(0, 0));
    await flush();
    const tooltip = container.querySelector<HTMLDivElement>(
      ".minerva-chart-tooltip",
    )!;
    expect(tooltip.textContent).toBe("custom a");
    pointer("pointermove", ...screen(200, 0));
    await flush();
    expect(tooltip.style.display).toBe("none");
    key("ArrowRight");
    stage().dispatchEvent(new WheelEvent("wheel", { deltaY: 10 }));
    c.setOptions(
      freeOptions({
        tooltip: false,
        interaction: { select: false, keyboard: false, zoom: false },
      }),
    );
    pointer("pointermove", ...screen(0, 0));
    await flush();
    expect(tooltip.style.display).toBe("none");
    pointer("pointerdown", ...screen(0, 0));
    pointer("pointerup", ...screen(0, 0));
    expect(c.getSelection()).toEqual([]);
  });

  it("applies the selected option, palette, theme and renderer changes", async () => {
    const c = await mount(
      freeOptions({
        selected: ["b"],
        palette: ["#ff0000", "#00ff00"],
        highlight: "lineage",
      }),
    );
    expect(c.getSelection()).toEqual(["b"]);
    c.setOptions(
      freeOptions({
        selected: ["c", "zz"],
        palette: ["#0000ff"],
        renderer: "canvas2d",
      }),
    );
    expect(c.getSelection()).toEqual(["c"]);
    await c.ready;
    c.refreshTheme();
    document.documentElement.style.setProperty("--text-color", "#eeeeee");
    c.refreshTheme();
    document.documentElement.style.removeProperty("--text-color");
    document.body.style.fontFamily = "Georgia";
    c.refreshTheme();
    document.body.style.fontFamily = "";
    c.resize();
    await flush(2);
    c.setData({ nodes: freeNodes.slice(0, 2), edges: freeEdges.slice(0, 1) });
    await flush();
    expect(Object.keys(c.getPositions())).toEqual(["a", "b"]);
    expect(c.getSelection()).toEqual([]);
  });

  it("is safe after destroy", async () => {
    const c = await mount(freeOptions());
    c.destroy();
    c.destroy();
    c.setOptions(freeOptions());
    c.setData({ nodes: [], edges: [] });
    c.fit();
    c.focusNode("a");
    c.select("a");
    c.expand();
    c.collapse();
    c.relayout();
    expect(container.querySelector(".minerva-chart-graph")).toBeNull();
    chart = null;
  });

  it("handles empty data", async () => {
    const c = await mount({ nodes: [], edges: [] });
    c.fit();
    pointer("pointermove", 10, 10);
    await flush();
    expect(c.getPositions()).toEqual({});
  });
});

describe("force worker", () => {
  it("runs the worker script", async () => {
    const posted: { type: string; x: Float64Array }[] = [];
    const self: {
      onmessage?: (e: { data: unknown }) => void;
      postMessage: (m: unknown) => void;
    } = {
      postMessage: (m) => posted.push(m as { type: string; x: Float64Array }),
    };
    new Function("self", "MessageChannel", forceWorkerSource())(
      self,
      // a channel delivering its messages as tasks (like browsers)
      class {
        port1: { onmessage: (() => void) | null } = { onmessage: null };
        port2 = {
          postMessage: () => setTimeout(() => this.port1.onmessage?.(), 0),
        };
      },
    );
    const init = forceInit(
      5,
      Int32Array.from([0, 1, 2]),
      Int32Array.from([1, 2, 3]),
      { iterations: 1e7 },
    );
    self.onmessage!({ data: { type: "init", init, stream: true } });
    await wait(40);
    expect(posted.some((m) => m.type === "tick")).toBe(true);
    self.onmessage!({ data: { type: "drag", index: 0, x: 10, y: 10 } });
    self.onmessage!({ data: { type: "release", index: 0, keep: false } });
    self.onmessage!({ data: { type: "reheat", alpha: 0.5 } });
    const short = forceInit(
      5,
      Int32Array.from([0, 1, 2]),
      Int32Array.from([1, 2, 3]),
      { iterations: 20 },
    );
    self.onmessage!({ data: { type: "init", init: short, stream: false } });
    for (let i = 0; i < 100 && !posted.some((m) => m.type === "end"); i++)
      await wait(10);
    expect(posted.some((m) => m.type === "end")).toBe(true);
    self.onmessage!({ data: { type: "stop" } });
    self.onmessage!({ data: { type: "drag", index: 0, x: 0, y: 0 } });
  });

  it("yields with timeouts where MessageChannel is missing", async () => {
    const posted: { type: string }[] = [];
    const self: {
      onmessage?: (e: { data: unknown }) => void;
      postMessage: (m: unknown) => void;
    } = { postMessage: (m) => posted.push(m as { type: string }) };
    new Function("self", "MessageChannel", forceWorkerSource())(
      self,
      undefined,
    );
    const init = forceInit(
      4,
      Int32Array.from([0, 1]),
      Int32Array.from([1, 2]),
      { iterations: 30 },
    );
    self.onmessage!({ data: { type: "init", init, stream: true } });
    for (let i = 0; i < 100 && !posted.some((m) => m.type === "end"); i++)
      await wait(10);
    expect(posted.some((m) => m.type === "end")).toBe(true);
  });

  it("uses a worker when available and falls back without one", async () => {
    const created: FakeWorker[] = [];
    class FakeWorker {
      onmessage: ((e: MessageEvent) => void) | null = null;
      onerror: ((e: { preventDefault(): void }) => void) | null = null;
      messages: { type: string }[] = [];
      terminated = false;
      constructor(public url: string) {
        created.push(this);
      }
      postMessage(m: { type: string }) {
        this.messages.push(m);
      }
      terminate() {
        this.terminated = true;
      }
    }
    vi.stubGlobal("Worker", FakeWorker);
    const createObjectURL = vi.fn(() => "blob:graph");
    const revokeObjectURL = vi.fn();
    vi.stubGlobal(
      "URL",
      Object.assign(function URLStub() {}, {
        createObjectURL,
        revokeObjectURL,
      }),
    );
    const ticks = vi.fn();
    const ends = vi.fn();
    const init = forceInit(3, Int32Array.from([0]), Int32Array.from([1]), {});
    const runner = createForceRunner(init, {
      worker: true,
      stream: true,
      onTick: ticks,
      onEnd: ends,
      now: () => performance.now(),
    });
    expect(runner.threaded()).toBe(true);
    const worker = created[0];
    expect(worker.messages[0].type).toBe("init");
    runner.step(5);
    runner.drag(1, 5, 5);
    runner.release(1, false);
    runner.reheat(0.4);
    expect(worker.messages.map((m) => m.type)).toEqual([
      "init",
      "drag",
      "release",
      "reheat",
    ]);
    worker.onmessage!({
      data: {
        type: "tick",
        x: new Float64Array(3).fill(1),
        y: new Float64Array(3),
        alpha: 0.5,
      },
    } as MessageEvent);
    expect(runner.x[0]).toBe(1);
    expect(revokeObjectURL).toHaveBeenCalled();
    worker.onmessage!({
      data: {
        type: "end",
        x: new Float64Array(3).fill(2),
        y: new Float64Array(3),
        alpha: 0,
      },
    } as MessageEvent);
    expect(ends).toHaveBeenCalledTimes(1);
    expect(runner.running()).toBe(false);
    runner.destroy();
    expect(worker.terminated).toBe(true);

    // an error falls back to the main thread
    const second = createForceRunner(
      forceInit(3, Int32Array.from([0]), Int32Array.from([1]), {
        iterations: 5,
      }),
      {
        worker: true,
        stream: true,
        onTick: ticks,
        onEnd: ends,
        now: () => performance.now(),
      },
    );
    created[1].onerror!({ preventDefault() {} });
    expect(second.threaded()).toBe(false);
    second.step(50);
    expect(ends).toHaveBeenCalledTimes(2);
    second.destroy();

    // a failing constructor uses the main thread directly
    vi.stubGlobal("Worker", function Broken() {
      throw new Error("csp");
    });
    const third = createForceRunner(
      forceInit(2, new Int32Array(0), new Int32Array(0), {}),
      {
        worker: true,
        stream: false,
        onTick: ticks,
        onEnd: ends,
        now: () => performance.now(),
      },
    );
    expect(third.threaded()).toBe(false);
    third.drag(0, 1, 1);
    third.release(0, true);
    third.reheat(0.2);
    third.destroy();
  });

  it("starts a worker for large graphs from the chart", async () => {
    const created: {
      messages: { type: string }[];
      onmessage: ((e: MessageEvent) => void) | null;
    }[] = [];
    vi.stubGlobal(
      "Worker",
      class {
        messages: { type: string }[] = [];
        onmessage: ((e: MessageEvent) => void) | null = null;
        onerror = null;
        constructor() {
          created.push(this);
        }
        postMessage(m: { type: string }) {
          this.messages.push(m);
        }
        terminate() {}
      },
    );
    vi.stubGlobal(
      "URL",
      Object.assign(function URLStub() {}, {
        createObjectURL: () => "blob:x",
        revokeObjectURL: () => {},
      }),
    );
    const nodes: GraphNode[] = Array.from({ length: 50 }, (_, i) => ({
      id: `n${i}`,
    }));
    const edges: GraphEdge[] = nodes
      .slice(1)
      .map((n, i) => ({ source: `n${i}`, target: n.id }));
    const ends: string[] = [];
    chart = createGraphChart(container, {
      nodes,
      edges,
      force: { worker: true, animate: false },
    });
    chart.on("layoutEnd", (e) => ends.push(e.layout));
    await chart.ready;
    await flush();
    expect(created.length).toBe(1);
    const x = new Float64Array(50).map((_, i) => i * 10);
    created[0].onmessage!({
      data: { type: "end", x, y: new Float64Array(50), alpha: 0 },
    } as MessageEvent);
    await flush(2);
    expect(ends).toEqual(["force"]);
    expect(chart.getPositions().n3.x).toBe(30);
  });
});

describe("auto fit of the force layout", () => {
  const chainNodes: GraphNode[] = Array.from({ length: 16 }, (_, i) => ({
    id: `n${i}`,
  }));
  const chainEdges: GraphEdge[] = chainNodes
    .slice(1)
    .map((n, i) => ({ source: `n${i}`, target: n.id }));
  const bare: Partial<GraphChartOptions> = {
    nodeLabels: false,
    fitPadding: 0,
    nodeSize: 12,
    legend: false,
  };

  /** Lets frames run for `ms` (view tweens use the real clock) */
  const settle = async (ms = 700) => {
    const end = performance.now() + ms;
    while (performance.now() < end) await nextFrame();
  };

  /** The drawn circles fill the width or the height of the 800 × 400 view */
  const fills = () => {
    const box = drawnBox();
    return box.w >= WIDTH * 0.97 || box.h >= HEIGHT * 0.97;
  };

  it("fits the settled main-thread layout, turned along the wide view", async () => {
    chart = createGraphChart(container, {
      nodes: chainNodes,
      edges: chainEdges,
      ...bare,
    });
    let ended = false;
    chart.on("layoutEnd", () => (ended = true));
    await chart.ready;
    for (let i = 0; i < 200 && !ended; i++) await nextFrame();
    expect(ended).toBe(true);
    await settle();
    const box = drawnBox();
    expect(fills()).toBe(true);
    expect(box.w).toBeGreaterThan(box.h);
    expect(box.cx).toBeCloseTo(WIDTH / 2, 0);
  });

  const workerChart = async () => {
    const created: {
      messages: { type: string }[];
      onmessage: ((e: MessageEvent) => void) | null;
    }[] = [];
    vi.stubGlobal(
      "Worker",
      class {
        messages: { type: string }[] = [];
        onmessage: ((e: MessageEvent) => void) | null = null;
        onerror = null;
        constructor() {
          created.push(this);
        }
        postMessage(m: { type: string }) {
          this.messages.push(m);
        }
        terminate() {}
      },
    );
    vi.stubGlobal(
      "URL",
      Object.assign(function URLStub() {}, {
        createObjectURL: () => "blob:x",
        revokeObjectURL: () => {},
      }),
    );
    const nodes = chainNodes.slice(0, 6);
    await mount({
      nodes,
      edges: chainEdges.slice(0, 5),
      force: { worker: true },
      ...bare,
    });
    expect(created.length).toBe(1);
    /** Positions spread over ± `half` horizontally, ± 40 vertically */
    const post = (type: "tick" | "end", half: number) =>
      created[0].onmessage!({
        data: {
          type,
          x: Float64Array.from(nodes, (_, i) => -half + (i * 2 * half) / 5),
          y: Float64Array.from(nodes, (_, i) => (i % 2 ? 40 : -40)),
          alpha: type === "end" ? 0 : 0.5,
        },
      } as MessageEvent);
    return post;
  };

  it("follows a layout computed in a worker and glides to the final fit", async () => {
    const post = await workerChart();
    post("tick", 400);
    await settle();
    expect(fills()).toBe(true);
    const fitted = drawnBox().w;
    // the layout expands: the view zooms out over several frames, not in one jump
    const glides = async (send: () => void) => {
      frameWidths = [];
      send();
      await settle();
      const between = frameWidths.filter(
        (w) => w > fitted * 1.05 && w < fitted * 1.9,
      );
      return between.length >= 2;
    };
    expect(await glides(() => post("tick", 800))).toBe(true);
    expect(drawnBox().w).toBeCloseTo(fitted, -1);
    // the end animates to the fit of the final positions
    expect(await glides(() => post("end", 1200))).toBe(true);
    expect(drawnBox().w).toBeCloseTo(fitted, -1);
    expect(drawnBox().cx).toBeCloseTo(WIDTH / 2, 0);
  });

  it("stops following once the user pans, until fit() is called", async () => {
    const post = await workerChart();
    post("tick", 400);
    await settle();
    const fitted = drawnBox();
    // drag the empty background to the right
    pointer("pointerdown", 400, 20);
    pointer("pointermove", 450, 20);
    pointer("pointermove", 500, 20);
    pointer("pointerup", 500, 20);
    post("tick", 800);
    await settle(300);
    let box = drawnBox();
    expect(box.w).toBeGreaterThan(fitted.w * 1.8);
    expect(box.cx).toBeCloseTo(fitted.cx + 100, 0);
    post("end", 1200);
    await settle(400);
    box = drawnBox();
    expect(box.w).toBeGreaterThan(fitted.w * 2.7);
    // fit() restores the fitted view (and following)
    chart!.fit(false);
    await settle(100);
    expect(drawnBox().w).toBeCloseTo(fitted.w, -1);
  });

  it("follows again after fit() while the layout still runs", async () => {
    const post = await workerChart();
    post("tick", 400);
    await settle(400);
    const fitted = drawnBox().w;
    key("-");
    await settle(400);
    expect(drawnBox().w).toBeLessThan(fitted * 0.9);
    chart!.fit();
    post("tick", 800);
    await settle();
    expect(drawnBox().w).toBeCloseTo(fitted, -1);
  });
});

describe("text inside boxes", () => {
  const org = () => {
    const { nodes, edges } = treeData();
    return {
      nodes: [
        ...nodes,
        { id: "long", label: "Customer success and onboarding" },
      ],
      edges: [...edges, { source: "b", target: "long" }],
    };
  };

  const textsAt = async (zoom: number) => {
    chart!.focusNode("root", { animate: false, zoom });
    await flush();
    texts = [];
    chart!.focusNode("root", { animate: false, zoom });
    await flush();
    return texts;
  };

  it("keeps a readable size, shortens with an ellipsis, then hides", async () => {
    await mount({ ...org(), layout: "org", animation: false });
    // full size: titles and subtitles, the long title shortened to the card
    let shown = await textsAt(1);
    expect(shown).toContain("Root");
    expect(shown).toContain("CEO");
    const full = shown.find((s) => s.startsWith("Customer"))!;
    expect(full).toMatch(/…$/);
    // zoomed out (the font alone would be 13 × 0.4 = 5.2 px)
    shown = await textsAt(0.4);
    expect(shown).toContain("Root");
    expect(shown).not.toContain("CEO");
    const long = shown.find((s) => s.startsWith("Customer"))!;
    expect(long).toMatch(/…$/);
    expect(long.length).toBeLessThan(full.length);
    // half size still has room for the subtitle
    expect(await textsAt(0.5)).toContain("CEO");
    // cards of 9 px are too small for any text
    shown = await textsAt(0.15);
    expect(shown).not.toContain("Root");
    expect(shown.some((s) => s.startsWith("Customer"))).toBe(false);
  });

  it("hides the text of boxes with nodeLabels: false", async () => {
    await mount({
      ...org(),
      layout: "org",
      animation: false,
      nodeLabels: false,
    });
    const shown = await textsAt(1);
    expect(shown).not.toContain("Root");
    expect(shown).not.toContain("CEO");
  });
});

describe("arrowheads, parallel edges and self-loops", () => {
  /** Edges hovered along a screen segment (one pointer move per step) */
  const hoveredAlong = async (
    from: [number, number],
    to: [number, number],
    steps: number,
  ) => {
    const ids = new Set<string>();
    const off = chart!.on("hover", (e) => {
      if (e?.type === "edge") ids.add(`${e.id}#${e.index}`);
    });
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      pointer(
        "pointermove",
        from[0] + (to[0] - from[0]) * t,
        from[1] + (to[1] - from[1]) * t,
      );
      await flush(1);
    }
    off();
    return ids;
  };

  const multiEdges: GraphEdge[] = [
    { source: "a", target: "b", directed: true },
    { source: "b", target: "a", directed: true },
    { source: "a", target: "b", directed: true },
    { source: "c", target: "c", directed: true, label: "self" },
    { source: "c", target: "c" },
    { source: "c", target: "d" },
  ];

  it("fills arrowheads with flat areas in the edge color", async () => {
    await mount(freeOptions({ arrowStyle: "open" }));
    expect(calls.closePath ?? 0).toBe(0);
    chart!.setOptions(freeOptions({ arrowStyle: "filled" }));
    await flush();
    // flat triangles: closed runs of the area fill (Canvas2D)
    expect(calls.closePath).toBeGreaterThan(0);
    // highlighted and dimmed layers get their own heads
    pointer("pointermove", ...screen(400, 0));
    await flush();
    chart!.setOptions(
      freeOptions({ arrowStyle: "filled", edgeStyle: "curve", arrows: true }),
    );
    await flush();
    expect(calls.closePath).toBeGreaterThan(2);
  });

  it("curves parallel edges apart and picks each of them", async () => {
    await mount(freeOptions({ edges: multiEdges, arrowStyle: "filled" }));
    // a → b: slots -1 (above), 0 (straight b → a) and 1 (below); the
    // middle of a quadratic is half its control offset (0.4 × 400 / 2)
    const ids = await hoveredAlong(screen(200, -100), screen(200, 100), 40);
    expect(ids).toEqual(new Set(["a→b#0", "b→a#1", "a→b#2"]));
  });

  it("draws self-loops in the free side of their node and picks them", async () => {
    await mount(freeOptions({ edges: multiEdges, edgeLabels: true }));
    // c has one neighbor, d, on its left: its loops go right
    chart!.focusNode("c", { animate: false, zoom: 2 });
    await flush();
    const [cx, cy] = [WIDTH / 2, HEIGHT / 2];
    const ids = await hoveredAlong([cx + 4, cy], [cx + 64, cy], 60);
    expect(ids.has("c→c#3")).toBe(true);
    expect(ids.has("c→c#4")).toBe(true);
    // the label of the loop is drawn at its far end
    expect(texts).toContain("self");
  });

  it("draws parallel arcs, circular curves and loops in every layout", async () => {
    for (const layout of ["arc", "circular", "force", "dag", "org"] as const) {
      chart?.destroy();
      texts = [];
      await mount({
        nodes: freeNodes.map(({ id, label }) => ({ id, label })),
        edges: multiEdges,
        layout,
        animation: false,
        force: { animate: false },
        arrowStyle: "filled",
      });
      const pos = chart!.getPositions();
      expect(Object.keys(pos)).toHaveLength(4);
      expect(Number.isFinite(pos.c.x)).toBe(true);
    }
  });

  it(
    "picks edges of large graphs through a spatial index",
    { timeout: 30_000 },
    async () => {
      // 71 × 30 nodes, 2,100 horizontal edges (above the index threshold)
      const nodes: GraphNode[] = [];
      const edges: GraphEdge[] = [];
      for (let r = 0; r < 30; r++) {
        for (let c = 0; c < 71; c++) {
          nodes.push({ id: `n${r}-${c}`, x: c * 40, y: r * 40 });
          if (c) edges.push({ source: `n${r}-${c - 1}`, target: `n${r}-${c}` });
        }
      }
      edges.push({ source: "n0-0", target: "n29-70", label: "long" });
      await mount({
        nodes,
        edges,
        layout: "none",
        nodeLabels: false,
        nodeSize: 12,
        animation: false,
      });
      chart!.focusNode("n10-10", { animate: false, zoom: 1 });
      await flush();
      const hovers: (GraphHoverEvent | null)[] = [];
      chart!.on("hover", (e) => hovers.push(e));
      // between n10-10 and n10-11
      pointer("pointermove", WIDTH / 2 + 20, HEIGHT / 2);
      await flush();
      expect(last(hovers)?.id).toBe("n10-10→n10-11");
      // between two rows: nothing
      pointer("pointermove", WIDTH / 2 + 20, HEIGHT / 2 + 20);
      await flush();
      expect(last(hovers)).toBeNull();
      // the long diagonal (0, 0) → (2800, 1160) crosses many cells: its
      // point at y = 420 lies between two rows, right of n10-25 (1000, 400)
      chart!.focusNode("n10-25", { animate: false, zoom: 1 });
      await flush();
      pointer(
        "pointermove",
        WIDTH / 2 + (420 * 2800) / 1160 - 1000,
        HEIGHT / 2 + 20,
      );
      await flush();
      expect(last(hovers)?.id).toBe("n0-0→n29-70");
      // moving the nodes rebuilds the index
      chart!.setOptions({
        nodes: nodes.map((n) => ({ ...n, y: n.y! * 2 })),
        edges,
        layout: "none",
        nodeLabels: false,
        nodeSize: 12,
        animation: false,
      });
      await flush();
      chart!.focusNode("n10-10", { animate: false, zoom: 1 });
      await flush();
      pointer("pointermove", WIDTH / 2 + 20, HEIGHT / 2);
      await flush();
      expect(last(hovers)?.id).toBe("n10-10→n10-11");
    },
  );

  /** Screen point between two nodes, with the first one focused at zoom 2 */
  const between = (a: string, b: string, at = 0.5): [number, number] => {
    const p = chart!.getPositions();
    return [
      WIDTH / 2 + (p[b].x - p[a].x) * 2 * at,
      HEIGHT / 2 + (p[b].y - p[a].y) * 2 * at,
    ];
  };

  it("fans parallel and opposite flow routes out and picks each of them", async () => {
    const edges: GraphEdge[] = [
      { source: "a", target: "b" },
      { source: "a", target: "b", label: "twice" },
      { source: "b", target: "a" },
      { source: "a", target: "a", label: "again" },
      { source: "b", target: "c" },
    ];
    const cases = [
      ["spline", "TB"],
      ["orthogonal", "LR"],
      ["orthogonal", "TB"],
      ["spline", "RL"],
    ] as const;
    for (const [edgeStyle, direction] of cases) {
      chart?.destroy();
      await mount({
        nodes: [
          { id: "a", label: "Alpha" },
          { id: "b", label: "Beta" },
          { id: "c", label: "Gamma" },
        ],
        edges,
        layout: "dag",
        direction,
        edgeStyle,
        arrowStyle: "filled",
        edgeLabels: true,
        animation: false,
      });
      chart!.focusNode("a", { animate: false, zoom: 2 });
      await flush();
      const [mx, my] = between("a", "b");
      const vertical = direction === "TB";
      // across the routes halfway: three separate lanes, both directions
      const ids = vertical
        ? await hoveredAlong([mx - 70, my], [mx + 70, my], 140)
        : await hoveredAlong([mx, my - 70], [mx, my + 70], 140);
      expect(ids, `${edgeStyle} ${direction}`).toEqual(
        new Set(["a→b#0", "a→b#1", "b→a#2"]),
      );
      // the loop sits across the flow (right of TB, above LR / RL)
      const loop = vertical
        ? await hoveredAlong(
            [WIDTH / 2, HEIGHT / 2],
            [WIDTH / 2 + 200, HEIGHT / 2],
            100,
          )
        : await hoveredAlong(
            [WIDTH / 2, HEIGHT / 2],
            [WIDTH / 2, HEIGHT / 2 - 150],
            75,
          );
      expect(loop.has("a→a#3"), `${edgeStyle} ${direction}`).toBe(true);
      expect(texts).toContain("again");
    }
  });

  it("separates parallel org and tree connectors and keeps loops off the bus", async () => {
    const nodes: GraphNode[] = [
      { id: "r", label: "Root", subtitle: "top" },
      { id: "x", label: "Leaf x" },
      { id: "y", label: "Leaf y" },
    ];
    const edges: GraphEdge[] = [
      { source: "r", target: "x" },
      { source: "r", target: "y" },
      { source: "r", target: "y" },
      { source: "y", target: "y" },
    ];
    // org: x and y are leaves, stacked in a column on a bus
    await mount({
      nodes,
      edges,
      layout: "org",
      arrows: true,
      animation: false,
    });
    chart!.focusNode("x", { animate: false, zoom: 2 });
    await flush();
    // between the two cards, the two buses down to y
    const [, gy] = between("x", "y");
    const buses = await hoveredAlong([0, gy], [WIDTH / 2, gy], 200);
    expect(buses).toEqual(new Set(["r→y#1", "r→y#2"]));
    // the loop of y goes to the right, away from the bus
    chart!.focusNode("y", { animate: false, zoom: 2 });
    await flush();
    const right = await hoveredAlong(
      [WIDTH / 2, HEIGHT / 2],
      [WIDTH, HEIGHT / 2],
      200,
    );
    expect(right.has("y→y#3")).toBe(true);
    // tidy tree (circles, left to right): bulging splines
    chart!.destroy();
    await mount({
      nodes,
      edges,
      layout: "tree",
      arrowStyle: "filled",
      arrows: true,
      animation: false,
    });
    chart!.focusNode("r", { animate: false, zoom: 2 });
    await flush();
    const [tx, ty] = between("r", "y");
    const splines = await hoveredAlong([tx, ty - 60], [tx, ty + 60], 120);
    expect(splines.has("r→y#1")).toBe(true);
    expect(splines.has("r→y#2")).toBe(true);
  });

  it(
    "indexes the offset routes of parallel edges in large graphs",
    { timeout: 30_000 },
    async () => {
      // 1,100 pairs on two layers, each edge doubled: 2,200 edges
      const nodes: GraphNode[] = [];
      const edges: GraphEdge[] = [];
      for (let i = 0; i < 550; i++) {
        nodes.push({ id: `u${i}` }, { id: `v${i}` });
        edges.push(
          { source: `u${i}`, target: `v${i}` },
          { source: `u${i}`, target: `v${i}` },
        );
      }
      edges.push(...edges.slice(0, 1100));
      await mount({
        nodes,
        edges,
        layout: "dag",
        nodeLabels: false,
        animation: false,
      });
      chart!.focusNode("u10", { animate: false, zoom: 2 });
      await flush();
      const [mx, my] = between("u10", "v10");
      const ids = await hoveredAlong([mx - 80, my], [mx + 80, my], 80);
      expect(ids).toEqual(
        new Set(["u10→v10#20", "u10→v10#21", "u10→v10#1120", "u10→v10#1121"]),
      );
    },
  );
});
