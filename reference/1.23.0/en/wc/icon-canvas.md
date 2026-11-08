# IconCanvas

Many icons on one canvas, drawn by WebGPU, WebGL2 or WebGL in a few instanced draws, or by Canvas2D: dense pictures, maps, particles and animations of thousands of icons.

Package: minerva-design@1.23.0

Renderer: wc

Locale: en

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

### How it draws

IconCanvas places icons by position, size, rotation, color and opacity in CSS pixels, and draws them all on one canvas with the best backend available (WebGPU -> WebGL2 -> WebGL -> Canvas2D).

Geometry: each icon is flattened within a quarter of a device pixel and its stroke turned into triangles (a quad per segment, round fans for joins and caps), once per icon, stroke width and level of detail.

Batching: all meshes live in one vertex buffer and every icon is an instance (position, size, rotation, color); consecutive identical icons are one instanced draw call.

Quality: 4× MSAA smooths the edges, and a per-icon depth test draws each pixel of an icon once, so translucent icons blend exactly like the SVG stroke.

Robustness: auto skips software GPUs, a lost GPU context restarts the backend (a backend lost twice is skipped), and the canvas root reports the backend in data-renderer.

For icons in the interface, use Icon: SVG is lighter, accessible and server-rendered. Use IconCanvas when the icons are the picture.

Number of icons

Pause

Play

Paused

{{fps}} frames per second

Drawn with {{backend}}

Starting the renderer…

{{n}} animated icons

40 icons drawn with {{backend}}

drawn by {{backend}}

fell back to {{backend}}

## IconCanvas

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/icon-canvas",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "renderer",
    "typeText": "\"auto\" | \"webgpu\" | \"webgl2\" | \"webgl\" | \"canvas2d\"",
    "attribute": "renderer",
    "required": false
  },
  {
    "name": "width",
    "typeText": "number | string",
    "attribute": "width",
    "required": false
  },
  {
    "name": "height",
    "typeText": "number | string",
    "attribute": "height",
    "required": false
  },
  {
    "name": "pixelRatio",
    "typeText": "number | undefined",
    "attribute": "pixel-ratio",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  },
  {
    "name": "items",
    "typeText": "readonly IconCanvasItem[]",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend started (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## API

```json
{
  "wc:minerva-icon-canvas": {
    "kind": "element",
    "source": "web-components/src/components/icon/icon-canvas.ts",
    "className": "MinervaIconCanvas",
    "summary": "Thousands of icons on one GPU canvas.",
    "description": "Many icons of minerva-design/icons on one canvas (the `<IconCanvas>` of React): one instanced GPU draw per run of identical icons (WebGPU, WebGL2, WebGL) or Canvas2D, for dense pictures, maps, particles or animations of thousands of icons; for icons in the UI use `<minerva-icon>`. Set the icons (`IconCanvasItem`: `icon`, `x`, `y`, `size`, `color`, `rotation`, `opacity`...) as the `items` property; replace the array to redraw. The canvas fills a box of `width` × `height` (100% × 240 pixels by default; a number is in pixels, any CSS size works) and follows its size. With `renderer` `auto` it follows the page default (`setDefaultIconRenderer`) live. The host gets `data-renderer` with the backend drawing. Published as the optional entry `minerva-design/web-components/icon`.",
    "properties": [
      {
        "name": "renderer",
        "attribute": "renderer",
        "type": "\"auto\" | \"webgpu\" | \"webgl2\" | \"webgl\" | \"canvas2d\"",
        "default": "\"auto\"",
        "description": "Backend preference (`auto` follows the page default)"
      },
      {
        "name": "width",
        "attribute": "width",
        "type": "number | string",
        "default": "\"100%\"",
        "description": "Width of the canvas box: a number is in pixels, or any CSS size"
      },
      {
        "name": "height",
        "attribute": "height",
        "type": "number | string",
        "default": "240",
        "description": "Height of the canvas box: a number is in pixels, or any CSS size"
      },
      {
        "name": "pixelRatio",
        "attribute": "pixel-ratio",
        "type": "number | undefined",
        "description": "Device pixel ratio of the canvas; by default the screen's"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string | undefined",
        "description": "Accessible name of the picture (role=img); without it the canvas is hidden from assistive technologies"
      },
      {
        "name": "items",
        "type": "readonly IconCanvasItem[]",
        "default": "[]",
        "description": "Icons to draw, in painting order (later ones on top); replace the array to redraw; property only"
      },
      {
        "name": "canvas",
        "type": "HTMLCanvasElement | null",
        "readonly": true,
        "description": "The `<canvas>` drawn into, `null` until the element is rendered and connected"
      }
    ],
    "methods": [
      {
        "name": "getRenderer",
        "signature": "() => IconRendererKind | null",
        "description": "Backend drawing (`webgpu`, `webgl2`, `webgl`, `canvas2d`), `null` until it started"
      },
      {
        "name": "ready",
        "signature": "() => Promise<IconRendererKind>",
        "description": "Resolves with the backend once it started and the current items are drawn; rejects when the element is not connected or no backend can start"
      }
    ],
    "events": [
      {
        "name": "minerva-renderer-change",
        "description": "The backend started (or fell back after a GPU loss); detail: { renderer }"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "surface",
        "description": "The box the canvas is drawn in (role=img when labelled)"
      }
    ],
    "cssProperties": []
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic

items is a JavaScript property: icons placed in CSS pixels with their own size, color, rotation, stroke width and opacity, drawn on one canvas. minerva-renderer-change reports the backend.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon-canvas/wc/basic.html

```html
<div style="display: grid; gap: 8px">
  <minerva-icon-canvas
    id="icons"
    height="160"
    label="Six icons, three ways"
  ></minerva-icon-canvas>
  <small id="status" role="status">…</small>
</div>

```

### apps/docs/src/docs/pages/icon-canvas/wc/basic.ts

```tsx
// `items` is a JS property (positions in CSS px); one canvas, one GPU draw per
// run of identical icons. The backend follows setDefaultIconRenderer.
import {
  bellIcon,
  homeIcon,
  mailIcon,
  searchIcon,
  settingsIcon,
  userIcon,
} from "minerva-design/icons/core";
import type { MinervaIconCanvas } from "minerva-design/web-components/icon";

const ICONS = [
  homeIcon,
  searchIcon,
  mailIcon,
  bellIcon,
  userIcon,
  settingsIcon,
];

export function setup(root: HTMLElement) {
  const canvas = root.querySelector<MinervaIconCanvas>("#icons")!;
  const status = root.querySelector<HTMLElement>("#status")!;
  canvas.items = [
    ...ICONS.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
    ...ICONS.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 64,
      size: 32,
      color: "var(--primary-color)",
      rotation: i * 15,
    })),
    ...ICONS.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 112,
      strokeWidth: 1.5,
      opacity: 0.35 + i * 0.13,
    })),
  ];
  const onChange = (event: Event) => {
    const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
    status.textContent = `Drawn with ${renderer}`;
  };
  canvas.addEventListener("minerva-renderer-change", onChange);
  return () => canvas.removeEventListener("minerva-renderer-change", onChange);
}

```
