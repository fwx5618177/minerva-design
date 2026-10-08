import {
  contains,
  focusElement,
  focusFirst,
  getActiveElement,
  getEventTarget,
  getOwnerDocument,
  getTabbables,
  isHTMLElement,
} from "./dom";

/** Name of the cancelable event dispatched on the container on activation. */
export const FOCUS_SCOPE_MOUNT_EVENT = "minerva.focusScope.autoFocusOnMount";
/** Name of the cancelable event dispatched on the container on deactivation. */
export const FOCUS_SCOPE_UNMOUNT_EVENT =
  "minerva.focusScope.autoFocusOnUnmount";

/**
 * Auto-focus callback: return `false` or call `event.preventDefault()` to
 * skip the default focus move (and move focus yourself if needed).
 */
export type FocusScopeAutoFocusHandler = (event: Event) => void | boolean;

export interface FocusScopeOptions {
  /**
   * Keep focus inside the container: Tab / Shift+Tab cannot leave it and
   * focus moving elsewhere is pulled back. @default false
   */
  trapped?: boolean;
  /** Tab on the last tabbable goes to the first (and vice versa). @default false */
  loop?: boolean;
  /**
   * What to focus on activation (skipped when focus is already inside):
   * `true` = first tabbable (links last) or the container; an element; or a
   * function returning one (falls back to `true` behaviour on `null`).
   * @default true
   */
  autoFocus?: boolean | HTMLElement | (() => HTMLElement | null);
  /**
   * Where focus goes on deactivation: `true` = the element that was focused
   * before activation; an element; `false` = leave focus alone.
   * @default true
   */
  restoreFocus?: boolean | HTMLElement;
  /** Called before auto-focusing on activation (cancelable). */
  onMountAutoFocus?: FocusScopeAutoFocusHandler;
  /** Called before restoring focus on deactivation (cancelable). */
  onUnmountAutoFocus?: FocusScopeAutoFocusHandler;
}

export interface FocusScope {
  /** Starts the scope: auto-focus, trap, push onto the scope stack. */
  activate(): void;
  /**
   * Stops the scope: removes listeners, resumes the previous scope and
   * restores focus (deferred to the next macrotask, see below).
   */
  deactivate(): void;
  /** Temporarily stops trapping (e.g. while a nested non-modal layer is open). */
  pause(): void;
  /** Undoes `pause()`. */
  resume(): void;
  /** Whether the scope is active and not paused. */
  isActive(): boolean;
}

interface ScopeEntry {
  setStackPaused(paused: boolean): void;
}

/** Active scopes, last = topmost. Only the topmost scope traps focus. */
const scopeStack: ScopeEntry[] = [];

function pushScope(entry: ScopeEntry) {
  scopeStack[scopeStack.length - 1]?.setStackPaused(true);
  removeScope(entry);
  scopeStack.push(entry);
  entry.setStackPaused(false);
}

function removeScope(entry: ScopeEntry) {
  const index = scopeStack.indexOf(entry);
  if (index === -1) return;
  scopeStack.splice(index, 1);
  scopeStack[scopeStack.length - 1]?.setStackPaused(false);
}

function runAutoFocusHandler(
  container: HTMLElement,
  type: string,
  handler: FocusScopeAutoFocusHandler | undefined,
): boolean {
  const win = container.ownerDocument.defaultView;
  const EventCtor = win?.CustomEvent ?? CustomEvent;
  const event = new EventCtor(type, { bubbles: false, cancelable: true });
  container.dispatchEvent(event);
  const result = handler?.(event);
  return result !== false && !event.defaultPrevented;
}

/** Links are focused last on auto-focus (they are rarely the primary action). */
function withoutLinksFirst(items: HTMLElement[]): HTMLElement[] {
  const isLink = (el: HTMLElement) => el.tagName === "A";
  return [...items.filter((el) => !isLink(el)), ...items.filter(isLink)];
}

/**
 * Creates a focus scope on `container`: auto-focus on activation, optional
 * focus trap (Tab wrapping, pulling focus back) and focus restoration on
 * deactivation.
 *
 * Scopes form a global stack: activating a scope pauses the previous one,
 * deactivating it resumes the previous one, so nested dialogs work.
 *
 * Focus restoration runs in a `setTimeout(0)` after `deactivate()`, so it
 * works whether the container is removed before or after the call. It is
 * skipped when, by then, focus has deliberately moved elsewhere outside the
 * container (e.g. the user clicked another input).
 *
 * @example
 * const scope = createFocusScope(dialog, { trapped: true, loop: true });
 * scope.activate();
 * // ...
 * scope.deactivate();
 */
export function createFocusScope(
  container: HTMLElement,
  options: FocusScopeOptions = {},
): FocusScope {
  const {
    trapped = false,
    loop = false,
    autoFocus = true,
    restoreFocus = true,
    onMountAutoFocus,
    onUnmountAutoFocus,
  } = options;

  const doc = getOwnerDocument(container);
  let active = false;
  let userPaused = false;
  let stackPaused = false;
  let previouslyFocused: HTMLElement | null = null;
  let lastFocused: HTMLElement | null = null;
  let addedTabIndex = false;
  let observer: MutationObserver | null = null;

  const isPaused = () => userPaused || stackPaused;
  const entry: ScopeEntry = {
    setStackPaused(paused) {
      stackPaused = paused;
    },
  };

  const focusInside = () =>
    focusElement(lastFocused?.isConnected ? lastFocused : container, {
      select: true,
    }) || focusElement(container);

  const onFocusIn = (event: FocusEvent) => {
    if (!trapped || isPaused()) return;
    const target = getEventTarget(event);
    if (target instanceof Node && contains(container, target)) {
      if (isHTMLElement(target)) lastFocused = target;
    } else {
      focusInside();
    }
  };

  const onFocusOut = (event: FocusEvent) => {
    if (!trapped || isPaused()) return;
    const next = event.relatedTarget;
    // `null`: the window lost focus or the focused element was removed;
    // the latter is handled by the MutationObserver below.
    if (next === null) return;
    // `relatedTarget` is retargeted to the listener's tree: focus moving
    // into a shadow root reports the shadow host. When that host contains
    // the container, the real target is unknown here; the following
    // `focusin` (which carries the real target in its composed path) pulls
    // focus back if it really left.
    if (
      next instanceof Node &&
      (next as Element).shadowRoot &&
      contains(next, container)
    ) {
      return;
    }
    if (!(next instanceof Node) || !contains(container, next)) focusInside();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!loop && !trapped) return;
    if (isPaused() || event.defaultPrevented) return;
    if (event.key !== "Tab" || event.altKey || event.ctrlKey || event.metaKey)
      return;
    const focused = getActiveElement(doc);
    const tabbables = getTabbables(container);
    if (tabbables.length === 0) {
      if (focused === container || trapped) event.preventDefault();
      return;
    }
    const first = tabbables[0];
    const last = tabbables[tabbables.length - 1];
    if (!event.shiftKey && focused === last) {
      event.preventDefault();
      if (loop) focusElement(first, { select: true });
    } else if (event.shiftKey && (focused === first || focused === container)) {
      event.preventDefault();
      if (loop) focusElement(last, { select: true });
    }
  };

  const onMutations = () => {
    if (!trapped || isPaused()) return;
    const focused = getActiveElement(doc);
    if (!focused || focused === doc.body) focusElement(container);
  };

  const resolveAutoFocusTarget = (): HTMLElement[] => {
    const tabbables = () => withoutLinksFirst(getTabbables(container));
    if (isHTMLElement(autoFocus)) return [autoFocus, ...tabbables()];
    if (typeof autoFocus === "function") {
      const target = autoFocus();
      return target ? [target, ...tabbables()] : tabbables();
    }
    return tabbables();
  };

  return {
    activate() {
      if (active) return;
      active = true;
      userPaused = false;
      const focused = getActiveElement(doc);
      previouslyFocused = isHTMLElement(focused) ? focused : null;

      if (!container.hasAttribute("tabindex")) {
        container.setAttribute("tabindex", "-1");
        addedTabIndex = true;
      }

      pushScope(entry);
      doc.addEventListener("focusin", onFocusIn);
      doc.addEventListener("focusout", onFocusOut);
      container.addEventListener("keydown", onKeyDown);
      const ObserverCtor =
        doc.defaultView?.MutationObserver ??
        (typeof MutationObserver !== "undefined" ? MutationObserver : null);
      if (ObserverCtor) {
        observer = new ObserverCtor(onMutations);
        observer.observe(container, { childList: true, subtree: true });
      }

      const alreadyInside =
        focused instanceof Node && contains(container, focused);
      if (alreadyInside) {
        lastFocused = isHTMLElement(focused) ? focused : null;
      } else if (
        autoFocus !== false &&
        runAutoFocusHandler(
          container,
          FOCUS_SCOPE_MOUNT_EVENT,
          onMountAutoFocus,
        )
      ) {
        const target = focusFirst(resolveAutoFocusTarget(), { select: true });
        if (!target) focusElement(container);
      }
      const now = getActiveElement(doc);
      if (isHTMLElement(now) && contains(container, now)) lastFocused = now;
    },

    deactivate() {
      if (!active) return;
      active = false;
      doc.removeEventListener("focusin", onFocusIn);
      doc.removeEventListener("focusout", onFocusOut);
      container.removeEventListener("keydown", onKeyDown);
      observer?.disconnect();
      observer = null;
      removeScope(entry);
      if (addedTabIndex) {
        container.removeAttribute("tabindex");
        addedTabIndex = false;
      }

      const target =
        restoreFocus === false
          ? null
          : restoreFocus === true
            ? previouslyFocused
            : restoreFocus;
      previouslyFocused = null;
      lastFocused = null;
      if (!target) return;

      const win = doc.defaultView;
      const schedule = win?.setTimeout.bind(win) ?? setTimeout;
      schedule(() => {
        if (!target.isConnected) return;
        // Respect a deliberate focus move outside the (old) container.
        const focused = getActiveElement(doc);
        const focusLost =
          !focused ||
          focused === doc.body ||
          !focused.isConnected ||
          contains(container, focused);
        if (!focusLost) return;
        if (
          runAutoFocusHandler(
            container,
            FOCUS_SCOPE_UNMOUNT_EVENT,
            onUnmountAutoFocus,
          )
        ) {
          focusElement(target, { select: true });
        }
      }, 0);
    },

    pause() {
      userPaused = true;
    },

    resume() {
      userPaused = false;
    },

    isActive() {
      return active && !isPaused();
    },
  };
}

/** Number of active focus scopes (for tests / debugging). */
export function getFocusScopeCount(): number {
  return scopeStack.length;
}
