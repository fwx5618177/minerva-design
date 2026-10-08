// The "Styling hooks" sections are generated from the manifest of
// minerva-design/styling-hooks: every hook component is documented on a page,
// and every part / state name has a description in every locale.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { BOOLEAN_STATES, KEYED_STATES } from "minerva-design/styling-hooks";
import { docPages, getDocPage } from "./registry";
import {
  hookComponentsOf,
  hookExample,
  hookManifest,
  itemStateSelector,
  itemStatesOf,
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
    hooks: {
      parts: Record<string, string>;
      states: Record<string, string>;
      itemNotes: Record<string, Record<string, Record<string, string>>>;
    };
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

  it.each(LOCALES)("notes only documented item states, like en (%s)", (lng) => {
    const notes = common(lng).hooks.itemNotes;
    const keys = (n: typeof notes) =>
      Object.entries(n).flatMap(([name, parts]) =>
        Object.entries(parts).flatMap(([part, states]) =>
          Object.keys(states).map((key) => `${name}.${part}.${key}`),
        ),
      );
    expect(keys(notes)).toEqual(keys(common("en").hooks.itemNotes));
    for (const key of keys(notes)) {
      const [name, part, state] = key.split(".");
      expect(
        Object.keys(hookManifest[name]?.parts[part]?.itemStates ?? {}),
        key,
      ).toContain(state);
    }
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

  it("documents item states with their selectors in both frameworks", () => {
    const menu = hookManifest.menu;
    expect(itemStatesOf(menu, "react")).toContainEqual({
      part: "item",
      key: "highlighted",
      values: [true],
    });
    expect(itemStatesOf(menu, "wc")).toContainEqual({
      part: "item",
      key: "state",
      values: ["checked", "unchecked"],
    });
    expect(
      itemStateSelector("menu", "react", "item", "highlighted", true),
    ).toBe('[data-minerva="menu"][data-part="item"][data-highlighted]');
    expect(itemStateSelector("menu", "wc", "item", "highlighted", true)).toBe(
      "minerva-menu::part(item item--highlighted)",
    );
    expect(
      itemStateSelector("data-table", "wc", "header-cell", "sort", "ascending"),
    ).toBe("minerva-data-table::part(header-cell header-cell--sort-ascending)");
    // React-only item parts are not listed for the web components
    expect(itemStatesOf(hookManifest.select, "react")).toEqual([]);
    expect(itemStatesOf(hookManifest.select, "wc").length).toBeGreaterThan(0);
    expect(hookExample("menu", "react")).toContain(
      '[data-minerva="menu"][data-part="item"][data-highlighted] {',
    );
    expect(hookExample("menu", "wc")).toContain(
      "minerva-menu::part(item item--highlighted) {",
    );
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
