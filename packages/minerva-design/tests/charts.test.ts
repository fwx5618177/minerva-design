// The chart entries of minerva-design (dist/charts/), checked the way a
// consumer sees them: through the package "exports" map, as ESM and CJS, in
// Node (no DOM, no GPU).
import { readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const require = createRequire(join(root, "package.json"));

const COMPONENTS = [
  "Chart",
  "LineChart",
  "BarChart",
  "ScatterChart",
  "QuadrantChart",
];
const ENGINE = ["createChart", "formatCompact"];

describe("minerva-design/charts", () => {
  it("is declared in the exports map with ESM, CJS and both declaration flavours", () => {
    for (const entry of ["./charts", "./charts/core"]) {
      const map = pkg.exports[entry];
      expect(map.import.default, entry).toMatch(/^\.\/dist\/charts\/.+\.js$/);
      expect(map.import.types, entry).toMatch(/\.d\.ts$/);
      expect(map.require.default, entry).toMatch(/\.cjs$/);
      expect(map.require.types, entry).toMatch(/\.d\.cts$/);
    }
  });

  it("exports the components and re-exports the engine (ESM and CJS)", async () => {
    const esm = (await import("minerva-design/charts")) as unknown as Record<
      string,
      unknown
    >;
    const cjs = require("minerva-design/charts") as Record<string, unknown>;
    for (const name of [...COMPONENTS, ...ENGINE]) {
      expect(typeof esm[name], name).toBe("function");
      expect(typeof cjs[name], name).toBe("function");
    }
  });

  it("the engine entry has no React and no side effects", async () => {
    const core = await import("minerva-design/charts/core");
    expect(Object.keys(core).sort()).toEqual([...ENGINE].sort());
    expect(core.formatCompact(1234567)).toBe("1.23M");
    const code = readFileSync(join(root, "dist/charts/core.js"), "utf8");
    expect(code).not.toContain('"use client"');
    expect(code).not.toMatch(/from\s*["']react/);
  });

  it("server-renders an empty sized container (the chart mounts in the browser)", async () => {
    const { LineChart } = await import("minerva-design/charts");
    const html = renderToString(
      createElement(LineChart, { height: 200, series: [{ data: [1, 2, 3] }] }),
    );
    expect(html).toBe(
      '<div style="position:relative;width:100%;height:200px"></div>',
    );
  });

  it("has no runtime dependency besides React", () => {
    const walk = (dir: string): string[] =>
      readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
      );
    const files = walk(join(root, "dist/charts")).filter((f) =>
      /\.c?js$/.test(f),
    );
    expect(files.length).toBeGreaterThan(10);
    for (const file of files) {
      const code = readFileSync(file, "utf8");
      for (const [, specifier] of code.matchAll(
        /(?:from\s*|require\()["']([^"'.][^"']*)["']/g,
      )) {
        expect(
          ["react", "react/jsx-runtime"],
          `${file} imports ${specifier}`,
        ).toContain(specifier);
      }
    }
  });
});
