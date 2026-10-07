/**
 * @vitest-environment jsdom
 *
 * Environment self-check: proves that DOMPurify really sanitizes in the test
 * DOM, so the security assertions of HtmlPreview.test.tsx can be trusted. With a
 * non-conforming DOM (e.g. happy-dom, see the header of HtmlPreview.test.tsx)
 * these tests fail instead of letting the security assertions pass vacuously on
 * a sanitizer that drops too much / too little.
 */
import createDOMPurify from "dompurify";
import { afterEach, describe, expect, it } from "vitest";
import { previewDocument } from "./previewDocument";

const payloads: Array<[name: string, html: string]> = [
  ["script element", "<p>keep</p><script>alert(1)</script>"],
  ["event handler", '<img src="x" onerror="alert(1)">'],
  [
    "handler after a removed sibling",
    '<script>alert(1)</script><img alt="a" onerror="alert(1)">',
  ],
  ["javascript: URL", '<a href="javascript:alert(1)">x</a>'],
  [
    "javascript: URL with control-char obfuscation",
    '<a href="jav&#x09;ascript:alert(1)">x</a>',
  ],
  ["svg script", "<svg><script>alert(1)</script></svg>"],
  ["svg onload", '<svg onload="alert(1)"><circle r="1"/></svg>'],
  [
    "svg xlink:href",
    '<svg><a xlink:href="javascript:alert(1)"><text>x</text></a></svg>',
  ],
  [
    "mathml mglyph mXSS",
    "<math><mi><mglyph><style><img src=x onerror=alert(1)></style></mglyph></mi></math>",
  ],
  [
    "form/math namespace confusion",
    "<form><math><mtext></form><form><mglyph><style></math><img src onerror=alert(1)>",
  ],
  [
    "noscript attribute breakout",
    '<noscript><p title="</noscript><img src=x onerror=alert(1)>">',
  ],
  [
    "template content",
    "<template><script>alert(1)</script><img src=x onerror=alert(1)></template>",
  ],
  ["iframe srcdoc", '<iframe srcdoc="<script>alert(1)</script>"></iframe>'],
  [
    "meta refresh",
    '<meta http-equiv="refresh" content="0;url=javascript:alert(1)">',
  ],
];

function assertInert(out: string) {
  const doc = new DOMParser().parseFromString(
    `<!doctype html><body>${out}`,
    "text/html",
  );
  expect(doc.querySelector("script, iframe, meta, object, embed")).toBeNull();
  for (const el of Array.from(doc.querySelectorAll("*"))) {
    for (const attr of Array.from(el.attributes)) {
      expect(attr.name, `${el.tagName} keeps ${attr.name}`).not.toMatch(/^on/i);
      expect(
        Array.from(attr.value)
          .filter((ch) => ch.charCodeAt(0) > 0x20)
          .join(""),
        `${el.tagName}[${attr.name}]`,
      ).not.toMatch(/^javascript:/i);
    }
  }
  expect(out).not.toMatch(/alert\(1\)/);
}

const parse = (html: string) =>
  new DOMParser().parseFromString(html, "text/html");

describe("sanitizer environment", () => {
  const nodeName = Object.getOwnPropertyDescriptor(Node.prototype, "nodeName")!;
  afterEach(() => {
    Object.defineProperty(Node.prototype, "nodeName", nodeName);
  });

  it("keeps allowed markup and every node after a removed one (live NodeIterator semantics)", () => {
    const purifier = createDOMPurify(window);
    expect(purifier.isSupported).toBe(true);
    expect(
      purifier.sanitize(
        '<p>keep</p><script>alert(1)</script><img alt="a" onerror="alert(1)"><b>tail</b>',
      ),
    ).toBe('<p>keep</p><img alt="a"><b>tail</b>');
  });

  it.each(payloads)("default DOMPurify neutralizes: %s", (_name, html) => {
    assertInert(createDOMPurify(window).sanitize(html));
  });

  it.each(payloads)("previewDocument neutralizes: %s", (_name, html) => {
    const doc = parse(previewDocument(`<p class="marker">kept</p>${html}`));
    // Positive control: the sanitizer actually ran (a fail-closed empty body must not pass vacuously).
    expect(doc.querySelector("p.marker")!.textContent).toBe("kept");
    // Only the shell's own CSP/referrer/viewport metas survive.
    expect(doc.querySelectorAll("meta")).toHaveLength(3);
    expect(
      doc.querySelector("svg, math, form, template, noscript, [href]"),
    ).toBeNull();
    assertInert(doc.body.innerHTML);
  });

  it("leaves CSS url() to the CSP, which only allows inline styles and data: images", () => {
    const doc = parse(
      previewDocument(
        '<style>@import url("https://example.com/x.css");</style><div style="background:url(https://example.com/p)">x</div>',
      ),
    );
    expect(doc.querySelector("div")!.textContent).toBe("x");
    const csp = doc.querySelector(
      'meta[http-equiv="Content-Security-Policy"]',
    )!;
    const rules = Object.fromEntries(
      csp
        .getAttribute("content")!
        .split(";")
        .map((rule) => {
          const [key, ...values] = rule.trim().split(/\s+/);
          return [key, values.join(" ")];
        }),
    );
    expect(rules).toMatchObject({
      "default-src": "'none'",
      "style-src": "'unsafe-inline'",
      "img-src": "data:",
      "font-src": "'none'",
    });
    expect(csp.getAttribute("content")).not.toMatch(/https?:|\*/);
    expect(doc.head.firstElementChild).toBe(csp);
  });

  it("fails closed on a non-conforming DOM where DOMPurify still reports isSupported", () => {
    // Reproduce happy-dom's Node.prototype.nodeName (always ''), which DOMPurify reads via the cached getter.
    Object.defineProperty(Node.prototype, "nodeName", {
      ...nodeName,
      get: () => "",
    });
    expect(createDOMPurify(window).isSupported).toBe(true);
    const out = previewDocument("<p>keep</p><script>alert(1)</script>");
    Object.defineProperty(Node.prototype, "nodeName", nodeName);
    const doc = parse(out);
    expect(doc.body.innerHTML).toBe("");
    expect(
      doc.querySelector('meta[http-equiv="Content-Security-Policy"]'),
    ).not.toBeNull();
  });
});
