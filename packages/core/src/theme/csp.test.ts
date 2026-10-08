// @vitest-environment node
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { THEME_INIT_SCRIPT, createThemeInitScript } from "./theme-utils";
import { THEME_INIT_SCRIPT_HASH, cspHash } from "./csp";

const reference = (text: string) =>
  `'sha256-${createHash("sha256").update(text, "utf8").digest("base64")}'`;

describe("cspHash", () => {
  it.each([
    "",
    "a",
    "abc",
    "x".repeat(55),
    "x".repeat(56),
    "x".repeat(64),
    "x".repeat(1000),
    "é — 日本語 😀",
    THEME_INIT_SCRIPT,
    createThemeInitScript({ defaultTheme: "dark", defaultPalette: "tech" }),
  ])("matches node:crypto for %#", (text) => {
    expect(cspHash(text)).toBe(reference(text));
  });

  it("exports the hash of the default init script", () => {
    expect(THEME_INIT_SCRIPT_HASH).toBe(reference(THEME_INIT_SCRIPT));
    expect(THEME_INIT_SCRIPT_HASH).toMatch(/^'sha256-[A-Za-z0-9+/]{43}='$/);
  });
});
