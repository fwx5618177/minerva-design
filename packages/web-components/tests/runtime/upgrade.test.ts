// "Hydration" of server-rendered / static markup: custom elements parsed
// before their definition is loaded (SSR output, a CDN script with `defer`,
// lazy-loaded entries) upgrade to exactly the DOM a client-created element
// renders, attributes and properties set before the upgrade included.
import { afterEach, describe, expect, it, vi } from "vitest";
import manifest from "../../../minerva-design/custom-elements.json" with { type: "json" };
import "../../src/index";
import "../../src/elements/code-editor";
import { settle } from "../utils";

interface Declaration {
  tagName?: string;
  attributes?: {
    name: string;
    type?: { text: string };
    description?: string;
  }[];
}
const tags = (
  manifest as { modules: { declarations?: Declaration[] }[] }
).modules
  .flatMap((m) => m.declarations ?? [])
  .filter((d): d is Declaration & { tagName: string } => !!d.tagName);

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

/** Shadow DOM without Lit markers and generated ids */
const snapshot = (el: Element) =>
  (el.shadowRoot?.innerHTML ?? "")
    .replace(/<!--[^]*?-->/g, "")
    .replace(/\b(minerva|mnv)[\w-]*?-\d+\b/g, "<id>")
    .replace(/\s+/g, " ");

/** Attributes worth setting before the upgrade: string / enum ones */
const attributesOf = (d: Declaration) => {
  const attrs: Record<string, string> = {};
  for (const a of d.attributes ?? []) {
    const type = a.type?.text ?? "";
    const literal = /"([^"]+)"/.exec(type)?.[1];
    if (a.name === "open" || a.name === "value") continue;
    // state reflected by the element itself (mobile, collapsed...)
    if (/read-only/i.test(a.description ?? "")) continue;
    if (/^\s*boolean/.test(type)) attrs[a.name] = "";
    else if (literal) attrs[a.name] = literal;
    else if (/^string/.test(type)) attrs[a.name] = "Text";
  }
  return attrs;
};

let counter = 0;

/**
 * happy-dom upgrades parsed elements on `define()` but, unlike browsers
 * (HTML spec "upgrade an element", step 4), does not enqueue
 * `attributeChangedCallback` for their existing observed attributes: the
 * browser behaviour is reproduced here (before the first Lit update).
 */
function define(name: string, constructor: CustomElementConstructor) {
  customElements.define(name, constructor);
  const observed: string[] =
    (constructor as { observedAttributes?: string[] }).observedAttributes ?? [];
  for (const el of Array.from(document.getElementsByTagName(name))) {
    const upgraded = el as Element & {
      attributeChangedCallback?(n: string, o: string | null, v: string): void;
    };
    for (const attr of observed) {
      const value = el.getAttribute(attr);
      if (value !== null)
        upgraded.attributeChangedCallback?.(attr, null, value);
    }
  }
}

describe("upgrade of pre-rendered markup", () => {
  it.each(tags.map((d) => [d.tagName, d]))(
    "%s upgrades to the client-rendered DOM",
    async (tag, declaration) => {
      vi.spyOn(console, "error").mockImplementation(() => {});
      const Base = customElements.get(tag) as CustomElementConstructor;
      const name = `${tag}-upgrade-${++counter}`;
      const attrs = attributesOf(declaration);
      const markup = (t: string) =>
        `<${t} ${Object.entries(attrs)
          .map(([k, v]) => (v ? `${k}="${v}"` : k))
          .join(" ")}>Content</${t}>`;
      // parsed before the definition exists (an HTMLElement for now)
      document.body.innerHTML = markup(name);
      const early = document.body.firstElementChild!;
      expect(early.shadowRoot).toBeNull();
      define(name, class extends Base {});
      const fresh = document.createElement("div");
      fresh.innerHTML = markup(name);
      document.body.append(fresh);
      await settle();
      expect(early.shadowRoot, "upgraded").not.toBeNull();
      expect(snapshot(early)).toBe(snapshot(fresh.firstElementChild!));
    },
  );

  it("properties set before the upgrade are kept", async () => {
    const Base = customElements.get(
      "minerva-select",
    ) as CustomElementConstructor;
    const name = `minerva-select-upgrade-${++counter}`;
    const early = document.createElement(name) as HTMLElement & {
      options?: unknown;
      value?: unknown;
    };
    early.options = [
      { value: "a", label: "Apple" },
      { value: "b", label: "Banana" },
    ];
    early.value = "b";
    document.body.append(early);
    define(name, class extends Base {});
    await settle();
    expect(early.value).toBe("b");
    expect(early.shadowRoot?.textContent).toContain("Banana");
  });
});
