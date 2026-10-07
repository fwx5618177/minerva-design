import { contains, getEventTarget, getOwnerDocument } from "./dom";

/**
 * Outside-interaction callback. Receives the original DOM event; call
 * `event.preventDefault()` or return `false` to keep the layer open.
 */
export type DismissHandler<E extends Event> = (event: E) => void | boolean;

export interface DismissableLayerOptions {
  /** Escape pressed while this layer is the topmost one. */
  onEscapeKeyDown?: DismissHandler<KeyboardEvent>;
  /** Pointer pressed outside the layer (and its branches / child layers). */
  onPointerDownOutside?: DismissHandler<PointerEvent>;
  /** Focus moved outside the layer (and its branches / child layers). */
  onFocusOutside?: DismissHandler<FocusEvent>;
  /** Either of the two above (called after the specific handler). */
  onInteractOutside?: DismissHandler<PointerEvent | FocusEvent>;
  /** The layer should close (no handler cancelled the interaction). */
  onDismiss?: () => void;
  /**
   * Make everything below this layer inert to the pointer (modal):
   * `body` gets `pointer-events: none`, this layer and the layers above it
   * get `pointer-events: auto`. Layers below are not dismissed by pointer.
   * @default false
   */
  disableOutsidePointerEvents?: boolean;
  /**
   * Elements treated as part of the layer (e.g. the trigger), so
   * interacting with them is not "outside".
   */
  branches?: () => Array<Element | null | undefined>;
  /**
   * Return `true` to ignore an interaction entirely (neither inside nor
   * outside), e.g. clicks in a toast viewport.
   */
  excludeFromOutside?: (target: Node) => boolean;
  /**
   * Explicit parent layer. Interactions inside a child layer are "inside" for
   * all of its ancestors. When omitted, the parent is the closest layer whose
   * element contains this one, else the layer directly below in the stack
   * (layers opened while another is open are treated as its children, which
   * makes portalled nested menus / popovers work). Pass `null` to make the
   * layer a root.
   */
  parent?: DismissableLayer | Element | null;
}

export interface DismissableLayer {
  /** The layer element. */
  readonly element: Element;
  /** Removes the layer from the stack and restores pointer-events. */
  destroy(): void;
  /** Merges new options (handlers, branches, disableOutsidePointerEvents...). */
  update(options: Partial<DismissableLayerOptions>): void;
}

/** Debug view of a stacked layer. */
export interface LayerInfo {
  element: Element;
  disableOutsidePointerEvents: boolean;
  parent: Element | null;
}

interface Layer {
  handle: DismissableLayer;
  element: Element;
  options: DismissableLayerOptions;
  /** Pointer handling starts on the next tick (ignore the opening click). */
  pointerReady: boolean;
  readyTimer: ReturnType<typeof setTimeout> | undefined;
  /** Inline `pointer-events` before we touched it. */
  originalPointerEvents: string | null;
  /** Implicit parent resolved at creation time (stack order / DOM). */
  implicitParent: Layer | null;
}

/** Bottom -> top. */
const layers: Layer[] = [];

interface DocumentState {
  refs: number;
  cleanup: () => void;
  bodyPointerEvents: string | null;
}
const documents = new Map<Document, DocumentState>();

function findLayer(target: DismissableLayer | Element | null | undefined) {
  if (!target) return null;
  return (
    layers.find((layer) => layer.handle === target) ??
    layers.find((layer) => layer.element === target) ??
    null
  );
}

function parentOf(layer: Layer): Layer | null {
  const { parent } = layer.options;
  if (parent === null) return null;
  if (parent !== undefined) {
    if (parent instanceof Object && "destroy" in parent) {
      return findLayer(parent);
    }
    // an element: the layer that is (or contains) it
    return (
      findLayer(parent) ??
      [...layers]
        .reverse()
        .find((l) => l !== layer && contains(l.element, parent)) ??
      null
    );
  }
  return layers.includes(layer.implicitParent as Layer)
    ? layer.implicitParent
    : null;
}

function isAncestor(ancestor: Layer, layer: Layer): boolean {
  const seen = new Set<Layer>();
  for (let p = parentOf(layer); p && !seen.has(p); p = parentOf(p)) {
    if (p === ancestor) return true;
    seen.add(p);
  }
  return false;
}

/** Whether `target` is inside `layer`, its branches or any descendant layer. */
function isInside(layer: Layer, target: Node): boolean {
  if (contains(layer.element, target)) return true;
  const branches = layer.options.branches?.() ?? [];
  if (branches.some((branch) => branch && contains(branch, target))) {
    return true;
  }
  return layers.some(
    (other) =>
      other !== layer &&
      isAncestor(layer, other) &&
      (contains(other.element, target) ||
        (other.options.branches?.() ?? []).some(
          (branch) => branch && contains(branch, target),
        )),
  );
}

function highestModalIndex(): number {
  for (let i = layers.length - 1; i >= 0; i--) {
    if (layers[i].options.disableOutsidePointerEvents) return i;
  }
  return -1;
}

function isPointerEventsEnabled(layer: Layer): boolean {
  return layers.indexOf(layer) >= highestModalIndex();
}

function setInlinePointerEvents(el: Element, value: string | null) {
  const style = (el as HTMLElement).style;
  if (!style) return;
  if (value === null || value === "") style.removeProperty("pointer-events");
  else style.pointerEvents = value;
}

/** Re-applies body / layer `pointer-events` after any stack change. */
function syncPointerEvents() {
  const modalIndex = highestModalIndex();
  for (const [doc, state] of documents) {
    const hasModal =
      modalIndex !== -1 &&
      layers.some(
        (l, i) =>
          i <= modalIndex &&
          l.options.disableOutsidePointerEvents &&
          getOwnerDocument(l.element) === doc,
      );
    const body = doc.body;
    if (!body) continue;
    if (hasModal && state.bodyPointerEvents === null) {
      state.bodyPointerEvents = body.style.pointerEvents ?? "";
      body.style.pointerEvents = "none";
    } else if (!hasModal && state.bodyPointerEvents !== null) {
      setInlinePointerEvents(body, state.bodyPointerEvents);
      state.bodyPointerEvents = null;
    }
  }
  layers.forEach((layer, index) => {
    const enable = modalIndex !== -1 && index >= modalIndex;
    setInlinePointerEvents(
      layer.element,
      enable ? "auto" : layer.originalPointerEvents,
    );
  });
}

/** Calls the handlers; `true` when nothing cancelled the dismissal. */
function runHandlers<E extends Event>(
  event: E,
  handlers: Array<DismissHandler<E> | undefined>,
): boolean {
  const wasPrevented = event.defaultPrevented;
  let cancelled = false;
  for (const handler of handlers) {
    if (handler?.(event) === false) cancelled = true;
  }
  return !cancelled && (wasPrevented || !event.defaultPrevented);
}

function dismissOutside<E extends PointerEvent | FocusEvent>(
  event: E,
  kind: "pointer" | "focus",
) {
  const target = getEventTarget(event);
  if (!(target instanceof Object) || !("nodeType" in target)) return;
  const node = target as Node;
  // Topmost first: snapshot, handlers may destroy layers.
  const candidates = [...layers].reverse().filter((layer) => {
    if (
      kind === "pointer" &&
      (!layer.pointerReady || !isPointerEventsEnabled(layer))
    )
      return false;
    if (layer.options.excludeFromOutside?.(node)) return false;
    return !isInside(layer, node);
  });
  for (const layer of candidates) {
    if (!layers.includes(layer)) continue;
    const { options } = layer;
    const specific =
      kind === "pointer"
        ? (options.onPointerDownOutside as DismissHandler<E> | undefined)
        : (options.onFocusOutside as DismissHandler<E> | undefined);
    const ok = runHandlers<E>(event, [
      specific,
      options.onInteractOutside as DismissHandler<E> | undefined,
    ]);
    if (ok) options.onDismiss?.();
  }
}

function attachDocument(doc: Document) {
  const existing = documents.get(doc);
  if (existing) {
    existing.refs += 1;
    return;
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;
    const top = [...layers]
      .reverse()
      .find((layer) => getOwnerDocument(layer.element) === doc);
    if (!top) return;
    const ok = runHandlers(event, [top.options.onEscapeKeyDown]);
    if (ok && top.options.onDismiss) {
      // e.g. keep the browser from leaving fullscreen
      event.preventDefault();
      top.options.onDismiss();
    }
  };

  let pendingClick: (() => void) | null = null;
  const onPointerDown = (event: PointerEvent) => {
    if (pendingClick) {
      doc.removeEventListener("click", pendingClick);
      pendingClick = null;
    }
    if (event.pointerType === "touch") {
      // Touch: wait for the click so scrolling gestures do not dismiss.
      pendingClick = () => {
        pendingClick = null;
        dismissOutside(event, "pointer");
      };
      doc.addEventListener("click", pendingClick, { once: true });
      return;
    }
    dismissOutside(event, "pointer");
  };

  const onFocusIn = (event: FocusEvent) => dismissOutside(event, "focus");

  doc.addEventListener("keydown", onKeyDown, true);
  doc.addEventListener("pointerdown", onPointerDown, true);
  doc.addEventListener("focusin", onFocusIn, true);

  documents.set(doc, {
    refs: 1,
    bodyPointerEvents: null,
    cleanup() {
      doc.removeEventListener("keydown", onKeyDown, true);
      doc.removeEventListener("pointerdown", onPointerDown, true);
      doc.removeEventListener("focusin", onFocusIn, true);
      if (pendingClick) doc.removeEventListener("click", pendingClick);
    },
  });
}

function detachDocument(doc: Document) {
  const state = documents.get(doc);
  if (!state) return;
  state.refs -= 1;
  if (state.refs > 0) return;
  state.cleanup();
  if (state.bodyPointerEvents !== null && doc.body) {
    setInlinePointerEvents(doc.body, state.bodyPointerEvents);
  }
  documents.delete(doc);
}

/**
 * Registers `element` as a dismissable layer (popover, menu, dialog...).
 *
 * - Escape: only the topmost layer is notified.
 * - Pointer down / focus outside: a layer is notified when the interaction
 *   is outside itself, its `branches` and its descendant layers, so clicking
 *   in a (portalled) submenu never dismisses its parent menu.
 * - Pointer handling starts on the next tick so the click that opened the
 *   layer does not immediately dismiss it. Touch pointers are handled on the
 *   following `click` (so scroll gestures do not dismiss).
 * - Handlers get the original event; `preventDefault()` (or returning
 *   `false`) cancels the dismissal.
 *
 * @example
 * const layer = createDismissableLayer(menu, {
 *   branches: () => [trigger],
 *   onDismiss: () => close(),
 * });
 * // later
 * layer.destroy();
 */
export function createDismissableLayer(
  element: Element,
  options: DismissableLayerOptions = {},
): DismissableLayer {
  const doc = getOwnerDocument(element);
  const implicitParent =
    [...layers].reverse().find((l) => contains(l.element, element)) ??
    layers[layers.length - 1] ??
    null;

  let destroyed = false;
  const handle: DismissableLayer = {
    element,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      clearTimeout(layer.readyTimer);
      const index = layers.indexOf(layer);
      if (index !== -1) layers.splice(index, 1);
      setInlinePointerEvents(element, layer.originalPointerEvents);
      syncPointerEvents();
      detachDocument(doc);
    },
    update(next) {
      if (destroyed) return;
      layer.options = { ...layer.options, ...next };
      syncPointerEvents();
    },
  };

  const layer: Layer = {
    handle,
    element,
    options: { ...options },
    pointerReady: false,
    readyTimer: undefined,
    originalPointerEvents:
      (element as HTMLElement).style?.getPropertyValue("pointer-events") ||
      null,
    implicitParent,
  };

  layers.push(layer);
  attachDocument(doc);
  syncPointerEvents();
  const win = doc.defaultView;
  layer.readyTimer = (win?.setTimeout.bind(win) ?? setTimeout)(() => {
    layer.pointerReady = true;
  }, 0) as ReturnType<typeof setTimeout>;

  return handle;
}

/** Current layer stack, bottom -> top (for tests / debugging). */
export function getLayerStack(): LayerInfo[] {
  return layers.map((layer) => ({
    element: layer.element,
    disableOutsidePointerEvents: !!layer.options.disableOutsidePointerEvents,
    parent: parentOf(layer)?.element ?? null,
  }));
}
