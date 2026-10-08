// Docs site demos: the React / TS demo sources are type-checked by the
// docs app's `tsc` (`pnpm typecheck`, its tsconfig includes src/); this
// checks that nothing escapes it and that the Web Components HTML demos only
// use existing elements, attributes and attribute values.
import { describe, expect, it } from "vitest";
import { read, readJson, walk } from "./utils";
import { htmlProblems } from "./html-check";

const PAGES = "apps/docs/src/docs/pages";

describe("docs demos", () => {
  it("the docs app's typecheck covers every demo source", () => {
    const tsconfig = readJson<{ include?: string[]; exclude?: string[] }>(
      "apps/docs/tsconfig.json",
    );
    expect(tsconfig.include).toContain("src");
    for (const pattern of tsconfig.exclude ?? []) {
      expect(pattern, "demos excluded from tsc").not.toMatch(/pages|demos|wc/);
    }
    expect(
      walk(PAGES, (f) => /\/(demos|wc)\/[^/]+\.tsx?$/.test(f)).length,
    ).toBeGreaterThan(100);
  });

  const html = walk(PAGES, (f) => f.endsWith(".html"));

  it("has Web Components HTML demos", () => {
    expect(html.length).toBeGreaterThan(100);
  });

  it.each(html.map((f) => [f.slice(PAGES.length + 1)]))(
    "%s uses existing elements, attributes and values",
    (file) => {
      expect(htmlProblems(read(PAGES, file))).toEqual([]);
    },
  );
});
