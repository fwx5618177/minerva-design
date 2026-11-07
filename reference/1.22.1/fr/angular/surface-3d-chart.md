# Surface 3D

Des surfaces z = f(x, y) sur une grille régulière : éclairage, palettes intégrées (viridis, plasma, terrain…), maillage, lignes de niveau projetées sur le sol et transparence. Glisser pour tourner, Ctrl / ⌘ + molette pour zoomer.

Package: minerva-design@1.22.1

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

sinc

Peaks

Selle

Fonction

Surface 3D de la fonction {{name}}

x

y

z

Île

{{value}} km

{{value}} m

Est

Nord

Altitude

Relief d'une île de 20 km de large

Volatilité implicite

{{value}} %

Prix d'exercice (% du spot)

Jours avant échéance

{{value}} j

Surface de volatilité implicite selon le prix d'exercice et l'échéance

Faces

Maillage

Lignes de niveau au sol

Lignes de niveau sur la surface

Surface peaks avec maillage et lignes de niveau

Bol

Plan incliné

Un bol transparent traversé par un plan incliné transparent

Onde

Animer

Amplitude

Ondulations animées partant du centre

Plaque

Réinitialiser

cm

Température

Température d'une plaque métallique chauffée par des sources ponctuelles

Sources de chaleur : {{sources}} · point le plus chaud {{max}} · moyenne {{mean}}. Cliquez sur la plaque pour ajouter ou retirer une source.

Taux des obligations d'État

Échéance

Mois

Taux

Taux des obligations d'État par échéance sur 24 mois

Taux à {{maturity}} en {{date}} : {{yield}}.

Survolez la surface pour lire un taux.

En {{date}}, la courbe est inversée (10 ans − 2 ans : {{spread}}).

En {{date}}, la courbe est croissante (10 ans − 2 ans : {{spread}}).

Perte

({{x}} ; {{y}})

Échelle de couleurs

Viridis

Plasma

Magma

Cividis

Turbo

Poids 1

Poids 2

log₁₀(1 + perte)

Paysage de perte de la fonction de Himmelblau à quatre minima

Depuis {{start}} (perte {{loss}}), la descente de gradient atteint le minimum {{n}} en {{minimum}} après {{steps}} pas.

Cliquez sur la surface pour y lancer une descente de gradient.

{{value}} dBm

Signal

Points d'accès

Accueil

Open space

Salles de réunion

Cuisine

Vue 3D

Vue de dessus

Mètres

Puissance du signal Wi-Fi sur un plateau de bureaux

{{good}} du plateau reçoit {{goodLevel}} ou mieux (visioconférence), {{usable}} reçoit {{usableLevel}} ou mieux.

Tous les points d'accès sont coupés : aucune couverture.

## Surface3DChart

Support: beta

Native Angular: MnSurface3DChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSurface3DChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "wireframe",
    "typeText": "boolean | Surface3DWireframeOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "contours",
    "typeText": "boolean | Surface3DContourOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "series",
    "typeText": "readonly S[]",
    "required": true,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "xAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "yAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "zAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "camera",
    "typeText": "Chart3DCameraOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "autoRotate",
    "typeText": "number | boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "colorScale",
    "typeText": "Chart3DColorScale | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "colorBar",
    "typeText": "boolean | Chart3DColorBarOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | Chart3DLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | Chart3DTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<Chart3DOptions, \"series\">> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "Chart3DHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "Chart3DHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "cameraChange",
    "typeText": "Chart3DCameraState",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DCameraState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: A ripple with contour lines

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSurface3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSurface3DChart],
  template: `
@let t = labels[language()];
<mn-surface-3d-chart
  [series]="[{ name: t.name, data: wave }]"
  [contours]="{ count: 10, floor: true }"
  colorScale="viridis"
  [zAxis]="{ title: t.height }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  wave = (() => {
  // z = sin(r) / r over a 60 × 60 grid from -10 to 10
  const N = 60;
  const WAVE = {
    rows: N,
    cols: N,
    x: Array.from({ length: N }, (_, i) => -10 + (20 * i) / (N - 1)),
    y: Array.from({ length: N }, (_, i) => -10 + (20 * i) / (N - 1)),
    z: Array.from({ length: N * N }, (_, k) => {
      const x = -10 + (20 * (k % N)) / (N - 1);
      const y = -10 + (20 * Math.floor(k / N)) / (N - 1);
      const r = Math.hypot(x, y) || 1e-6;
      return Math.sin(r) / r;
    }),
  };
  return WAVE;
})();
  labels = {
  "en": {
    "name": "Ripple",
    "height": "Height"
  },
  "zh": {
    "name": "波纹",
    "height": "高度"
  },
  "ja": {
    "name": "波紋",
    "height": "高さ"
  },
  "fr": {
    "name": "Onde",
    "height": "Hauteur"
  }
};
}

```

## Example: Relief

Une carte d'altitude 180 × 180 d'une île fractale avec la palette terrain, une boîte aplatie (aspect) et une lumière directionnelle plus forte.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSurface3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSurface3DChart],
  template: `
@let t = labels[language()];
<mn-surface-3d-chart
  [series]="[{ name: t.name, data: terrain }]"
  [wireframe]="{ step: 2 }"
  colorScale="terrain"
  [xAxis]="{ title: t.axes[0] }"
  [yAxis]="{ title: t.axes[1] }"
  [zAxis]="{ title: t.axes[2] }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  terrain = (() => {
  // two hills and a valley on a 40 × 40 grid (heights in meters)
  const N = 40;
  const TERRAIN = {
    rows: N,
    cols: N,
    z: Array.from({ length: N * N }, (_, k) => {
      const x = (k % N) / 4;
      const y = Math.floor(k / N) / 4;
      return Math.round(
        900 * Math.exp(-((x - 3) ** 2 + (y - 4) ** 2) / 6) +
          600 * Math.exp(-((x - 7) ** 2 + (y - 7) ** 2) / 4) -
          200 * Math.exp(-((x - 6) ** 2 + (y - 2) ** 2) / 3) +
          300,
      );
    }),
  };
  return TERRAIN;
})();
  labels = {
  "en": {
    "name": "Terrain",
    "axes": ["East (km)", "North (km)", "Elevation (m)"]
  },
  "zh": {
    "name": "地形",
    "axes": ["东（公里）", "北（公里）", "海拔（米）"]
  },
  "ja": {
    "name": "地形",
    "axes": ["東（km）", "北（km）", "標高（m）"]
  },
  "fr": {
    "name": "Relief",
    "axes": ["Est (km)", "Nord (km)", "Altitude (m)"]
  }
};
}

```
