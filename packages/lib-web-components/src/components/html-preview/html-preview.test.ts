/**
 * @vitest-environment jsdom
 *
 * Runs under jsdom, like lib-core's HtmlPreview tests: the security boundary
 * is the real DOMPurify, which cannot be trusted under happy-dom (its
 * Node.prototype.nodeName getter returns "" and its NodeIterator lacks the
 * spec's pre-removing steps, see lib-core's HtmlPreview.test.tsx). jsdom is
 * spec-conforming, so these tests exercise the real sanitizer end to end
 * (sanitizer-environment.test.ts proves the environment itself).
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaHtmlPreview } from "./html-preview";
import "../../elements/html-preview";
import { previewDocument } from "./preview-document";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const frame = (el: Element) => $<HTMLIFrameElement>(el, "iframe");

describe("<minerva-html-preview>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-html-preview")).toBe(MinervaHtmlPreview);
  });

  it("renders a sandboxed, referrer-less frame behind a CSP", async () => {
    const el = await mount<MinervaHtmlPreview>(
      `<minerva-html-preview label="Email"></minerva-html-preview>`,
    );
    el.html = "<p>keep</p><script>alert(1)</script>";
    await el.updateComplete;
    const iframe = frame(el);
    expect($(el, "[part=root]").classList).toContain("preview");
    expect(iframe.classList).toContain("frame");
    expect(iframe.getAttribute("sandbox")).toBe("");
    expect(iframe).toHaveAttribute("referrerpolicy", "no-referrer");
    expect(iframe).toHaveAttribute("title", "Email");
    const srcdoc = iframe.getAttribute("srcdoc")!;
    expect(srcdoc).toContain('http-equiv="Content-Security-Policy"');
    expect(srcdoc).toContain("script-src 'none'");
    // the real sanitizer ran: allowed markup kept, script removed
    expect(srcdoc).not.toContain("alert(1)");
    expect(srcdoc).toContain("<body><p>keep</p></body>");
    expect(srcdoc).toBe(previewDocument(el.html));
    expect(iframe.style.width).toBe("100%");
    expect(iframe.style.height).toBe("600px");
  });

  it("replaces the iframe when the document changes", async () => {
    const el = await mount<MinervaHtmlPreview>(
      `<minerva-html-preview label="x" html="<p>old</p>"></minerva-html-preview>`,
    );
    const first = frame(el);
    expect(first.getAttribute("srcdoc")).toContain("<p>old</p>");
    el.html = "<p>new</p>";
    await el.updateComplete;
    expect(frame(el)).not.toBe(first);
    expect(frame(el).getAttribute("srcdoc")).toContain("<p>new</p>");
  });

  it("sanitizes untrusted markup with the real DOMPurify (handlers, URLs, active content)", async () => {
    const el = await mount<MinervaHtmlPreview>(
      `<minerva-html-preview label="x"></minerva-html-preview>`,
    );
    el.html =
      '<h1 class="t" onclick="alert(1)">Title</h1>' +
      '<a href="javascript:alert(1)">link</a>' +
      '<img alt="remote" src="https://tracker.invalid/p.gif" onerror="alert(1)">' +
      '<img alt="inline" src="data:image/png;base64,AAAA">' +
      '<svg onload="alert(1)"></svg><iframe srcdoc="x"></iframe><form><input></form>' +
      "<style>p{color:red}</style><p>tail</p>";
    await el.updateComplete;
    const doc = new DOMParser().parseFromString(
      frame(el).getAttribute("srcdoc")!,
      "text/html",
    );
    expect(doc.querySelector("h1")!.outerHTML).toBe('<h1 class="t">Title</h1>');
    // links lose their href (no navigation out of the preview)
    expect(doc.querySelector("a")!.hasAttribute("href")).toBe(false);
    // remote images are dropped (no tracking), data: images kept
    expect(doc.querySelector('img[alt="remote"]')!.hasAttribute("src")).toBe(
      false,
    );
    expect(doc.querySelector('img[alt="inline"]')!.getAttribute("src")).toBe(
      "data:image/png;base64,AAAA",
    );
    expect(doc.querySelector("svg, iframe, form, input, script")).toBeNull();
    expect(doc.body.querySelector("style")!.textContent).toBe("p{color:red}");
    expect(doc.querySelector("p")!.textContent).toBe("tail");
    expect(doc.body.innerHTML).not.toMatch(/alert\(1\)|onerror|onclick/);
  });

  it("fails closed (empty body, CSP kept) when the sanitizer misbehaves", async () => {
    const nodeName = Object.getOwnPropertyDescriptor(
      Node.prototype,
      "nodeName",
    )!;
    const el = await mount<MinervaHtmlPreview>(
      `<minerva-html-preview label="x"></minerva-html-preview>`,
    );
    // happy-dom's deviation: DOMPurify still reports isSupported
    Object.defineProperty(Node.prototype, "nodeName", {
      ...nodeName,
      get: () => "",
    });
    let srcdoc: string;
    try {
      el.html = "<p>keep</p><script>alert(1)</script>";
      await el.updateComplete;
      srcdoc = frame(el).getAttribute("srcdoc")!;
    } finally {
      Object.defineProperty(Node.prototype, "nodeName", nodeName);
    }
    expect(srcdoc).toContain("<body></body>");
    expect(srcdoc).toContain('http-equiv="Content-Security-Policy"');
    expect(srcdoc).not.toContain("alert(1)");
  });

  it("simulates the mobile viewport and normalizes invalid sizes", async () => {
    const el = await mount<MinervaHtmlPreview>(
      `<minerva-html-preview label="x" viewport="mobile" mobile-width="-1" height="0"></minerva-html-preview>`,
    );
    expect(frame(el).style.width).toBe("375px");
    expect(frame(el).style.height).toBe("600px");
    el.mobileWidth = 414;
    el.height = 320;
    await el.updateComplete;
    expect(frame(el).style.width).toBe("414px");
    expect(frame(el).style.height).toBe("320px");
    expect(el.getAttribute("viewport")).toBe("mobile");
  });

  it("uses aria-label as the frame title", async () => {
    const el = await mount<MinervaHtmlPreview>(
      `<minerva-html-preview aria-label="Newsletter"></minerva-html-preview>`,
    );
    expect(frame(el)).toHaveAttribute("title", "Newsletter");
  });

  it("warns without a title", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-html-preview></minerva-html-preview>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("label"));
  });
});
