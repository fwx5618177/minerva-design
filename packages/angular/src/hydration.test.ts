// Hydration: the server HTML of every styling hooks scenario is hydrated by a
// client application (provideClientHydration) without hydration errors or
// mismatches, reusing the server DOM (no re-render).
import type { ApplicationRef } from "@angular/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { hydrate, renderToString } from "./testing/ssr";
import type { HookScenario } from "./testing/types";

const fixtures = import.meta.glob<HookScenario[]>(
  "./testing/styling-hooks/*.ts",
  { eager: true, import: "default" },
);
const cases = Object.entries(fixtures).flatMap(([path, scenarios]) =>
  scenarios.map(
    (scenario) =>
      [
        `${path.replace(/^.*\/|\.ts$/g, "")} / ${scenario.name}`,
        scenario,
      ] as const,
  ),
);

let app: ApplicationRef | undefined;
afterEach(() => {
  app?.destroy();
  app = undefined;
  document.body.innerHTML = "";
});

describe("hydration", () => {
  it.each(cases)("%s", async (_name, scenario) => {
    const html = await renderToString(scenario.component);
    const errors = vi.spyOn(console, "error");
    const warnings = vi.spyOn(console, "warn");
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    app = await hydrate(html, scenario.component);
    const first = document.body.querySelector("[data-minerva]");
    await app.whenStable();
    const messages = [...errors.mock.calls, ...warnings.mock.calls]
      .flat()
      .map(String)
      .filter((m) => /NG0?5\d\d|hydration/i.test(m));
    expect(messages).toEqual([]);
    // the server nodes were reused
    if (first) expect(document.body.contains(first)).toBe(true);
    expect(
      log.mock.calls
        .flat()
        .map(String)
        .some((m) => /hydrated/i.test(m)),
    ).toBe(true);
  });
});
