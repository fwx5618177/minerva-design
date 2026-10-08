import { describe, expect, it } from "vitest";
import {
  evaluateEasing,
  evaluateLength,
  evaluateShadow,
  evaluateTransition,
  substituteVars,
} from "./values";

const context = { rootFontSize: 16, viewportWidth: 375, viewportHeight: 667 };
const length = (text: string, ctx = context) => evaluateLength(text, ctx);

describe("substituteVars", () => {
  const values: Record<string, string> = { a: "1px", b: "red" };
  const lookup = (name: string) => values[name];

  it("replaces references, fallbacks included", () => {
    expect(substituteVars("calc(var(--a) + var(--a))", lookup)).toBe(
      "calc(1px + 1px)",
    );
    expect(substituteVars("var(--x, var(--b))", lookup)).toBe("red");
    expect(substituteVars("var(--x, 0 1px 2px blue)", lookup)).toBe(
      "0 1px 2px blue",
    );
    expect(substituteVars("no refs", lookup)).toBe("no refs");
  });

  it("is invalid without a value or fallback, or when malformed", () => {
    expect(substituteVars("var(--x)", lookup)).toBeUndefined();
    expect(substituteVars("var(--x, var(--y))", lookup)).toBeUndefined();
    expect(substituteVars("var(a)", lookup)).toBeUndefined();
    expect(substituteVars("var(--a", lookup)).toBeUndefined();
  });
});

describe("evaluateLength", () => {
  it("converts units to px", () => {
    expect(length("0")).toBe(0);
    expect(length("4px")).toBe(4);
    expect(length("-2px")).toBe(-2);
    expect(length("0.5rem")).toBe(8);
    expect(length("1em", { ...context, rootFontSize: 10 })).toBe(10);
    expect(length("10vw")).toBe(37.5);
    expect(length("10vh")).toBeCloseTo(66.7);
    expect(length(".5rem")).toBe(8);
  });

  it("evaluates calc(), min(), max() and clamp()", () => {
    expect(length("calc(0.5rem + 2px)")).toBe(10);
    expect(length("calc(1rem - 2px * 2)")).toBe(12);
    expect(length("calc(2 * 4px)")).toBe(8);
    expect(length("calc(8px / 2)")).toBe(4);
    expect(length("calc((1px + 2px) * 2)")).toBe(6);
    expect(length("min(10px, 1rem)")).toBe(10);
    expect(length("max(10px, 1rem)")).toBe(16);
    expect(length("clamp(3rem, 6vw, 5rem)")).toBe(48);
    expect(
      length("clamp(3rem, 6vw, 5rem)", { ...context, viewportWidth: 1200 }),
    ).toBe(72);
    expect(
      length("clamp(3rem, 6vw, 5rem)", { ...context, viewportWidth: 2000 }),
    ).toBe(80);
  });

  it("rejects what is not a length", () => {
    for (const text of [
      "5",
      "abc",
      "4px 2px",
      "calc(4px + 2)",
      "calc(4px * 4px)",
      "calc(8px / 0)",
      "calc(8px / 2px)",
      "calc(1px",
      "calc(1px, 2px)",
      "clamp(1px, 2px)",
      "min(1px, 2)",
      "calc(1px +)",
      "calc(1px *)",
      "calc(1px 2px)",
    ]) {
      expect(length(text), text).toBeUndefined();
    }
  });
});

describe("evaluateShadow", () => {
  it("resolves the layers and React Native's props (first layer)", () => {
    expect(
      evaluateShadow(
        "0 4px 6px -1px rgba(28, 25, 23, 0.08), 0 2px 4px -2px rgba(28, 25, 23, 0.05)",
        context,
      ),
    ).toEqual({
      css: "0px 4px 6px -1px rgba(28, 25, 23, 0.08), 0px 2px 4px -2px rgba(28, 25, 23, 0.05)",
      layers: [
        {
          x: 0,
          y: 4,
          blur: 6,
          spread: -1,
          color: "rgba(28, 25, 23, 0.08)",
          inset: false,
        },
        {
          x: 0,
          y: 2,
          blur: 4,
          spread: -2,
          color: "rgba(28, 25, 23, 0.05)",
          inset: false,
        },
      ],
      color: "#1c1917",
      offset: { width: 0, height: 4 },
      opacity: 0.08,
      radius: 3,
      elevation: 3,
    });
  });

  it("handles none, inset, rem lengths, mixed colors and a missing color", () => {
    expect(evaluateShadow("none", context)).toMatchObject({
      css: "none",
      layers: [],
      opacity: 0,
      elevation: 0,
    });
    expect(
      evaluateShadow(
        "inset 0 0.125rem 0 color-mix(in srgb, #000 50%, transparent)",
        context,
      ),
    ).toMatchObject({
      css: "inset 0px 2px 0px rgba(0, 0, 0, 0.5)",
      color: "#000000",
      opacity: 0.5,
    });
    expect(evaluateShadow("1px 1px", context)?.css).toBe("1px 1px 0px #000000");
  });

  it("is undefined for an invalid shadow", () => {
    expect(evaluateShadow("1px red", context)).toBeUndefined();
    expect(evaluateShadow("0 1px 2px nope", context)).toBeUndefined();
    expect(evaluateShadow("1px 2px 3px 4px 5px red", context)).toBeUndefined();
  });
});

describe("motion", () => {
  it("parses transitions", () => {
    expect(evaluateTransition("120ms ease-out")).toEqual({
      css: "120ms ease-out",
      duration: 120,
      easing: "ease-out",
    });
    expect(evaluateTransition("0s")).toEqual({
      css: "0s",
      duration: 0,
      easing: "ease",
    });
    expect(evaluateTransition("0.2s linear")?.duration).toBe(200);
    expect(evaluateTransition("fast")).toBeUndefined();
  });

  it("parses easing curves", () => {
    expect(evaluateEasing("cubic-bezier(0.22, 1, 0.36, 1)")).toEqual([
      0.22, 1, 0.36, 1,
    ]);
    expect(evaluateEasing("ease-in-out")).toEqual([0.42, 0, 0.58, 1]);
    expect(evaluateEasing("cubic-bezier(1, 2)")).toBeUndefined();
    expect(evaluateEasing("cubic-bezier(a, b, c, d)")).toBeUndefined();
    expect(evaluateEasing("steps(4)")).toBeUndefined();
  });
});
