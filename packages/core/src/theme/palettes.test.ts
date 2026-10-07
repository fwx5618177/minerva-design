import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { palettes } from "./palettes";
import { dark, light } from "./themes";
import { PALETTES } from "./theme-utils";

const read = (file: string) =>
  readFileSync(join(import.meta.dirname, "tokens", file), "utf8");

// prettier normalizes quotes in the stylesheet
const normalize = (v: string) =>
  v.replace(/\s+/g, " ").replace(/'/g, '"').trim();

/** selector -> declarations of a flat stylesheet */
const blocks = (scss: string) => {
  const out = new Map<string, Record<string, string>>();
  const source = scss.replace(/\/\/[^\n]*/g, "");
  for (const [, selector, body] of source.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    out.set(
      normalize(selector),
      Object.fromEntries(
        [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, k, v]) => [
          k,
          normalize(v),
        ]),
      ),
    );
  }
  return out;
};

describe("palettes", () => {
  const css = blocks(read("palettes.scss"));

  it("defines every palette in light and dark", () => {
    expect(Object.keys(palettes).sort()).toEqual([...PALETTES].sort());
    for (const palette of PALETTES) {
      expect(Object.keys(palettes[palette]).sort()).toEqual(["dark", "light"]);
    }
  });

  it.each(PALETTES)("%s: palettes.scss matches palettes.ts", (palette) => {
    const lightBlock = css.get(
      `[data-palette="${palette}"][data-theme="light"], [data-palette="${palette}"]:not([data-theme="dark"])`,
    );
    const darkBlock = css.get(`[data-palette="${palette}"][data-theme="dark"]`);
    const expected = (theme: Record<string, string>) =>
      Object.fromEntries(
        Object.entries(theme).map(([k, v]) => [k, normalize(v)]),
      );
    expect(lightBlock).toEqual(expected(palettes[palette].light));
    expect(darkBlock).toEqual(expected(palettes[palette].dark));
  });

  it("gives every palette the full base token set plus the same extras", () => {
    const keys = Object.keys(palettes.editorial.light).sort();
    for (const key of Object.keys(light)) {
      if (
        key.endsWith("-color") ||
        key === "text-gray" ||
        key.includes("gradient")
      ) {
        expect(keys, key).toContain(key);
      }
    }
    for (const palette of PALETTES) {
      expect(Object.keys(palettes[palette].light).sort()).toEqual(keys);
      expect(Object.keys(palettes[palette].dark).sort()).toEqual(keys);
    }
  });

  it("declares Minerva's own dark mode for data-theme without a palette", () => {
    const block = css.get('[data-theme="dark"]:not([data-palette])');
    expect(block).toEqual(
      Object.fromEntries(
        Object.entries(dark).map(([k, v]) => [k, normalize(String(v))]),
      ),
    );
  });

  it("keeps the brand colors of each palette", () => {
    expect(palettes.editorial.light["primary-color"]).toBe("#1e3a5f");
    expect(palettes.editorial.light["background-color"]).toBe("#fdfbf6");
    expect(palettes.tech.dark["primary-color"]).toBe("#5c8ee6");
    expect(palettes.graphite.light["canvas-color"]).toBe("#f5f6f7");
    expect(palettes.cool.dark["surface-color"]).toBe("#1b222c");
  });
});

describe("scale tokens", () => {
  const scales = blocks(read("scales.scss")).get(":root")!;

  it("ships the spacing scale used by layout props", () => {
    for (const step of [
      "0",
      "0-5",
      "1",
      "1-5",
      "2",
      "2-5",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "10",
      "12",
      "14",
      "16",
      "20",
      "24",
    ]) {
      expect(scales[`space-${step}`], step).toBeDefined();
    }
  });

  it("ships typography, layering and motion tokens", () => {
    for (const key of [
      "font-size-md",
      "font-weight-semibold",
      "line-height-base",
      "font-family-sans",
      "font-family-mono",
      "z-modal",
      "z-toast",
      "transition-fast",
      "ease-out",
      "radius-full",
      "focus-ring-width",
    ]) {
      expect(scales[key], key).toBeDefined();
    }
  });
});
