// Drag and drop of the cards of a KanbanBoard, shared by the web renderers
// (React DOM, Vue, Web Components, Angular). The board stays controlled: the
// controller never moves a card, it shows where the card would land (a
// floating copy under the pointer, a drop line, the target column
// highlighted) and reports a `KanbanCardMove` on drop.
//
// - pointer: Pointer Events (mouse, pen and touch; no HTML5 drag and drop,
//   which touch screens lack). A mouse drag starts after a few pixels; touch
//   and pen need a long press so that swiping still scrolls the board. The
//   board scrolls horizontally, and the column under the pointer vertically,
//   near their edges. Escape cancels.
// - keyboard: on a focused card, Space / Enter picks it up, the arrows move
//   it (Left / Right between columns, Up / Down within one), Space / Enter
//   drops it, Escape cancels; every step is announced in a live region.
//
// The renderer describes its DOM with an adapter (columns, cards, keys and
// labels, the scrolling body of a column) and re-reads its props through
// getters, so one controller lives as long as the board.
import {
  isKanbanNoop,
  kanbanCardMove,
  kanbanInsertIndex,
  kanbanKeyAction,
  kanbanKeyboardTarget,
  kanbanSlots,
  type KanbanCardMove,
  type KanbanLayoutColumn,
  type KanbanPosition,
} from "@minerva/core";
import { getDirection } from "./direction";
import { INTERACTIVE_SELECTOR } from "./interactive-target";

/** How a renderer exposes the columns and cards of a board */
export interface KanbanDragAdapter {
  /** The columns of the board, in order */
  columns(): HTMLElement[];
  /** Key (`value`) of a column; columns without one take no cards */
  columnKey(column: HTMLElement): string | null | undefined;
  /** Name of a column in the announcements (its title) */
  columnLabel(column: HTMLElement): string;
  /** The cards of a column, in order */
  cards(column: HTMLElement): HTMLElement[];
  /** Key (`value`) of a card; cards without one cannot be dragged */
  cardKey(card: HTMLElement): string | null | undefined;
  /** Name of a card in the announcements */
  cardLabel(card: HTMLElement): string;
  /** The vertically scrolling body of a column (its list, else its empty content) */
  body(column: HTMLElement): HTMLElement | null;
}

/** Options of `createKanbanDrag` (read on every use: pass getters) */
export interface KanbanDragOptions extends KanbanDragAdapter {
  /** The horizontally scrolling element of the board */
  scroller(): HTMLElement | null;
  /**
   * Element holding the drag layer (the floating card, the drop line, the
   * live region and the keyboard instructions); the board root by default.
   * It must share the cards' tree scope (the instructions are their
   * `aria-describedby`).
   */
  layerParent?(): HTMLElement;
  /** Id of the keyboard instructions element the cards are described by */
  hintId: string;
  /** Whether dragging is on (the `draggable` prop) */
  enabled(): boolean;
  /** Whether a card may be dropped there (the `canDrop` prop) */
  canDrop?(move: KanbanCardMove): boolean;
  /** Reports a drop that moves a card (the `onCardMove` prop / event) */
  onMove(move: KanbanCardMove): void;
  /** Translates a `kanban.*` message */
  t(key: string, params?: Record<string, string | number>): string;
}

/** A drag controller attached to a board root */
export interface KanbanDrag {
  /** Whether a card is picked up */
  readonly dragging: boolean;
  /** Syncs the layer with the options (call after every render) */
  refresh(): void;
  /** Drops nothing: puts a picked-up card back */
  cancel(): void;
  /** Removes the listeners and the layer */
  destroy(): void;
}

/** Attribute naming the key of a column (React, Vue, Angular) */
export const KANBAN_COLUMN_ATTRIBUTE = "data-kanban-column";
/** Attribute naming the key of a card (React, Vue, Angular) */
export const KANBAN_CARD_ATTRIBUTE = "data-kanban-card";

/** Pixels a mouse moves before a press becomes a drag */
const MOUSE_THRESHOLD = 4;
/** Long press (ms) that picks a card up with touch / pen */
const TOUCH_DELAY = 250;
/** Pixels a finger may move during the long press (more: a scroll) */
const TOUCH_TOLERANCE = 8;
/** Width of the edges that auto-scroll (pixels) */
const EDGE = 48;
/** Fastest auto-scroll step (pixels per frame) */
const MAX_SPEED = 16;

const text = (element: Element | null | undefined) =>
  (element?.textContent ?? "").replace(/\s+/g, " ").trim();

/**
 * Adapter of the renderers that mark their DOM with data attributes:
 * `data-kanban-column` / `data-kanban-card` hold the keys, the column parts
 * are `data-minerva="kanban-column"` + `data-part="title" | "list" |
 * "empty"`. Nested boards are ignored.
 */
export function kanbanDataAdapter(root: HTMLElement): KanbanDragAdapter {
  const ownColumn = (element: Element) =>
    element.parentElement?.closest(`[${KANBAN_COLUMN_ATTRIBUTE}]`);
  const parts = (column: HTMLElement, names: string[]) =>
    Array.from(
      column.querySelectorAll<HTMLElement>(
        names
          .map((name) => `[data-minerva="kanban-column"][data-part="${name}"]`)
          .join(","),
      ),
    ).filter((element) => ownColumn(element) === column);
  const adapter: KanbanDragAdapter = {
    columns: () =>
      Array.from(
        root.querySelectorAll<HTMLElement>(`[${KANBAN_COLUMN_ATTRIBUTE}]`),
      ).filter(
        (column) =>
          column.parentElement?.closest('[data-minerva="kanban-board"]') ===
          root,
      ),
    columnKey: (column) => column.getAttribute(KANBAN_COLUMN_ATTRIBUTE),
    columnLabel: (column) => {
      const [title] = parts(column, ["title"]);
      return (
        text(title) ||
        column.getAttribute("aria-label") ||
        adapter.columnKey(column) ||
        ""
      );
    },
    cards: (column) =>
      Array.from(
        column.querySelectorAll<HTMLElement>(`[${KANBAN_CARD_ATTRIBUTE}]`),
      ).filter((card) => ownColumn(card) === column),
    cardKey: (card) => card.getAttribute(KANBAN_CARD_ATTRIBUTE),
    cardLabel: (card) =>
      card.getAttribute("aria-label") ||
      text(card) ||
      adapter.cardKey(card) ||
      "",
    body: (column) => {
      const body = parts(column, ["list", "empty"]);
      const list = body.find((part) => part.dataset.part === "list");
      const empty = body.find((part) => part.dataset.part === "empty");
      return adapter.cards(column).length > 0
        ? (list ?? empty ?? null)
        : (empty ?? list ?? null);
    },
  };
  return adapter;
}

interface Drag {
  mode: "pointer" | "keyboard";
  card: HTMLElement;
  key: string;
  label: string;
  from: KanbanPosition;
  /** Where the card would land (`null`: nowhere, a drop cancels) */
  target: KanbanPosition | null;
  column: HTMLElement | null;
  /** Pointer: id, position, and where the card was grabbed */
  pointerId?: number;
  x: number;
  y: number;
  grabX: number;
  grabY: number;
  ghost?: HTMLElement;
}

interface Pending {
  card: HTMLElement;
  pointerId: number;
  touch: boolean;
  x: number;
  y: number;
  timer?: ReturnType<typeof setTimeout>;
}

const visuallyHidden =
  "position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0";

/**
 * Attaches drag and drop of cards to a board: pointer listeners on `root`
 * (events from the cards bubble to it, across shadow roots too) and a layer
 * appended to it while dragging is enabled.
 */
export function createKanbanDrag(
  root: HTMLElement,
  options: KanbanDragOptions,
): KanbanDrag {
  const doc = root.ownerDocument;
  const view = doc.defaultView ?? window;
  let drag: Drag | null = null;
  let pending: Pending | null = null;
  let layer: HTMLElement | null = null;
  let hint: HTMLElement | null = null;
  let live: HTMLElement | null = null;
  let line: HTMLElement | null = null;
  let frame = 0;
  let destroyed = false;

  // --- layout ------------------------------------------------------------

  const keyedColumns = () =>
    options
      .columns()
      .map((element) => ({ element, key: options.columnKey(element) }))
      .filter((column): column is { element: HTMLElement; key: string } =>
        Boolean(column.key),
      );

  const keyedCards = (column: HTMLElement) =>
    options
      .cards(column)
      .map((element) => ({ element, key: options.cardKey(element) }))
      .filter((card): card is { element: HTMLElement; key: string } =>
        Boolean(card.key),
      );

  const layout = (): KanbanLayoutColumn[] =>
    keyedColumns().map(({ element, key }) => ({
      key,
      cards: keyedCards(element).map((card) => card.key),
    }));

  const columnElement = (key: string) =>
    keyedColumns().find((column) => column.key === key)?.element ?? null;

  /** The draggable card `node` is (with its column key), if any */
  const cardOf = (node: EventTarget | null) => {
    if (!(node instanceof HTMLElement)) return null;
    for (const column of keyedColumns()) {
      const card = keyedCards(column.element).find(
        (entry) => entry.element === node,
      );
      if (card) return { ...card, column: column.key };
    }
    return null;
  };

  /** The card a pointer event starts on (closest card in the composed path) */
  const cardFromPath = (event: Event) => {
    for (const node of event.composedPath()) {
      if (node === root) return null;
      const card = cardOf(node);
      if (card) return card;
    }
    return null;
  };

  // --- layer ----------------------------------------------------------------

  const ensureLayer = () => {
    if (layer) return;
    layer = doc.createElement("div");
    layer.setAttribute("data-kanban-layer", "");
    // a zero-size fixed box: its children are placed in viewport
    // coordinates (corrected by its own offset under a transformed ancestor)
    layer.style.cssText =
      "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:var(--z-popover, 1000)";
    hint = doc.createElement("span");
    hint.hidden = true;
    live = doc.createElement("div");
    live.setAttribute("role", "status");
    live.setAttribute("aria-live", "assertive");
    live.setAttribute("aria-atomic", "true");
    live.style.cssText = visuallyHidden;
    layer.append(hint, live);
  };

  const refresh = () => {
    if (destroyed) return;
    if (!options.enabled()) {
      if (drag) cancel();
      layer?.remove();
      return;
    }
    ensureLayer();
    const parent = options.layerParent?.() ?? root;
    if (layer!.parentNode !== parent) parent.append(layer!);
    hint!.id = options.hintId;
    hint!.textContent = options.t("kanban.dragHint");
  };

  let toggle = false;
  const announce = (
    message: "lifted" | "over" | "dropped" | "cancelled",
    position: KanbanPosition,
  ) => {
    if (!drag || !live) return;
    const all = layout();
    const column = columnElement(position.column);
    // a trailing no-break space alternates so that a repeated message is
    // announced again
    toggle = !toggle;
    live.textContent =
      options.t(`kanban.${message}`, {
        card: drag.label,
        column: column ? options.columnLabel(column) : position.column,
        position: position.index + 1,
        total: kanbanSlots(all, drag.key, position.column),
      }) + (toggle ? "\u00a0" : "");
  };

  const origin = () => {
    const box = layer?.getBoundingClientRect();
    return { x: box?.left ?? 0, y: box?.top ?? 0 };
  };

  // --- target --------------------------------------------------------------

  const accept = (move: KanbanCardMove) =>
    isKanbanNoop(move) || !options.canDrop || options.canDrop(move);

  /** Where a card dropped at (x, y) would land, `null` for nowhere */
  const targetAt = (x: number, y: number): KanbanPosition | null => {
    if (!drag) return null;
    const scroller = options.scroller();
    if (scroller) {
      const box = scroller.getBoundingClientRect();
      if (
        x < box.left - EDGE ||
        x > box.right + EDGE ||
        y < box.top - EDGE ||
        y > box.bottom + EDGE
      )
        return null;
    }
    let best: { key: string; element: HTMLElement } | null = null;
    let distance = Infinity;
    for (const column of keyedColumns()) {
      const box = column.element.getBoundingClientRect();
      const d = x < box.left ? box.left - x : x > box.right ? x - box.right : 0;
      if (d < distance) {
        distance = d;
        best = column;
      }
    }
    if (!best) return null;
    const midpoints = keyedCards(best.element)
      .filter((card) => card.element !== drag!.card)
      .map((card) => {
        const box = card.element.getBoundingClientRect();
        return box.top + box.height / 2;
      });
    const move = kanbanCardMove(layout(), drag.key, {
      column: best.key,
      index: kanbanInsertIndex(midpoints, y),
    });
    return move && accept(move)
      ? { column: move.toColumn, index: move.toIndex }
      : null;
  };

  /** Shows the drop line and the highlighted column of the target */
  const paint = () => {
    if (!drag) return;
    const column = drag.target ? columnElement(drag.target.column) : null;
    if (drag.column !== column) {
      drag.column?.removeAttribute("data-kanban-drop-target");
      column?.setAttribute("data-kanban-drop-target", "");
      drag.column = column;
    }
    if (!column || !drag.target) {
      line?.remove();
      line = null;
      return;
    }
    if (!line) {
      line = doc.createElement("div");
      line.setAttribute("data-kanban-drop-line", "");
      line.setAttribute("aria-hidden", "true");
      line.style.cssText =
        "position:absolute;height:2px;margin-top:-1px;border-radius:1px;background:var(--kanban-drop-indicator-color, var(--primary-color));forced-color-adjust:none;pointer-events:none";
      layer?.append(line);
    }
    const others = keyedCards(column)
      .filter((card) => card.element !== drag!.card)
      .map((card) => card.element.getBoundingClientRect());
    const body = (options.body(column) ?? column).getBoundingClientRect();
    const index = drag.target.index;
    let y: number;
    let left = body.left + 8;
    let width = Math.max(0, body.width - 16);
    if (others.length === 0) {
      y = body.top + Math.min(8, body.height / 2);
    } else {
      const next = others[index];
      const previous = others[index - 1];
      if (next && previous) y = (previous.bottom + next.top) / 2;
      else if (next) y = next.top - 4;
      else y = previous!.bottom + 4;
      const reference = others[0]!;
      left = reference.left;
      width = reference.width;
    }
    // keep the line inside the visible part of the column body
    y = Math.min(Math.max(y, body.top), body.bottom);
    const offset = origin();
    line.style.left = `${left - offset.x}px`;
    line.style.top = `${y - offset.y}px`;
    line.style.width = `${width}px`;
  };

  const placeGhost = () => {
    if (!drag?.ghost) return;
    const offset = origin();
    drag.ghost.style.left = `${drag.x - drag.grabX - offset.x}px`;
    drag.ghost.style.top = `${drag.y - drag.grabY - offset.y}px`;
  };

  // --- lifecycle --------------------------------------------------------------

  const lift = (
    card: { element: HTMLElement; key: string; column: string },
    mode: Drag["mode"],
    pointer?: { x: number; y: number; id: number },
  ) => {
    const from = layout();
    const index = from
      .find((column) => column.key === card.column)!
      .cards.indexOf(card.key);
    drag = {
      mode,
      card: card.element,
      key: card.key,
      label: options.cardLabel(card.element),
      from: { column: card.column, index },
      target: { column: card.column, index },
      column: null,
      x: pointer?.x ?? 0,
      y: pointer?.y ?? 0,
      grabX: 0,
      grabY: 0,
      pointerId: pointer?.id,
    };
    ensureLayer();
    refresh();
    card.element.setAttribute("data-kanban-dragging", mode);
    root.setAttribute("data-kanban-dragging", mode);
    if (pointer) {
      const box = card.element.getBoundingClientRect();
      drag.grabX = pointer.x - box.left;
      drag.grabY = pointer.y - box.top;
      const ghost = card.element.cloneNode(true) as HTMLElement;
      for (const element of [ghost, ...ghost.querySelectorAll("[id]")])
        element.removeAttribute("id");
      ghost.removeAttribute("data-kanban-dragging");
      ghost.removeAttribute(KANBAN_CARD_ATTRIBUTE);
      ghost.removeAttribute("tabindex");
      ghost.setAttribute("aria-hidden", "true");
      ghost.setAttribute("inert", "");
      ghost.setAttribute("data-kanban-ghost", "");
      ghost.style.position = "absolute";
      ghost.style.boxSizing = "border-box";
      ghost.style.width = `${box.width}px`;
      ghost.style.margin = "0";
      ghost.style.pointerEvents = "none";
      ghost.style.opacity = "0.92";
      ghost.style.transform = "rotate(1.5deg)";
      ghost.style.boxShadow = "var(--shadow-lg, 0 10px 24px rgb(0 0 0 / 0.18))";
      ghost.style.cursor = "grabbing";
      drag.ghost = ghost;
      layer!.append(ghost);
      placeGhost();
      view.getSelection?.()?.removeAllRanges();
      doc.addEventListener("keydown", onDocumentKeyDown, true);
      doc.addEventListener("contextmenu", preventDefault, true);
      frame = view.requestAnimationFrame(autoScroll);
    } else {
      card.element.addEventListener("blur", onCardBlur);
    }
    paint();
    announce("lifted", drag.from);
  };

  /** Removes every trace of the drag; returns it */
  const finish = () => {
    const current = drag;
    if (!current) return null;
    current.card.removeAttribute("data-kanban-dragging");
    current.card.removeEventListener("blur", onCardBlur);
    current.column?.removeAttribute("data-kanban-drop-target");
    root.removeAttribute("data-kanban-dragging");
    current.ghost?.remove();
    line?.remove();
    line = null;
    view.cancelAnimationFrame(frame);
    doc.removeEventListener("keydown", onDocumentKeyDown, true);
    doc.removeEventListener("contextmenu", preventDefault, true);
    stopPointer();
    return current;
  };

  const cancel = () => {
    const current = drag;
    if (!current) return;
    announce("cancelled", current.from);
    finish();
    drag = null;
  };

  const drop = () => {
    const current = drag;
    if (!current) return;
    const move = current.target
      ? kanbanCardMove(layout(), current.key, current.target)
      : undefined;
    if (!move || !accept(move)) {
      cancel();
      return;
    }
    announce("dropped", { column: move.toColumn, index: move.toIndex });
    finish();
    drag = null;
    if (isKanbanNoop(move)) return;
    options.onMove(move);
    if (current.mode === "keyboard") restoreFocus(current.key, current.card);
  };

  /**
   * The app re-renders the moved card, often as a new element: give it the
   * focus back (once the renderer has updated) unless focus went elsewhere
   */
  const restoreFocus = (key: string, previous: HTMLElement) => {
    const attempt = () => {
      if (destroyed) return;
      const active = doc.activeElement;
      if (active && active !== doc.body && active !== previous) return;
      if (active === previous && previous.isConnected) return;
      for (const column of keyedColumns()) {
        const card = keyedCards(column.element).find(
          (entry) => entry.key === key,
        );
        if (card) {
          card.element.focus();
          return;
        }
      }
    };
    view.requestAnimationFrame(() => {
      attempt();
      view.requestAnimationFrame(attempt);
    });
  };

  // --- pointer ------------------------------------------------------------------

  const preventDefault = (event: Event) => event.preventDefault();

  const stopPointer = () => {
    if (pending?.timer) clearTimeout(pending.timer);
    pending = null;
    doc.removeEventListener("pointermove", onPointerMove);
    doc.removeEventListener("pointerup", onPointerUp);
    doc.removeEventListener("pointercancel", onPointerCancel);
    root.removeEventListener("touchmove", onTouchMove);
  };

  const startPointerDrag = (x: number, y: number) => {
    if (!pending) return;
    const card = cardOf(pending.card);
    const id = pending.pointerId;
    if (pending.timer) clearTimeout(pending.timer);
    pending = null;
    if (!card) return;
    lift(card, "pointer", { x, y, id });
  };

  /**
   * Whether a press starts on a control inside the card (a button, a link):
   * it keeps working and does not drag. The card's own shadow content (the
   * focusable wrapper of a web component card) is not such a control.
   */
  const startsOnControl = (event: Event, card: HTMLElement) => {
    for (const node of event.composedPath()) {
      if (node === card) return false;
      if (!(node instanceof Element)) continue;
      if (card.shadowRoot && node.getRootNode() === card.shadowRoot) continue;
      if (node.matches(INTERACTIVE_SELECTOR)) return true;
    }
    return false;
  };

  const onPointerDown = (event: PointerEvent) => {
    if (!options.enabled() || drag || pending) return;
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button))
      return;
    const card = cardFromPath(event);
    if (!card || startsOnControl(event, card.element)) return;
    const touch = event.pointerType !== "mouse";
    pending = {
      card: card.element,
      pointerId: event.pointerId,
      touch,
      x: event.clientX,
      y: event.clientY,
    };
    if (touch) {
      const { x, y } = pending;
      pending.timer = setTimeout(() => startPointerDrag(x, y), TOUCH_DELAY);
      // the long press must be able to stop the page / board from scrolling
      root.addEventListener("touchmove", onTouchMove, { passive: false });
    }
    doc.addEventListener("pointermove", onPointerMove);
    doc.addEventListener("pointerup", onPointerUp);
    doc.addEventListener("pointercancel", onPointerCancel);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (pending && event.pointerId === pending.pointerId) {
      const moved = Math.hypot(
        event.clientX - pending.x,
        event.clientY - pending.y,
      );
      if (pending.touch) {
        // moving before the long press is a scroll
        if (moved > TOUCH_TOLERANCE) stopPointer();
        return;
      }
      if (moved < MOUSE_THRESHOLD) return;
      startPointerDrag(pending.x, pending.y);
    }
    if (!drag || drag.mode !== "pointer" || event.pointerId !== drag.pointerId)
      return;
    event.preventDefault();
    drag.x = event.clientX;
    drag.y = event.clientY;
    placeGhost();
    retarget();
  };

  const retarget = () => {
    if (!drag) return;
    const next = targetAt(drag.x, drag.y);
    const same =
      next === drag.target ||
      (next &&
        drag.target &&
        next.column === drag.target.column &&
        next.index === drag.target.index);
    drag.target = next;
    paint();
    if (!same && next) announce("over", next);
  };

  const onPointerUp = (event: PointerEvent) => {
    if (drag?.mode === "pointer" && event.pointerId === drag.pointerId) {
      // the click that follows a drag must not activate the card
      doc.addEventListener("click", swallowClick, true);
      setTimeout(() => doc.removeEventListener("click", swallowClick, true), 0);
      drop();
      return;
    }
    if (pending && event.pointerId === pending.pointerId) stopPointer();
  };

  const swallowClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    doc.removeEventListener("click", swallowClick, true);
  };

  const onPointerCancel = (event: PointerEvent) => {
    if (drag?.mode === "pointer" && event.pointerId === drag.pointerId)
      cancel();
    else if (pending && event.pointerId === pending.pointerId) stopPointer();
  };

  const onTouchMove = (event: TouchEvent) => {
    if (drag?.mode === "pointer" && event.cancelable) event.preventDefault();
  };

  /** Scrolls `scroller` along an axis when the pointer is near its edges */
  const edgeScroll = (
    scroller: HTMLElement,
    axis: "x" | "y",
    position: number,
  ) => {
    const box = scroller.getBoundingClientRect();
    const [start, end] =
      axis === "x" ? [box.left, box.right] : [box.top, box.bottom];
    const edge = Math.min(EDGE, (end - start) / 4);
    if (edge <= 0) return false;
    let step = 0;
    if (position < start + edge)
      step = -Math.ceil(MAX_SPEED * (1 - Math.max(0, position - start) / edge));
    else if (position > end - edge)
      step = Math.ceil(MAX_SPEED * (1 - Math.max(0, end - position) / edge));
    if (!step) return false;
    const before = axis === "x" ? scroller.scrollLeft : scroller.scrollTop;
    if (axis === "x") scroller.scrollLeft += step;
    else scroller.scrollTop += step;
    return (axis === "x" ? scroller.scrollLeft : scroller.scrollTop) !== before;
  };

  const autoScroll = () => {
    if (!drag || drag.mode !== "pointer") return;
    const scroller = options.scroller();
    let scrolled = scroller ? edgeScroll(scroller, "x", drag.x) : false;
    const body = drag.column ? options.body(drag.column) : null;
    if (body) scrolled = edgeScroll(body, "y", drag.y) || scrolled;
    if (scrolled) retarget();
    frame = view.requestAnimationFrame(autoScroll);
  };

  // --- keyboard -----------------------------------------------------------------

  /** Scrolls the board / column body (never the page) to show `element` */
  const reveal = (scroller: HTMLElement | null, element: Element) => {
    if (!scroller) return;
    const outer = scroller.getBoundingClientRect();
    const inner = element.getBoundingClientRect();
    if (inner.left < outer.left) scroller.scrollLeft -= outer.left - inner.left;
    else if (inner.right > outer.right)
      scroller.scrollLeft += Math.min(
        inner.right - outer.right,
        inner.left - outer.left,
      );
    if (inner.top < outer.top) scroller.scrollTop -= outer.top - inner.top;
    else if (inner.bottom > outer.bottom)
      scroller.scrollTop += Math.min(
        inner.bottom - outer.bottom,
        inner.top - outer.top,
      );
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!options.enabled() || event.defaultPrevented) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const action = kanbanKeyAction(event.key, getDirection(root) === "rtl");
    if (!action) return;
    if (!drag) {
      if (action !== "toggle" || event.repeat) return;
      const card = cardOf(event.target);
      if (!card) return;
      event.preventDefault();
      lift(card, "keyboard");
      return;
    }
    if (drag.mode !== "keyboard" || event.target !== drag.card) return;
    event.preventDefault();
    event.stopPropagation();
    if (action === "toggle") {
      if (!event.repeat) drop();
      return;
    }
    if (action === "cancel") {
      cancel();
      return;
    }
    const current = drag.target ?? drag.from;
    const next = kanbanKeyboardTarget(
      layout(),
      drag.key,
      current,
      action,
      options.canDrop ? accept : undefined,
    );
    if (!next) return;
    drag.target = next;
    const column = columnElement(next.column);
    if (column) {
      reveal(options.scroller(), column);
      const neighbor = keyedCards(column).filter(
        (card) => card.element !== drag!.card,
      )[next.index];
      const body = options.body(column);
      if (neighbor) reveal(body, neighbor.element);
      else if (body) body.scrollTop = body.scrollHeight;
    }
    paint();
    announce("over", next);
  };

  const onDocumentKeyDown = (event: KeyboardEvent) => {
    if (drag?.mode === "pointer" && kanbanKeyAction(event.key) === "cancel") {
      event.preventDefault();
      event.stopPropagation();
      cancel();
    }
  };

  const onCardBlur = () => {
    if (drag?.mode === "keyboard") cancel();
  };

  /**
   * Native drag and drop (links, images, a draggable="true" card or board)
   * stays off
   */
  const onDragStart = (event: DragEvent) => {
    if (
      options.enabled() &&
      (drag || pending || event.target === root || cardFromPath(event))
    )
      event.preventDefault();
  };

  root.addEventListener("pointerdown", onPointerDown);
  root.addEventListener("keydown", onKeyDown);
  root.addEventListener("dragstart", onDragStart);
  refresh();

  return {
    get dragging() {
      return drag !== null;
    },
    refresh,
    cancel,
    destroy() {
      finish();
      drag = null;
      destroyed = true;
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("keydown", onKeyDown);
      root.removeEventListener("dragstart", onDragStart);
      layer?.remove();
      layer = null;
    },
  };
}
