# HtmlPreview HTML プレビュー

メールテンプレートなどの信頼できない HTML を、完全にサンドボックス化された iframe でプレビューします。マークアップは DOMPurify で無害化され（失敗時は空）、スクリプトとネットワークを遮断する CSP の下で描画されます。

Package: minerva-design@1.22.2

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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

## Example: 基本的な使い方

html 属性はサニタイズされ、サンドボックス化された iframe に描画されます。label はフレームのアクセシブルなタイトルになります。

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

## Example: 信頼できない入力

ソースを編集してみてください。スクリプトとイベントハンドラーは削除されて何も実行されず、インラインスタイルは残ります。

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

## Example: デスクトップとモバイル

viewport="mobile" は mobile-width ピクセルの固定幅フレームを描画します。マークアップは html プロパティで設定します。

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
