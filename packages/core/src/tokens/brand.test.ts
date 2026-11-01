import { describe, expect, it } from "vitest";
import { palettes } from "../theme/palettes";
import { dark, light } from "../theme/themes";
import {
  PRIMARY_DERIVED_TOKENS,
  accentFollowsPrimary,
  contrastRatio,
  derivePrimaryDark,
  invalidPrimaryColorMessage,
  primaryColorTokens,
  resolvePrimaryColor,
} from "./brand";
import { colorMix } from "./color";
import { defaultThemeTokens, roleTokens } from "./default-theme";
import { tokenToCss } from "./index";
import { resolveTokens } from "./resolve";

const DARK_SURFACE = dark["surface-color"]!;

describe("contrastRatio", () => {
  it("computes WCAG contrast ratios", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrastRatio("#ffffff", "#ffffff")).toBe(1);
    expect(contrastRatio("#777777", "#ffffff")).toBeCloseTo(4.48, 2);
    expect(contrastRatio("nope", "#ffffff")).toBeUndefined();
  });
});

describe("derivePrimaryDark", () => {
  it("lightens indigo-600 to an indigo that reads on the dark surface", () => {
    const derived = derivePrimaryDark("#4f46e5")!;
    expect(derived).toBe("#7b85f2");
    expect(contrastRatio(derived, DARK_SURFACE)).toBeGreaterThanOrEqual(4.5);
    // close to the hand-picked indigo-400 of the built-in dark theme
    expect(contrastRatio(derived, dark["primary-color"])).toBeLessThan(1.15);
  });

  it("is deterministic and only lightens as much as needed", () => {
    for (const color of [
      "#2563eb",
      "#1e3a5f",
      "#9a3412",
      "#15803d",
      "#e11d48",
      "#000000",
      "#4f46e5",
    ]) {
      const derived = derivePrimaryDark(color)!;
      expect(derived).toBe(derivePrimaryDark(color));
      const ratio = contrastRatio(derived, DARK_SURFACE)!;
      expect(ratio, color).toBeGreaterThanOrEqual(4.5);
      expect(ratio, color).toBeLessThan(4.75);
      // lighter than the original
      expect(contrastRatio(derived, "#000000")!).toBeGreaterThan(
        contrastRatio(color, "#000000")!,
      );
      // the dark theme's inverse text stays readable on filled controls
      expect(
        contrastRatio(derived, dark["text-inverse-color"]!),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("keeps the hue (mixes toward white, no hue shift)", () => {
    // a pure gray stays gray
    expect(derivePrimaryDark("#000000")).toMatch(/^#([\da-f]{2})\1\1$/);
  });

  it("returns colors that already contrast unchanged (normalized)", () => {
    expect(derivePrimaryDark("#818CF8")).toBe("#818cf8");
    expect(derivePrimaryDark("yellow")).toBe("#ffff00");
  });

  it("keeps alpha and honours the options", () => {
    expect(derivePrimaryDark("rgba(79, 70, 229, 0.5)")).toBe(
      "rgba(123, 133, 242, 0.5)",
    );
    const strict = derivePrimaryDark("#4f46e5", { minContrast: 7 })!;
    expect(contrastRatio(strict, DARK_SURFACE)).toBeGreaterThanOrEqual(7);
    const onBlack = derivePrimaryDark("#4f46e5", { background: "#000000" })!;
    expect(contrastRatio(onBlack, "#000000")).toBeGreaterThanOrEqual(4.5);
    expect(derivePrimaryDark("not-a-color")).toBeUndefined();
  });
});

describe("resolvePrimaryColor", () => {
  it("derives the dark value of a single color", () => {
    expect(resolvePrimaryColor("#4F46E5")).toEqual({
      light: "#4f46e5",
      dark: "#7b85f2",
    });
    expect(resolvePrimaryColor("rgb(79 70 229)")).toEqual({
      light: "#4f46e5",
      dark: "#7b85f2",
    });
  });

  it("uses an explicit pair as-is", () => {
    expect(resolvePrimaryColor({ light: "#4f46e5", dark: "#818CF8" })).toEqual({
      light: "#4f46e5",
      dark: "#818cf8",
    });
  });

  it("returns null when unset and undefined when invalid", () => {
    expect(resolvePrimaryColor(undefined)).toBeNull();
    expect(resolvePrimaryColor(null)).toBeNull();
    expect(resolvePrimaryColor("indigoish")).toBeUndefined();
    expect(resolvePrimaryColor("")).toBeUndefined();
    expect(resolvePrimaryColor(42)).toBeUndefined();
    expect(resolvePrimaryColor({ light: "#4f46e5" })).toBeUndefined();
    expect(
      resolvePrimaryColor({ light: "#4f46e5", dark: "nope" }),
    ).toBeUndefined();
    expect(invalidPrimaryColorMessage("indigoish")).toContain('"indigoish"');
  });
});

describe("primaryColorTokens", () => {
  it("finds every token derived from the primary color", () => {
    expect([...PRIMARY_DERIVED_TOKENS].sort()).toEqual(
      [
        "selected-color",
        "focus-ring-color",
        "accent-color",
        ...Object.keys(roleTokens("primary")),
        ...Object.keys(roleTokens("accent")),
      ].sort(),
    );
  });

  it("uses the default theme's formulas", () => {
    const block = primaryColorTokens("#4f46e5");
    expect(block["primary-color"]).toBe("#4f46e5");
    for (const name of PRIMARY_DERIVED_TOKENS) {
      expect(block[name], name).toEqual(defaultThemeTokens[name]);
    }
    expect(tokenToCss(block["primary-color-hover"]!)).toBe(
      "color-mix(in srgb, var(--primary-color) 85%, var(--foreground-color))",
    );
  });

  it("keeps a palette's distinct accent", () => {
    expect(accentFollowsPrimary(undefined)).toBe(true);
    expect(accentFollowsPrimary(light)).toBe(true);
    expect(accentFollowsPrimary(palettes.tech.light)).toBe(true);
    expect(accentFollowsPrimary(palettes.editorial.light)).toBe(false);
    expect(
      accentFollowsPrimary({ "accent-color": "var(--primary-color)" }),
    ).toBe(true);
    const block = primaryColorTokens("#4f46e5", palettes.editorial.light);
    expect(block).not.toHaveProperty("accent-color");
    expect(block).not.toHaveProperty("accent-color-hover");
    expect(block).toHaveProperty("primary-color-hover");
    expect(block).toHaveProperty("focus-ring-color");
  });
});

describe("resolveTokens({ primaryColor })", () => {
  it("recomputes the derived tokens like a primary-color change of tokens.css", () => {
    const t = resolveTokens({ primaryColor: "#4f46e5" });
    expect(t.colors["primary-color"]).toBe("#4f46e5");
    expect(t.colors["primary-color-hover"]).toBe(
      colorMix("#4f46e5", t.colors["foreground-color"]!, 85),
    );
    expect(t.colors["primary-color-subtle"]).toBe(
      colorMix("#4f46e5", t.colors["surface-color"]!, 12),
    );
    expect(t.colors["focus-ring-color"]).toBe("rgba(79, 70, 229, 0.45)");
    expect(t.colors["accent-color"]).toBe("#4f46e5");
    expect(t.colors["selected-color"]).toBe(
      colorMix("#4f46e5", t.colors["surface-color"]!, 14),
    );
    expect(t.unresolved).toEqual([]);
  });

  it("uses the derived dark value in dark mode, over the dark theme and palettes", () => {
    const t = resolveTokens({ mode: "dark", primaryColor: "#4f46e5" });
    expect(t.colors["primary-color"]).toBe("#7b85f2");
    // the dark theme's explicit focus ring follows the brand color too
    expect(t.colors["focus-ring-color"]).toBe("rgba(123, 133, 242, 0.45)");
    const paired = resolveTokens({
      mode: "dark",
      palette: "tech",
      primaryColor: { light: "#4f46e5", dark: "#818cf8" },
    });
    expect(paired.colors["primary-color"]).toBe("#818cf8");
    expect(paired.colors["primary-color-hover"]).toBe(
      colorMix("#818cf8", paired.colors["foreground-color"]!, 85),
    );
    expect(paired.colors["accent-color"]).toBe("#818cf8");
  });

  it("keeps the editorial accent, lets overrides win and ignores invalid colors", () => {
    const editorial = resolveTokens({
      palette: "editorial",
      primaryColor: "#4f46e5",
    });
    expect(editorial.colors["primary-color"]).toBe("#4f46e5");
    expect(editorial.colors["accent-color"]).toBe(
      palettes.editorial.light["accent-color"],
    );
    const overridden = resolveTokens({
      primaryColor: "#4f46e5",
      overrides: { "primary-color-hover": "#000000" },
    });
    expect(overridden.colors["primary-color-hover"]).toBe("#000000");
    expect(
      resolveTokens({ primaryColor: "bogus" }).colors["primary-color"],
    ).toBe(light["primary-color"]);
  });
});
