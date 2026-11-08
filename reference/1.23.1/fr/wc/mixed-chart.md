# Graphique combiné

Barres, lignes et aires dans un même graphique, sur un ou deux axes de valeurs : chiffre d'affaires et croissance, pluie et température, diagrammes de Pareto.

Package: minerva-design@1.23.1

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

T{{n}} {{year}}

Chiffre d'affaires

Croissance (sur un an)

Chiffre d'affaires trimestriel et sa croissance sur un an

Précipitations

Température

Précipitations et températures mensuelles à Tokyo

Sessions

Taux de conversion

Campagne

Sessions quotidiennes et taux de conversion sur deux mois

Retours

Part cumulée

Mauvaise taille

Endommagé

Non conforme

Livré en retard

Changement d'avis

Mauvais article

Autre

Retours par cause et leur part cumulée

Pages vues

Chinois (zh-CN)

Français (fr-FR)

Pages vues et taux de conversion par jour, {{locale}}

Chiffre d’affaires

Utilisateurs

Utilisateurs (échelle log)

Chiffre d’affaires annuel et utilisateurs sur un axe logarithmique, de 2016 à 2025

{{value}} kWh

Production solaire

Consommation

Charge de la batterie

Nuit

Batterie de {{value}}

Autosuffisance de {{share}} sur deux jours, {{imported}} achetés au réseau.

Énergie par heure

Production solaire et consommation horaires d'une maison sur deux jours, avec l'état de charge de sa batterie

Niveau de stock

Livraisons

Promotion

Stock de sécurité

Point de commande

Cliquez sur un jour ou une livraison.

{{id}} : {{quantity}} unités commandées le {{ordered}}, livrées le {{arrived}} après {{lead}}.

{{units}} unités en stock le {{date}}.

Seulement {{units}} unités en stock le {{date}}, sous le stock de sécurité.

Unités

Niveau de stock quotidien d'un article sur trois mois, avec les livraisons, le point de commande et le stock de sécurité

Requêtes

Taux d'erreur

Mises en production

Requêtes par 30 min

Requêtes et taux d'erreur d'une API web sur une journée, avec ses mises en production

Le taux d'erreur a culminé à {{peak}} à {{time}} après {{version}}, jusqu'au retour à {{rollback}}.

{{value}} pts

Début

Travail restant

Terminé

Idéal

+{{value}} ajoutés

Idéal : {{value}} restants

{{value}} restants

{{value}} terminés ce jour-là

{{value}} de retard sur l'idéal

{{value}} d'avance sur l'idéal

Points d'histoire

Burndown de sprint : travail restant, points terminés chaque jour et progression idéale sur dix jours ouvrés

{{left}} restants à {{velocity}} par jour : environ {{forecast}} ne seront pas terminés à la fin du sprint.

{{left}} restants à {{velocity}} par jour : le sprint est dans les temps.

## MixedChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/mixed-chart",
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

## Example: Diagramme climatique

Les précipitations mensuelles en barres et la température moyenne en ligne lissée ; le réticule lit les deux.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/wc/climate.html

```html
<minerva-mixed-chart id="climate" height="300"></minerva-mixed-chart>

```

### apps/docs/src/docs/pages/mixed-chart/wc/climate.ts

```tsx
// A climate chart: monthly precipitation as bars, the mean temperature as
// a smooth line on the right axis; the crosshair reads both.
import type { MinervaMixedChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { rain: "Precipitation (mm)", temperature: "Temperature (°C)" },
  zh: { rain: "降水量（毫米）", temperature: "气温（°C）" },
  ja: { rain: "降水量（mm）", temperature: "気温（°C）" },
  fr: { rain: "Précipitations (mm)", temperature: "Température (°C)" },
};
const MONTHS = {
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  zh: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  ja: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  fr: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ],
};

const RAIN = [52, 41, 48, 55, 68, 71, 64, 62, 55, 64, 63, 60];
const TEMPERATURE = [
  3.5, 4.2, 7.6, 10.7, 14.5, 17.6, 19.8, 19.6, 16.4, 12.3, 7.6, 4.4,
];

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = root.querySelector<MinervaMixedChart>("#climate")!;
  chart.series = [
    {
      name: text.rain,
      type: "bar",
      color: "var(--chart-series-2, #0ea5e9)",
      data: RAIN.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.temperature,
      type: "line",
      curve: "smooth",
      yAxis: "right",
      color: "var(--chart-series-4, #ef4444)",
      data: TEMPERATURE.map((y, i) => ({ x: months[i], y })),
    },
  ];
  chart.options = { xAxis: { type: "category" }, crosshair: true };
}

```

## Example: Chiffre d’affaires et croissance sur deux axes

Le chiffre d’affaires en barres sur l’axe gauche, la croissance en ligne sur l’axe droit (yAxis: "right").

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/wc/revenue-growth.html

```html
<minerva-mixed-chart id="revenue" height="300"></minerva-mixed-chart>

```

### apps/docs/src/docs/pages/mixed-chart/wc/revenue-growth.ts

```tsx
// Bars and a line on two value axes: the series with `yAxis: "right"` use
// `options.yAxis2` (its ticks are aligned on the left grid).
import type { MinervaMixedChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { revenue: "Revenue (k€)", growth: "Growth" },
  zh: { revenue: "收入（千欧元）", growth: "增长率" },
  ja: { revenue: "売上（千ユーロ）", growth: "成長率" },
  fr: { revenue: "Chiffre d’affaires (k€)", growth: "Croissance" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const REVENUE = [182, 196, 214, 205, 238, 261];
// month-over-month growth, %
const GROWTH = REVENUE.map((y, i) =>
  i ? Math.round((y / REVENUE[i - 1] - 1) * 1000) / 10 : 0,
);

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = root.querySelector<MinervaMixedChart>("#revenue")!;
  chart.series = [
    {
      name: text.revenue,
      type: "bar",
      data: REVENUE.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.growth,
      type: "line",
      curve: "smooth",
      yAxis: "right",
      data: GROWTH.map((y, i) => ({ x: months[i], y })),
    },
  ];
  chart.options = {
    xAxis: { type: "category" },
    yAxis2: { format: (value) => `${value} %` },
  };
}

```
