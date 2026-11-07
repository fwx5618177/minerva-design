# HtmlPreview

Prévisualise du HTML non fiable, comme des modèles d'e-mail, dans une iframe entièrement isolée. Le balisage est assaini avec DOMPurify (échec sûr) et rendu derrière une Content-Security-Policy qui bloque les scripts et le réseau.

Package: minerva-design@1.22.2

Renderer: react

Locale: fr

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

## Example: Utilisation de base

Les styles en ligne et les images data: sont conservés ; scripts, formulaires, liens et images distantes sont supprimés.

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

## Example: Fenêtres d'affichage

viewport="mobile" affiche un aperçu à largeur fixe (mobileWidth) ; desktop remplit le conteneur.

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
