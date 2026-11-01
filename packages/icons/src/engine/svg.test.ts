// @vitest-environment node
import { Buffer } from "node:buffer";
import { describe, expect, it } from "vitest";
import { defineIcon } from "./define";
import { searchIcon } from "./icons";
import { toSvg, toSvgBase64DataUri, utf8ToBase64 } from "./svg";

const decode = (uri: string) =>
  Buffer.from(uri.slice(uri.indexOf(",") + 1), "base64").toString("utf8");

describe("utf8ToBase64", () => {
  it.each([
    "",
    "a",
    "ab",
    "abc",
    "abcd",
    '<svg stroke="#000"/>',
    "搜索 – recherche – 検索",
    "emoji 🔍 and ü",
  ])("matches Node's base64 of the UTF-8 bytes: %j", (text) => {
    expect(utf8ToBase64(text)).toBe(
      Buffer.from(text, "utf8").toString("base64"),
    );
  });
});

describe("toSvgBase64DataUri", () => {
  it("is the SVG string as a base64 data URI", () => {
    const uri = toSvgBase64DataUri(searchIcon, { size: 32, color: "#e11d48" });
    expect(uri.startsWith("data:image/svg+xml;base64,")).toBe(true);
    expect(decode(uri)).toBe(toSvg(searchIcon, { size: 32, color: "#e11d48" }));
  });

  it("uses an explicit color (an image has no currentColor)", () => {
    expect(decode(toSvgBase64DataUri(searchIcon))).toContain('stroke="#000"');
    expect(decode(toSvgBase64DataUri(searchIcon))).not.toContain(
      "currentColor",
    );
  });

  it("keeps the per-path colors and non-ASCII titles", () => {
    const icon = defineIcon({
      name: "two-tone",
      paths: ["M4 12h16", "M12 4v16"],
      colors: [undefined, "#16a34a"],
    });
    const svg = decode(toSvgBase64DataUri(icon, { title: "搜索" }));
    expect(svg).toContain('<path d="M12 4v16" stroke="#16a34a"/>');
    expect(svg).toContain("<title>搜索</title>");
  });
});
