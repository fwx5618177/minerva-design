// The point card of the quadrant matrices, shared by every renderer: one
// glass card for the hovered, focused, dragged (or, on boards, selected)
// point. Its dot stays at the data coordinates, outside the detached surface;
// the name, quadrant and host actions share one layout on either side. The card is DOM
// placed by hand: hover, focus and drag moves render no framework component;
// the host only fills the actions box (and, in React, a custom content) when
// the point of the card changes.

import {
  DEFAULT_QUADRANT_COLORS,
  quadrantLabels,
  quadrantOf,
  type QuadrantPoint,
} from "./presets";
import {
  quadrantName,
  type QuadrantAccessibleConfig,
} from "./quadrant-keyboard";
import { placeTooltip, styleTooltip, themeTooltip } from "./tooltip";
import type { ChartInstance, ChartOptions } from "./types";

/** Settings of the point card of a quadrant matrix */
export interface QuadrantPointCardOptions {
  /** The points and the geometry of the matrix */
  config: QuadrantAccessibleConfig;
  /** Language of the built-in quadrant names */
  locale?: string;
  /** Diameter of the dots (`pointSize`); 12 by default */
  pointSize?: number;
  /** A hovered point shows the card; `false` (no tooltip): focus and drag only */
  hover?: boolean;
  /** The selected point */
  selectedIndex?: number | null;
  /**
   * The selected point keeps the card (boards: its actions stay at hand);
   * otherwise a selection shows only its ring
   */
  showSelected?: boolean;
  /** The card of this point has actions: the host fills `actions` */
  hasActions?: (index: number) => boolean;
  /** The host fills `content` (a custom card) instead of the name and quadrant */
  custom?: boolean;
  /** The engine of the chart: the drawn label of the point gives way to the card */
  chart?: ChartInstance | null;
  /** A click on the name of the card (like a click on the dot) */
  onClick?: (index: number) => void;
  /**
   * The point whose actions (or custom content) the host renders changed;
   * `null`: none (no card, or a drag)
   */
  onChange?: (index: number | null) => void;
  /** Escape closed the card */
  onDismiss?: () => void;
}

/** Position of a dragged point, in data values */
export interface QuadrantCardPosition {
  x: number;
  y: number;
}

/** The point card of a quadrant matrix */
export interface QuadrantPointCard {
  /** Root of the card (`.minerva-chart-quadrant-card`); in the DOM while shown */
  readonly element: HTMLElement;
  /** Box of the actions of the host, in the first row of the card */
  readonly actions: HTMLElement;
  /** Box of a custom content (`custom`), in place of the name and quadrant */
  readonly content: HTMLElement;
  /** The point of the card, `null` while hidden */
  readonly index: number | null;
  /** Applies new settings (new points: the card keeps its point while it is the same) */
  update(options: QuadrantPointCardOptions): void;
  /** The hovered point of the engine (`null`: the card lingers a moment, then goes) */
  hover(index: number | null): void;
  /** The focused point button */
  focus(index: number | null): void;
  /** A point is dragged (`null`: the drag ended); the card follows `move` */
  drag(index: number | null, at?: QuadrantCardPosition): void;
  /** New position of the dragged point (placed once per frame) */
  move(at: QuadrantCardPosition): void;
  /** Hides the card until another point is hovered, focused or selected */
  dismiss(): void;
  /** Places the card again (the plot or the content of the host changed) */
  place(): void;
  destroy(): void;
}

/** Horizontal padding of the detached card surface, CSS pixels */
export const CARD_PAD_X = 10;
const CARD_PAD_Y = 8;
/** Clear space from the real point edge to its card surface */
const CARD_GAP = 10;
/** Height of the title row, with and without host actions */
const CARD_ROW = 20;
const CARD_ACTIONS_ROW = 24;
/** The surface stays inside the plot; the point itself keeps its position */
const CARD_MARGIN = 6;
/**
 * The card stays this long after the pointer leaves its dot: time to reach
 * its actions
 */
export const CARD_LINGER_MS = 180;

/**
 * Engine options of a matrix showing the point card: no engine tooltip, no
 * label chip and no drag pill beside it
 */
export const withQuadrantCard = (options: ChartOptions): ChartOptions => ({
  ...options,
  tooltip: false,
  interaction:
    typeof options.interaction === "object"
      ? { ...options.interaction, dragLabel: false, hoverLabel: false }
      : options.interaction,
});

/** A point named by its content: new arrays of the same points keep it */
const keyOf = (point: QuadrantPoint | undefined) =>
  point ? `${point.x}|${point.y}|${point.label ?? ""}` : null;

interface PointRef {
  index: number;
  key: string | null;
}

const fraction = (v: number, a: number, b: number) => (v - a) / (b - a || 1);

/**
 * Mounts the point card of a quadrant matrix in `host`, a box covering the
 * plot area (its `style.width` / `style.height`, else its client size)
 */
export const createQuadrantPointCard = (
  host: HTMLElement,
  initial: QuadrantPointCardOptions,
): QuadrantPointCard => {
  let options = initial;
  let hovered: PointRef | null = null;
  let held: PointRef | null = null;
  let pointerInside = false;
  /** A pointer press in the card is in progress (focus it moves is not keyboard focus) */
  let pressing = false;
  /** Focus inside the card came from the keyboard: it keeps the card open */
  let keyboardFocus = false;
  let focused: PointRef | null = null;
  let dragging: number | null = null;
  let dragAt: QuadrantCardPosition | null = null;
  let dismissed = false;
  let shown: number | null = null;
  let reported: number | null = null;
  let themed = false;
  let layout = "";
  let hoverTimer: ReturnType<typeof setTimeout> | null = null;
  let holdTimer: ReturnType<typeof setTimeout> | null = null;
  let focusTimer: ReturnType<typeof setTimeout> | null = null;
  let frame = 0;
  let measuredWidth = 0;
  let measuredHeight = 0;
  const observesSize = typeof ResizeObserver === "function";
  const doc = host.ownerDocument;
  const win = doc.defaultView;

  const card = doc.createElement("div");
  card.className = "minerva-chart-quadrant-card";
  styleTooltip(card, {
    zIndex: "3",
    boxSizing: "border-box",
    maxWidth: "min(280px, calc(100% - 12px))",
    paddingLeft: `${CARD_PAD_X}px`,
    paddingRight: `${CARD_PAD_X}px`,
    paddingTop: `${CARD_PAD_Y}px`,
    paddingBottom: `${CARD_PAD_Y}px`,
    borderRadius: "10px",
    fontSize: "13px",
    lineHeight: "20px",
    textAlign: "left",
    boxShadow:
      "0 6px 18px -6px rgba(0, 0, 0, 0.22), 0 2px 6px -3px rgba(0, 0, 0, 0.12)",
  });
  const dot = doc.createElement("span");
  dot.setAttribute("aria-hidden", "true");
  dot.dataset.cardDot = "";
  dot.style.cssText = "position:absolute;border-radius:50%;pointer-events:none";
  // The dot is an outside decoration of the surface, still anchored at its
  // data coordinates (also used by task-board action anchors). It lets the
  // pointer through to the chart; only the surface content holds the card.
  const body = doc.createElement("div");
  body.dataset.cardContent = "";
  body.style.cssText =
    "display:grid;column-gap:8px;row-gap:2px;align-items:center;" +
    'grid-template-areas:"label actions" "meta meta";' +
    "grid-template-columns:minmax(0,1fr) auto";
  // a click on the name acts like a click on the dot
  const label = doc.createElement("div");
  label.setAttribute("aria-hidden", "true");
  label.style.cssText = "grid-area:label;min-width:0;cursor:pointer";
  const name = doc.createElement("strong");
  name.style.cssText =
    "display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600";
  const content = doc.createElement("div");
  label.append(name, content);
  const actions = doc.createElement("div");
  actions.dataset.cardActions = "";
  actions.style.cssText = `grid-area:actions;display:flex;gap:4px;align-items:center;height:${CARD_ACTIONS_ROW}px`;
  const meta = doc.createElement("span");
  meta.setAttribute("aria-hidden", "true");
  meta.style.cssText =
    "grid-area:meta;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" +
    "color:var(--text-secondary-color, #6b7280);font-size:11px;line-height:16px";
  body.append(label, actions, meta);
  card.append(dot, body);

  const points = () => options.config.points;
  const refTo = (index: number | null): PointRef | null =>
    index === null ? null : { index, key: keyOf(points()[index]) };
  const valid = (ref: PointRef | null) =>
    ref && ref.key !== null && keyOf(points()[ref.index]) === ref.key
      ? ref.index
      : null;
  const selected = () => {
    const index = options.selectedIndex;
    return options.showSelected &&
      index !== null &&
      index !== undefined &&
      points()[index]
      ? index
      : null;
  };
  const activeIndex = () =>
    dismissed
      ? null
      : (valid(held) ??
        (options.hover !== false ? valid(hovered) : null) ??
        valid(focused) ??
        selected());
  const cardIndex = () => {
    if (dragging !== null) return points()[dragging] ? dragging : null;
    const index = activeIndex();
    const point = index === null ? undefined : points()[index];
    return point && Number.isFinite(point.x) && Number.isFinite(point.y)
      ? index
      : null;
  };
  const withActions = (index: number) =>
    dragging === null && !!options.hasActions?.(index);

  const place = (refreshSize = true) => {
    const index = shown;
    const point = index === null ? undefined : points()[index];
    if (index === null || !point || !card.parentNode) return;
    const { config } = options;
    if (!themed) {
      themed = true;
      // the colors of the theme around it, read again for every new point
      themeTooltip(card, card);
    }
    const live = dragging !== null ? dragAt : null;
    const at = live ?? point;
    const [x0, x1] = config.xDomain ?? [0, 10];
    const [y0, y1] = config.yDomain ?? [0, 10];
    const fx = fraction(at.x, x0, x1);
    const visualX = config.reverseX ? 1 - fx : fx;
    const plotWidth = parseFloat(host.style.width) || host.clientWidth;
    const plotHeight = parseFloat(host.style.height) || host.clientHeight;
    const left = visualX * plotWidth;
    const top = (1 - fraction(at.y, y0, y1)) * plotHeight;
    const size = point.size ?? options.pointSize ?? 12;
    const hasActions = withActions(index);
    const nextLayout = `${hasActions}|${size}`;
    if (layout !== nextLayout) {
      layout = nextLayout;
      body.style.minHeight = `${hasActions ? CARD_ACTIONS_ROW : CARD_ROW}px`;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
    }
    // Content, explicit placement and ResizeObserver refresh the measurement.
    // Drag frames reuse it, so moving the point does not force layout.
    if (refreshSize || !observesSize) {
      measuredWidth = card.offsetWidth;
      measuredHeight = card.offsetHeight;
    }
    const radius = size / 2;
    const position = placeTooltip({
      anchor: { x: left, y: top },
      avoid: { x: left - radius, y: top - radius, width: size, height: size },
      size: { width: measuredWidth, height: measuredHeight },
      stage: { width: plotWidth, height: plotHeight },
      // Retain a fitting side through a drag rather than flipping repeatedly.
      prefer:
        card.dataset.side === "end" || (!card.dataset.side && visualX > 0.6)
          ? "left"
          : "right",
      gap: CARD_GAP + (live ? 8 : 0),
      margin: CARD_MARGIN,
    });
    card.dataset.side = position.x >= left ? "start" : "end";
    card.style.transform = `translate(${position.x}px, ${position.y}px)`;
    // The retained dot sits outside the surface, never taking text space.
    // Its local offset includes the surface's 1px border.
    dot.style.left = `${left - position.x - 1 - radius}px`;
    dot.style.right = "auto";
    dot.style.top = `${top - position.y - 1 - radius}px`;
    // the quadrant under the point (live in a drag)
    const corner = quadrantOf(config, at.x, at.y);
    const region = config.quadrants?.[corner];
    const where = quadrantName(corner, config, quadrantLabels(options.locale));
    const text = region?.badge ? `${region.badge} · ${where}` : where;
    if (meta.textContent !== text) meta.textContent = text;
    const own = quadrantOf(config, point.x, point.y);
    const color =
      point.color ??
      config.quadrants?.[own]?.color ??
      DEFAULT_QUADRANT_COLORS[own];
    dot.style.display = live ? "none" : "block";
    dot.style.background = color;
    dot.style.boxShadow = `0 0 0 2px color-mix(in srgb, ${color} 24%, transparent)`;
  };

  const onKey = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || dragging !== null || shown === null) return;
    api.dismiss();
    options.onDismiss?.();
  };

  const render = () => {
    const index = cardIndex();
    const changed = index !== shown;
    shown = index;
    if (index === null) {
      pointerInside = false;
      if (card.parentNode) {
        card.remove();
        doc.removeEventListener("keydown", onKey);
      }
      layout = "";
      delete card.dataset.side;
    } else {
      const point = points()[index]!;
      if (changed) {
        // a new point: its colors, its side
        themed = false;
        delete card.dataset.side;
      }
      card.dataset.pointPreview = String(index);
      if (dragging !== null) card.dataset.dragging = "";
      else delete card.dataset.dragging;
      const custom = !!options.custom && dragging === null;
      name.textContent = point.label ?? "";
      name.style.display = custom ? "none" : "block";
      content.style.display = custom ? "block" : "none";
      meta.style.display = custom ? "none" : "block";
      actions.style.display = withActions(index) ? "flex" : "none";
      body.style.pointerEvents = dragging !== null ? "none" : "auto";
      if (!card.parentNode) {
        host.appendChild(card);
        doc.addEventListener("keydown", onKey);
      }
    }
    // the card names the point: its drawn label gives way (keeping its place)
    options.chart?.setLabelHidden(
      index !== null && dragging === null ? { seriesIndex: 0, index } : null,
    );
    place();
    const report = dragging === null ? index : null;
    if (report !== reported) {
      reported = report;
      options.onChange?.(report);
    }
  };

  const keyboardFocusInside = () =>
    keyboardFocus && body.contains(doc.activeElement);

  const hold = (index: number | null) => {
    if (holdTimer) clearTimeout(holdTimer);
    holdTimer = null;
    if (index !== null) {
      held = refTo(index);
      return render();
    }
    holdTimer = setTimeout(() => {
      holdTimer = null;
      if (pointerInside || keyboardFocusInside()) return;
      held = null;
      render();
    }, CARD_LINGER_MS);
  };
  const onEnter = (event: Event) => {
    if (event.type === "pointerenter") pointerInside = true;
    // focus moved in by a click on an action is not keyboard focus: once the
    // pointer leaves, the card goes as after any hover
    else keyboardFocus = !pressing;
    if (shown !== null && dragging === null) hold(shown);
  };
  const onLeave = () => {
    pointerInside = false;
    hold(null);
  };
  const onFocusOut = (event: FocusEvent) => {
    if (body.contains(event.relatedTarget as Node | null)) return;
    keyboardFocus = false;
    hold(null);
  };
  const onPress = () => {
    pressing = true;
    keyboardFocus = false;
    // released anywhere (also outside the card)
    doc.addEventListener("pointerup", onRelease, true);
    doc.addEventListener("pointercancel", onRelease, true);
  };
  function onRelease() {
    pressing = false;
    doc.removeEventListener("pointerup", onRelease, true);
    doc.removeEventListener("pointercancel", onRelease, true);
  }
  // keys pressed on a clicked action make its focus keyboard focus
  const onCardKey = () => {
    if (body.contains(doc.activeElement)) keyboardFocus = true;
  };
  const onClick = () => {
    if (shown !== null && dragging === null) options.onClick?.(shown);
  };
  body.addEventListener("pointerenter", onEnter);
  body.addEventListener("pointerleave", onLeave);
  body.addEventListener("pointerdown", onPress, true);
  body.addEventListener("keydown", onCardKey, true);
  body.addEventListener("focusin", onEnter);
  body.addEventListener("focusout", onFocusOut);
  label.addEventListener("click", onClick);

  // the size of the card follows its content (actions, custom content)
  const resizeObserver =
    typeof ResizeObserver === "function"
      ? new ResizeObserver(() => place())
      : null;
  resizeObserver?.observe(card);
  // and its place follows the plot
  resizeObserver?.observe(host);

  const api: QuadrantPointCard = {
    element: card,
    actions,
    content,
    get index() {
      return shown;
    },
    update(next) {
      const selection = options.selectedIndex;
      options = next;
      if (
        next.showSelected &&
        next.selectedIndex !== selection &&
        next.selectedIndex != null
      )
        dismissed = false;
      render();
    },
    hover(index) {
      if (hoverTimer) clearTimeout(hoverTimer);
      hoverTimer = null;
      if (index !== null) {
        // Linger bridges the gap to the card's actions. Once a different point
        // is reached outside the card, it takes over even if a clicked action
        // retains focus. Keyboard focus still protects the card without a new
        // pointer target, including after the linger timer has expired.
        if (valid(held) !== index && !pointerInside) {
          if (holdTimer) clearTimeout(holdTimer);
          holdTimer = null;
          held = null;
        }
        hovered = refTo(index);
        dismissed = false;
        return render();
      }
      // off the dot: the card stays a moment (the pointer may be on its way
      // to the actions)
      hoverTimer = setTimeout(() => {
        hoverTimer = null;
        hovered = null;
        render();
      }, CARD_LINGER_MS);
    },
    focus(index) {
      if (focusTimer) clearTimeout(focusTimer);
      focusTimer = null;
      if (index === null) {
        // focus leaving a point button may be on its way into the actions
        // of the card: they hold it first
        if (!focused) return;
        focusTimer = setTimeout(() => {
          focusTimer = null;
          focused = null;
          render();
        }, 0);
        return;
      }
      focused = refTo(index);
      dismissed = false;
      render();
    },
    drag(index, at) {
      dragging = index;
      dragAt = index === null ? null : (at ?? null);
      if (index !== null) {
        dismissed = false;
        held = null;
      }
      render();
    },
    move(at) {
      dragAt = at;
      if (!win?.requestAnimationFrame) return place(false);
      if (!frame)
        frame = win.requestAnimationFrame(() => {
          frame = 0;
          place(false);
        });
    },
    dismiss() {
      dismissed = true;
      held = null;
      hovered = null;
      if (holdTimer) clearTimeout(holdTimer);
      if (hoverTimer) clearTimeout(hoverTimer);
      holdTimer = hoverTimer = null;
      render();
    },
    place,
    destroy() {
      if (hoverTimer) clearTimeout(hoverTimer);
      if (holdTimer) clearTimeout(holdTimer);
      if (focusTimer) clearTimeout(focusTimer);
      if (frame) win?.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      doc.removeEventListener("keydown", onKey);
      body.removeEventListener("pointerenter", onEnter);
      body.removeEventListener("pointerleave", onLeave);
      body.removeEventListener("pointerdown", onPress, true);
      body.removeEventListener("keydown", onCardKey, true);
      onRelease();
      body.removeEventListener("focusin", onEnter);
      body.removeEventListener("focusout", onFocusOut);
      label.removeEventListener("click", onClick);
      card.remove();
      options.chart?.setLabelHidden(null);
    },
  };
  render();
  return api;
};
