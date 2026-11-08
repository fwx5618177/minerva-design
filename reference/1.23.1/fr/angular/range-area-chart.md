# Aire de plage

Des bandes entre un bord inférieur et un bord supérieur : intervalles de confiance, prévisions, plages min-max et éventails de percentiles.

Package: minerva-design@1.23.1

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Native Angular: MnRangeAreaChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnRangeAreaChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "curve",
    "typeText": "ChartCurve",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Prévision et intervalles de confiance

Chaque point d'une aire fixe son bord inférieur avec y0 : les intervalles à 80 % et 95 % s'élargissent avec l'horizon, l'historique et la prévision sont des lignes ; lineWidth: 0 masque les bords des bandes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRangeAreaChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRangeAreaChart],
  template: `
@let t = labels[language()];
@let m = months[language()];
<mn-range-area-chart
  [series]="[
    { name: t.band, data: [{ x: m[5], y0: 158, y: 158 }, { x: m[6], y0: 159, y: 167 }, { x: m[7], y0: 161, y: 177 }, { x: m[8], y0: 160, y: 184 }, { x: m[9], y0: 162, y: 194 }, { x: m[10], y0: 165, y: 205 }, { x: m[11], y0: 166, y: 214 }] },
    { name: t.actual, type: 'line', data: [{ x: m[0], y: 120 }, { x: m[1], y: 132 }, { x: m[2], y: 128 }, { x: m[3], y: 141 }, { x: m[4], y: 150 }, { x: m[5], y: 158 }] },
    { name: t.forecast, type: 'line', lineWidth: 1, data: [{ x: m[5], y: 158 }, { x: m[6], y: 163 }, { x: m[7], y: 169 }, { x: m[8], y: 172 }, { x: m[9], y: 178 }, { x: m[10], y: 185 }, { x: m[11], y: 190 }] }
  ]"
  [xAxis]="{ type: 'category', categories: m }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "actual": "Actual",
    "forecast": "Forecast",
    "band": "80 % interval"
  },
  "zh": {
    "actual": "实际",
    "forecast": "预测",
    "band": "80% 置信区间"
  },
  "ja": {
    "actual": "実績",
    "forecast": "予測",
    "band": "80% 予測区間"
  },
  "fr": {
    "actual": "Réel",
    "forecast": "Prévision",
    "band": "Intervalle à 80 %"
  }
};
  months = {
  "en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  "zh": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  "ja": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  "fr": ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
};
}

```

## Example: Minimum et maximum quotidiens

Une année de plages de températures quotidiennes avec la normale saisonnière : l'infobulle donne les deux bords de la bande, Ctrl / ⌘ + molette zoome jusqu'au jour.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRangeAreaChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRangeAreaChart],
  template: `
@let t = labels[language()];
@let d = days[language()];
<mn-range-area-chart
  [series]="[
    { name: t.range, data: [{ x: d[0], y0: 8, y: 16 }, { x: d[1], y0: 9, y: 18 }, { x: d[2], y0: 7, y: 15 }, { x: d[3], y0: 11, y: 21 }, { x: d[4], y0: 13, y: 24 }, { x: d[5], y0: 12, y: 22 }, { x: d[6], y0: 10, y: 19 }] },
    { name: t.mean, type: 'line', data: [{ x: d[0], y: 12 }, { x: d[1], y: 13.5 }, { x: d[2], y: 11 }, { x: d[3], y: 16 }, { x: d[4], y: 18.5 }, { x: d[5], y: 17 }, { x: d[6], y: 14.5 }] }
  ]"
  curve="linear"
  [xAxis]="{ type: 'category' }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "range": "Min – max",
    "mean": "Average"
  },
  "zh": {
    "range": "最低 – 最高",
    "mean": "平均"
  },
  "ja": {
    "range": "最低 – 最高",
    "mean": "平均"
  },
  "fr": {
    "range": "Min – max",
    "mean": "Moyenne"
  }
};
  days = {
  "en": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  "zh": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  "ja": ["月", "火", "水", "木", "金", "土", "日"],
  "fr": ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."]
};
}

```
