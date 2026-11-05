# Boîte à moustaches

Médianes, quartiles, moustaches et valeurs extrêmes pour comparer des distributions, à partir d'échantillons bruts ou de statistiques calculées. Les valeurs extrêmes sont des anneaux de la couleur de la série : survolez-en une pour lire sa valeur et son groupe.

Package: minerva-design@1.21.1

Renderer: wc

Locale: fr

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

Passerelle

Authentification

Recherche

Paiement

Recommandations

Images

Temps de réponse

Max

Q3

Médiane

Q1

Min

Valeurs extrêmes

Distribution du temps de réponse de chaque service

Salaire annuel

Développeur junior

Développeur

Développeur senior

Responsable technique

Responsable d'équipe

Distribution des salaires par poste

En semaine

Le week-end

Paris

Lyon

Marseille

Lille

Délai de livraison (heures)

Délais de livraison par ville en semaine et le week-end

Maximale du jour

Moyenne

Distribution des températures maximales quotidiennes par mois

Lint

Tests unitaires

Intégration

Bout en bout

Publication

Portée des moustaches

1,5 × EIQ

3 × EIQ

Min – max

Forme des valeurs aberrantes

Creuses

Pleines

{{value}} exécutions dessinées comme valeurs aberrantes

Durée du build

Distribution des durées de build de chaque pipeline CI

Cliquez sur une boîte ou une valeur aberrante.

{{day}} : un patient a attendu {{value}}.

{{day}} : attente médiane {{median}}, la moitié des patients a attendu entre {{q1}} et {{q3}}, {{outliers}} valeurs aberrantes.

Attente

Objectif de quatre heures

Distribution de l'attente aux urgences par jour de la semaine

Feuilles de style

Scripts

Polices

Images

Vidéos

Échelle logarithmique

{{value}} fichiers dépassent le budget de {{budget}}.

Taille du fichier

Budget

Distribution des tailles de fichiers d'un site web par type

Est des États-Unis

Ouest des États-Unis

Europe de l'Ouest

Asie-Pacifique Sud

Est de l'Amérique du Sud

Pause

Reprendre

SLA menacé : {{regions}}

Toutes les régions respectent le SLA

Latence

SLA

Distribution en direct de la latence des requêtes dans chaque région

## BoxPlotChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/box-plot-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "whisker",
    "typeText": "number | \"minmax\"",
    "attribute": "whisker",
    "required": false
  },
  {
    "name": "outlierShape",
    "typeText": "\"hollow\" | \"filled\"",
    "attribute": "outlier-shape",
    "required": false
  },
  {
    "name": "outlierSize",
    "typeText": "number",
    "attribute": "outlier-size",
    "required": false
  },
  {
    "name": "orientation",
    "typeText": "\"vertical\" | \"horizontal\"",
    "attribute": "orientation",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly BoxplotGroup[] | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ChartBaseOptions | undefined",
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
    "description": "The hovered (or keyboard-focused) points changed; detail: { x, xLabel, items }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point or a bar was clicked; detail: { x, xLabel, items }"
  },
  {
    "name": "minerva-plot-click",
    "typeText": "CustomEvent",
    "description": "The plot area was clicked where there is no point; detail: { x, y }"
  },
  {
    "name": "minerva-zoom",
    "typeText": "CustomEvent",
    "description": "The user zoomed or panned; detail: { x, y } (the visible ranges)"
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

## Example: Boîtes horizontales, moustaches min-max

Boîtes disposées en lignes ; moustaches jusqu’au minimum et au maximum (pas de valeurs aberrantes).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/wc/horizontal.html

```html
<minerva-box-plot-chart
  id="scores"
  orientation="horizontal"
  whisker="minmax"
  height="240"
></minerva-box-plot-chart>

```

### apps/docs/src/docs/pages/boxplot-chart/wc/horizontal.ts

```tsx
// `orientation="horizontal"` lays the boxes out in rows; `whisker="minmax"`
// extends the whiskers to the extremes (no outliers).
import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { score: "Score", classes: ["Class A", "Class B", "Class C"] },
  zh: { score: "分数", classes: ["一班", "二班", "三班"] },
  ja: { score: "得点", classes: ["A 組", "B 組", "C 組"] },
  fr: { score: "Note", classes: ["Classe A", "Classe B", "Classe C"] },
};

const SCORES = [
  [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
  [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
  [62, 66, 69, 70, 72, 74, 75, 77, 79, 83],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBoxPlotChart>("#scores")!;
  chart.groups = text.classes.map((x, i) => ({ x, values: SCORES[i] }));
  chart.valueName = text.score;
  chart.options = { xAxis: { type: "category" }, yAxis: { min: 0, max: 100 } };
}

```

## Example: Temps de réponse par service

Échantillons bruts par service : quartiles, moustaches de Tukey et valeurs aberrantes calculés par le graphique.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/wc/services.html

```html
<minerva-box-plot-chart id="services" height="300"></minerva-box-plot-chart>

```

### apps/docs/src/docs/pages/boxplot-chart/wc/services.ts

```tsx
// Raw samples per service (`groups`): the element computes the quartiles,
// Tukey whiskers (1.5 IQR) and draws the outliers as dots.
import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    time: "Response time (ms)",
    services: ["Search", "Checkout", "Profile", "Images"],
  },
  zh: {
    time: "响应时间（毫秒）",
    services: ["搜索", "结账", "个人资料", "图片"],
  },
  ja: {
    time: "応答時間（ms）",
    services: ["検索", "決済", "プロフィール", "画像"],
  },
  fr: {
    time: "Temps de réponse (ms)",
    services: ["Recherche", "Paiement", "Profil", "Images"],
  },
};

// response times (ms) sampled per service
const SAMPLES = [
  [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
  [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
  [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
  [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBoxPlotChart>("#services")!;
  chart.groups = text.services.map((x, i) => ({ x, values: SAMPLES[i] }));
  chart.valueName = text.time;
  chart.options = { xAxis: { type: "category" }, yAxis: { title: text.time } };
}

```
