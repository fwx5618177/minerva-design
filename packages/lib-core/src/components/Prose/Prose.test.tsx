// Ported from @novel-isr/ui src/components/__test__/Prose.test.tsx
// and src/styles/__test__/prose.test.ts
import { act, createRef } from "react";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { render } from "@testing-library/react";
import { compile, compileString } from "sass";
import { describe, expect, it } from "vitest";
import Prose from "./Prose";

const mixinPath = join(import.meta.dirname, "prose.scss");
const componentPath = join(import.meta.dirname, "prose.module.scss");
const compileHost = () =>
  compileString(
    `
  @use 'prose' as typography;
  .editor-host { @include typography.prose; }
`,
    { loadPaths: [import.meta.dirname] },
  );
/** The component includes the mixin in CSS-modules mode (`:global()` hljs classes) */
const componentCss = () =>
  compile(componentPath).css.replace(/:global\(([^)]*)\)/g, "$1");

function declarations(css: string, selector: string) {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);
  try {
    const rule = Array.from(style.sheet!.cssRules).find(
      (rule) => (rule as CSSStyleRule).selectorText === selector,
    ) as CSSStyleRule | undefined;
    expect(rule, selector).toBeDefined();
    return rule!.style;
  } finally {
    style.remove();
  }
}

describe("Prose component", () => {
  it("renders a native Prose surface with DOM attributes, ref and events", () => {
    const ref = createRef<HTMLDivElement>();
    let clicks = 0;
    render(
      <Prose
        ref={ref}
        id="document"
        className="consumer"
        aria-label="Article"
        data-owner="test"
        onClick={() => clicks++}
      >
        <p>Article body</p>
      </Prose>,
    );
    expect(ref.current?.tagName).toBe("DIV");
    expect(ref.current).toHaveClass("prose", "ui-prose", "consumer");
    expect(ref.current?.getAttribute("aria-label")).toBe("Article");
    expect(ref.current?.dataset.owner).toBe("test");
    act(() => ref.current?.click());
    expect(clicks).toBe(1);
  });

  it("slots an editor host without a second wrapper and composes refs and handlers", () => {
    const parentRef = createRef<HTMLDivElement>();
    const childRef = createRef<HTMLDivElement>();
    const calls: string[] = [];
    const { container } = render(
      <Prose
        asChild
        ref={parentRef}
        className="parent"
        onClick={() => calls.push("parent")}
      >
        {/* Fixture that only verifies Slot handler merging, not interactive UI. */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          ref={childRef}
          className="editor-host"
          onClick={() => calls.push("child")}
        >
          <p>Draft</p>
        </div>
      </Prose>,
    );
    expect(container.children).toHaveLength(1);
    expect(parentRef.current).toBe(childRef.current);
    expect(childRef.current?.className).toBe(
      "prose ui-prose parent editor-host",
    );
    expect(childRef.current?.hasAttribute("aschild")).toBe(false);
    act(() => childRef.current?.click());
    expect(calls).toEqual(["child", "parent"]);
  });

  it("preserves author inline formatting and treats string children as text, not HTML", () => {
    const { container } = render(
      <Prose>
        <p style={{ textAlign: "right" }}>
          <span style={{ color: "rgb(18, 52, 86)", fontFamily: "serif" }}>
            Author color
          </span>
        </p>
        <mark style={{ backgroundColor: "rgb(255, 240, 0)" }}>
          Author highlight
        </mark>
        {"<img src=x onerror=alert(1)>"}
      </Prose>,
    );
    expect(container.querySelector("p")?.style.textAlign).toBe("right");
    expect(container.querySelector("span")?.getAttribute("style")).toContain(
      "color: rgb(18, 52, 86)",
    );
    expect(container.querySelector("span")?.style.fontFamily).toBe("serif");
    expect(container.querySelector("mark")?.style.backgroundColor).toBe(
      "rgb(255, 240, 0)",
    );
    expect(container.querySelector("img")).toBeNull();
    expect(container.textContent).toContain("<img src=x onerror=alert(1)>");
  });

  it("ships scoped semantic typography with readable syntax and no decorative transformations", () => {
    const css = compile(componentPath).css;
    expect(css).toMatch(/\.prose\s*\{[^}]*overflow-wrap:\s*anywhere/);
    expect(css).toMatch(/:where\(blockquote\)/);
    expect(css).toMatch(/:where\(table\)\s*\{[^}]*overflow-wrap:\s*normal/);
    expect(css).toMatch(/:where\(pre\)[\s\S]*overflow-x:\s*auto/);
    expect(css).toMatch(/:where\(pre code\)\s*\{[^}]*white-space:\s*pre/);
    expect(css).toMatch(/:where\(a\)[\s\S]*text-decoration[^;]*underline/);
    expect(css).toMatch(/:global\(\.hljs-punctuation\)/);
    expect(css).toMatch(/color:\s*var\(--text-color, #1f2937\)/);
    expect(css).not.toMatch(
      /gradient|transform:|box-shadow:|content:|ProseMirror|taskItem|!important/,
    );
    // Text is never colored with the border token
    expect(css).not.toMatch(/(?<![-\w])color:\s*var\(--border-color/);
    expect(css).not.toMatch(
      /(?:pre|table)[^{]*\{[^}]*display:\s*(?:block|flex|grid)/,
    );
  });
});

describe("prose.scss Sass adapter", () => {
  it("compiles a standalone mixin without emitting global styles or importing dependencies", () => {
    expect(compile(mixinPath).css).toBe("");
    const result = compileHost();
    expect(result.loadedUrls.map((url) => url.href)).toEqual([
      pathToFileURL(mixinPath).href,
    ]);
    expect(
      declarations(result.css, ".editor-host").getPropertyValue("font-family"),
    ).toContain("var(--font-family-sans");
    expect(result.css).not.toMatch(
      /:root|\.prose|:global|Milkdown|Vditor|ProseMirror|taskItem|!important/i,
    );
  });

  it("compiles the component from the same mixin with identical rules and selector specificity", () => {
    const component = compile(componentPath);
    expect(component.loadedUrls.map((url) => url.href)).toContain(
      pathToFileURL(mixinPath).href,
    );
    expect(componentCss()).toBe(
      compileHost().css.split(".editor-host").join(".prose"),
    );
  });

  it("falls back to default theme values when Minerva tokens are missing", () => {
    const css = compileHost().css;
    const host = declarations(css, ".editor-host");
    expect(host.getPropertyValue("color")).toBe("var(--text-color, #1f2937)");
    expect(host.getPropertyValue("line-height")).toBe(
      "var(--line-height-relaxed, 1.7)",
    );
    expect(
      declarations(css, ".editor-host :where(a)").getPropertyValue("color"),
    ).toBe("var(--primary-color-text, #1e4fbd)");
  });

  it("makes normal body fonts and heading padding and borders explicit", () => {
    const css = componentCss();
    const host = declarations(css, ".prose");
    expect(host.getPropertyValue("font-weight")).toBe(
      "var(--font-weight-regular, 400)",
    );
    expect(host.getPropertyValue("font-style")).toBe("normal");
    const headings = declarations(css, ".prose :where(h1, h2, h3, h4, h5, h6)");
    expect(headings.getPropertyValue("font-family")).toBe("inherit");
    expect(headings.getPropertyValue("font-style")).toBe("inherit");
    expect(headings.getPropertyValue("padding")).toBe("0px");
    expect(headings.getPropertyValue("border")).toBe("0px");
    const body = declarations(css, ".prose :where(p, ul, ol, li, blockquote)");
    for (const property of [
      "font-family",
      "font-size",
      "font-weight",
      "font-style",
      "line-height",
    ]) {
      expect(body.getPropertyValue(property), property).toBe("inherit");
    }
    expect(
      declarations(css, ".prose :where(p)").getPropertyValue("padding"),
    ).toBe("0px");
    expect(
      declarations(css, ".prose :where(blockquote)").getPropertyValue("border"),
    ).toBe("0px");
  });

  it("preserves code whitespace, syntax colors and native table layout without broad resets", () => {
    const css = compileHost().css;
    const pre = declarations(css, ".editor-host :where(pre)");
    expect(pre.getPropertyValue("white-space")).toBe("pre");
    expect(pre.getPropertyValue("overflow-wrap")).toBe("normal");
    const code = declarations(css, ".editor-host :where(pre code)");
    expect(code.getPropertyValue("white-space")).toBe("pre");
    expect(code.getPropertyValue("padding")).toBe("0px");
    const table = declarations(css, ".editor-host :where(table)");
    expect(table.getPropertyValue("display")).toBe("table");
    expect(
      declarations(css, ".editor-host :where(tr)").getPropertyValue(
        "background",
      ),
    ).toBe("transparent");
    expect(
      declarations(css, ".editor-host :where(tr)").getPropertyValue("border"),
    ).toBe("0px");
    expect(
      declarations(css, ".editor-host :where(th, td)").getPropertyValue(
        "white-space",
      ),
    ).toBe("normal");
    expect(
      declarations(css, ".editor-host :where(hr)").getPropertyValue("height"),
    ).toBe("0px");
    expect(
      declarations(css, ".editor-host :where(hr)").getPropertyValue("padding"),
    ).toBe("0px");
    expect(
      declarations(css, ".editor-host :where(hr)").getPropertyValue(
        "background",
      ),
    ).toBe("transparent");
    expect(table.getPropertyValue("overflow-wrap")).toBe("normal");
    expect(css).toContain("hljs-punctuation");
    expect(css).not.toMatch(
      /\*|:where\((?:span|div)\)|line-number|linenumber|counter-|content:/i,
    );
  });
});
