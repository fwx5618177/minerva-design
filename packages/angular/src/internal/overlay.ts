import { afterRenderEffect, untracked } from "@angular/core";
import {
  applyPosition,
  autoPosition,
  createDismissableLayer,
  createFocusScope,
  hideOthers,
  lockScroll,
  type AnchorElement,
  type AnchoredPositionOptions,
  type AnchoredPositionResult,
  type FocusScopeOptions,
} from "@minerva/dom";
import { injectIsBrowser } from "./platform";

type MaybeElement = HTMLElement | null | undefined;

/** Behaviour of an overlay layer (dialog, drawer, popover, menu, listbox) */
export interface LayerOptions {
  /** The layer element (rendered while mounted) */
  element: () => MaybeElement;
  /** The layer is open (behaviour on); `false` during the exit animation */
  active: () => boolean;
  /**
   * Modal: focus trapped and looping, page scroll locked, the rest of the page
   * hidden from assistive technology and inert to the pointer. @default false
   */
  modal?: boolean | (() => boolean);
  /**
   * Register a focus scope (focus moves in on open, returns on close). Modal
   * layers trap it. Combobox popups whose focus stays in the input pass
   * `false`. @default true
   */
  focus?: boolean;
  /** What to focus on open (see `FocusScopeOptions.autoFocus`) @default true */
  autoFocus?: FocusScopeOptions["autoFocus"];
  /** Where focus returns on close @default true (the element focused before) */
  restoreFocus?: () => FocusScopeOptions["restoreFocus"];
  /** Elements that are part of the layer (trigger, input) */
  branches?: () => Array<Element | null | undefined>;
  /** Escape while topmost; return `false` / `preventDefault()` keeps it open */
  onEscapeKeyDown?: (event: KeyboardEvent) => void | boolean;
  /** Pointer down outside; return `false` / `preventDefault()` keeps it open */
  onPointerDownOutside?: (event: PointerEvent) => void | boolean;
  /** Focus outside; return `false` / `preventDefault()` keeps it open */
  onFocusOutside?: (event: FocusEvent) => void | boolean;
  /** Dismiss on a pointer down outside @default true */
  dismissOnPointerDownOutside?: boolean;
  /** Dismiss when focus moves outside @default modal ? false : true */
  dismissOnFocusOutside?: boolean;
  /** The layer asks to close (Escape, outside interaction) */
  onDismiss: () => void;
  /** Called before auto-focus on open (cancelable) */
  onOpenAutoFocus?: (event: Event) => void;
  /** Called before focus returns on close (cancelable) */
  onCloseAutoFocus?: (event: Event) => void;
}

const valueOf = <T>(value: T | (() => T)): T =>
  typeof value === "function" ? (value as () => T)() : value;

/**
 * Wires an overlay layer to the DOM primitives of @minerva/dom (the same as
 * React's dialog / floating layers): dismissable layer stack (Escape, outside
 * pointer / focus), focus scope (auto-focus, trap, return), scroll lock and
 * hide-others for modals. Browser only, after rendering; torn down when the
 * layer closes or the component is destroyed. Call in an injection context.
 */
export function overlayLayer(options: LayerOptions): void {
  if (!injectIsBrowser()) return;
  afterRenderEffect((onCleanup) => {
    const element = options.element();
    if (!element || !options.active()) return;
    untracked(() => {
      const modal = valueOf(options.modal ?? false);
      const cleanups: Array<() => void> = [];
      const layer = createDismissableLayer(element, {
        disableOutsidePointerEvents: modal,
        branches: options.branches,
        onEscapeKeyDown: options.onEscapeKeyDown,
        onPointerDownOutside: (event) => {
          if (options.dismissOnPointerDownOutside === false) return false;
          return options.onPointerDownOutside?.(event);
        },
        onFocusOutside: (event) => {
          if (options.dismissOnFocusOutside ?? !modal) {
            return options.onFocusOutside?.(event);
          }
          return false;
        },
        onDismiss: () => options.onDismiss(),
      });
      cleanups.push(() => layer.destroy());
      if (options.focus !== false) {
        const scope = createFocusScope(element, {
          trapped: modal,
          loop: modal,
          autoFocus: options.autoFocus ?? true,
          restoreFocus: options.restoreFocus?.() ?? true,
          onMountAutoFocus: options.onOpenAutoFocus,
          onUnmountAutoFocus: options.onCloseAutoFocus,
        });
        scope.activate();
        cleanups.push(() => scope.deactivate());
      }
      if (modal) {
        cleanups.push(lockScroll());
        cleanups.push(hideOthers(element));
      }
      onCleanup(() => cleanups.reverse().forEach((cleanup) => cleanup()));
    });
  });
}

/** Anchored positioning of a floating element */
export interface AnchoredOptions extends Omit<
  AnchoredPositionOptions,
  "autoUpdate"
> {
  /** The anchor (trigger, input, or a virtual element such as the cursor) */
  anchor: () => AnchorElement | null | undefined;
  /** The floating element */
  floating: () => MaybeElement;
  /** Positioning is on (the floating element is mounted) */
  active: () => boolean;
  /** Options read on every update (placement...) */
  options?: () => Partial<AnchoredPositionOptions>;
  /** Called after each position update */
  onPosition?: (result: AnchoredPositionResult) => void;
}

/**
 * Keeps a floating element positioned next to its anchor
 * (`autoPosition` of @minerva/dom: flip, shift, size, arrow) and writes the
 * position, `data-side` / `data-align` / `data-placement` and the
 * `--minerva-*` custom properties on it. Off-screen until positioned.
 * Browser only. Call in an injection context.
 */
export function anchoredPosition(options: AnchoredOptions): void {
  if (!injectIsBrowser()) return;
  afterRenderEffect((onCleanup) => {
    const anchor = options.anchor();
    const floating = options.floating();
    if (!anchor || !floating || !options.active()) return;
    const dynamic = options.options?.() ?? {};
    untracked(() => {
      if (!floating.style.left) {
        floating.style.position = "fixed";
        floating.style.left = "-9999px";
        floating.style.top = "-9999px";
      }
      const {
        anchor: _a,
        floating: _f,
        active: _o,
        options: _x,
        onPosition,
        ...base
      } = options;
      const stop = autoPosition(
        anchor,
        floating,
        { ...base, ...dynamic },
        (result) => {
          applyPosition(floating, result);
          onPosition?.(result);
        },
      );
      onCleanup(stop);
    });
  });
}
