# IconCanvas

Many icons on one canvas, drawn by WebGPU, WebGL2 or WebGL in a few instanced draws, or by Canvas2D: dense pictures, maps, particles and animations of thousands of icons.

Package: minerva-design@1.20.5

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue/icons",
  "exports": [
    "IconCanvas"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "renderer",
    "type": "IconRendererPreference",
    "default": "\"auto\"",
    "required": false,
    "description": "Backend preference; `auto` follows the global default",
    "typeText": "IconRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "default": "\"100%\"",
    "required": false,
    "description": "Width (a number is in pixels)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "default": "240",
    "required": false,
    "description": "Height (a number is in pixels)",
    "typeText": "string | number"
  },
  {
    "name": "title",
    "type": "string",
    "required": false,
    "description": "Accessible name of the whole picture (`role=\"img\"`); without it the canvas is hidden from assistive technologies",
    "typeText": "string"
  },
  {
    "name": "items",
    "type": "readonly IconCanvasItem[]",
    "required": true,
    "description": "Icons to draw, in painting order (later ones on top), positions in CSS pixels",
    "typeText": "readonly IconCanvasItem[]"
  },
  {
    "name": "pixelRatio",
    "type": "number",
    "required": false,
    "description": "Device pixel ratio (`window.devicePixelRatio` by default)",
    "typeText": "number"
  }
]
```

### events

```json
[
  {
    "name": "rendererChange",
    "type": "[kind: IconRendererKind]",
    "typeText": "[kind: IconRendererKind]",
    "parameters": [
      {
        "name": "kind",
        "position": 0,
        "typeText": "IconRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/icon-canvas/vue/basic.vue

```vue
<script setup lang="ts">
// One canvas, one GPU draw per run of identical icons; positions in CSS px.
// The backend follows the global default (setDefaultIconRenderer).
import { ref } from "vue";
import { VStack } from "minerva-design/vue";
import {
  IconCanvas,
  bellIcon,
  homeIcon,
  mailIcon,
  searchIcon,
  settingsIcon,
  userIcon,
  type IconCanvasItem,
  type IconRendererKind,
} from "minerva-design/vue/icons";

const ICONS = [
  homeIcon,
  searchIcon,
  mailIcon,
  bellIcon,
  userIcon,
  settingsIcon,
];
const items: IconCanvasItem[] = [
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
const drawn = ref<IconRendererKind | null>(null);
</script>

<template>
  <VStack :gap="2">
    <IconCanvas
      :items="items"
      :height="160"
      title="Six icons, three ways"
      @renderer-change="(kind: IconRendererKind) => (drawn = kind)"
    />
    <small role="status">{{ drawn ? `Drawn with ${drawn}` : "…" }}</small>
  </VStack>
</template>

```
