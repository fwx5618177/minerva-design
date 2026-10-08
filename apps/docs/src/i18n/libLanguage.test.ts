import { describe, expect, it } from "vitest";
import { toLibLanguage } from "./libLanguage";

describe("toLibLanguage", () => {
  it("passes every site language through to React (ja included)", () => {
    // the site languages (see ./config.ts)
    for (const language of ["en", "zh", "ja", "fr"]) {
      expect(toLibLanguage(language)).toBe(language);
    }
  });

  it("maps regional variants and unknown languages", () => {
    expect(toLibLanguage("ja-JP")).toBe("ja");
    expect(toLibLanguage("de")).toBe("en");
  });
});
