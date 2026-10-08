// Styling hooks contract (React): every component listed in the manifest of
// minerva-design/styling-hooks renders exactly its documented hooks.
// Scenarios: src/test-utils/styling-hooks/<component>.tsx (one per
// component; together they render every part and state).
import { act, cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as LibCore from "./index";
import * as Monaco from "./monaco";
import {
  Coverage,
  checkReactDom,
  manifest,
  missingHooks,
} from "../../../tests/styling-hooks/contract";
import type { HookScenario } from "./test-utils/styling-hooks/types";

const fixtures = import.meta.glob<HookScenario[]>(
  "./test-utils/styling-hooks/*.tsx",
  { eager: true, import: "default" },
);
const scenariosOf = (component: string) =>
  fixtures[`./test-utils/styling-hooks/${component}.tsx`];

const components = Object.keys(manifest).filter(
  (name) => manifest[name].react.length > 0,
);

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("styling hooks contract (React)", () => {
  it("documents existing exports only", () => {
    const exported = { ...LibCore, ...Monaco } as Record<string, unknown>;
    for (const name of components) {
      for (const entry of manifest[name].react) {
        expect(exported[entry], `${name}: ${entry}`).toBeDefined();
      }
    }
  });

  it("has no fixture without a manifest entry", () => {
    const names = Object.keys(fixtures).map((path) =>
      path.replace(/^.*\/|\.tsx$/g, ""),
    );
    expect(names.filter((name) => !components.includes(name))).toEqual([]);
  });

  it.each(components)("%s", async (component) => {
    const scenarios = scenariosOf(component);
    expect(scenarios, `missing fixture ${component}.tsx`).toBeDefined();
    const coverage = new Coverage();
    for (const scenario of scenarios) {
      const user = userEvent.setup();
      const view = render(scenario.element);
      if (scenario.setup) {
        await scenario.setup({ user, container: view.container, view });
      }
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });
      const problems = checkReactDom(coverage);
      expect(problems, `${component} / ${scenario.name}`).toEqual([]);
      cleanup();
      document.body.innerHTML = "";
    }
    expect(missingHooks(component, coverage, "react")).toEqual([]);
  });
});
