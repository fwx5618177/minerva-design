// The theming implementation (and its unit tests) lives in @minerva/core; this
// checks that lib-core's public entries keep re-exporting it unchanged.
import * as core from "@minerva/core";
import { describe, expect, it } from "vitest";
import * as lib from "./index";
import * as themeUtils from "./theme-utils";

describe("theme re-exports", () => {
  it("theme-utils entry re-exports the server-safe helpers from @minerva/core", () => {
    const names = [
      "PALETTES",
      "PALETTE_COOKIE_NAME",
      "THEME_COOKIE_MAX_AGE",
      "THEME_COOKIE_NAME",
      "THEME_INIT_SCRIPT",
      "createThemeInitScript",
      "isPalette",
      "isThemeMode",
      "parsePaletteCookie",
      "parseThemeCookie",
      "parseThemeCookies",
      "readCookieValue",
      "serializeThemeCookie",
    ] as const;
    expect(Object.keys(themeUtils).sort()).toEqual([...names].sort());
    for (const name of names) expect(themeUtils[name], name).toBe(core[name]);
    expect(themeUtils.parseThemeCookies("theme=dark; palette=tech")).toEqual({
      theme: "dark",
      palette: "tech",
    });
  });

  it("main entry re-exports themes, palettes and theme helpers from @minerva/core", () => {
    for (const name of [
      "themes",
      "light",
      "dark",
      "githubDark",
      "palettes",
      "applyThemeStyles",
      "generateCSSVariables",
      "getSystemTheme",
      "isBilingualTheme",
      "resolveTheme",
    ] as const) {
      expect(lib[name], name).toBe(core[name]);
    }
  });
});
