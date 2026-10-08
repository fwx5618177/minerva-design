import "@testing-library/jest-dom/vitest";
import { enableAutoUnmount } from "@vue/test-utils";
import { cleanup } from "@testing-library/vue";
import { afterEach, vi } from "vitest";

// After hooks run in reverse order (vitest "stack"): this one, registered
// first, runs last — once every wrapper is unmounted (teleports still find
// their targets in document.body while unmounting).
afterEach(() => {
  if (typeof document === "undefined") return; // node environment (SSR)
  document.body.innerHTML = "";
  document.documentElement.removeAttribute("style");
  vi.useRealTimers();
});
// Every VTU wrapper / Testing Library render is unmounted after each test
// (overlays release their scroll lock, layers and teleports).
enableAutoUnmount(afterEach);
afterEach(() => {
  cleanup();
});
