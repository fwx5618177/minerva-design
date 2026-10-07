// Checks the published artifacts the way a consumer sees them: through the
// package "exports" map, as ESM and CJS, in Node (no DOM).
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const dist = (file: string) => join(root, file);
// Resolve "@minerva/lib-core" through its own exports map (self-reference)
const require = createRequire(join(root, "package.json"));

/** Components / APIs a consumer must be able to import */
const EXPECTED_EXPORTS = [
  "Alert",
  "AutoComplete",
  "Avatar",
  "AvatarGroup",
  "Badge",
  "Button",
  "Card",
  "Cascader",
  "Checkbox",
  "ConfigProvider",
  "Divider",
  "Empty",
  "IconButton",
  "Input",
  "Pagination",
  "Popover",
  "PopoverContent",
  "PopoverTrigger",
  "Menu",
  "Select",
  "Modal",
  "Tabs",
  "ProgressIndicator",
  "Radio",
  "RadioGroup",
  "Skeleton",
  "Switch",
  "Tag",
  "TimePicker",
  "Tooltip",
  "VirtualList",
  "applyThemeStyles",
  "themes",
  "useAutoTheme",
  "useConfig",
  "useLocale",
];

type ConditionalExport = { types: string; import: string; require: string };
const conditional = (key: string) => pkg.exports[key] as ConditionalExport;

/** Sub-entries and whether they are client modules ("use client" banner) */
const ENTRIES: Record<string, boolean> = {
  ".": true,
  "./monaco": true,
  "./theme-utils": false,
};

describe("@minerva/lib-core dist", () => {
  it("ships every file referenced by package.json", () => {
    const files = [pkg.main, pkg.module, pkg.types];
    for (const value of Object.values(pkg.exports) as Array<
      string | ConditionalExport
    >) {
      if (typeof value === "string") files.push(value);
      else files.push(value.types, value.import, value.require);
    }
    for (const file of files) {
      expect(existsSync(dist(file)), file).toBe(true);
    }
    expect(Object.keys(pkg.exports).sort()).toEqual(
      [
        ...Object.keys(ENTRIES),
        "./style.css",
        "./prose.scss",
        "./package.json",
      ].sort(),
    );
  });

  it.each(Object.entries(ENTRIES))(
    '%s: "use client" banner only on client entries',
    (key, client) => {
      const { import: esm, require: cjs } = conditional(key);
      for (const file of [esm, cjs]) {
        const code = readFileSync(dist(file), "utf8");
        expect(code.startsWith('"use client";'), file).toBe(client);
        if (!client) expect(code).not.toContain('"use client"');
      }
    },
  );

  it("keeps the server-safe theme-utils entry free of React", () => {
    const key = "./theme-utils";
    for (const file of [conditional(key).import, conditional(key).require]) {
      const code = readFileSync(dist(file), "utf8");
      expect(code, file).not.toMatch(/from "react"|require\("react"\)/);
    }
  });

  it("exposes the theme-utils API from ESM and CJS, usable on the server", async () => {
    const esm = await import(
      pathToFileURL(dist(conditional("./theme-utils").import)).href
    );
    const cjs = require("@minerva/lib-core/theme-utils");
    for (const mod of [esm, cjs]) {
      for (const name of [
        "THEME_INIT_SCRIPT",
        "createThemeInitScript",
        "parseThemeCookie",
        "parsePaletteCookie",
        "parseThemeCookies",
        "readCookieValue",
        "serializeThemeCookie",
        "PALETTES",
        "THEME_COOKIE_NAME",
        "PALETTE_COOKIE_NAME",
        "THEME_COOKIE_MAX_AGE",
      ]) {
        expect(mod[name], name).toBeDefined();
      }
      expect(mod.parseThemeCookies("theme=dark; palette=tech")).toEqual({
        theme: "dark",
        palette: "tech",
      });
    }
  });

  it("ships the stylesheet and the prose Sass adapter", () => {
    const style = readFileSync(dist(pkg.exports["./style.css"]), "utf8");
    expect(style).toMatch(/\[data-palette=("?)editorial\1\]/);
    expect(style).toContain("--space-4:");
    // every design token of @minerva/core/tokens.css is bundled
    const tokens = readFileSync(
      require.resolve("@minerva/core/tokens.css"),
      "utf8",
    );
    const names = new Set(tokens.match(/--[\w-]+(?=:)/g));
    expect(names.size).toBeGreaterThan(100);
    for (const name of names) expect(style, name).toContain(`${name}:`);
    const prose = readFileSync(dist(pkg.exports["./prose.scss"]), "utf8");
    expect(prose).toMatch(/@mixin/);
  });

  it("resolves the same named exports from ESM and CJS", async () => {
    const esmPath = require
      .resolve("@minerva/lib-core")
      .replace(/index\.cjs$/, "index.js");
    const esm = await import(pathToFileURL(esmPath).href);
    const cjs = require("@minerva/lib-core");
    for (const name of EXPECTED_EXPORTS) {
      expect(esm[name], `ESM export ${name}`).toBeDefined();
      expect(cjs[name], `CJS export ${name}`).toBeDefined();
    }
    expect(Object.keys(esm).sort()).toEqual(
      Object.keys(cjs)
        .filter((key) => key !== "default")
        .sort(),
    );
  });

  it("keeps react, react-dom and dependencies external", () => {
    // the entry plus the shared chunks it imports
    const code = readdirSync(dist("dist"))
      .filter((file) => file.endsWith(".js"))
      .map((file) => readFileSync(dist(`dist/${file}`), "utf8"))
      .join("\n");
    expect(code).toMatch(/from "react"/);
    expect(code).not.toMatch(/react\.production|react-dom\.production/);
    // @minerva/core (primitives, theming) is a dependency, never inlined
    expect(code).toMatch(/from "@minerva\/core"/);
    expect(code).not.toMatch(/function createThemeInitScript/);
    // ...but its design tokens are bundled into style.css, not imported
    expect(code).not.toMatch(/tokens\.css/);
  });

  it("can be imported and server-rendered without a DOM", async () => {
    const lib = require("@minerva/lib-core");
    const html = renderToString(
      createElement(
        lib.ConfigProvider,
        { theme: "light" },
        createElement(lib.Button, null, "Hello"),
        createElement(lib.Tooltip, { content: "Tip" }, "Hover me"),
        createElement(
          lib.Popover,
          { defaultOpen: true },
          createElement(lib.PopoverTrigger, null, "Open"),
          createElement(lib.PopoverContent, null, "pop"),
        ),
      ),
    );
    expect(html).toContain("Hello");
    expect(html).toContain("Hover me");
    // Portalled content is client-only: the trigger renders on the server
    expect(html).toContain("Open");
  });

  it("exposes the Monaco editor from the monaco entry (ESM + CJS)", async () => {
    const esm = await import(
      pathToFileURL(dist(conditional("./monaco").import)).href
    );
    expect(esm.MonacoCodeEditor).toBeDefined();
    expect(require("@minerva/lib-core/monaco").MonacoCodeEditor).toBeDefined();
  });
});
