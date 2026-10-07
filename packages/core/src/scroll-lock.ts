import { canUseDOM } from "./dom";

/** CSS variable (on `<html>`) holding the compensated scrollbar width. */
export const SCROLLBAR_GAP_VAR = "--minerva-scrollbar-gap";

interface LockState {
  count: number;
  restore: () => void;
}

const locks = new Map<HTMLElement, LockState>();

/**
 * Width of the scrollbar that hiding overflow on `target` would remove:
 * `innerWidth - documentElement.clientWidth` for the body, else
 * `offsetWidth - clientWidth`.
 */
export function getScrollbarGap(target: HTMLElement): number {
  const doc = target.ownerDocument;
  const win = doc.defaultView;
  const gap =
    target === doc.body || target === doc.documentElement
      ? (win?.innerWidth ?? 0) - doc.documentElement.clientWidth
      : target.offsetWidth - target.clientWidth;
  return Math.max(0, gap || 0);
}

function applyLock(target: HTMLElement): () => void {
  const doc = target.ownerDocument;
  const html = doc.documentElement;
  const isPage = target === doc.body;
  const gap = getScrollbarGap(target);

  const saved = {
    overflow: target.style.overflow,
    paddingRight: target.style.paddingRight,
    htmlOverflow: html.style.overflow,
    gapVar: html.style.getPropertyValue(SCROLLBAR_GAP_VAR),
  };

  if (gap > 0) {
    const computed = doc.defaultView?.getComputedStyle(target).paddingRight;
    const current = Number.parseFloat(computed ?? "") || 0;
    target.style.paddingRight = `${current + gap}px`;
  }
  target.style.overflow = "hidden";
  if (isPage) {
    // iOS Safari only stops page scrolling when <html> is locked too.
    html.style.overflow = "hidden";
    html.style.setProperty(SCROLLBAR_GAP_VAR, `${gap}px`);
  }

  return () => {
    target.style.overflow = saved.overflow;
    target.style.paddingRight = saved.paddingRight;
    if (isPage) {
      html.style.overflow = saved.htmlOverflow;
      if (saved.gapVar) html.style.setProperty(SCROLLBAR_GAP_VAR, saved.gapVar);
      else html.style.removeProperty(SCROLLBAR_GAP_VAR);
    }
  };
}

/**
 * Prevents `target` (the page by default) from scrolling, compensating the
 * scrollbar width with `padding-right` so the layout does not shift, and
 * exposing it as `--minerva-scrollbar-gap` on `<html>` (for fixed elements).
 *
 * Nested-safe: locks are reference counted per target and the original
 * inline styles are restored when the last lock is released.
 *
 * @returns an idempotent unlock function (a no-op outside the browser).
 */
export function lockScroll(target?: HTMLElement): () => void {
  if (!canUseDOM()) return () => {};
  const el = target ?? document.body;
  let state = locks.get(el);
  if (state) {
    state.count += 1;
  } else {
    state = { count: 1, restore: applyLock(el) };
    locks.set(el, state);
  }

  let released = false;
  return () => {
    if (released) return;
    released = true;
    const current = locks.get(el);
    if (!current) return;
    current.count -= 1;
    if (current.count === 0) {
      locks.delete(el);
      current.restore();
    }
  };
}

/** Whether `target` (the body by default) is currently scroll-locked. */
export function isScrollLocked(target?: HTMLElement): boolean {
  if (!canUseDOM()) return false;
  return locks.has(target ?? document.body);
}
