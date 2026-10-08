// A React 19 page that server-renders Minerva custom elements: the markup is
// produced by renderToString, the element definitions load (upgrading the
// tags), then React hydrates. Upgraded elements must not have changed their
// host attributes, or React reports hydration mismatches. Composite items
// (tabs, radios, options) defer the host attributes they write themselves
// (roving tabindex, id references, data-state...) until after hydration.
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CompositePage,
  attributes,
  expectSettledA11y,
  installInternals,
  litUpdates,
  nextFrames,
  withoutReflectedState,
} from "./wc-hydration-fixtures";

installInternals();

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
    const before = attributes(template.content);
    // The definitions are loaded when the page's HTML is parsed (happy-dom
    // does not apply parsed attributes on a later upgrade; browsers do)
    await import("minerva-design/web-components");
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

describe("server-rendered composite elements hydrate cleanly", () => {
  it("defers roving tabindex, id references and data-state until after hydration", async () => {
    const html = renderToString(<CompositePage />);
    const template = document.createElement("template");
    template.innerHTML = html;
    const before = attributes(template.content);
    await import("minerva-design/web-components");
    // the definitions are loaded while the page's HTML is parsed
    const readyState = vi
      .spyOn(document, "readyState", "get")
      .mockReturnValue("loading");
    document.body.innerHTML = `<div id="root">${html}</div>`;
    readyState.mockRestore();
    const container = document.getElementById("root")!;
    await litUpdates(container);
    // upgraded and rendered, without a host attribute of their own yet
    expect(container.querySelector("minerva-tab")!.shadowRoot).not.toBeNull();
    expect(withoutReflectedState(attributes(container))).toEqual(before);

    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const recoverable: unknown[] = [];
    await act(async () => {
      hydrateRoot(container, <CompositePage />, {
        onRecoverableError: (error) => recoverable.push(error),
      });
    });
    expect(recoverable).toEqual([]);
    expect(errors.mock.calls).toEqual([]);

    // after a frame: the attributes the items write themselves
    await nextFrames();
    await litUpdates(container);
    expectSettledA11y(container);

    expect(errors.mock.calls).toEqual([]);
  });
});
