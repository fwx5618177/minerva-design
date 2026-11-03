# Graphique en chandeliers

Cours d’ouverture, plus haut, plus bas et clôture par période, pour des actions, des cryptomonnaies ou toute donnée OHLC. Les bougies haussières et baissières ont chacune leur couleur, des séries de lignes peuvent s’y ajouter (moyennes mobiles) et les longs historiques restent fluides à zoomer et à faire défiler grâce au GPU.

Package: minerva-design@1.19.3

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Ouverture

Plus haut

Plus bas

Clôture

Variation

Couleurs des bougies

Vert en hausse, rouge en baisse

Rouge en hausse, vert en baisse

Cours quotidiens d'ACME sur 60 séances

MM {{days}}

Cours quotidiens de NOVA sur 120 séances avec les moyennes mobiles à 5 et 20 jours

50 000 bougies d'une minute

{{candles}} bougies · dessinées avec {{renderer}} · Ctrl / ⌘ + molette pour zoomer, glisser pour se déplacer, double-clic pour réinitialiser

Volume

Cours quotidiens d'ORBT sur 90 séances

Volume quotidien échangé d'ORBT

VWAP

Prévisions abaissées

Bougies de 5 minutes d'ORBT sur une séance avec le VWAP

Barres OHLC journalières

Chandeliers journaliers

Chandeliers creux journaliers

Barres OHLC

Chandeliers

Chandeliers creux

traits pour l'ouverture et la clôture

corps plein de l'ouverture à la clôture

corps vide quand la clôture est plus haute

ETH/USDT

Graphique 4 heures d'ETH/USDT avec huit moyennes exponentielles

Volume

Panneau dédié

Sous les prix

BTC/USDT

Graphique horaire de BTC/USDT avec le volume coloré selon les bougies

CATL 300750

Graphique journalier de CATL, bougies haussières en rouge

R

D

Div

P↓

Résultats

Dividende

Division d'actions

Prévisions abaissées

ORBT

Graphique journalier d'ORBT avec résultats, dividendes et division d'actions

Pause

Reprendre

En direct : dix transactions par seconde

En pause

ADA/USDT

5 s

Bougies de cinq secondes d'ADA/USDT mises à jour en direct

NASDAQ 100

Chandeliers creux 30 minutes du NASDAQ 100 sur un thème nuit

Figure

Toutes

Doji

Marteau

Étoile filante

Avalement

D

M

EF

A↑

A↓

Doji

Marteau

Étoile filante

Avalement haussier

Avalement baissier

ouverture et clôture presque égales, indécision

longue mèche basse après une baisse, les acheteurs arrivent

longue mèche haute après une hausse, les vendeurs arrivent

un corps haussier recouvre le corps baissier précédent

un corps baissier recouvre le corps haussier précédent

{{name}} : {{value}}

{{name}} le {{date}} : {{meaning}}.

Survolez une bougie marquée pour nommer sa figure.

Graphique journalier ORBT avec les figures en chandeliers

BTC/USD

AAPL

EUR/USD

Or (XAU/USD)

48 heures

30 jours

Bougies {{name}}, {{change}} sur la période

R1

P

S1

EUR/USD

Bougies horaires EUR/USD avec les points pivots journaliers

{{time}} · amplitude {{range}} pips · corps {{body}} pips · variation {{change}} pips · réticule à {{distance}} pips du dernier cours

Pivots de vendredi : P {{pivot}}, R1 {{r1}}, S1 {{s1}}. Survolez une bougie pour la mesurer en pips.

## CandlestickChart

Support: beta

Native Angular: MnCandlestickChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCandlestickChart"
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
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  }
]
```

### events

```json
[
  {
    "name": "pointClick",
    "typeText": "ChartHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "ChartPlotClickEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "ChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "zoom",
    "typeText": "ChartView",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
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

## Example: Daily candles

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCandlestickChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCandlestickChart],
  template: `
@let t = labels[language()];
<mn-candlestick-chart
  [series]="[{ name: t.price, data: candles }]"
  [xAxis]="{ title: t.day }"
  [yAxis]="{ zero: false }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  candles = [
  {
    "x": 1,
    "open": 100,
    "y": 100,
    "high": 101.5,
    "low": 98.5
  },
  {
    "x": 2,
    "open": 101.98,
    "y": 105.76,
    "high": 107.26,
    "low": 100.48
  },
  {
    "x": 3,
    "open": 103.84,
    "y": 101.39,
    "high": 105.34,
    "low": 99.89
  },
  {
    "x": 4,
    "open": 105.45,
    "y": 103.25,
    "high": 106.95,
    "low": 101.75
  },
  {
    "x": 5,
    "open": 106.73,
    "y": 110.6,
    "high": 112.1,
    "low": 105.23
  },
  {
    "x": 6,
    "open": 107.59,
    "y": 107.29,
    "high": 109.09,
    "low": 105.79
  },
  {
    "x": 7,
    "open": 107.98,
    "y": 104.3,
    "high": 109.48,
    "low": 102.8
  },
  {
    "x": 8,
    "open": 107.87,
    "y": 110.55,
    "high": 112.05,
    "low": 106.37
  },
  {
    "x": 9,
    "open": 107.27,
    "y": 109.22,
    "high": 110.72,
    "low": 105.77
  },
  {
    "x": 10,
    "open": 106.22,
    "y": 102.29,
    "high": 107.72,
    "low": 100.79
  },
  {
    "x": 11,
    "open": 104.79,
    "y": 105.39,
    "high": 106.89,
    "low": 103.29
  },
  {
    "x": 12,
    "open": 103.05,
    "y": 106.6,
    "high": 108.1,
    "low": 101.55
  },
  {
    "x": 13,
    "open": 101.13,
    "y": 98.23,
    "high": 102.63,
    "low": 96.73
  },
  {
    "x": 14,
    "open": 99.13,
    "y": 97.46,
    "high": 100.63,
    "low": 95.96
  },
  {
    "x": 15,
    "open": 97.19,
    "y": 101.17,
    "high": 102.67,
    "low": 95.69
  },
  {
    "x": 16,
    "open": 95.43,
    "y": 94.53,
    "high": 96.93,
    "low": 93.03
  },
  {
    "x": 17,
    "open": 93.95,
    "y": 90.55,
    "high": 95.45,
    "low": 89.05
  },
  {
    "x": 18,
    "open": 92.84,
    "y": 95.93,
    "high": 97.43,
    "low": 91.34
  },
  {
    "x": 19,
    "open": 92.18,
    "y": 93.58,
    "high": 95.08,
    "low": 90.68
  },
  {
    "x": 20,
    "open": 92.01,
    "y": 88.01,
    "high": 93.51,
    "low": 86.51
  },
  {
    "x": 21,
    "open": 92.33,
    "y": 93.51,
    "high": 95.01,
    "low": 90.83
  },
  {
    "x": 22,
    "open": 93.13,
    "y": 96.36,
    "high": 97.86,
    "low": 91.63
  },
  {
    "x": 23,
    "open": 94.36,
    "y": 91.08,
    "high": 95.86,
    "low": 89.58
  },
  {
    "x": 24,
    "open": 95.93,
    "y": 94.82,
    "high": 97.43,
    "low": 93.32
  }
];
  labels = {
  "en": {
    "price": "Price",
    "day": "Day"
  },
  "zh": {
    "price": "价格",
    "day": "天"
  },
  "ja": {
    "price": "価格",
    "day": "日"
  },
  "fr": {
    "price": "Cours",
    "day": "Jour"
  }
};
}

```

## Example: Moyennes mobiles

Les séries avec type: "line" sont tracées par-dessus les bougies, ici des moyennes mobiles sur 5 et 20 jours qui commencent par des valeurs null. Survolez un jour pour lire ses valeurs OHLC, sa variation et les deux moyennes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCandlestickChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCandlestickChart],
  template: `
@let t = labels[language()];
<mn-candlestick-chart
  [series]="[
    { name: t.price, data: candles },
    { name: t.average, type: 'line', curve: 'smooth', data: average }
  ]"
  [yAxis]="{ zero: false }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  candles = [
  {
    "x": 1,
    "open": 80,
    "y": 80,
    "high": 81.5,
    "low": 78.5
  },
  {
    "x": 2,
    "open": 82.78,
    "y": 86.56,
    "high": 88.06,
    "low": 81.28
  },
  {
    "x": 3,
    "open": 85.44,
    "y": 82.99,
    "high": 86.94,
    "low": 81.49
  },
  {
    "x": 4,
    "open": 87.85,
    "y": 85.65,
    "high": 89.35,
    "low": 84.15
  },
  {
    "x": 5,
    "open": 89.93,
    "y": 93.8,
    "high": 95.3,
    "low": 88.43
  },
  {
    "x": 6,
    "open": 91.59,
    "y": 91.29,
    "high": 93.09,
    "low": 89.79
  },
  {
    "x": 7,
    "open": 92.78,
    "y": 89.1,
    "high": 94.28,
    "low": 87.6
  },
  {
    "x": 8,
    "open": 93.47,
    "y": 96.15,
    "high": 97.65,
    "low": 91.97
  },
  {
    "x": 9,
    "open": 93.67,
    "y": 95.62,
    "high": 97.12,
    "low": 92.17
  },
  {
    "x": 10,
    "open": 93.42,
    "y": 89.49,
    "high": 94.92,
    "low": 87.99
  },
  {
    "x": 11,
    "open": 92.79,
    "y": 93.39,
    "high": 94.89,
    "low": 91.29
  },
  {
    "x": 12,
    "open": 91.85,
    "y": 95.4,
    "high": 96.9,
    "low": 90.35
  },
  {
    "x": 13,
    "open": 90.73,
    "y": 87.83,
    "high": 92.23,
    "low": 86.33
  },
  {
    "x": 14,
    "open": 89.53,
    "y": 87.86,
    "high": 91.03,
    "low": 86.36
  },
  {
    "x": 15,
    "open": 88.39,
    "y": 92.37,
    "high": 93.87,
    "low": 86.89
  },
  {
    "x": 16,
    "open": 87.43,
    "y": 86.53,
    "high": 88.93,
    "low": 85.03
  },
  {
    "x": 17,
    "open": 86.75,
    "y": 83.35,
    "high": 88.25,
    "low": 81.85
  },
  {
    "x": 18,
    "open": 86.44,
    "y": 89.53,
    "high": 91.03,
    "low": 84.94
  },
  {
    "x": 19,
    "open": 86.58,
    "y": 87.98,
    "high": 89.48,
    "low": 85.08
  },
  {
    "x": 20,
    "open": 87.21,
    "y": 83.21,
    "high": 88.71,
    "low": 81.71
  },
  {
    "x": 21,
    "open": 88.33,
    "y": 89.51,
    "high": 91.01,
    "low": 86.83
  },
  {
    "x": 22,
    "open": 89.93,
    "y": 93.16,
    "high": 94.66,
    "low": 88.43
  },
  {
    "x": 23,
    "open": 91.96,
    "y": 88.68,
    "high": 93.46,
    "low": 87.18
  },
  {
    "x": 24,
    "open": 94.33,
    "y": 93.22,
    "high": 95.83,
    "low": 91.72
  }
];
  average = [
  {
    "x": 1,
    "y": 80
  },
  {
    "x": 2,
    "y": 83.28
  },
  {
    "x": 3,
    "y": 83.18
  },
  {
    "x": 4,
    "y": 83.8
  },
  {
    "x": 5,
    "y": 85.8
  },
  {
    "x": 6,
    "y": 88.06
  },
  {
    "x": 7,
    "y": 88.57
  },
  {
    "x": 8,
    "y": 91.2
  },
  {
    "x": 9,
    "y": 93.19
  },
  {
    "x": 10,
    "y": 92.33
  },
  {
    "x": 11,
    "y": 92.75
  },
  {
    "x": 12,
    "y": 94.01
  },
  {
    "x": 13,
    "y": 92.35
  },
  {
    "x": 14,
    "y": 90.79
  },
  {
    "x": 15,
    "y": 91.37
  },
  {
    "x": 16,
    "y": 90
  },
  {
    "x": 17,
    "y": 87.59
  },
  {
    "x": 18,
    "y": 87.93
  },
  {
    "x": 19,
    "y": 87.95
  },
  {
    "x": 20,
    "y": 86.12
  },
  {
    "x": 21,
    "y": 86.72
  },
  {
    "x": 22,
    "y": 88.68
  },
  {
    "x": 23,
    "y": 88.51
  },
  {
    "x": 24,
    "y": 89.56
  }
];
  labels = {
  "en": {
    "price": "Price",
    "average": "5-day average"
  },
  "zh": {
    "price": "价格",
    "average": "5 日均线"
  },
  "ja": {
    "price": "価格",
    "average": "5日移動平均"
  },
  "fr": {
    "price": "Cours",
    "average": "Moyenne 5 jours"
  }
};
}

```
