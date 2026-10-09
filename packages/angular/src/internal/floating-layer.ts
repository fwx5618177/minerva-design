import {
  ElementRef,
  Renderer2,
  afterRenderEffect,
  effect,
  inject,
  untracked,
} from "@angular/core";
import type { HookComponentName } from "@minerva/core/styling-hooks";
import {
  FOCUS_SCOPE_UNMOUNT_EVENT,
  createDismissableLayer,
  createFocusScope,
  focusElement,
  getDirection,
  hideOthers,
  lockScroll,
  type AnchorElement,
  type FocusScopeOptions,
} from "@minerva/dom";
import { hookValue, type HookStates } from "./hooks";
import { injectIsBrowser } from "./platform";

type MaybeElement = HTMLElement | null | undefined;

/**
 * Behaviour of a floating layer (popover, menu panel, tooltip), like React's
 * `useDismissableLayer` + `useFocusScope` (+ scroll lock / hide-others when
 * modal). Unlike `overlayLayer()`, the focus restore target is read when the
 * layer closes (menus change it on Tab / outside clicks) and every outside
 * handler of React is available.
 */
export interface FloatingLayerOptions {
  /** The layer element (rendered while mounted) */
  element: () => MaybeElement;
  /** The layer is open (behaviour on); `false` during the exit animation */
  active: () => boolean;
  /**
   * Modal: outside pointer events disabled, focus trapped, page scroll
   * locked, the rest of the page hidden from assistive technology.
   * @default false
   */
  modal?: () => boolean;
  /** Tab loops inside the layer @default modal */
  loop?: () => boolean;
  /** Register a focus scope @default true */
  focus?: boolean;
  /** What to focus on open @default true */
  autoFocus?: FocusScopeOptions["autoFocus"];
  /**
   * Where focus goes on close, read when closing: `true` (default) = the
   * element focused before opening, an element, `false` / `null` = leave it.
   */
  restoreFocus?: () => HTMLElement | boolean | null | undefined;
  /** Elements that are part of the layer (trigger) */
  branches?: () => Array<Element | null | undefined>;
  /** Escape while topmost; `preventDefault()` keeps it open */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /** Pointer down outside; `preventDefault()` keeps it open */
  onPointerDownOutside?: (event: PointerEvent) => void;
  /** Focus outside; `preventDefault()` keeps it open */
  onFocusOutside?: (event: FocusEvent) => void;
  /** Pointer down or focus outside; `preventDefault()` keeps it open */
  onInteractOutside?: (event: PointerEvent | FocusEvent) => void;
  /** Dismiss on a pointer down outside @default true */
  dismissOnPointerDownOutside?: boolean;
  /** Dismiss on focus outside @default !modal */
  dismissOnFocusOutside?: boolean;
  /** The layer asks to close */
  onDismiss: () => void;
  /** Before auto-focus on open (cancelable) */
  onOpenAutoFocus?: (event: Event) => void;
  /** Before focus returns on close (cancelable) */
  onCloseAutoFocus?: (event: Event) => void;
}

/** Pending focus restorations per container (cancelled on re-activation) */
const pendingRestores = new WeakMap<HTMLElement, () => void>();

function scheduleRestore(
  container: HTMLElement,
  target: HTMLElement | null,
  onCloseAutoFocus: ((event: Event) => void) | undefined,
) {
  const doc = container.ownerDocument;
  const win = doc.defaultView ?? window;
  const timer = win.setTimeout(() => {
    pendingRestores.delete(container);
    const focused = doc.activeElement;
    const focusLost =
      !focused ||
      focused === doc.body ||
      !focused.isConnected ||
      container.contains(focused);
    if (!focusLost) return;
    const event = new win.CustomEvent(FOCUS_SCOPE_UNMOUNT_EVENT, {
      cancelable: true,
    });
    onCloseAutoFocus?.(event);
    if (event.defaultPrevented || !target?.isConnected) return;
    focusElement(target, { preventScroll: true });
  }, 0);
  pendingRestores.set(container, () => win.clearTimeout(timer));
}

/**
 * Wires a floating layer to the DOM primitives of @minerva/dom: the
 * dismissable layer stack (Escape only while topmost, pointer down / focus
 * outside; layers opened from another one are its children, so portalled
 * submenus are "inside" their parent), a focus scope (auto-focus, trap when
 * modal, restoration on close, next macrotask) and, when modal, scroll lock
 * and hide-others. Browser only, after rendering. Call in an injection
 * context.
 */
export function floatingLayer(options: FloatingLayerOptions): void {
  if (!injectIsBrowser()) return;
  afterRenderEffect((onCleanup) => {
    const element = options.element();
    const active = options.active();
    const modal = options.modal?.() ?? false;
    const loop = options.loop?.() ?? modal;
    if (!element || !active) return;
    untracked(() => {
      const cleanups: Array<() => void> = [];
      const layer = createDismissableLayer(element, {
        disableOutsidePointerEvents: modal,
        branches: options.branches,
        onEscapeKeyDown: (event) => options.onEscapeKeyDown?.(event),
        onPointerDownOutside: (event) => {
          options.onPointerDownOutside?.(event);
          if (options.dismissOnPointerDownOutside === false) return false;
        },
        onFocusOutside: (event) => {
          options.onFocusOutside?.(event);
          if (modal || options.dismissOnFocusOutside === false) return false;
        },
        onInteractOutside: (event) => options.onInteractOutside?.(event),
        onDismiss: () => options.onDismiss(),
      });
      cleanups.push(() => layer.destroy());
      if (options.focus !== false) {
        pendingRestores.get(element)?.();
        pendingRestores.delete(element);
        const doc = element.ownerDocument;
        const focusedBefore = doc.activeElement;
        const scope = createFocusScope(element, {
          trapped: modal,
          loop,
          autoFocus: options.autoFocus ?? true,
          restoreFocus: false,
          onMountAutoFocus: (event) => options.onOpenAutoFocus?.(event),
        });
        scope.activate();
        cleanups.push(() => {
          scope.deactivate();
          const restore = options.restoreFocus?.() ?? true;
          const resolved = restore === true ? focusedBefore : restore;
          const target =
            resolved instanceof HTMLElement && resolved !== doc.body
              ? resolved
              : null;
          scheduleRestore(element, target, options.onCloseAutoFocus);
        });
      }
      if (modal) {
        cleanups.push(lockScroll());
        cleanups.push(hideOthers(element));
      }
      onCleanup(() => cleanups.reverse().forEach((cleanup) => cleanup()));
    });
  });
}

/** The element behind an anchor (a virtual anchor's `contextElement`) */
export const anchorElementOf = (
  anchor: AnchorElement | null | undefined,
): Element | null => {
  if (!anchor) return null;
  if (typeof (anchor as Element).getAttribute === "function") {
    return anchor as Element;
  }
  return (anchor as { contextElement?: Element }).contextElement ?? null;
};

/**
 * Keeps the reading direction of the anchor on a portalled floating element
 * (portals leave the anchor's `dir` subtree): sets `dir` when the anchor's
 * direction differs from the portal container's (React's
 * `usePortalDirection`). Browser only. Call in an injection context.
 */
export function portalDirection(
  floating: () => MaybeElement,
  anchor: () => AnchorElement | null | undefined,
  active: () => boolean,
): void {
  if (!injectIsBrowser()) return;
  afterRenderEffect(() => {
    const element = floating();
    const source = anchorElementOf(anchor());
    if (!element || !source || !active()) return;
    untracked(() => {
      const anchorDir = getDirection(source);
      const containerDir = getDirection(element.parentElement);
      if (anchorDir === containerDir) element.removeAttribute("dir");
      else element.setAttribute("dir", anchorDir);
    });
  });
}

/**
 * Whether an element hosting a trigger directive is a Minerva component
 * (`<mn-*>` or a component with its own `data-minerva` host attribute such
 * as `button[mnButton]`): like React's component children, it keeps its own
 * styling hooks. Read in the directive's constructor (static attributes are
 * set when the element is created).
 */
export const isComponentHost = (element: Element): boolean =>
  element.tagName.toLowerCase().startsWith("mn-") ||
  element.hasAttribute("data-minerva");

/**
 * Styling hooks of a trigger directive's host element (React renders them on
 * a native element child only): `data-minerva`, `data-part` and the states,
 * written through the renderer (server render included) unless the host is
 * a Minerva component (`isComponentHost`), which keeps its own hooks. Not
 * host bindings: they would overwrite the component's own attributes. Call
 * in a directive's constructor.
 */
export function triggerHooks(
  component: HookComponentName,
  part: string,
  states: () => HookStates,
): void {
  const host = inject<ElementRef<Element>>(ElementRef).nativeElement;
  if (isComponentHost(host)) return;
  const renderer = inject(Renderer2);
  renderer.setAttribute(host, "data-minerva", component);
  renderer.setAttribute(host, "data-part", part);
  effect(() => {
    const next = states();
    untracked(() => {
      for (const [key, raw] of Object.entries(next)) {
        const name = `data-${key}`;
        const value = hookValue(raw);
        if (value === null) renderer.removeAttribute(host, name);
        else renderer.setAttribute(host, name, value);
      }
    });
  });
}
