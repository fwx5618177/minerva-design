/**
 * @vitest-environment jsdom
 *
 * One of the two jsdom test files of React (the other one is
 * sanitizer-environment.test.ts next to it). HtmlPreview's security boundary is
 * DOMPurify, which cannot be trusted under happy-dom (<= 20.14.5) because of two
 * deviations from the DOM spec:
 *   1. The Node.prototype.nodeName getter always returns '' (subclasses override
 *      it). DOMPurify caches and calls this prototype getter to resist DOM
 *      clobbering -> every tag name is '' -> allowed tags are removed.
 *   2. NodeIterator is a thin TreeWalker wrapper without the spec's
 *      "NodeIterator pre-removing steps": after DOMPurify removes the current
 *      node the iterator walks into the detached subtree and the following
 *      siblings (e.g. <img onerror>) are never inspected.
 * (2) would require tracking live iterators on every DOM removal path and
 * cannot be patched cleanly from a test, so these two files run under jsdom.
 */
import { act, useLayoutEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { HtmlPreview } from "./HtmlPreview";

let container: HTMLDivElement;
let root: Root;
beforeEach(() => {
  (
    globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});
function content() {
  return new DOMParser().parseFromString(
    container.querySelector("iframe")!.srcdoc,
    "text/html",
  );
}

describe("HtmlPreview", () => {
  it("replaces the initial empty browsing context before showing the first non-empty document", () => {
    let initialFrame: HTMLIFrameElement | null = null;
    function FirstCommit() {
      useLayoutEffect(() => {
        initialFrame = container.querySelector("iframe");
      }, []);
      return <HtmlPreview title="Email" html="<h1>First document</h1>" />;
    }
    act(() => root.render(<FirstCommit />));
    const frame = container.querySelector("iframe")!;
    expect(initialFrame).not.toBeNull();
    expect(frame).not.toBe(initialFrame);
    expect(content().querySelector("h1")!.textContent).toBe("First document");
    expect(frame.getAttribute("sandbox")).toBe("");
  });

  it("locks isolation and CSP even when untyped callers try to override iframe props", () => {
    const overrides = {
      sandbox: "allow-scripts allow-same-origin",
      srcDoc: "<script>bad()</script>",
      src: "https://example.com",
      referrerPolicy: "unsafe-url",
      allow: "camera *",
    };
    act(() =>
      root.render(
        <HtmlPreview {...overrides} html="<p>Safe</p>" title="Email" />,
      ),
    );
    const frame = container.querySelector("iframe")!;
    expect(frame.getAttribute("sandbox")).toBe("");
    expect(frame.getAttribute("referrerpolicy")).toBe("no-referrer");
    expect(frame.hasAttribute("src")).toBe(false);
    expect(frame.hasAttribute("allow")).toBe(false);
    expect(frame.title).toBe("Email");
    const csp = content()
      .querySelector('meta[http-equiv="Content-Security-Policy"]')!
      .getAttribute("content")!;
    for (const directive of [
      "default-src 'none'",
      "script-src 'none'",
      "connect-src 'none'",
      "form-action 'none'",
      "object-src 'none'",
      "base-uri 'none'",
      "img-src data:",
      "style-src 'unsafe-inline'",
    ]) {
      expect(csp).toContain(directive);
    }
    expect(frame.srcdoc).not.toContain("bad()");
    expect(container.querySelector("p")).toBeNull();
  });

  it("removes active content and navigation while preserving HTML email layout and data images", () => {
    act(() =>
      root.render(
        <HtmlPreview
          title="Email"
          html={`<!doctype html><html><head>
      <meta http-equiv="refresh" content="0;url=https://example.com"><base href="https://example.com">
      <style>td { color: red; }</style></head><body>
      <script>parent.localStorage.getItem('token')</script><iframe srcdoc="bad"></iframe>
      <object data="https://example.com"></object><svg onload="bad()"></svg>
      <form action="https://example.com"><input name="token"></form>
      <table role="presentation"><tr><td style="padding: 8px" onclick="bad()">Hello</td></tr></table>
      <a href="https://example.com" target="_top" ping="https://example.com">Link</a>
      <img src="https://example.com/pixel" srcset="https://example.com/pixel 2x" onerror="bad()">
      <img alt="Logo" src="data:image/png;base64,aGVsbG8=">
      </body></html>`}
        />,
      ),
    );
    const doc = content();
    expect(
      doc.querySelector(
        'script, iframe, object, svg, form, input, base, meta[http-equiv="refresh"]',
      ),
    ).toBeNull();
    expect(
      doc.querySelector(
        "[onclick], [onerror], [href], [target], [ping], [srcset]",
      ),
    ).toBeNull();
    expect(doc.querySelector("td")!.textContent).toBe("Hello");
    expect(doc.querySelector("td")!.getAttribute("style")).toBe("padding: 8px");
    expect(doc.querySelector("style")!.textContent).toContain("color: red");
    expect(doc.querySelector('img[alt="Logo"]')!.getAttribute("src")).toBe(
      "data:image/png;base64,aGVsbG8=",
    );
    expect(doc.querySelector('img[src^="https:"]')).toBeNull();
  });

  it("updates HTML and supports desktop or fixed mobile viewport sizing", () => {
    act(() =>
      root.render(
        <HtmlPreview title="Email" html="<p>First</p>" viewport="mobile" />,
      ),
    );
    expect(container.querySelector("iframe")!.style.width).toBe("375px");
    act(() =>
      root.render(
        <HtmlPreview
          title="Email"
          html="<p>Second</p>"
          viewport="mobile"
          mobileWidth={390}
          height={500}
        />,
      ),
    );
    expect(content().body.textContent).toBe("Second");
    expect(container.querySelector("iframe")!.style.width).toBe("390px");
    expect(container.querySelector("iframe")!.style.height).toBe("500px");
    act(() =>
      root.render(<HtmlPreview title="Email" html="" viewport="desktop" />),
    );
    expect(container.querySelector("iframe")!.style.width).toBe("100%");
    expect(content().body.textContent).toBe("");
  });

  it("keeps CSS imports behind the inline-only CSP and removes network and parent-access markup", () => {
    act(() =>
      root.render(
        <HtmlPreview
          title="Email"
          html={`
      <style>@import url("https://example.com/remote.css"); p { background-image: url("https://example.com/pixel"); }</style>
      <link rel="stylesheet" href="https://example.com/remote.css">
      <iframe srcdoc="<script>parent.localStorage.getItem('token')</script>"></iframe>
      <script>parent.document.cookie; parent.sessionStorage.getItem('token')</script>
      <form action="https://example.com"><button formaction="https://example.com">Send</button></form>
      <p>Safe template</p><img alt="Remote" src="https://example.com/pixel">
    `}
        />,
      ),
    );
    const doc = content();
    expect(
      doc.querySelector('script, iframe, link, form, button, [src^="http"]'),
    ).toBeNull();
    expect(doc.body.textContent).not.toMatch(
      /parent\.(?:localStorage|sessionStorage|document)/,
    );
    expect(doc.querySelector('img[alt="Remote"]')!.hasAttribute("src")).toBe(
      false,
    );
    expect(doc.querySelector("p")!.textContent).toBe("Safe template");
    const csp = doc
      .querySelector('meta[http-equiv="Content-Security-Policy"]')!
      .getAttribute("content")!;
    expect(csp.split(";").map((rule) => rule.trim())).toContain(
      "style-src 'unsafe-inline'",
    );
    expect(csp).not.toContain("https:");
    expect(container.querySelector("iframe")!.getAttribute("sandbox")).toBe("");
  });

  it("renders an isolated empty document during SSR before client-side parsing", () => {
    const markup = renderToString(
      <HtmlPreview
        html="<img src='https://example.com'><script>bad()</script>"
        title="Email"
      />,
    );
    expect(markup).toContain('sandbox=""');
    expect(markup).toContain("Content-Security-Policy");
    expect(markup).not.toContain("example.com");
    expect(markup).not.toContain("bad()");
  });
});

describe("HtmlPreview native attributes", () => {
  it("forwards data-* attributes to the root, never to the iframe", () => {
    act(() =>
      root.render(
        <HtmlPreview html="<p>x</p>" title="Email" data-testid="preview" />,
      ),
    );
    const preview = container.querySelector('[data-testid="preview"]')!;
    expect(preview).toBe(container.firstElementChild);
    expect(container.querySelector("iframe")).not.toHaveAttribute(
      "data-testid",
    );
  });
});
