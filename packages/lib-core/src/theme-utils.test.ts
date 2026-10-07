// Ported from @novel-isr/ui src/components/__test__/theme-utils.test.ts and
// extended for Minerva's optional palette. These helpers are shared by the
// server (cookie parsing, inline script) and the client (ThemeProvider), so
// any drift causes hydration mismatches or a flash of the wrong theme.
import { afterEach, describe, expect, it } from "vitest";
import {
  PALETTES,
  PALETTE_COOKIE_NAME,
  THEME_COOKIE_MAX_AGE,
  THEME_COOKIE_NAME,
  THEME_INIT_SCRIPT,
  createThemeInitScript,
  isPalette,
  isThemeMode,
  parsePaletteCookie,
  parseThemeCookie,
  parseThemeCookies,
  readCookieValue,
  serializeThemeCookie,
} from "./theme-utils";

describe("parseThemeCookie", () => {
  it("returns valid values as-is", () => {
    expect(parseThemeCookie("light")).toBe("light");
    expect(parseThemeCookie("dark")).toBe("dark");
    expect(parseThemeCookie("system")).toBe("system");
  });

  it("falls back to system for undefined", () => {
    expect(parseThemeCookie(undefined)).toBe("system");
    expect(parseThemeCookie(null)).toBe("system");
  });

  it("falls back to system for invalid / damaged values", () => {
    expect(parseThemeCookie("")).toBe("system");
    expect(parseThemeCookie("LIGHT")).toBe("system");
    expect(parseThemeCookie("auto")).toBe("system");
    expect(parseThemeCookie("null")).toBe("system");
  });

  it("honours a custom fallback", () => {
    expect(parseThemeCookie("nope", "dark")).toBe("dark");
  });
});

describe("parsePaletteCookie", () => {
  it("returns valid values as-is", () => {
    for (const palette of PALETTES) {
      expect(parsePaletteCookie(palette)).toBe(palette);
    }
  });

  it("falls back to null (Minerva's default look) by default", () => {
    expect(parsePaletteCookie(undefined)).toBeNull();
    expect(parsePaletteCookie("")).toBeNull();
    expect(parsePaletteCookie("EDITORIAL")).toBeNull();
    expect(parsePaletteCookie("classic")).toBeNull();
  });

  it("honours a palette fallback", () => {
    expect(parsePaletteCookie("classic", "editorial")).toBe("editorial");
  });
});

describe("guards", () => {
  it("isThemeMode / isPalette", () => {
    expect(isThemeMode("system")).toBe(true);
    expect(isThemeMode("auto")).toBe(false);
    expect(isPalette("cool")).toBe(true);
    expect(isPalette(1)).toBe(false);
  });
});

describe("cookie helpers", () => {
  it("reads a cookie from a Cookie header", () => {
    const header = "a=1; theme=dark;palette=tech; other=x%20y";
    expect(readCookieValue(header, "theme")).toBe("dark");
    expect(readCookieValue(header, "palette")).toBe("tech");
    expect(readCookieValue(header, "other")).toBe("x y");
    expect(readCookieValue(header, "missing")).toBeUndefined();
    expect(readCookieValue(undefined, "theme")).toBeUndefined();
    expect(readCookieValue("broken; theme=%E0%A4%A", "theme")).toBe("%E0%A4%A");
  });

  it("parses both theme cookies with defaults", () => {
    expect(parseThemeCookies("theme=light; palette=cool")).toEqual({
      theme: "light",
      palette: "cool",
    });
    expect(parseThemeCookies("")).toEqual({ theme: "system", palette: null });
    expect(
      parseThemeCookies("theme=bad; palette=bad", {
        theme: "dark",
        palette: "graphite",
      }),
    ).toEqual({ theme: "dark", palette: "graphite" });
  });

  it("serializes a one-year, site-wide, Lax cookie", () => {
    expect(serializeThemeCookie("theme", "dark")).toBe(
      `theme=dark; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`,
    );
  });

  it("uses fixed cookie names and a one-year lifetime", () => {
    expect(THEME_COOKIE_NAME).toBe("theme");
    expect(PALETTE_COOKIE_NAME).toBe("palette");
    expect(THEME_COOKIE_MAX_AGE).toBe(60 * 60 * 24 * 365);
  });
});

interface StubDom {
  dataset: Record<string, string | undefined>;
  style: { colorScheme?: string };
}

const realDocument = globalThis.document;
const realWindow = globalThis.window;

afterEach(() => {
  Object.assign(globalThis, { document: realDocument, window: realWindow });
});

/** Run the inline script against a minimal document / window stub */
function runScript(
  script: string,
  opts: {
    cookie: string;
    prefersDark?: boolean;
    initialPalette?: string;
    noMatchMedia?: boolean;
  },
): StubDom {
  const dataset: Record<string, string | undefined> = opts.initialPalette
    ? { palette: opts.initialPalette }
    : {};
  const style: { colorScheme?: string } = {};
  Object.assign(globalThis, {
    document: { cookie: opts.cookie, documentElement: { dataset, style } },
    window: opts.noMatchMedia
      ? {}
      : {
          matchMedia: (q: string) => ({
            matches: q.includes("dark") && opts.prefersDark === true,
          }),
        },
  });
  new Function(script)();
  return { dataset, style };
}

describe("THEME_INIT_SCRIPT", () => {
  it("references both cookie names", () => {
    expect(THEME_INIT_SCRIPT).toContain(`${THEME_COOKIE_NAME}=`);
    expect(THEME_INIT_SCRIPT).toContain(`${PALETTE_COOKIE_NAME}=`);
  });

  it("falls back to prefers-color-scheme for system", () => {
    expect(THEME_INIT_SCRIPT).toContain("prefers-color-scheme: dark");
  });

  it("whitelists every mode and palette", () => {
    for (const value of ["light", "dark", "system", ...PALETTES]) {
      expect(THEME_INIT_SCRIPT).toContain(`'${value}'`);
    }
  });

  it("is wrapped in try / catch (cookies or matchMedia may be blocked)", () => {
    expect(THEME_INIT_SCRIPT).toMatch(/try\s*\{/);
    expect(THEME_INIT_SCRIPT).toMatch(/catch\s*\(/);
  });

  it("cookie light + tech -> data-theme=light, data-palette=tech", () => {
    const dom = runScript(THEME_INIT_SCRIPT, {
      cookie: "theme=light; palette=tech",
    });
    expect(dom.dataset.theme).toBe("light");
    expect(dom.dataset.palette).toBe("tech");
    expect(dom.style.colorScheme).toBe("light");
  });

  it("cookie dark + graphite -> graphite dark on first paint", () => {
    const dom = runScript(THEME_INIT_SCRIPT, {
      cookie: "theme=dark; palette=graphite",
    });
    expect(dom.dataset.theme).toBe("dark");
    expect(dom.dataset.palette).toBe("graphite");
    expect(dom.style.colorScheme).toBe("dark");
  });

  it("cookie system + dark OS -> dark; no palette cookie -> no palette", () => {
    const dom = runScript(THEME_INIT_SCRIPT, {
      cookie: "theme=system",
      prefersDark: true,
    });
    expect(dom.dataset.theme).toBe("dark");
    expect(dom.dataset.palette).toBeUndefined();
  });

  it("no cookies + light OS -> light, no palette", () => {
    const dom = runScript(THEME_INIT_SCRIPT, { cookie: "" });
    expect(dom.dataset.theme).toBe("light");
    expect(dom.dataset.palette).toBeUndefined();
  });

  it("keeps a valid data-palette rendered by the server when the cookie is missing", () => {
    const dom = runScript(THEME_INIT_SCRIPT, {
      cookie: "",
      prefersDark: true,
      initialPalette: "graphite",
    });
    expect(dom.dataset.theme).toBe("dark");
    expect(dom.dataset.palette).toBe("graphite");
  });

  it("drops an invalid palette cookie and an invalid server palette", () => {
    const dom = runScript(THEME_INIT_SCRIPT, {
      cookie: "theme=light; palette=classic",
      initialPalette: "bogus",
    });
    expect(dom.dataset.palette).toBeUndefined();
  });

  it("treats an invalid theme cookie as system and survives a missing matchMedia", () => {
    const dom = runScript(THEME_INIT_SCRIPT, {
      cookie: "theme=bogus",
      noMatchMedia: true,
    });
    expect(dom.dataset.theme).toBe("light");
  });
});

describe("createThemeInitScript", () => {
  it("applies a default palette and mode", () => {
    const script = createThemeInitScript({
      defaultTheme: "dark",
      defaultPalette: "editorial",
    });
    const dom = runScript(script, { cookie: "" });
    expect(dom.dataset.theme).toBe("dark");
    expect(dom.dataset.palette).toBe("editorial");
    const invalid = runScript(script, { cookie: "palette=classic" });
    expect(invalid.dataset.palette).toBe("editorial");
  });

  it("ignores invalid options", () => {
    const script = createThemeInitScript({
      defaultTheme: "nope" as never,
      defaultPalette: "nope" as never,
    });
    const dom = runScript(script, { cookie: "", prefersDark: true });
    expect(dom.dataset.theme).toBe("dark");
    expect(dom.dataset.palette).toBeUndefined();
  });

  it("is deterministic (same string on server and client)", () => {
    expect(createThemeInitScript()).toBe(THEME_INIT_SCRIPT);
  });
});
