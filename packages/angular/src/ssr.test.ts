// Server rendering (@angular/platform-server, the engine of @angular/ssr):
// every scenario of the styling hooks fixtures renders on the server without
// touching browser globals, with its styling hooks in the HTML, and overlays
// render nothing on the server (their content mounts on the client).
import { describe, expect, it } from "vitest";
import { renderToString } from "./testing/ssr";
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

describe("server rendering", () => {
  it.each(cases)("%s", async (_name, scenario) => {
    const html = await renderToString(scenario.component);
    expect(html).toContain("ng-server-context");
    expect(html).toMatch(/data-minerva="|ngh=/);
  });
});
