# HtmlPreview HTML 预览

在完全沙箱化的 iframe 中预览不可信 HTML（如邮件模板）。标记经 DOMPurify 消毒（失败即清空），并在禁止脚本与网络访问的内容安全策略下渲染。

Package: minerva-design@1.23.0

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## HtmlPreview

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "HtmlPreview"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "html",
    "source": "packages/react/src/components/HtmlPreview/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Untrusted HTML to preview (sanitized with DOMPurify in the browser)"
  },
  {
    "name": "title",
    "source": "packages/react/src/components/HtmlPreview/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Accessible title of the iframe"
  },
  {
    "name": "viewport",
    "source": "packages/react/src/components/HtmlPreview/types.ts",
    "kind": "enum",
    "values": [
      "desktop",
      "mobile"
    ],
    "typeText": "HtmlPreviewViewport | undefined",
    "typeRef": "type:3dd2751813f0dc06d47d",
    "default": "desktop",
    "required": false,
    "description": "Full-width desktop preview or a fixed-width mobile preview"
  },
  {
    "name": "mobileWidth",
    "source": "packages/react/src/components/HtmlPreview/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 375,
    "required": false,
    "description": "Width of the mobile preview in pixels (invalid values fall back to 375)"
  },
  {
    "name": "height",
    "source": "packages/react/src/components/HtmlPreview/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 600,
    "required": false,
    "description": "Height of the iframe in pixels (invalid values fall back to 600)"
  }
]
```

## API

```json
{
  "HtmlPreviewProps": {
    "source": "react/src/components/HtmlPreview/types.ts",
    "description": "Props of `HtmlPreview`. The iframe itself is not configurable: it is always sandboxed (`sandbox=\"\"`), has no referrer and renders a sanitized document behind a strict Content-Security-Policy. `data-*` attributes go to the root.",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "html",
        "type": "string",
        "required": true,
        "description": "Untrusted HTML to preview (sanitized with DOMPurify in the browser)"
      },
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Accessible title of the iframe"
      },
      {
        "name": "viewport",
        "type": "HtmlPreviewViewport",
        "required": false,
        "default": "\"desktop\"",
        "description": "Full-width desktop preview or a fixed-width mobile preview"
      },
      {
        "name": "mobileWidth",
        "type": "number",
        "required": false,
        "default": "375",
        "description": "Width of the mobile preview in pixels (invalid values fall back to 375)"
      },
      {
        "name": "height",
        "type": "number",
        "required": false,
        "default": "600",
        "description": "Height of the iframe in pixels (invalid values fall back to 600)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name of the root element"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the root element"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root `<div>` element"
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

## Example: 基础用法

保留内联样式与 data: 图片；移除脚本、表单、链接与远程图片。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/html-preview/demos/basic.tsx

```tsx
import { HtmlPreview } from "minerva-design";

const email = `
<style>
  .card { font-family: sans-serif; max-width: 480px; margin: 24px auto; padding: 24px;
          border: 1px solid #ddd; border-radius: 8px; }
  .cta { display: inline-block; padding: 8px 16px; background: #4f46e5; color: #fff; }
</style>
<div class="card">
  <h2>Welcome aboard!</h2>
  <p>Thanks for signing up. Scripts, forms and remote images are removed.</p>
  <script>alert("never runs")</script>
  <img src="https://example.com/tracking-pixel.png" alt="tracking pixel">
  <span class="cta">Get started</span>
</div>`;

export default function BasicDemo() {
  return (
    <HtmlPreview title="Welcome email preview" html={email} height={320} />
  );
}

```

## Example: 视口

viewport="mobile" 渲染固定宽度（mobileWidth）的预览；desktop 铺满容器。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/html-preview/demos/viewports.tsx

```tsx
import { useState } from "react";
import { Button, HtmlPreview, type HtmlPreviewViewport } from "minerva-design";

const html = `<div style="font-family: sans-serif; padding: 16px">
  <h3>Responsive newsletter</h3>
  <p>Resize the preview between desktop and mobile widths.</p>
</div>`;

export default function ViewportsDemo() {
  const [viewport, setViewport] = useState<HtmlPreviewViewport>("mobile");
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Button
        color="neutral"
        variant="outline"
        size="small"
        onClick={() =>
          setViewport((v) => (v === "mobile" ? "desktop" : "mobile"))
        }
      >
        Switch to {viewport === "mobile" ? "desktop" : "mobile"}
      </Button>
      <HtmlPreview
        title="Newsletter preview"
        html={html}
        viewport={viewport}
        mobileWidth={360}
        height={240}
      />
    </div>
  );
}

```
