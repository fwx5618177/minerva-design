import { computed, toValue, watch, type MaybeRefOrGetter } from "vue";
import {
  createFocusScope,
  focusElement,
  FOCUS_SCOPE_UNMOUNT_EVENT,
  type FocusScopeOptions,
} from "@minerva/dom";

/** Where focus returns when the scope unmounts. */
export type FocusRestoreTarget =
  boolean | HTMLElement | null | (() => HTMLElement | null | undefined);

export interface UseFocusScopeOptions {
  /** @default true */
  enabled?: boolean;
  /** Keep focus inside (modal dialogs). @default false */
  trapped?: boolean;
  /** Tab from the last tabbable wraps to the first. @default false */
  loop?: boolean;
  autoFocus?: FocusScopeOptions["autoFocus"];
  /** @default true (the element focused before activation) */
  restoreFocus?: FocusRestoreTarget;
  onMountAutoFocus?: (event: Event) => void;
  onUnmountAutoFocus?: (event: Event) => void;
}

const pendingRestores = new WeakMap<HTMLElement, () => void>();

/**
 * Focus restore after the scope is gone, deferred one task so the closing
 * render (and a following open in the same tick) settles first; only when
 * focus was lost (body, a removed node or still inside the container).
 */
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
 * Focus scope of @minerva/dom on `container` while enabled: initial focus,
 * optional trap / loop, focus restore on deactivation.
 */
export function useFocusScope(
  container: MaybeRefOrGetter<HTMLElement | null | undefined>,
  options: () => UseFocusScopeOptions,
): void {
  const config = computed(() => ({
    enabled: options().enabled ?? true,
    trapped: options().trapped ?? false,
    loop: options().loop ?? false,
  }));
  watch(
    [config, () => toValue(container)],
    ([{ enabled, trapped, loop }, el], _prev, onCleanup) => {
      if (!enabled || !el) return;
      pendingRestores.get(el)?.();
      pendingRestores.delete(el);
      const doc = el.ownerDocument;
      const focusedBefore = doc.activeElement;
      const scope = createFocusScope(el, {
        trapped,
        loop,
        autoFocus: options().autoFocus ?? true,
        restoreFocus: false,
        onMountAutoFocus: (event) => options().onMountAutoFocus?.(event),
      });
      scope.activate();
      onCleanup(() => {
        scope.deactivate();
        const restore = options().restoreFocus ?? true;
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
        scheduleRestore(el, target, (event) =>
          options().onUnmountAutoFocus?.(event),
        );
      });
    },
    { immediate: true, flush: "post" },
  );
}
