import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  applyThemeStyles,
  generateCSSVariables,
  isBilingualTheme,
  resolveTheme,
} from "./apply-theme";
import { dark, githubDark, light, themes } from "./themes";
import type { ComponentTheme } from "./types";

const rootStyle = () => document.documentElement.style;

const mockMatchMedia = (matches: boolean) =>
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        matches,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as unknown as MediaQueryList,
  );

afterEach(() => {
  vi.restoreAllMocks();
  document.documentElement.removeAttribute("style");
});

describe("themes map", () => {
  it("maps every theme name to a theme object", () => {
    expect(themes.light).toBe(light);
    expect(themes.dark).toBe(dark);
    expect(themes["github-dark"]).toBe(githubDark);
    expect(Object.keys(themes).sort()).toEqual(
      ["dark", "github-dark", "light"].sort(),
    );
  });

  it("keeps the default CSS (default-theme.scss) in sync with the light theme", () => {
    const defaultThemeScss = readFileSync(
      join(import.meta.dirname, "tokens/default-theme.scss"),
      "utf8",
    );
    const normalize = (v: string) => v.replace(/\s+/g, " ").trim();
    const declared = Object.fromEntries(
      [...defaultThemeScss.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(
        ([, k, v]) => [k, normalize(v)],
      ),
    );
    // every light-theme key is declared on :root with the same value
    for (const [key, value] of Object.entries(light)) {
      expect(declared[key], key).toBe(normalize(String(value)));
    }
    // the remaining :root tokens are derived from other tokens or are sizes
    for (const [key, value] of Object.entries(declared)) {
      if (key in light) continue;
      expect(value, key).toMatch(/var\(--|^\d+px$/);
    }
  });

  it("gives every built-in theme the same set of keys", () => {
    const keys = Object.keys(light).sort();
    expect(Object.keys(dark).sort()).toEqual(keys);
    expect(Object.keys(githubDark).sort()).toEqual(keys);
  });

  it("declares a :root default for every semantic token used by the themes", () => {
    const defaultThemeScss = readFileSync(
      join(import.meta.dirname, "tokens/default-theme.scss"),
      "utf8",
    );
    for (const role of [
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
      "info",
    ]) {
      for (const suffix of ["hover", "active", "subtle", "border", "text"]) {
        expect(defaultThemeScss).toContain(`--${role}-color-${suffix}:`);
      }
    }
  });
});

describe("generateCSSVariables", () => {
  it("writes every entry as a --custom-property", () => {
    generateCSSVariables(rootStyle(), {
      ...light,
      "primary-color": "#123456",
    });
    expect(rootStyle().getPropertyValue("--primary-color")).toBe("#123456");
    expect(rootStyle().getPropertyValue("--border-color")).toBe(
      light["border-color"],
    );
  });

  it("removes variables set by the previous theme that the next one lacks", () => {
    applyThemeStyles("dark");
    expect(rootStyle().getPropertyValue("--surface-color")).toBe(
      dark["surface-color"],
    );

    // a custom theme that only defines base tokens
    const custom: ComponentTheme = { ...light };
    delete custom["surface-color"];
    delete custom["text-inverse-color"];
    applyThemeStyles(custom);

    expect(rootStyle().getPropertyValue("--surface-color")).toBe("");
    expect(rootStyle().getPropertyValue("--text-inverse-color")).toBe("");
    expect(rootStyle().getPropertyValue("--background-color")).toBe(
      light["background-color"],
    );
  });

  it("removes custom keys that a later theme does not define", () => {
    const style = rootStyle();
    generateCSSVariables(style, { ...light, "card-bg-color": "#abcdef" });
    expect(style.getPropertyValue("--card-bg-color")).toBe("#abcdef");
    generateCSSVariables(style, githubDark);
    expect(style.getPropertyValue("--card-bg-color")).toBe("");
    expect(style.getPropertyValue("--surface-color")).toBe(
      githubDark["surface-color"],
    );
  });
});

describe("resolveTheme", () => {
  it("resolves built-in names", () => {
    expect(resolveTheme("light")).toBe(light);
    expect(resolveTheme("dark")).toBe(dark);
  });

  it('resolves "github-dark" (regression: used to be undefined and throw)', () => {
    expect(resolveTheme("github-dark")).toBe(githubDark);
  });

  it('resolves "auto" and light/dark pairs from the system scheme', () => {
    const custom = { light: { ...light }, dark: { ...dark } };
    expect(resolveTheme("auto", "dark")).toBe(dark);
    expect(resolveTheme("auto", "light")).toBe(light);
    expect(resolveTheme(custom, "dark")).toBe(custom.dark);
    expect(resolveTheme(custom, "light")).toBe(custom.light);
  });

  it("returns custom theme objects untouched", () => {
    const custom: ComponentTheme = { ...light, "primary-color": "#000" };
    expect(resolveTheme(custom)).toBe(custom);
  });

  it("throws a helpful error for unknown names", () => {
    expect(() => resolveTheme("solarized" as never)).toThrow(
      /Unsupported theme "solarized"/,
    );
  });
});

describe("isBilingualTheme", () => {
  it("detects { light, dark } pairs only", () => {
    expect(isBilingualTheme({ light, dark })).toBe(true);
    expect(isBilingualTheme(light)).toBe(false);
    expect(isBilingualTheme("dark")).toBe(false);
    expect(isBilingualTheme(null)).toBe(false);
  });
});

describe("applyThemeStyles", () => {
  it('applies "github-dark" without throwing', () => {
    expect(() => applyThemeStyles("github-dark")).not.toThrow();
    expect(rootStyle().getPropertyValue("--background-color")).toBe(
      githubDark["background-color"],
    );
  });

  it("uses prefers-color-scheme when no system theme is given", () => {
    mockMatchMedia(true);
    applyThemeStyles("auto");
    expect(rootStyle().getPropertyValue("--background-color")).toBe(
      dark["background-color"],
    );
  });
});
