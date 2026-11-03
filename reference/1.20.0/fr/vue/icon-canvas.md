# IconCanvas

De nombreuses icônes sur un seul canvas, dessinées par WebGPU, WebGL2 ou WebGL en quelques dessins instanciés, ou par Canvas2D : images denses, cartes, particules et animations de milliers d’icônes.

Package: minerva-design@1.20.0

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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
