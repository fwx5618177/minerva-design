// The global stylesheet is imported once, in the app entry: the docs site
// documents it on the Installation page (#global-stylesheet), and the
// per-component stylesheets (`@minerva/lib-core/styles/<component>.css`)
// only appear there, as an optional optimisation, never as the default
// pattern of another page.
import { describe, expect, it } from "vitest";
import { read, readJson, walk } from "./utils";

const SAMPLE = "packages/sample/src";
const INSTALLATION = `${SAMPLE}/docs/pages/installation/index.tsx`;
const PER_COMPONENT = /@minerva\/lib-core\/styles\/[\w-]+\.css/;

describe("stylesheet docs", () => {
  it("the published CSS entries used by the docs exist", () => {
    const core = readJson<{ exports: Record<string, unknown> }>(
      "packages/lib-core/package.json",
    );
    const wc = readJson<{ exports: Record<string, unknown> }>(
      "packages/lib-web-components/package.json",
    );
    expect(core.exports).toHaveProperty(["./style.css"]);
    expect(core.exports).toHaveProperty(["./styles/*.css"]);
    expect(wc.exports).toHaveProperty(["./tokens.css"]);
  });

  it("the Installation page has the #global-stylesheet section and its entry snippets", () => {
    const page = read(INSTALLATION);
    expect(page).toContain('<h2 id="global-stylesheet">');
    expect(page).toContain('title="src/main.tsx"');
    expect(page).toContain('title="app/layout.tsx"');
    expect(page).toContain('title="src/main.ts"');
    expect(page).toMatch(
      /import "@minerva\/lib-web-components";\nimport "@minerva\/lib-web-components\/tokens\.css";/,
    );
  });

  it("per-component stylesheets are documented on the Installation page only", () => {
    const files = walk(
      SAMPLE,
      (f) => /\.(?:tsx?|json|md|html)$/.test(f) && !/\.test\.tsx?$/.test(f),
    ).filter((f) => !f.endsWith(".generated.json"));
    const offenders = files.filter(
      (f) => f !== INSTALLATION && PER_COMPONENT.test(read(f)),
    );
    expect(offenders).toEqual([]);
    expect(read(INSTALLATION)).toMatch(PER_COMPONENT);
  });

  it.each(["en", "zh", "ja", "fr"])(
    "%s: the component-page note keys exist",
    (lng) => {
      const common = readJson<{ doc: Record<string, string> }>(
        `${SAMPLE}/i18n/locales/${lng}/common.json`,
      );
      expect(common.doc.requiresStylesheet).toBeTruthy();
      expect(common.doc.requiresStylesheetLink).toBeTruthy();
    },
  );
});
