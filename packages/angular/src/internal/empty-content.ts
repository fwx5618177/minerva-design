import {
  afterRenderEffect,
  signal,
  type ElementRef,
  type Signal,
} from "@angular/core";

/**
 * Whether an element wrapping projected content (`<ng-content />`) and / or a
 * content input renders nothing, checked in the browser after rendering (the
 * server keeps `false`): React omits such a wrapper (`label ?? children`
 * empty); a component hides it instead, since Angular cannot know before
 * rendering whether something is projected.
 *
 * Call in an injection context. `deps` re-run the check when they change.
 */
export function emptyContent(
  element: () => ElementRef<HTMLElement> | undefined,
  deps: () => unknown = () => undefined,
): Signal<boolean> {
  const empty = signal(false);
  afterRenderEffect({
    read: () => {
      deps();
      const el = element()?.nativeElement;
      if (!el) return;
      empty.set(el.children.length === 0 && !el.textContent?.trim());
    },
  });
  return empty.asReadonly();
}
