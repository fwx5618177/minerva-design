// Modal layout contract (see the rules at the top of modal.module.scss).
// happy-dom has no layout engine, so the rules are asserted on the compiled
// stylesheet.
import { join } from "node:path";
import { compile } from "sass";
import { expect, it } from "vitest";

const css = compile(join(import.meta.dirname, "modal.module.scss")).css;

it("wraps plain modal text without changing nested code whitespace", () => {
  for (const selector of ["header", "description", "body"]) {
    expect(css).toMatch(
      new RegExp(`\\.${selector}[^{}]*\\{[^}]*overflow-wrap:\\s*anywhere`),
    );
  }
  expect(css).not.toMatch(
    /\.body\s+(?:pre|code)[^{]*\{[^}]*(?:white-space:\s*normal|overflow-x:\s*hidden)/,
  );
});

it("reserves title space only when the close button is rendered", () => {
  expect(css).toMatch(
    /\.content:has\(> \.close\) \.header\s*\{[^}]*padding-inline-end:/,
  );
});

it("bounds footer actions and lets long button labels wrap", () => {
  expect(css).toMatch(
    /\.footer > \*\s*\{[^}]*max-width:\s*100%;[^}]*white-space:\s*normal/,
  );
  expect(css).toMatch(/\.footer\s*\{[^}]*flex-wrap:\s*wrap/);
});

it("keeps form content after the description and bounds oversized fixed regions", () => {
  expect(css).toMatch(/\.content > form[^{}]*\{[^}]*order:\s*2/);
  expect(css).toMatch(/\.content > fieldset[^{}]*\{[^}]*min-height:\s*0/);
  for (const selector of ["header", "description", "footer"]) {
    expect(css).toMatch(
      new RegExp(
        `\\.${selector}\\s*\\{[^}]*max-height:\\s*\\d+dvh;[^}]*overflow-y:\\s*auto`,
      ),
    );
  }
  expect(css).toMatch(
    /\.body\s*\{[^}]*min-height:\s*0;[^}]*overflow-y:\s*auto/,
  );
});

it("turns into a bottom sheet on narrow screens", () => {
  expect(css).toMatch(
    /@media \(max-width: 40rem\)\s*\{\s*\.content\s*\{[^}]*bottom:\s*0\.5rem/,
  );
});
