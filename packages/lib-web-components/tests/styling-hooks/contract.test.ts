// Styling hooks contract (web components): every element listed in the
// manifest of @minerva/core/styling-hooks renders exactly its documented
// parts (`part="..."` in its shadow root) and custom states (`:state()`).
// Scenarios: fixtures/<component>.ts (one per component; together they
// render every part and state).
import { afterEach, describe, expect, it, vi } from "vitest";
import { NON_VISUAL_ELEMENTS } from "@minerva/core/styling-hooks";
import elementsManifest from "../../custom-elements.json" with { type: "json" };
import "../../src/index";
import "../../src/elements/code-editor";
import { customStates } from "../../src/internal/styling-hooks";
import {
  Coverage,
  checkWcDom,
  manifest,
  missingHooks,
} from "../../../../tests/styling-hooks/contract";
import { settle } from "../utils";
import type { WcHookScenario } from "./types";

const fixtures = import.meta.glob<WcHookScenario[]>("./fixtures/*.ts", {
  eager: true,
  import: "default",
});
const components = Object.keys(manifest).filter((name) => manifest[name].wc);

interface Declaration {
  tagName?: string;
  cssParts?: { name: string }[];
}
const declarations = (
  elementsManifest as { modules: { declarations?: Declaration[] }[] }
).modules
  .flatMap((m) => m.declarations ?? [])
  .filter((d) => d.tagName);

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("styling hooks contract (web components)", () => {
  it("lists every element (or marks it non-visual)", () => {
    const listed = new Set<string | undefined>([
      ...components.map((name) => manifest[name].wc ?? undefined),
      ...NON_VISUAL_ELEMENTS,
    ]);
    expect(
      declarations.map((d) => d.tagName).filter((tag) => !listed.has(tag)),
    ).toEqual([]);
  });

  it("has no fixture without a manifest entry", () => {
    const names = Object.keys(fixtures).map((path) =>
      path.replace(/^.*\/|\.ts$/g, ""),
    );
    expect(names.filter((name) => !components.includes(name))).toEqual([]);
  });

  it.each(components)("%s", async (component) => {
    // @csspart docs (custom-elements.json) list exactly the manifest parts
    const spec = manifest[component];
    const declaration = declarations.find((d) => d.tagName === spec.wc);
    expect(declaration, `${spec.wc} in custom-elements.json`).toBeDefined();
    expect(
      (declaration!.cssParts ?? []).map((p) => p.name).sort(),
      `@csspart of ${spec.wc}`,
    ).toEqual(
      Object.entries(spec.parts)
        .filter(([, part]) => part.only !== "react")
        .map(([part]) => part)
        .sort(),
    );

    const scenarios = fixtures[`./fixtures/${component}.ts`];
    expect(scenarios, `missing fixtures/${component}.ts`).toBeDefined();
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const coverage = new Coverage();
    for (const scenario of scenarios) {
      document.body.innerHTML = scenario.html;
      await settle();
      if (scenario.setup) {
        await scenario.setup(document.body);
        await settle();
      }
      const problems = checkWcDom(
        coverage,
        customStates,
        document,
        NON_VISUAL_ELEMENTS,
      );
      expect(problems, `${component} / ${scenario.name}`).toEqual([]);
      document.body.innerHTML = "";
    }
    expect(missingHooks(component, coverage, "wc")).toEqual([]);
  });
});
