# HtmlPreview

Previews untrusted HTML such as email templates in a fully sandboxed iframe. The markup is sanitized with DOMPurify (fail-closed) and rendered behind a Content-Security-Policy that blocks scripts and network access.

Package: minerva-design@1.19.3

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## HtmlPreview

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/html-preview",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "html",
    "typeText": "string",
    "attribute": "html",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "viewport",
    "typeText": "\"desktop\" | \"mobile\"",
    "attribute": "viewport",
    "required": false
  },
  {
    "name": "mobileWidth",
    "typeText": "number",
    "attribute": "mobile-width",
    "required": false
  },
  {
    "name": "height",
    "typeText": "number",
    "attribute": "height",
    "required": false
  }
]
```

## API

```json
{
  "wc:minerva-html-preview": {
    "kind": "element",
    "source": "web-components/src/components/html-preview/html-preview.ts",
    "className": "MinervaHtmlPreview",
    "summary": "Sandboxed, sanitized preview of untrusted HTML.",
    "description": "Previews untrusted HTML (e.g. an email template) in a fully sandboxed iframe (`<HtmlPreview>` of React). The markup is sanitized with DOMPurify (fail-closed: an empty document when the sanitizer's self-check does not pass) and rendered behind a Content-Security-Policy that blocks scripts and network access; only inline styles and `data:` images are allowed. The iframe itself is not configurable: always `sandbox=\"\"`, no referrer. Sanitizing needs a browser DOM: during SSR the empty shell is rendered and the document is filled on the client.",
    "properties": [
      {
        "name": "html",
        "attribute": "html",
        "type": "string",
        "default": "\"\"",
        "description": "Untrusted HTML to preview (sanitized in the browser)"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Accessible title of the iframe (the React library's `title`; falls back to aria-label)"
      },
      {
        "name": "viewport",
        "attribute": "viewport",
        "type": "\"desktop\" | \"mobile\"",
        "default": "\"desktop\"",
        "description": "Full-width desktop preview or fixed-width mobile preview"
      },
      {
        "name": "mobileWidth",
        "attribute": "mobile-width",
        "type": "number",
        "default": "375",
        "description": "Width of the mobile preview in pixels (invalid values fall back to 375)"
      },
      {
        "name": "height",
        "attribute": "height",
        "type": "number",
        "default": "600",
        "description": "Height of the iframe in pixels (invalid values fall back to 600)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The scrolling container"
      },
      {
        "name": "frame",
        "description": "The sandboxed `<iframe>`"
      }
    ],
    "cssProperties": [
      {
        "name": "--html-preview-bg",
        "description": "Background color around the frame"
      },
      {
        "name": "--html-preview-frame-bg",
        "description": "Background color of the frame"
      },
      {
        "name": "--html-preview-frame-border-color",
        "description": "Border color of the frame"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:HtmlPreview": {
    "kind": "cssVars",
    "source": "react/src/components/HtmlPreview",
    "vars": [
      {
        "name": "--html-preview-bg",
        "description": "Background color around the frame"
      },
      {
        "name": "--html-preview-frame-bg",
        "description": "Background color of the frame"
      },
      {
        "name": "--html-preview-frame-border-color",
        "description": "Border color of the frame"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

The html attribute is sanitized and rendered in a sandboxed iframe; label gives the frame its accessible title.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/html-preview/wc/basic.html

```html
<minerva-html-preview
  label="Welcome email preview"
  height="220"
  html="<div style='font-family: sans-serif; padding: 24px'><h1 style='color: #4f46e5'>Welcome aboard!</h1><p>Your workspace is ready. <a href='https://example.com'>Open it</a></p></div>"
></minerva-html-preview>

```

## Example: Untrusted input

Edit the source: scripts and event handlers are removed and nothing runs, inline styles are kept.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/html-preview/wc/sanitized.html

```html
<div style="display: grid; gap: 12px">
  <label style="display: grid; gap: 4px">
    Untrusted HTML
    <textarea id="source" rows="5" style="font-family: monospace"></textarea>
  </label>
  <minerva-html-preview
    id="preview"
    label="Sanitized preview"
    height="160"
  ></minerva-html-preview>
</div>

```

### apps/docs/src/docs/pages/html-preview/wc/sanitized.ts

```tsx
// Scripts, event handlers and remote resources are removed (DOMPurify +
// CSP in a sandboxed iframe): edit the source, nothing runs.
type Preview = HTMLElement & { html: string };

export function setup(root: HTMLElement) {
  const source = root.querySelector<HTMLTextAreaElement>("#source")!;
  const preview = root.querySelector<Preview>("#preview")!;
  source.value = [
    '<p style="color: crimson">Styled text stays.</p>',
    "<script>alert('removed')</script>",
    '<img src="x" onerror="alert(\'removed\')" alt="Broken image">',
    "<button onclick=\"alert('removed')\">Inert button</button>",
  ].join("\n");
  const sync = () => (preview.html = source.value);
  sync();
  source.addEventListener("input", sync);
  return () => source.removeEventListener("input", sync);
}

```

## Example: Desktop and mobile

viewport="mobile" renders a fixed-width frame of mobile-width pixels; the markup is set through the html property.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/html-preview/wc/viewport.html

```html
<div style="display: grid; gap: 12px">
  <div role="group" aria-label="Viewport" style="display: flex; gap: 8px">
    <minerva-button id="desktop" size="small" variant="outline" active
      >Desktop</minerva-button
    >
    <minerva-button id="mobile" size="small" variant="outline"
      >Mobile (360px)</minerva-button
    >
  </div>
  <minerva-html-preview
    id="preview"
    label="Newsletter preview"
    height="260"
    mobile-width="360"
  ></minerva-html-preview>
</div>

```

### apps/docs/src/docs/pages/html-preview/wc/viewport.ts

```tsx
// viewport="mobile" renders a fixed-width frame (mobile-width pixels).
type Preview = HTMLElement & { html: string; viewport: "desktop" | "mobile" };
type Toggle = HTMLElement & { active: boolean };

const newsletter = `<table width="100%" style="font-family: sans-serif">
  <tr><td style="background: #0f172a; color: white; padding: 16px">
    <strong>Minerva Weekly</strong></td></tr>
  <tr><td style="padding: 16px">
    <h2>Three layouts for dense dashboards</h2>
    <p>Split panes, responsive grids and sticky headers, compared.</p>
  </td></tr>
</table>`;

export function setup(root: HTMLElement) {
  const preview = root.querySelector<Preview>("#preview")!;
  const desktop = root.querySelector<Toggle>("#desktop")!;
  const mobile = root.querySelector<Toggle>("#mobile")!;
  preview.html = newsletter;
  const show = (viewport: Preview["viewport"]) => () => {
    preview.viewport = viewport;
    desktop.active = viewport === "desktop";
    mobile.active = viewport === "mobile";
  };
  const onDesktop = show("desktop");
  const onMobile = show("mobile");
  desktop.addEventListener("click", onDesktop);
  mobile.addEventListener("click", onMobile);
  return () => {
    desktop.removeEventListener("click", onDesktop);
    mobile.removeEventListener("click", onMobile);
  };
}

```
