import { describe, expect, it } from "vitest";
import { isSafeUrl, linkRel, sanitizeUrl } from "./url";

describe("isSafeUrl / sanitizeUrl", () => {
  it.each([
    "https://example.com",
    "http://example.com/a?b=c#d",
    "/docs/button",
    "docs/button",
    "./a",
    "../a",
    "#section",
    "?q=1",
    "",
    "mailto:a@example.com",
    "tel:+33123456789",
    "blob:https://example.com/uuid",
    "data:text/csv;charset=utf-8,a,b",
    "myapp://open",
    // a colon after a path / query is not a scheme
    "/a:b",
    "?redirect=javascript:alert(1)",
  ])("allows %j", (url) => {
    expect(isSafeUrl(url)).toBe(true);
    expect(sanitizeUrl(url)).toBe(url);
  });

  it.each([
    "javascript:alert(1)",
    "JavaScript:alert(1)",
    "JAVASCRIPT:alert(1)",
    " javascript:alert(1)",
    "\u0000javascript:alert(1)",
    "java\tscript:alert(1)",
    "java\nscript:alert(1)",
    "javascript\r:alert(1)",
    "vbscript:msgbox(1)",
  ])("blocks %j", (url) => {
    expect(isSafeUrl(url)).toBe(false);
    expect(sanitizeUrl(url)).toBeUndefined();
  });

  it("passes null / undefined through as undefined", () => {
    expect(sanitizeUrl(undefined)).toBeUndefined();
    expect(sanitizeUrl(null)).toBeUndefined();
  });
});

describe("linkRel", () => {
  it("keeps an explicit rel", () => {
    expect(linkRel("_blank", "author")).toBe("author");
    expect(linkRel("_blank", "")).toBe("");
    expect(linkRel(undefined, "next")).toBe("next");
  });

  it("adds noopener noreferrer for a new browsing context", () => {
    expect(linkRel("_blank", undefined)).toBe("noopener noreferrer");
    expect(linkRel("_BLANK", null)).toBe("noopener noreferrer");
  });

  it("adds nothing otherwise", () => {
    expect(linkRel(undefined, undefined)).toBeUndefined();
    expect(linkRel("_self", undefined)).toBeUndefined();
    expect(linkRel("frame", null)).toBeUndefined();
  });
});
