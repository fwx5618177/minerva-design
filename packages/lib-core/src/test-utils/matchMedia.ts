import { vi } from "vitest";

/**
 * Controllable `window.matchMedia` stub for `prefers-color-scheme` tests.
 * `setDark(true|false)` flips the scheme and notifies registered listeners.
 */
export const mockColorScheme = (initialDark: boolean) => {
  let dark = initialDark;
  const listeners = new Set<(e: MediaQueryListEvent) => void>();
  const addEventListener = vi.fn(
    (_type: string, listener: (e: MediaQueryListEvent) => void) => {
      listeners.add(listener);
    },
  );
  const removeEventListener = vi.fn(
    (_type: string, listener: (e: MediaQueryListEvent) => void) => {
      listeners.delete(listener);
    },
  );

  const spy = vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        get matches() {
          return dark;
        },
        media: query,
        onchange: null,
        addEventListener,
        removeEventListener,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as unknown as MediaQueryList,
  );

  return {
    spy,
    listeners,
    addEventListener,
    removeEventListener,
    setDark(next: boolean) {
      dark = next;
      listeners.forEach((listener) =>
        listener({ matches: next } as MediaQueryListEvent),
      );
    },
  };
};
