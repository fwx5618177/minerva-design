// Port of lib-core's HtmlPreview/previewDocument.ts (keep both in sync).
import createDOMPurify from "dompurify";
import type { Config } from "dompurify";

const policy =
  "default-src 'none'; script-src 'none'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; object-src 'none'; frame-src 'none'; font-src 'none'; media-src 'none'; form-action 'none'; base-uri 'none'";
const tags =
  "a abbr b bdi bdo blockquote br caption center code col colgroup dd del div dl dt em figcaption figure h1 h2 h3 h4 h5 h6 hr i img ins li ol p pre s section small span strong style sub sup table tbody td tfoot th thead tr u ul wbr".split(
    " ",
  );
const attributes =
  "alt title class style lang dir role width height align valign bgcolor border cellpadding cellspacing colspan rowspan scope src".split(
    " ",
  );
const config: Config & { RETURN_TRUSTED_TYPE: false } = {
  ALLOWED_TAGS: tags,
  ALLOWED_ATTR: attributes,
  ALLOW_DATA_ATTR: false,
  ALLOW_ARIA_ATTR: true,
  FORBID_TAGS: [
    "base",
    "meta",
    "link",
    "script",
    "form",
    "input",
    "button",
    "iframe",
    "object",
    "embed",
    "svg",
    "math",
  ],
  FORBID_ATTR: [
    "href",
    "srcdoc",
    "srcset",
    "action",
    "formaction",
    "target",
    "ping",
    "id",
    "name",
  ],
  FORCE_BODY: true,
  RETURN_TRUSTED_TYPE: false,
};

/**
 * Known-answer self-test. `isSupported` only means "the APIs exist" — a non-conforming DOM
 * (e.g. one whose Node.prototype.nodeName getter returns '') can report support yet keep
 * <script> and drop allowed tags. If the sanitizer cannot reproduce this exact output, the
 * preview fails closed (empty body) instead of trusting it.
 */
const probeInput =
  '<p title="t" onclick="x()">ok</p><script>x()</script><img alt="a" src="https://x.invalid/p" onerror="x()">';
const probeOutput = '<p title="t">ok</p><img alt="a">';

export function previewDocument(html?: string): string {
  let body = "";
  if (html && typeof window !== "undefined") {
    // A private instance keeps other consumers' DOMPurify hooks/config out of this boundary.
    const purifier = createDOMPurify(window);
    if (purifier.isSupported) {
      purifier.addHook("uponSanitizeAttribute", (node, attribute) => {
        if (
          attribute.attrName === "src" &&
          (node.nodeName !== "IMG" ||
            !/^data:image\/(?:png|jpeg|gif|webp|avif);base64,[a-z0-9+/=\s]+$/i.test(
              attribute.attrValue,
            ))
        ) {
          attribute.keepAttr = false;
        }
      });
      if (purifier.sanitize(probeInput, config) === probeOutput) {
        body = purifier.sanitize(html, config);
      }
    }
  }
  // CSP precedes all untrusted markup; callers cannot replace this shell or its policy.
  return `<!doctype html><html><head><meta http-equiv="Content-Security-Policy" content="${policy}"><meta name="referrer" content="no-referrer"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>${body}</body></html>`;
}
