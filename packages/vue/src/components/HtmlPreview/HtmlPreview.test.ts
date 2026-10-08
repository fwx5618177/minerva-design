/**
 * @vitest-environment jsdom
 *
 * Like React, HtmlPreview's security boundary (DOMPurify) is tested under
 * jsdom: happy-dom (<= 20.14.5) deviates from the DOM spec in ways that make
 * DOMPurify drop allowed tags or skip nodes (Node.prototype.nodeName returns
 * '', NodeIterator lacks the pre-removing steps). The fail-closed behaviour
 * under happy-dom is checked by HtmlPreview.happy-dom.test.ts.
 */
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { createSSRApp, h, nextTick } from "vue";
import { renderToString } from "vue/server-renderer";
import { HtmlPreview } from ".";

const content = (wrapper: { find: (s: string) => { element: Element } }) =>
  new DOMParser().parseFromString(
    (wrapper.find("iframe").element as HTMLIFrameElement).srcdoc,
    "text/html",
  );

describe("HtmlPreview", () => {
  it("replaces the initial empty browsing context with the sanitized document", async () => {
    const wrapper = mount(HtmlPreview, {
      props: { title: "Email", html: "<h1>First document</h1>" },
    });
    await nextTick();
    const frame = wrapper.get("iframe");
    expect(content(wrapper).querySelector("h1")!.textContent).toBe(
      "First document",
    );
    expect(frame.attributes("sandbox")).toBe("");
    expect(frame.attributes("referrerpolicy")).toBe("no-referrer");
    expect(frame.attributes("title")).toBe("Email");
    expect(frame.attributes("data-part")).toBe("frame");
  });

  it("locks isolation even when callers try to override iframe attributes", async () => {
    const wrapper = mount(HtmlPreview, {
      props: { title: "Email", html: "<p>Safe</p>" },
      attrs: {
        sandbox: "allow-scripts allow-same-origin",
        srcdoc: "<script>bad()</script>",
        src: "https://example.com",
        referrerpolicy: "unsafe-url",
        allow: "camera *",
        id: "dropped",
        "data-testid": "preview",
        class: "consumer",
        style: { maxWidth: "800px" },
      },
    });
    await nextTick();
    const root = wrapper.element as HTMLElement;
    expect(root.getAttribute("data-testid")).toBe("preview");
    expect(root.className).toContain("consumer");
    expect(root.className).toContain("preview");
    expect(root.style.maxWidth).toBe("800px");
    for (const attr of ["sandbox", "srcdoc", "src", "allow", "id"]) {
      expect(root.hasAttribute(attr)).toBe(false);
    }
    const frame = wrapper.get("iframe").element;
    expect(frame.getAttribute("sandbox")).toBe("");
    expect(frame.getAttribute("referrerpolicy")).toBe("no-referrer");
    expect(frame.hasAttribute("src")).toBe(false);
    expect(frame.hasAttribute("allow")).toBe(false);
    expect(frame.hasAttribute("data-testid")).toBe(false);
    const csp = content(wrapper)
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
    expect((frame as HTMLIFrameElement).srcdoc).not.toContain("bad()");
  });

  it("removes active content and navigation while preserving email layout and data images", async () => {
    const wrapper = mount(HtmlPreview, {
      props: {
        title: "Email",
        html: `<!doctype html><html><head>
      <meta http-equiv="refresh" content="0;url=https://example.com"><base href="https://example.com">
      <style>td { color: red; }</style></head><body>
      <script>parent.localStorage.getItem('token')</script><iframe srcdoc="bad"></iframe>
      <object data="https://example.com"></object><svg onload="bad()"></svg>
      <form action="https://example.com"><input name="token"></form>
      <table role="presentation"><tr><td style="padding: 8px" onclick="bad()">Hello</td></tr></table>
      <a href="https://example.com" target="_top" ping="https://example.com">Link</a>
      <img src="https://example.com/pixel" srcset="https://example.com/pixel 2x" onerror="bad()">
      <img alt="Logo" src="data:image/png;base64,aGVsbG8=">
      </body></html>`,
      },
    });
    await nextTick();
    const doc = content(wrapper);
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

  it("updates the HTML and supports desktop or fixed mobile viewport sizing", async () => {
    const wrapper = mount(HtmlPreview, {
      props: { title: "Email", html: "<p>First</p>", viewport: "mobile" },
    });
    await nextTick();
    const frame = () => wrapper.get("iframe").element as HTMLIFrameElement;
    expect(frame().style.width).toBe("375px");
    const first = frame();
    await wrapper.setProps({
      html: "<p>Second</p>",
      mobileWidth: 390,
      height: 500,
    });
    expect(content(wrapper).body.textContent).toBe("Second");
    expect(frame()).not.toBe(first);
    expect(frame().style.width).toBe("390px");
    expect(frame().style.height).toBe("500px");
    await wrapper.setProps({ html: "", viewport: "desktop" });
    expect(frame().style.width).toBe("100%");
    expect(content(wrapper).body.textContent).toBe("");
    await wrapper.setProps({
      mobileWidth: -1,
      height: Number.NaN,
      viewport: "mobile",
    });
    expect(frame().style.width).toBe("375px");
    expect(frame().style.height).toBe("600px");
  });

  it("renders an isolated empty document during SSR", async () => {
    const markup = await renderToString(
      createSSRApp({
        render: () =>
          h(HtmlPreview, {
            html: "<img src='https://example.com'><script>bad()</script>",
            title: "Email",
          }),
      }),
    );
    expect(markup).toMatch(/<iframe[^>]* sandbox(="")?[ >]/);
    expect(markup).toContain("Content-Security-Policy");
    expect(markup).not.toContain("example.com");
    expect(markup).not.toContain("bad()");
  });
});
