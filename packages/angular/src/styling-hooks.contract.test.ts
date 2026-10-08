// Styling hooks contract (Angular): every component of the manifest of
// minerva-design/styling-hooks that React renders is rendered by the Angular
// components with exactly its documented hooks (`data-minerva`, `data-part`
// and the state attributes, like React; the shared checker of
// tests/styling-hooks/contract.ts). Scenarios:
// src/testing/styling-hooks/<component>.ts (together they render every part
// and state).
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  Coverage,
  checkReactDom,
  manifest,
  missingHooks,
} from "../../../tests/styling-hooks/contract";
import { render, settle, user } from "./testing";
import type { HookScenario } from "./testing/types";

const fixtures = import.meta.glob<HookScenario[]>(
  "./testing/styling-hooks/*.ts",
  { eager: true, import: "default" },
);
const scenariosOf = (component: string) =>
  fixtures[`./testing/styling-hooks/${component}.ts`];

const components = Object.keys(manifest).filter(
  (name) => manifest[name].react.length > 0,
);

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("styling hooks contract (Angular)", () => {
  it("has no fixture without a manifest entry", () => {
    const names = Object.keys(fixtures).map((path) =>
      path.replace(/^.*\/|\.ts$/g, ""),
    );
    expect(names.filter((name) => !components.includes(name))).toEqual([]);
  });

  it.each(components)("%s", async (component) => {
    const scenarios = scenariosOf(component);
    expect(scenarios, `missing fixture ${component}.ts`).toBeDefined();
    const coverage = new Coverage();
    for (const scenario of scenarios) {
      const fixture = await render(scenario.component);
      if (scenario.setup) {
        await scenario.setup({
          user: user(),
          fixture,
          root: fixture.nativeElement as HTMLElement,
        });
      }
      await settle(fixture);
      const problems = checkReactDom(coverage);
      expect(problems, `${component} / ${scenario.name}`).toEqual([]);
      fixture.destroy();
      document.body.innerHTML = "";
    }
    expect(missingHooks(component, coverage, "react")).toEqual([]);
  });
});
