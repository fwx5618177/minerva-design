# IconCanvas

Many icons on one canvas, drawn by WebGPU, WebGL2 or WebGL in a few instanced draws, or by Canvas2D: dense pictures, maps, particles and animations of thousands of icons.

Package: minerva-design@1.21.1

Renderer: angular

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

Native Angular: MnIconCanvas. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnIconCanvas"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly IconCanvasItem[]",
    "required": true,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "renderer",
    "typeText": "IconRendererPreference",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "width",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "height",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "pixelRatio",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "title",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
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
    "source": "packages/angular/src/components/icons/icon-canvas.ts",
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

## Example: Basic

Icons placed in CSS pixels with their own size, color (theme variables included), rotation, stroke width and opacity.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnIconCanvas, MnStack } from 'minerva-design/angular';
import { homeIcon, searchIcon, mailIcon, bellIcon, userIcon, settingsIcon } from 'minerva-design/icons/core';

@Component({
  selector: 'app-example',
  imports: [MnIconCanvas, MnStack],
  template: `
<mn-stack gap="2">
  <mn-icon-canvas
    [items]="items"
    [height]="160"
    title="Six icons, three ways"
    (rendererChange)="drawn = $event"
  />
  <small role="status">{{ drawn ? 'Drawn with ' + drawn : '…' }}</small>
</mn-stack>
  `,
})
export class Example {
  items = (() => {
  const row = [homeIcon, searchIcon, mailIcon, bellIcon, userIcon, settingsIcon];
  return [
    ...row.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
    ...row.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 64,
      size: 32,
      color: 'var(--primary-color)',
      rotation: i * 15,
    })),
    ...row.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 112,
      strokeWidth: 1.5,
      opacity: 0.35 + i * 0.13,
    })),
  ];
})();
  drawn = "";
}

```

## Example: Every backend

A forced backend that cannot start falls back to the next one (WebGPU, WebGL2, WebGL, Canvas2D); rendererChange tells which one drew.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnIconCanvas, MnStack } from 'minerva-design/angular';
import { icons } from 'minerva-design/icons/core';

@Component({
  selector: 'app-example',
  imports: [MnIconCanvas, MnStack],
  template: `
<mn-stack direction="row" wrap gap="4">
  @for (renderer of renderers; track renderer) {
    <figure style="margin: 0">
      <mn-icon-canvas
        [items]="items"
        [renderer]="renderer"
        [width]="256"
        [height]="160"
        [title]="'Icons drawn with ' + renderer"
        (rendererChange)="drawn[renderer] = $event"
      />
      <figcaption>
        <code>renderer="{{ renderer }}"</code>
        <small>{{
          !drawn[renderer]
            ? 'Starting…'
            : drawn[renderer] === renderer
              ? 'Drawn by ' + drawn[renderer]
              : 'Fell back to ' + drawn[renderer]
        }}</small>
      </figcaption>
    </figure>
  }
</mn-stack>
  `,
})
export class Example {
  renderers: import('minerva-design/icons/core').IconRendererPreference[] = ["webgpu", "webgl2", "webgl", "canvas2d"];
  items = icons.slice(0, 40).map((icon, i) => ({
  icon,
  x: 8 + (i % 8) * 30,
  y: 8 + Math.floor(i / 8) * 30,
  size: 24,
}));
  drawn: Partial<Record<string, string>> = {};
}

```
