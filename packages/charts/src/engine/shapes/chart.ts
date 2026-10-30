// createShapeChart: DOM host of the shape charts. One Canvas2D layer sized
// with the device pixel ratio, the house legend / tooltip / live region of
// createChartDom, pointer + keyboard interaction, resize and theme watching.

import { createChartDom, styleElement, swatch } from "../dom";
import { readTheme, watchTheme, type ChartTheme } from "../theme";
import { drawShapeScene } from "./draw";
import { hitTestShapes, hoverAnchor, stepHover } from "./hit";
import {
  describeChart,
  describeItem,
  describeScene,
  hoverEvent,
  legendConfig,
  placeShapeTooltip,
  sameHover,
  shapeLegend,
  tooltipContent,
} from "./layout";
import { createShapeRuntime, now } from "./runtime";
import {
  estimateText,
  type MeasureText,
  type ShapeHover,
  type ShapeScene,
} from "./scene";
import type {
  ShapeChartEventMap,
  ShapeChartInstance,
  ShapeChartOptions,
  ShapeHoverEvent,
} from "./types";

/** Pointer travel (px) under which a press counts as a click / tap */
const TAP_SLOP = 6;

let uid = 0;

interface HoverState {
  hover: ShapeHover;
  x: number;
  y: number;
  keyboard: boolean;
}

/**
 * Creates a pie / donut, radar, gauge, funnel, treemap, sankey, sunburst,
 * radial bar, calendar heatmap or bullet chart in `container` (drawn with
 * Canvas2D, themed by the Minerva CSS variables).
 */
export const createShapeChart = (
  container: HTMLElement,
  initial: ShapeChartOptions,
): ShapeChartInstance => {
  const doc = container.ownerDocument;
  const win = doc.defaultView;
  const dom = createChartDom(container);
  dom.root.classList.add("minerva-shape-chart");
  dom.foreground.style.display = "none";
  dom.hover.style.display = "none";
  const canvas = dom.background;
  let ctx: CanvasRenderingContext2D | null = null;
  try {
    ctx = canvas.getContext("2d");
  } catch {
    ctx = null;
  }

  const runtime = createShapeRuntime(initial);
  let options = initial;
  let theme: ChartTheme = readTheme(dom.root, options.palette);
  let scene: ShapeScene | null = null;
  let hover: HoverState | null = null;
  let tipKey = "";
  let destroyed = false;
  let frameId: number | null = null;
  let frameIsTimeout = false;
  let press: {
    x: number;
    y: number;
    id: number;
    touch: boolean;
    moved: boolean;
  } | null = null;

  const listeners: {
    [K in keyof ShapeChartEventMap]: Set<
      (event: ShapeChartEventMap[K]) => void
    >;
  } = {
    hover: new Set(),
    click: new Set(),
    toggle: new Set(),
    drill: new Set(),
  };
  const emit = <K extends keyof ShapeChartEventMap>(
    type: K,
    event: ShapeChartEventMap[K],
  ) => {
    for (const listener of [...listeners[type]]) listener(event);
  };

  // screen-reader summary of the data
  const description = doc.createElement("div");
  description.id = `minerva-shape-chart-${++uid}`;
  styleElement(description, {
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  });
  dom.stage.appendChild(description);
  dom.stage.setAttribute("aria-describedby", description.id);
  dom.stage.tabIndex = 0;

  let fontSet = "";
  const measure: MeasureText = (text, f) => {
    if (!ctx) return estimateText(text, f);
    if (f !== fontSet) {
      ctx.font = f;
      fontSet = f;
    }
    return ctx.measureText(text).width;
  };

  // ------------------------------------------------------------- frames

  const cancelFrame = () => {
    if (frameId === null) return;
    if (frameIsTimeout) clearTimeout(frameId);
    else win?.cancelAnimationFrame?.(frameId);
    frameId = null;
  };

  const schedule = () => {
    if (destroyed || frameId !== null) return;
    if (win && typeof win.requestAnimationFrame === "function") {
      frameIsTimeout = false;
      frameId = win.requestAnimationFrame(() => render());
    } else {
      frameIsTimeout = true;
      frameId = setTimeout(() => render(), 16) as unknown as number;
    }
  };

  const tooltipOptions = () =>
    options.tooltip === false
      ? null
      : typeof options.tooltip === "object"
        ? options.tooltip
        : {};

  const tooltipNode = (event: ShapeHoverEvent): Node | string | null => {
    const custom = tooltipOptions()?.render;
    if (custom) return custom(event);
    if (!scene || !hover) return null;
    const content = tooltipContent(scene, hover.hover);
    if (!content) return null;
    const fragment = doc.createDocumentFragment();
    const header = doc.createElement("div");
    styleElement(header, {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontWeight: "600",
      marginBottom: "4px",
      color: "var(--text-color, #1f2937)",
      // long titles (full names of truncated labels) wrap
      whiteSpace: "normal",
      maxWidth: "260px",
      overflowWrap: "anywhere",
    });
    if (content.color) header.appendChild(swatch(doc, content.color, "dot"));
    header.appendChild(doc.createTextNode(content.title));
    fragment.append(header);
    for (const row of content.rows) {
      const el = doc.createElement("div");
      styleElement(el, { display: "flex", alignItems: "center", gap: "8px" });
      if (row.color) el.appendChild(swatch(doc, row.color, "dot"));
      const n = doc.createElement("span");
      styleElement(n, {
        flex: "1 1 auto",
        color: row.strong
          ? "var(--text-color, #1f2937)"
          : "var(--text-secondary-color, #6b7280)",
        fontWeight: row.strong ? "600" : "400",
      });
      n.textContent = row.name;
      const v = doc.createElement("span");
      styleElement(v, {
        fontWeight: "600",
        fontVariantNumeric: "tabular-nums",
        marginLeft: "12px",
      });
      v.textContent = row.value;
      el.append(n, v);
      fragment.append(el);
    }
    return fragment;
  };

  /** Fills (when the hovered item changed) and places the tooltip */
  const updateTooltip = (force = false) => {
    const tip = dom.tooltip;
    const event = scene && hover ? hoverEvent(scene, hover.hover) : null;
    if (!event || !scene || !hover || !tooltipOptions() || press?.moved) {
      tip.style.display = "none";
      tipKey = "";
      return;
    }
    const key = `${event.index}:${event.indicator ?? ""}`;
    if (force || key !== tipKey) {
      tipKey = key;
      const content = tooltipNode(event);
      if (content === null || content === "") {
        tip.replaceChildren();
        tipKey = "";
        tip.style.display = "none";
        return;
      }
      if (typeof content === "string") {
        tip.textContent = content;
        tip.style.whiteSpace = "pre";
      } else {
        tip.replaceChildren(content);
        tip.style.whiteSpace = "nowrap";
      }
    } else if (!tip.firstChild) {
      return;
    }
    tip.style.display = "block";
    const anchor = hover.keyboard
      ? (hoverAnchor(scene, hover.hover) ?? hover)
      : hover;
    const stageW = dom.stage.clientWidth;
    const stageH = dom.stage.clientHeight;
    const { x: left, y: top } = placeShapeTooltip(
      scene,
      hover.hover,
      anchor,
      tip.offsetWidth,
      tip.offsetHeight,
      stageW,
      stageH,
    );
    tip.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
  };

  const setHover = (
    next: ShapeHover | null,
    x: number,
    y: number,
    keyboard: boolean,
  ) => {
    const changed = !sameHover(hover?.hover ?? null, next);
    hover = next ? { hover: next, x, y, keyboard } : null;
    dom.stage.style.cursor = next && !keyboard ? "pointer" : "";
    updateTooltip();
    if (!changed) return;
    schedule();
    emit("hover", scene && next ? hoverEvent(scene, next) : null);
  };

  function render() {
    frameId = null;
    if (destroyed) return;
    const width = dom.stage.clientWidth;
    const height = dom.stage.clientHeight;
    if (!(width > 0 && height > 0)) return;
    const dpr = win?.devicePixelRatio || 1;
    const pw = Math.max(1, Math.round(width * dpr));
    const ph = Math.max(1, Math.round(height * dpr));
    if (canvas.width !== pw) canvas.width = pw;
    if (canvas.height !== ph) canvas.height = ph;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    fontSet = "";
    const frame = runtime.frame(now(), { theme, width, height, measure });
    scene = frame.scene;
    if (hover && !scene.items.some((it) => it.index === hover?.hover.index)) {
      hover = null;
      dom.stage.style.cursor = "";
      emit("hover", null);
    }
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, pw, ph);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawShapeScene(ctx, scene, hover?.hover ?? null);
      fontSet = "";
    }
    updateTooltip();
    if (!frame.animating) {
      const text = describeScene(scene);
      if (description.textContent !== text) description.textContent = text;
    } else schedule();
  }

  // ------------------------------------------------------------- legend

  const renderLegend = () => {
    const entries = shapeLegend(options, theme, runtime.hidden);
    const config = legendConfig(options);
    const focused = [...dom.legend.children].indexOf(
      doc.activeElement as Element,
    );
    dom.legend.replaceChildren();
    dom.legend.style.display = entries ? "flex" : "none";
    if (!entries) return;
    const bottom = config.position === "bottom";
    dom.legend.style.order = bottom ? "1" : "0";
    dom.legend.style.padding = bottom ? "8px 4px 0" : "0 4px 8px";
    dom.legend.style.justifyContent = "center";
    for (const entry of entries) {
      const item = doc.createElement(config.toggle ? "button" : "span");
      if (item instanceof HTMLButtonElement) {
        item.type = "button";
        item.setAttribute("aria-pressed", String(!entry.hidden));
        item.addEventListener("click", () => toggle(entry.index));
      }
      styleElement(item, {
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
        cursor: config.toggle ? "pointer" : "default",
        opacity: entry.hidden ? "0.45" : "1",
        textDecoration: entry.hidden ? "line-through" : "none",
        transition: "opacity 120ms ease-out",
      });
      item.append(
        swatch(doc, entry.color, "dot"),
        doc.createTextNode(entry.name),
      );
      dom.legend.appendChild(item);
    }
    if (focused >= 0)
      (dom.legend.children[focused] as HTMLElement | undefined)?.focus();
  };

  const updateAccessibility = () => {
    dom.stage.setAttribute(
      "aria-label",
      options.ariaLabel ?? describeChart(options),
    );
  };

  function toggle(index: number) {
    if (destroyed) return;
    const event = runtime.toggle(index);
    if (!event) return;
    if (!options.hidden) {
      renderLegend();
      tipKey = "";
      schedule();
    }
    emit("toggle", event);
  }

  function drill(path: readonly string[]) {
    if (destroyed) return;
    const event = runtime.drill(path);
    if (!event) return;
    if (options.type === "sunburst" && !options.drillPath) {
      tipKey = "";
      schedule();
    }
    emit("drill", event);
  }

  /** Sunburst: drills into / out of an activated item */
  const activate = (hit: ShapeHover) => {
    if (options.type !== "sunburst" || options.drill === false || !scene)
      return;
    const item = scene.items.find((it) => it.index === hit.index);
    if (item?.drill) drill(item.drill);
  };

  // -------------------------------------------------------- interaction

  const local = (event: { clientX: number; clientY: number }) => {
    const rect = dom.stage.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const hitAt = (x: number, y: number) =>
    scene ? hitTestShapes(scene, x, y, hover?.hover ?? null) : null;

  const onPointerMove = (event: PointerEvent) => {
    const { x, y } = local(event);
    if (press && press.id === event.pointerId) {
      if (Math.hypot(x - press.x, y - press.y) > TAP_SLOP) press.moved = true;
      if (press.touch) return;
    } else if (event.pointerType === "touch") return;
    setHover(hitAt(x, y), x, y, false);
  };

  const onPointerDown = (event: PointerEvent) => {
    const { x, y } = local(event);
    press = {
      x,
      y,
      id: event.pointerId,
      touch: event.pointerType === "touch",
      moved: false,
    };
  };

  const onPointerUp = (event: PointerEvent) => {
    const p = press;
    press = null;
    if (!p || p.id !== event.pointerId || p.moved) {
      updateTooltip();
      return;
    }
    const { x, y } = local(event);
    const hit = hitAt(x, y);
    // a tap shows the tooltip (there is no hover on touch screens)
    setHover(hit, x, y, false);
    if (hit && scene) {
      const e = hoverEvent(scene, hit);
      if (e) emit("click", e);
      activate(hit);
    }
  };

  const onPointerCancel = () => {
    press = null;
    updateTooltip();
  };

  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    press = null;
    if (hover && !hover.keyboard) setHover(null, 0, 0, false);
  };

  const focusItem = (next: ShapeHover | null) => {
    if (!scene || !next) return;
    const anchor = hoverAnchor(scene, next) ?? { x: 0, y: 0 };
    setHover(next, anchor.x, anchor.y, true);
    dom.live.textContent = describeItem(scene, next);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!scene) return;
    const current = hover?.hover ?? null;
    const keys: Record<string, "next" | "prev" | "up" | "down"> = {
      ArrowRight: "next",
      ArrowLeft: "prev",
      ArrowUp: "up",
      ArrowDown: "down",
    };
    const direction = keys[event.key];
    if (direction) {
      event.preventDefault();
      focusItem(stepHover(scene, current, direction));
      return;
    }
    switch (event.key) {
      case "Home":
      case "End": {
        const items = scene.items;
        if (!items.length) return;
        event.preventDefault();
        const it = event.key === "Home" ? items[0] : items[items.length - 1];
        focusItem(
          scene.type === "radar"
            ? { index: it.index, indicator: current?.indicator ?? 0 }
            : { index: it.index },
        );
        break;
      }
      case "Enter":
      case " ": {
        if (!current) return;
        const e = hoverEvent(scene, current);
        if (!e) return;
        event.preventDefault();
        emit("click", e);
        activate(current);
        break;
      }
      case "Backspace": {
        if (options.type !== "sunburst" || options.drill === false) return;
        const path = runtime.drillPath();
        if (!path.length) return;
        event.preventDefault();
        drill(path.slice(0, -1));
        break;
      }
      case "Escape":
        if (hover) {
          event.preventDefault();
          setHover(null, 0, 0, false);
        }
        break;
      default:
        break;
    }
  };

  const onFocus = () => {
    let visible: boolean;
    try {
      visible = dom.stage.matches(":focus-visible");
    } catch {
      visible = true;
    }
    // inset, like an outline drawn inside the stage edge: the drawing keeps a
    // padding, so the ring never covers labels or leader lines
    if (visible)
      dom.stage.style.boxShadow =
        "inset 0 0 0 2px var(--primary-color, #4f46e5)";
  };

  const onBlur = () => {
    dom.stage.style.boxShadow = "";
    if (hover?.keyboard) setHover(null, 0, 0, false);
  };

  const stage = dom.stage;
  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("pointerup", onPointerUp);
  stage.addEventListener("pointercancel", onPointerCancel);
  stage.addEventListener("pointerleave", onPointerLeave);
  stage.addEventListener("keydown", onKeyDown);
  stage.addEventListener("focus", onFocus);
  stage.addEventListener("blur", onBlur);

  const resizeObserver =
    typeof ResizeObserver === "function"
      ? new ResizeObserver(() => schedule())
      : null;
  resizeObserver?.observe(dom.stage);

  const refreshTheme = () => {
    if (destroyed) return;
    theme = readTheme(dom.root, options.palette);
    renderLegend();
    tipKey = "";
    schedule();
  };
  const unwatchTheme = watchTheme(refreshTheme);

  renderLegend();
  updateAccessibility();
  render();

  return {
    setOptions(next) {
      if (destroyed) return;
      const previous = options;
      options = next;
      runtime.setOptions(next);
      if ((next.palette ?? []).join() !== (previous.palette ?? []).join())
        theme = readTheme(dom.root, next.palette);
      if (next.type !== previous.type && hover) setHover(null, 0, 0, false);
      renderLegend();
      updateAccessibility();
      tipKey = "";
      schedule();
    },
    resize() {
      if (destroyed) return;
      cancelFrame();
      render();
    },
    refreshTheme,
    toggle,
    getHidden: () => runtime.hiddenIndexes(),
    drill,
    getDrillPath: () => runtime.drillPath(),
    on(type, listener) {
      listeners[type].add(listener);
      return () => {
        listeners[type].delete(listener);
      };
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      cancelFrame();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerCancel);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("keydown", onKeyDown);
      stage.removeEventListener("focus", onFocus);
      stage.removeEventListener("blur", onBlur);
      resizeObserver?.disconnect();
      unwatchTheme();
      listeners.hover.clear();
      listeners.click.clear();
      listeners.toggle.clear();
      listeners.drill.clear();
      dom.root.remove();
    },
  };
};
