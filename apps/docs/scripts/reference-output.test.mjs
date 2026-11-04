// Run after the docs build, like the other package/build tool checks in CI.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
const publicDir = fileURLToPath(new URL("../public/", import.meta.url));
const read = (path) => JSON.parse(readFileSync(path, "utf8"));
const owner = "https://example.test/minerva-design/reference/index.json";
function resolve(url, base = owner) {
  const result = new URL(url, base);
  assert.equal(result.origin, "https://example.test");
  assert.ok(
    result.pathname.startsWith("/minerva-design/reference/"),
    result.href,
  );
  const path = join(
    publicDir,
    result.pathname.slice("/minerva-design/".length),
  );
  assert.ok(existsSync(path), `Missing emitted link ${result.href}`);
  return path;
}
test("every index/page recipe and installation link resolves; Angular source and guide text are exported", () => {
  const index = read(join(publicDir, "reference/index.json"));
  resolve(index.typeGraph);
  for (const recipe of index.recipes) resolve(recipe.url);
  for (const page of index.pages) {
    resolve(page.markdown);
    const file = resolve(page.json);
    const record = read(file);
    assert.equal(record.packageVersion, index.packageVersion);
    assert.equal(record.renderer, page.renderer);
    assert.ok(record.provenance.referenceSourceDigest.startsWith("sha256:"));
    const base = new URL(page.json, owner);
    resolve(record.installation, base);
    for (const recipe of record.recipes) resolve(recipe.url, base);
  }
  const angular = index.pages.find(
    (p) => p.page === "input" && p.renderer === "angular" && p.locale === "en",
  );
  const examples = read(resolve(angular.json)).examples;
  assert.ok(examples.length > 0);
  assert.ok(
    examples.some((e) =>
      e.files["example.ts"]?.includes("minerva-design/angular"),
    ),
  );
  const theming = index.pages.find(
    (p) => p.page === "theming" && p.renderer === "react" && p.locale === "en",
  );
  const text = readFileSync(resolve(theming.markdown), "utf8");
  assert.ok(text.includes("The React library ships three themes"));
  const typeGraph = read(resolve(index.typeGraph));
  const input = index.pages.find(
    (p) => p.page === "input" && p.renderer === "react" && p.locale === "en",
  );
  const record = read(resolve(input.json));
  const prop = record.components
    .find((c) => c.name === "Input")
    .api.props.find((p) => p.name === "value");
  assert.ok(typeGraph[prop.typeRef]);
});

test("emitted guide code uses the same exact CDN version as its reference snapshot", () => {
  const index = read(join(publicDir, "reference/index.json"));
  for (const id of ["installation", "web-components", "wc-plain-html"]) {
    const page = index.pages.find(
      (p) => p.page === id && p.locale === "en" && p.renderer === "react",
    );
    assert.ok(page, id);
    const record = read(resolve(page.json));
    const code = record.snippets.map((snippet) => snippet.source).join("\n");
    const urls =
      code.match(
        /https:\/\/(?:cdn\.jsdelivr\.net\/npm|unpkg\.com)\/minerva-design(?:@[^/\s"'<>]+)?\/[^\s"'<>]+/g,
      ) ?? [];
    assert.ok(urls.length >= 2, `Missing resolved CDN snippets for ${id}`);
    for (const url of urls)
      assert.ok(url.includes(`minerva-design@${index.packageVersion}/`), url);
  }
});
