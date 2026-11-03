# Icon

Une icône du jeu : SVG inline par défaut, ou un canvas dessiné avec WebGPU, WebGL2, WebGL ou Canvas2D. Composants nommés (SearchIcon…), Icon générique, icônes personnalisées et icônes choisies par nom.

Package: minerva-design@1.19.3

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### SVG ou canvas

Par défaut, une icône est un  inline : il se rend côté serveur, suit la couleur du texte grâce à currentColor et la taille de police avec size="1em", et reste masqué aux technologies d’assistance sauf s’il a un title ou un aria-label.

Avec renderer à "auto", "webgpu", "webgl2", "webgl" ou "canvas2d", la même icône est dessinée sur un canvas. Les navigateurs limitent les contextes WebGL actifs à environ 16 ; les icônes canvas partagent donc un seul backend par page : les icônes modifiées sont regroupées dans un atlas, dessinées en une passe puis copiées dans leurs canvas. "auto" suit la valeur globale par défaut (setDefaultIconRenderer), ici la barre de rendu.

Seul ce que vous importez est embarqué : SearchIcon apporte ses propres données de tracé, les rendus canvas se chargent avec la première icône canvas, et DynamicIcon (noms choisis à l’exécution) est le seul composant qui embarque tout le jeu.

### React Native et mini-programmes

minerva-design/native/icons fournit les mêmes composants pour React Native (Icon, createIcon, DynamicIcon, SearchIcon…), dessinés avec react-native-svg à partir des mêmes tracés sur la grille 24×24. react-native-svg est une dépendance pair optionnelle, requise par cette seule entrée (minerva-design/native ne l’importe jamais) : installez-la avec npx expo install react-native-svg, ou npm install react-native-svg hors d’Expo. Les icônes prennent la couleur de texte du thème sauf si color est fourni, size est en dp, et un title fait de l’icône une image accessible.

minerva-design/taro/icons les fournit pour Taro. Les mini-programmes ne savent pas afficher de SVG inline et l’ de WeChat refuse le SVG encodé en pourcentages : chaque icône est donc une Image dont la source est une URI de données SVG en base64 (toSvgBase64DataUri, sans btoa). Une image n’a pas de currentColor : la couleur est écrite dans le SVG, par défaut la couleur de texte du thème pour le mode clair ou sombre actif, et l’image est régénérée quand la couleur ou le mode change. size est en px, ou toute longueur CSS comme "48rpx".

La tabBar d’un mini-programme n’accepte que des fichiers PNG ou JPG : générez-les au build à partir de toSvg (un fichier par icône, couleur et état) avec le rastériseur SVG de votre choix. Minerva n’en fournit pas.

démarrage…

```tsx
// npx expo install react-native-svg (optional peer dependency of this entry)
import { DynamicIcon, Icon, SearchIcon, searchIcon } from "minerva-design/native/icons";

<SearchIcon />                                          // 24dp, theme text color
<SearchIcon size={20} color="#2563eb" title="Search" /> // accessible image
<Icon icon={searchIcon} strokeWidth={1.5} absoluteStrokeWidth />
<DynamicIcon name={item.icon} />                        // bundles the whole set
```

```tsx
import { Icon, SearchIcon, settingsIcon } from "minerva-design/taro/icons";

<SearchIcon />                                          // 24px base64 SVG image
<SearchIcon size="48rpx" color="#2563eb" title="Search" />
<Icon icon={settingsIcon} strokeWidth={1.5} />          // theme text color, per mode
```

```ts
// build-time Node script: the tabBar only takes PNG / JPG files
import { writeFileSync } from "node:fs";
import { homeIcon, toSvg } from "minerva-design/icons/core";

for (const [state, color] of [["normal", "#6b7280"], ["active", "#2563eb"]]) {
  const svg = toSvg(homeIcon, { size: 81, color });
  // rasterize: the SVG -> PNG converter of your choice
  writeFileSync(`src/assets/tab-home-${state}.png`, await rasterize(svg));
}
```

## Icon

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue/icons",
  "exports": [
    "Icon"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "color",
    "type": "string",
    "default": "\"currentColor\"",
    "required": false,
    "description": "Stroke color, any CSS color",
    "typeText": "string"
  },
  {
    "name": "size",
    "type": "string | number",
    "default": "24",
    "required": false,
    "description": "Width and height (a number is in pixels; canvas renderers also follow CSS sizes such as `\"1em\"`)",
    "typeText": "string | number"
  },
  {
    "name": "renderer",
    "type": "IconRenderer",
    "default": "\"svg\"",
    "required": false,
    "description": "Inline SVG (default), or a `<canvas>` drawn by a backend shared by every\ncanvas icon of the page: `auto` (the global default, see\n`setDefaultIconRenderer`), `webgpu`, `webgl2`, `webgl` or `canvas2d`",
    "typeText": "IconRenderer"
  },
  {
    "name": "strokeWidth",
    "type": "number",
    "default": "2",
    "required": false,
    "description": "Stroke width on the 24×24 grid (scales with the size)",
    "typeText": "number"
  },
  {
    "name": "absoluteStrokeWidth",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Keeps `strokeWidth` in pixels whatever the size",
    "typeText": "boolean"
  },
  {
    "name": "title",
    "type": "string",
    "required": false,
    "description": "Accessible name: the icon becomes `role=\"img\"`; without it (or an `aria-label`) the icon is hidden from assistive technologies",
    "typeText": "string"
  },
  {
    "name": "icon",
    "type": "IconDefinition",
    "required": true,
    "description": "The icon to draw: a built-in one (e.g. `searchIcon`) or a `defineIcon` result",
    "typeText": "IconDefinition"
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

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon/vue/basic.vue

```vue
<script setup lang="ts">
import { Button, HStack } from "minerva-design/vue";
import {
  DownloadIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
} from "minerva-design/vue/icons";
</script>

<template>
  <HStack :gap="4" align="center" wrap>
    <HomeIcon />
    <SearchIcon />
    <SettingsIcon />
    <Button>
      <template #start-icon><DownloadIcon :size="16" /></template>
      Download
    </Button>
    <Button color="danger" variant="outline">
      <template #start-icon><TrashIcon :size="16" /></template>
      Delete
    </Button>
  </HStack>
</template>

```

## Example: canvas

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/icon/vue/canvas.vue

```vue
<script setup lang="ts">
// "auto" follows the global default (setDefaultIconRenderer); a forced
// backend that cannot start here falls back to the next one.
import { reactive } from "vue";
import { HStack, VStack } from "minerva-design/vue";
import {
  Icon,
  settingsIcon,
  type IconRenderer,
  type IconRendererKind,
} from "minerva-design/vue/icons";

const RENDERERS: IconRenderer[] = [
  "svg",
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];
const drawn = reactive<Partial<Record<IconRenderer, IconRendererKind>>>({});
</script>

<template>
  <HStack :gap="5" wrap>
    <VStack
      v-for="renderer in RENDERERS"
      :key="renderer"
      :gap="1"
      align="center"
    >
      <Icon
        :icon="settingsIcon"
        :size="40"
        color="var(--primary-color)"
        :renderer="renderer"
        @renderer-change="(kind: IconRendererKind) => (drawn[renderer] = kind)"
      />
      <code>{{ renderer }}</code>
      <small>{{ renderer === "svg" ? "SVG" : (drawn[renderer] ?? "…") }}</small>
    </VStack>
  </HStack>
</template>

```
