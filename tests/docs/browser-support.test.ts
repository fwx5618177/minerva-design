// The browser support matrix of the README lists every platform feature the
// libraries rely on: adding a use of a feature below without documenting it
// (minimum versions and fallback) fails here.
import { describe, expect, it } from "vitest";
import { read, walk } from "./utils";

/** Feature -> how to find it in the sources, and the README row that documents it */
const FEATURES: Array<{
  feature: string;
  pattern: RegExp;
  files: "styles" | "scripts" | "build";
  row: string;
}> = [
  {
    feature: "color-mix()",
    pattern: /color-mix\(/,
    files: "styles",
    row: "`color-mix()`",
  },
  {
    feature: "container queries",
    pattern: /@container\b/,
    files: "styles",
    row: "Size container queries",
  },
  { feature: ":has()", pattern: /:has\(/, files: "styles", row: "`:has()`" },
  { feature: ":dir()", pattern: /:dir\(/, files: "styles", row: "`:dir()`" },
  {
    feature: "dvh",
    pattern: /\d+dvh\b/,
    files: "styles",
    row: "Dynamic viewport units",
  },
  {
    feature: "accent-color",
    pattern: /accent-color\s*:/,
    files: "styles",
    row: "`accent-color`",
  },
  {
    feature: "ResizeObserver",
    pattern: /\bResizeObserver\b/,
    files: "scripts",
    row: "`ResizeObserver`",
  },
  {
    feature: "requestIdleCallback",
    pattern: /\brequestIdleCallback\b/,
    files: "scripts",
    row: "`requestIdleCallback`",
  },
  {
    feature: "inert",
    pattern: /["']inert["']/,
    files: "scripts",
    row: "`inert`",
  },
  {
    feature: "Clipboard API",
    pattern: /navigator\.clipboard/,
    files: "scripts",
    row: "Clipboard API",
  },
  {
    feature: "adoptedStyleSheets",
    pattern: /adoptedStyleSheets/,
    files: "scripts",
    row: "Constructable stylesheets",
  },
  {
    feature: "ElementInternals",
    pattern: /attachInternals\(/,
    files: "scripts",
    row: "`ElementInternals`",
  },
  {
    feature: "Popover API",
    pattern: /showPopover\(/,
    files: "scripts",
    row: "Popover API",
  },
  {
    feature: "CustomStateSet / :state()",
    pattern: /\.states\b/,
    files: "scripts",
    row: "Custom states",
  },
  {
    // added by the build to every published stylesheet (tools/css-layer.mjs)
    feature: "@layer",
    pattern: /@layer \$\{CSS_LAYER\}/,
    files: "build",
    row: "Cascade layers",
  },
];

/** Modern features that are not used today: a first use must be documented */
const UNUSED: Array<[string, RegExp]> = [
  ["CSS anchor positioning", /anchor-name\s*:|position-anchor\s*:/],
  ["@starting-style", /@starting-style/],
  ["light-dark()", /light-dark\(/],
  ["View Transitions", /startViewTransition|view-transition-name/],
  ["Declarative shadow DOM", /shadowrootmode/],
  ["Intl.Segmenter", /Intl\.Segmenter/],
];

const SOURCES = [
  "packages/core/src",
  "packages/react/src",
  "packages/web-components/src",
];
const notTest = (f: string) => !/\.test\.tsx?$|\/test-utils\//.test(f);
const styles = SOURCES.flatMap((d) => walk(d, (f) => /\.s?css$/.test(f))).map(
  (f) => read(f),
);
const scripts = SOURCES.flatMap((d) =>
  walk(d, (f) => /\.tsx?$/.test(f) && notTest(f)),
).map((f) => read(f));
const build = [read("tools/css-layer.mjs")];
const readme = read("README.md");
const matrix = readme.slice(
  readme.indexOf("## 🌐 Browser support"),
  readme.indexOf("\n## ", readme.indexOf("## 🌐 Browser support") + 1),
);

describe("browser support matrix", () => {
  it("states the fully supported versions", () => {
    expect(matrix).toMatch(/Chrome \/ Edge 120\+, Firefox 125\+, Safari 17\+/);
  });

  it.each(FEATURES.map((f) => [f.feature, f]))(
    "%s is used and documented with a minimum version and a fallback",
    (_, { pattern, files, row }) => {
      const sources =
        files === "styles" ? styles : files === "build" ? build : scripts;
      expect(
        sources.some((s) => pattern.test(s)),
        "still used",
      ).toBe(true);
      const line = matrix.split("\n").find((l) => l.startsWith(`| ${row}`));
      expect(line, `README row "${row}"`).toBeDefined();
      const cells = line!.split("|").map((c) => c.trim());
      // | feature | used by | minimum | without it |
      expect(cells[3]).toMatch(/\d/);
      expect(cells[4].length).toBeGreaterThan(5);
    },
  );

  it.each(UNUSED)(
    "%s is not used yet (document it in the matrix first)",
    (_, pattern) => {
      expect([...styles, ...scripts].filter((s) => pattern.test(s))).toEqual(
        [],
      );
    },
  );
});
