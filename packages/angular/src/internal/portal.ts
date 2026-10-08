import { DOCUMENT } from "@angular/common";
import {
  DestroyRef,
  Directive,
  TemplateRef,
  ViewContainerRef,
  afterRenderEffect,
  effect,
  inject,
  input,
  signal,
  untracked,
  type EmbeddedViewRef,
  type Signal,
} from "@angular/core";
import { waitForExitAnimation } from "@minerva/dom";
import { injectScope } from "../config/scope";
import { injectIsBrowser } from "./platform";

/**
 * Renders its template into the theme-scoped portal container (the portal
 * host of the closest scoped `<mn-config>`, so the scoped theme applies) or
 * `document.body`, like React's `Portal`. Every overlay portals through it.
 *
 * SSR / hydration safe: renders nothing on the server; on the client the
 * view is created after rendering and its nodes are moved into the
 * container. The view keeps its declaration's injector and change
 * detection (bindings, outputs and queries keep working).
 *
 * @example
 * @if (mounted()) { <div *mnPortal class="overlay">...</div> }
 */
@Directive({ selector: "[mnPortal]" })
export class MnPortal {
  /** Explicit container (default: the scope's portal host, else `body`) */
  readonly mnPortal = input<Element | "" | null | undefined>(undefined);

  constructor() {
    const template = inject(TemplateRef);
    const viewContainer = inject(ViewContainerRef);
    const scope = injectScope();
    const document = inject(DOCUMENT);
    if (!injectIsBrowser()) return;
    let view: EmbeddedViewRef<unknown> | null = null;
    effect(() => {
      const explicit = this.mnPortal() || null;
      const target =
        explicit ??
        (scope.waitsForPortal()
          ? null
          : (scope.portalContainer() ?? document.body));
      untracked(() => {
        if (!target) {
          view?.destroy();
          view = null;
          return;
        }
        view ??= viewContainer.createEmbeddedView(template);
        for (const node of view.rootNodes as Node[]) target.appendChild(node);
      });
    });
    inject(DestroyRef).onDestroy(() => view?.destroy());
  }
}

/**
 * Mount state of an animated overlay: `true` while `open()` is true, and
 * after it turned false until the exit animation of `element()` finished
 * (`data-state="closed"` animations of the shared stylesheet), like React's
 * `usePresence`. Call in an injection context.
 */
export function presence(
  open: () => boolean,
  element: () => Element | null | undefined,
): Signal<boolean> {
  const mounted = signal(untracked(open));
  const isBrowser = injectIsBrowser();
  let token = 0;
  effect(() => {
    if (open()) {
      token++;
      untracked(() => mounted.set(true));
    }
  });
  if (!isBrowser) return mounted.asReadonly();
  // after rendering: the closed state is in the DOM, its animation started
  afterRenderEffect(() => {
    if (open() || !mounted()) return;
    const current = ++token;
    const el = untracked(element);
    if (!el) {
      mounted.set(false);
      return;
    }
    void waitForExitAnimation(el).then(() => {
      if (current === token && !untracked(open)) mounted.set(false);
    });
  });
  return mounted.asReadonly();
}
