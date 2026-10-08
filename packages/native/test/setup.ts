// Native component tests: fake-timer friendly cleanup between tests (RNTL
// registers its own `cleanup` on the globals).
import { afterEach, vi } from "vitest";

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});
