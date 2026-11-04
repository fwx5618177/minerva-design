# Nuage de points 3D

Des nuages de points dans une boîte 3D orientable : des centaines de milliers à des millions de points sur le GPU, colorés par série, par point ou par une échelle de couleurs, avec survol, légende et barre de couleurs. Line3DChart trace des trajectoires 3D.

Package: minerva-design@1.20.2

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Setosa

Versicolor

Virginica

Longueur du sépale (cm)

Largeur du sépale (cm)

Longueur du pétale (cm)

Nuage de points 3D de trois espèces de fleurs selon la longueur et la largeur du sépale et la longueur du pétale

Bulbe et barre

Disque ancien

Étoiles jeunes

Régions HII

Halo

{{value}} kpc

Une galaxie spirale barrée d'un million d'étoiles : bulbe, bras spiraux d'étoiles jeunes, régions HII et bandes de poussière, disque et halo

Exposition

Exposition ×{{value}}

Capteurs

Capteur {{id}} · humidité {{humidity}} %

{{value}} °C

Longueur (m)

Largeur (m)

Hauteur (m)

Température

Température de 300 capteurs dans un entrepôt, selon leur position et leur hauteur

Brin 1

Brin 2

Paires de bases

Rotation automatique

Projection

Perspective

Orthographique

Double hélice d'ADN en rotation

Nœud torique

200 000 points autour d'un nœud torique, colorés selon la hauteur

Moteur

Auto

WebGPU

WebGL2

WebGL

Canvas2D

Démarrage…

Moteur utilisé : {{backend}}

{{requested}} n'est pas disponible ici : rendu avec {{backend}}

Trajectoire

Temps

{{value}} s

Trajectoire de l'attracteur de Lorenz, colorée selon le temps

Roulé suisse

Position sur le rouleau

Face

Côté

Dessus

Réinitialiser

Azimut {{azimuth}}°, élévation {{elevation}}°, zoom ×{{zoom}}

Glisser pour tourner, Maj + glisser pour déplacer, Ctrl / ⌘ + molette pour zoomer, double clic pour réinitialiser.

Nuage de points en roulé suisse, coloré selon la position sur le rouleau

Sport

Politique

Technologie

Santé

Finance

Voyage

Article {{topic}} n° {{n}}

Plus proches voisins

Composante {{n}} ({{variance}})

Plongements d'articles de presse sur leurs trois premières composantes principales, par thème

Les plus proches de « {{doc}} » : {{list}}.

{{doc}} ({{distance}})

Cliquez sur un article pour trouver ses plus proches voisins.

Retours lidar

Couleur selon

Hauteur

Intensité

Thème sombre

Nuage de points lidar d'une rue avec bâtiments, arbres et voitures garées

{{points}} points. Survolez le nuage pour lire un retour.

Hauteur {{height}}, intensité {{intensity}}.

{{shell}} {{n}}

Haut débit (LEO)

Observation (polaire)

Navigation (MEO)

Géostationnaire

Terre

Lecture

Milliers de km

Satellites de quatre couches orbitales en mouvement autour de la Terre

{{shell}} : altitude {{altitude}}, vitesse {{speed}}, une orbite toutes les {{period}}.

Survolez un satellite pour lire son orbite.

Technologie

Santé

Énergie

Finance

Consommation

{{ticker}} · {{cap}}

Vue orthographique

Volatilité

Bêta

Rendement annuel

Actions selon leur volatilité, leur bêta et leur rendement annuel, dimensionnées par la capitalisation

{{ticker}} ({{sector}}) : rendement {{ret}}, volatilité {{volatility}}, bêta {{beta}}, ratio de Sharpe {{sharpe}}, capitalisation {{cap}}.

Cliquez sur une action pour épingler ses chiffres.

## Line3DChart

Support: beta

Native Angular: MnLine3DChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnLine3DChart"
  ],
  "kind": "named"
}
```

### props

```json
[
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

## Scatter3DChart

Support: beta

Native Angular: MnScatter3DChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnScatter3DChart"
  ],
  "kind": "named"
}
```

### props

```json
[
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

## Example: Groupes

Trois espèces d'un jeu de données de type iris mesurées sur trois caractéristiques : une série par classe, que la légende masque ou affiche. Glisser pour tourner, Maj + glisser pour déplacer, double clic pour réinitialiser.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnScatter3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnScatter3DChart],
  template: `
@let t = labels[language()];
<mn-scatter-3d-chart
  [series]="[
    { name: t.segments[0], data: clouds[0], pointSize: 5 },
    { name: t.segments[1], data: clouds[1], pointSize: 5 },
    { name: t.segments[2], data: clouds[2], pointSize: 5 }
  ]"
  [xAxis]="{ title: t.axes[0] }"
  [yAxis]="{ title: t.axes[1] }"
  [zAxis]="{ title: t.axes[2] }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  clouds = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  // a cloud of 400 customers around a center (age, income, spending),
  // generated deterministically, as columns
  const cloud = (age: number, income: number, spending: number, seed: number) => {
    const noise = (i: number, k: number) =>
      fraction(Math.sin((i + seed * 1000) * (12.9898 + k)) * 43758.5453) - 0.5;
    return {
      x: Array.from({ length: 400 }, (_, i) => age + noise(i, 0) * 12),
      y: Array.from({ length: 400 }, (_, i) => income + noise(i, 1) * 20),
      z: Array.from({ length: 400 }, (_, i) => spending + noise(i, 2) * 10),
    };
  };
  const CLOUDS = [cloud(22, 18, 9, 1), cloud(40, 62, 24, 2), cloud(70, 35, 15, 3)];
  return CLOUDS;
})();
  labels = {
  "en": {
    "segments": ["Students", "Professionals", "Retirees"],
    "axes": ["Age", "Income (k€)", "Spending (k€)"]
  },
  "zh": {
    "segments": ["学生", "职场人士", "退休人员"],
    "axes": ["年龄", "收入（千欧元）", "消费（千欧元）"]
  },
  "ja": {
    "segments": ["学生", "社会人", "退職者"],
    "axes": ["年齢", "収入（千ユーロ）", "支出（千ユーロ）"]
  },
  "fr": {
    "segments": ["Étudiants", "Actifs", "Retraités"],
    "axes": ["Âge", "Revenu (k€)", "Dépenses (k€)"]
  }
};
}

```

## Example: Trajectoire 3D

Line3DChart trace l'attracteur de Lorenz (12 000 pas) coloré selon le temps avec une colonne value et colorScale "plasma".

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnLine3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnLine3DChart],
  template: `
@let t = labels[language()];
<mn-line-3d-chart
  [series]="[{ name: t.path, data: path, colorBy: 'z', lineWidth: 3 }]"
  colorScale="turbo"
  [autoRotate]="true"
  [xAxis]="{ title: t.axes[0] }"
  [yAxis]="{ title: t.axes[1] }"
  [zAxis]="{ title: t.axes[2] }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  path = (() => {
  // a climbing spiral of 600 points, as columns
  const t = Array.from({ length: 600 }, (_, i) => i / 30);
  const PATH = {
    x: t.map((a) => Math.cos(a) * (4 + a / 4)),
    y: t.map((a) => Math.sin(a) * (4 + a / 4)),
    z: t.map((a) => a / 2),
  };
  return PATH;
})();
  labels = {
  "en": {
    "path": "Flight path",
    "axes": ["East (km)", "North (km)", "Altitude (km)"]
  },
  "zh": {
    "path": "飞行轨迹",
    "axes": ["东（公里）", "北（公里）", "高度（公里）"]
  },
  "ja": {
    "path": "飛行経路",
    "axes": ["東（km）", "北（km）", "高度（km）"]
  },
  "fr": {
    "path": "Trajectoire",
    "axes": ["Est (km)", "Nord (km)", "Altitude (km)"]
  }
};
}

```
