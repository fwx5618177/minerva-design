// The icon entries of minerva-design (dist/icons/, and the Vue and Web
// Components bindings on top of it), checked the way a consumer sees them:
// through the package "exports" map, as ESM and CJS, in Node (no DOM, no GPU).
import {
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { rolldown } from "rolldown";
import { createSSRApp, h } from "vue";
import { renderToString as renderVue } from "vue/server-renderer";
import { describe, expect, it } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const require = createRequire(join(root, "package.json"));

const CORE_FUNCTIONS = [
  "toSvg",
  "toSvgDataUri",
  "iconPathData",
  "drawIcon",
  "defineIcon",
  "getIcon",
  "searchIcons",
  "parseIconPath",
  "flattenIconPath",
  "tessellateIcon",
  "createIconCanvas",
  "createIconSurface",
  "iconRendererCandidates",
  "getDefaultIconRenderer",
  "setDefaultIconRenderer",
  "subscribeDefaultIconRenderer",
];
const COMPONENTS = ["Icon", "IconCanvas", "DynamicIcon", "createIcon"];

describe("minerva-design/icons", () => {
  it("is declared in the exports map with ESM, CJS and both declaration flavours", () => {
    for (const entry of ["./icons", "./icons/core"]) {
      const map = pkg.exports[entry];
      expect(map.import.default, entry).toMatch(/^\.\/dist\/icons\/.+\.js$/);
      expect(map.import.types, entry).toMatch(/\.d\.ts$/);
      expect(map.require.default, entry).toMatch(/\.cjs$/);
      expect(map.require.types, entry).toMatch(/\.d\.cts$/);
    }
  });

  it("exports the components, one per icon, and re-exports the core (ESM and CJS)", async () => {
    const esm = (await import("minerva-design/icons")) as unknown as Record<
      string,
      unknown
    >;
    const cjs = require("minerva-design/icons") as Record<string, unknown>;
    for (const name of [
      ...COMPONENTS,
      ...CORE_FUNCTIONS,
      "SearchIcon",
      "ArrowUpIcon",
      "SettingsIcon",
    ]) {
      expect(typeof esm[name], name).toBe("function");
      expect(typeof cjs[name], name).toBe("function");
    }
    const icons = esm.icons as { name: string }[];
    expect(icons.length).toBeGreaterThanOrEqual(200);
    expect(esm.searchIcon).toMatchObject({ name: "search" });
    expect(cjs.searchIcon).toMatchObject({ name: "search" });
  });

  it("the core entry has no React and no side effects", async () => {
    const core =
      (await import("minerva-design/icons/core")) as unknown as Record<
        string,
        unknown
      >;
    for (const name of CORE_FUNCTIONS) {
      expect(typeof core[name], name).toBe("function");
    }
    expect(core.toSvg).toBeTypeOf("function");
    const code = readFileSync(join(root, "dist/icons/core.js"), "utf8");
    expect(code).not.toContain('"use client"');
    expect(code).not.toMatch(/from\s*["']react/);
    const svg = (core.toSvg as (icon: unknown) => string)(core.searchIcon);
    expect(svg).toContain('viewBox="0 0 24 24"');
  });

  it("server-renders SVG icons and canvas placeholders", async () => {
    const { SearchIcon, Icon, IconCanvas, settingsIcon } =
      await import("minerva-design/icons");
    expect(
      renderToString(createElement(SearchIcon, { title: "Search" })),
    ).toMatch(/^<svg[^>]+role="img"[^>]*><title>Search<\/title><path /);
    expect(
      renderToString(
        createElement(Icon, { icon: settingsIcon, renderer: "webgpu" }),
      ),
    ).toContain("<canvas");
    expect(renderToString(createElement(IconCanvas, { items: [] }))).toContain(
      "minerva-icon-canvas",
    );
  });

  it("keeps the canvas renderers out of SVG-only bundles", () => {
    const icon = readFileSync(join(root, "dist/icons/react/Icon.js"), "utf8");
    expect(icon).not.toMatch(/^import[^;]+surface/m);
    expect(icon).toMatch(/import\(["']\.\.\/engine\/surface\.js["']\)/);
  });
});

/** An app importing `code` (vue external), bundled and minified */
async function bundle(code: string) {
  const dir = mkdtempSync(join(tmpdir(), "minerva-icons-"));
  const input = join(dir, "entry.js");
  writeFileSync(
    input,
    code.replace(
      '"minerva-design/vue/icons"',
      JSON.stringify(join(root, "dist/vue/icons.js")),
    ),
  );
  const build = await rolldown({
    input,
    cwd: root,
    platform: "browser",
    logLevel: "silent",
    external: (id) => /^(vue|@vue)(\/|$)/.test(id),
    transform: { define: { "process.env.NODE_ENV": '"production"' } },
  });
  const { output } = await build.generate({ format: "es", minify: true });
  await build.close();
  rmSync(dir, { recursive: true, force: true });
  const entry = output.find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry,
  ) as { code: string; modules: Record<string, unknown> };
  return { js: entry.code, modules: Object.keys(entry.modules) };
}

describe("minerva-design/vue/icons", () => {
  it("server-renders SVG icons, canvas placeholders and icon canvases", async () => {
    const vue = await import("minerva-design/vue/icons");
    const html = await renderVue(
      createSSRApp({
        render: () => [
          h(vue.SearchIcon, { title: "Search" }),
          h(vue.Icon, { icon: vue.settingsIcon, renderer: "webgpu" }),
          h(vue.DynamicIcon, { name: "arrow-up" }),
          h(vue.IconCanvas, { items: [] }),
        ],
      }),
    );
    expect(html).toMatch(
      /<svg[^>]+role="img"[^>]*><title>Search<\/title><!--\[--><path /,
    );
    expect(html).toContain('<canvas data-icon="settings"');
    expect(html).toContain('data-icon="arrow-up"');
    expect(html).toContain("minerva-icon-canvas");
    for (const name of [...COMPONENTS, ...CORE_FUNCTIONS, "MinervaVueIcons"])
      expect(vue[name as keyof typeof vue], name).toBeDefined();
  });

  it("shares the one copy of the icon core and loads the renderers lazily", () => {
    const code = readFileSync(join(root, "dist/vue/icons.js"), "utf8");
    expect(code).toContain('from "../icons/core.js"');
    expect(code).not.toMatch(/["']minerva-design\/icons/);
    const icon = readFileSync(
      join(root, "dist/vue/icon/Icon.vue_vue_type_script_setup_true_lang.js"),
      "utf8",
    );
    expect(icon).not.toMatch(/^import[^;]+surface/m);
    expect(icon).toMatch(
      /import\(["']\.\.\/\.\.\/icons\/engine\/surface\.js["']\)/,
    );
    const types = readFileSync(join(root, "dist/vue/icons.d.ts"), "utf8");
    expect(types).toContain("from '../icons/core.js'");
  });

  it("bundles one icon for one named component, and no renderer", async () => {
    const { js, modules } = await bundle(
      'import { SearchIcon } from "minerva-design/vue/icons"; console.log(SearchIcon);',
    );
    expect(js).toContain("search");
    expect(js).not.toContain("arrow-up");
    for (const id of modules)
      expect(id).not.toMatch(
        /[\\/](surface|icon-canvas|renderers[\\/]\w+)\.js$/,
      );
  });
});

describe("minerva-design/web-components/icon", () => {
  it("is an optional element entry on the one copy of the icon core", () => {
    expect(pkg.exports["./web-components/icon"]).toEqual({
      types: "./dist/web-components/elements/icon.d.ts",
      default: "./dist/web-components/elements/icon.js",
    });
    const index = readFileSync(
      join(root, "dist/web-components/index.js"),
      "utf8",
    );
    expect(index).not.toMatch(/elements\/icon\.js/);
    const dir = join(root, "dist/web-components");
    let linked = 0;
    for (const entry of readdirSync(dir, {
      withFileTypes: true,
      recursive: true,
    })) {
      if (!entry.isFile() || !/\.(js|d\.ts)$/.test(entry.name)) continue;
      const file = join(entry.parentPath, entry.name);
      const code = readFileSync(file, "utf8");
      expect(code, file).not.toMatch(/["']minerva-design\/icons/);
      for (const [, path] of code.matchAll(
        /["']((?:\.\.\/)+icons\/core\.js)["']/g,
      )) {
        linked++;
        expect(join(dirname(file), path)).toBe(
          join(root, "dist/icons/core.js"),
        );
      }
    }
    expect(linked).toBeGreaterThan(0);
  });
});
