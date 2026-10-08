// A React 19 page that server-renders Minerva custom elements: the markup is
// produced by renderToString, the element definitions load (upgrading the
// tags), then React hydrates. Upgraded elements must not have changed their
// host attributes, or React reports hydration mismatches.
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type {} from "../../packages/lib-web-components/tests/e2e/jsx";

/**
 * Browsers carry host ARIA (`role`, `aria-selected`...) on ElementInternals,
 * without host attributes. happy-dom has no ElementInternals: a minimal one
 * with ARIA reflection stands in for the browsers' here.
 */
if (!("attachInternals" in HTMLElement.prototype)) {
  Object.defineProperty(HTMLElement.prototype, "attachInternals", {
    configurable: true,
    value(this: HTMLElement) {
      return {
        role: null,
        ariaSelected: null,
        ariaChecked: null,
        ariaDisabled: null,
        ariaHidden: null,
        form: null,
        labels: [],
        validity: { valid: true },
        validationMessage: "",
        willValidate: false,
        states: new Set(),
        setFormValue() {},
        setValidity() {},
        checkValidity: () => true,
        reportValidity: () => true,
      };
    },
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

function Page() {
  return (
    <main>
      <minerva-button>Save</minerva-button>
      <minerva-button variant="ghost">More</minerva-button>
      <minerva-card>
        <minerva-badge>New</minerva-badge>
        <minerva-tag>Draft</minerva-tag>
      </minerva-card>
      <minerva-select aria-label="Fruit">
        <minerva-option value="a">Apple</minerva-option>
        <minerva-option value="b">Banana</minerva-option>
      </minerva-select>
      <minerva-divider />
      <minerva-text-link href="/docs">Docs</minerva-text-link>
    </main>
  );
}

describe("server-rendered custom elements hydrate cleanly", () => {
  it("upgrade adds no host attribute and React reports no mismatch", async () => {
    const html = renderToString(<Page />);
    // server attributes, as parsed from the HTML
    const template = document.createElement("template");
    template.innerHTML = html;
    const attributes = (root: ParentNode) =>
      Array.from(root.querySelectorAll("*"), (el) =>
        el.getAttributeNames().sort().join(" "),
      );
    const before = attributes(template.content);
    // The definitions are loaded when the page's HTML is parsed (happy-dom
    // does not apply parsed attributes on a later upgrade; browsers do)
    await import("@minerva/lib-web-components");
    document.body.innerHTML = `<div id="root">${html}</div>`;
    const container = document.getElementById("root")!;
    await new Promise((resolve) => setTimeout(resolve, 0));
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const recoverable: unknown[] = [];
    await act(async () => {
      hydrateRoot(container, <Page />, {
        onRecoverableError: (error) => recoverable.push(error),
      });
    });
    expect(attributes(container)).toEqual(before);
    expect(recoverable).toEqual([]);
    expect(
      errors.mock.calls.filter((args) => /hydrat/i.test(String(args[0]))),
    ).toEqual([]);
  });
});
