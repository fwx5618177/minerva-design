# Icon

One icon of the set: inline SVG by default, or a canvas drawn with WebGPU, WebGL2, WebGL or Canvas2D. Named components (SearchIcon…), the generic Icon, custom icons and icons chosen by name.

Package: minerva-design@1.20.6

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnIcon. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnIcon"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "icon",
    "typeText": "IconDefinition",
    "required": true,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "size",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "strokeWidth",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "absoluteStrokeWidth",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "title",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "renderer",
    "typeText": "IconRenderer",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  }
]
```

### events

```json
[
  {
    "name": "rendererChange",
    "typeText": "IconRendererKind",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts",
    "parameters": [
      {
        "name": "$event",
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

## Example: Named icons in buttons

Pass an icon constant of minerva-design/icons/core: only the icons used are bundled. Icons follow the text color and are hidden from assistive technologies unless they have a title (or aria-label).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnIcon, MnButton, MnStack } from 'minerva-design/angular';
import { homeIcon, searchIcon, settingsIcon, bellIcon, downloadIcon, trashIcon } from 'minerva-design/icons/core';

@Component({
  selector: 'app-example',
  imports: [MnIcon, MnButton, MnStack],
  template: `
<ng-template #download><mn-icon [icon]="downloadIcon" size="16" /></ng-template>
<ng-template #trash><mn-icon [icon]="trashIcon" size="16" /></ng-template>
<mn-stack direction="row" wrap gap="4" align="center">
  <mn-icon [icon]="homeIcon" />
  <mn-icon [icon]="searchIcon" />
  <mn-icon [icon]="settingsIcon" />
  <button mnButton [startIcon]="download">Download</button>
  <button mnButton color="danger" variant="outline" [startIcon]="trash">Delete</button>
  <mn-icon [icon]="bellIcon" size="32" title="Notifications" />
</mn-stack>
  `,
})
export class Example {
  homeIcon = homeIcon;
  searchIcon = searchIcon;
  settingsIcon = settingsIcon;
  bellIcon = bellIcon;
  downloadIcon = downloadIcon;
  trashIcon = trashIcon;
}

```

## Example: Renderers

renderer draws the icon on a canvas shared by every canvas icon of the page; rendererChange reports the backend that drew it (a forced backend that cannot start falls back to the next one, auto follows setDefaultIconRenderer). The canvas renderers load with the first canvas icon.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnIcon, MnStack } from 'minerva-design/angular';
import { settingsIcon } from 'minerva-design/icons/core';

@Component({
  selector: 'app-example',
  imports: [MnIcon, MnStack],
  template: `
<mn-stack direction="row" wrap gap="5">
  @for (renderer of renderers; track renderer) {
    <mn-stack gap="1" align="center">
      <mn-icon
        [icon]="settingsIcon"
        [size]="40"
        color="var(--primary-color)"
        [renderer]="renderer"
        (rendererChange)="drawn[renderer] = $event"
      />
      <code>{{ renderer }}</code>
      <small>{{ renderer === 'svg' ? 'SVG' : (drawn[renderer] ?? '…') }}</small>
    </mn-stack>
  }
</mn-stack>
  `,
})
export class Example {
  settingsIcon = settingsIcon;
  renderers: import('minerva-design/angular').IconRenderer[] = ["svg", "auto", "webgpu", "webgl2", "webgl", "canvas2d"];
  drawn: Partial<Record<string, string>> = {};
}

```

## Example: Icons by name

MnDynamicIcon resolves a built-in icon by name at runtime and renders nothing for unknown names. It bundles the whole set: prefer MnIcon with an icon constant when the icon is known.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDynamicIcon, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDynamicIcon, MnStack],
  template: `
<ul mnStack gap="2" style="margin: 0; padding: 0; list-style: none">
  @for (service of services; track service.name) {
    <li style="display: flex; align-items: center; gap: 8px">
      <mn-dynamic-icon [name]="service.icon" [size]="18" />
      <span style="min-width: 80px">{{ service.name }}</span>
      <mn-dynamic-icon
        [name]="service.status"
        [size]="18"
        [color]="service.color"
        [title]="service.status"
      />
    </li>
  }
</ul>
  `,
})
export class Example {
  services = [
  {
    "name": "Storage",
    "icon": "database",
    "status": "check-circle",
    "color": "var(--success-color)"
  },
  {
    "name": "Mail",
    "icon": "mail",
    "status": "alert-triangle",
    "color": "var(--warning-color)"
  },
  {
    "name": "Payments",
    "icon": "credit-card",
    "status": "x-circle",
    "color": "var(--danger-color)"
  }
];
}

```
