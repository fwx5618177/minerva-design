import { describe, expect, it } from "vitest";
import { DEFAULT_TAG_SEPARATORS, splitBySeparators } from "./tag-separators";

describe("splitBySeparators", () => {
  it("defaults to comma and Enter", () => {
    expect(DEFAULT_TAG_SEPARATORS).toEqual([",", "Enter"]);
  });

  it("splits on any literal separator", () => {
    expect(splitBySeparators("a,b;c", [",", ";"])).toEqual(["a", "b", "c"]);
    expect(splitBySeparators("a.b|c", [".", "|"])).toEqual(["a", "b", "c"]);
  });

  it("prefers the longest separator", () => {
    expect(splitBySeparators("a::b:c", [":", "::"])).toEqual(["a", "b", "c"]);
  });

  it("returns the text whole without separators", () => {
    expect(splitBySeparators("a,b", [])).toEqual(["a,b"]);
  });
});
