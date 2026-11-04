# IconCanvas

De nombreuses icônes sur un seul canvas, dessinées par WebGPU, WebGL2 ou WebGL en quelques dessins instanciés, ou par Canvas2D : images denses, cartes, particules et animations de milliers d’icônes.

Package: minerva-design@1.20.5

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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

## Example: Utilisation de base

Des icônes placées en pixels CSS avec leur propre taille, couleur (variables de thème comprises), rotation, épaisseur de trait et opacité.

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
