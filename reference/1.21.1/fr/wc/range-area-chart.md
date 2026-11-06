# Aire de plage

Des bandes entre un bord inférieur et un bord supérieur : intervalles de confiance, prévisions, plages min-max et éventails de percentiles.

Package: minerva-design@1.21.1

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Intervalle à 95 %

Intervalle à 80 %

Réel

Prévision

Commandes

Aujourd'hui

Commandes mensuelles avec une prévision sur 12 mois et ses intervalles de confiance

Min – max

Normale saisonnière

Températures minimales et maximales quotidiennes sur un an

5e – 95e percentile

25e – 75e percentile

Médiane

Percentiles du temps de réponse sur une journée

Bas – haut

Clôture

Plage quotidienne et cours de clôture sur six mois

Attendu ± {{k}}σ

Mesuré

Anomalies

Sensibilité

Bande à {{k}}σ

Requêtes par minute

Requêtes d'API par minute sur une semaine, avec la bande attendue et les anomalies hors de celle-ci

Aucun point hors de la bande.

Anomalies : {{n}}, la dernière le {{latest}}.

Achat – vente

Prix moyen

Pause

Reprendre

Achat {{bid}} · Vente {{ask}}

Écart {{value}} pb

Prix acheteur et vendeur en direct d'une paire de devises sur la dernière minute, avec le prix moyen

Faibles émissions (SSP1-2.6)

Faibles émissions, fourchette probable

Émissions très élevées (SSP5-8.5)

Émissions très élevées, fourchette probable

Observé

Limite de {{value}}

Réchauffement depuis 1850-1900

Réchauffement mondial observé depuis 1950 et projeté jusqu'en 2100 selon un scénario de faibles et un de très fortes émissions

Avec de faibles émissions, la médiane dépasse {{lowLimit}} vers {{low}} et se stabilise à {{peak}} ; avec des émissions très élevées, elle dépasse {{highLimit}} vers {{high}}.

Intervalle de confiance à {{level}}

Amélioration

Aucune différence

Significatif

Niveau de confiance

Jour du test

Gain de conversion de B sur A

Gain de conversion cumulé de la variante B sur la variante A pendant un test de 28 jours, avec son intervalle de confiance

B a {{lift}} d'avance, mais l'intervalle à {{level}} contient encore zéro.

B convertit {{lift}} de mieux ({{low}} à {{high}} à {{level}}), de façon significative depuis le jour {{day}}.

## RangeAreaChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/range-area-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "curve",
    "typeText": "\"linear\" | \"smooth\" | \"step\"",
    "attribute": "curve",
    "required": false
  },
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

## Example: Prévision avec une bande d’incertitude

La bande de y0 à y s’élargit avec l’horizon ; les valeurs réelles et la prévision sont des lignes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/wc/forecast.html

```html
<minerva-range-area-chart id="forecast" height="300"></minerva-range-area-chart>

```

### apps/docs/src/docs/pages/range-area-chart/wc/forecast.ts

```tsx
// A forecast with its uncertainty: the band (`y0` - `y`) widens with the
// horizon; the actual values and the forecast are lines (`type: "line"`).
import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { actual: "Actual", forecast: "Forecast", band: "80 % interval" },
  zh: { actual: "实际", forecast: "预测", band: "80% 置信区间" },
  ja: { actual: "実績", forecast: "予測", band: "80% 予測区間" },
  fr: { actual: "Réel", forecast: "Prévision", band: "Intervalle à 80 %" },
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

const ACTUAL = [120, 132, 128, 141, 150, 158];
const FORECAST = [158, 163, 169, 172, 178, 185, 190];

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = root.querySelector<MinervaRangeAreaChart>("#forecast")!;
  chart.series = [
    {
      name: text.band,
      data: FORECAST.map((y, i) => ({
        x: months[5 + i],
        y0: y - 4 * i,
        y: y + 4 * i,
      })),
    },
    {
      name: text.actual,
      type: "line",
      data: ACTUAL.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.forecast,
      type: "line",
      lineWidth: 1,
      data: FORECAST.map((y, i) => ({ x: months[5 + i], y })),
    },
  ];
  chart.options = { xAxis: { type: "category", categories: months } };
}

```

## Example: Amplitude des températures

Minimum et maximum de chaque jour en bande, la moyenne en ligne ; des bords droits gardent les mesures.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/wc/temperature.html

```html
<minerva-range-area-chart
  id="temperature"
  curve="linear"
  height="280"
></minerva-range-area-chart>

```

### apps/docs/src/docs/pages/range-area-chart/wc/temperature.ts

```tsx
// Daily minimum and maximum temperatures as a band, the average as a line;
// `curve="linear"` keeps the measured values at the corners.
import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { range: "Min – max", mean: "Average" },
  zh: { range: "最低 – 最高", mean: "平均" },
  ja: { range: "最低 – 最高", mean: "平均" },
  fr: { range: "Min – max", mean: "Moyenne" },
};
const DAYS = {
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  zh: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  ja: ["月", "火", "水", "木", "金", "土", "日"],
  fr: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
};

const LOW = [8, 9, 7, 11, 13, 12, 10];
const HIGH = [16, 18, 15, 21, 24, 22, 19];

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const days = DAYS[lang] ?? DAYS.en;
  const chart = root.querySelector<MinervaRangeAreaChart>("#temperature")!;
  chart.series = [
    {
      name: text.range,
      data: days.map((x, i) => ({ x, y0: LOW[i], y: HIGH[i] })),
    },
    {
      name: text.mean,
      type: "line",
      data: days.map((x, i) => ({ x, y: (LOW[i] + HIGH[i]) / 2 })),
    },
  ];
  chart.options = {
    xAxis: { type: "category" },
    yAxis: { format: (value) => `${value} °C` },
  };
}

```
