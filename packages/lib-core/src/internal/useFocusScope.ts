import { useLayoutEffect, useRef } from "react";
import {
  createFocusScope,
  focusElement,
  FOCUS_SCOPE_UNMOUNT_EVENT,
  type FocusScopeOptions,
} from "@minerva/core";

/** Where focus goes when the scope is deactivated. */
export type FocusRestoreTarget =
  boolean | HTMLElement | null | (() => HTMLElement | null | undefined);

export interface UseFocusScopeOptions {
  /** Activate the scope (typically the open state). @default true */
  enabled?: boolean;
  /**
   * Keep focus inside the container (Tab cannot leave it, focus moving
   * elsewhere is pulled back). Nested scopes (e.g. a Select or Menu inside
   * a Modal) pause the outer trap while active. @default false
   */
  trapped?: boolean;
  /** Tab on the last tabbable wraps to the first (and back). @default false */
  loop?: boolean;
  /**
   * Focus on activation (skipped when focus is already inside, e.g. an
   * `autoFocus` child): `true` = first tabbable or the container.
   * @default true
   */
  autoFocus?: FocusScopeOptions["autoFocus"];
  /**
   * Focus target on deactivation: `true` = the element focused before
   * activation, an element, a getter evaluated on deactivation, or
   * `false` / `null` to leave focus alone. Restoring is skipped when focus
   * already moved deliberately outside the container. @default true
   */
  restoreFocus?: FocusRestoreTarget;
  /** Before auto-focusing on activation; `event.preventDefault()` cancels it. */
  onMountAutoFocus?: (event: Event) => void;
  /** Before restoring focus on deactivation; `event.preventDefault()` cancels it. */
  onUnmountAutoFocus?: (event: Event) => void;
}

/** Pending focus restorations per container (cancelled on re-activation). */
const pendingRestores = new WeakMap<HTMLElement, () => void>();

function scheduleRestore(
  container: HTMLElement,
  target: HTMLElement | null,
  onUnmountAutoFocus: ((event: Event) => void) | undefined,
) {
  const doc = container.ownerDocument;
  const win = doc.defaultView ?? window;
  const timer = win.setTimeout(() => {
    pendingRestores.delete(container);
    const focused = doc.activeElement;
    // Respect a deliberate focus move outside the (old) container.
    const focusLost =
      !focused ||
      focused === doc.body ||
      !focused.isConnected ||
      container.contains(focused);
    if (!focusLost) return;
    const event = new win.CustomEvent(FOCUS_SCOPE_UNMOUNT_EVENT, {
      cancelable: true,
    });
    onUnmountAutoFocus?.(event);
    if (event.defaultPrevented || !target?.isConnected) return;
    focusElement(target, { preventScroll: true });
  }, 0);
  pendingRestores.set(container, () => win.clearTimeout(timer));
}

/**
 * Focus management of an overlay on top of core `createFocusScope`:
 * auto-focus on activation, optional trap + Tab looping, and focus
 * restoration on deactivation (next macrotask, so it works whether the
 * container is removed before or after).
 *
 * Scopes stack globally: activating a nested scope (a Popover inside a
 * Modal) pauses the enclosing one until it is deactivated. A restoration
 * still pending when the same container is re-activated (StrictMode effect
 * replay) is cancelled.
 *
 * Handlers and `restoreFocus` are read when needed (no re-activation on
 * change); `trapped` / `loop` changes re-create the scope.
 */
export function useFocusScope(
  container: HTMLElement | null,
  options: UseFocusScopeOptions = {},
): void {
  const { enabled = true, trapped = false, loop = false } = options;

  const latest = useRef(options);
  useLayoutEffect(() => {
    latest.current = options;
  });

  useLayoutEffect(() => {
    if (!enabled || !container) return;
    pendingRestores.get(container)?.();
    pendingRestores.delete(container);

    const doc = container.ownerDocument;
    const focusedBefore = doc.activeElement;
    const scope = createFocusScope(container, {
      trapped,
      loop,
      autoFocus: latest.current.autoFocus ?? true,
      restoreFocus: false,
      onMountAutoFocus: (event) => latest.current.onMountAutoFocus?.(event),
    });

    scope.activate();

    return () => {
      scope.deactivate();
      const restore = latest.current.restoreFocus ?? true;
      const resolved =
        typeof restore === "function"
          ? restore()
          : restore === true
            ? focusedBefore
            : restore;
      const target =
        resolved instanceof HTMLElement && resolved !== doc.body
          ? resolved
          : null;
      scheduleRestore(container, target, (event) =>
        latest.current.onUnmountAutoFocus?.(event),
      );
    };
  }, [enabled, container, trapped, loop]);
}
