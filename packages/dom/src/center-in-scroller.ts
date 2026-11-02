// Brings an item of a horizontally scrolling row into view by scrolling the
// row only (never the page, unlike element.scrollIntoView).
import { getDirection } from "./direction";

/**
 * Scrolls `scroller` horizontally so that `element` (one of its
 * descendants) is centered, clamped to the scrollable range (`0..max`, or
 * `-max..0` in RTL). Does nothing when the row does not overflow (or nothing
 * is laid out, e.g. in jsdom).
 */
export function centerInScroller(scroller: Element, element: Element): void {
  const max = scroller.scrollWidth - scroller.clientWidth;
  if (max <= 0) return;
  const view = scroller.getBoundingClientRect();
  const item = element.getBoundingClientRect();
  const delta = item.left + item.width / 2 - (view.left + view.width / 2);
  const next = scroller.scrollLeft + delta;
  const rtl = getDirection(scroller) === "rtl";
  const [min, upper] = rtl ? [-max, 0] : [0, max];
  const clamped = Math.round(Math.min(upper, Math.max(min, next)));
  if (clamped !== scroller.scrollLeft) scroller.scrollLeft = clamped;
}
