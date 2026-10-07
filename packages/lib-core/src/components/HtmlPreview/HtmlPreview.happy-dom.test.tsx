import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HtmlPreview } from ".";
import { previewDocument } from "./previewDocument";

// Runs under the default happy-dom environment, whose DOM is not conforming
// enough for DOMPurify (see HtmlPreview.test.tsx): the preview must fail
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

  it("renders the hooks, forwards root props and normalizes invalid sizes", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <HtmlPreview
        ref={ref}
        html="<p>Hi</p>"
        title="Email"
        className="consumer"
        style={{ maxWidth: 800 }}
        viewport="mobile"
        mobileWidth={-1}
        height={Number.NaN}
      />,
    );
    expect(ref.current).toHaveClass("ui-html-preview", "preview", "consumer");
    expect(ref.current).toHaveAttribute("data-viewport", "mobile");
    expect(ref.current?.style.maxWidth).toBe("800px");
    const frame = container.querySelector("iframe")!;
    expect(frame).toHaveClass("ui-html-preview-frame", "frame");
    expect(frame.style.width).toBe("375px");
    expect(frame.style.height).toBe("600px");
    expect(frame.getAttribute("sandbox")).toBe("");
  });
});
