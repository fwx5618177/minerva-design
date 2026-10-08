// @vitest-environment node
// `@minerva/lib-core/utils`: the non-component functions and data of the
// main entry, without "use client" (usable in React Server Components).
import { describe, expect, it } from "vitest";
import * as core from "@minerva/core";
import * as lib from "./index";
import * as utils from "./utils-entry";

const NAMES = [
  "applyThemeStyles",
  "cn",
  "computeFixedColumnLayout",
  "dark",
  "generateCSSVariables",
  "getSystemTheme",
  "githubDark",
  "isBilingualTheme",
  "light",
  "matchesShortcut",
  "normalizeShortcuts",
  "palettes",
  "resolveTheme",
  "themes",
] as const;

describe("utils entry", () => {
  it("exports exactly the non-component utilities", () => {
    expect(Object.keys(utils).sort()).toEqual([...NAMES].sort());
  });

  it("re-exports the same values as the main entry", () => {
    for (const name of NAMES) {
      if (name === "computeFixedColumnLayout") continue; // typed wrapper
      expect(utils[name], name).toBe(core[name]);
      expect(lib[name], name).toBeDefined();
    }
    const columns = [
      { key: "a", header: "A", fixed: "left" as const, width: 80 },
      { key: "b", header: "B", fixed: "left" as const, width: 40 },
    ];
    expect(utils.computeFixedColumnLayout(columns)).toEqual(
      lib.computeFixedColumnLayout(columns),
    );
  });

  it("works without a DOM", () => {
    expect(typeof window).toBe("undefined");
    expect(utils.cn("a", { b: true })).toBe("a b");
    expect(Object.keys(utils.themes).length).toBeGreaterThan(0);
    expect(
      utils.matchesShortcut(
        {
          key: "k",
          ctrlKey: true,
          metaKey: false,
          altKey: false,
          shiftKey: false,
        },
        "ctrl+k",
      ),
    ).toBe(true);
  });
});
