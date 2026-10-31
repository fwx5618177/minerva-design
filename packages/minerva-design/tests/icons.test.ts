// The icon entries of minerva-design (dist/icons/), checked the way a
// consumer sees them: through the package "exports" map, as ESM and CJS, in
// Node (no DOM, no GPU).
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
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
