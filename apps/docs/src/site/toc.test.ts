// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { collectHeadings, getActiveId, sameItems } from "./toc";

const page = (html: string) => {
  const root = document.createElement("main");
  root.innerHTML = html;
  return root;
};

describe("collectHeadings", () => {
  it("lists h2 / h3 with an id, in document order, with their level", () => {
    const root = page(`
      <h1 id="title">Button</h1>
      <h2 id="import">Import</h2>
      <h2 id="examples">Examples</h2>
      <h3 id="basic">  Basic   usage </h3>
      <h3>No id</h3>
      <h2 id="api">API</h2>
    `);
    expect(collectHeadings(root)).toEqual([
      { id: "import", text: "Import", level: 2 },
      { id: "examples", text: "Examples", level: 2 },
      { id: "basic", text: "Basic usage", level: 3 },
      { id: "api", text: "API", level: 2 },
    ]);
  });

  it("skips headings in hidden tab panels, demo previews and ignored blocks", () => {
    const root = page(`
      <h2 id="visible">Visible</h2>
      <div hidden><h2 id="hidden-panel">Hidden</h2></div>
      <div data-toc-ignore><h3 id="demo-heading">In a demo</h3></div>
      <div aria-hidden="true"><h2 id="aria-hidden">Hidden</h2></div>
      <h2 id="empty">   </h2>
    `);
    expect(collectHeadings(root).map((item) => item.id)).toEqual(["visible"]);
  });

  it("returns nothing without a root", () => {
    expect(collectHeadings(null)).toEqual([]);
  });
});

describe("getActiveId", () => {
  const positions = [
    { id: "a", top: 40 },
    { id: "b", top: 300 },
    { id: "c", top: 900 },
  ];

  it("is the last heading scrolled above the offset", () => {
    expect(getActiveId(positions, 100)).toBe("a");
    expect(getActiveId(positions, 320)).toBe("b");
    expect(getActiveId(positions, 2000)).toBe("c");
  });

  it("is the first heading before any has been reached", () => {
    expect(getActiveId([{ id: "a", top: 500 }], 100)).toBe("a");
  });

  it("is the last heading at the bottom of the page", () => {
    expect(getActiveId(positions, 100, true)).toBe("c");
  });

  it("is undefined without headings", () => {
    expect(getActiveId([], 100)).toBeUndefined();
  });
});

describe("sameItems", () => {
  it("compares ids, texts and levels", () => {
    const a = [{ id: "x", text: "X", level: 2 as const }];
    expect(sameItems(a, [{ ...a[0] }])).toBe(true);
    expect(sameItems(a, [{ ...a[0], text: "Y" }])).toBe(false);
    expect(sameItems(a, [])).toBe(false);
  });
});
