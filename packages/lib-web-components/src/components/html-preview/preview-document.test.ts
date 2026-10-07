// The real DOMPurify cannot run under happy-dom (see html-preview.test.ts):
// a stub purifier verifies the fail-closed self-check and the plumbing.
import { describe, expect, it, vi } from "vitest";

const sanitize = vi.fn();
const addHook = vi.fn();
vi.mock("dompurify", () => ({
  default: () => ({ isSupported: true, addHook, sanitize }),
}));

const { previewDocument } = await import("./preview-document");

describe("previewDocument", () => {
  it("returns the CSP shell without HTML", () => {
    expect(previewDocument()).toContain("<body></body>");
    expect(previewDocument("")).toContain("<body></body>");
    expect(sanitize).not.toHaveBeenCalled();
  });

  it("uses the sanitizer output once the self-check passes", () => {
    sanitize.mockImplementation((input: string) =>
      input.includes("onclick")
        ? '<p title="t">ok</p><img alt="a">'
        : "<p>clean</p>",
    );
    const doc = previewDocument("<p>dirty</p>");
    expect(doc).toContain("<body><p>clean</p></body>");
    expect(addHook).toHaveBeenCalledWith(
      "uponSanitizeAttribute",
      expect.any(Function),
    );
    const config = sanitize.mock.calls[1][1];
    expect(config.FORBID_TAGS).toContain("script");
    expect(config.FORBID_ATTR).toContain("href");
  });

  it("fails closed when the self-check output differs", () => {
    sanitize.mockImplementation(() => "<script>x()</script>");
    expect(previewDocument("<p>x</p>")).toContain("<body></body>");
  });

  it("drops non-data image sources in the attribute hook", () => {
    sanitize.mockImplementation(() => "");
    previewDocument("<p>x</p>");
    const hook = addHook.mock.calls.at(-1)![1];
    const remote = { attrName: "src", attrValue: "https://x", keepAttr: true };
    hook({ nodeName: "IMG" }, remote);
    expect(remote.keepAttr).toBe(false);
    const inline = {
      attrName: "src",
      attrValue: "data:image/png;base64,AAAA",
      keepAttr: true,
    };
    hook({ nodeName: "IMG" }, inline);
    expect(inline.keepAttr).toBe(true);
  });
});
