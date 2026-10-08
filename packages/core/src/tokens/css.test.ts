import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { generateTokensCss } from "./css";

const read = (...path: string[]) =>
  readFileSync(join(import.meta.dirname, ...path), "utf8");

describe("generateTokensCss", () => {
  // tokens.golden.css was captured from the former Sass sources
  // (`compile(tokens.scss, { style: "expanded" })` + `wrapInLayer`, i.e. the
  // published dist/core/tokens.css) and the generator matched it byte for
  // byte. Deliberate changes since then (update the fixture with them):
  //
  // 1. `touch` design preset: `--touch-target-min` added at the end of the
  //    scales `:root` block (32px) and of the density blocks (standard 32px,
  //    compact 24px, comfortable 44px): +4 lines, nothing else changed.
  it("tokens.golden.css: equals the published stylesheet", () => {
    expect(generateTokensCss()).toBe(read("__fixtures__", "tokens.golden.css"));
  });

  it("can omit the cascade layer (the bundled copy is layered by the renderer builds)", () => {
    const layered = generateTokensCss();
    const plain = generateTokensCss({ layer: false });
    expect(layered).toBe(`@layer minerva {\n${plain.trimEnd()}\n}\n`);
    expect(generateTokensCss({ layer: "lib" })).toMatch(
      /^@layer lib \{\n:root,/,
    );
  });

  it("declares the design axes with doubled attribute selectors", () => {
    const css = generateTokensCss({ layer: false });
    expect(css).toContain("[data-density=comfortable][data-density] {");
    expect(css).toContain("[data-radius=large][data-radius] {");
    expect(css).toContain("[data-shadow=subtle][data-shadow] {");
    expect(css).not.toContain("[data-shadow=standard]");
    expect(css).toContain("[data-font-scale=large][data-font-scale] {");
    expect(css).toMatch(
      /\[data-density=comfortable\]\[data-density\] \{[^}]*--touch-target-min: 44px;/,
    );
  });
});
