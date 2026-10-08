import "@testing-library/jest-dom/vitest";
import { enableAutoUnmount } from "@vue/test-utils";
import { cleanup } from "@testing-library/vue";
import { afterEach, vi } from "vitest";

// Every VTU wrapper / Testing Library render is unmounted after each test
// (overlays release their scroll lock, layers and teleports).
enableAutoUnmount(afterEach);
afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
  document.documentElement.removeAttribute("style");
  vi.useRealTimers();
});
