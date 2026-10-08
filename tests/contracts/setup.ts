// React DOM: Testing Library cleanup and jest-dom matchers. The Web
// Components' happy-dom patches (ElementInternals polyfill, event
// retargeting across shadow roots...) come from the web-components setup,
// listed before this file in vitest.config.ts.
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  document.documentElement.removeAttribute("style");
});
