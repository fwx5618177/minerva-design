import { describe, expect, it } from "vitest";
import { nativeSupport } from "../../tools/generate-contracts.mjs";

describe("native support metadata follows actual exported and data APIs", () => {
  it("records the implemented GridItem counterpart", () => {
    expect(nativeSupport("GridItem")).toMatchObject({ status: "beta" });
  });
  it.each([
    ["DescriptionItem", "DescriptionList.items"],
    ["MenuItem", "MenuAction"],
    ["MenuCheckboxItem", "MenuCheckboxEntry"],
    ["MenuRadioItem", "MenuRadioGroupEntry"],
    ["MenuGroup", "MenuGroupEntry"],
    ["MenuLabel", "label"],
    ["MenuSeparator", "MenuSeparatorEntry"],
  ])("%s documents its implemented data-based equivalent", (name, api) => {
    expect(nativeSupport(name)).toMatchObject({ status: "n/a" });
    expect(nativeSupport(name).notes).toContain(api);
  });
  it("distinguishes the DOM-only Monaco engine from native CodeEditor", () => {
    expect(nativeSupport("MonacoCodeEditor")).toMatchObject({ status: "n/a" });
    expect(nativeSupport("MonacoCodeEditor").notes).toContain("DOM");
    expect(nativeSupport("MonacoCodeEditor").notes).toContain("CodeEditor");
  });
  it("keeps unimplemented unknown components planned", () => {
    expect(nativeSupport("UnknownComponent")).toEqual({ status: "planned" });
  });
});
