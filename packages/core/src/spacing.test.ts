import { describe, expect, it } from "vitest";
import { resolveSize, resolveSpace } from "./spacing";

describe("resolveSpace", () => {
  it.each([
    [2, "var(--space-2)"],
    [0.5, "var(--space-0-5)"],
    ["4", "var(--space-4)"],
    [" 0.5 ", "var(--space-0-5)"],
    ["12px", "12px"],
    [" auto ", "auto"],
    ["var(--x)", "var(--x)"],
    ["-0.5", "-0.5"],
    [".5", ".5"],
    [-1, "var(--space--1)"],
  ])("resolveSpace(%j) = %s", (value, expected) => {
    expect(resolveSpace(value)).toBe(expected);
  });
});

describe("resolveSize", () => {
  it.each([
    [120, "120px"],
    [0, "0px"],
    ["120", "120px"],
    [" -4.5 ", "-4.5px"],
    ["50%", "50%"],
    [" 2rem ", "2rem"],
  ])("resolveSize(%j) = %s", (value, expected) => {
    expect(resolveSize(value)).toBe(expected);
  });
});
