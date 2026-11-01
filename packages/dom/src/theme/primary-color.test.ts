import { afterEach, describe, expect, it } from "vitest";
import { palettes, resolvePrimaryColor } from "@minerva/core";
import { generateCSSVariables } from "./apply-theme";
import { primaryColorCss, primaryColorTheme } from "./primary-color";

const indigo = resolvePrimaryColor("#4f46e5")!;

afterEach(() => {
  document.documentElement.removeAttribute("style");
  document.head.innerHTML = "";
});

describe("primaryColorTheme", () => {
  it("serializes the brand tokens of a mode like tokens.css", () => {
    const light = primaryColorTheme(indigo, "light");
    expect(light["primary-color"]).toBe("#4f46e5");
    expect(light["primary-color-hover"]).toBe(
      "color-mix(in srgb, var(--primary-color) 85%, var(--foreground-color))",
    );
    expect(light["focus-ring-color"]).toBe(
      "color-mix(in srgb, var(--primary-color) 45%, transparent)",
    );
    expect(light["accent-color"]).toBe("var(--primary-color)");
    expect(primaryColorTheme(indigo, "dark")["primary-color"]).toBe("#7b85f2");
  });

  it("keeps a palette's own accent", () => {
    const theme = primaryColorTheme(indigo, "light", palettes.editorial.light);
    expect(theme).not.toHaveProperty("accent-color");
    expect(theme["primary-color-subtle"]).toBeDefined();
  });

  it("can be written with generateCSSVariables", () => {
    const style = document.documentElement.style;
    generateCSSVariables(style, primaryColorTheme(indigo, "light"));
    expect(style.getPropertyValue("--primary-color")).toBe("#4f46e5");
    expect(style.getPropertyValue("--primary-color-text")).toContain(
      "var(--primary-color)",
    );
  });
});

describe("primaryColorCss", () => {
  it("writes a light and a data-theme=dark rule", () => {
    const css = primaryColorCss(indigo);
    expect(css).toContain(
      ":root:not([data-theme=dark]){--primary-color:#4f46e5;",
    );
    expect(css).toContain(":root[data-theme=dark]{--primary-color:#7b85f2;");
    expect(css).toContain(
      "--primary-color-hover:color-mix(in srgb, var(--primary-color) 85%, var(--foreground-color))",
    );
  });

  it("applies the matching rule to the document", () => {
    const style = document.createElement("style");
    style.textContent = primaryColorCss(indigo, {
      base: { dark: palettes.editorial.dark },
    });
    document.head.appendChild(style);
    const root = document.documentElement;
    const value = () =>
      getComputedStyle(root).getPropertyValue("--primary-color").trim();
    expect(value()).toBe("#4f46e5");
    root.setAttribute("data-theme", "dark");
    expect(value()).toBe("#7b85f2");
    root.removeAttribute("data-theme");
    expect(style.textContent).not.toMatch(
      /\[data-theme=dark\]\{[^}]*--accent-color:/,
    );
  });
});
