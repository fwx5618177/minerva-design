// The "Styling hooks" sections are generated from the manifest of
// @minerva/core/styling-hooks: every hook component is documented on a page,
// and every part / state name has a description in every locale.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { BOOLEAN_STATES, KEYED_STATES } from "@minerva/core/styling-hooks";
import { docPages, getDocPage } from "./registry";
import {
  hookComponentsOf,
  hookExample,
  hookManifest,
  partsOf,
  statePartsOf,
} from "./stylingHooks";

const LOCALES = ["en", "zh", "ja", "fr"];
const common = (lng: string) =>
  JSON.parse(
    readFileSync(
      fileURLToPath(
        new URL(`../i18n/locales/${lng}/common.json`, import.meta.url),
      ),
      "utf8",
    ),
  ) as {
    hooks: { parts: Record<string, string>; states: Record<string, string> };
  };

describe("styling hooks docs", () => {
  it("documents every hook component on a page", () => {
    const documented = new Set(docPages.flatMap(hookComponentsOf));
    expect(
      Object.keys(hookManifest).filter((name) => !documented.has(name)),
    ).toEqual([]);
  });

  it.each(LOCALES)("describes every part and state in %s", (lng) => {
    const { hooks } = common(lng);
    const parts = new Set(
      Object.values(hookManifest).flatMap((spec) => Object.keys(spec.parts)),
    );
    expect([...parts].filter((part) => !hooks.parts[part])).toEqual([]);
    const states = ["state", ...BOOLEAN_STATES, ...KEYED_STATES];
    expect(states.filter((key) => !hooks.states[key])).toEqual([]);
    // no stale entries
    expect(Object.keys(hooks.parts).filter((p) => !parts.has(p))).toEqual([]);
  });

  it("finds the hooks of a page from its tags and exports", () => {
    expect(hookComponentsOf(getDocPage("button")!)).toEqual(["button"]);
    expect(hookComponentsOf(getDocPage("modal")!)).toContain("modal");
    expect(hookComponentsOf({ id: "x", category: "general" })).toEqual([]);
  });

  it("generates examples for both frameworks", () => {
    expect(hookExample("button", "react")).toBe(
      '[data-minerva="button"][data-part="label"] {\n  /* … */\n}\n\n' +
        '[data-minerva="button"][data-part="root"][data-state="active"] [data-minerva="button"][data-part="label"] {\n  /* … */\n}',
    );
    expect(hookExample("modal", "react")).toContain(
      '[data-minerva="modal"][data-part="overlay"][data-state="open"] {',
    );
    expect(hookExample("modal", "wc")).toBe(
      "minerva-modal::part(overlay) {\n  /* … */\n}\n\n" +
        "minerva-modal:state(open)::part(overlay) {\n  /* … */\n}",
    );
    expect(hookExample("unknown", "wc")).toBeNull();
  });

  it("lists the parts per framework and the parts carrying a state", () => {
    const button = hookManifest.button;
    expect(partsOf(button, "wc").map(([name]) => name)).toContain("root");
    expect(statePartsOf(button, "loading")).toEqual(["root"]);
    expect(statePartsOf(hookManifest.modal, "state")).toEqual([
      "overlay",
      "content",
    ]);
  });
});
