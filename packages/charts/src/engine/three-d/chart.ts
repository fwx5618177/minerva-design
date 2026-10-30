// createChart3D: 3D scatter / surface / bar / line charts. The data layer
// is drawn by a GPU backend (WebGPU -> WebGL2 -> WebGL) or by Canvas2D (CPU
// projection, painter's algorithm); walls, labels, color bar and hover
// highlight are 2D canvases around it. Frames are drawn on demand: the only
// animation loop is the optional auto rotation (paused off-screen, while
// hovered and with prefers-reduced-motion).

import { luminance, parseColor, toCss, type Rgba } from "../color";
import { resolveLocale } from "../locale";
import { tickStep } from "../scale";
import {
  readTheme,
  themeColorsChanged,
  watchTheme,
  type ChartTheme,
} from "../theme";
import type { ChartRendererKind } from "../types";
import { colorLut, colorStops, type ColorLut } from "./colormap";
import { createRenderer3D } from "./detect";
import {
  createChart3DDom,
  layerCanvas,
  sizeCanvas,
  style,
  swatch,
} from "./dom";
import {
  CPU_BUDGET,
  GPU_BUDGET,
  createGeometryBuilder,
  type Geometry,
  type GeometryColors,
} from "./geometry";
import { highlightShape, hoverEvent, tooltipRows } from "./hover";
import { fill } from "./labels";
import {
  DEFAULT_CAMERA,
  cameraFrame,
  clampCamera,
  normalize,
  type CameraFrame,
  type FitRect,
  type Vec3,
} from "./math";
import { buildModel, type Model3D } from "./model";
import {
  drawAxes,
  drawColorBar,
  drawHighlight,
  drawWalls,
  overlayStyle,
  type HighlightShape,
  type OverlayStyle,
} from "./overlay";
import { createPicker, type PickHit } from "./pick";
import type { Frame3D, Renderer3D } from "./render-types";
import { createDepthSorter } from "./sort";
import type {
  Chart3DCameraOptions,
  Chart3DCameraState,
  Chart3DEventMap,
  Chart3DHoverEvent,
  Chart3DInstance,
  Chart3DInteractionOptions,
  Chart3DOptions,
} from "./types";

/** Zoom factor of a wheel event (same feel as the 2D charts) */
const wheelFactor = (deltaY: number, deltaMode: number, pinch: boolean) => {
  const pixels =
    deltaMode === 1 ? deltaY * 16 : deltaMode === 2 ? deltaY * 400 : deltaY;
  const speed = pinch ? 0.01 : 0.0025;
  return Math.exp(Math.max(-1, Math.min(1, pixels * speed)));
};

const DEFAULT_LIGHTING = {
  ambient: 0.5,
  diffuse: 0.6,
  specular: 0.25,
  shininess: 32,
};

const ROTATE_SPEED = 12;
const DRAG_DEGREES = 0.45;
const KEY_DEGREES = 5;
const TWEEN_MS = 380;

/** Camera of the options (also the one restored by a reset) */
export const initialCamera = (
  camera: Chart3DCameraOptions | undefined,
): Chart3DCameraState =>
  clampCamera({
    azimuth: camera?.azimuth ?? DEFAULT_CAMERA.azimuth,
    elevation: camera?.elevation ?? DEFAULT_CAMERA.elevation,
    zoom: camera?.zoom ?? DEFAULT_CAMERA.zoom,
    pan: [0, 0],
    projection: camera?.projection ?? DEFAULT_CAMERA.projection,
  });

const copyCamera = (c: Chart3DCameraState): Chart3DCameraState => ({
  ...c,
  pan: [c.pan[0], c.pan[1]],
});

const sameCamera = (a: Chart3DCameraState, b: Chart3DCameraState) =>
  a.azimuth === b.azimuth &&
  a.elevation === b.elevation &&
  a.zoom === b.zoom &&
  a.pan[0] === b.pan[0] &&
  a.pan[1] === b.pan[1] &&
  a.projection === b.projection;

/** Interpolated camera (shortest way around for the azimuth) */
const lerpCamera = (
  a: Chart3DCameraState,
  b: Chart3DCameraState,
  t: number,
): Chart3DCameraState => {
  let da = (b.azimuth - a.azimuth) % 360;
  if (da > 180) da -= 360;
  if (da < -180) da += 360;
  return clampCamera({
    azimuth: a.azimuth + da * t,
    elevation: a.elevation + (b.elevation - a.elevation) * t,
    zoom: a.zoom * Math.pow(b.zoom / a.zoom, t),
    pan: [
      a.pan[0] + (b.pan[0] - a.pan[0]) * t,
      a.pan[1] + (b.pan[1] - a.pan[1]) * t,
    ],
    projection: t < 0.5 ? a.projection : b.projection,
  });
};

/** Layout of the stage: area the box is fitted into and the color bar */
export const stageLayout = (
  width: number,
  height: number,
  colorBar: boolean,
): {
  fit: FitRect;
  bar: { x: number; y: number; w: number; h: number } | null;
} => {
  const side = Math.max(30, Math.min(72, width * 0.08));
  const top = Math.max(14, Math.min(28, height * 0.05));
  const bottom = Math.max(30, Math.min(56, height * 0.1));
  const barSpace = colorBar ? 74 : 0;
  const fit: FitRect = {
    x: side,
    y: top,
    width: Math.max(10, width - side * 2 - barSpace),
    height: Math.max(10, height - top - bottom),
  };
  if (!colorBar) return { fit, bar: null };
  const h = Math.max(40, Math.min(260, height * 0.62));
  return {
    fit,
    bar: { x: width - 66, y: (height - h) / 2 + 8, w: 12, h },
  };
};

export const createChart3D = (
  container: HTMLElement,
  initialOptions: Chart3DOptions,
): Chart3DInstance => {
  const doc = container.ownerDocument;
  const win = doc.defaultView;
  const dom = createChart3DDom(container);
  const stage = dom.stage;
  let options = initialOptions;
  let theme: ChartTheme = readTheme(dom.root, options.palette);
  let themeVersion = 0;
  let destroyed = false;

  const listeners = new Map<keyof Chart3DEventMap, Set<(e: never) => void>>();
  const emit = <K extends keyof Chart3DEventMap>(
    type: K,
    event: Chart3DEventMap[K],
  ) => {
    listeners
      .get(type)
      ?.forEach((fn) => (fn as (e: Chart3DEventMap[K]) => void)(event));
  };

  // ------------------------------------------------------------- state

  /** Series whose visibility the legend flipped (ids) */
  const toggled = new Set<string>();
  let model: Model3D = buildModel(options);
  let colors: GeometryColors;
  let lut: ColorLut;
  let lutKey = "";
  let lutId = 0;
  const buildGeometry = createGeometryBuilder();
  let geometry: Geometry = { items: [], targets: [], counts: [] };
  let geometryDirty = true;
  const picker = createPicker();
  const sortTransparent = createDepthSorter();

  let renderer: Renderer3D | null = null;
  let rendererToken = 0;
  let resolveReady: (kind: ChartRendererKind | null) => void = () => {};
  const ready = new Promise<ChartRendererKind | null>((resolve) => {
    resolveReady = resolve;
  });

  let homeCamera = initialCamera(options.camera);
  let cameraKey = JSON.stringify(options.camera ?? {});
  let camera = copyCamera(homeCamera);
  let tween: {
    from: Chart3DCameraState;
    to: Chart3DCameraState;
    start: number;
  } | null = null;

  let frameId = 0;
  let dataDirty = true;
  let lastFrame: CameraFrame | null = null;
  let lastLayout: ReturnType<typeof stageLayout> | null = null;
  let overlay: OverlayStyle = overlayStyle(theme, isDark(theme));

  let hoverHit: PickHit | null = null;
  let hoverEvt: Chart3DHoverEvent | null = null;
  let pendingHover: { x: number; y: number } | null = null;
  let lastPointer: { x: number; y: number } | null = null;
  let pointerInside = false;
  let visible = true;
  let lastRotate = 0;

  const reducedMotion =
    typeof win?.matchMedia === "function"
      ? win.matchMedia("(prefers-reduced-motion: reduce)")
      : null;

  // ------------------------------------------------------------ options

  const interaction = (): Required<Chart3DInteractionOptions> | null => {
    const o = options.interaction;
    if (o === false) return null;
    const c = typeof o === "object" ? o : {};
    return {
      rotate: c.rotate ?? true,
      zoom: c.zoom ?? true,
      wheel: c.wheel ?? "modifier",
      pan: c.pan ?? true,
      keyboard: c.keyboard ?? true,
    };
  };

  const rotateSpeed = () => {
    const a = options.autoRotate;
    if (a === true) return ROTATE_SPEED;
    return typeof a === "number" && Number.isFinite(a) ? a : 0;
  };

  const showsColorBar = () => {
    const o = options.colorBar;
    if (o === false) return false;
    return !!model.colorDomain;
  };

  const effectiveOptions = (): Chart3DOptions => ({
    ...options,
    series: options.series.map((s, i) => {
      const id = s.id ?? String(i);
      return toggled.has(id) ? { ...s, hidden: !s.hidden } : s;
    }),
  });

  const resolveColor = (value: string): Rgba =>
    theme.resolve
      ? theme.resolve(value, [0.5, 0.5, 0.5, 1])
      : (parseColor(value) ?? [0.5, 0.5, 0.5, 1]);

  const refreshColors = () => {
    const key = `${JSON.stringify(options.colorScale ?? "viridis")}|${themeVersion}`;
    if (key !== lutKey || !lut) {
      lutKey = key;
      lut = colorLut(
        colorStops(options.colorScale, (c, f) =>
          theme.resolve ? theme.resolve(c, f) : (parseColor(c) ?? f),
        ),
      );
      lutId++;
    }
    const palette = theme.palette.length ? theme.palette : [theme.primary];
    colors = {
      series: model.series.map((m, i) =>
        m.color
          ? resolveColor(m.color)
          : (palette[i % palette.length] ?? theme.primary),
      ),
      resolve: resolveColor,
      lut,
      wire: [theme.text[0], theme.text[1], theme.text[2], 0.38],
    };
  };

  const rebuild = () => {
    model = buildModel(effectiveOptions());
    refreshColors();
    geometryDirty = true;
    overlay = overlayStyle(theme, isDark(theme));
    renderLegend();
    updateAccessibility();
    invalidate(true);
    // the hovered item may have moved (live data): pick it again after the frame
    if (hoverHit && lastPointer) scheduleHover(lastPointer.x, lastPointer.y);
  };

  // ------------------------------------------------------------- legend

  let legendKey = "";
  const renderLegend = () => {
    const o = options.legend;
    const named = model.series.filter((s) => s.name).length;
    const show = o === undefined ? named > 1 : !!o;
    const config = typeof o === "object" ? o : {};
    const toggle = config.toggle ?? true;
    const bottom = config.position === "bottom";
    let key = `${show}|${bottom}|${toggle}`;
    if (show) {
      model.series.forEach((s, i) => {
        key += `\n${s.id}\u0001${s.name}\u0001${toCss(colors.series[i] ?? theme.primary)}\u0001${s.hidden}`;
      });
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
    model.series.forEach((s, i) => {
      if (!s.name) return;
      const item = doc.createElement(toggle ? "button" : "span");
      if (item instanceof HTMLButtonElement) {
        item.type = "button";
        item.setAttribute("aria-pressed", String(!s.hidden));
        item.addEventListener("click", () => {
          if (toggled.has(s.id)) toggled.delete(s.id);
          else toggled.add(s.id);
          const { labels } = model.locale;
          dom.live.textContent = fill(s.hidden ? labels.shown : labels.hidden, {
            name: s.name,
          });
          rebuild();
        });
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
        opacity: s.hidden ? "0.45" : "1",
        textDecoration: s.hidden ? "line-through" : "none",
      });
      item.append(
        swatch(
          doc,
          toCss(colors.series[i] ?? theme.primary),
          s.type !== "bar" && s.type !== "surface",
        ),
        doc.createTextNode(s.name),
      );
      dom.legend.appendChild(item);
    });
    if (focused >= 0)
      (dom.legend.children[focused] as HTMLElement | undefined)?.focus();
  };

  // ------------------------------------------------------ accessibility

  const updateAccessibility = () => {
    const { labels, count } = model.locale;
    const names = model.series
      .map((s) => s.name)
      .filter(Boolean)
      .join(labels.listSeparator);
    stage.setAttribute("aria-roledescription", labels.chart);
    stage.setAttribute(
      "aria-label",
      options.ariaLabel ??
        (names ? fill(labels.chartNamed, { names }) : labels.chart),
    );
    const keyboard = interaction()?.keyboard;
    if (keyboard) stage.tabIndex = 0;
    else stage.removeAttribute("tabindex");
    stage.style.cursor = interaction()?.rotate ? "grab" : "default";
    const lines: string[] = [];
    lines.push(fill(labels.seriesCount, { count: count(model.series.length) }));
    for (const m of model.series) {
      const name = m.name || fill(labels.series, { n: m.index + 1 });
      const size =
        m.type === "surface"
          ? fill(labels.grid, {
              rows: count(m.grid.rows),
              cols: count(m.grid.cols),
            })
          : m.type === "bar"
            ? fill(labels.bars, { count: count(m.bars.count) })
            : fill(m.type === "line" ? labels.vertices : labels.points, {
                count: count(m.cols.count),
              });
      lines.push(
        fill(m.hidden ? labels.seriesSummaryHidden : labels.seriesSummary, {
          name,
          type: labels[m.type],
          size,
        }),
      );
    }
    for (const key of ["x", "y", "z"] as const) {
      const axis = model[key];
      const range = axis.categories
        ? axis.categories.join(labels.listSeparator)
        : fill(labels.range, {
            min: axis.format(axis.domain[0]),
            max: axis.format(axis.domain[1]),
          });
      lines.push(
        fill(axis.title ? labels.axisTitled : labels.axis, {
          axis: key.toUpperCase(),
          title: axis.title,
          range,
        }),
      );
    }
    dom.summary.textContent = lines.join(" ");
  };

  // -------------------------------------------------------------- frame

  function invalidate(data = true) {
    if (data) dataDirty = true;
    if (destroyed || frameId || !win) return;
    frameId = win.requestAnimationFrame(frame);
  }

  const rotating = () =>
    rotateSpeed() !== 0 &&
    visible &&
    !pointerInside &&
    !drag &&
    !tween &&
    !reducedMotion?.matches &&
    !(doc.visibilityState === "hidden");

  const lightDirection = (f: CameraFrame): Vec3 => {
    // a headlight from the upper left, slightly raised towards the sky
    const v: Vec3 = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      v[i] = -f.right[i]! * 0.35 + f.up[i]! * 0.55 - f.forward[i]! * 0.7;
    }
    v[2] += 0.35;
    return normalize(v);
  };

  function frame(time: number) {
    frameId = 0;
    if (destroyed) return;
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    if (width <= 0 || height <= 0) return;
    const dpr = win?.devicePixelRatio || 1;
    // camera animations
    if (tween) {
      const t = Math.min(1, (time - tween.start) / TWEEN_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      camera = lerpCamera(tween.from, tween.to, eased);
      if (t >= 1) {
        camera = copyCamera(tween.to);
        tween = null;
        emit("camera", copyCamera(camera));
      }
      dataDirty = true;
    } else if (rotating()) {
      const dt = lastRotate ? Math.min(0.1, (time - lastRotate) / 1000) : 0;
      if (dt > 0) {
        camera = clampCamera({
          ...camera,
          azimuth: camera.azimuth - rotateSpeed() * dt,
        });
        dataDirty = true;
      }
      lastRotate = time;
    } else {
      lastRotate = 0;
    }

    sizeCanvas(dom.background, width, height, dpr);
    sizeCanvas(dom.foreground, width, height, dpr);
    const layout = stageLayout(width, height, showsColorBar());
    const fov = options.camera?.fov ?? 32;
    const half: Vec3 = [model.x.half, model.y.half, model.z.half];
    const f = cameraFrame(camera, half, width, height, layout.fit, fov);
    lastFrame = f;
    lastLayout = layout;

    if (dataDirty) {
      dataDirty = false;
      const bg = dom.background.getContext("2d");
      if (bg) {
        bg.setTransform(dpr, 0, 0, dpr, 0, 0);
        bg.clearRect(0, 0, width, height);
        if (options.box !== false) drawWalls(bg, f, model, overlay);
      }
      if (renderer) {
        if (geometryDirty) {
          geometry = buildGeometry(
            model,
            colors,
            renderer.kind === "canvas2d" ? CPU_BUDGET : GPU_BUDGET,
            lutId,
          );
          geometryDirty = false;
          picker.reset();
        }
        const w = Math.max(1, Math.round(width * dpr));
        const h = Math.max(1, Math.round(height * dpr));
        if (renderer.canvas.width !== w || renderer.canvas.height !== h)
          renderer.resize(w, h);
        renderer.canvas.style.width = `${width}px`;
        renderer.canvas.style.height = `${height}px`;
        const l = options.lighting ?? {};
        const frame3d: Frame3D = {
          viewProj: f.viewProj,
          eye: f.eye,
          light: lightDirection(f),
          orthographic: f.orthographic,
          distance: f.distance,
          radius: f.radius,
          width: w,
          height: h,
          dpr,
          lighting: [
            l.ambient ?? DEFAULT_LIGHTING.ambient,
            l.diffuse ?? DEFAULT_LIGHTING.diffuse,
            l.specular ?? DEFAULT_LIGHTING.specular,
            l.shininess ?? DEFAULT_LIGHTING.shininess,
          ],
          fog: theme.background,
        };
        renderer.render(
          renderer.kind === "canvas2d"
            ? geometry.items
            : sortTransparent(geometry.items, frame3d),
          frame3d,
        );
      }
    }
    drawForeground(f, layout, width, height, dpr);
    if (tween || rotating()) invalidate(true);
  }

  const drawForeground = (
    f: CameraFrame,
    layout: ReturnType<typeof stageLayout>,
    width: number,
    height: number,
    dpr: number,
  ) => {
    const fg = dom.foreground.getContext("2d");
    if (!fg) return;
    fg.setTransform(dpr, 0, 0, dpr, 0, 0);
    fg.clearRect(0, 0, width, height);
    if (options.box !== false) {
      drawAxes(fg, f, model, overlay, {
        left: 4,
        top: 4,
        right: layout.bar ? layout.bar.x - 10 : width - 4,
        bottom: height - 4,
      });
    }
    if (layout.bar && model.colorDomain) {
      const o = typeof options.colorBar === "object" ? options.colorBar : {};
      drawColorBar(
        fg,
        layout.bar,
        lut,
        model.colorDomain,
        o.format ?? colorBarFormat(),
        o.title ?? (model.colorFromZ ? model.z.title : ""),
        overlay,
        width,
      );
    }
    if (hoverHit && hoverEvt) {
      const shape: HighlightShape | null = highlightShape(
        geometry.targets,
        hoverHit,
        hoverEvt.color,
      );
      if (shape) drawHighlight(fg, f, model, shape, overlay);
    }
  };

  const colorBarFormat = () => {
    const d = model.colorDomain;
    const { locale } = model;
    if (!d) return locale.value;
    if (model.colorFromZ && options.zAxis?.format) return options.zAxis.format;
    const step = tickStep(d[0], d[1], 5);
    return step > 0
      ? locale.ticks(step, Math.max(Math.abs(d[0]), Math.abs(d[1])))
      : locale.value;
  };

  // -------------------------------------------------------------- hover

  const tooltipEnabled = () => options.tooltip !== false;

  const stageOffset = () => ({ x: stage.offsetLeft, y: stage.offsetTop });

  const setHover = (hit: PickHit | null) => {
    const event =
      hit && !geometryDirty
        ? hoverEvent(model, geometry.targets, hit, colors, stageOffset())
        : null;
    const changed =
      (event === null) !== (hoverEvt === null) ||
      (!!event &&
        !!hoverEvt &&
        (event.seriesIndex !== hoverEvt.seriesIndex ||
          event.index !== hoverEvt.index ||
          event.type !== hoverEvt.type));
    hoverHit = event ? hit : null;
    hoverEvt = event;
    renderTooltip();
    if (lastFrame && lastLayout) {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (width > 0 && height > 0)
        drawForeground(
          lastFrame,
          lastLayout,
          width,
          height,
          win?.devicePixelRatio || 1,
        );
    }
    if (changed) emit("hover", event);
  };

  const renderTooltip = () => {
    const tip = dom.tooltip;
    if (!hoverEvt || !hoverHit || !tooltipEnabled()) {
      tip.style.display = "none";
      return;
    }
    const custom =
      typeof options.tooltip === "object" ? options.tooltip.render : undefined;
    const content = custom ? custom(hoverEvt) : defaultTooltip(hoverEvt);
    if (content === null) {
      tip.style.display = "none";
      return;
    }
    if (typeof content === "string") tip.textContent = content;
    else tip.replaceChildren(content);
    tip.style.display = "block";
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;
    let x = hoverHit.x + 16;
    if (x + tw > width - 4) x = hoverHit.x - 16 - tw;
    x = Math.max(4, x);
    const y = Math.max(4, Math.min(height - th - 4, hoverHit.y - th / 2));
    tip.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
  };

  const defaultTooltip = (event: Chart3DHoverEvent): Node => {
    const fragment = doc.createDocumentFragment();
    const header = style(doc.createElement("div"), {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontWeight: "600",
      marginBottom: "4px",
      color: "var(--text-color, #1f2937)",
    });
    header.append(
      swatch(doc, event.color, event.type !== "bar"),
      doc.createTextNode(
        event.seriesName ||
          fill(model.locale.labels.series, { n: event.seriesIndex + 1 }),
      ),
    );
    fragment.append(header);
    const valueName =
      typeof options.colorBar === "object" && options.colorBar.title
        ? options.colorBar.title
        : "";
    for (const row of tooltipRows(model, event, valueName)) {
      const el = style(doc.createElement("div"), {
        display: "flex",
        alignItems: "center",
        gap: "8px",
      });
      const n = style(doc.createElement("span"), {
        flex: "1 1 auto",
        color: "var(--text-secondary-color, #6b7280)",
      });
      n.textContent = row.name;
      const v = style(doc.createElement("span"), {
        fontWeight: row.name ? "600" : "400",
        fontVariantNumeric: "tabular-nums",
        marginLeft: row.name ? "12px" : "0",
      });
      v.textContent = row.value;
      if (row.name) el.append(n, v);
      else el.append(v);
      fragment.append(el);
    }
    return fragment;
  };

  const pickAt = (x: number, y: number): PickHit | null => {
    if (!lastFrame || geometryDirty || !renderer) return null;
    return picker.pick(geometry.targets, lastFrame, x, y);
  };

  let hoverFrame = 0;
  const scheduleHover = (x: number, y: number) => {
    pendingHover = { x, y };
    if (hoverFrame || !win) return;
    hoverFrame = win.requestAnimationFrame(() => {
      hoverFrame = 0;
      const p = pendingHover;
      pendingHover = null;
      if (!p || destroyed || drag) return;
      setHover(pickAt(p.x, p.y));
    });
  };

  // -------------------------------------------------------- interaction

  interface DragState {
    mode: "rotate" | "pan" | "pinch";
    pointers: Map<number, { x: number; y: number }>;
    start: Chart3DCameraState;
    origin: { x: number; y: number };
    distance: number;
    moved: boolean;
  }
  let drag: DragState | null = null;
  const pointers = new Map<number, { x: number; y: number }>();

  const local = (e: { clientX: number; clientY: number }) => {
    const r = stage.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const fitHeight = () =>
    lastLayout?.fit.height ?? Math.max(1, stage.clientHeight);

  const setCameraInternal = (next: Chart3DCameraState, notify = true) => {
    const clamped = clampCamera(next);
    if (sameCamera(clamped, camera)) return;
    camera = clamped;
    tween = null;
    if (hoverHit) setHover(null);
    invalidate(true);
    if (notify) emit("camera", copyCamera(camera));
  };

  const animateTo = (target: Chart3DCameraState) => {
    if (reducedMotion?.matches || !win) {
      setCameraInternal(target);
      return;
    }
    tween = {
      from: copyCamera(camera),
      to: copyCamera(target),
      start: win.performance.now(),
    };
    invalidate(true);
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

  const startDrag = (
    mode: DragState["mode"],
    origin: { x: number; y: number },
  ) => {
    drag = {
      mode,
      pointers,
      start: copyCamera(camera),
      origin,
      distance: mode === "pinch" ? pinchInfo().distance : 0,
      moved: false,
    };
    tween = null;
    if (hoverHit) setHover(null);
    stage.style.cursor = mode === "rotate" ? "grabbing" : "move";
  };

  const onPointerDown = (e: PointerEvent) => {
    const ia = interaction();
    if (!ia) return;
    const p = local(e);
    pointers.set(e.pointerId, p);
    stage.setPointerCapture?.(e.pointerId);
    if (pointers.size === 2 && (ia.zoom || ia.pan)) {
      startDrag("pinch", pinchInfo().center);
      return;
    }
    if (pointers.size > 1) return;
    const pan = ia.pan && (e.button === 2 || e.shiftKey || e.button === 1);
    if (pan) startDrag("pan", p);
    else if (ia.rotate && e.button === 0) startDrag("rotate", p);
    else drag = null;
    if (pan || e.button === 1) e.preventDefault();
  };

  const onPointerMove = (e: PointerEvent) => {
    const p = local(e);
    lastPointer = p;
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, p);
    if (!drag) {
      if (e.pointerType === "touch" && pointers.size) return;
      if (
        tooltipEnabled() ||
        listeners.get("hover")?.size ||
        listeners.get("click")?.size
      )
        scheduleHover(p.x, p.y);
      return;
    }
    const ia = interaction();
    if (!ia) return;
    if (drag.mode === "pinch") {
      const { distance, center } = pinchInfo();
      const scale = drag.distance > 0 ? distance / drag.distance : 1;
      const h = fitHeight();
      setCameraInternal({
        ...drag.start,
        zoom: ia.zoom ? drag.start.zoom * scale : drag.start.zoom,
        pan: ia.pan
          ? [
              drag.start.pan[0] + (center.x - drag.origin.x) / h,
              drag.start.pan[1] + (center.y - drag.origin.y) / h,
            ]
          : drag.start.pan,
      });
      drag.moved = true;
      return;
    }
    const dx = p.x - drag.origin.x;
    const dy = p.y - drag.origin.y;
    if (!drag.moved && Math.hypot(dx, dy) < 3) return;
    drag.moved = true;
    if (drag.mode === "pan") {
      const h = fitHeight();
      setCameraInternal({
        ...drag.start,
        pan: [drag.start.pan[0] + dx / h, drag.start.pan[1] + dy / h],
      });
    } else {
      setCameraInternal({
        ...drag.start,
        azimuth: drag.start.azimuth - dx * DRAG_DEGREES,
        elevation: drag.start.elevation + dy * DRAG_DEGREES,
      });
    }
  };

  const onPointerUp = (e: PointerEvent) => {
    const wasDrag = drag;
    pointers.delete(e.pointerId);
    if (stage.hasPointerCapture?.(e.pointerId))
      stage.releasePointerCapture(e.pointerId);
    if (pointers.size === 1 && wasDrag?.mode === "pinch") {
      // continue with the remaining finger as a rotation
      const rest = [...pointers.values()][0]!;
      startDrag("rotate", rest);
      return;
    }
    if (pointers.size) return;
    drag = null;
    stage.style.cursor = interaction()?.rotate ? "grab" : "default";
    if (wasDrag && !wasDrag.moved && e.button === 0) {
      const p = local(e);
      const hit = pickAt(p.x, p.y);
      setHover(hit);
      if (hoverEvt) emit("click", hoverEvt);
    }
    if (rotating()) invalidate(false);
  };

  const onPointerCancel = (e: PointerEvent) => {
    pointers.delete(e.pointerId);
    if (!pointers.size) {
      drag = null;
      stage.style.cursor = interaction()?.rotate ? "grab" : "default";
    }
  };

  const onPointerEnter = (e: PointerEvent) => {
    if (e.pointerType !== "touch") pointerInside = true;
  };

  const onPointerLeave = () => {
    pointerInside = false;
    pendingHover = null;
    lastPointer = null;
    if (!drag && hoverHit) setHover(null);
    if (rotating()) invalidate(false);
  };

  const onWheel = (e: WheelEvent) => {
    const ia = interaction();
    if (!ia?.zoom) return;
    const pinch = e.ctrlKey && !e.metaKey;
    if (ia.wheel === "modifier" && !e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const factor = wheelFactor(e.deltaY, e.deltaMode, pinch);
    const zoom = camera.zoom / factor;
    // keep the point under the pointer in place
    const layout = lastLayout;
    if (!layout) {
      setCameraInternal({ ...camera, zoom });
      return;
    }
    const clamped = clampCamera({ ...camera, zoom });
    const ratio = clamped.zoom / camera.zoom;
    const h = layout.fit.height;
    const cx = layout.fit.x + layout.fit.width / 2 + camera.pan[0] * h;
    const cy = layout.fit.y + layout.fit.height / 2 + camera.pan[1] * h;
    const m = local(e);
    const nx = m.x - ratio * (m.x - cx);
    const ny = m.y - ratio * (m.y - cy);
    setCameraInternal({
      ...clamped,
      pan: [camera.pan[0] + (nx - cx) / h, camera.pan[1] + (ny - cy) / h],
    });
    if (hoverHit) setHover(null);
  };

  const onDoubleClick = (e: MouseEvent) => {
    if (!interaction()) return;
    e.preventDefault();
    animateTo(homeCamera);
  };

  const onContextMenu = (e: MouseEvent) => {
    if (interaction()?.pan) e.preventDefault();
  };

  // a focus ring for keyboard users only
  const onFocus = () => {
    let keyboard: boolean;
    try {
      keyboard = stage.matches(":focus-visible");
    } catch {
      keyboard = true;
    }
    if (keyboard)
      stage.style.boxShadow = "0 0 0 2px var(--primary-color, #4f46e5)";
  };

  const onBlur = () => {
    stage.style.boxShadow = "";
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const ia = interaction();
    if (!ia?.keyboard) return;
    let next: Chart3DCameraState | null = null;
    const step = e.shiftKey ? KEY_DEGREES * 3 : KEY_DEGREES;
    switch (e.key) {
      case "ArrowLeft":
        if (ia.rotate) next = { ...camera, azimuth: camera.azimuth + step };
        break;
      case "ArrowRight":
        if (ia.rotate) next = { ...camera, azimuth: camera.azimuth - step };
        break;
      case "ArrowUp":
        if (ia.rotate) next = { ...camera, elevation: camera.elevation + step };
        break;
      case "ArrowDown":
        if (ia.rotate) next = { ...camera, elevation: camera.elevation - step };
        break;
      case "+":
      case "=":
        if (ia.zoom) next = { ...camera, zoom: camera.zoom * 1.2 };
        break;
      case "-":
      case "_":
        if (ia.zoom) next = { ...camera, zoom: camera.zoom / 1.2 };
        break;
      case "0":
      case "Home":
        e.preventDefault();
        animateTo(homeCamera);
        return;
      case "Escape":
        lastPointer = null;
        if (hoverHit) {
          e.preventDefault();
          setHover(null);
        }
        return;
      default:
        return;
    }
    if (!next) return;
    e.preventDefault();
    setCameraInternal(next);
  };

  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerup", onPointerUp);
  stage.addEventListener("pointercancel", onPointerCancel);
  stage.addEventListener("pointerenter", onPointerEnter);
  stage.addEventListener("pointerleave", onPointerLeave);
  stage.addEventListener("wheel", onWheel, { passive: false });
  stage.addEventListener("dblclick", onDoubleClick);
  stage.addEventListener("contextmenu", onContextMenu);
  stage.addEventListener("keydown", onKeyDown);
  stage.addEventListener("focus", onFocus);
  stage.addEventListener("blur", onBlur);

  // ----------------------------------------------------------- watchers

  const resizeObserver =
    typeof ResizeObserver === "function"
      ? new ResizeObserver(() => {
          picker.reset();
          invalidate(true);
        })
      : null;
  resizeObserver?.observe(stage);

  const intersection =
    typeof IntersectionObserver === "function"
      ? new IntersectionObserver((entries) => {
          const entry = entries[entries.length - 1];
          if (!entry) return;
          const was = visible;
          visible = entry.isIntersecting;
          if (visible && !was) invalidate(true);
        })
      : null;
  intersection?.observe(stage);

  const onVisibility = () => {
    if (doc.visibilityState !== "hidden") invalidate(false);
  };
  doc.addEventListener("visibilitychange", onVisibility);

  // device pixel ratio changes (zoom, moving to another screen)
  let dprQuery: MediaQueryList | null = null;
  const onDprChange = () => {
    watchDpr();
    invalidate(true);
  };
  const watchDpr = () => {
    dprQuery?.removeEventListener?.("change", onDprChange);
    dprQuery =
      typeof win?.matchMedia === "function"
        ? win.matchMedia(`(resolution: ${win.devicePixelRatio || 1}dppx)`)
        : null;
    dprQuery?.addEventListener?.("change", onDprChange);
  };
  watchDpr();

  const onMotionChange = () => invalidate(false);
  reducedMotion?.addEventListener?.("change", onMotionChange);

  const refreshTheme = () => {
    if (destroyed) return;
    const next = readTheme(dom.root, options.palette);
    if (themeColorsChanged(theme, next)) themeVersion++;
    theme = next;
    rebuild();
  };
  const unwatchTheme = watchTheme(refreshTheme);

  // texts follow the page language when no `locale` is set
  const langObserver =
    typeof win?.MutationObserver === "function"
      ? new win.MutationObserver(() => {
          if (
            !destroyed &&
            resolveLocale(options.locale) !== model.locale.locale
          )
            rebuild();
        })
      : null;
  langObserver?.observe(doc.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });

  // ----------------------------------------------------------- renderer

  const initRenderer = async (exclude: Set<ChartRendererKind> = new Set()) => {
    const token = ++rendererToken;
    const next = await createRenderer3D(
      options.renderer ?? "auto",
      () => {
        const canvas = layerCanvas(doc);
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
    geometryDirty = true;
    if (next) {
      dom.root.dataset.renderer = next.kind;
      stage.insertBefore(next.canvas, dom.foreground);
      emit("renderer", next.kind);
    } else {
      delete dom.root.dataset.renderer;
    }
    resolveReady(next?.kind ?? null);
    invalidate(true);
  };

  refreshColors();
  rebuild();
  void initRenderer();

  // ---------------------------------------------------------------- api

  const instance: Chart3DInstance = {
    setOptions(next) {
      if (destroyed) return;
      const previous = options;
      options = next;
      if ((next.palette ?? []).join() !== (previous.palette ?? []).join()) {
        theme = readTheme(dom.root, next.palette);
        themeVersion++;
      }
      const key = JSON.stringify(next.camera ?? {});
      if (key !== cameraKey) {
        cameraKey = key;
        homeCamera = initialCamera(next.camera);
        setCameraInternal({ ...homeCamera });
      }
      if ((next.renderer ?? "auto") !== (previous.renderer ?? "auto"))
        void initRenderer();
      rebuild();
    },
    resize() {
      picker.reset();
      invalidate(true);
    },
    resetCamera() {
      setCameraInternal(copyCamera(homeCamera));
    },
    getCamera: () => copyCamera(camera),
    setCamera(next) {
      if (destroyed) return;
      setCameraInternal({
        azimuth: next.azimuth ?? camera.azimuth,
        elevation: next.elevation ?? camera.elevation,
        zoom: next.zoom ?? camera.zoom,
        pan: next.pan ? [next.pan[0], next.pan[1]] : camera.pan,
        projection: next.projection ?? camera.projection,
      });
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
      frameId = 0;
      hoverFrame = 0;
      resizeObserver?.disconnect();
      intersection?.disconnect();
      doc.removeEventListener("visibilitychange", onVisibility);
      dprQuery?.removeEventListener?.("change", onDprChange);
      reducedMotion?.removeEventListener?.("change", onMotionChange);
      unwatchTheme();
      langObserver?.disconnect();
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerCancel);
      stage.removeEventListener("pointerenter", onPointerEnter);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("dblclick", onDoubleClick);
      stage.removeEventListener("contextmenu", onContextMenu);
      stage.removeEventListener("keydown", onKeyDown);
      stage.removeEventListener("focus", onFocus);
      stage.removeEventListener("blur", onBlur);
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
