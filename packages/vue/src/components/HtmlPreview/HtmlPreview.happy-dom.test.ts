import { describe, expect, it } from "vitest";
import { previewDocument } from "./previewDocument";

// Runs under the default happy-dom environment, whose DOM is not conforming
// enough for DOMPurify (see HtmlPreview.test.ts): the preview must fail
// closed (empty body) instead of trusting the sanitizer.
describe("HtmlPreview (happy-dom)", () => {
  it("fails closed when the sanitizer self-check does not pass", () => {
    const doc = new DOMParser().parseFromString(
      previewDocument("<p>keep</p><script>alert(1)</script>"),
      "text/html",
    );
    expect(doc.body.innerHTML).not.toContain("alert(1)");
    expect(doc.body.innerHTML).toBe("");
    expect(
      doc.querySelector('meta[http-equiv="Content-Security-Policy"]'),
    ).not.toBeNull();
  });

  it("returns the empty shell without HTML", () => {
    expect(previewDocument()).toContain("<body></body>");
    expect(previewDocument("")).toContain("<body></body>");
  });
});
