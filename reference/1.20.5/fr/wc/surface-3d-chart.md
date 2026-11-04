# Surface 3D

Des surfaces z = f(x, y) sur une grille régulière : éclairage, palettes intégrées (viridis, plasma, terrain…), maillage, lignes de niveau projetées sur le sol et transparence. Glisser pour tourner, Ctrl / ⌘ + molette pour zoomer.

Package: minerva-design@1.20.5

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/surface-3d-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "wireframe",
    "typeText": "boolean | Surface3DWireframeOptions | undefined",
    "required": false
  },
  {
    "name": "contours",
    "typeText": "boolean | Surface3DContourOptions | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly S[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Chart3DBaseOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered point, cell or bar changed; detail: { seriesIndex, seriesName, type, index, x, y, z, value, color, label }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point, cell or bar was clicked; detail: { seriesIndex, seriesName, type, index, x, y, z, value, color, label }"
  },
  {
    "name": "minerva-camera-change",
    "typeText": "CustomEvent",
    "description": "The user rotated, zoomed, panned or reset the camera; detail: { azimuth, elevation, zoom, pan, projection }"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Une onde avec des courbes de niveau

z = sin(r) / r sur une grille de 60 × 60, colorée selon la hauteur, courbes de niveau projetées au sol.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/wc/ripple.html

```html
<minerva-surface-3d-chart id="ripple" height="420"></minerva-surface-3d-chart>

```

### apps/docs/src/docs/pages/surface-3d-chart/wc/ripple.ts

```tsx
// <minerva-surface-3d-chart>: z = f(x, y) over a regular grid (`rows`,
// `cols`, `z` row by row), lit and colored by height, with contour lines
// projected on the floor.
import type { MinervaSurface3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: { name: "Ripple", height: "Height" },
  zh: { name: "波纹", height: "高度" },
  ja: { name: "波紋", height: "高さ" },
  fr: { name: "Onde", height: "Hauteur" },
};

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaSurface3DChart>("#ripple")!;
  chart.series = [{ name: text.name, data: WAVE }];
  chart.contours = { count: 10, floor: true };
  chart.options = { colorScale: "viridis", zAxis: { title: text.height } };
}

```

## Example: Relief avec un maillage

Deux collines et une vallée, une ligne de grille sur deux et l’échelle « terrain » ; survolez pour lire l’altitude.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/wc/terrain.html

```html
<minerva-surface-3d-chart id="terrain" height="420"></minerva-surface-3d-chart>

```

### apps/docs/src/docs/pages/surface-3d-chart/wc/terrain.ts

```tsx
// A terrain with a wireframe (`wireframe`, every 2nd grid line) and the
// "terrain" color scale; hover a cell to read its elevation.
import type { MinervaSurface3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: { name: "Terrain", axes: ["East (km)", "North (km)", "Elevation (m)"] },
  zh: { name: "地形", axes: ["东（公里）", "北（公里）", "海拔（米）"] },
  ja: { name: "地形", axes: ["東（km）", "北（km）", "標高（m）"] },
  fr: { name: "Relief", axes: ["Est (km)", "Nord (km)", "Altitude (m)"] },
};

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaSurface3DChart>("#terrain")!;
  chart.series = [{ name: text.name, data: TERRAIN }];
  chart.wireframe = { step: 2 };
  chart.options = {
    colorScale: "terrain",
    xAxis: { title: text.axes[0] },
    yAxis: { title: text.axes[1] },
    zAxis: { title: text.axes[2] },
  };
}

```
