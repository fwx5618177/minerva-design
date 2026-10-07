// happy-dom's DOM is not conforming enough for DOMPurify (Node.prototype
// .nodeName returns "", NodeIterator lacks the pre-removing steps: see
// lib-core's HtmlPreview.test.tsx), so the real sanitizer fails its
// self-check here and the preview fails closed. The plumbing (probe, hook,
// config) is verified with a stub purifier in preview-document.test.ts.
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
    expect($(el, "[part=base]").classList).toContain("preview");
    expect(iframe.classList).toContain("frame");
    expect(iframe.getAttribute("sandbox")).toBe("");
    expect(iframe).toHaveAttribute("referrerpolicy", "no-referrer");
    expect(iframe).toHaveAttribute("title", "Email");
    const srcdoc = iframe.getAttribute("srcdoc")!;
    expect(srcdoc).toContain('http-equiv="Content-Security-Policy"');
    expect(srcdoc).toContain("script-src 'none'");
    // fails closed under happy-dom: never the raw markup
    expect(srcdoc).not.toContain("alert(1)");
    expect(srcdoc).toBe(previewDocument(el.html));
    expect(iframe.style.width).toBe("100%");
    expect(iframe.style.height).toBe("600px");
  });

  it("replaces the iframe when the document changes", async () => {
    const el = await mount<MinervaHtmlPreview>(
      `<minerva-html-preview label="x"></minerva-html-preview>`,
    );
    const first = frame(el);
    // what a sanitized update produces in a browser
    (el as unknown as { doc: string }).doc = "<!doctype html><p>new</p>";
    await el.updateComplete;
    expect(frame(el)).not.toBe(first);
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
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await mount(`<minerva-html-preview></minerva-html-preview>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("label"));
  });
});
