// @minerva/core runs on every platform: browsers, Node (SSR), React Native
// (Hermes) and mini-program engines (no DOM, sometimes no Intl.PluralRules,
// no `navigator`). This suite loads every module of the package in such an
// environment and exercises the platform-sensitive paths.
import { afterEach, describe, expect, it, vi } from "vitest";

// Every non-test module of the package (lazy, imported per test after the
// environment is stubbed)
const modules = import.meta.glob<Record<string, unknown>>([
  "./**/*.ts",
  "!./**/*.test.ts",
  "!./**/*.d.ts",
]);

/** Stubs the globals a React Native / mini-program engine lacks. */
function stubNonBrowserEngine({ intl = true }: { intl?: boolean } = {}) {
  for (const name of [
    "window",
    "document",
    "navigator",
    "location",
    "localStorage",
    "matchMedia",
    "getComputedStyle",
    "requestAnimationFrame",
    "HTMLElement",
    "Element",
    "Node",
    "customElements",
  ]) {
    vi.stubGlobal(name, undefined);
  }
  if (!intl) {
    vi.stubGlobal("Intl", {
      ...Intl,
      PluralRules: undefined,
    });
  }
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe("platform-neutral core", () => {
  it("runs without a DOM", () => {
    const global = globalThis as Record<string, unknown>;
    expect(global.document).toBeUndefined();
    expect(global.window).toBeUndefined();
  });

  it("imports every module without DOM globals, navigator or Intl.PluralRules", async () => {
    stubNonBrowserEngine({ intl: false });
    const paths = Object.keys(modules);
    expect(paths.length).toBeGreaterThan(30);
    for (const path of paths) {
      await expect(modules[path](), path).resolves.toBeTypeOf("object");
    }
  });

  it("the entry evaluates and its helpers work without a DOM", async () => {
    stubNonBrowserEngine({ intl: false });
    const core = await import("./index");
    expect(core.cn("a", { b: true })).toBe("a b");
    expect(core.resolveDesign({ preset: "editorial" }).density).toBe(
      "comfortable",
    );
    expect(core.sanitizeUrl("javascript:alert(1)")).toBeUndefined();
    expect(
      core.getNextIndex({ key: "ArrowDown", currentIndex: 0, count: 3 }),
    ).toBe(1);
    expect(core.createId("x")).toMatch(/^x/);
  });

  it("plural messages fall back to built-in rules without Intl.PluralRules", async () => {
    stubNonBrowserEngine({ intl: false });
    const { createTranslator, getPluralCategory, messages } =
      await import("./i18n");
    expect(getPluralCategory("en", 1)).toBe("one");
    expect(getPluralCategory("en", 2)).toBe("other");
    expect(getPluralCategory("fr", 0)).toBe("one");
    expect(getPluralCategory("fr", 1.5)).toBe("one");
    expect(getPluralCategory("fr", 2)).toBe("other");
    expect(getPluralCategory("fr", 2_000_000)).toBe("many");
    expect(getPluralCategory("ja", 1)).toBe("other");
    expect(getPluralCategory("zh-CN", 1)).toBe("other");
    expect(getPluralCategory("de", 1)).toBe("one");

    const t = createTranslator({
      messages: {
        en: {
          item: { count_one: "{{count}} item", count_other: "{{count}} items" },
        },
      },
      language: "en",
    });
    expect(t("item.count", { count: 1 })).toBe("1 item");
    expect(t("item.count", { count: 3 })).toBe("3 items");
    // the built-in bundles load and translate
    expect(Object.keys(messages)).toEqual(["en", "zh", "ja", "fr"]);
  });

  it("matches Intl.PluralRules for the built-in languages", async () => {
    const { fallbackPluralCategory } = await import("./i18n");
    for (const language of ["en", "fr", "ja", "zh", "de", "pt", "ko"]) {
      const rules = new Intl.PluralRules(language);
      for (const n of [0, 1, 1.5, 2, 3, 5, 11, 21, 100, 1_000_000]) {
        expect(fallbackPluralCategory(language, n), `${language} ${n}`).toBe(
          rules.select(n),
        );
      }
    }
  });
});
