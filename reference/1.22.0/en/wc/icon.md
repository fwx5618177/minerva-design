# Icon

One icon of the set: inline SVG by default, or a canvas drawn with WebGPU, WebGL2, WebGL or Canvas2D. Named components (SearchIcon…), the generic Icon, custom icons and icons chosen by name.

Package: minerva-design@1.22.0

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/icon",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "name",
    "typeText": "string | undefined",
    "attribute": "name",
    "required": false
  },
  {
    "name": "size",
    "typeText": "number",
    "attribute": "size",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string",
    "attribute": "color",
    "required": false
  },
  {
    "name": "strokeWidth",
    "typeText": "number",
    "attribute": "stroke-width",
    "required": false
  },
  {
    "name": "absoluteStrokeWidth",
    "typeText": "boolean",
    "attribute": "absolute-stroke-width",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  },
  {
    "name": "renderer",
    "typeText": "\"svg\" | \"auto\" | \"webgpu\" | \"webgl2\" | \"webgl\" | \"canvas2d\"",
    "attribute": "renderer",
    "required": false
  },
  {
    "name": "icon",
    "typeText": "IconDefinition | undefined",
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
    "description": "Canvas mode: the backend drew the icon (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## API

```json
{
  "wc:minerva-icon": {
    "kind": "element",
    "source": "web-components/src/components/icon/icon.ts",
    "className": "MinervaIcon",
    "summary": "Icon of the Minerva icon set, as inline SVG or on a GPU canvas.",
    "description": "An icon of minerva-design/icons (the `<Icon>` of React): inline SVG by default (crisp at any size, styled by CSS, server-renderable), or a canvas drawn with WebGPU, WebGL2, WebGL or Canvas2D (`renderer`) by a backend shared by every canvas icon of the page. Set a built-in icon by `name` (`search`, `arrow-up`...) or any icon, custom ones made with `defineIcon` included, as the `icon` property. The stroke follows the text color unless `color` is set. Without `label` the icon is decorative (hidden from assistive technologies); with one it is an image with that accessible name. In canvas mode the host gets `data-renderer` with the backend drawing. Published as the optional entry `minerva-design/web-components/icon` (not part of the all-in-one entry nor of `cdn/minerva.js`: it loads the icon set `minerva-design/icons/core`). Without a build step, load the self-contained `dist/web-components/cdn/icon.js` next to `minerva.js`.",
    "properties": [
      {
        "name": "name",
        "attribute": "name",
        "type": "string | undefined",
        "description": "Name of a built-in icon (`search`, `arrow-up`...); the `icon` property wins over it"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "number",
        "default": "24",
        "description": "Width and height in pixels"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "string",
        "default": "\"currentColor\"",
        "description": "Stroke color, any CSS color (`currentColor` follows the text color)"
      },
      {
        "name": "strokeWidth",
        "attribute": "stroke-width",
        "type": "number",
        "default": "2",
        "description": "Stroke width on the 24×24 grid (scales with the size unless `absolute-stroke-width`)"
      },
      {
        "name": "absoluteStrokeWidth",
        "attribute": "absolute-stroke-width",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the stroke width in pixels whatever the size"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string | undefined",
        "description": "Accessible name: the icon becomes an image (role=img); without it the icon is hidden from assistive technologies"
      },
      {
        "name": "renderer",
        "attribute": "renderer",
        "type": "\"svg\" | \"auto\" | \"webgpu\" | \"webgl2\" | \"webgl\" | \"canvas2d\"",
        "default": "\"svg\"",
        "description": "`svg` (inline SVG), or a canvas drawn with the backend preference (`auto` follows the page default)"
      },
      {
        "name": "icon",
        "type": "IconDefinition | undefined",
        "description": "Icon definition (a built-in icon constant, or a custom icon of `defineIcon`); wins over `name`; property only"
      }
    ],
    "methods": [
      {
        "name": "getRenderer",
        "signature": "() => IconRendererKind | null",
        "description": "Backend drawing the canvas (`webgpu`, `webgl2`, `webgl`, `canvas2d`); `null` in SVG mode or until drawn"
      }
    ],
    "events": [
      {
        "name": "minerva-renderer-change",
        "description": "Canvas mode: the backend drew the icon (or fell back after a GPU loss); detail: { renderer }"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "icon",
        "description": "The <svg> (or the <canvas> in canvas mode) drawing the icon"
      }
    ],
    "cssProperties": []
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic

<minerva-icon> draws a built-in icon by name, inline with text and in the slots of other elements; with a label it becomes an image for assistive technologies.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/icon/wc/basic.html

```html
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px">
  <minerva-icon name="home"></minerva-icon>
  <minerva-icon name="search"></minerva-icon>
  <minerva-icon name="settings"></minerva-icon>
  <minerva-button>
    <minerva-icon slot="start" name="download" size="16"></minerva-icon>
    Download
  </minerva-button>
  <minerva-button color="danger" variant="outline">
    <minerva-icon slot="start" name="trash" size="16"></minerva-icon>
    Delete
  </minerva-button>
  <minerva-icon name="bell" size="32" label="Notifications"></minerva-icon>
</div>

```

## Example: Renderers

The renderer attribute draws the icon on a canvas; each icon fires minerva-renderer-change with the backend that drew it, shown under it. "auto" follows the renderer bar; a forced backend this browser lacks falls back to the next one.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon/wc/canvas.html

```html
<div id="renderers" style="display: flex; flex-wrap: wrap; gap: 24px">
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
    ></minerva-icon>
    <figcaption><code>svg</code> <small>SVG</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="auto"
    ></minerva-icon>
    <figcaption><code>auto</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="webgpu"
    ></minerva-icon>
    <figcaption><code>webgpu</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="webgl2"
    ></minerva-icon>
    <figcaption><code>webgl2</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="webgl"
    ></minerva-icon>
    <figcaption><code>webgl</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="canvas2d"
    ></minerva-icon>
    <figcaption><code>canvas2d</code> <small>…</small></figcaption>
  </figure>
</div>

```

### apps/docs/src/docs/pages/icon/wc/canvas.ts

```tsx
// Every canvas icon fires minerva-renderer-change with the backend that drew
// it ("auto" follows setDefaultIconRenderer; a forced backend that cannot
// start here falls back to the next one).
import type { MinervaIcon } from "minerva-design/web-components/icon";

export function setup(root: HTMLElement) {
  const onChange = (event: Event) => {
    const icon = event.target as MinervaIcon;
    const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
    const caption = icon.closest("figure")?.querySelector("small");
    if (caption) caption.textContent = renderer;
  };
  root.addEventListener("minerva-renderer-change", onChange);
  return () => root.removeEventListener("minerva-renderer-change", onChange);
}

```
