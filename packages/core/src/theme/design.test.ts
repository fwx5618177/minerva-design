import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  DENSITIES,
  DESIGN_ATTRIBUTES,
  DESIGN_PRESETS,
  FONT_SCALES,
  RADIUS_SCALES,
  SHADOW_SCALES,
  designAttributes,
  designPresets,
  isDensity,
  isDesignPreset,
  isFontScale,
  isRadiusScale,
  isShadowScale,
  presetPalette,
  resolveDesign,
} from "./design";
import { isPalette } from "./mode";

const css = readFileSync(join(import.meta.dirname, "tokens.css"), "utf8");

describe("design axes", () => {
  it("resolves the default (minerva) design", () => {
    expect(resolveDesign()).toEqual({
      preset: "minerva",
      density: "standard",
      radius: "medium",
      shadow: "standard",
      fontScale: "standard",
    });
  });

  it("explicit axes win over the preset, invalid values are ignored", () => {
    expect(
      resolveDesign({
        preset: "editorial",
        density: "compact",
        radius: "huge" as never,
      }),
    ).toEqual({
      preset: "editorial",
      density: "compact",
      radius: "small",
      shadow: "subtle",
      fontScale: "large",
    });
    expect(resolveDesign({ preset: "nope" as never }).preset).toBe("minerva");
  });

  it("inherits a base design unless a preset resets it", () => {
    const base = resolveDesign({ preset: "compact", radius: "none" });
    expect(resolveDesign({ shadow: "none" }, base)).toEqual({
      ...base,
      shadow: "none",
    });
    expect(resolveDesign({ preset: "minerva" }, base)).toEqual(resolveDesign());
  });

  it("every preset is valid and has a palette or none", () => {
    for (const preset of DESIGN_PRESETS) {
      const definition = designPresets[preset];
      expect(isDensity(definition.density)).toBe(true);
      expect(isRadiusScale(definition.radius)).toBe(true);
      expect(isShadowScale(definition.shadow)).toBe(true);
      expect(isFontScale(definition.fontScale)).toBe(true);
      expect(definition.palette === null || isPalette(definition.palette)).toBe(
        true,
      );
    }
    expect(presetPalette("editorial")).toBe("editorial");
    expect(presetPalette(undefined)).toBeNull();
    expect(isDesignPreset("editorial")).toBe(true);
    expect(isDesignPreset(3)).toBe(false);
  });

  it("omits standard values from the attributes unless asked", () => {
    expect(designAttributes()).toEqual({});
    expect(designAttributes({ preset: "editorial" })).toEqual({
      "data-density": "comfortable",
      "data-radius": "small",
      "data-shadow": "subtle",
      "data-font-scale": "large",
    });
    expect(designAttributes({ preset: "touch" })).toEqual({
      "data-density": "comfortable",
      "data-radius": "large",
    });
    expect(designAttributes({}, { all: true })).toEqual({
      "data-density": "standard",
      "data-radius": "medium",
      "data-shadow": "standard",
      "data-font-scale": "standard",
    });
  });

  it("tokens.css has a block for every non-standard value", () => {
    const values: Record<keyof typeof DESIGN_ATTRIBUTES, readonly string[]> = {
      density: DENSITIES,
      radius: RADIUS_SCALES,
      shadow: SHADOW_SCALES.filter((v) => v !== "standard"),
      fontScale: FONT_SCALES,
    };
    for (const [axis, list] of Object.entries(values)) {
      const attribute =
        DESIGN_ATTRIBUTES[axis as keyof typeof DESIGN_ATTRIBUTES];
      for (const value of list) {
        expect(css, `${attribute}=${value}`).toContain(
          `[${attribute}=${value}][${attribute}]`,
        );
      }
    }
  });
});
