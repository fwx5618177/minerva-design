import { vi } from "vitest";

/**
 * Gives the elements matching `selector` a long exit transition, so a closing
 * overlay stays mounted with `data-state="closed"` (usePresence) during the
 * scenario. Restored by the contract test (`vi.restoreAllMocks()`).
 */
export function mockExitTransition(selector: string): void {
  const getComputedStyle = window.getComputedStyle.bind(window);
  vi.spyOn(window, "getComputedStyle").mockImplementation((el, pseudo) => {
    const style = getComputedStyle(el, pseudo);
    if (!el.matches(selector)) return style;
    return new Proxy(style, {
      get: (target, key) =>
        key === "transitionDuration" ? "10s" : Reflect.get(target, key, target),
    });
  });
}
