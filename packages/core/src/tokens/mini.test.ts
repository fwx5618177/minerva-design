import { describe, expect, it } from "vitest";
import { PALETTES } from "../theme/mode";
import {
  MINI_ROOT_SELECTOR,
  generateMiniTokensCss,
  generateMiniTokensFiles,
  miniColorClass,
  miniTokenClassNames,
} from "./mini";
import { resolveTokens } from "./resolve";

const files = generateMiniTokensFiles();
const full = generateMiniTokensCss();

/** selector -> declarations */
const rules = (css: string) =>
  new Map(
    [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => [
      selector.replace(/\/\*[^*]*\*\//g, "").trim(),
      Object.fromEntries(
        [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, k, v]) => [k, v]),
      ),
    ]),
  );

/**
 * Size budgets (bytes, uncompressed). A WeChat mini-program main package is
 * capped at 2 MB (subpackages too) and every byte of WXSS is parsed on
 * startup: the base file stays well under 16 KB and one palette under 8 KB,
 * so an app pays for the palettes it ships only.
 */
const BUDGETS = {
  base: 16 * 1024,
  palette: 8 * 1024,
  full: 48 * 1024,
};

describe("mini-program tokens", () => {
  it("emits the base file, one file per palette and the full stylesheet", () => {
    expect(Object.keys(files).sort()).toEqual(
      [
        "tokens.mini.css",
        "tokens.mini.base.css",
        ...PALETTES.map((p) => `tokens.mini.palette-${p}.css`),
      ].sort(),
    );
    expect(files["tokens.mini.css"]).toBe(full);
    expect(files["tokens.mini.base.css"]).toBe(
      generateMiniTokensCss({ palettes: [] }),
    );
    // the full file is the base file followed by every palette file
    const body = (css: string) => css.slice(css.indexOf("\n") + 1);
    expect(full).toBe(
      [
        files["tokens.mini.base.css"].trimEnd(),
        ...PALETTES.map((p) =>
          body(files[`tokens.mini.palette-${p}.css`]).trimEnd(),
        ),
      ].join("\n\n") + "\n",
    );
  });

  it.each(Object.keys(files))(
    "%s: only what mini-program engines support",
    (name) => {
      const css = files[name];
      expect(css).not.toMatch(/\[/); // attribute selectors
      expect(css).not.toContain("color-mix");
      expect(css).not.toMatch(/\d(rem|em|vw|vh)\b/);
      expect(css).not.toMatch(/@(layer|media|supports|import)/);
      expect(css).not.toMatch(/:(where|is|not|root)\b/);
      expect(css).not.toContain("calc(");
      expect(css).not.toContain("clamp(");
      // selectors: `page`, single classes
      for (const selector of rules(css).keys()) {
        for (const part of selector.split(",")) {
          expect(part.trim(), selector).toMatch(/^(page|\.mn-[a-z0-9-]+)$/);
        }
      }
    },
  );

  it("stays within the size budgets", () => {
    const size = (css: string) => new TextEncoder().encode(css).length;
    expect(size(files["tokens.mini.base.css"])).toBeLessThan(BUDGETS.base);
    for (const palette of PALETTES) {
      expect(
        size(files[`tokens.mini.palette-${palette}.css`]),
        palette,
      ).toBeLessThan(BUDGETS.palette);
    }
    expect(size(full)).toBeLessThan(BUDGETS.full);
  });

  it("declares the resolved defaults on page / .mn-root", () => {
    const root = rules(full).get(MINI_ROOT_SELECTOR)!;
    const defaults = resolveTokens();
    expect(root["primary-color"]).toBe("#2563eb");
    expect(root["surface-muted-color"]).toBe(
      defaults.colors["surface-muted-color"],
    );
    expect(root["space-4"]).toBe("16px");
    expect(root["font-size-md"]).toBe("14px");
    expect(root["touch-target-min"]).toBe("32px");
    expect(root["rhythm-section"]).toBe("48px");
    // shadows follow the shadow axis and the color class
    expect(root["shadow-md"]).toBe("var(--mn-shadow-standard-md)");
    expect(root["mn-shadow-standard-md"]).toBe(defaults.shadows.md.css);
    expect(root["elevation-raised"]).toBe("var(--shadow-md)");
    expect(root["elevation-flat"]).toBe("none");
  });

  it("every var() reference points at a token of the root block", () => {
    const root = rules(full).get(MINI_ROOT_SELECTOR)!;
    for (const [, name] of full.matchAll(/var\(--([\w-]+)\)/g)) {
      expect(root, name).toHaveProperty([name]);
    }
  });

  it("color classes declare resolved colors only where they differ, never axis tokens", () => {
    const all = rules(full);
    const root = all.get(MINI_ROOT_SELECTOR)!;
    const dark = all.get(".mn-theme-dark")!;
    expect(dark["background-color"]).toBe("#1a202c");
    expect(dark["surface-subtle-color"]).toBe(
      resolveTokens({ mode: "dark" }).colors["surface-subtle-color"],
    );
    expect(dark["space-4"]).toBeUndefined();
    for (const palette of PALETTES) {
      for (const mode of ["light", "dark"] as const) {
        const block = all.get(`.${miniColorClass(mode, palette)}`)!;
        const expected = resolveTokens({ mode, palette });
        expect(block["primary-color"]).toBe(expected.colors["primary-color"]);
        expect(block["font-family-sans"] ?? root["font-family-sans"]).toBe(
          expected.fontFamily.sans,
        );
        for (const name of Object.keys(block)) {
          expect(root, name).toHaveProperty([name]);
          expect(name, `${palette} ${mode}`).not.toMatch(
            /^(shadow-(sm|md|lg|xl)|radius-|control-(height|padding)|row-|font-size-|line-height-|touch-)/,
          );
        }
      }
    }
    expect(all.get(".mn-palette-tech-dark")!["primary-color"]).toBe("#5c8ee6");
  });

  it("declares every design axis value as a class", () => {
    const all = rules(full);
    expect(all.get(".mn-density-comfortable")).toMatchObject({
      "control-height-md": "44px",
      "touch-target-min": "44px",
    });
    expect(all.get(".mn-density-compact")!["touch-target-min"]).toBe("24px");
    expect(all.get(".mn-radius-large")!["radius-md"]).toBe("10px");
    expect(all.get(".mn-radius-none")!["radius-md"]).toBe("0px");
    expect(all.get(".mn-shadow-none")!["shadow-md"]).toBe("none");
    expect(all.get(".mn-shadow-subtle")!["shadow-md"]).toBe(
      "var(--mn-shadow-subtle-md)",
    );
    expect(all.get(".mn-shadow-standard")!["shadow-md"]).toBe(
      "var(--mn-shadow-standard-md)",
    );
    expect(all.get(".mn-font-scale-large")!["font-size-md"]).toBe("16px");
  });
});

describe("miniTokenClassNames", () => {
  it("lists mn-root, the color class and the non-standard axes", () => {
    expect(miniTokenClassNames()).toBe("mn-root");
    expect(miniTokenClassNames({ mode: "dark" })).toBe("mn-root mn-theme-dark");
    expect(
      miniTokenClassNames({
        mode: "dark",
        palette: "tech",
        design: { preset: "touch" },
      }),
    ).toBe(
      "mn-root mn-palette-tech-dark mn-density-comfortable mn-radius-large",
    );
    // the preset's palette, unless one (or null) is given
    expect(miniTokenClassNames({ design: { preset: "editorial" } })).toBe(
      "mn-root mn-palette-editorial mn-density-comfortable mn-radius-small mn-shadow-subtle mn-font-scale-large",
    );
    expect(
      miniTokenClassNames({ design: { preset: "editorial" }, palette: null }),
    ).toBe(
      "mn-root mn-density-comfortable mn-radius-small mn-shadow-subtle mn-font-scale-large",
    );
  });

  it("maps a mode x palette to its color class", () => {
    expect(miniColorClass("light", null)).toBeNull();
    expect(miniColorClass("dark", null)).toBe("mn-theme-dark");
    expect(miniColorClass("light", "cool")).toBe("mn-palette-cool");
    expect(miniColorClass("dark", "cool")).toBe("mn-palette-cool-dark");
  });
});
