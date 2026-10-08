import { describe, expect, it } from "vitest";
import { DESIGN_PRESETS } from "../theme/design";
import { PALETTES } from "../theme/mode";
import { palettes } from "../theme/palettes";
import { themes } from "../theme/themes";
import { colorMix } from "./color";
import { mix, ref } from "./expr";
import { resolveTokens, tokenCascade, tokenKind } from "./resolve";

describe("resolveTokens", () => {
  it("resolves the default light theme", () => {
    const t = resolveTokens();
    expect(t.mode).toBe("light");
    expect(t.palette).toBeNull();
    expect(t.design.preset).toBe("minerva");
    expect(t.unresolved).toEqual([]);
    expect(t.colors["primary-color"]).toBe("#2563eb");
    expect(t.colors["surface-color"]).toBe("#ffffff");
    expect(t.colors["surface-muted-color"]).toBe(
      colorMix("#1f2937", "#ffffff", 6),
    );
    expect(t.colors["canvas-color"]).toBe(t.colors["surface-subtle-color"]);
    expect(t.colors["overlay-color"]).toBe("rgba(0, 0, 0, 0.45)");
    expect(t.colors["focus-ring-color"]).toBe("rgba(37, 99, 235, 0.45)");
    expect(t.colors["accent-color-hover"]).toBe(
      t.colors["primary-color-hover"],
    );
    expect(t.colors["shadow-color"]).toBe("rgba(15, 23, 42, 0.16)");
  });

  it("resolves the scales to px / numbers", () => {
    const t = resolveTokens();
    expect(t.space).toMatchObject({ "0": 0, "0-5": 2, "1-5": 6, "4": 16 });
    expect(t.radius).toMatchObject({
      none: 0,
      sm: 4,
      md: 6,
      xl: 12,
      full: 9999,
    });
    expect(t.fontSize).toMatchObject({ xs: 12, md: 14, "6xl": 60 });
    expect(t.lineHeight).toEqual({ tight: 1.2, base: 1.5, relaxed: 1.7 });
    expect(t.fontWeight.semibold).toBe(600);
    expect(t.fontFamily.display).toBe(t.fontFamily.sans);
    expect(t.fontFamily.mono).toMatch(/^ui-monospace, "SF Mono"/);
    expect(t.zIndex).toMatchObject({ modal: 1400, toast: 1700 });
    expect(t.transitions.fast).toEqual({
      css: "120ms ease-out",
      duration: 120,
      easing: "ease-out",
    });
    expect(t.easings.spring).toEqual([0.34, 1.56, 0.64, 1]);
    expect(t.sizes).toMatchObject({
      "control-height-md": 40,
      "control-padding-x-xs": 8,
      "row-padding-y": 8,
      "rhythm-section": 48,
      "rhythm-tight": 12,
      "focus-ring-width": 2,
      "touch-target-min": 32,
    });
    expect(t.touchTargetMin).toBe(32);
    expect(t.css["space-1"]).toBe("4px");
  });

  it("resolves shadows and elevations (React Native shape + css)", () => {
    const t = resolveTokens();
    expect(t.shadows.md).toEqual({
      css: "0px 4px 12px rgba(15, 23, 42, 0.16)",
      layers: [
        {
          x: 0,
          y: 4,
          blur: 12,
          spread: 0,
          color: "rgba(15, 23, 42, 0.16)",
          inset: false,
        },
      ],
      color: "#0f172a",
      offset: { width: 0, height: 4 },
      opacity: 0.16,
      radius: 6,
      elevation: 6,
    });
    expect(t.elevation.raised).toEqual(t.shadows.md);
    expect(t.elevation.flat.css).toBe("none");
  });

  it("applies Minerva's dark mode (derived tokens follow the dark base)", () => {
    const t = resolveTokens({ mode: "dark" });
    expect(t.colors["primary-color"]).toBe("#818cf8");
    expect(t.colors["surface-color"]).toBe("#212937");
    expect(t.colors["surface-subtle-color"]).toBe(
      colorMix("#f1f5f9", "#1a202c", 3),
    );
    expect(t.colors["focus-ring-color"]).toBe("rgba(129, 140, 248, 0.55)");
    expect(t.unresolved).toEqual([]);
  });

  it.each(
    PALETTES.flatMap(
      (p) =>
        [
          [p, "light"],
          [p, "dark"],
        ] as const,
    ),
  )("resolves every token of %s / %s", (palette, mode) => {
    const t = resolveTokens({ palette, mode, design: { shadow: "subtle" } });
    expect(t.unresolved).toEqual([]);
    expect(t.colors["primary-color"]).toBe(
      palettes[palette][mode]["primary-color"],
    );
    expect(t.palette).toBe(palette);
    expect(t.fontFamily.sans).not.toContain("'");
  });

  it("uses the preset's palette unless a palette (or null) is given", () => {
    expect(resolveTokens({ design: { preset: "editorial" } }).palette).toBe(
      "editorial",
    );
    expect(
      resolveTokens({ design: { preset: "editorial" }, palette: null }).palette,
    ).toBeNull();
    expect(
      resolveTokens({ design: { preset: "editorial" }, palette: "tech" })
        .colors["primary-color"],
    ).toBe(palettes.tech.light["primary-color"]);
  });

  it("applies the design axes", () => {
    const touch = resolveTokens({ design: { preset: "touch" } });
    expect(touch.touchTargetMin).toBe(44);
    expect(touch.sizes["control-height-md"]).toBe(44);
    expect(touch.radius).toMatchObject({ sm: 6, md: 10, lg: 14, "2xl": 24 });
    const compact = resolveTokens({ design: { preset: "compact" } });
    expect(compact.touchTargetMin).toBe(24);
    expect(compact.fontSize.md).toBe(13);
    expect(compact.lineHeight.base).toBe(1.45);
    const none = resolveTokens({ design: { shadow: "none" } });
    expect(none.shadows.sm.css).toBe("none");
    expect(none.elevation.subtle.css).toBe("none");
    const subtle = resolveTokens({ design: { shadow: "subtle" } });
    expect(subtle.shadows.lg.css).toBe("0px 6px 16px rgba(15, 23, 42, 0.08)");
    for (const preset of DESIGN_PRESETS) {
      expect(resolveTokens({ design: { preset } }).unresolved, preset).toEqual(
        [],
      );
    }
  });

  it("applies overrides last: theme objects, formulas, references", () => {
    const github = resolveTokens({ overrides: themes["github-dark"] });
    expect(github.colors["background-color"]).toBe("#0d1117");
    expect(github.colors["highlight-color"]).toBe("rgba(187, 128, 9, 0.149)");
    const t = resolveTokens({
      overrides: {
        "primary-color": "#ff0000",
        "accent-color": mix(ref("primary-color"), 50, "#0000ff"),
        "space-4": "calc(var(--space-2) * 3)",
        "radius-md": undefined,
      },
    });
    expect(t.colors["primary-color-subtle"]).toBe(
      colorMix("#ff0000", "#ffffff", 12),
    );
    expect(t.colors["accent-color"]).toBe("#800080");
    expect(t.space["4"]).toBe(24);
    expect(t.radius.md).toBe(6);
  });

  it("reports the tokens it cannot evaluate", () => {
    const t = resolveTokens({
      overrides: {
        "primary-color": "var(--accent-color)",
        "info-color": "hsl(0 0% 0%)",
        "line-height-base": "",
        "z-modal": "high",
        "space-1": "1",
        "shadow-sm": "1px",
        "transition-fast": "soon",
        "ease-in": "steps(2)",
      },
    });
    // primary <-> accent is a cycle: both invalid, and what depends on them
    expect(t.unresolved).toEqual(
      expect.arrayContaining([
        "primary-color",
        "accent-color",
        "primary-color-hover",
        "info-color",
        "line-height-base",
        "z-modal",
        "space-1",
        "shadow-sm",
        "elevation-subtle",
        "transition-fast",
        "ease-in",
      ]),
    );
    expect(t.colors["primary-color"]).toBeUndefined();
    expect(t.colors["success-color"]).toBe("#15803d");
  });

  it("supports reduced motion and other root sizes / viewports", () => {
    const t = resolveTokens({
      reducedMotion: true,
      rootFontSize: 10,
      viewportWidth: 1440,
    });
    expect(t.transitions.base.duration).toBe(0);
    expect(t.space["4"]).toBe(10);
    // clamp(3rem, 6vw, 5rem) at 1440px with 10px rem: max 50
    expect(t.sizes["rhythm-section"]).toBe(50);
  });
});

describe("tokenCascade / tokenKind", () => {
  it("returns the CSS text of the cascade", () => {
    const { values, palette, design } = tokenCascade({ mode: "dark" });
    expect(values.get("primary-color")).toBe("#818cf8");
    expect(values.get("surface-subtle-color")).toBe(
      "color-mix(in srgb, var(--foreground-color) 3%, var(--background-color))",
    );
    expect(palette).toBeNull();
    expect(design.density).toBe("standard");
  });

  it("classifies tokens by name", () => {
    expect(tokenKind("shadow-color")).toBe("color");
    expect(tokenKind("shadow-md")).toBe("shadow");
    expect(tokenKind("control-color")).toBe("color");
    expect(tokenKind("control-height-md")).toBe("length");
    expect(tokenKind("touch-target-min")).toBe("length");
    expect(tokenKind("font-family-sans")).toBe("string");
    expect(tokenKind("ease-out")).toBe("easing");
  });
});
