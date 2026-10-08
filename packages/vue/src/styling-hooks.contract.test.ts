// Styling hooks contract (Vue): every component of the manifest of
// minerva-design/styling-hooks that the Vue renderer exports renders exactly
// its documented hooks, the same DOM contract as React (`data-minerva`,
// `data-part`, state attributes), checked by the shared checker.
// Scenarios: src/test-utils/styling-hooks/<component>.ts (one per component).
import { defineComponent, h } from "vue";
import { mount } from "@vue/test-utils";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as Vue from "./index";
import * as Monaco from "./monaco";
import {
  Coverage,
  checkReactDom,
  manifest,
  missingHooks,
} from "../../../tests/styling-hooks/contract";
import type { HookScenario } from "./test-utils/styling-hooks/types";

const fixtures = import.meta.glob<HookScenario[]>(
  "./test-utils/styling-hooks/*.ts",
  { eager: true, import: "default" },
);
const scenariosOf = (component: string) =>
  fixtures[`./test-utils/styling-hooks/${component}.ts`];
const exported = { ...Vue, ...Monaco } as Record<string, unknown>;

/** Manifest components whose React exports all exist in the Vue renderer */
const components = Object.keys(manifest).filter(
  (name) =>
    manifest[name].react.length > 0 &&
    manifest[name].react.every((entry) => entry in exported),
);
const fixtureNames = Object.keys(fixtures)
  .map((path) => path.replace(/^.*\/|\.ts$/g, ""))
  .filter((name) => name !== "types" && name !== "exitTransition");

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("styling hooks contract (Vue)", () => {
  it("has a fixture for every exported manifest component", () => {
    expect(components.filter((c) => !fixtureNames.includes(c))).toEqual([]);
  });

  it("has no fixture without an exported manifest component", () => {
    expect(fixtureNames.filter((name) => !components.includes(name))).toEqual(
      [],
    );
  });

  it.each(components)("%s", async (component) => {
    const scenarios = scenariosOf(component);
    expect(scenarios, `missing fixture ${component}.ts`).toBeDefined();
    const coverage = new Coverage();
    for (const scenario of scenarios) {
      const user = userEvent.setup();
      const wrapper = mount(
        defineComponent({ setup: () => () => h("div", scenario.render()) }),
        { attachTo: document.body },
      );
      await settle();
      if (scenario.setup) {
        await scenario.setup({
          user,
          container: wrapper.element as HTMLElement,
        });
      }
      await settle();
      await settle();
      const problems = checkReactDom(coverage);
      expect(problems, `${component} / ${scenario.name}`).toEqual([]);
      wrapper.unmount();
      document.body.innerHTML = "";
    }
    expect(missingHooks(component, coverage, "react")).toEqual([]);
  });
});
