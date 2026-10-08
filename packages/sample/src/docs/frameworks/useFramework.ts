// Site-wide framework choice: `?framework=` wins (shareable links; the old
// `wc` value maps to `html`), then the last choice (localStorage), then
// React. Choosing a framework persists it for every page.
import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useSearchParams } from "react-router";
import { DEFAULT_FRAMEWORK, parseFramework, type FrameworkId } from "./index";

export const FRAMEWORK_STORAGE_KEY = "minerva-docs-framework";

const listeners = new Set<() => void>();

const read = (): FrameworkId => {
  try {
    return (
      parseFramework(localStorage.getItem(FRAMEWORK_STORAGE_KEY)) ??
      DEFAULT_FRAMEWORK
    );
  } catch {
    return DEFAULT_FRAMEWORK;
  }
};

let current: FrameworkId | undefined;

/** Stored framework (shared by every component of the site) */
export const getStoredFramework = (): FrameworkId => (current ??= read());

export function setStoredFramework(next: FrameworkId) {
  current = next;
  try {
    localStorage.setItem(FRAMEWORK_STORAGE_KEY, next);
  } catch {
    // storage unavailable (private mode): the URL still carries the choice
  }
  listeners.forEach((listener) => listener());
}

/** Forgets the cached choice (tests) */
export const resetStoredFramework = () => {
  current = undefined;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== FRAMEWORK_STORAGE_KEY) return;
    current = undefined;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
};

/**
 * The selected framework and its setter. A `?framework=` value becomes the
 * stored choice, so it sticks while navigating; the setter updates the URL
 * of the current page.
 */
export function useFramework(): [FrameworkId, (next: FrameworkId) => void] {
  const [params, setParams] = useSearchParams();
  const fromUrl = parseFramework(params.get("framework"));
  const stored = useSyncExternalStore(
    subscribe,
    getStoredFramework,
    () => DEFAULT_FRAMEWORK,
  );
  useEffect(() => {
    if (fromUrl && fromUrl !== getStoredFramework()) {
      setStoredFramework(fromUrl);
    }
  }, [fromUrl]);
  const set = useCallback(
    (next: FrameworkId) => {
      setStoredFramework(next);
      setParams(
        (prev) => {
          const nextParams = new URLSearchParams(prev);
          nextParams.set("framework", next);
          return nextParams;
        },
        { replace: true },
      );
    },
    [setParams],
  );
  return [fromUrl ?? stored, set];
}
