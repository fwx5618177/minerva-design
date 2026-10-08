import { describe, expect, it } from "vitest";
import {
  clampNumber,
  formatNumberValue,
  inferStepPrecision,
  parseNumberDraft,
} from "./number-input";

describe("number input helpers", () => {
  it("infers the precision of the step", () => {
    expect(inferStepPrecision()).toBe(0);
    expect(inferStepPrecision(1)).toBe(0);
    expect(inferStepPrecision(5)).toBe(0);
    expect(inferStepPrecision(0.1)).toBe(1);
    expect(inferStepPrecision(0.05)).toBe(2);
    expect(inferStepPrecision(1e-7)).toBe(0);
  });

  it("clamps to optional bounds", () => {
    expect(clampNumber(5)).toBe(5);
    expect(clampNumber(-1, 0)).toBe(0);
    expect(clampNumber(11, undefined, 10)).toBe(10);
    expect(clampNumber(5, 0, 10)).toBe(5);
  });

  it("formats values with a fixed precision", () => {
    expect(formatNumberValue(1.005, 1)).toBe("1.0");
    expect(formatNumberValue(3, 2)).toBe("3.00");
    expect(formatNumberValue(null, 2)).toBe("");
    expect(formatNumberValue(undefined, 0)).toBe("");
    expect(formatNumberValue(NaN, 0)).toBe("");
  });

  it("parses drafts without exponents", () => {
    expect(parseNumberDraft(" 12.5 ")).toBe(12.5);
    expect(parseNumberDraft("-3")).toBe(-3);
    expect(parseNumberDraft("1.")).toBe(1);
    expect(parseNumberDraft(".5")).toBe(0.5);
    expect(parseNumberDraft("")).toBeNull();
    expect(parseNumberDraft("-")).toBeNull();
    expect(parseNumberDraft("1e3")).toBeNull();
    expect(parseNumberDraft("1.2.3")).toBeNull();
    expect(parseNumberDraft("abc")).toBeNull();
  });
});
