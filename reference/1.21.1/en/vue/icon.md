# Icon

One icon of the set: inline SVG by default, or a canvas drawn with WebGPU, WebGL2, WebGL or Canvas2D. Named components (SearchIcon…), the generic Icon, custom icons and icons chosen by name.

Package: minerva-design@1.21.1

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### SVG or canvas

By default an icon is an inline : it renders on the server, follows the text color through currentColor and the font size with size="1em", and is hidden from assistive technologies unless it has a title or an aria-label.

With renderer set to "auto", "webgpu", "webgl2", "webgl" or "canvas2d", the same icon is drawn on a canvas. Browsers cap live WebGL contexts at about 16, so canvas icons share one backend per page: the icons that changed are packed into an atlas, drawn in one pass and copied to their canvases. "auto" follows the global default (setDefaultIconRenderer), here the renderer bar.

Only what you import is bundled: SearchIcon brings its own path data, the canvas renderers load with the first canvas icon, and DynamicIcon (names chosen at runtime) is the only component that bundles the whole set.

### React Native and mini programs

minerva-design/native/icons has the same components for React Native (Icon, createIcon, DynamicIcon, SearchIcon…), drawn with react-native-svg from the same 24×24 path data. react-native-svg is an optional peer dependency needed by this entry only (minerva-design/native never imports it): install it with npx expo install react-native-svg, or npm install react-native-svg outside Expo. Icons stroke with the theme's text color unless color is set, size is in dp, and a title makes the icon an accessible image.

minerva-design/taro/icons has them for Taro. Mini programs cannot render inline SVG and the WeChat  rejects percent-encoded SVG, so each icon is an Image of a base64 SVG data URI (toSvgBase64DataUri, which needs no btoa). An image has no currentColor: the color is written into the SVG, by default the theme's text color of the active light or dark mode, and the image is rebuilt when the color or the mode changes. size is in px, or any CSS length such as "48rpx".

The tabBar of a mini program only takes PNG or JPG files: generate them at build time from toSvg (one file per icon, color and state) with the SVG rasterizer of your choice. Minerva ships no rasterizer.

starting…

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
