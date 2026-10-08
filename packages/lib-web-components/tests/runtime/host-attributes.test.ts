// Server-rendered markup containing the tags (e.g. a React 19 page that
// renders <minerva-button>) is hydrated by the framework: an element that
// adds attributes to its host on upgrade (reflected defaults, ARIA through
// setAttribute) makes the hydrated DOM differ from the server HTML and
// triggers hydration attribute mismatches. A freshly upgraded element
// without attributes must leave its host attributes untouched; defaults
// are styled with `:host(:not([attr]))` and host ARIA goes through
// ElementInternals.
import { afterEach, describe, expect, it, vi } from "vitest";
import manifest from "../../custom-elements.json" with { type: "json" };
import "../../src/index";
import "../../src/elements/code-editor";
import { settle } from "../utils";

const tags = (
  manifest as { modules: { declarations?: { tagName?: string }[] }[] }
).modules
  .flatMap((m) => m.declarations ?? [])
  .map((d) => d.tagName)
  .filter((t): t is string => !!t);

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

/**
 * Host attributes that are structural for composite widget items (not
 * defaults): the roving `tabindex` that makes an item focusable, ID
 * references (`aria-controls` / `aria-labelledby` cannot go through
 * ElementInternals without element references), and the `data-state` /
 * `data-orientation` / `data-*` styling hooks set from the owning group.
 */
const STRUCTURAL: Record<string, string[]> = {
  "minerva-radio": ["tabindex"],

  "minerva-tab": ["slot", "data-state", "data-orientation"],
  "minerva-tab-panel": ["tabindex", "data-state", "hidden"],
};

/**
 * Names of the attributes written to `el` by the library itself. The test
 * environment's ElementInternals polyfill (happy-dom has none) emulates
 * internals ARIA and validity with host attributes (`role`, `aria-*`,
 * `internals-*`): writes made from the polyfill are not the library's.
 */
function recordWrites() {
  const written = new Map<Element, Set<string>>();
  const record = (el: Element, name: string) => {
    if (/element-internals-polyfill/.test(new Error().stack ?? "")) return;
    if (!written.has(el)) written.set(el, new Set());
    written.get(el)!.add(name.toLowerCase());
  };
  for (const method of ["setAttribute", "toggleAttribute"] as const) {
    const original = Element.prototype[method] as (
      this: Element,
      ...args: unknown[]
    ) => unknown;
    vi.spyOn(Element.prototype, method).mockImplementation(function (
      this: Element,
      ...args: unknown[]
    ) {
      const result = original.apply(this, args);
      if (this.hasAttribute(args[0] as string)) record(this, args[0] as string);
      return result;
    } as never);
  }
  const tabIndex = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "tabIndex",
  )!;
  vi.spyOn(HTMLElement.prototype, "tabIndex", "set").mockImplementation(
    function (this: HTMLElement, value: number) {
      tabIndex.set!.call(this, value);
      record(this, "tabindex");
    },
  );
  return (el: Element) =>
    el.getAttributeNames().filter((name) => written.get(el)?.has(name));
}

describe("host attributes on upgrade", () => {
  it("detects attributes written by an element", async () => {
    const writtenOn = recordWrites();
    document.body.innerHTML = `<minerva-button></minerva-button>`;
    await settle();
    const el = document.body.firstElementChild!;
    el.setAttribute("variant", "ghost");
    expect(writtenOn(el)).toEqual(["variant"]);
  });

  it.each(tags)("<%s> adds no attribute to its host", async (tag) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const writtenOn = recordWrites();
    document.body.innerHTML = `<${tag}></${tag}>`;
    await settle();
    const el = document.body.firstElementChild!;
    const added = writtenOn(el).filter(
      (name) => !(STRUCTURAL[tag] ?? []).includes(name),
    );
    expect(added).toEqual([]);
  });
});
