// The React entries of minerva-design (dist/react/), checked the way a
// consumer sees them: through the package "exports" map, as ESM and CJS, in
// Node (no DOM).
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const dist = (file: string) => join(root, file);
// Resolve "minerva-design" through its own exports map (self-reference)
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

type Target = { types: string; default: string };
type ConditionalExport = { import: Target; require: Target };
/** ESM / CJS files and their declarations of an exports-map entry */
const conditional = (key: string) => {
  const entry = pkg.exports[key] as ConditionalExport;
  return {
    import: entry.import.default,
    require: entry.require.default,
    types: entry.import.types,
    requireTypes: entry.require.types,
  };
};
const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );
const distFiles = walk(dist("dist/react"));

/** Sub-entries and whether they are client modules ("use client" banner) */
const ENTRIES: Record<string, boolean> = {
  ".": true,
  "./monaco": true,
  "./theme-utils": false,
  "./utils": false,
};

/**
 * Splits a stylesheet into the content of its top-level
 * `@layer minerva { ... }` blocks and the CSS outside of them.
 */
function layers(css: string): { inside: string; outside: string } {
  const open = "@layer minerva {";
  let inside = "";
  let outside = "";
  let i = 0;
  while (i < css.length) {
    if (!css.startsWith(open, i)) {
      outside += css[i++];
      continue;
    }
    let depth = 0;
    let j = i + open.length - 1;
    for (; j < css.length; j++) {
      if (css[j] === "{") depth++;
      else if (css[j] === "}" && --depth === 0) break;
    }
    inside += `${css.slice(i + open.length, j).trim()}\n`;
    i = j + 1;
  }
  return { inside, outside };
}
const outsideLayers = (css: string) => layers(css).outside;
const unlayer = (css: string) => layers(css).inside;

describe("minerva-design React entries (dist/react)", () => {
  it("ships every file of the React entries", () => {
    const files = [pkg.main, pkg.module, pkg.types];
    for (const key of Object.keys(ENTRIES)) {
      const {
        import: esm,
        require: cjs,
        types,
        requireTypes,
      } = conditional(key);
      files.push(esm, cjs, types, requireTypes);
      // each condition has its own declarations (.d.ts for ESM, .d.cts for CJS)
      expect(types).toMatch(/^\.\/dist\/react\/.*\.d\.ts$/);
      expect(requireTypes).toMatch(/^\.\/dist\/react\/.*\.d\.cts$/);
    }
    for (const key of ["./style.css", "./prose.scss"]) {
      files.push(pkg.exports[key]);
    }
    for (const file of files) {
      expect(existsSync(dist(file)), file).toBe(true);
    }
    expect(pkg.exports["./styles/*.css"]).toBe("./dist/react/styles/*.css");
    // node10 resolution of the sub-entries' types
    for (const key of Object.keys(ENTRIES).filter((k) => k !== ".")) {
      const name = key.slice(2);
      expect(pkg.typesVersions["*"][name]).toEqual([conditional(key).types]);
    }
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

  it('marks every client module "use client" (deep imports stay client modules)', () => {
    const modules = distFiles.filter(
      (file) =>
        /\.(c?js)$/.test(file) &&
        !/[\\/](theme-utils|utils-entry)\.c?js$/.test(file),
    );
    expect(modules.length).toBeGreaterThan(100);
    for (const file of modules) {
      expect(readFileSync(file, "utf8").startsWith('"use client";'), file).toBe(
        true,
      );
    }
  });

  it("relative imports of the declarations resolve (.d.ts -> .js, .d.cts -> .cjs)", () => {
    const declarations = distFiles.filter((f) => /\.d\.c?ts$/.test(f));
    expect(declarations.length).toBeGreaterThan(100);
    const specifier = /(?:from\s*|import\s*\(\s*|import\s+)["'](\.[^"']*)["']/g;
    for (const file of declarations) {
      const cjs = file.endsWith(".d.cts");
      for (const [, path] of readFileSync(file, "utf8").matchAll(specifier)) {
        expect(path, file).toMatch(cjs ? /\.cjs$/ : /\.js$/);
        const target = join(dirname(file), path).replace(
          /\.c?js$/,
          cjs ? ".d.cts" : ".d.ts",
        );
        expect(existsSync(target), `${file} -> ${path}`).toBe(true);
      }
    }
  });

  it.each(["./theme-utils", "./utils"])(
    "keeps the server-safe %s entry free of React and of client modules",
    (key) => {
      for (const file of [conditional(key).import, conditional(key).require]) {
        const code = readFileSync(dist(file), "utf8");
        expect(code, file).not.toMatch(/from "react"|require\("react"\)/);
      }
    },
  );

  it("ships the styling hooks manifest (ESM + CJS)", async () => {
    const entry = require.resolve("minerva-design/styling-hooks");
    const cjs = require("minerva-design/styling-hooks");
    const esm = await import(
      pathToFileURL(entry.replace(/\.cjs$/, ".js")).href
    );
    for (const mod of [esm, cjs]) {
      expect(mod.stylingHooks.button.wc).toBe("minerva-button");
      expect(mod.reactSelector("button", "label")).toBe(
        '[data-minerva="button"][data-part="label"]',
      );
    }
    // the manifest is data for tooling: the components never import it
    const helper = readFileSync(
      dist("dist/react/internal/stylingHooks.js"),
      "utf8",
    );
    expect(helper).not.toContain("styling-hooks");
    expect(helper).toContain('"data-minerva"');
  });

  it("exposes the theme-utils API from ESM and CJS, usable on the server", async () => {
    const esm = await import(
      pathToFileURL(dist(conditional("./theme-utils").import)).href
    );
    const cjs = require("minerva-design/theme-utils");
    for (const mod of [esm, cjs]) {
      for (const name of [
        "THEME_INIT_SCRIPT",
        "THEME_INIT_SCRIPT_HASH",
        "cspHash",
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
        "designAttributes",
        "resolveDesign",
        "designPresets",
        "DESIGN_PRESETS",
      ]) {
        expect(mod[name], name).toBeDefined();
      }
      expect(mod.designAttributes({ preset: "editorial" })).toMatchObject({
        "data-density": "comfortable",
      });
      expect(mod.THEME_INIT_SCRIPT_HASH).toBe(
        mod.cspHash(mod.THEME_INIT_SCRIPT),
      );
      expect(mod.parseThemeCookies("theme=dark; palette=tech")).toEqual({
        theme: "dark",
        palette: "tech",
      });
    }
  });

  // React Server Components: a module without "use client" that only imports
  // the shared core (dist/core, dist/dom), so functions are callable and data objects populated
  // (through the "use client" main entry they would be client references).
  it("exposes the non-component utilities from ESM and CJS, usable on the server", async () => {
    const esm = await import(
      pathToFileURL(dist(conditional("./utils").import)).href
    );
    const cjs = require("minerva-design/utils");
    for (const file of [
      conditional("./utils").import,
      conditional("./utils").require,
    ]) {
      const code = readFileSync(dist(file), "utf8");
      // Shared core and the SSR-safe sanitizer: no client component imports.
      const specifiers = Array.from(
        code.matchAll(/(?:from\s*|require\()["']([^"']+)["']/g),
        (m) => m[1],
      );
      expect(
        specifiers.filter(
          (s) =>
            !/^\.\.\/(core|dom)\/index\.c?js$/.test(s) &&
            !/^\.\/components\/HtmlPreview\/previewDocument\.c?js$/.test(s),
        ),
        file,
      ).toEqual([]);
    }
    for (const mod of [esm, cjs]) {
      const document = mod.previewDocument(
        '<script>unsafe()</script><a href="https://example.com">Leave</a>',
      );
      expect(document).toContain("script-src 'none'");
      expect(document).toContain("<body></body>");
      expect(document).not.toContain("unsafe()");
      expect(mod.cn("a", false, { b: true }, ["c"])).toBe("a b c");
      for (const data of [
        mod.themes,
        mod.light,
        mod.dark,
        mod.githubDark,
        mod.palettes,
      ]) {
        expect(Object.keys(data).length).toBeGreaterThan(0);
      }
      expect(mod.themes.light).toBe(mod.light);
      expect(typeof mod.generateCSSVariables).toBe("function");
      expect(mod.resolveTheme("dark", "light")).toBeDefined();
      expect(typeof mod.isBilingualTheme).toBe("function");
      expect(typeof mod.getSystemTheme).toBe("function");
      expect(typeof mod.applyThemeStyles).toBe("function");
      expect(mod.normalizeShortcuts("mod+k")).toHaveLength(1);
      expect(
        mod.matchesShortcut(
          {
            key: "k",
            ctrlKey: true,
            metaKey: false,
            altKey: false,
            shiftKey: false,
          },
          "ctrl+k",
        ),
      ).toBe(true);
      expect(
        mod.computeFixedColumnLayout([
          { key: "a", fixed: "left", width: 100 },
          { key: "b", fixed: "left", width: 50 },
        ]).leftOffsets.b,
      ).toBe(100);
    }
  });

  it("ships the stylesheet and the prose Sass adapter", () => {
    const style = readFileSync(dist(pkg.exports["./style.css"]), "utf8");
    expect(style).toMatch(/\[data-palette=("?)editorial\1\]/);
    expect(style).toContain("--space-4:");
    // every design token of minerva-design/tokens.css is bundled
    const tokens = readFileSync(
      require.resolve("minerva-design/tokens.css"),
      "utf8",
    );
    const names = new Set(tokens.match(/--[\w-]+(?=:)/g));
    expect(names.size).toBeGreaterThan(100);
    for (const name of names) expect(style, name).toContain(`${name}:`);
    const prose = readFileSync(dist(pkg.exports["./prose.scss"]), "utf8");
    expect(prose).toMatch(/@mixin/);
    // design axes and accessibility preferences ship with the tokens
    for (const [name, value] of [
      ["density", "compact"],
      ["radius", "none"],
      ["shadow", "subtle"],
      ["font-scale", "large"],
    ]) {
      expect(style).toMatch(new RegExp(`\\[data-${name}=("?)${value}\\1\\]`));
    }
    expect(style).toContain("prefers-reduced-motion");
    expect(style).toContain("forced-colors");
  });

  it("ships per-component stylesheets and the tokens alone", () => {
    const style = readFileSync(dist("dist/react/style.css"), "utf8");
    const tokens = readFileSync(dist("dist/react/styles/tokens.css"), "utf8");
    expect(style.startsWith(tokens.trim())).toBe(true);
    const sheets = readdirSync(dist("dist/react/styles")).filter(
      (f) => f !== "tokens.css",
    );
    // one per styled component folder
    const folders = readdirSync(join(root, "../react/src/components"), {
      withFileTypes: true,
    }).filter(
      (d) =>
        d.isDirectory() &&
        readdirSync(join(root, "../react/src/components", d.name)).some((f) =>
          f.endsWith(".module.scss"),
        ),
    );
    expect(sheets.length).toBeGreaterThanOrEqual(folders.length);
    expect(sheets).toContain("button.css");
    for (const sheet of sheets) {
      const css = readFileSync(dist(`dist/react/styles/${sheet}`), "utf8");
      // no design tokens (import styles/tokens.css once)
      expect(css, sheet).not.toContain("--space-4:");
      // every rule of a component sheet is part of style.css
      expect(css.length, sheet).toBeLessThan(style.length);
    }
    // a component sheet includes the styles of the components it renders
    const confirm = readFileSync(dist("dist/react/styles/confirm.css"), "utf8");
    const button = readFileSync(dist("dist/react/styles/button.css"), "utf8");
    expect(unlayer(confirm)).toContain(unlayer(button).slice(0, 200));
    // resolvable through the exports map
    expect(require.resolve("minerva-design/styles/button.css")).toBe(
      dist("dist/react/styles/button.css"),
    );
  });

  it("ships every stylesheet inside @layer minerva (unlayered app CSS wins)", () => {
    const files = [
      "dist/react/style.css",
      ...readdirSync(dist("dist/react/styles")).map(
        (f) => `dist/react/styles/${f}`,
      ),
    ];
    for (const file of files) {
      const css = readFileSync(dist(file), "utf8");
      // nothing outside the layer blocks (no unlayered rule, no @import)
      expect(outsideLayers(css).trim(), file).toBe("");
      expect(css, file).toMatch(/^@layer minerva \{/);
    }
    // the design tokens (dist/core/tokens.css) are layered at the source
    const tokens = readFileSync(
      require.resolve("minerva-design/tokens.css"),
      "utf8",
    );
    expect(outsideLayers(tokens).trim()).toBe("");
  });

  it("every documented CSS variable (// @css-var) is used by the compiled CSS", () => {
    const style = readFileSync(dist("dist/react/style.css"), "utf8");
    const pattern = /^\s*\/\/\s*@css-var\s+(--[\w-]+)\s/gm;
    const documented = walk(join(root, "../react/src/components"))
      .filter((file) => file.endsWith(".scss"))
      .flatMap((file) =>
        [...readFileSync(file, "utf8").matchAll(pattern)].map((m) => m[1]),
      );
    expect(documented.length).toBeGreaterThan(50);
    const unused = documented.filter((name) => !style.includes(`var(${name}`));
    expect(unused).toEqual([]);
  });

  it("resolves the same named exports from ESM and CJS", async () => {
    const esmPath = require
      .resolve("minerva-design")
      .replace(/index\.cjs$/, "index.js");
    const esm = await import(pathToFileURL(esmPath).href);
    const cjs = require("minerva-design");
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
    // every ESM module of the package
    const code = distFiles
      .filter((file) => file.endsWith(".js"))
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");
    expect(code).toMatch(/from "react"/);
    expect(code).not.toMatch(/react\.production|react-dom\.production/);
    // the core (primitives, theming) is imported from the shared copy in
    // dist/core, never inlined
    expect(code).toMatch(/from "(\.\.\/)+core\/index\.js"/);
    expect(code).not.toMatch(/function createThemeInitScript/);
    // ...but its design tokens are bundled into style.css, not imported
    expect(code).not.toMatch(/tokens\.css/);
    // no third-party runtime besides dompurify, jsonc-parser (and the
    // optional Monaco peer of the monaco entry); never lit
    const bare = new Set(
      [...code.matchAll(/from "([^".][^"]*)"/g)].map((m) =>
        m[1].startsWith("@")
          ? m[1].split("/").slice(0, 2).join("/")
          : m[1].split("/")[0],
      ),
    );
    expect([...bare].sort()).toEqual(
      [
        "@monaco-editor/react",
        "dompurify",
        "jsonc-parser",
        "react",
        "react-dom",
      ]
        .filter((name) => bare.has(name))
        .sort(),
    );
    expect(bare.has("lit")).toBe(false);
    for (const name of bare) {
      expect(
        name in pkg.dependencies || name in pkg.peerDependencies,
        name,
      ).toBe(true);
    }
  });

  it("tree-shakes: importing one component does not pull the others", async () => {
    const { rolldown } = await import("rolldown");
    const sizeOf = async (code: string) => {
      const bundle = await rolldown({
        input: "entry",
        cwd: root,
        platform: "browser",
        logLevel: "silent",
        external: (id) => /^(react|react-dom)(\/|$)/.test(id),
        plugins: [
          {
            name: "virtual-entry",
            resolveId: (id) => (id === "entry" ? "\0entry" : null),
            load: (id) => (id === "\0entry" ? code : null),
          },
        ],
      });
      const { output } = await bundle.generate({ format: "esm", minify: true });
      await bundle.close();
      const chunk = output[0];
      return { size: chunk.code.length, modules: Object.keys(chunk.modules) };
    };
    const button = await sizeOf(
      'import { Button } from "minerva-design"; console.log(Button);',
    );
    // Button alone: a few KB, none of the other components
    expect(button.size).toBeLessThan(8_000);
    expect(
      button.modules.filter((id) => /[\\/]components[\\/]/.test(id)),
    ).toEqual(
      button.modules.filter((id) => /[\\/]components[\\/]Button[\\/]/.test(id)),
    );
    const all = await sizeOf(
      'import * as lib from "minerva-design"; console.log(lib);',
    );
    expect(all.size).toBeGreaterThan(button.size * 10);
  });

  it("can be imported and server-rendered without a DOM", async () => {
    const lib = require("minerva-design");
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
    expect(require("minerva-design/monaco").MonacoCodeEditor).toBeDefined();
  });
});
