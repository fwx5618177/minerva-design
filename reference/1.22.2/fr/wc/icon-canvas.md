# IconCanvas

De nombreuses icônes sur un seul canvas, dessinées par WebGPU, WebGL2 ou WebGL en quelques dessins instanciés, ou par Canvas2D : images denses, cartes, particules et animations de milliers d’icônes.

Package: minerva-design@1.22.2

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### Comment il dessine

IconCanvas place les icônes par position, taille, rotation, couleur et opacité en pixels CSS, et les dessine toutes sur un seul canvas avec le meilleur backend disponible (WebGPU -> WebGL2 -> WebGL -> Canvas2D).

Géométrie : chaque icône est aplatie à un quart de pixel physique près et son trait converti en triangles (un quadrilatère par segment, des éventails arrondis pour les jointures et les extrémités), une fois par icône, épaisseur de trait et niveau de détail.

Regroupement : tous les maillages résident dans un seul tampon de sommets et chaque icône est une instance (position, taille, rotation, couleur) ; des icônes identiques consécutives forment un seul appel de dessin instancié.

Qualité : le MSAA 4× lisse les bords, et un test de profondeur par icône dessine chaque pixel d’une icône une seule fois, si bien que les icônes translucides se mélangent exactement comme le trait SVG.

Robustesse : auto ignore les GPU logiciels, un contexte GPU perdu redémarre le backend (un backend perdu deux fois est ignoré), et la racine du canvas indique le backend dans data-renderer.

Pour les icônes de l’interface, utilisez Icon : le SVG est plus léger, accessible et rendu côté serveur. Utilisez IconCanvas quand les icônes sont l’image.

Nombre d’icônes

Pause

Lecture

En pause

{{fps}} images par seconde

Dessiné avec {{backend}}

Démarrage du rendu…

{{n}} icônes animées

40 icônes dessinées avec {{backend}}

dessiné par {{backend}}

repli sur {{backend}}

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

## Example: Utilisation de base

items est une propriété JavaScript : des icônes placées en pixels CSS avec leur propre taille, couleur, rotation, épaisseur de trait et opacité, dessinées sur un seul canvas. minerva-renderer-change indique le backend.

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
