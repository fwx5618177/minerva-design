// Shared stylesheets: every lib-core stylesheet is one CSSResult, hence one
// constructable CSSStyleSheet adopted by all the shadow roots that use it.
import { type CSSResult } from "lit";
import { describe, expect, it } from "vitest";
import manifest from "../../custom-elements.json";
import "../index";
import "../elements/code-editor";
import { sharedStyles } from "./styles";

type StyledClass = CustomElementConstructor & {
  elementStyles: Array<CSSResult | CSSStyleSheet>;
  finalize(): void;
};

const tags = manifest.modules.flatMap((module) =>
  module.declarations.flatMap((d) =>
    "tagName" in d && d.tagName ? [d.tagName as string] : [],
  ),
);

describe("sharedStyles", () => {
  it("returns one CSSResult per stylesheet text", () => {
    const a = sharedStyles(".x{color:red}");
    expect(sharedStyles(".x{color:red}")).toBe(a);
    expect(sharedStyles(".y{color:red}")).not.toBe(a);
    expect(a.cssText).toBe(".x{color:red}");
  });

  it("every element class adopts the same object for the same lib-core stylesheet", () => {
    const byText = new Map<string, Set<unknown>>();
    let elements = 0;
    for (const tag of tags) {
      const ctor = customElements.get(tag) as StyledClass | undefined;
      expect(ctor, tag).toBeDefined();
      ctor!.finalize();
      elements += 1;
      for (const style of ctor!.elementStyles) {
        const text = (style as CSSResult).cssText;
        // lib-core stylesheets (the inline `css` blocks are small)
        if (text.length < 1500) continue;
        if (!byText.has(text)) byText.set(text, new Set());
        byText.get(text)!.add(style);
      }
    }
    expect(elements).toBe(tags.length);
    const duplicated = [...byText.values()].filter((set) => set.size > 1);
    expect(duplicated).toHaveLength(0);
    // the IconButton / Tabs sheets are reused by several elements
    const reused = [...byText.keys()].filter((text) => {
      let users = 0;
      for (const tag of tags) {
        const ctor = customElements.get(tag) as StyledClass;
        if (ctor.elementStyles.some((s) => (s as CSSResult).cssText === text))
          users += 1;
      }
      return users > 1;
    });
    expect(reused.length).toBeGreaterThan(5);
  });
});
