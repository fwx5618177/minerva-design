// The global stylesheet is imported once, in the app entry: the docs site
// documents it on the Installation page (#global-stylesheet), and the
// per-component stylesheets (`minerva-design/styles/<component>.css`)
// only appear there, as an optional optimisation, never as the default
// pattern of another page.
import { describe, expect, it } from "vitest";
import { read, readJson, walk } from "./utils";

const DOCS = "apps/docs/src";
const INSTALLATION = `${DOCS}/docs/pages/installation/index.tsx`;
const PER_COMPONENT = /minerva-design\/styles\/[\w-]+\.css/;

describe("stylesheet docs", () => {
  it("the published CSS entries used by the docs exist", () => {
    const pkg = readJson<{ exports: Record<string, unknown> }>(
      "packages/minerva-design/package.json",
    );
    expect(pkg.exports).toHaveProperty(["./style.css"]);
    expect(pkg.exports).toHaveProperty(["./styles/*.css"]);
    expect(pkg.exports).toHaveProperty(["./tokens.css"]);
  });

  it("the Installation page has the #global-stylesheet section and its entry snippets", () => {
    const page = read(INSTALLATION);
    expect(page).toContain('<h2 id="global-stylesheet">');
    expect(page).toContain('title="src/main.tsx"');
    expect(page).toContain('title="app/layout.tsx"');
    expect(page).toContain('title="src/main.ts"');
    expect(page).toMatch(
      /import "minerva-design\/web-components";\nimport "minerva-design\/tokens\.css";/,
    );
  });

  it("per-component stylesheets are documented on the Installation page only", () => {
    const files = walk(
      DOCS,
      (f) => /\.(?:tsx?|json|md|html)$/.test(f) && !/\.test\.tsx?$/.test(f),
    ).filter((f) => !f.endsWith(".generated.json"));
    const offenders = files.filter(
      (f) => f !== INSTALLATION && PER_COMPONENT.test(read(f)),
    );
    expect(offenders).toEqual([]);
    expect(read(INSTALLATION)).toMatch(PER_COMPONENT);
  });
});
