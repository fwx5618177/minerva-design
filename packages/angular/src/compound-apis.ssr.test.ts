import { expect, it, vi } from "vitest";
import { renderToString, hydrate } from "./testing/ssr";
import {
  TableHost,
  TooltipHost,
  PopoverHost,
  ScopedConfirmHost,
  MenuHost,
} from "./testing/compound-apis";

it.each([TableHost, TooltipHost, PopoverHost, ScopedConfirmHost, MenuHost])(
  "server-renders and hydrates compound API %s",
  async (host) => {
    const html = await renderToString(host);
    const errors = vi.spyOn(console, "error");
    const warnings = vi.spyOn(console, "warn");
    const app = await hydrate(html, host);
    try {
      const table = document.querySelector("table");
      await app.whenStable();
      if (host === TableHost) {
        expect(table).not.toBeNull();
        expect(document.querySelector("table")).toBe(table);
        expect(
          table!.querySelector("thead th")?.getAttribute("aria-sort"),
        ).toBe("ascending");
      }
      expect(
        [...errors.mock.calls, ...warnings.mock.calls]
          .flat()
          .map(String)
          .filter((message) => /NG0?5\d\d|hydration/i.test(message)),
      ).toEqual([]);
    } finally {
      app.destroy();
      document.body.innerHTML = "";
      errors.mockRestore();
      warnings.mockRestore();
    }
  },
);
