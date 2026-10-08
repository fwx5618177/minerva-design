import { describe, expect, it } from "vitest";
import {
  colorMix,
  formatColor,
  mixRgba,
  normalizeColor,
  parseColor,
  splitTopLevel,
} from "./color";

describe("parseColor", () => {
  it("parses hex colors (3, 4, 6 and 8 digits)", () => {
    expect(parseColor("#abc")).toEqual({ r: 170, g: 187, b: 204, a: 1 });
    expect(parseColor("#0f08")).toEqual({ r: 0, g: 255, b: 0, a: 136 / 255 });
    expect(parseColor("#2563EB")).toEqual({ r: 37, g: 99, b: 235, a: 1 });
    expect(parseColor("#bb800926")).toEqual({
      r: 187,
      g: 128,
      b: 9,
      a: 38 / 255,
    });
    expect(parseColor("#12")).toBeUndefined();
    expect(parseColor("#12345")).toBeUndefined();
    expect(parseColor("#ggg")).toBeUndefined();
  });

  it("parses rgb() / rgba() in the legacy and modern syntaxes", () => {
    expect(parseColor("rgba(15, 23, 42, 0.16)")).toEqual({
      r: 15,
      g: 23,
      b: 42,
      a: 0.16,
    });
    expect(parseColor("rgb(1 2 3 / 50%)")).toEqual({
      r: 1,
      g: 2,
      b: 3,
      a: 0.5,
    });
    expect(parseColor("rgb(1 2 3/.25)")).toEqual({ r: 1, g: 2, b: 3, a: 0.25 });
    expect(parseColor("rgb(100%, 0%, 50%)")).toEqual({
      r: 255,
      g: 0,
      b: 127.5,
      a: 1,
    });
    // out-of-range channels are clamped
    expect(parseColor("rgb(300, -4, 0, 2)")).toEqual({
      r: 255,
      g: 0,
      b: 0,
      a: 1,
    });
    expect(parseColor("rgb(1, 2)")).toBeUndefined();
    expect(parseColor("rgb(a, b, c)")).toBeUndefined();
  });

  it("parses the basic named colors and transparent (case-insensitive)", () => {
    expect(parseColor("Red")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(parseColor("transparent")).toEqual({ r: 0, g: 0, b: 0, a: 0 });
    expect(parseColor("white")).toEqual({ r: 255, g: 255, b: 255, a: 1 });
  });

  it("rejects what it cannot resolve (system colors, other functions / spaces)", () => {
    expect(parseColor("Highlight")).toBeUndefined();
    expect(parseColor("hsl(0 0% 0%)")).toBeUndefined();
    expect(parseColor("var(--x)")).toBeUndefined();
    expect(parseColor("color-mix(in oklab, red, blue)")).toBeUndefined();
    expect(parseColor("color-mix(in srgb, red)")).toBeUndefined();
    expect(parseColor("color-mix(in srgb, nope 10%, blue)")).toBeUndefined();
    expect(parseColor("color-mix(in srgb, red, nope)")).toBeUndefined();
  });

  it("parses color-mix(in srgb, ...) with any percentage position, nested", () => {
    expect(normalizeColor("color-mix(in srgb, red 50%, blue)")).toBe("#800080");
    expect(normalizeColor("color-mix(in srgb, 25% red, blue)")).toBe("#4000bf");
    expect(
      normalizeColor(
        "color-mix(in srgb, color-mix(in srgb, red 50%, blue) 50%, white)",
      ),
    ).toBe(
      // (127.5, 0, 127.5) and white, unrounded in between
      "#bf80bf",
    );
    expect(
      normalizeColor("color-mix(in srgb, rgb(0 0 0 / 50%) 40%, white 60%)"),
    ).toBe(
      // alpha 0.5*0.4 + 0.6 = 0.8; channels 255*0.6 / 0.8
      "rgba(191, 191, 191, 0.8)",
    );
  });
});

describe("mixRgba / colorMix (CSS Color 5, in srgb)", () => {
  it("red 50%, blue = rgb(127.5 0 127.5), rounded half up", () => {
    expect(mixRgba(parseColor("red")!, parseColor("blue")!, 50)).toEqual({
      r: 127.5,
      g: 0,
      b: 127.5,
      a: 1,
    });
    expect(colorMix("red", "blue", 50)).toBe("#800080");
  });

  it("normalizes the percentages", () => {
    // both omitted: 50 / 50
    expect(colorMix("red", "blue")).toBe("#800080");
    // one omitted: 100 minus the other
    expect(colorMix("red", "blue", undefined, 25)).toBe("#bf0040");
    expect(colorMix("red", "blue", 75)).toBe("#bf0040");
    // sum above 100: scaled down
    expect(colorMix("red", "blue", 75, 75)).toBe("#800080");
    // sum below 100: scaled up, alpha multiplied by the sum
    expect(colorMix("red", "blue", 20, 20)).toBe("rgba(128, 0, 128, 0.4)");
    // invalid: sum 0 or outside 0-100
    expect(colorMix("red", "blue", 0, 0)).toBeUndefined();
    expect(colorMix("red", "blue", 120)).toBeUndefined();
    expect(colorMix("red", "blue", -1)).toBeUndefined();
    expect(colorMix("nope", "blue", 50)).toBeUndefined();
  });

  it("interpolates premultiplied alpha (spec example)", () => {
    // color-mix(in srgb, rgb(100% 0% 0% / 0.7) 25%, rgb(0% 100% 0% / 0.2))
    // = rgb(53.846% 46.154% 0% / 0.325)
    const mixed = mixRgba(
      { r: 255, g: 0, b: 0, a: 0.7 },
      { r: 0, g: 255, b: 0, a: 0.2 },
      25,
    )!;
    expect(mixed.r).toBeCloseTo(255 * 0.53846, 2);
    expect(mixed.g).toBeCloseTo(255 * 0.46154, 2);
    expect(mixed.a).toBeCloseTo(0.325, 10);
    expect(formatColor(mixed)).toBe("rgba(137, 118, 0, 0.325)");
    // ... 20% / 60%: same color, alpha x 0.8
    expect(
      colorMix("rgb(100% 0% 0% / 0.7)", "rgb(0% 100% 0% / 0.2)", 20, 60),
    ).toBe("rgba(137, 118, 0, 0.26)");
  });

  it("mixing with transparent only adds transparency", () => {
    expect(colorMix("#000000", "transparent", 45)).toBe("rgba(0, 0, 0, 0.45)");
    expect(colorMix("#2563eb", "transparent", 45)).toBe(
      "rgba(37, 99, 235, 0.45)",
    );
    expect(colorMix("rgba(0, 0, 0, 0.5)", "transparent", 45)).toBe(
      "rgba(0, 0, 0, 0.225)",
    );
    expect(colorMix("transparent", "transparent")).toBe("rgba(0, 0, 0, 0)");
  });

  it("matches the derived tokens of the default theme", () => {
    // --surface-muted-color: color-mix(in srgb, #1f2937 6%, #ffffff)
    expect(colorMix("#1f2937", "#ffffff", 6)).toBe("#f2f2f3");
    // --selected-color: color-mix(in srgb, #2563eb 14%, #ffffff)
    expect(colorMix("#2563eb", "#ffffff", 14)).toBe("#e0e9fc");
  });
});

describe("formatColor", () => {
  it("writes opaque colors as #rrggbb and others as rgba() (alpha: 3 decimals)", () => {
    expect(formatColor({ r: 0.4, g: 254.5, b: 300, a: 1 })).toBe("#00ffff");
    expect(formatColor({ r: 1, g: 2, b: 3, a: 0.12345 })).toBe(
      "rgba(1, 2, 3, 0.123)",
    );
    expect(formatColor({ r: 1, g: 2, b: 3, a: 0.9996 })).toBe("#010203");
    expect(formatColor({ r: 1, g: 2, b: 3, a: -1 })).toBe("rgba(1, 2, 3, 0)");
  });
});

describe("splitTopLevel", () => {
  it("splits outside parentheses", () => {
    expect(splitTopLevel("a, f(b, c), d")).toEqual(["a", "f(b, c)", "d"]);
    expect(splitTopLevel("0 1px rgb(1 2 3)", " ")).toEqual([
      "0",
      "1px",
      "rgb(1 2 3)",
    ]);
  });
});
