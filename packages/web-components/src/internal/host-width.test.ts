// Width parity with the React library: where the React root class is
// `width: 100%`, the element's host must fill its container too. Otherwise
// the shadow root's `.root { width: 100% }` resolves against a host that a
// flex / grid parent shrank to its content (collapsed grids, narrow tables).
import { type CSSResult } from "lit";
import { describe, expect, it } from "vitest";
import "../index";
import "../elements/code-editor";

type StyledClass = CustomElementConstructor & {
  elementStyles: Array<CSSResult | CSSStyleSheet>;
  finalize(): void;
};

const hostRules = (tag: string) => {
  const ctor = customElements.get(tag) as StyledClass;
  ctor.finalize();
  const css = ctor.elementStyles
    .map((s) => ("cssText" in s ? s.cssText : ""))
    .join("\n");
  // One level of nested parentheses, e.g. `:host(:not([decorative]))`.
  return [
    ...css.matchAll(/:host(\((?:[^()]|\([^()]*\))*\))?\s*\{([^}]*)\}/g),
  ].map(([, selector = "", body]) => ({ selector, body }));
};

const FULL_WIDTH = [
  "minerva-app-shell",
  "minerva-code-editor",
  "minerva-data-table",
  "minerva-form-control",
  "minerva-form-layout",
  "minerva-html-preview",
  "minerva-input",
  "minerva-nav-tree",
  "minerva-page",
  "minerva-responsive-grid",
  "minerva-skeleton-text",
  "minerva-slider",
  "minerva-split-layout",
  "minerva-tabs",
  "minerva-tag-input",
  "minerva-textarea",
];

describe("host width parity", () => {
  it.each(FULL_WIDTH)("<%s> fills its container like the React root", (tag) => {
    const rules = hostRules(tag);
    expect(
      rules.some(
        (r) => r.selector === "" && /(^|[\s;])width:\s*100%/.test(r.body),
      ),
    ).toBe(true);
  });

  it("<minerva-skeleton> fills its container unless decorative", () => {
    const rules = hostRules("minerva-skeleton");
    expect(
      rules.some(
        (r) =>
          r.selector === "(:not([decorative]))" && /width:\s*100%/.test(r.body),
      ),
    ).toBe(true);
  });

  it("<minerva-date-picker> follows --date-picker-width (100% by default)", () => {
    const rules = hostRules("minerva-date-picker");
    expect(
      rules.some((r) =>
        /width:\s*var\(--date-picker-width,\s*100%\)/.test(r.body),
      ),
    ).toBe(true);
  });

  it("a vertical <minerva-slider> keeps its own width", () => {
    const rules = hostRules("minerva-slider");
    expect(
      rules.some(
        (r) =>
          r.selector === '([orientation="vertical"])' &&
          /width:\s*auto/.test(r.body),
      ),
    ).toBe(true);
  });
});
