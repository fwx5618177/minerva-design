import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins strings and numbers, skipping falsy values", () => {
    expect(cn("a", false, null, undefined, 0, "", "b", 1, true)).toBe("a b 1");
  });

  it("keeps the truthy keys of objects", () => {
    expect(cn("a", { b: true, c: false, d: 1, e: undefined })).toBe("a b d");
  });

  it("flattens nested arrays", () => {
    expect(cn(["a", ["b", { c: true }], null], "d")).toBe("a b c d");
  });

  it("returns an empty string without classes", () => {
    expect(cn()).toBe("");
    expect(cn(false, {})).toBe("");
  });
});
